import React from 'react';
import Lottie from 'react-lottie';
import {makeStyles, useTheme} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ButtonArrow from "./ui/ButtonArrow";

import animationData from '../animations/landinganimation/data';
import customSoftwareIcon from '../assets/Custom Software Icon.svg';
import mobileAppsIcon from '../assets/mobileIcon.svg';
import websitesIcon from '../assets/websiteIcon.svg'

const useStyles = makeStyles(theme => ({
    animation: {
        maxWidth: "50rem",
        minWidth: "21rem",
        marginTop: "2rem",
        marginLeft: "10%",
        [theme.breakpoints.down("sm")]:{
            maxWidth: "30rem"
        }
    },
    estimateButton: {
        ...theme.typography.estimate,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 50,
        height: 45,
        width: 145,
        marginRight: 40,

        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },

    buttonContainer: {
        marginTop: "1rem"
    },

    learnButtonHero: {
        ...theme.typography.learnButton,
        fontSize: "0.9rem",
        height: 45,
        width: 145
    },

    mainContainer: {
        minHeight: "74.4vh",
        overflow: "hidden",
        marginTop: "5rem",
        [theme.breakpoints.down('md')]: {
            marginTop: "3rem"
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: "2rem"
        }
    },
    heroTextContainer:{
        minWidth: "21.5rem",
        marginLeft: "1rem",
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0
        }
    },

    specialText: {
        fontFamily: "Pacifico",
        color: theme.palette.common.orange,
    },

    learnButton: {
        ...theme.typography.learnButton,
        fontSize: "0.7rem",
        height: 35,
        padding: 8,
        [theme.breakpoints.down('sm')]:{
            marginBottom: "2rem"
        }
    },
    subtitle: {
        marginBottom: "1rem"
    },

    icon: {
        marginLeft: "2rem",
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0
        }
    },

    serviceContainer: {
        marginTop: "4rem",
        [theme.breakpoints.down('sm')]: {
            padding: 25,
        }
    }
}));



export default function LandingPage() {

    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <Grid container className={classes.mainContainer} direction={'column'}
        > {/* Holds all content for the page*/}
            <Grid container item> {/*========= Hero Block =========*/}
                <Grid container direction='row' justify='flex-end' alignItems='center'>
                    <Grid item sm className={classes.heroTextContainer}>
                        <Typography variant='h2' align='center'>
                            Bringing West Coast Technology
                            <br/>
                            to the Midwest
                        </Typography>
                        <Grid
                            container
                            justify='center' // center buttons within the container
                            className={classes.buttonContainer}
                        >
                            <Grid item>
                                <Button
                                    className={classes.estimateButton}
                                    variant='contained'
                                >
                                    Free Estimate
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button className={classes.learnButtonHero} variant='outlined'>
                                    <span style={{marginRight: 10}}>Learn More</span>
                                    <ButtonArrow width={15} height={15} fill={theme.palette.common.blue} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm className={classes.animation}>
                        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
                    </Grid>
                </Grid>
            </Grid>
            {" "}
            <Grid container item>
                {/*===== Custom Software Block =====*/}
                <Grid container direction='row' justify={matchesSM? "center": "flex-start" } className={classes.serviceContainer}>
                    <Grid item style={{marginLeft: matchesSM ? 0:"5rem", textAlign: matchesSM ? "center": undefined}}>
                        <Typography variant='h4'>
                            Custom Software Development
                        </Typography>
                        <Typography variant='subtitle1' className={classes.subtitle}>
                            Save Energy. Save Time. Save Money.
                        </Typography>
                        <Typography variant='subtitle1'>
                            Complete digital solutions, from investigation{" "}
                            <span className={classes.specialText}>celebration</span>
                        </Typography>
                        <Button variant='outlined' className={classes.learnButton}>
                            <span style={{marginRight: 10}}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
                        </Button>
                    </Grid>
                    <Grid item style={{marginRight: matchesSM ? 0:"5rem"}}>
                        <img alt='custom software icon' className={classes.icon} src={customSoftwareIcon} />
                    </Grid>
                </Grid>
            </Grid>
            {" "}
            <Grid container item>
                {/*===== iOS/Android Block =====*/}
                <Grid container direction='row' justify={matchesSM? "center": "flex-end" } className={classes.serviceContainer}>
                    <Grid item style={{
                        marginLeft: matchesSM ? 0:"5rem",
                        textAlign: matchesSM ? "center": undefined
                    }}>
                        <Typography variant='h4'>
                            iOS/Android App Development
                        </Typography>
                        <Typography variant='subtitle1' className={classes.subtitle}>
                            Extend Functionality. Extend Access. Increase Engagement.
                        </Typography>
                        <Typography variant='subtitle1'>
                            Integrate your web experience or create a standalone app
                            { matchesSM && <br />} with either mobile platform.
                        </Typography>
                        <Button variant='outlined' className={classes.learnButton}>
                            <span style={{marginRight: 10}}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
                        </Button>
                    </Grid>
                    <Grid item style={{marginRight: matchesSM ? 0:"5rem"}}>
                        <img alt='mobile phone icon' className={classes.icon} src={mobileAppsIcon} />
                    </Grid>
                </Grid>
            </Grid>
            {" "}
            <Grid container item>
                {/*===== Website Block =====*/}
                <Grid container direction='row' justify={matchesSM? "center": "flex-start" } className={classes.serviceContainer}>
                    <Grid item style={{
                        marginLeft: matchesSM ? 0:"5rem",
                        textAlign: matchesSM ? "center": undefined
                    }}>
                        <Typography variant='h4'>
                            Website Development
                        </Typography>
                        <Typography variant='subtitle1' className={classes.subtitle}>
                            Reach More. Discover More. Sell More.
                        </Typography>
                        <Typography variant='subtitle1'>
                            Optimized for Search Engines, built for speed.
                        </Typography>
                        <Button variant='outlined' className={classes.learnButton}>
                            <span style={{marginRight: 10}}>Learn More</span>
                            <ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
                        </Button>
                    </Grid>
                    <Grid item style={{marginRight: matchesSM ? 0:"5rem"}}>
                        <img alt='website icon' className={classes.icon} src={websitesIcon} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}
