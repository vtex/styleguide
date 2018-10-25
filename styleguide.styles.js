const config = require('vtex-tachyons/config.json')

const styles = {
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
    Table: {
        table: {
            // marginTop: rhythm(0.5),
            // marginBottom: rhythm(0.5),
            // minWidth: '600px'
        },
        cellHeading: {
            borderBottom: `thin solid lightGrey`
        },
        cell: {
            paddingBottom: 0,
            '& p': {
                // marginBottom: `${rhythm(0.125)} !important`
            },
            '& div[class*="para"]': {
                // marginBottom: `${rhythm(0.125)} !important`
            }
        }
    },
    ComponentsList: {
        heading: {
            // fontWeight: '700',
            // textTransform: 'uppercase'
            marginTop: '2rem !important',
        }
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
    styles: styles,
    theme: theme
}