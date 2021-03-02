import {useState, useEffect} from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import Header from "./ui/Header";
import Footer from "./ui/Footer";

import theme from './ui/theme'
// import faker from "faker";

function App() {
    const [value, setValue] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0); // selected Services Menu Options

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header
                    value={value}
                    setValue={setValue}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                />
                <Switch>
                    <Route exact path='/' component={ () => ( <div>Home</div> ) } />
                    <Route exact path='/services' component={ () => ( <div>Services</div> ) } />
                    <Route exact path='/customsoftware' component={ () => ( <div>Custom Software</div> ) } />
                    <Route exact path='/mobileapps' component={ () => ( <div>Mobile Apps</div> ) } />
                    <Route exact path='/websites' component={ () => ( <div>Websites</div> ) } />
                    <Route exact path='/revolution' component={ () => ( <div>The Revolution</div> ) } />
                    <Route exact path='/about' component={ () => ( <div>About </div> ) } />
                    <Route exact path='/contact' component={ () => ( <div>Contact </div> ) } />
                    <Route exact path='/estimate' component={ () => ( <div>Estimate </div> ) } />
                </Switch>

                <Footer
                    value={value}
                    setValue={setValue}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
