import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

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
        }
    }
})
