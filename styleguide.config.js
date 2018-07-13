const path = require('path')
const config = require('vtex-tachyons/config.json')
const webpackConfig = require('@vtex/react-scripts/config/webpack.config.dev.js')

// Monkey patch webpackConfig to change src/ to react/
const originalAppSrc = webpackConfig.module.rules[0].include
const appSrc = path.join(__dirname, 'react')

webpackConfig.module.rules[0].include = path.join(__dirname, 'react')
webpackConfig.module.rules[1].oneOf.forEach((r) => {
  if (r.include === originalAppSrc) {
    r.include = appSrc
  }
  if (r.exclude === originalAppSrc) {
    r.exclude = appSrc
  }
})

module.exports = {
  components: 'react/components/**/*.{js,jsx,ts,tsx}',
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
      components: 'react/components/**/index.js',
    },
    {
      name: 'Icons',
      content: 'react/components/icon/README.md',
    },
  ],
  getComponentPathLine(componentPath) {
    const pathArray = path.dirname(componentPath).split(path.sep)
    const componentName = pathArray[pathArray.length - 1]
    const dir = path.relative(
      path.join('react', 'components'),
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
  template: {
    head: {
      scripts: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-43760863-25',
        },
        {
          src: './analytics.js',
        },
      ],
    },
  },
}
