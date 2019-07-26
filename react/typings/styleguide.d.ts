import Box from '../Box'

declare module 'vtex.styleguide' {
  interface StyleguideExports {
    Box: typeof Box
  }
  const styleguideExports: StyleguideExports
  export = styleguideExports
}
