const path = require('path')
const fs = require('fs')

const packageJsonPath = path.join(__dirname, '../package.json')
const manifestJsonPath = path.join(__dirname, '../manifest.json')

const pkg = JSON.parse(fs.readFileSync(packageJsonPath).toString())
const manifest = JSON.parse(fs.readFileSync(manifestJsonPath).toString())

// TODO: Fix this
// (this is run pre-releasy, so the new version is not updated on package.json
// by the time this script is run. The result is that it tries to update to the
// same version, and fail (e.g. Updating version from 5.2.3 to 5.2.3)

// console.log(`Updating manifest version from ${manifest.version} to ${pkg.version}`)
// manifest.version = pkg.version

// fs.writeFileSync(manifestJsonPath, JSON.stringify(manifest, null, 2))

console.log(`Updating manifest version from ${pkg.version} to ${manifest.version}`)
