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
    },
    {
      name: 'Components',
      content: './docs/components.md',
      components: function() {
        return [
          './src/components/Alert/index.js',
          './src/components/Button/index.js',
          './src/components/Card/index.js',
          './src/components/Icon/index.js',
          './src/components/Input/index.js',
          './src/components/Spinner/index.js',
          './src/components/Toggle/index.js',
          './src/components/Dropdown/index.js',
        ]
      },
    },
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
