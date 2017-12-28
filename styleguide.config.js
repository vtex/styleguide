const path = require('path')

module.exports = {
  require: ['vtex-tachyons'],
  showUsage: true,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'docs/one.md',
          description: 'The description for the one section',
        },
        {
          name: 'Configuration',
          content: 'docs/two.md',
        },
      ],
    },
    {
      name: 'Bundled components',
      components: 'src/components/**/*.{tsx,js}',
    },
    {
      name: 'Standalone components',
      content: 'docs/standalone-components.md',
    },
  ],
  propsParser: function(filePath, source, resolver, handlers) {
    if (filePath.includes('.tsx')) return require('react-docgen-typescript').parse(filePath)
    return require('react-docgen').parse(source, resolver, handlers)
  },
  getComponentPathLine(componentPath) {
    const pathArray = path.dirname(componentPath).split(path.sep)
    const componentName = pathArray[pathArray.length - 1]
    const dir = path.relative(path.join('src', 'components'), path.dirname(componentPath))
    return `import ${componentName} from '@vtex/styleguide/lib/${dir}';`
  },
}
