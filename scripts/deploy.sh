#!/usr/bin/env bash

# Stop immediately when:
#
# - A command fails
# - An undefined variable is accessed
# - A command inside a pipeline fails
set -Eeuo pipefail

# Docker image name supplied by GitHub Actions.
#
# Example:
# ghcr.io/nexera-group/nexera-client
IMAGE_NAME="${1:?Docker image name is required}"

# Immutable image tag supplied by GitHub Actions.
#
# Example:
# sha-9d9f683b...
IMAGE_TAG="${2:?Docker image tag is required}"

# Resolve the directory containing this script.
#
# This allows the deployment directory to be changed without modifying
# the script.
DEPLOY_DIR="$(
  cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." >/dev/null 2>&1
  pwd
)"

COMPOSE_FILE="${COMPOSE_FILE:-compose.prod.yml}"
ENV_FILE="${ENV_FILE:-.env}"
SERVICE_NAME="${SERVICE_NAME:-client}"
CONTAINER_NAME="${CONTAINER_NAME:-nexera-group-client}"

cd "${DEPLOY_DIR}"

# Ensure all required deployment files exist.
if [[ ! -f "${COMPOSE_FILE}" ]]; then
  echo "ERROR: ${COMPOSE_FILE} was not found in ${DEPLOY_DIR}."
  exit 1
fi

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "ERROR: ${ENV_FILE} was not found in ${DEPLOY_DIR}."
  exit 1
fi

# Remember the currently running image.
#
# This image will be restored if the new deployment fails its health check.
PREVIOUS_IMAGE="$(
  docker inspect \
    --format='{{.Config.Image}}' \
    "${CONTAINER_NAME}" 2>/dev/null || true
)"

echo "Previous image: ${PREVIOUS_IMAGE:-none}"
echo "Deploying image: ${IMAGE_NAME}:${IMAGE_TAG}"

# Export these values so they override IMAGE_NAME and IMAGE_TAG values from
# the server's .env file during this deployment.
export IMAGE_NAME
export IMAGE_TAG

# Validate the final Docker Compose configuration before changing anything.
docker compose \
  --env-file "${ENV_FILE}" \
  -f "${COMPOSE_FILE}" \
  config >/dev/null

# Pull the exact image created from the current Git commit.
docker compose \
  --env-file "${ENV_FILE}" \
  -f "${COMPOSE_FILE}" \
  pull "${SERVICE_NAME}"

# Recreate the client container using the newly downloaded image.
docker compose \
  --env-file "${ENV_FILE}" \
  -f "${COMPOSE_FILE}" \
  up \
  -d \
  --no-build \
  --remove-orphans \
  "${SERVICE_NAME}"

# Wait for Docker's HEALTHCHECK to report that the application is healthy.
wait_for_health() {
  local attempt
  local container_state
  local health_state

  # 40 attempts × 3 seconds gives the application up to approximately
  # 120 seconds to become healthy.
  for attempt in $(seq 1 40); do
    container_state="$(
      docker inspect \
        --format='{{.State.Status}}' \
        "${CONTAINER_NAME}" 2>/dev/null || echo "missing"
    )"

    health_state="$(
      docker inspect \
        --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' \
        "${CONTAINER_NAME}" 2>/dev/null || echo "missing"
    )"

    echo "Health attempt ${attempt}/40: container=${container_state}, health=${health_state}"

    if [[ "${container_state}" == "running" && "${health_state}" == "healthy" ]]; then
      return 0
    fi

    # Support images that do not define a Docker HEALTHCHECK.
    if [[ "${container_state}" == "running" && "${health_state}" == "none" ]]; then
      return 0
    fi

    if [[ "${container_state}" == "exited" ||
          "${container_state}" == "dead" ||
          "${health_state}" == "unhealthy" ]]; then
      return 1
    fi

    sleep 3
  done

  return 1
}

if wait_for_health; then
  echo "Deployment completed successfully."
  echo "Running image: ${IMAGE_NAME}:${IMAGE_TAG}"

  # Remove dangling images only.
  #
  # Tagged rollback images remain available.
  docker image prune -f

  exit 0
fi

echo "ERROR: The new container did not become healthy."

docker logs --tail 100 "${CONTAINER_NAME}" || true

# Roll back when a previous container image exists.
if [[ -n "${PREVIOUS_IMAGE}" ]]; then
  echo "Rolling back to ${PREVIOUS_IMAGE}..."

  # Config.Image normally has this format:
  #
  # ghcr.io/owner/repository:sha-commit
  PREVIOUS_IMAGE_NAME="${PREVIOUS_IMAGE%:*}"
  PREVIOUS_IMAGE_TAG="${PREVIOUS_IMAGE##*:}"

  export IMAGE_NAME="${PREVIOUS_IMAGE_NAME}"
  export IMAGE_TAG="${PREVIOUS_IMAGE_TAG}"

  docker compose \
    --env-file "${ENV_FILE}" \
    -f "${COMPOSE_FILE}" \
    up \
    -d \
    --no-build \
    --remove-orphans \
    "${SERVICE_NAME}"

  if wait_for_health; then
    echo "Rollback completed successfully."
  else
    echo "CRITICAL: Rollback container also failed its health check."
    docker logs --tail 100 "${CONTAINER_NAME}" || true
  fi
else
  echo "No previous image exists. Automatic rollback is unavailable."
fi

exit 1
