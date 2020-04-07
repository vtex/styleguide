const path = require('path');

const custom = require('../config/webpack.config.js')

module.exports = {
  stories: ['../react/components/**/*.stories.tsx'],
  webpackFinal: (config) => {
    config.resolve.extensions.push('.ts', '.tsx')
    return { ...config, module: { ...config.module, rules: custom.module.rules } }
  }
}