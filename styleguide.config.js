const path = require('path')
const config = require('vtex-tachyons/config.json')

module.exports = {
  require: ['vtex-tachyons'],
  showUsage: false,
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
      components: 'src/components/**/index.js',
    },
  ],
  getComponentPathLine(componentPath) {
    const pathArray = path.dirname(componentPath).split(path.sep)
    const componentName = pathArray[pathArray.length - 1]
    const dir = path.relative(
      path.join('src', 'components'),
      path.dirname(componentPath),
    )
    return `import ${componentName} from '@vtex/styleguide/lib/${dir}';`
  },
  webpackConfig: require('@vtex/react-scripts/config/webpack.config.dev.js'),
  theme: {
    color: {
      link: config.colors.blue,
      linkHover: config.colors['heavy-blue'],
    },
    fontSize: {
      h1: 36,
      h2: 24,
    },
  },
  styles: {
    TabButton: {
      button: {
        color: config.colors['near-black'],
        fontWeight: 'normal',
        borderBottom: `1px solid ${config.colors.blue}`,
        textTransform: 'initial',
      },
    },
  },
}
