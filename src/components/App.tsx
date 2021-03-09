import React, {useState} from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import LandingPage from "./LandingPage";

import theme from './ui/theme'


export const App: React.FC = () => {
    const [value, setValue] = useState<number | false>(0);
    const [selectedIndex, setSelectedIndex] = useState<number>(0); // selected Services Menu Options

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
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/services' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>Services</div> ) } />
                    <Route exact path='/customsoftware' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>Custom Software</div> ) } />
                    <Route exact path='/mobileapps' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>Mobile Apps</div> ) } />
                    <Route exact path='/websites' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>Websites</div> ) } />
                    <Route exact path='/revolution' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>The Revolution</div> ) } />
                    <Route exact path='/about' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>About </div> ) } />
                    <Route exact path='/contact' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>Contact </div> ) } />
                    <Route exact path='/estimate' component={ () => ( <div style={{minHeight: "74.40vh", overflow: "hidden"}}>Estimate </div> ) } />
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
