import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./homePage/HomePage";
import "./App.scss";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <>
                            <HomePage />
                        </>
                    )}
                />
            </div>
        </Router>
    );
}
