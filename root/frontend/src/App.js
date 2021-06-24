import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

// Routed componants
import HomePage from "../src/pages/homePage/HomePage";
import SignUp from "../src/pages/signUp/SignUp";
import LogIn from "../src/pages/login/Login";
import Account from "../src/pages/account/Account";
import Excursion from "../src/pages/excursions/Excursion";
import ExcursionContent from "../src/pages/excursionContent/ExcursionContent";

import "./App.scss";

// Global Fonts

import GlobalFonts from "../src/assets/fonts/GlobalFonts";

// TODO: BUILD ORIGINAL 404 PAGE
const NoMatchComp = () => <h1>Not Matched</h1>;

export default function App() {
    // Hook/prop to keep track in all the map if user/admin is logged or not
    const [authStatus, setAuthStatus] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false);
    // Retrieve booked excursion information to display a successful message
    // BUG: I NEED TO USE WEBHOOKS CAUSE STRIPE WILL RELOAD THE PAGE ANYWAY,
    // TODO: MAYBE CREATE A SEPARATE PAGE DISPLAY SUCCESSFUL TRANSACTION/ REDIRECT TO ACCOUNT BOOKINGS
    const [bookedExcursionName, setBookedExcursionName] = useState("");
    const [bookedExcursionDuration, setBookedExcursionDuration] = useState(0);
    const [bookedExcursionPrice, setBookedExcursionPrice] = useState(0);
    const [bookedExcursionDate, setBookedExcursionDate] = useState("");
    // TRICK: Wait for the API to consume before rendering
    const [isApiConsumed, setIsApiConsumed] = useState(false);
    // Retrieving the user info when logging in
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(async () => {
        try {
            const loginRes = await axios.get(
                "http://localhost:5001/api/v1/users/login",
                {
                    withCredentials: true,
                }
            );
            setAuthStatus(true);
            if (loginRes.data.status === "success") {
                const res = await axios.get(
                    "http://localhost:5001/api/v1/users/me",
                    {
                        withCredentials: true,
                    }
                );

                const user = res.data.data.data;
                setUserName(user.name);
                setUserPhoto(user.photo);
                setUserEmail(user.email);
                setUserId(user._id);
            }
        } catch (err) {
            setAuthStatus(false);
        }
        setIsApiConsumed(true);
    }, []);

    return (
        <>
            <GlobalFonts />
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
                                    render={() => <LogIn />}
                                />
                            )}
                            {authStatus && (
                                <Route
                                    exact
                                    path="/account"
                                    render={() => (
                                        <Account
                                            userName={userName}
                                            userPhoto={userPhoto}
                                            userEmail={userEmail}
                                            userId={userId}
                                            setUserName={setUserName}
                                            setUserPhoto={setUserPhoto}
                                            setUserEmail={setUserEmail}
                                        />
                                    )}
                                />
                            )}
                            <Route
                                exact
                                path="/excursions"
                                render={() => (
                                    <Excursion
                                        authStatus={authStatus}
                                        setAuthStatus={setAuthStatus}
                                        userName={userName}
                                        userPhoto={userPhoto}
                                        paymentStatus={paymentStatus}
                                        bookedExcursionName={
                                            bookedExcursionName
                                        }
                                        bookedExcursionDuration={
                                            bookedExcursionDuration
                                        }
                                        bookedExcursionPrice={
                                            bookedExcursionPrice
                                        }
                                        bookedExcursionDate={
                                            bookedExcursionDate
                                        }
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/excursions/:slug"
                                render={() => (
                                    <ExcursionContent
                                        authStatus={authStatus}
                                        setAuthStatus={setAuthStatus}
                                        userName={userName}
                                        userPhoto={userPhoto}
                                        setPaymentStatus={setPaymentStatus}
                                        setBookedExcursionName={
                                            setBookedExcursionName
                                        }
                                        setBookedExcursionDuration={
                                            setBookedExcursionDuration
                                        }
                                        setBookedExcursionPrice={
                                            setBookedExcursionPrice
                                        }
                                        setBookedExcursionDate={
                                            setBookedExcursionDate
                                        }
                                    />
                                )}
                            />
                            {/*NOTE: Redirect login qnd signup to home page if user is logged in*/}
                            {/*NOTE: 404 error for unhandled routes*/}
                            <Route component={NoMatchComp} />
                        </Switch>
                    </div>
                )}
            </Router>
        </>
    );
}
