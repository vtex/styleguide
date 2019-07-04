/* eslint-disable import/unambiguous */
const path = require('path')
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
    'focus-visible',
    path.join(__dirname, './docs/styles/styles.css'),
  ],
  usageMode: 'expand',
  exampleMode: 'collapse',
  pagePerSection: true,
  title: 'VTEX Styleguide',
  styles,
  theme,
  sections: [
    {
      name: 'Introduction',
      sectionDepth: 2,
      content: './docs/introduction.md',
      sections: [
        {
          name: 'Developing',
          content: 'docs/developing.md',
        },
        {
          name: 'Designing',
          content: 'docs/designing.md',
        },
      ],
    },
    {
      name: 'Guides',
      content: './docs/guides.md',
    },
    {
      name: 'Styles',
      sections: [
        {
          name: '',
          content: 'docs/styles/introduction.md',
        },
        {
          name: 'Breakpoints',
          content: 'docs/styles/breakpoints.md',
        },
        {
          name: 'Colors',
          content: 'docs/styles/colors.md',
        },
        {
          name: 'Spacing',
          content: 'docs/styles/spacing.md',
        },
        {
          name: 'Typography',
          content: 'docs/styles/typography.md',
        },
      ],
    },
    {
      name: 'Icons',
      content: 'react/components/icon/README.md',
    },
    {
      name: 'Charts',
      content: './docs/charts.md',
    },
    {
      name: 'Components',
      content: './docs/components.md',
      skipComponentsWithoutExample: true,
      sectionDepth: 2,
      sections: [
        {
          name: 'Admin structure',
          components: [
            'react/components/Layout/index.js',
            'react/components/PageBlock/index.js',
            'react/components/PageHeader/index.js',
          ],
        },
        {
          name: 'Containers',
          components: [
            'react/components/Box/index.js',
            'react/components/Card/index.js',
            'react/components/Collapsible/index.js',
          ],
        },
        {
          name: 'Display',
          components: [
            'react/components/EmptyState/index.js',
            'react/components/FilterBar/index.js',
            'react/components/FilterOptions/index.js',
            'react/components/Spinner/index.js',
            'react/components/Table/index.js',
            'react/components/Tag/index.js',
            'react/components/ProgressBar/index.js',
            'react/components/Totalizer/index.js',
          ],
        },
        {
          name: 'Forms',
          components: [
            'react/components/ActionMenu/index.js',
            'react/components/Button/index.js',
            'react/components/ButtonGroup/index.js',
            'react/components/ButtonWithIcon/index.js',
            'react/components/Checkbox/index.js',
            'react/components/CheckboxGroup/index.js',
            'react/components/ColorPicker/index.js',
            'react/components/DatePicker/index.js',
            'react/components/Dropdown/index.js',
            'react/components/Input/index.js',
            'react/components/InputCurrency/index.js',
            'react/components/InputPassword/index.js',
            'react/components/InputSearch/index.js',
            'react/components/MultiSelect/index.js',
            'react/components/NumericStepper/index.js',
            'react/components/RadioGroup/index.js',
            'react/components/Slider/index.js',
            'react/components/Textarea/index.js',
            'react/components/Toggle/index.js',
          ],
        },
        {
          name: 'Navigation',
          components: [
            'react/components/Pagination/index.js',
            'react/components/Tabs/index.js',
          ],
        },
        {
          name: 'Notification',
          components: [
            'react/components/Alert/index.js',
            'react/components/Spinner/index.js',
            'react/components/ToastProvider/index.js',
          ],
        },
        {
          name: 'Overlays',
          components: [
            'react/components/Modal/index.js',
            'react/components/ModalDialog/index.js',
          ],
        },
        {
          name: '👻 Experimental',
          content: './docs/components_experimental.md',
          components: [
            'react/components/EXPERIMENTAL_Conditions/index.js',
            'react/components/EXPERIMENTAL_Select/index.js',
          ],
        },
      ],
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
      ],
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
  handlers: componentPath => {
    require('react-docgen').defaultHandlers.concat(
      require('react-docgen-displayname-handler').createDisplayNameHandler(
        componentPath
      )
    )
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
    'slots/CodeTabButton': path.join(__dirname, 'react/docs/CodeTabButton'),
    'slots/UsageTabButton': path.join(__dirname, 'react/docs/UsageTabButton'),
  },
  editorConfig: {
    lineWrapping: true,
    smartIndent: true,
    matchBrackets: true,
    lineNumbers: false,
    theme: 'monokai', // more themes: https://codemirror.net/theme/
  },
  template: {
    favicon: 'https://brand.vtex.com/favicon.ico',
    head: {
      raw: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M4WMB9F');</script>
<!-- End Google Tag Manager -->`,
    },
    body: {
      raw: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M4WMB9F"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
    },
  },
  assetsDir: './assets',
}
