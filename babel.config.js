module.exports = {
  presets: [
    'react-app-babel-7',
    {
      flow: false,
    },
    '@babel/typescript',
  ],
  plugins: ['transform-es2015-modules-commonjs', 'dynamic-import-node'],
}
