# syntax=docker/dockerfile:1.7

# =============================================================================
# BUILD STAGE
# =============================================================================

FROM node:20-bookworm-slim AS build

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Copy dependency files first for better Docker caching.
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Copy the Angular source code.
COPY . .

# Production is the default build.
# GitHub Actions overrides this with build:staging for staging.
ARG BUILD_SCRIPT=build:prod

# Run linting/tests/build verification configured in package.json.
RUN pnpm run verify

# Production:
# pnpm run build:prod
#
# Staging:
# pnpm run build:staging
RUN pnpm run "${BUILD_SCRIPT}"

# Normalize the Angular output directory.
RUN mkdir -p /opt/webroot && \
    if [ -d dist/client/browser ]; then \
      cp -R dist/client/browser/. /opt/webroot/; \
    elif [ -d dist/client ]; then \
      cp -R dist/client/. /opt/webroot/; \
    else \
      echo "ERROR: Angular build output was not found."; \
      echo "Available dist directories:"; \
      find dist -maxdepth 3 -type d -print 2>/dev/null || true; \
      exit 1; \
    fi

# =============================================================================
# RUNTIME STAGE
# =============================================================================

FROM node:20-alpine AS runtime

WORKDIR /app

# Static server used to serve the compiled Angular application.
RUN npm install --global serve@14.2.4

COPY --from=build /opt/webroot/ /app/

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK \
  --interval=30s \
  --timeout=5s \
  --start-period=10s \
  --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/').then(response => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1))"

# -s enables Angular SPA fallback.
CMD ["sh", "-c", "serve -s /app -l tcp://0.0.0.0:${PORT}"]
