const path = require('path')

module.exports = {
  require: ['vtex-tachyons'],
  showUsage: true,
  title: 'VTEX Styleguide',
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Introduction',
      content: './docs/introduction.md',
      //components: './src/Chart.js'
    }, {
      name: 'VTEX Tachyons',
      content: './docs/vtex-tachyons.md',
      //components: './src/Chart.js'
    }, {
      name: 'Components',
      content: './docs/components.md',
      components: function() { return [
        './src/components/Alert/index.js',
        './src/components/Button/index.js',
        './src/components/Input/index.js',
        './src/components/Spinner/index.js',
        './src/components/Toggle/index.js',
        './src/components/Icons/Check/index.js',
        './src/components/Icons/Close/index.js',
        './src/components/Icons/Deny/index.js',
        './src/components/Icons/Error/index.js',
        './src/components/Icons/Success/index.js',
        './src/components/Icons/Warning/index.js',
        ];
      }
    }
  ],
  getComponentPathLine(componentPath) {
    const pathArray = path.dirname(componentPath).split(path.sep)
    const componentName = pathArray[pathArray.length - 1]
    const dir = path.relative(
      path.join('src', 'components'),
      path.dirname(componentPath)
    )
    return `import ${componentName} from '@vtex/styleguide/lib/${dir}';`
  },
}
