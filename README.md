# Qontak Prototype

UI prototype for Mekari Qontak built with Nuxt 4 and Pixel 3 design system.

## Stack

- **Framework**: Nuxt 4, Vue 3, TypeScript
- **Design system**: `@mekari/pixel3` (token mode 2.4)
- **Deployment**: Cloudflare Pages

## Prerequisites

- Node.js v22+
- pnpm v9+

## Getting Started

### 1. Clone

```bash
git clone https://github.com/Pixel-Vibe/qontak-prototype.git
cd qontak-prototype
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run dev server

```bash
pnpm dev
```

Opens at `http://localhost:3000`.

### Login credentials

This prototype uses dummy auth (no backend).

| Field    | Value                  |
| -------- | ---------------------- |
| Email    | `prototype@qontak.com` |
| Password | `qontakuhuy`           |

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `pnpm dev`      | Start dev server                 |
| `pnpm build`    | Build for production             |
| `pnpm preview`  | Preview production build locally |
| `pnpm lint`     | Lint with ESLint                 |
| `pnpm lint:fix` | Auto-fix lint issues             |
| `pnpm format`   | Format with Prettier             |

## Deployment

Deployed via Cloudflare Pages (git-connected). Push to `main` triggers auto-deploy.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, page templates, designer vibe coding guide, and PR process.
