/* eslint-disable import/unambiguous */
const config = require('vtex-tachyons/config.json')

module.exports = {
  styles: {
    TabButton: {
      button: {
        color: '#00BBD4',
        width: '100%',
        fontWeight: 'bold',
        borderBottom: 'none !important',
        textTransform: 'uppercase !important',
        transition: 'none !important',
      },
      isActive: {
        borderBottom: 0,
      },
    },
    Logo: {
      logo: {
        color: `${config.colors['rebel-pink']} !important`,
        fontWeight: '900 !important',
        fontSize: '36px !important',
      },
    },
    headingSpacer: {
      marginBottom: '5rem',
    },
    StyleGuide: {
      logo: {
        border: 0,
      },
      sidebar: {
        border: 0,
        '& li > a': {
          color: `${config.colors['near-black']} !important`,
        },
        '& li > a:hover': {
          color: `${config.colors['gray']} !important`,
          cursor: 'pointer',
        },
      },
    },
  },

  theme: {
    color: {
      link: '#00BBD4',
      linkHover: '#0090a3',
      sidebarBackground: config.colors['near-white'],
    },
    fontFamily: {
      base: 'Fabriga, sans-serif',
    },
    fontSize: {
      base: 14,
      text: 16,
      small: 12,
    },
    maxWidth: 900,
    sidebarWidth: 270,
  },
}