# syntax=docker/dockerfile:1.7

FROM node:20-bookworm-slim AS build

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run verify
RUN pnpm run build:prod

# Normalize Angular output for the runtime stage.
RUN mkdir -p /opt/webroot && \
    if [ -d dist/client/browser ]; then \
      cp -R dist/client/browser/. /opt/webroot/; \
    else \
      cp -R dist/client/. /opt/webroot/; \
    fi

FROM nginx:1.27-alpine AS runtime

ENV PORT=80
ENV API_UPSTREAM=https://api.nexeragroup.rw

COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /opt/webroot/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

