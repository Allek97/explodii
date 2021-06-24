/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Loading from "../../componants/loading/PageLoading";
import ExcursionFilter from "./excursionFilter/ExcursionFilter";
import PaymentStatusBox from "./PaymentSuccessBox";
import ExcursionSort from "./ExcursionSort";
import { ProfileBtn, TourBox } from "./ExcursionStyledComponants";
import Decoration from "./ExcursionDecoration";

import "./_excursion.scss";
import "../../componants/reusable/_navBar.scss";
import "../../assets/fonts/_global-fonts.scss";

const photoStyle = {
    width: "3.8rem",
    borderRadius: "18px",
};

export default function Excursions(props) {
    // props
    const {
        authStatus,
        userName,
        userPhoto,
        paymentStatus,
        bookedExcursionName,
        bookedExcursionPrice,
        bookedExcursionDuration,
        bookedExcursionDate,
    } = props;
    // hooks
    const [excursions, setExcursions] = useState([]);
    const [nbResults, setNbResults] = useState(0);
    const [sortField, setSortField] = useState("");
    const [isApiConsumed, setIsApiConsumed] = useState(false);
    const [animationLoad, setAnimationLoad] = useState(false);

    // variables
    const userImg = (photo) => {
        return require(`../../assets/img/users/${photo}`).default;
    };

    useEffect(async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/tours`
            );
            // setExcursions(res.data.data);
            // setNbResults(res.data.data.length);
            // console.log(res);
            if (res.data.status === "success") {
                setIsApiConsumed(true);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setAnimationLoad(true);
        }, 500);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    return (
        <>
            {isApiConsumed && (
                <>
                    <Loading loadingTime={500} />
                    <div>
                        {paymentStatus && (
                            <PaymentStatusBox
                                bookedExcursionName={bookedExcursionName}
                                bookedExcursionPrice={bookedExcursionPrice}
                                bookedExcursionDuration={
                                    bookedExcursionDuration
                                }
                                bookedExcursionDate={bookedExcursionDate}
                            />
                        )}
                        <div
                            className="excursion"
                            style={
                                paymentStatus
                                    ? {
                                          filter: "blur(5px)",
                                          pointerEvents: "none",
                                          overflow: "hidden",
                                      }
                                    : { overflow: "hidden" }
                            }
                        >
                            <div className="navBar">
                                <div className="navBar__logo-box">
                                    <div className="navBar__logo">{}</div>
                                    <div className="navBar__logo-text">
                                        explodii
                                    </div>
                                </div>
                                <a href="/" className="navBar__btn">
                                    HomePage
                                </a>
                                {!authStatus && (
                                    <a href="/login" className="navBar__btn">
                                        Log In
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
                                                minWidth: "6rem",
                                            }}
                                        >{`${userName}`}</span>
                                    </ProfileBtn>
                                )}
                            </div>

                            <main
                                style={{
                                    display: "flex",
                                    marginTop: "8rem",
                                }}
                            >
                                <div style={{ marginRight: "5rem" }}>
                                    <ExcursionFilter
                                        setExcursions={setExcursions}
                                        setNbResults={setNbResults}
                                        sortField={sortField}
                                        authStatus={authStatus}
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "99rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            margin: "1rem 2rem 2rem 1rem",
                                            color: "#55575b",
                                            fontSize: "1.4rem",
                                            fontFamily: "Poppins, sans-serif",
                                            fontWeight: "300",
                                        }}
                                    >
                                        <span style={{ marginRight: "auto" }}>
                                            {nbResults} results
                                        </span>
                                        <ExcursionSort
                                            setExcursions={setExcursions}
                                            setSortField={setSortField}
                                        />
                                    </div>
                                    {excursions.map((el) => {
                                        return (
                                            <TourBox
                                                id={el.name}
                                                key={el.name}
                                                excursion={el}
                                                animationLoad={animationLoad}
                                            />
                                        );
                                    })}
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "0",
                                        top: "45rem",
                                        zIndex: "-1",
                                        width: "100%",
                                        height: "35rem",
                                    }}
                                >
                                    <Decoration />
                                </div>
                            </main>

                            <footer
                                className="footer"
                                style={{
                                    position: "absolute",
                                    left: "0",
                                    marginTop: "5rem",
                                    width: "100%",
                                }}
                            >
                                <div className="footer__logobox">
                                    <div className="footer__logo">{}</div>
                                    <h1 className="footer__logo-heading">
                                        Explodii
                                    </h1>
                                </div>
                                <div className="footer__content">
                                    <div className="footer__navigation">
                                        <a href="/" className="footer__btn">
                                            About Us
                                        </a>
                                        <a href="/" className="footer__btn">
                                            Careers
                                        </a>
                                        <a href="/" className="footer__btn">
                                            Events
                                        </a>
                                        <a href="/" className="footer__btn">
                                            Contact Us
                                        </a>
                                        <a href="/" className="footer__btn">
                                            Privacy Policy
                                        </a>
                                        <a href="/" className="footer__btn">
                                            Terms Of Use
                                        </a>
                                    </div>
                                    <div className="footer__copyright">
                                        &copy; 2021 by{" "}
                                        <a
                                            href="/"
                                            className="footer__btn"
                                            style={{
                                                textTransform: "none",
                                            }}
                                        >
                                            Ilias Allek
                                        </a>
                                        . All rights reserved.
                                    </div>
                                    <div className="footer__media">
                                        <a
                                            href="/"
                                            className="footer__media--1"
                                        >
                                            {}
                                        </a>
                                        <a
                                            href="/"
                                            className="footer__media--2"
                                        >
                                            {}
                                        </a>
                                        <a
                                            href="/"
                                            className="footer__media--3"
                                        >
                                            {}
                                        </a>
                                        <a
                                            href="/"
                                            className="footer__media--4"
                                        >
                                            {}
                                        </a>
                                        <a
                                            href="/"
                                            className="footer__media--5"
                                        >
                                            {}
                                        </a>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

Excursions.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    paymentStatus: PropTypes.bool.isRequired,
    bookedExcursionName: PropTypes.string.isRequired,
    bookedExcursionDuration: PropTypes.number.isRequired,
    bookedExcursionDate: PropTypes.string.isRequired,
    bookedExcursionPrice: PropTypes.number.isRequired,
};
