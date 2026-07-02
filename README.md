# Nexera Group Frontend

Production-oriented Angular frontend for the Nexera Group company website.

This application presents the company, its services, portfolio, engineering approach, and contact channels through a single-page application with lazy-loaded feature modules, route-aware SEO metadata, theme support, reusable UI primitives, and a validated contact enquiry flow.

## What This Website Does

The website is a marketing and lead-generation platform for Nexera Group. Its main responsibilities are:

- Present the Nexera Group brand, positioning, and engineering value proposition.
- Explain the company's service lines such as custom software, SaaS, AI, DevOps, modernization, and support.
- Showcase selected portfolio work across multiple industries.
- Provide a contact experience that captures project enquiries and routes them to the backend contact endpoint.
- Expose SEO-friendly page metadata for the main public routes.
- Provide a responsive user experience across desktop and mobile.

## Main User Flows

- `Home` introduces the brand, core strengths, service categories, audience fit, process, and technology stack.
- `About` explains the company mission, values, engineering principles, and capabilities.
- `Services` details delivery areas, service categories, engagement models, and the engineering process.
- `Portfolio` highlights selected projects with category filtering and outbound project links.
- `Contact` captures project enquiries through a validated form and exposes direct contact methods such as email, phone, WhatsApp, and location.

## Route Structure

The application uses a shared main layout and lazy-loads each public page.

```text
/
/about
/services
/portfolio
/contact
```

Additional in-page navigation is used on the services screen through URL fragments such as:

```text
/services#custom-software
/services#devops
/services#mobile
/services#maintenance
```

## Technology Stack

- Angular 19
- TypeScript
- RxJS
- Angular Router
- Angular Reactive Forms
- Angular Animations
- Font Awesome
- CSS-based theme system with light and dark modes

## Architecture Summary

The frontend is organized around four primary application layers:

- `core`: cross-cutting runtime services such as SEO, theme state, and alert state.
- `layout`: global page shell components including the header, navigation, footer, and main layout container.
- `shared`: reusable UI building blocks and directives used across feature modules.
- `features`: route-level business pages such as home, about, services, portfolio, and contact, each with its own page data contracts through `interfaces/`.

This separation keeps route concerns, shared presentation concerns, and application-wide runtime concerns distinct.

## Folder Structure

```text
client/
├── angular.json
├── package.json
├── pnpm-lock.yaml
├── proxy.conf.dev.json
├── proxy.conf.staging.json
├── proxy.conf.prod.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── public/
│   ├── favicon.ico
│   ├── images/
│   │   ├── black-logo.png
│   │   ├── black-name.png
│   │   ├── dpo.png
│   │   ├── white-logo.png
│   │   └── white-name.png
│   └── logos/
│       ├── angular.png
│       ├── aws.png
│       ├── azure.png
│       ├── chatgpt.png
│       ├── docker.png
│       ├── figma.png
│       ├── flutter.png
│       ├── gcp.png
│       ├── git.png
│       ├── github.png
│       ├── grafana.png
│       ├── java.png
│       ├── jest.png
│       ├── kubernetes.png
│       ├── mysql.png
│       ├── nestjs.png
│       ├── next.js.png
│       ├── nodejs.png
│       ├── postgresql.png
│       ├── prometheus.png
│       ├── python.png
│       ├── react.png
│       ├── redis.png
│       ├── sentry.png
│       ├── swift.png
│       └── tensorflow.png
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   ├── app/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── core/
│   │   │   ├── core.module.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── http-error.interceptor.ts
│   │   │   ├── model/
│   │   │   │   ├── alert.model.ts
│   │   │   │   ├── api-response.model.ts
│   │   │   │   ├── seo.model.ts
│   │   │   │   └── theme.model.ts
│   │   │   └── service/
│   │   │       ├── alert.service.ts
│   │   │       ├── api.service.ts
│   │   │       ├── seo.service.ts
│   │   │       └── theme.service.ts
│   │   ├── layout/
│   │   │   ├── layout.module.ts
│   │   │   └── components/
│   │   │       ├── footer/
│   │   │       │   ├── footer.component.css
│   │   │       │   ├── footer.component.html
│   │   │       │   ├── footer.component.spec.ts
│   │   │       │   └── footer.component.ts
│   │   │       ├── header/
│   │   │       │   ├── header.component.css
│   │   │       │   ├── header.component.html
│   │   │       │   ├── header.component.spec.ts
│   │   │       │   └── header.component.ts
│   │   │       ├── main-layout/
│   │   │       │   ├── main-layout.component.css
│   │   │       │   ├── main-layout.component.html
│   │   │       │   ├── main-layout.component.spec.ts
│   │   │       │   └── main-layout.component.ts
│   │   │       └── navigation/
│   │   │           ├── navigation.component.css
│   │   │           ├── navigation.component.html
│   │   │           ├── navigation.component.spec.ts
│   │   │           └── navigation.component.ts
│   │   ├── shared/
│   │   │   ├── shared.module.ts
│   │   │   ├── components/
│   │   │   │   ├── alert/
│   │   │   │   │   ├── alert.component.css
│   │   │   │   │   ├── alert.component.html
│   │   │   │   │   ├── alert.component.spec.ts
│   │   │   │   │   └── alert.component.ts
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.component.css
│   │   │   │   │   ├── button.component.html
│   │   │   │   │   ├── button.component.spec.ts
│   │   │   │   │   └── button.component.ts
│   │   │   │   ├── card/
│   │   │   │   │   ├── card.component.css
│   │   │   │   │   ├── card.component.html
│   │   │   │   │   ├── card.component.spec.ts
│   │   │   │   │   └── card.component.ts
│   │   │   │   ├── input/
│   │   │   │   │   ├── input.component.css
│   │   │   │   │   ├── input.component.html
│   │   │   │   │   ├── input.component.spec.ts
│   │   │   │   │   └── input.component.ts
│   │   │   │   ├── loader/
│   │   │   │   │   ├── loader.component.css
│   │   │   │   │   ├── loader.component.html
│   │   │   │   │   ├── loader.component.spec.ts
│   │   │   │   │   └── loader.component.ts
│   │   │   │   └── text/
│   │   │   │       ├── text.component.css
│   │   │   │       ├── text.component.html
│   │   │   │       ├── text.component.spec.ts
│   │   │   │       └── text.component.ts
│   │   │   └── directives/
│   │   │       └── animation.directive.ts
│   │   └── features/
│   │       ├── about/
│   │       │   ├── about-routing.module.ts
│   │       │   ├── about.module.ts
│   │       │   ├── interfaces/
│   │       │   │   └── about.interface.ts
│   │       │   └── pages/
│   │       │       └── about-page/
│   │       │           ├── about-page.component.css
│   │       │           ├── about-page.component.html
│   │       │           ├── about-page.component.spec.ts
│   │       │           └── about-page.component.ts
│   │       ├── contact/
│   │       │   ├── contact-routing.module.ts
│   │       │   ├── contact.module.ts
│   │       │   ├── interfaces/
│   │       │   │   └── contact.interface.ts
│   │       │   ├── pages/
│   │       │   │   └── contact-page/
│   │       │   │       ├── contact-page.component.css
│   │       │   │       ├── contact-page.component.html
│   │       │   │       ├── contact-page.component.spec.ts
│   │       │   │       └── contact-page.component.ts
│   │       │   └── services/
│   │       │       └── contact.service.ts
│   │       ├── home/
│   │       │   ├── home-routing.module.ts
│   │       │   ├── home.module.ts
│   │       │   ├── interfaces/
│   │       │   │   └── home.interface.ts
│   │       │   └── pages/
│   │       │       └── home-page/
│   │       │           ├── home-page.component.css
│   │       │           ├── home-page.component.html
│   │       │           ├── home-page.component.spec.ts
│   │       │           └── home-page.component.ts
│   │       ├── portfolio/
│   │       │   ├── interfaces/
│   │       │   │   └── portfolio.interface.ts
│   │       │   ├── portfolio-routing.module.ts
│   │       │   ├── portfolio.module.ts
│   │       │   └── pages/
│   │       │       └── portfolio-page/
│   │       │           ├── portfolio-page.component.css
│   │       │           ├── portfolio-page.component.html
│   │       │           ├── portfolio-page.component.spec.ts
│   │       │           └── portfolio-page.component.ts
│   │       └── services/
│   │           ├── interfaces/
│   │           │   └── services.interface.ts
│   │           ├── services-routing.module.ts
│   │           ├── services.module.ts
│   │           └── pages/
│   │               └── services-page/
│   │                   ├── services-page.component.css
│   │                   ├── services-page.component.html
│   │                   ├── services-page.component.spec.ts
│   │                   └── services-page.component.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   ├── environments.dev.ts
│   │   ├── environments.prod.ts
│   │   └── environments.staging.ts
│   └── styles/
│       ├── abstracts/
│       │   └── variables.css
│       ├── base/
│       │   ├── global.css
│       │   ├── reset.css
│       │   └── typography.css
│       ├── themes/
│       │   ├── dark-theme.css
│       │   └── light-theme.css
│       └── media-queries.css
└── README.md
```

## Folder Responsibilities

### `src/app/core`

Application-wide runtime concerns.

- `service/seo.service.ts`: attaches route-aware title, meta, Open Graph, Twitter, canonical, and JSON-LD metadata.
- `service/theme.service.ts`: manages light/dark theme state and persists the selected mode in browser storage.
- `service/alert.service.ts`: manages global alert and confirmation dialog state.
- `service/api.service.ts`: reserved for shared API abstraction work, currently not implemented.
- `guards/` and `interceptors/`: extension points for request handling and route protection, currently scaffolded.
- `model/`: shared data models for alerts, SEO, theme, and API response typing.

### `src/app/layout`

Shared page chrome for all public routes.

- `header`: top-level brand and navigation entry point.
- `navigation`: reusable navigation component with mobile menu support and theme toggle.
- `footer`: persistent footer with contact and navigation links.
- `main-layout`: shell that wraps all public route content.

### `src/app/shared`

Reusable UI primitives used across features.

- `button`: configurable button abstraction.
- `input`: configurable input and textarea abstraction with validation messaging support.
- `alert`: global alert dialog component connected to `AlertService`.
- `card`, `text`, `loader`: common presentation utilities.
- `directives/animation.directive.ts`: scroll-triggered reveal animation directive.

### `src/app/features`

Route-level modules and page composition.

- `home`: landing page and brand overview, typed through `interfaces/home.interface.ts`.
- `about`: company story, values, mission, and operating principles, typed through `interfaces/about.interface.ts`.
- `services`: detailed service descriptions and engagement models, typed through `interfaces/services.interface.ts`.
- `portfolio`: selected project showcase with category filtering, typed through `interfaces/portfolio.interface.ts`.
- `contact`: direct contact methods and project enquiry form, typed through `interfaces/contact.interface.ts`.

Feature interfaces now serve as page-level data contracts for hero content, stats, process steps, service blocks, portfolio items, and contact payloads. This keeps feature data shapes explicit and reduces inline type duplication inside page components.

### `src/environments`

Environment-specific runtime settings.

- `environments.dev.ts`: local development profile.
- `environments.staging.ts`: staging profile.
- `environments.prod.ts`: production profile.
- `environment.ts`: default fallback file used by Angular replacement rules.

### `src/styles`

Global styling system.

- `abstracts/variables.css`: design tokens and shared variables.
- `base/reset.css`: CSS reset.
- `base/global.css`: global element styling.
- `base/typography.css`: typography rules.
- `themes/light-theme.css`: light theme variables.
- `themes/dark-theme.css`: dark theme variables.
- `media-queries.css`: responsive behavior.

### `public`

Static assets copied directly into the build output.

- `images/`: brand assets and image resources.
- `logos/`: technology/logo assets rendered across the site.

## Core Features

- Lazy-loaded public route modules for better route separation.
- Feature-scoped interfaces for stronger typing and clearer data contracts.
- Shared layout shell across all public pages.
- Route-level SEO metadata definitions.
- Light/dark theme switching with persistence.
- Animated page sections and reveal effects.
- Responsive navigation and footer structure.
- Shared UI component system for buttons, inputs, alerts, cards, and text.
- Contact form built with reactive forms and client-side validation.
- Environment-based API endpoint usage for the contact flow.
- Portfolio filtering by category.
- Services deep-link support through fragment-based navigation.

## Contact Flow

The contact page is the primary lead capture flow.

- Users enter name, email, phone, company, service type, budget, and project details.
- Validation is handled client-side using Angular Reactive Forms.
- The payload is posted to the backend contact endpoint derived from the active environment configuration.
- Success, warning, and error feedback is displayed through the global alert system.

## SEO Strategy

Each public route defines its own page metadata through route `data.seo`.

The current SEO layer supports:

- document title
- meta description
- keywords
- Open Graph tags
- Twitter card tags
- canonical URLs
- optional JSON-LD injection

This behavior is centralized in `src/app/core/service/seo.service.ts`.

## Theme System

The theme system is managed by `ThemeService`.

- Supports `light` and `dark` modes.
- Persists user preference in local storage.
- Applies theme classes to both the `html` and `body` elements.
- Updates the browser `theme-color` meta tag to match the active theme.

## Build and Runtime Commands

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm start
```

Run explicit environment targets:

```bash
pnpm start:dev
pnpm start:staging
pnpm start:prod
```

Build targets:

```bash
pnpm build
pnpm build:dev
pnpm build:staging
pnpm build:prod
```

Docker build:

```bash
docker build -t nexera-group-client .
```

Docker run:

```bash
docker run --rm -p 8080:80 \
  -e PORT=80 \
  -e API_UPSTREAM=https://api.nexeragroup.rw \
  nexera-group-client
```

Docker Compose:

```bash
docker compose up --build -d
```

Validation commands:

```bash
pnpm run typecheck
pnpm run typecheck:spec
pnpm run verify
```

Unit tests:

```bash
pnpm test
```

## Environment and Proxy Behavior

In local and deployed Angular configurations, the frontend uses `/api` as the contact API base for development, staging, and production environment profiles.

Proxy files are used for local development server forwarding:

- `proxy.conf.dev.json`
- `proxy.conf.staging.json`
- `proxy.conf.prod.json`

This allows the frontend to keep API calls same-origin from the browser perspective while routing requests to environment-specific backend targets during local serving.

## Quality Gates

Current built-in checks:

- application TypeScript compile check
- spec TypeScript compile check
- Karma test runner support
- Angular environment-specific build targets

Recommended next enterprise-grade improvements:

- add linting and format enforcement
- add end-to-end test coverage for primary public flows
- add CI pipeline enforcement for `verify` and production build
- add accessibility audits
- add performance budget monitoring in CI
- add production error monitoring and analytics

## Current Status

What is in place:

- public route architecture
- reusable UI component layer
- SEO service
- theme service
- validated contact flow
- environment-based API resolution
- responsive layout structure

What still needs attention:

- production build stability should be verified in the target deployment environment
- `core/api.service.ts`, `core/interceptors/`, and `core/guards/` are scaffolded but not yet actively used
- automated test coverage is still lightweight for an enterprise release process

## Deployment Notes

The application builds to:

```text
dist/client
```

## Docker Deployment

The project now includes a containerized deployment path for the frontend.

### Files

- `Dockerfile`: multi-stage production image build
- `.dockerignore`: excludes local build noise from the Docker context
- `.env.example`: example runtime variables for Docker Compose
- `docker-compose.yml`: convenience local deployment wrapper
- `docker/nginx/default.conf.template`: Nginx runtime config with SPA routing and `/api` proxying

### Deployment Design

- Stage 1 uses `node:20-bookworm-slim` to install dependencies, run validation, and create the production Angular build.
- Stage 2 uses `nginx:alpine` to serve the compiled frontend.
- Nginx handles Angular SPA fallback by routing unknown paths to `index.html`.
- Nginx proxies `/api/*` requests to the backend defined by `API_UPSTREAM`.

### Runtime Environment Variables

- `PORT`: Nginx listen port inside the container. Default is `80`.
- `API_UPSTREAM`: backend base URL used by the Nginx `/api` proxy. Default is `https://api.nexeragroup.rw`.

### Example Production Run

```bash
docker run -d \
  --name nexera-group-client \
  -p 8080:80 \
  -e PORT=80 \
  -e API_UPSTREAM=https://api.nexeragroup.rw \
  nexera-group-client
```

Then access the app at:

```text
http://localhost:8080
```

### Why Docker Helps Here

- It isolates the frontend build from the local macOS Node runtime that previously crashed during `ng build`.
- It gives you a repeatable Linux-based production build path.
- It keeps SPA serving and API proxy behavior consistent between environments.

Before production deployment, validate:

- the production API reverse proxy or gateway for `/api/contact`
- the final domain used by canonical and social metadata
- the production Angular build on the deployment Node runtime
- mobile responsiveness across main breakpoints
- form submission behavior against the real backend

## Recommended README Maintenance Rules

Keep this document updated whenever any of the following change:

- public routes
- environment behavior
- proxy targets
- folder ownership
- shared component inventory
- contact flow payload or endpoint behavior
- build and verification commands
