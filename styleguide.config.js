const path = require('path')
const config = require('vtex-tachyons/config.json')
const webpackConfig = require('@vtex/react-scripts/config/webpack.config.dev.js')
const { version } = require('./manifest.json')

// Monkey patch webpackConfig to change src/ to react/
const originalAppSrc = webpackConfig.module.rules[0].include
const appSrc = path.join(__dirname, 'react')

webpackConfig.module.rules[0].include = path.join(__dirname, 'react')

// Monkey patch webpackConfig to use eslint-loader instead of its default eslint rules
webpackConfig.module.rules[0].use = ['eslint-loader']

webpackConfig.module.rules[1].oneOf.forEach(r => {
  if (r.include === originalAppSrc) {
    r.include = appSrc
  }
  if (r.exclude === originalAppSrc) {
    r.exclude = appSrc
  }
})

module.exports = {
  components: 'react/components/**/*.{js,jsx,ts,tsx}',
  version: `${version}`,
  require: [
    'vtex-tachyons',
    path.join(__dirname, './docs/styles/styles.css'),
  ],
  usageMode: 'collapse',
  exampleMode: 'collapse',
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
      path.dirname(componentPath)
    )
    return {
      componentName,
      dir,
    }
  },
  webpackConfig: {
    ...require('@vtex/react-scripts/config/webpack.config.dev.js'),
    devServer: {
      disableHostCheck: true,
    },
  },
  theme: {
    color: {
      link: '#134CD8',
      linkHover: '#0C389F',
      codeBackground: '#F7F9FA',
      sidebarBackground: '#FFF',
      // ribbonBackground: 'blue',
      // ribbonText: '#fff',
      // border: 'red',
      name: 'red',
    },
    fontFamily: {
      base: 'Fabriga, sans-serif',
    },
    fontSize: {
      base: 14,
      text: 16,
      small: 12,
    },
    maxWidth: 900,
  },
  styleguideComponents: {
    PathlineRenderer: path.join(__dirname, 'react/docs/Pathline'),
    HeadingRenderer: path.join(__dirname, 'react/docs/HeadingRenderer'),
    TabButtonRenderer: path.join(__dirname, 'react/docs/TabButtonRenderer'),
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
  assetsDir: './assets',
}
