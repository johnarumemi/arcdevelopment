import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import {Link} from 'react-router-dom';

import footerAdornment from '../../assets/Footer Adornment.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';

const useStyles = makeStyles( theme => ({

    footer: {
        backgroundColor: theme.palette.common.blue,
        width: '100%',
        zIndex: theme.zIndex.modal + 1,
        position: 'fixed',
        bottom: "0px"
    },

    adornment: {
        width: '25rem',
        verticalAlign: "bottom", // change where on image it is anchored to screen
        [theme.breakpoints.down('md')]: {
            width: '21rem'
        },
        [theme.breakpoints.down('xs')]: {
            width: '15rem'
        }
    },

    mainContainer: {
        position: "absolute",
    },

    link: {
        color: "white",
        fontFamily: "Arial",
        fontSize: "0.75rem",
        fontFace: 'bold',
        textDecoration: 'none'
    },
    gridItem: {
        margin: "3rem"
    },

    icon: {
        height: '4rem',
        width: '4rem',
        [theme.breakpoints.down('xs')]: {
            height: '2.5rem',
            width:  '2.5rem'
        }
    },
    socialContainer: {
        position: 'absolute',
        bottom: '1rem',
        right: '1.5rem',
        [theme.breakpoints.down('xs')]: {
            right: '0.6rem',
        }
    }
}));


export default function Footer(props){

    const classes = useStyles()
    const spacing = 2;
    return (
        <footer
            className={classes.footer}
        >
            <Hidden mdDown> {/* Hidden at medium and below breakpoint */}
            <Grid
                container
                className={classes.mainContainer}
                justify='center'
                alignContent='center'
                spacing={spacing}
            >
                <Grid item className={classes.gridItem}>
                    <Grid container direction='column'spacing={spacing}>
                        <Grid item className={classes.link} onClick={() => props.setValue(0)} component={Link} to='/'>
                            Home
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item className={classes.gridItem}>
                    <Grid container direction='column'spacing={spacing}>
                        <Grid item className={classes.link} onClick={() => { props.setValue(1) ; props.setSelectedIndex(0) }} component={Link} to='/services'>
                            Services
                        </Grid>
                        <Grid item className={classes.link} onClick={() => { props.setValue(1) ; props.setSelectedIndex(1) }} component={Link} to='/customsoftware'>
                            Custom Software Development
                        </Grid>
                        <Grid item className={classes.link} onClick={() => { props.setValue(1) ; props.setSelectedIndex(2) }} component={Link} to='/mobileapps'>
                            Mobile App Development
                        </Grid>
                        <Grid item className={classes.link} onClick={() => { props.setValue(1) ; props.setSelectedIndex(3) }} component={Link} to='/websites'>
                            Website Development
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item className={classes.gridItem}>
                    <Grid container direction='column'spacing={spacing}>
                        <Grid item className={classes.link} onClick={() => props.setValue(2)} component={Link} to='/revolution'>
                            The Revolution
                        </Grid>
                        <Grid item className={classes.link} onClick={() => props.setValue(2)} component={Link} to='/revolution'>
                            Vision
                        </Grid>
                        <Grid item className={classes.link} onClick={() => props.setValue(2)} component={Link} to='/revolution'>
                            Technology
                        </Grid>
                        <Grid item className={classes.link} onClick={() => props.setValue(2)} component={Link} to='/revolution'>
                            Process
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item className={classes.gridItem}>
                    <Grid container direction='column'spacing={spacing}>
                        <Grid item className={classes.link} onClick={() => props.setValue(3)} component={Link} to='/about'>
                            About Us
                        </Grid>
                        <Grid item className={classes.link} onClick={() => props.setValue(3)} component={Link} to='/about'>
                            History
                        </Grid>
                        <Grid item className={classes.link} onClick={() => props.setValue(3)} component={Link} to='/about'>
                            Team
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item className={classes.gridItem}>
                    <Grid container direction='column'spacing={spacing} onClick={() => props.setValue(4)} component={Link} to='/contact'>
                        <Grid item className={classes.link}>
                            Contact Us
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Hidden>

            <img
                className={classes.adornment}
                alt='black decorative slash'
                src={footerAdornment} />

            <Grid container justify='flex-end' spacing={spacing} className={classes.socialContainer}>
                <Grid item component={'a'} href='https://www.facebook.com' rel='noopener noreferrer' target='_blank'>
                    <img alt='facebook logo' src={facebook} className={classes.icon} />
                </Grid>
                <Grid item component={'a'} href='https://www.twitter.com' rel='noopener noreferrer' target='_blank'>
                    <img alt='twitter logo' src={twitter} className={classes.icon} />
                </Grid>
                <Grid item component={'a'} href='https://www.instagram.com' rel='noopener noreferrer' target='_blank'>
                    <img alt='instagram logo' src={instagram} className={classes.icon} />
                </Grid>
            </Grid>
        </footer>
    );
}