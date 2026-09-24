# GitHub Releases and Automatic Updates

## Production release assets

Every Windows release must contain exactly these updater assets:

- `CBMS-Insights-Setup-X.Y.Z.exe`
- `latest.yml`
- `CBMS-Insights-Setup-X.Y.Z.exe.blockmap`

The GitHub UI may also show its automatically generated source archives. Those source archives are a consequence of repository visibility; they are not uploaded by the release workflow.

## Versioning

Keep these identical:

```text
package.json version = 1.4.16
git tag             = v1.4.16
```

## Release commands

```powershell
git add .
git commit -m "Release v1.4.16"
git push origin main
git tag v1.4.16
git push origin v1.4.16
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
Installed version: 1.4.15
New release:       1.4.16
```

1. Install 1.4.15.
2. Publish 1.4.16.
3. Start 1.4.15 while online.
4. Click **Check updates**.
5. Wait for **New update** / download progress.
6. Confirm **Update ready**.
7. Restart the application.
8. Confirm the installed version is 1.4.16.

## Public source versus public release

If the source repository is public, GitHub will make the tag source archive visible. For source confidentiality, move the source repository to private and publish binaries from a separate public release-only repository. See `docs/GITHUB_SECURITY.md`.

### npm dependency installation in GitHub Actions

The release workflow uses the committed `package-lock.json` with `npm ci`, and setup-node npm caching is enabled. The exact dependency graph therefore comes from the lockfile used by every release build.

