# Windows Release Checklist

## Before commit

```powershell
npm install
npm run lint
npm run validate:project
npm run build
```

## Version

Update `package.json` first. Example:

```text
package.json = 1.2.7
tag = v1.2.7
```

## Release

```powershell
git add .
git commit -m "Release v1.4.14"
git push origin main
git tag v1.4.14
git push origin v1.4.14
```

## Expected GitHub assets

- `CBMS-Insights-Setup-1.2.7.exe`
- `latest.yml`
- `CBMS-Insights-Setup-1.2.7.exe.blockmap`

## Auto-update test

Install the previous version, publish the new version, run the previous installed application while online, click **Check updates**, download, restart, and verify the new version.


## v1.4.14 release-specific checks

- Confirm `package.json` and `package-lock.json` are version `1.4.14`.
- Confirm Vite `8.3.0`, `@vitejs/plugin-react` `6.1.1`, Electron `44.3.0`, Rolldown `1.2.9`, Lightning CSS `1.33.0`, and `@rolldown/pluginutils` `1.0.1`.
- Run `npm run validate:dependencies` and `npm run validate:project`.
- Verify `latest.yml` references `CBMS-Insights-Setup-1.4.14.exe` and the matching `.blockmap`.
- Test an already-installed v1.4.13 build against the v1.4.14 GitHub Release and confirm update download + restart.
- Verify normal Chrome/Edge cannot open the copied/dragged localhost renderer URL without the Electron session token.
- Verify print preview remains scrollable at 125%, 200%, and 300% zoom.
- Verify Compendium loading advances visibly from 1% through 100% before completion.
- Verify Statistical Reports contain the new Summary by Barangay companion table and the Compendium includes it without changing the existing overall tables.
