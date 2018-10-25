const config = require('vtex-tachyons/config.json')

const styles = {
    TabButton: {
      button: {
        color: config.colors['near-black'],
        fontWeight: 'normal',
        // borderBottom: `1px solid ${config.colors.blue}`,
        textTransform: 'initial',
      },
    },
    ComponentsList: {
        heading: {
            fontWeight: '700 !important',
            // textTransform: 'uppercase'
        }
    },
    TabButton: {
        button: {
            width: '100%',
        },
        isActive: {
            border: 0,
        },
    },
    StyleGuide: {
        logo: {
            border: 0,
        },
        sidebar: {
            border: 0,
            // backgroundColor: '#fa0d61',
            // '& li > a': {
            //     color: 'white !important',
            // },
        },
    },
};

const theme = {
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
    maxWidth: 900,
};

module.exports = {
    styles: styles
}