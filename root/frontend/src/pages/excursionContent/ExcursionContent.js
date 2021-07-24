/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import "./_excursionContent.scss";

// Componentes
import Loading from "../../componants/loading/PageLoading";
import ExcursionMap from "./components/excursionMap/ExcursionMap";
import ExcursionReview from "./components/excursionsReviews/ExcursionReviews";
import ExcursionBooking from "./components/excursionBooking/ExcursionBooking";

import MenuBtn from "../../componants/menuBtn/MenuBtn";
import Decoration from "./components/DecorationSection";

// Fonts
import "../../assets/fonts/_global-fonts.scss";

// styles

const photoStyle = {
    height: "3.5rem",
    marginRight: "1.25rem",
    borderRadius: "50%",
};

const fieldsStyle = {
    marginRight: "2rem",
    marginLeft: "5px",

    fontSize: "1.5rem",
    textTransform: "uppercase",
    color: "black",
};

const infoFieldsStyle = {
    fontSize: "1.5rem",
    fontWeight: "300",
    color: "black",
};

// Styled components
const Header = styled.div`
    position: ${(props) => (props.isScrolled ? "fixed" : "absolute")};
    top: 0;
    left: 0;

    z-index: 6;

    transition: all 0.3s ease-in;

    width: 100%;
    padding: 0 10rem;

    box-shadow: ${(props) =>
        props.isScrolled ? "0 0 5px rgb(0 0 0 / 20%);" : "none"};

    /* box-shadow: 0 0 5px rgb(0 0 0 / 20%); */

    background-color: ${(props) =>
        props.isScrolled ? "white" : "transparent"};

    & > a {
        &,
        &:link,
        &:visited {
            background-image: linear-gradient(
                76deg,
                ${(props) =>
                    props.isScrolled
                        ? "rgb(var(--color-main-1))"
                        : "transparent"},
                ${(props) =>
                        props.isScrolled
                            ? "rgb(var(--color-main-2))"
                            : "transparent"}
                    50%
            );
        }
    }

    div:first-child {
        div {
            transition: all 0.5s ease-in;

            transform: ${(props) =>
                props.isScrolled ? "scale(1.1)" : "scale(1)"};

            background-image: linear-gradient(
                76deg,
                ${(props) =>
                    props.isScrolled ? "rgb(var(--color-main-1))" : "white"},
                ${(props) =>
                        props.isScrolled ? "rgb(var(--color-main-2))" : "white"}
                    50%
            );
        }
    }
`;

const HeaderPage = styled.header`
    position: relative;

    z-index: 5;

    display: flex;
    flex-direction: column;
    align-items: center;

    height: 85vh;
    padding: 0 10rem;

    background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-primary-light), 0.85),
            rgba(var(--color-primary-dark), 0.85) 50%
        ),
        url(${(props) => props.imageCover});

    // background-image: linear-gradient(
    //         76deg,
    //         rgba(var(--color-main-1), 0.9),
    //         rgba(var(--color-main-2), 0.9) 50%
    //     ),
    //     url("../../../assets/img/tours/tour-1-cover.jpg");
    background-position: center;

    clip-path: polygon(
        0 0,
        100% 0,
        100% calc(100% - (var(--excursion-clip-height))),
        0 100%
    );
`;

const Heading = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 20rem;

    font-size: 4.5rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: 300;

    color: #fff;
    span {
        padding: 0.5rem 1.5rem;

        background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-primary-light), 0.6),
            rgba(var(--color-primary-dark), 0.6) 50%
        );
        /* background-image: linear-gradient(
            76deg,
            rgba(var(--color-main-1), 0.9),
            rgba(var(--color-main-2), 0.9) 50%
        ); */
    }
`;

const WithLogo = styled.span`
    display: flex;
    align-items: center;

    font-size: 1.5rem;
    color: white;

    &::before {
        content: "";

        height: 1.9rem;
        width: 1.9rem;
        margin-right: 5px;

        background-image: linear-gradient(
            to right,
            ${(props) => (props.leftGradiant ? props.leftGradiant : "white")},
            ${(props) => (props.rightGradiant ? props.rightGradiant : "white")}
        );

        box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.6);

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
    }
`;

const InfoHeading = styled.h1`
    display: inline-block;

    font-size: 2.25rem;
    text-transform: uppercase;
    font-weight: 700;
    background-image: linear-gradient(
        76deg,
        rgb(var(--color-primary-light)),
        rgb(var(--color-primary-light))
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 0.1rem;
    line-height: 1.3;
`;

export default function ExcursionContent(props) {
    // props
    const { authStatus, userName, userPhoto, setPaymentStatus } = props;
    // URL slug param
    const { slug } = useParams();
    // hooks
    const [isApiConsumed, setApiConsumed] = useState(false);
    const [excursion, setExcursion] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    // function
    const guidePhoto = (photo = "default.jpg") => {
        return `${process.env.REACT_APP_URL}/api/v1/users/images/${photo}`;
    };
    const excursionPhoto = (photo = "tour-1-1.jpg") => {
        const compressedPhoto = `${photo.split(".")[0]}-900x600.jpg`;
        return require(`../../assets/img/tours/${compressedPhoto}`).default;
    };

    const clockSvg = require("../../assets/svgs/clock.svg").default;
    const locationSvg = require("../../assets/svgs/map-pin.svg").default;

    const participantSvg = require("../../assets/svgs/user1.svg").default;
    const levelSvg = require("../../assets/svgs/profits.svg").default;
    const calenderSvg = require("../../assets/svgs/calendar.svg").default;
    const reviewSvg = require("../../assets/svgs/star.svg").default;

    //Functions

    // Find the concerned excursion using the slug param in the url since slug is unique
    useEffect(() => {
        async function fetchApi() {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/tours?slug=${slug}`
                );
                if (!res.data.data[0]) {
                    return window.location.assign("/excursions");
                }
                setExcursion(res.data.data[0]);
                // console.log(res.data.data[0]);
                setApiConsumed(true);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
        fetchApi();
    }, []);

    const listenScrollEvent = () => {
        if (window.scrollY > 35) {
            return setIsScrolled(true);
        }
        return setIsScrolled(false);
    };

    const getNextDate = (dateArray) => {
        //NOTE: format: "2016-02-18T23:59:48.039Z"
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        // eslint-disable-next-line no-restricted-syntax
        for (let date of dateArray) {
            const convertedDate = new Date(date);

            if (convertedDate > Date.now()) {
                date = date.split("T")[0];
                const dateMonth = months[parseInt(date.split("-")[1], 10) - 1];
                const dateYear = date.split("-")[0];
                return `${dateMonth} ${dateYear}`;
            }
        }

        return "No tours planned for now, new dates will be coming soon !";
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    return (
        <>
            {isApiConsumed && (
                <>
                    <Loading loadingTime={500} />
                    <div className="excursion-content">
                        <Header className="navBar" isScrolled={isScrolled}>
                            <div className="navBar__logo-box">
                                <div className="navBar__logo ">{}</div>
                                <div className="navBar__logo-text ">
                                    explodii
                                </div>
                            </div>
                            <a href="/excursions" className="navBar__btn">
                                Our Excursions
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
                                <MenuBtn
                                    page="excursion-content"
                                    isScrolled={isScrolled}
                                    userName={userName}
                                    userPhoto={userPhoto}
                                />
                            )}
                        </Header>

                        <HeaderPage
                            imageCover={
                                require(`../../assets/img/tours/${excursion.imageCover}`)
                                    .default
                            }
                        >
                            <Heading>
                                <span>{excursion.name}</span>
                                <span>Excursion</span>
                            </Heading>
                            <div style={{ display: "flex", marginTop: "3rem" }}>
                                <WithLogo
                                    style={{
                                        marginRight: "4rem",
                                    }}
                                    svg={clockSvg}
                                >
                                    {excursion.duration} days
                                </WithLogo>
                                <WithLogo svg={locationSvg}>
                                    {excursion.startLocation.description}
                                </WithLogo>
                            </div>
                        </HeaderPage>

                        <main>
                            <section className="excursion-information">
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        flex: "0 0 50%",
                                        // marginLeft: "10rem",
                                    }}
                                >
                                    <div style={{ display: "block" }}>
                                        <InfoHeading
                                            style={{ marginBottom: "3.5rem" }}
                                        >
                                            Excursion Information
                                        </InfoHeading>
                                        <WithLogo
                                            svg={calenderSvg}
                                            leftGradiant="rgb(var(--color-blue-special))"
                                            rightGradiant="rgb(var(--color-blue-special))"
                                            style={{ marginBottom: "2.25rem" }}
                                        >
                                            <span style={fieldsStyle}>
                                                NEXT DATE
                                            </span>
                                            <span style={infoFieldsStyle}>
                                                {getNextDate(
                                                    excursion.startDates
                                                )}
                                            </span>
                                        </WithLogo>
                                        <WithLogo
                                            svg={levelSvg}
                                            leftGradiant="rgb(var(--color-blue-special))"
                                            rightGradiant="rgb(var(--color-blue-special))"
                                            style={{ marginBottom: "2.25rem" }}
                                        >
                                            <span style={fieldsStyle}>
                                                DIFFICULTY
                                            </span>
                                            <span
                                                style={{
                                                    ...infoFieldsStyle,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {excursion.difficulty}
                                            </span>
                                        </WithLogo>
                                        <WithLogo
                                            svg={participantSvg}
                                            leftGradiant="rgb(var(--color-blue-special))"
                                            rightGradiant="rgb(var(--color-blue-special))"
                                            style={{ marginBottom: "2.25rem" }}
                                        >
                                            <span style={fieldsStyle}>
                                                PARTICIPANTS
                                            </span>
                                            <span
                                                style={{
                                                    ...infoFieldsStyle,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {excursion.maxGroupSize} People
                                            </span>
                                        </WithLogo>
                                        <WithLogo
                                            svg={reviewSvg}
                                            leftGradiant="rgb(var(--color-blue-special))"
                                            rightGradiant="rgb(var(--color-blue-special))"
                                            style={{ marginBottom: "7rem" }}
                                        >
                                            <span style={fieldsStyle}>
                                                RATING
                                            </span>
                                            <span style={infoFieldsStyle}>
                                                {excursion.ratingsAverage} / 5
                                            </span>
                                        </WithLogo>

                                        <InfoHeading
                                            style={{ marginBottom: "3.5rem" }}
                                        >
                                            YOUR EXCURSION GUIDES
                                        </InfoHeading>
                                        {excursion.guides
                                            .filter(
                                                (guide) =>
                                                    guide.role === "lead-guide"
                                            )
                                            .map((guide) => (
                                                <div
                                                    key={guide.name}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginBottom: "2.25rem",
                                                    }}
                                                >
                                                    <img
                                                        src={guidePhoto(
                                                            guide.photo
                                                        )}
                                                        alt="lead guide"
                                                        style={photoStyle}
                                                    />
                                                    <span style={fieldsStyle}>
                                                        Lead Guide
                                                    </span>
                                                    <span
                                                        style={infoFieldsStyle}
                                                    >
                                                        {guide.name}
                                                    </span>{" "}
                                                </div>
                                            ))}

                                        {excursion.guides
                                            .filter(
                                                (guide) =>
                                                    guide.role === "guide"
                                            )
                                            .map((guide) => (
                                                <div
                                                    key={guide.name}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginBottom: "3.5rem",
                                                    }}
                                                >
                                                    <img
                                                        src={guidePhoto(
                                                            guide.photo
                                                        )}
                                                        alt="Excursion guide"
                                                        style={photoStyle}
                                                    />
                                                    <span style={fieldsStyle}>
                                                        Excursion GUIDE
                                                    </span>
                                                    <span
                                                        style={infoFieldsStyle}
                                                    >
                                                        {guide.name}
                                                    </span>{" "}
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",

                                        flex: "0 0 50%",

                                        fontSize: "1.7rem",
                                        fontWeight: "300",
                                    }}
                                >
                                    <InfoHeading
                                        style={{
                                            marginBottom: "3.5rem",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        ABOUT {excursion.name} EXCURSION
                                    </InfoHeading>
                                    <p style={{ marginBottom: "2.5rem" }}>
                                        {excursion.description
                                            .split(".")
                                            .filter(
                                                (el, idx) =>
                                                    idx === 0 || idx === 1
                                            )}
                                        .
                                    </p>
                                    <p>
                                        {excursion.description
                                            .split(".")
                                            .filter(
                                                (el, idx) =>
                                                    idx !== 0 && idx !== 1
                                            )}
                                    </p>
                                </div>

                                <Decoration />
                            </section>

                            <section className="excursion-pictures">
                                {excursion.images.map((imageName) => (
                                    <img
                                        src={excursionPhoto(imageName)}
                                        alt="Excursion guide"
                                        style={{
                                            height: "60rem",
                                            width: "calc((1/3)*100%)",
                                        }}
                                        key={imageName}
                                    />
                                ))}
                            </section>

                            <section className="excursion-map">
                                <ExcursionMap
                                    startLocation={excursion.startLocation}
                                    locations={excursion.locations}
                                />
                            </section>

                            <section className="excursion-reviews">
                                <ExcursionReview
                                    excursionId={excursion.id}
                                    excursionName={excursion.name}
                                />
                                {/* <Decoration /> */}
                            </section>

                            <section className="excursion-booking">
                                <ExcursionBooking
                                    excursionId={excursion.id}
                                    excursionDuration={excursion.duration}
                                    excursionPrice={excursion.price}
                                    excursionImages={excursion.images}
                                    excursionName={excursion.name}
                                    excursionDate={getNextDate(
                                        excursion.startDates
                                    )}
                                    authStatus={authStatus}
                                    setPaymentStatus={setPaymentStatus}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "45rem",
                                        width: "100%",
                                        height: "35rem",
                                    }}
                                >
                                    <Decoration />
                                </div>
                            </section>
                        </main>

                        <footer className="footer">
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
                                        Terms of Use
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
                                    <a href="/" className="footer__media--1">
                                        {}
                                    </a>
                                    <a href="/" className="footer__media--2">
                                        {}
                                    </a>
                                    <a href="/" className="footer__media--3">
                                        {}
                                    </a>
                                    <a href="/" className="footer__media--4">
                                        {}
                                    </a>
                                    <a href="/" className="footer__media--5">
                                        {}
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </>
            )}
        </>
    );
}

ExcursionContent.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    setPaymentStatus: PropTypes.func.isRequired,
};
