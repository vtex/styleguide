/* eslint-disable */
const config = require('vtex-tachyons/config.json')

module.exports = {
    styles: {
        TabButton: {
            button: {
                color: config.colors['blue'],
                width: '100%',
                fontWeight: 'bold',
                borderBottom: `1px solid ${config.colors.pink}`,
                textTransform: 'uppercase',
                transition: 'none',
            },
        },
        ComponentsList: {
            heading: {
                // fontWeight: '700',
                // textTransform: 'uppercase'
                marginTop: '3rem !important',
                fontSize: '1.2rem',
            },
        },
        StyleGuide: {
            logo: {
                border: 0,
            },
            sidebar: {
                border: 0,
                // '& li > a': {
                //     color: 'white !important',
                // },
            },
        },
    },

    theme: {
        color: {
            link: '#134CD8',
            linkHover: '#0C389F',
            sidebarBackground: '#FFF',
            // sidebarBackground: '#fa0d61',
            // border: 'red',
            // name: 'red',
        },
        fontFamily: {
            base: 'Fabriga, sans-serif',
        },
        fontSize: {
            base: 14,
            text: 16,
            small: 12,
        },
        maxWidth: 1100,
        sidebarWidth: 300,
    }
}