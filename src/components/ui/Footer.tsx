import React, {PropsWithChildren} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import {Link} from 'react-router-dom';

import footerAdornment from '../../assets/Footer Adornment.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';

import {useStyles} from "./FooterStyles";

interface Props {
    value: number | false; // can send false to tabs to make it deselect all tabs
    selectedIndex: number;
    setValue: (tabIndex: number | false) => void;
    setSelectedIndex: (menuIndex: number) => void;
}

export default function Footer(props: PropsWithChildren<Props>){

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
                // spacing={spacing}  // introduces negative margins and hence horizontal scroll bar
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
                            iOS/Android App Development
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