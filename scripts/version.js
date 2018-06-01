const path = require('path')
const fs = require('fs')

const packageJsonPath = path.join(__dirname, '../package.json')
const manifestJsonPath = path.join(__dirname, '../manifest.json')

const pkg = JSON.parse(fs.readFileSync(packageJsonPath).toString())
const manifest = JSON.parse(fs.readFileSync(manifestJsonPath).toString())

console.log(`Updating manifest version from ${manifest.version} to ${pkg.version}`)
manifest.version = pkg.version

fs.writeFileSync(manifestJsonPath, JSON.stringify(manifest, null, 2))
