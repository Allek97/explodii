import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
} from "react-router-dom";

import HomePage from "./homePage/HomePage";
import SignUp from "./signUp/SignUp";
import LogIn from "./login/Login";

import "./App.scss";

const NoMatchComp = () => <h1>Not Matched</h1>;

export default function App() {
    // Hook/prop to keep track in all the map if user/admin is logged or not
    const [authStatus, setAuthStatus] = useState(false);
    // TRICK: Wait for the API to consume before rendering
    const [isApiConsumed, setIsApiConsumed] = useState(false);
    // Retrieving the user info when logging in
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");

    useEffect(async () => {
        try {
            await axios.get("http://localhost:5001/api/v1/users/login", {
                withCredentials: true,
            });
            setAuthStatus(true);
        } catch (err) {
            setAuthStatus(false);
        }
        setIsApiConsumed(true);
    }, []);
    return (
        <Router>
            {isApiConsumed && (
                <div className="App">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <HomePage
                                    authStatus={authStatus}
                                    setAuthStatus={setAuthStatus}
                                    userName={userName}
                                    userPhoto={userPhoto}
                                />
                            )}
                        />
                        {authStatus && <Redirect from="/login" to="/" />}
                        {!authStatus && (
                            <Route
                                exact
                                path="/signup"
                                render={() => <SignUp />}
                            />
                        )}
                        {authStatus && <Redirect from="/signup" to="/" />}
                        {!authStatus && (
                            <Route
                                exact
                                path="/login"
                                render={() =>
                                    !authStatus && (
                                        <LogIn
                                            setUserName={setUserName}
                                            setUserPhoto={setUserPhoto}
                                        />
                                    )
                                }
                            />
                        )}
                        <Route exact path="/account" />
                        {/*NOTE: Redirect login qnd signup to home page if user is logged in*/}
                        {/*NOTE: 404 error for unhandled routes*/}
                        <Route component={NoMatchComp} />{" "}
                    </Switch>
                </div>
            )}
        </Router>
    );
}
