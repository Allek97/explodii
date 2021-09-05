import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./_signUp.scss";
import "../../componants/reusable/_navBar.scss";

// Components
import Loading from "../../componants/loading/PageLoading";
import SmallLoading from "../../componants/loading/SmallLoading";
import Footer from "../../componants/footer/Footer";
import SuccessSignUp from "./otherComponents/SuccessSignUp";
import NavBar from "./otherComponents/SignUpNavBar";

// Stylying and animations
const signupMsgAnimation = {
    animation: "signupStatusEffect 1s cubic-bezier(.64,.01,1,.03) 1",
};

// TODO: MAKE BACKGROUND UNCLICKABLE POINTERS EVENT

export default function SignUp() {
    // All the form inputs that will be send to our DB
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    // Validation errors if there is
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passworConfirmError, setPasswordConfirmError] = useState("");
    // Signup Status, to confirm that usee has signed up
    // Keep track of the log status and display a succesful signup message
    const [signupStatus, setSignupStatus] = useState(false);
    // Small loading while the registration is getting processed
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);
            setEmailError("");
            setPasswordError("");
            setPasswordConfirmError("");

            e.preventDefault();

            const body = {
                name,
                email,
                password,
                passwordConfirm,
            };

            const res = await axios.post(
                `${process.env.REACT_APP_URL}/api/v1/users/signup`,
                body,
                { withCredentials: true, credentials: "include" }
            );

            if (res.data.status === "success") {
                window.setTimeout(() => {
                    setSignupStatus(true);
                    setIsLoading(false);
                }, 500);
            }
        } catch (err) {
            // NOTE: See userModel for validation errors
            console.log(err.response.data.message);

            // Reset the errors after each submit
            setEmailError("");
            setPasswordError("");
            setPasswordConfirmError("");

            const errorList = new Map();

            const { message } = err.response.data;

            if (message.includes("duplicate")) {
                return setEmailError(
                    "This email is already used, please try again!"
                );
            }
            const errors = message.split(",");
            errors.forEach((el) => {
                // ([^:]+$) : Trouver la derniere expression apres (":")
                // NOTE: userModel pour les erreurs de validations,verifier orthographe
                errorList.set(
                    el.split(":")[el.split(":").length - 2],
                    el.match("([^:]+$)")[1]
                );
            });
            setEmailError(errorList.get(" email"));
            setPasswordError(errorList.get(" password"));
            setPasswordConfirmError(errorList.get(" passwordConfirm"));

            setIsLoading(false);

            console.log(errorList);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <Loading />
            {signupStatus && <SuccessSignUp />}
            <div
                className="signup"
                style={
                    signupStatus
                        ? {
                              filter: "blur(8px)",
                              pointerEvents: "none",
                          }
                        : null
                }
            >
                <NavBar />
                <h1 className="signup-heading">
                    Join us and experience wonderful adventures all over the
                    world by signing up below
                </h1>
                <article className="signup-main">
                    <form onSubmit={handleSubmit} className="signupForm">
                        <h2 className="signupForm__heading">Sign Up</h2>
                        <div className="signupForm__illustration">{}</div>
                        <div className="signupForm__name-email">
                            <p className="signupForm__label-text signupForm__label-text--1">
                                Full name
                            </p>
                            <label
                                htmlFor="full-name"
                                className="signupForm__label signupForm__label--1"
                            >
                                <input
                                    type="text"
                                    className="signupForm__input signupForm__input--1"
                                    placeholder="Ilias Allek"
                                    spellCheck="false"
                                    id="full-name"
                                    required
                                    onChange={(e) => {
                                        // We track name changes
                                        setName(e.target.value);
                                    }}
                                />
                            </label>

                            <p className="signupForm__label-text  signupForm__label-text--2">
                                Email address
                            </p>
                            <label
                                htmlFor="email-address"
                                className="signupForm__label signupForm__label--2"
                            >
                                <input
                                    type="email"
                                    className="signupForm__input signupForm__input--2"
                                    placeholder="jhon@example.com"
                                    id="email-address"
                                    spellCheck="false"
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                {emailError !== "" && emailError && (
                                    <span className="signupForm__error">
                                        {emailError}
                                    </span>
                                )}
                            </label>
                        </div>
                        <p className="signupForm__label-text">Password</p>
                        <label htmlFor="password" className="signupForm__label">
                            <input
                                type="password"
                                className="signupForm__input"
                                placeholder="8+ Characters, 1 Capital letter, 1 Number"
                                id="password"
                                spellCheck="false"
                                required
                                minLength="8"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            {passwordError !== "" && passwordError && (
                                <span className="signupForm__error signupForm__error--password">
                                    {passwordError}
                                </span>
                            )}
                        </label>

                        <p className="signupForm__label-text">
                            Confirm password
                        </p>
                        <label
                            htmlFor="confirm-password"
                            className="signupForm__label"
                        >
                            <input
                                type="password"
                                className="signupForm__input"
                                placeholder="••••••••••••"
                                spellCheck="false"
                                id="confirm-password"
                                required
                                onChange={(e) => {
                                    setPasswordConfirm(e.target.value);
                                }}
                            />
                            {passworConfirmError !== "" &&
                                passworConfirmError && (
                                    <span className="signupForm__error signupForm__error--password">
                                        {passworConfirmError}
                                    </span>
                                )}
                        </label>
                        <button type="submit" className="signupForm__btn">
                            Create an Account
                        </button>
                        <div className="signupForm__login">
                            <p>Already have an account?</p>
                            <Link to="/login">Sign In</Link>
                        </div>
                        {isLoading && (
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "9rem",
                                    right: "5rem",
                                }}
                            >
                                <SmallLoading />
                            </div>
                        )}
                    </form>

                    <div className="signup-illustration">{}</div>
                </article>
                <Footer />
            </div>
        </div>
    );
}
