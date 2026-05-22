# Qontak Prototype

UI prototype for Mekari Qontak built with Nuxt 4 and Pixel 3 design system.

## Stack

- **Framework**: Nuxt 4, Vue 3, TypeScript
- **Design system**: `@mekari/pixel3` (token mode 2.4)
- **Deployment**: Cloudflare Pages

## Prerequisites

- Node.js ≥ 18
- npm, pnpm, yarn, or bun

## Getting Started

### 1. Clone

```bash
git clone https://github.com/Pixel-Vibe/qontak-prototype.git
cd qontak-prototype
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run dev server

```bash
npm run dev
```

Opens at `http://localhost:3000`.

### Login credentials

This prototype uses dummy auth (no backend).

| Field    | Value                  |
| -------- | ---------------------- |
| Email    | `prototype@qontak.com` |
| Password | `qontakuhuy`           |

## Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start dev server                 |
| `npm run build`    | Build for production             |
| `npm run preview`  | Preview production build locally |
| `npm run lint`     | Lint with ESLint                 |
| `npm run lint:fix` | Auto-fix lint issues             |
| `npm run format`   | Format with Prettier             |

## Deployment

Deployed via Cloudflare Pages (git-connected). Push to `main` triggers auto-deploy.
