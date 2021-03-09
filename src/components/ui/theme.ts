import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGrey = '#868686';

// ============ Typography Overrides ============
declare module '@material-ui/core/styles/createTypography' {
    // first extend the valid Type of TypographyOptions
    interface TypographyOptions {
        tab?: {};
        learnButton?: {};
        estimate?: {};
    }

    // now extend the properties that can be on Typography
    interface Typography {
        tab?: {};
        learnButton?: {};
        estimate?: {};
    }
}
// ================================================

// ============ Palette Overrides ============
declare module '@material-ui/core/styles/createPalette' {
    interface CommonColors {
        [name: string]: string;
    }
}
// ================================================

// create theme object to be passed to ThemeProvider
export default createMuiTheme({
    palette: {
        common: {
            blue: arcBlue,
            orange: arcOrange
        },

        primary: {
            main: arcBlue
        },
        secondary: {
            main: arcOrange
        }
    },

    typography: {
        // create our own typography variant
       tab:  {
           fontFamily: 'Raleway',
           textTransform: "none",
           fontWeight: 700,
           fontSize: "1rem",
       },

        estimate: {
            fontFamily: 'Pacifico',
            fontSize: '1rem',
            textTransform: 'none',
            color: 'white'
        },

        h2: {
            fontFamily: "Raleway",
            fontWeight: 700,
            fontSize: "2.5rem",
            color: arcBlue,
            lineHeight: 1.5
        },

        h3: {
           fontFamily: "Pacifico",
            fontSize: "2.5rem",
            color: arcBlue
        },

        h4: {
            fontFamily: "Raleway",
            fontSize: "1.75rem",
            color: arcBlue,
            fontWeight: 700,

        },
        subtitle1: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: arcGrey,
        },

        learnButton: {
            borderColor: arcBlue,
            color: arcBlue,
            borderWidth: 2,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold",
        }
    }
})
