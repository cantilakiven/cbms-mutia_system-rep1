- Fixed Windows Electron development startup: Vite and HMR now bind explicitly to 127.0.0.1, and Electron uses a resilient readiness probe to avoid the localhost IPv4/IPv6 timeout race.
# CBMS Insights v1.4.14

## Security and privacy

- Protected the Electron localhost renderer behind a per-launch authenticated loopback proxy so a copied or dragged renderer URL opened in a normal browser receives `401 Unauthorized` without the Electron session token.
- Added sender-validated IPC, denied navigation/window creation/webviews, denied permission requests, strict renderer sandboxing, CSP/security headers, and production Electron fuses.
- Removed the arbitrary renderer-exposed debug file-read IPC.
- Added strict bounds on export sizes, printable HTML, filenames, and export-log entries.
- Encrypted the desktop Export Log at rest with AES-256-GCM, using Electron `safeStorage` for the log key when available.
- Removed export passwords from the renderer's `localStorage` backup.

## Printing and preview

- Reworked print preview layout so the zoomed report remains inside a real scroll container.
- Added keyboard scrolling with Page Up, Page Down, Home, and End in the preview.
- Sandboxed preview frames and disabled referrer leakage.

## Compendium

- Added an animated 1%–100% build progress indicator with phase labels and completion states.
- Preserved the existing cleaner compendium layout while making long-generation feedback clearer.

## Statistical Reports

- Added a clean `Summary by Barangay` companion table to supported statistical reports.
- Barangay percentages/rates are calculated using each barangay's own applicable denominator.
- Added the same barangay-scoped tables to the Statistical Reports section of the Compendium without replacing the existing overall tables.

## Runtime and release engineering

- Updated Vite to `8.3.0` with `@vitejs/plugin-react` `6.1.1`.
- Updated Electron to `44.3.0`.
- Aligned Rolldown to `1.2.9`, Lightning CSS to `1.33.0`, and `@rolldown/pluginutils` to `1.0.1`.
- Added dependency-contract validation to the GitHub release workflow.
- Hardened the security workflow to fail on high/critical npm audit findings instead of continuing.
- Release tag and `package.json` version must both be `v1.4.14` / `1.4.14`.
- The GitHub release workflow publishes the Windows NSIS installer, `latest.yml`, and matching `.blockmap` needed by `electron-updater`.

## Existing v1.4.13 desktop installations

A v1.4.13 installation built against `cantilakiven/cbms-mutia_system-rep1` can receive v1.4.14 through the existing `electron-updater` flow once the v1.4.14 GitHub Release contains the installer, `latest.yml`, and `.blockmap`. Installations using a different old update repository still need the documented bridge-release migration.
### 1.4.14.1 Development startup hotfix
- Fixed `npm run electron:dev` opening a blank/white Electron window.
- Development Electron now loads the Vite development server on `127.0.0.1:8080` instead of attempting to fork the production Nitro `.output` server before a production build exists.
- Production packaged behavior remains unchanged and continues to use the protected per-launch local proxy.
