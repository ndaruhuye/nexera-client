#!/usr/bin/env bash

set -Eeuo pipefail

# =============================================================================
# Nexera Angular Client - Staging Deployment
# =============================================================================

IMAGE_NAME="${1:?Docker image name is required}"
IMAGE_TAG="${2:?Docker image tag is required}"

COMPOSE_FILE="compose.staging.yml"
SERVICE_NAME="client"
CONTAINER_NAME="nexera-group-client-staging"
HEALTH_URL="http://127.0.0.1:8083/"

# The workflow uploads this script and compose.staging.yml
# into the same deployment directory.
DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export IMAGE_NAME
export IMAGE_TAG

cd "${DEPLOY_DIR}"

echo "=============================================="
echo "Nexera Client Staging Deployment"
echo "=============================================="
echo "Image:     ${IMAGE_NAME}:${IMAGE_TAG}"
echo "Directory: ${DEPLOY_DIR}"
echo "Compose:   ${COMPOSE_FILE}"
echo

if [[ ! -f "${COMPOSE_FILE}" ]]; then
  echo "ERROR: ${COMPOSE_FILE} was not found in ${DEPLOY_DIR}."
  exit 1
fi

echo "Validating Docker Compose configuration..."

docker compose \
  -f "${COMPOSE_FILE}" \
  config >/dev/null

echo "Pulling staging Docker image..."

docker compose \
  -f "${COMPOSE_FILE}" \
  pull "${SERVICE_NAME}"

echo "Starting staging container..."

docker compose \
  -f "${COMPOSE_FILE}" \
  up -d \
  --force-recreate \
  --remove-orphans \
  "${SERVICE_NAME}"

echo "Waiting for the staging client to become healthy..."

for attempt in $(seq 1 30); do
  if curl \
    --silent \
    --show-error \
    --fail \
    --max-time 5 \
    "${HEALTH_URL}" \
    >/dev/null; then

    echo
    echo "Staging client deployed successfully."
    echo

    docker compose \
      -f "${COMPOSE_FILE}" \
      ps

    exit 0
  fi

  echo "Health check ${attempt}/30 failed. Retrying..."
  sleep 3
done

echo
echo "ERROR: Staging client did not become healthy."
echo

docker compose \
  -f "${COMPOSE_FILE}" \
  ps || true

echo
echo "Recent container logs:"
echo

docker compose \
  -f "${COMPOSE_FILE}" \
  logs \
  --tail=150 \
  "${SERVICE_NAME}" || true

echo
echo "Container inspection:"
echo

docker inspect \
  "${CONTAINER_NAME}" \
  --format='Status={{.State.Status}} Health={{if .State.Health}}{{.State.Health.Status}}{{else}}not-configured{{end}}' \
  2>/dev/null || true

exit 1
