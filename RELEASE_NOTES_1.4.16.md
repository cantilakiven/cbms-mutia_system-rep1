# CBMS Insights v1.4.16

## Stable maintenance release

Version 1.4.16 is based on the known-good 1.4.12 application baseline and adds focused Electron startup, renderer, security, and updater reliability improvements without broadly upgrading the runtime dependency stack.

### Startup and blank-window reliability
- Adds a native startup surface showing `Securing system…` while the local application server is prepared.
- Keeps the main window hidden until the application document is available.
- Uses a real Vite server for `electron:dev` instead of forking the production `.output` bundle.
- Adds renderer failure diagnostics for load failures, renderer-process exits, and renderer console errors.
- Keeps the security gate as the first application view; the protected app mounts only after authentication succeeds.

### Security hardening
- Restricts Electron IPC handlers to the trusted main renderer and expected loopback origin.
- Keeps the per-launch `X-CBMS-Session` capability header for the packaged local server.
- Adds a production-only CSP with a per-response nonce for the inline TanStack Start bootstrap script.
- Keeps Node integration disabled, context isolation enabled, and packaged DevTools shortcuts disabled.
- Adds size limits to large export and print payloads.
- Restricts writable/readable settings to the settings keys used by the application.
- Adds Electron security fuses used by the stable desktop runtime.

### Updater
- GitHub updater repository: `cantilakiven/cbms-mutia_system-rep1`
- Uses `electron-updater` with automatic background download and restart/install handling.
- Release workflow builds with publishing disabled, validates generated metadata, and publishes exactly one installer, `latest.yml`, and the matching blockmap.
- Existing release assets are not overwritten by reruns; missing assets can be uploaded without clobbering already-published files.

### Release baseline
- Version: `1.4.16`
- Windows target: NSIS x64
- Build Node line: Node.js 22
- Critical build dependency versions remain pinned by the committed lockfile.

## Auto-update test

The recommended validation is to install v1.4.15, publish v1.4.16, open v1.4.15 while online, use **Check updates**, confirm download progress and **Update ready**, then restart and confirm v1.4.16 is installed.
