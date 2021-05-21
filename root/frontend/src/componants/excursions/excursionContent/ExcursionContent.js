/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import "./_excursionContent.scss";

// Componentes
import MenuBtn from "./components/MenuBtn";

// Fonts
import "../../../assets/fonts/_global-fonts.scss";
import { Center } from "@react-three/drei";

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
    const { authStatus, userPhoto, userName } = props;
    // URL slug param
    const { slug } = useParams();
    // hooks
    const [isApiConsumed, setApiConsumed] = useState(false);
    const [excursion, setExcursion] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    // function
    const guidePhoto = (photo = "default.jpg") => {
        return require(`../../../assets/img/users/${photo}`).default;
    };
    const excursionPhoto = (photo = "tour-1-1.jpg") => {
        return require(`../../../assets/img/tours/${photo}`).default;
    };

    const clockSvg = require("../../../assets/svgs/clock.svg").default;
    const locationSvg = require("../../../assets/svgs/map-pin.svg").default;

    const participantSvg = require("../../../assets/svgs/user1.svg").default;
    const levelSvg = require("../../../assets/svgs/profits.svg").default;
    const calenderSvg = require("../../../assets/svgs/calendar.svg").default;
    const reviewSvg = require("../../../assets/svgs/star.svg").default;

    //Functions

    // Find the concerned excursion using the slug param in the url since slug is unique
    useEffect(async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/tours?slug=${slug}`
            );
            if (!res.data.data[0]) {
                return window.location.assign("/excursions");
            }
            setExcursion(res.data.data[0]);
            console.log(res.data.data);
            setApiConsumed(true);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const listenScrollEvent = () => {
        if (window.scrollY > 35) {
            return setIsScrolled(true);
        }
        return setIsScrolled(false);
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
                <div className="excursion-content">
                    <Header className="navBar" isScrolled={isScrolled}>
                        <div className="navBar__logo-box">
                            <div className="navBar__logo ">{}</div>
                            <div className="navBar__logo-text ">explodii</div>
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
                            <MenuBtn isScrolled={isScrolled} />
                        )}
                    </Header>
                    <header className="excursion-content__header">
                        <Heading>
                            {" "}
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
                    </header>

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
                                <InfoHeading style={{ marginBottom: "3.5rem" }}>
                                    Excursion Information
                                </InfoHeading>
                                <WithLogo
                                    svg={calenderSvg}
                                    leftGradiant="rgb(var(--color-blue-special))"
                                    rightGradiant="rgb(var(--color-blue-special))"
                                    style={{ marginBottom: "2.25rem" }}
                                >
                                    <span style={fieldsStyle}>NEXT DATE</span>
                                    <span style={infoFieldsStyle}>
                                        June 2021
                                    </span>
                                </WithLogo>
                                <WithLogo
                                    svg={levelSvg}
                                    leftGradiant="rgb(var(--color-blue-special))"
                                    rightGradiant="rgb(var(--color-blue-special))"
                                    style={{ marginBottom: "2.25rem" }}
                                >
                                    <span style={fieldsStyle}>DIFFICULTY</span>
                                    <span style={infoFieldsStyle}>Medium</span>
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
                                    <span style={infoFieldsStyle}>
                                        15 People
                                    </span>
                                </WithLogo>
                                <WithLogo
                                    svg={reviewSvg}
                                    leftGradiant="rgb(var(--color-blue-special))"
                                    rightGradiant="rgb(var(--color-blue-special))"
                                    style={{ marginBottom: "7rem" }}
                                >
                                    <span style={fieldsStyle}>RATING</span>
                                    <span style={infoFieldsStyle}>4.8 / 5</span>
                                </WithLogo>

                                <InfoHeading style={{ marginBottom: "3.5rem" }}>
                                    YOUR EXCURSION GUIDES
                                </InfoHeading>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "2.25rem",
                                    }}
                                >
                                    <img
                                        src={guidePhoto("user-3.jpg")}
                                        alt="Lead guide"
                                        style={photoStyle}
                                    />
                                    <span style={fieldsStyle}>LEAD GUIDE</span>
                                    <span style={infoFieldsStyle}>
                                        Miyah Myles
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={guidePhoto("user-5.jpg")}
                                        alt="Excursion guide"
                                        style={photoStyle}
                                    />
                                    <span style={fieldsStyle}>
                                        Excursion GUIDE
                                    </span>
                                    <span style={infoFieldsStyle}>
                                        Miyah Myles
                                    </span>
                                </div>
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
                            <InfoHeading style={{ marginBottom: "3.5rem" }}>
                                ABOUT THE SEA EXPLORER TOUR
                            </InfoHeading>
                            <p style={{ marginBottom: "2.5rem" }}>
                                Consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna
                                aliqua. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </p>
                            <p>
                                Irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim
                                id est laborum. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna
                                aliqua. Duis aute irure dolor in reprehenderit
                                in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur.
                            </p>
                        </div>

                        <div className="deco" />
                        <span className="deco-2" />
                    </section>

                    <section className="excursion-pictures">
                        <img
                            src={excursionPhoto("tour-1-1.jpg")}
                            alt="Excursion guide"
                            style={{
                                height: "60rem",
                                width: "calc((1/3)*100%)",
                            }}
                        />
                        <img
                            src={excursionPhoto("tour-1-2.jpg")}
                            alt="Excursion guide"
                            style={{
                                height: "60rem",
                                width: "calc((1/3)*100%)",
                            }}
                        />
                        <img
                            src={excursionPhoto("tour-1-3.jpg")}
                            alt="Excursion guide"
                            style={{
                                height: "60rem",
                                width: "calc((1/3)*100%)",
                            }}
                        />
                    </section>
                </div>
            )}
        </>
    );
}

ExcursionContent.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userPhoto: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};
