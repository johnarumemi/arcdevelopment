import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    // class name
    toolbarMargin: {
        boxSizing: "content-box",
        ...theme.mixins.toolbar, // minHeight of toolbar is extracted here, + media queries
        marginBottom: '3rem',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2rem'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1rem'
        }
    },

    logo: {
        height: '7rem',
        [theme.breakpoints.down('md')]: { // <= md
            height: '6rem'
        },
        [theme.breakpoints.down('xs')]: { // <= xs
            height: '4.65rem'
        }
    },

    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },

    tabContainer: {
        marginLeft: "auto"
    },

    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: 25
    },

    button: {
        ...theme.typography.estimate,
        marginLeft: 50,
        marginRight: 25,
        borderRadius: "50px",
        height: '45px',
    },

    menu: {
        backgroundColor: theme.palette.common.blue,
        color: 'white',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },

    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },

    drawerIconContainer: {
        marginLeft: 'auto',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },

    drawerIcon: {
        height: 50,
        width: 50,
        [theme.breakpoints.down('xs')]: {
            height: 40,
            width: 40
        }
    },

    drawer: {
        background: theme.palette.common.blue,
    },

    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.4
    },

    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1
        }
    },

    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },

    customDivider: {
        borderTop: "5px solid white",
        borderRight: "5px solid white",
        borderBottom: "5px solid white", //custom color
        borderLeft: "5px solid white",
    },

    appbar: {
        zIndex: theme.zIndex.modal + 1 // zIndex of modal unit, which is used underneath the Drawer Component
    }
}))
