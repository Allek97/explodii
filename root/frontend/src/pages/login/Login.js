import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Tilt from "react-tilt";
import { useMediaQuery } from "react-responsive";

import "./_login.scss";
import "../../componants/reusable/_navBar.scss";
import "../../base/_animations.scss";

// Components
import Loading from "../../componants/loading/PageLoading";
import LoginNavBar from "./LoginNavBar";
import Footer from "../../componants/footer/Footer";
import LoginDeco from "./LoginDeco";

// Animations
const loginMsgAnimation = {
    animation: "loginStatusEffect .7s cubic-bezier(.64,.01,1,.03) 1",
};

const CopyRight = styled.div`
    margin-top: 13.8rem;
    height: max-content;

    font-size: 1.3rem;
    text-align: center;
    text-transform: "none";
    color: RGBA(var(--color-grey-dark), 0.75);
`;

const NameBtn = styled.div`
    &,
    &:link,
    &:visited {
        display: inline-block;

        transition: all 0.2s;

        // margin-top: 5rem;
        &:not(:last-child) {
            margin-right: 3rem;
        }

        /* background-color: #020f1f; */

        text-decoration: none;
        text-transform: uppercase;

        cursor: pointer;
    }

    &:hover,
    &:active {
        /* color: RGBA(var(--color-primary-light)); */
        background-color: white;
        box-shadow: 0 1rem 2rem RGBA(var(--color-black), 1);
        transform: rotate(5deg) scale(1.3);
    }
`;

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [authError, setAuthError] = useState("");

    // Keep track of the log status and display a succesful login message
    const [loginStatus, setLoginStatus] = useState(false);

    const isTabPort = useMediaQuery({
        query: "(max-width: 56.25em)",
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const body = {
                email,
                password,
            };

            const res = await axios.post(
                `${process.env.REACT_APP_URL}/api/v1/users/login`,
                body,
                //NOTE: For allowing cookie storing in the browser
                { withCredentials: true, credentials: "include" }
            );

            if (res.data.status === "success") {
                window.setTimeout(() => {
                    // setLogStatus(true);
                    setLoginStatus(true);
                }, 500);
                window.setTimeout(() => {
                    // setLogStatus(true);
                    window.location.assign("/");
                }, 1800);
            }
        } catch (err) {
            setAuthError("");
            // console.log(err.response.data.message);
            setAuthError(err.response.data.message);
        }
    };

    return (
        <>
            <Loading />
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
                <LoginNavBar />
                <section className="login-section">
                    <div className="loginBox">
                        <div className="loginBox__illustration">
                            <Tilt className="tilt" options={{ max: 25 }} />
                            <CopyRight className="loginBox__copyright">
                                &copy; {new Date().getFullYear()} by{" "}
                                <NameBtn href="/">Ilias Allek</NameBtn>. All
                                rights reserved.
                            </CopyRight>
                        </div>
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

                            <label
                                htmlFor="password"
                                className="loginForm__label"
                            >
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
                                    style={{
                                        paddingTop: "1.2rem",
                                        paddingBottom: "1.3rem",
                                    }}
                                />
                                <span className="loginForm__passwordLogo">
                                    {}
                                </span>
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
                    <LoginDeco />
                </section>
                {isTabPort && <Footer />}
            </div>
        </>
    );
}
