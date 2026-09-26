# Windows Release Checklist

## Before commit

The long-term stable line for this release is **v1.4.16**. Keep the 1.4.12 dependency baseline unless a security fix requires a dependency change.

```powershell
npm install
npm run lint
npm run validate:project
npm run build
```

## Version

Update `package.json` first. Example:

```text
package.json = 1.4.16
tag = v1.4.16
```

## Release

```powershell
git add .
git commit -m "Release v1.4.17"
git push origin main
git tag v1.4.17
git push origin v1.4.17
```
git tag -d v1.4.7 - delete a tag
git push origin --delete v1.4.17


## Expected GitHub assets

- `CBMS-Insights-Setup-1.4.16.exe`
- `latest.yml`
- `CBMS-Insights-Setup-1.4.16.exe.blockmap`

## Auto-update test

Install the previous version, publish the new version, run the previous installed application while online, click **Check updates**, download, restart, and verify the new version.
