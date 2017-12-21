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
      components: 'src/components/**/*.js',
    },
    {
      name: 'Standalone components',
      content: 'docs/standalone-components.md',
    },
  ],
}
