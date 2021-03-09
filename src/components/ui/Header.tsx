import React, {useState, useEffect, PropsWithChildren} from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
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
import { useStyles } from "./HeaderStyles";

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'


// The app bar elevates on scroll to communicate that the user is not at the top of the page.
// https://material-ui.com/components/app-bar/#scrolling
interface PropsElevationScroll {
    // need to do below to narrow the type of children passed into React.cloneElement
    children: React.ReactElement;
}

function ElevationScroll({children}: PropsWithChildren<PropsElevationScroll>){

    // useScrollTrigger is a hook that is an event listener for when user is scrolling
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    // clones children (Header) with a prop.elevation value set to either 4 or 0
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

interface Props {
    value: number | false; // can send false to tabs to make it deselect all tabs
    selectedIndex: number;
    setValue: (tabIndex: number | false) => void;
    setSelectedIndex: (menuIndex: number) => void;
}

// Function Component
export const Header: React.FC<Props> = (props) => {

    const classes = useStyles();

    const iOS = 'browser' in process && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md')) // screen_width <= md ? true : false

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);     // element that Menu is anchored to
    const [openMenu, setOpenMenu] = useState<boolean>(false);            // visibility of Menu

    interface RouteOpts {
        link: string;
        name: string;
        activeIndex: number;
        ariaOwns?: string | undefined;
        ariaPopup?: 'true' | 'false';
        mouseOver?:  (event: React.MouseEvent<HTMLElement>) => void;
        selectedIndex?: number | undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const routes: RouteOpts[] = [
        {link: '/', name: 'Home'  , activeIndex: 0 },
        {
            link: '/services',
            name: 'Services'  ,
            activeIndex: 1,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            ariaPopup: anchorEl ? "true" : "false",
            mouseOver:  (event: React.MouseEvent<HTMLElement>) => handleClick(event)
        },
        {link: '/revolution', name: 'The Revolution'  , activeIndex: 2  },
        {link: '/about', name: 'About Us'  , activeIndex: 3  },
        {link: '/contact', name: 'Contact Us'  , activeIndex: 4  },
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const menuOptions = [
        {link: '/services', name: 'Services', activeIndex: 1, selectedIndex: 0},
        {link: '/customsoftware', name: 'Custom Software Development', activeIndex: 1, selectedIndex: 1 },
        {link: '/mobileapps', name: 'iOS/Android App Development', activeIndex: 1, selectedIndex: 2 },
        {link: '/websites', name: 'Website Development', activeIndex: 1, selectedIndex: 3 },
    ]

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // Open Menu
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    }

    const handleClose = () => {
        // Close Menu
        setAnchorEl(null);
        setOpenMenu(false);
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        props.setValue(newValue)
    }

    const handleMenuItemClick = (menuIndex: number | undefined) => {
        if (menuIndex !== undefined){
            setAnchorEl(null);      // remove element Menu is anchored to
            setOpenMenu(false)      // close the Menu
            props.setValue(1)             // set Portfolio tab as been selected
            props.setSelectedIndex(menuIndex)  // store the index of the selected MenuItem
        }
    }

    useEffect( () => {
        [...menuOptions, ...routes].forEach( ( (route: RouteOpts) => {
            // For each route we check if route.link is current path
            if (route.link === window.location.pathname){
                // if we are in current path ensure that value is set to correct active tab
                // all menuOptions have an activeIndex of 1
                if (props.value !== route.activeIndex){
                    props.setValue(route.activeIndex);
                    // if we are in a menuOption, ensure correct selectedIndex is set (selectedIndex is not undefined)
                    if (route.selectedIndex && route.selectedIndex !== props.selectedIndex){
                        props.setSelectedIndex(route.selectedIndex)
                    }
                }
            }
        }))
    }, [props.value, props.selectedIndex, menuOptions, routes, props])

    const tabs = (
        <>
            <Tabs
                value={props.value}
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
                onClick={ () => props.setValue(false) }
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
                menuOptions.map( (route: RouteOpts) => (
                    <MenuItem
                        key={`${route}${route.selectedIndex}`}
                        onClick={ () => handleMenuItemClick(route.selectedIndex) }
                        selected={ route.selectedIndex === props.selectedIndex && props.value === route.activeIndex} // receives selected styling
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
                classes={{paper: classes.drawer}}
            >
                <div className={classes.toolbarMargin} />

                <List disablePadding> {/* Remove extra padding at top of Drawer */}
                    {routes.map( route => (
                        <ListItem
                            key={`${route}${route.activeIndex}`}
                            button
                            divider
                            component={Link}
                            to={route.link}
                            selected={props.value === route.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}
                            onClick={ () => { setOpenDrawer(false); props.setValue(route.activeIndex);} }
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
                        selected={ props.value === false }
                        onClick={ () => {setOpenDrawer(false);  props.setValue(false)} }
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
                            onClick={ () => props.setValue(0)}
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

export default Header;
