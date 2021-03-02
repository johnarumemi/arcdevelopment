import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
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
import { services } from '../../api';

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
        borderBottomRightRadius: 0
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
        opacity: 0.7
    },

    drawerItemSelected: {
        opacity: 1
    },

    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },

    customDivider: {
        borderTop: "5px solid white",
        borderRight: "5px solid white",
        borderBottom: "5px solid white", //custom color
        borderLeft: "5px solid white",
    }
}))


// Function Component
export default function Header (props){

    const url_map = useRef({
        '/': 0,
        '/services': 1,
        '/revolution': 2,
        '/about': 3,
        '/contact': 4,
        '/estimate': 5
    })

    const menu_urls = useRef({});

    const classes = useStyles();

    const theme = useTheme();

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const matches = useMediaQuery(theme.breakpoints.down('md')) // screen_width <= md ? true : false

    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);     // element that Menu is anchored to
    const [openMenu, setOpenMenu] = useState(false);            // visibility of Menu
    const [selectedIndex, setSelectedIndex] = useState(0); // selected Services Menu Options
    const [menuOptions, setMenuOptions] = useState(null)

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

    useLayoutEffect(()=> {

        services.getAll()
            .then( response => {
                if (response.ok){
                    setMenuOptions(response.data)

                    url_map.current = response.data.reduce((state, option) => {

                        return { ...state, [option.link]: state['/services'] }
                    }, url_map.current)

                    menu_urls.current = response.data.reduce((state, option) => {

                        return { ...state, [option.link]: option.id }
                    }, menu_urls.current)
                }
            })

    }, [])

    useEffect( () => {

        const valid_url = Object.keys(url_map.current).some( key => key === window.location.pathname)
        const desiredTabIndex = url_map.current[window.location.pathname]
        const valid_menu_url = Object.keys(menu_urls.current).some( key => key === window.location.pathname)
        const desiredMenuIndex = menu_urls.current[window.location.pathname]

        // console.log(window.location.pathname, valid_url, valid_menu_url, desiredTabIndex ?? -1, value)

        if (valid_url &&  value !== desiredTabIndex){
            setValue(desiredTabIndex)
        }

        if (valid_menu_url && selectedIndex !== desiredMenuIndex){
            setSelectedIndex(desiredMenuIndex)
        }

    }, [value, menuOptions, selectedIndex])

    const tabs = (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
                indicatorColor='primary'
            >
                <Tab
                    label='Home'
                    className={classes.tab}
                    component={Link}
                    to='/'
                />
                <Tab
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup={anchorEl ? "true" : "false"}
                    label='Services'
                    className={classes.tab}
                    component={Link}
                    onMouseOver={ event => handleClick(event) }
                    to='/services'
                />
                <Tab
                    label='The Revolution'
                    className={classes.tab}
                    component={Link}
                    to='/revolution'
                />
                <Tab
                    label='About Us'
                    className={classes.tab}
                    component={Link}
                    to='/about'
                />
                <Tab
                    label='Contact Us'
                    className={classes.tab}
                    component={Link}
                    to='/contact'
                />
            </Tabs>

            <Button
                variant='contained'
                color='secondary'
                className={classes.button}
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
                classes={{
                    paper: classes.menu
                }}
            >{
                // on first DOM drawing menuOptions is empty, hence using menuOptions &&
                menuOptions && menuOptions.map(option => (
                    <MenuItem
                        key={option.id}
                        onClick={ e => handleMenuItemClick(e, option.id) }
                        selected={ option.id === selectedIndex && value === 1} // receives selected styling
                        component={Link}
                        to={option.link}
                        classes={ {root: classes.menuItem} }
                    >
                        {option.name}
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
                anchor={'right'}
                open={openDrawer}
                onClose={ () => setOpenDrawer(false) }
                onOpen={ () => setOpenDrawer(true) }
                classes={{
                    paper: classes.drawer
                }}
            >
                <List disablePadding> {/* Remove extra padding at top of Drawer */}
                    <ListItem
                        className={
                            value === 0
                                ? `${classes.drawerItem} ${classes.drawerItemSelected}`
                                : classes.drawerItem}
                        onClick={ () => {setOpenDrawer(false);  setValue(0)} }
                        selected={ value === 0}
                        divider button
                        component={Link} to='/'
                    >
                        <ListItemText disableTypography>
                            Home
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        className={
                            value === 1
                                ? `${classes.drawerItem} ${classes.drawerItemSelected}`
                                : classes.drawerItem}
                        onClick={ () => {setOpenDrawer(false);  setValue(1)} }
                        selected={ value === 1}
                        divider button
                        component={Link} to='/services'
                    >
                        <ListItemText disableTypography>Services</ListItemText>
                    </ListItem>
                    <ListItem
                        className={
                            value === 2
                                ? `${classes.drawerItem} ${classes.drawerItemSelected}`
                                : classes.drawerItem}
                        onClick={ () => {setOpenDrawer(false);  setValue(2)} }
                        selected={ value === 2}
                        divider button
                        component={Link} to='/revolution'
                    >
                        <ListItemText disableTypography>The Revolution</ListItemText>
                    </ListItem>
                    <ListItem
                        className={
                            value === 3
                                ? `${classes.drawerItem} ${classes.drawerItemSelected}`
                                : classes.drawerItem}
                        onClick={ () => {setOpenDrawer(false);  setValue(3)} }
                        selected={ value === 3}
                        divider button
                        component={Link} to='/about'>
                        <ListItemText disableTypography>About Us</ListItemText>
                    </ListItem>
                    <ListItem
                        className={
                            value === 4
                                ? `${classes.drawerItem} ${classes.drawerItemSelected}`
                                : classes.drawerItem}
                        onClick={ () => {setOpenDrawer(false);  setValue(4)} }
                        selected={ value === 4}
                        divider button
                        component={Link} to='/contact'
                    >
                        <ListItemText disableTypography component={'p'}>Contact Us</ListItemText>
                    </ListItem>
                    <ListItem
                        className={
                            value === 5
                                ? `${classes.drawerItem} ${classes.drawerItemEstimate} ${classes.drawerItemSelected}`
                                : `${classes.drawerItem} ${classes.drawerItemEstimate}`}
                        onClick={ () => {setOpenDrawer(false);  setValue(5)} }
                        selected={ value === 5 }
                        divider button
                        classes={ {divider: classes.customDivider }}
                        component={Link} to='/estimate'
                    >
                        <ListItemText disableTypography>Free Estimate</ListItemText>
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
                <AppBar position='fixed' color='primary'>
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
