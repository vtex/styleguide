module.exports = {
  stories: ['../react/components/**/*.stories.(ts|tsx)'],
  webpackFinal: async config => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader')
      }
    ]

    config.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx'],
    }
    
    return config
  },
}