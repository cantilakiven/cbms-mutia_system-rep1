# GitHub Releases and Automatic Updates

> **Repository migration:** The updater feed is now `github.com/cantilakiven/cbms-mutia_system-rep1`. Existing installations that were built with the former repository configuration will not automatically learn the new feed until they install a build containing this repository change; publish a bridge release on the old feed if seamless migration of already-installed builds is required.

## Production release assets

Every Windows release must contain exactly these updater assets:

- `CBMS-Insights-Setup-X.Y.Z.exe`
- `latest.yml`
- `CBMS-Insights-Setup-X.Y.Z.exe.blockmap`

The GitHub UI may also show its automatically generated source archives. Those source archives are a consequence of repository visibility; they are not uploaded by the release workflow.

## Versioning

Keep these identical:

```text
package.json version = 1.4.14
Git tag              = v1.4.14
```

## Release commands

```powershell
git add .
git commit -m "Release v1.4.14"
git push origin main
git tag v1.4.14
git push origin v1.4.14
```

## Workflow

The workflow:

1. checks repository safety;
2. checks package/tag version equality;
3. builds the web application;
4. builds NSIS with publishing disabled;
5. validates `latest.yml` and the installer;
6. creates one GitHub Release;
7. uploads `.exe`, `latest.yml`, and `.blockmap`;
8. verifies the published assets.

This design avoids the duplicate-release race caused by having both electron-builder and `gh release create` publish independently.

## Real auto-update test

Use a packaged installation, not `npm run electron:dev`.

Example:

```text
Installed version: 1.2.6
New release:       1.2.7
```

1. Install 1.2.6.
2. Publish 1.2.7.
3. Start 1.2.6 while online.
4. Click **Check updates**.
5. Wait for **New update** / download progress.
6. Confirm **Update ready**.
7. Restart the application.
8. Confirm the installed version is 1.2.7.

## Public source versus public release

If the source repository is public, GitHub will make the tag source archive visible. For source confidentiality, move the source repository to private and publish binaries from a separate public release-only repository. See `docs/GITHUB_SECURITY.md`.

### npm dependency installation in GitHub Actions

The release workflow commits `package-lock.json`, uses `npm ci` for reproducible installs, and enables `actions/setup-node` npm caching. Keep the lockfile in sync with `package.json` whenever dependencies or the application version are changed.



## v1.4.14 release scope

- Privacy hardening for the Electron localhost renderer and IPC boundary.
- Scroll-safe print preview at arbitrary zoom levels.
- Animated numeric Compendium build progress from 1% to 100%.
- Barangay-scoped statistical report tables in the Reports page and Compendium.
- Vite 8.3.0 / Electron 44.3.0 compatibility contract enforced by CI.
- Export Log AES-256-GCM at-rest encryption and password-free browser backup.

## v1.4.14 security, privacy, and maintenance note

The packaged app now serves the renderer through an authenticated loopback proxy with a per-launch token. Copying or dragging the renderer URL into a normal browser does not expose the CBMS application or its local data; requests without the Electron session token receive `401 Unauthorized`. The renderer also has sandboxing, context isolation, restricted navigation, denied permission requests, CSP/security headers, and sender-validated IPC. Export-log data is AES-256-GCM encrypted at rest on desktop, while browser localStorage stores a password-free backup.

For existing v1.4.13 installations built against `cantilakiven/cbms-mutia_system-rep1`, publishing the `v1.4.14` GitHub Release with `CBMS-Insights-Setup-1.4.14.exe`, `latest.yml`, and its `.blockmap` lets `electron-updater` discover and download the update. Installations built before a repository migration still require the bridge-release process described at the top of this document.
