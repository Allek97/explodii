import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./_signUp.scss";

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

    // const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e) => {
        try {
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

            await axios.post("http://localhost:5001/api/v1/users/signup", body);
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
            setEmailError(errorList.get("email"));
            setPasswordError(errorList.get("password"));
            setPasswordConfirmError(errorList.get("passwordConfirm"));

            console.log(emailError);
        }
    };

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <div className="signup">
            {/* <span className="signup__abstract">{}</span> */}
            <div className="signupNav">
                <div className="signupNav__logo-box">
                    <div className="signupNav__logo">{}</div>
                    <div className="signupNav__logo-text">explodii</div>
                </div>
                <a href="/" className="signupNav__btn">
                    Homepage
                </a>
                <a href="/signup" className="signupNav__btn">
                    Our excursions
                </a>
            </div>
            <div className="signup-info">
                <div className="signup-info__heading">
                    Join us and experience wonderful adventures all over the
                    world by signing up below
                </div>
            </div>

            <div className="signupBox">
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
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            {emailError !== "" && (
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
                            required
                            minLength="8"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {passwordError !== "" && (
                            <span className="signupForm__error">
                                {passwordError}
                            </span>
                        )}
                    </label>

                    <p className="signupForm__label-text">Confirm password</p>
                    <label
                        htmlFor="confirm-password"
                        className="signupForm__label"
                    >
                        <input
                            type="password"
                            className="signupForm__input"
                            placeholder="••••••••••••"
                            id="confirm-password"
                            required
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                            }}
                        />
                        {passworConfirmError !== "" && (
                            <span className="signupForm__error">
                                {passworConfirmError}
                            </span>
                        )}
                    </label>
                    <button type="submit" className="signupForm__btn">
                        Create an Account
                    </button>
                    <div className="signupForm__login">
                        <p>Already have an account?</p>
                        <a href="/login" className="signupForm__loginBtn">
                            Sign In
                        </a>
                    </div>
                    {/* <div className="signupForm__errors">
                        {validationErrors.map((el) => {
                            return (
                                <span key={uuidv4()} id={uuidv4()}>
                                    {`*${el}`}
                                </span>
                            );
                        })}
                    </div> */}
                </form>
                <div className="signupBox__illustration">{}</div>
            </div>
        </div>
    );
}
