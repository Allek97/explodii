/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React, { createRef } from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

import {
    SideNav,
    SideItem,
    SideLink,
    FunctionalBtn,
    SettingsButton,
    SuccessSave,
} from "./StyleComponents";

import "./_account.scss";
import "../reusable/_navBar.scss";
import "../../base/_animations.scss";

//Components

import AccountMap from "./AccountMap";

// svgs for sideNav
// TRICK: You can use variables in styled components, add default to img/svgs for it to work
// const settingSvg = require("../../assets/svgs/cog1.svg").default;
const settingSvg = require("../../assets/svgs/settings.svg").default;
const bookingSvg = require("../../assets/svgs/suitcase1.svg").default;
const reviewSvg = require("../../assets/svgs/star.svg").default;
const billingSvg = require("../../assets/svgs/credit-card.svg").default;
const helpSvg = require("../../assets/svgs/message-circle.svg").default;
const logoutSvg = require("../../assets/svgs/log-out.svg").default;

// styled components

export default function Account(props) {
    // PROPS
    const {
        userName,
        userEmail,
        userPhoto,
        setUserName,
        setUserPhoto,
        setUserEmail,
    } = props;
    // HOOKS
    const [newUserName, setNewUserName] = useState(userName);
    const [newUserEmail, setNewUserEmail] = useState(userEmail);
    const [newUserPhoto, setNewUserPhoto] = useState(userPhoto);

    const [displaySuccessMsgSet, setDisplaySuccessMsgSet] = useState(false);
    const [displaySuccessMsgPW, setDisplaySuccessMsgPW] = useState(false);

    const [emailErr, setEmailErr] = useState("");
    const [currentPWErr, setCurrentPWErr] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passworConfirmError, setPasswordConfirmError] = useState("");

    // VARIABLES
    // Profile photo in side navigation bar
    const profilePhoto = require(`../../assets/img/users/${userPhoto}`).default;

    const requiredUserImage = require(`../../assets/img/users/${userPhoto}`)
        .default;

    // API MANAGEMENT
    const handleProfileSubmit = async (e) => {
        try {
            e.preventDefault();

            setEmailErr("");

            const body = new FormData();

            const photoFile = document.getElementById("profileForm-photo")
                .files[0];

            body.append("photo", photoFile);
            body.append("name", newUserName);
            body.append("email", newUserEmail);

            const res = await axios.patch(
                "http://localhost:5001/api/v1/users/updateMe",
                body,
                { withCredentials: true, credentials: "include" }
            );

            if (res.data.status === "success") {
                setUserName(newUserName);
                setUserEmail(newUserEmail);
                setUserPhoto(newUserPhoto);

                setDisplaySuccessMsgSet(true);

                setEmailErr("");
            }
        } catch (err) {
            const { message } = err.response.data;

            setEmailErr("");

            const error = message.split(":");

            setEmailErr(error[error.length - 1]);
        }
    };

    const handlePasswordSubmit = async (e) => {
        try {
            e.preventDefault();

            const currentPassword = document.getElementById(
                "profileForm-password"
            ).value;
            const newPassword = document.getElementById(
                "profileForm-newPassword"
            ).value;
            const newPasswordConfirm = document.getElementById(
                "profileForm-confirm-newPassword"
            ).value;

            const body = {
                passwordCurrent: currentPassword,
                password: newPassword,
                passwordConfirm: newPasswordConfirm,
            };

            const res = await axios.patch(
                "http://localhost:5001/api/v1/users/updateMyPassword",
                body,
                {
                    withCredentials: true,
                    credentials: "include",
                }
            );

            if (res.data.status === "success") {
                document.getElementById("profileForm-password").value = "";
                document.getElementById("profileForm-newPassword").value = "";
                document.getElementById(
                    "profileForm-confirm-newPassword"
                ).value = "";

                setCurrentPWErr("");
                setPasswordError("");
                setPasswordConfirmError("");

                setDisplaySuccessMsgPW(true);
            }
        } catch (err) {
            console.log(err.response.data.message);

            setCurrentPWErr("");
            setPasswordError("");
            setPasswordConfirmError("");

            const errorList = new Map();

            const { message } = err.response.data;

            if (!message.includes("validation")) {
                return setCurrentPWErr(message);
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
            setPasswordError(errorList.get(" password"));
            setPasswordConfirmError(errorList.get(" passwordConfirm"));

            console.log(passworConfirmError);
        }
    };

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await axios.get("http://localhost:5001/api/v1/users/logout", {
                withCredentials: true,
            });
            window.location.assign("/");
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    return (
        <div className="account">
            <div className="navBar navBar--account">
                <div className="navBar__logo-box">
                    <div className="navBar__logo navBar__logo--account">{}</div>
                    <div className="navBar__logo-text navBar__logo-text--account">
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
            <div className="dashboard">
                <nav className="dashboard__view">
                    <div className="profile">
                        <img
                            src={profilePhoto}
                            alt="profile"
                            className="profile__photo"
                        />
                        {/*TODO: METTRE DISPLAY GRID POUR REGLER LE PROBLEME DES NOMS LONGS */}
                        {/*NOTE: Jamais utiliser position absolute avec des variables */}

                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__email">{userEmail}</p>
                    </div>
                    <SideNav>
                        <SideItem svg={settingSvg}>
                            <SideLink>Settings</SideLink>
                        </SideItem>
                        <SideItem svg={bookingSvg}>
                            <SideLink>My Bookings</SideLink>
                        </SideItem>
                        <SideItem svg={reviewSvg}>
                            <SideLink>My Reviews</SideLink>
                        </SideItem>
                        <SideItem svg={billingSvg}>
                            <SideLink>Billing</SideLink>
                        </SideItem>
                        <FunctionalBtn svg={helpSvg}>Get help</FunctionalBtn>
                        <FunctionalBtn svg={logoutSvg} onClick={handleLogOut}>
                            Logout
                        </FunctionalBtn>
                    </SideNav>
                </nav>
                <div className="dashboard__content">
                    <form
                        onSubmit={handleProfileSubmit}
                        className="profileForm profileForm--Set"
                    >
                        <h2 className="profileForm__heading">
                            Your profile settings
                        </h2>
                        {/* <div className="profileForm__illustration">{}</div> */}
                        <p className="profileForm__label-text">Name</p>
                        <label
                            htmlFor="profileForm-name"
                            className="profileForm__label"
                        >
                            <input
                                type="text"
                                className="profileForm__input"
                                placeholder="Ilias Allek"
                                id="profileForm-name"
                                defaultValue={newUserName}
                                required
                                onChange={(e) => {
                                    setNewUserName(e.target.value);
                                }}
                            />
                        </label>

                        <p className="profileForm__label-text">Email</p>
                        <label
                            htmlFor="profleForm-email"
                            className="profileForm__label"
                        >
                            <input
                                type="email"
                                className="profileForm__input"
                                placeholder="ilias@example.com"
                                id="profleForm-email"
                                defaultValue={newUserEmail}
                                required
                                onChange={(e) => {
                                    setNewUserEmail(e.target.value);
                                }}
                            />
                            {emailErr !== "" && emailErr && (
                                <span className="profileForm__error">
                                    {emailErr}
                                </span>
                            )}
                        </label>
                        <img
                            src={requiredUserImage}
                            alt="profile"
                            className="profileForm__photo"
                        />
                        <label
                            htmlFor="profileForm-photo"
                            className="profileForm__upload-label"
                        >
                            Choose new photo
                            <input
                                className="profileForm__upload"
                                type="file"
                                accept="image/*"
                                id="profileForm-photo"
                                name="photo"
                                onChange={(e) => {
                                    setNewUserPhoto(e.target.files[0].name);
                                }}
                            />
                        </label>
                        <SettingsButton type="submit">
                            Save Settings
                        </SettingsButton>
                        {displaySuccessMsgSet && (
                            <SuccessSave
                                isSettings
                                setDisplaySuccessMsgSet={
                                    setDisplaySuccessMsgSet
                                }
                            />
                        )}
                    </form>
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="profileForm profileForm--PW"
                    >
                        <h2 className="profileForm__heading">
                            Password Management
                        </h2>
                        {/* <div className="profileForm__illustration">{}</div> */}
                        <p className="profileForm__label-text">
                            Current Password
                        </p>
                        <label
                            htmlFor="profileForm-password"
                            className="profileForm__label"
                        >
                            <input
                                type="password"
                                className="profileForm__input"
                                id="profileForm-password"
                                placeholder="••••••••••••"
                                required
                            />
                            {currentPWErr !== "" && currentPWErr && (
                                <span className="profileForm__error">
                                    {currentPWErr}
                                </span>
                            )}
                        </label>

                        <p className="profileForm__label-text">New Password</p>
                        <label
                            htmlFor="profileForm-newPassword"
                            className="profileForm__label"
                        >
                            <input
                                type="password"
                                className="profileForm__input"
                                placeholder="8+ Characters, 1 Capital letter, 1 Number"
                                id="profileForm-newPassword"
                                required
                            />
                            {passwordError !== "" && passwordError && (
                                <span className="profileForm__error">
                                    {passwordError}
                                </span>
                            )}
                        </label>
                        <p className="profileForm__label-text">
                            Confirm New Password
                        </p>
                        <label
                            htmlFor="profileForm-confirm-newPassword"
                            className="profileForm__label"
                        >
                            <input
                                type="password"
                                className="profileForm__input"
                                id="profileForm-confirm-newPassword"
                                placeholder="••••••••••••"
                                required
                            />
                            {passworConfirmError !== "" &&
                                passworConfirmError && (
                                    <span className="profileForm__error">
                                        {passworConfirmError}
                                    </span>
                                )}
                        </label>

                        <SettingsButton
                            type="submit"
                            style={{ marginTop: "2.4rem" }}
                        >
                            Update Password
                        </SettingsButton>
                        {displaySuccessMsgPW && (
                            <SuccessSave
                                isSettings={false}
                                setDisplaySuccessMsgPW={setDisplaySuccessMsgPW}
                            />
                        )}
                    </form>
                    <AccountMap />
                </div>
            </div>
        </div>
    );
}

Account.propTypes = {
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    setUserName: PropTypes.func.isRequired,
    setUserPhoto: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
};
