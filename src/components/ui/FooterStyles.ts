import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles( theme => (
    createStyles({
        footer: {
            backgroundColor: theme.palette.common.blue,
            width: '100%',
            zIndex: theme.zIndex.modal + 1,
            position: 'relative',
            bottom: "0px",
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
    })));
