// eslint-disable-next-line import/unambiguous
module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    ['@babel/preset-env', { loose: true }],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'transform-es2015-modules-commonjs',
    'dynamic-import-node',
  ],
}
