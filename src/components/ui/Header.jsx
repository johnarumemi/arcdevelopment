import React, {useState, useEffect} from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton'; // Applies Button styling to just an Icon
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'

// The app bar elevates on scroll to communicate that the user is not at the top of the page.
// https://material-ui.com/components/app-bar/#scrolling
function ElevationScroll(props) {
    const { children } = props;

    // useScrollTriggeer is a hook that is an event listener for when user is scrolling
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    // clones children (Header) with a prop.elevation value set to either 4 or 0
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


const useStyles = makeStyles(theme => ({
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
            height: '4rem'
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
        width: 50

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

// Function Component
export default function Header (props){

    const classes = useStyles();

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md')) // screen_width <= md ? true : false

    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);     // element that Menu is anchored to
    const [openMenu, setOpenMenu] = useState(false);            // visibility of Menu
    const [selectedIndex, setSelectedIndex] = useState(0); // selected Services Menu Options


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const routes = [
        {link: '/', name: 'Home'  , activeIndex: 0 },
        {
            link: '/services',
            name: 'Services'  ,
            activeIndex: 1,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            ariaPopup: anchorEl ? "true" : "false",
            mouseOver:  event => handleClick(event)
        },
        {link: '/revolution', name: 'The Revolution'  , activeIndex: 2  },
        {link: '/about', name: 'About Us'  , activeIndex: 3  },
        {link: '/contact', name: 'Contact Us'  , activeIndex: 4  },
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const menuOptions = [
        {link: '/services', name: 'Services', activeIndex: 1, selectedIndex: 0},
        {link: '/customsoftware', name: 'Custom Software Development', activeIndex: 1, selectedIndex: 1 },
        {link: '/mobileapps', name: 'Mobile App Development', activeIndex: 1, selectedIndex: 2 },
        {link: '/websites', name: 'Website Development', activeIndex: 1, selectedIndex: 3 },
    ]


    const handleClick = (event) => {
        // Open Menu
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    }

    const handleClose = (event) => {
        // Close Menu
        setAnchorEl(null);
        setOpenMenu(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleMenuItemClick = (event, menuIndex) => {
        setAnchorEl(null);      // remove element Menu is anchored to
        setOpenMenu(false)      // close the Menu
        setValue(1)             // set Portfolio tab as been selected
        setSelectedIndex(menuIndex)  // store the index of the selected MenuItem
    }

    useEffect( () => {
        [...menuOptions, ...routes].forEach( route => {
            // For each route we check if route.link is current path
            if (route.link === window.location.pathname){
                // if we are in current path ensure that value is set to correct active tab
                // all menuOptions have an activeIndex of 1
                if (value !== route.activeIndex){
                    setValue(route.activeIndex);
                    // if we are in a menuOption, ensure correct selectedIndex is set (selectedIndex is not undefined)
                    if (route.selectedIndex && route.selectedIndex !== selectedIndex){
                        setSelectedIndex(route.selectedIndex)
                    }
                }
            }
        })
    }, [value, selectedIndex, menuOptions, routes])

    const tabs = (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
                indicatorColor='primary'
            >
                {
                    routes.map( (route,index) => (
                        <Tab
                            key={index}
                            className={classes.tab}
                            component={Link}
                            to={route.link}
                            label={route.name}
                            aria-owns={route.ariaOwns}
                            aria-haspopup={route.ariaPopup}
                            onMouseOver={route.mouseOver}
                       />
                    ))
                }
            </Tabs>

            <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                component={Link}
                to='/estimate'
                onClick={ () => setValue(false) }
            >
                Free Estimate
            </Button>

            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={ {onMouseLeave: handleClose} }
                elevation={0}
                keepMounted
                style={{zIndex: theme.zIndex.modal + 2}}
                classes={{
                    paper: classes.menu
                }}
            >{
                menuOptions.map( (route, index) => (
                    <MenuItem
                        key={index}
                        onClick={ e => handleMenuItemClick(e, route.selectedIndex) }
                        selected={ route.selectedIndex === selectedIndex && value === route.activeIndex} // receives selected styling
                        component={Link}
                        to={route.link}
                        classes={ {root: classes.menuItem} }
                    >
                        {route.name}
                    </MenuItem>
                ))
            }
            </Menu>
        </>
    )

    const drawer = (
        <>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                anchor={'left'}
                open={openDrawer}
                onClose={ () => setOpenDrawer(false) }
                onOpen={ () => setOpenDrawer(true) }
                classes={{
                    paper: classes.drawer
                }}
            >
                <div className={classes.toolbarMargin} />

                <List disablePadding> {/* Remove extra padding at top of Drawer */}
                    {routes.map((route, index) => (
                        <ListItem
                            key={index}
                            button
                            divider
                            component={Link}
                            to={route.link}
                            selected={value === route.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}
                            onClick={ () => { setOpenDrawer(false); setValue(route.activeIndex);} }
                        >
                            <ListItemText
                                className={classes.drawerItem}
                                disableTypography>{route.name}</ListItemText>
                        </ListItem>
                    ))}

                    <ListItem
                        className={classes.drawerItemEstimate}
                        button
                        divider
                        classes={
                            {
                                root: classes.drawerItemEstimate,
                                divider: classes.customDivider,
                                selected: classes.drawerItemSelected
                            }
                        }
                        component={Link}
                        to='/estimate'
                        selected={ value === false }
                        onClick={ () => {setOpenDrawer(false);  setValue(false)} }
                    >
                        <ListItemText
                            className={classes.drawerItem}
                            disableTypography>Free Estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>

            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </>
    );
    return (
        <>
            <ElevationScroll>
                {/*default position=fixed*/}
                <AppBar position='fixed' color='primary' className={classes.appbar}>
                    <Toolbar disableGutters>
                        {/* Toolbar is used for laying things out horizontally within the AppBar*/}
                        <Button // Turn Logo into a button
                            disableRipple disableTouchRipple
                            className={classes.logoContainer}
                            onClick={ () => setValue(0)}
                            component={Link}
                            to='/'
                        >
                            <img src={logo} alt='Company Logo' className={classes.logo}/>
                        </Button>

                        {/* if screen_width <= md render drawer else render full tabs*/}
                        { matches ? drawer :  tabs }

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
            {/* div with class toolbarMargin adds cushion below AppBar*/}
        </>
    )
}


