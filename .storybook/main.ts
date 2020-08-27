const path = require('path')

const custom = require('../config/webpack.config.js')

module.exports = {
  stories: [
    '../react/playground/stories.tsx',
    '../react/components/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
  ],
  webpackFinal: config => {
    config.resolve.extensions.push('.ts', '.tsx')
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    }
  },
}
