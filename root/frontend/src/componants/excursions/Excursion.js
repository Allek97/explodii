/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { ProfileBtn, TourBox } from "./ExcursionStyledComponants";

import "./_excursion.scss";
import "../reusable/_navBar.scss";
import "../../assets/fonts/_global-fonts.scss";

const photoStyle = {
    width: "3.8rem",
    borderRadius: "18px",
};

export default function Excursions(props) {
    // props
    const { authStatus, userName, userPhoto } = props;
    // hooks
    const [excursions, setExcursions] = useState([]);
    // variables

    const userImg = (photo) => {
        return require(`../../assets/img/users/${photo}`).default;
    };

    // fonctions

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/users/logout`,
                {
                    withCredentials: true,
                }
            );
            window.location.assign("/");
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    useEffect(async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/tours`
            );
            setExcursions(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="excursion">
            <div className="navBar">
                <div className="navBar__logo-box">
                    <div className="navBar__logo">{}</div>
                    <div className="navBar__logo-text">explodii</div>
                </div>
                <a href="/" className="navBar__btn">
                    HomePage
                </a>
                {!authStatus ? (
                    <a href="/login" className="navBar__btn">
                        Log In
                    </a>
                ) : (
                    <a
                        href="/"
                        className="navBar__btn navBar__btn--log-out"
                        onClick={handleLogOut}
                        style={{
                            padding: "0.8rem 4rem",
                            paddingRight: "2.6rem",
                        }}
                    >
                        Log Out
                    </a>
                )}
                {!authStatus ? (
                    <a href="/signup" className="navBar__btn">
                        Sign Up
                    </a>
                ) : (
                    <ProfileBtn href="/account">
                        {/* <div style={profileStyle(userPhoto)}>{}</div> */}
                        <img
                            src={userImg(userPhoto)}
                            alt="profile"
                            style={photoStyle}
                        />
                        <span
                            style={{
                                padding: "0 2rem",
                                paddingLeft: "1.2rem",
                            }}
                        >{`${userName}`}</span>
                    </ProfileBtn>
                )}
            </div>

            <main
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8rem",
                }}
            >
                <div>{}</div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {excursions.map((el) => {
                        return (
                            <TourBox
                                id={uuidv4()}
                                key={uuidv4()}
                                excursion={el}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

Excursions.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};
