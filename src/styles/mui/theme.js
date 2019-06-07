import { createMuiTheme } from '@material-ui/core/styles'

const drawerWidth = 256,
    appBarHeight = 80

const theme = createMuiTheme({
    typography: {
        fontFamily      : 'var(--main-font-family)',
        useNextVariants : true
    }
})

const inputTheme = {
    MuiInput: {
        inputType: {
            '&[type="password"]': {
                fontFamily       : 'initial',
                '&::placeholder' : {
                    fontFamily: 'var(--main-font-family)'
                }
            }
        }
    }
}

theme.overrides = {
    MuiTabs: {
        root: {
            minHeight: '100%'
        },
        indicator: {
            backgroundColor: 'var(--main-color)'
        }
    },
    MuiTab: {
        root: {
            maxWidth      : 'none',
            height        : 50,
            textTransform : 'none'
        },
        textColorInherit: {
            color: '#AAA'
        },
        selected: {
            color: '#000'
        }
    },
    MuiAppBar: {
        root: {
            position        : 'absolute',
            height          : appBarHeight,
            zIndex          : theme.zIndex.drawer + 1
            // backgroundColor : '#FFF'
        },
        colorPrimary: {
            backgroundColor: '#FFF'
        }
    },
    MuiToolbar: {
        root: {
            height: '100%'
        }
    },
    MuiDrawer: {
        paper: {
            width       : drawerWidth,
            position    : 'fixed',
            height      : `calc(100vh - ${appBarHeight}px)`,
            marginTop   : appBarHeight
            // [theme.breakpoints.up('md')]    : {
            //     position: 'relative'
            // }
        }
    },
    MuiList: {
        root: {
            width: '100%'
        }
    },
    MuiExpansionPanelDetails: {
        root: {
            backgroundColor: '#FFF'
        }
    },
    MuiPaper: {
        rounded: {
            borderRadius: 8
        }
    },
    MuiCheckbox: {
        root: {
            color: 'var(--main-color)'
        },
        colorPrimary: {
            '&$checked': {
                color: 'var(--main-color)'
            }
        }
    },
    MuiTypography: {
        colorSecondary: {
            color: 'var(--white)'
        }
    },
    MuiDialog: {
        paper: {
            width: '900px'
        }
    },
    ...inputTheme
}

export {
    inputTheme
}

export default theme
