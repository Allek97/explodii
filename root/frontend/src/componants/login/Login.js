import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import "./_login.scss";
import "../reusable/_navBar.scss";
import "../../base/_animations.scss";

// Animations
const loginMsgAnimation = {
    animation: "loginStatusEffect .6s cubic-bezier(.64,.01,1,.03) 1",
};

// const bgFilterAnimation = {
//     animation: "loginStatusEffect .6s cubic-bezier(.64,.01,1,.03) 1",
// }

export default function LogIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [authError, setAuthError] = useState("");

    // Keep track of the log status and display a succesful login message
    const [loginStatus, setLoginStatus] = useState(false);
    // User prop from app
    const { setUserName, setUserPhoto } = props;

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const body = {
                email,
                password,
            };

            const res = await axios.post(
                "http://localhost:5001/api/v1/users/login",
                body,
                //NOTE: For allowing cookie storing in the browser
                { withCredentials: true, credentials: "include" }
            );

            const { user } = res.data.data;

            setUserName(user.name);
            setUserPhoto(user.photo);

            console.log(user.name);

            if (res.data.status === "success") {
                setLoginStatus(true);
                window.setTimeout(() => {
                    // setLogStatus(true);
                    window.location.assign("/");
                }, 150000);
            }
        } catch (err) {
            setAuthError("");
            // console.log(err.response.data.message);
            setAuthError(err.response.data.message);
        }
    };

    return (
        <>
            {loginStatus && (
                <div className="success-login" style={loginMsgAnimation}>
                    {/* <span /> */}
                    <p style={{ fontSize: "5.5rem" }}>Success</p>
                    <p style={{ fontSize: "3.5rem" }}>You are logged in !</p>
                </div>
            )}

            <div
                className="login"
                style={loginStatus ? { filter: "blur(8px)" } : null}
            >
                <div className="navBar navBar--login">
                    <div className="navBar__logo-box">
                        <div className="navBar__logo navBar__logo--login">
                            {}
                        </div>
                        <div className="navBar__logo-text navBar__logo-text--login">
                            explodii
                        </div>
                    </div>
                    <a href="/" className="navBar__btn">
                        Homepage
                    </a>
                    <a href="/excursions" className="navBar__btn">
                        Our excursions
                    </a>
                </div>
                <div className="loginBox">
                    <div className="loginBox__illustration">{}</div>
                    <form onSubmit={handleSubmit} className="loginForm">
                        <h2 className="loginForm__heading">Member Login</h2>

                        <label htmlFor="email" className="loginForm__label">
                            {authError !== "" && authError && (
                                <span className="loginForm__error">
                                    {authError}
                                </span>
                            )}
                            <input
                                type="email"
                                className="loginForm__input"
                                placeholder="Email"
                                id="email"
                                required
                                onChange={(e) => {
                                    // We track email changes
                                    setEmail(e.target.value);
                                }}
                            />
                            <span className="loginForm__emailLogo">{}</span>
                        </label>

                        <label htmlFor="password" className="loginForm__label">
                            <input
                                type="password"
                                className="loginForm__input"
                                placeholder="Password"
                                id="password"
                                required
                                onChange={(e) => {
                                    // We track password changes
                                    setPassword(e.target.value);
                                }}
                            />
                            <span className="loginForm__passwordLogo">{}</span>
                        </label>
                        <button type="submit" className="loginForm__btn">
                            Login
                        </button>
                        <div className="loginForm__forgot">
                            <p>Forgot </p>
                            <a href="/">Email / Password ?</a>
                        </div>
                        <div className="loginForm__signup">
                            <a href="/signup">Create a new account</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

LogIn.propTypes = {
    setUserName: PropTypes.func.isRequired,
    setUserPhoto: PropTypes.func.isRequired,
};
