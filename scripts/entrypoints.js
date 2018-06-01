const path = require('path')
const fs = require('fs')

const componentsFolder = path.join(__dirname, '../react/components')
const iconsFolder = path.join(__dirname, '../react/components/icon')
const entrypointsFolder = path.join(__dirname, '../react')

const isComponentFolder = (s) => s.charAt(0).toUpperCase() === s.charAt(0) && path.extname(s) === ''

const entrypointTemplate = (e, isIcon) => `import ${e} from './components/${isIcon ? `icon/${e}` : e}/index'

export default ${e}
`

fs.readdir(componentsFolder, (err, files) => {
  if (err) {
    throw err
  }

  files.filter(isComponentFolder).forEach(file => {
    const entrypointPath = path.join(entrypointsFolder, `${file}.js`)
    console.log(`Writing ${entrypointPath}`)
    fs.writeFileSync(entrypointPath, entrypointTemplate(file, false))
  })
})

fs.readdir(iconsFolder, (err, files) => {
  if (err) {
    throw err
  }

  files.filter(isComponentFolder).forEach(file => {
    const entrypointPath = path.join(entrypointsFolder, `Icon${file}.js`)
    console.log(`Writing ${entrypointPath}`)
    fs.writeFileSync(entrypointPath, entrypointTemplate(file, true))
  })
})
