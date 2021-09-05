/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { SuccessSave } from "./components/SuccessSave";
import { SettingsButton } from "./style/AccountStyledComponents";

import "./_account.scss";
import "../../componants/reusable/_navBar.scss";
import "../../base/_animations.scss";

export default function AccountSettings(props) {
    const {
        userName,
        userEmail,
        userPhoto,
        setUserName,
        setUserPhoto,
        setUserEmail,
    } = props;

    const [newUserName, setNewUserName] = useState(userName);
    const [newUserEmail, setNewUserEmail] = useState(userEmail);
    const [selectedImageFile, setSelectedImageFile] = useState(userPhoto);

    const [displaySuccessMsgSet, setDisplaySuccessMsgSet] = useState(false);
    const [displaySuccessMsgPW, setDisplaySuccessMsgPW] = useState(false);

    const [emailErr, setEmailErr] = useState("");
    const [currentPWErr, setCurrentPWErr] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passworConfirmError, setPasswordConfirmError] = useState("");

    const requiredUserImage = `${process.env.REACT_APP_URL}/api/v1/users/images/${userPhoto}`;

    // API MANAGEMENT
    const handleProfileSubmit = async (e) => {
        setEmailErr("");
        try {
            e.preventDefault();

            const body = new FormData();

            const photoFile =
                document.getElementById("profileForm-photo").files[0];

            body.append("photo", photoFile);
            body.append("name", newUserName);
            body.append("email", newUserEmail);

            const res = await axios.patch(
                `${process.env.REACT_APP_URL}/api/v1/users/updateMe`,
                body,
                { withCredentials: true, credentials: "include" }
            );

            if (res.data.status === "success") {
                const newUserProifilePic = res.data.data.user.photo;

                setUserName(newUserName);
                setUserEmail(newUserEmail);
                setUserPhoto(newUserProifilePic);

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
        setCurrentPWErr("");
        setPasswordError("");
        setPasswordConfirmError("");
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
                `${process.env.REACT_APP_URL}/api/v1/users/updateMyPassword`,
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

            // console.log(passworConfirmError);
        }
    };

    return (
        <div className="dashboard__content">
            <>
                <form onSubmit={handleProfileSubmit} className="profileForm">
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
                            spellCheck="false"
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
                            spellCheck="false"
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
                                setSelectedImageFile(e.target.files[0].name);
                            }}
                        />
                    </label>
                    <SettingsButton type="submit">Save Settings</SettingsButton>
                    {displaySuccessMsgSet && (
                        <SuccessSave
                            isSettings
                            setDisplaySuccessMsgSet={setDisplaySuccessMsgSet}
                            setDisplaySuccessMsgPW={setDisplaySuccessMsgPW}
                        />
                    )}
                </form>
                <form onSubmit={handlePasswordSubmit} className="profileForm">
                    <h2 className="profileForm__heading">
                        Password Management
                    </h2>
                    {/* <div className="profileForm__illustration">{}</div> */}
                    <p className="profileForm__label-text">Current Password</p>
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
                            spellCheck="false"
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
                            spellCheck="false"
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
                            spellCheck="false"
                        />
                        {passworConfirmError !== "" && passworConfirmError && (
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
                            setDisplaySuccessMsgSet={setDisplaySuccessMsgSet}
                        />
                    )}
                </form>
            </>
            {/* <AccountMap /> */}
        </div>
    );
}

AccountSettings.propTypes = {
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    setUserName: PropTypes.func.isRequired,
    setUserPhoto: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
};
