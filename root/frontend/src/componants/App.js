import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./homePage/HomePage";
import SignUp from "./signUp/SignUp";

import "./App.scss";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        </Router>
    );
}
