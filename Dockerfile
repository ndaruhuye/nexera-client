# syntax=docker/dockerfile:1.7

# =============================================================================
# BUILD STAGE
# Installs dependencies, verifies the project, and builds the Angular app.
# =============================================================================

FROM node:20-bookworm-slim AS build

# Use /app as the working directory for the Angular project.
WORKDIR /app

# Configure the location used by PNPM.
ENV PNPM_HOME="/pnpm"

# Add PNPM to the executable search path.
ENV PATH="$PNPM_HOME:$PATH"

# Enable package managers such as PNPM through Node Corepack.
RUN corepack enable

# Copy dependency files separately to improve Docker layer caching.
COPY package.json pnpm-lock.yaml ./

# Install the exact dependencies recorded in pnpm-lock.yaml.
RUN pnpm install --frozen-lockfile

# Copy the remaining application source code.
COPY . .

# Run the verification script configured in package.json.
#
# The Docker build stops when verification fails.
RUN pnpm run verify

# Create the production Angular build.
RUN pnpm run build:prod

# Normalize the Angular build output into /opt/webroot.
#
# Depending on the Angular builder, output may be generated in:
#
# - dist/client/browser
# - dist/client
#
# The build fails with a useful message if neither directory exists.
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
# Serves the compiled Angular application using a Node static server.
#
# Nginx is not installed inside this container.
# =============================================================================

FROM node:20-alpine AS runtime

# Use /app as the static website directory.
WORKDIR /app

# Install a lightweight static server.
#
# The version is pinned to make builds predictable.
RUN npm install --global serve@14.2.4

# Copy only the compiled Angular files from the build stage.
COPY --from=build /opt/webroot/ /app/

# Default port used by the static server inside the container.
ENV PORT=3000

# Document the container's internal port.
EXPOSE 3000

# Check whether the application responds inside the container.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

# Start the Angular static server.
#
# -s:
#   Enables SPA fallback so routes such as /dashboard return index.html.
#
# tcp://0.0.0.0:${PORT}:
#   Makes the server listen on every network interface inside the container.
CMD ["sh", "-c", "serve -s /app -l tcp://0.0.0.0:${PORT}"]
