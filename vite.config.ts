// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Сборка для GitHub Pages (статичные файлы) включается только в GitHub Actions:
// PAGES_BUILD=1. Обычная сборка Lovable не меняется.
const pages = process.env.PAGES_BUILD === "1";
const base = process.env.PAGES_BASE || "/";

export default defineConfig(
  pages
    ? {
        vite: { base },
        nitro: false,
        tanstackStart: { server: { entry: "server" }, spa: { enabled: true } },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
