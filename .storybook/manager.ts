import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  panelPosition: 'bottom',

  theme: create({
    base: 'light',

    // UI
    appBorderRadius: 4,
    appBg: '#FFFFFF',
    textColor: '#3f3f40',

    // Typography
    fontBase: '"Fabriga", sans-serif',
    fontCode: 'monospace',

    brandTitle: 'VTEX Styleguide',
    brandUrl: '/',
    brandImage: null,
  }),
})
