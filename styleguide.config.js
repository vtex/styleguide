const path = require('path')
// const config = require('vtex-tachyons/config.json')
const webpackConfig = require('@vtex/react-scripts/config/webpack.config.dev.js')
const { version } = require('./manifest.json')
const { styles, theme } = require('./styleguide.styles.js')

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
  version: `${version}`,
  require: [
    'vtex-tachyons',
    path.join(__dirname, './docs/styles/styles.css'),
  ],
  usageMode: 'collapse',
  exampleMode: 'collapse',
  pagePerSection: true,
  title: 'VTEX Styleguide',
  styles,
  theme,
  sections: [
    {
      content: './docs/cover.md',
    },
    {
      name: 'Introduction',
      content: './docs/introduction.md',
    },
    {
      name: 'Components',
      content: './docs/components.md',
      components: 'react/components/*/index.js',
      skipComponentsWithoutExample: true,
      // sectionDepth: 2,
      // sections: [
      //   {
      //     name: 'Actions',
      //     components: 'react/components/_Actions/**/index.js',
      //   },
      // ],
    },
    {
      name: 'Icons',
      content: 'react/components/icon/README.md',
    },
    {
      name: 'External links',
      sections: [
        {
          name: 'VTEX.com',
          href: 'http://vtex.com/',
          external: true,
        },
        {
          name: 'Brand',
          href: 'http://brand.vtex.com/',
          external: true,
        },
        {
          name: 'Careers',
          href: 'http://careers.vtex.com/',
          external: true,
        },
      ]
    }
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
  styleguideComponents: {
    PathlineRenderer: path.join(__dirname, 'react/docs/Pathline'),
    HeadingRenderer: path.join(__dirname, 'react/docs/HeadingRenderer'),
    // TabButtonRenderer: path.join(__dirname, 'react/docs/TabButtonRenderer'),
  },
  editorConfig: {
    lineWrapping: true,
    smartIndent: true,
    matchBrackets: true,
    lineNumbers: false,
    theme: 'monokai', // more: https://codemirror.net/theme/
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
