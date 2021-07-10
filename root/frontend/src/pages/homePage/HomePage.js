/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
// import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

// Componants
import PopCards from "../../componants/cards/Card";
import Reviews from "../../componants/reviews/Reviews";
import Reservation from "../../componants/reservation/Reservation";
import Footer from "../../componants/footer/Footer";
// import Globe from "../globe/Globe";
import RotatingText from "../../componants/rotatingText/RotatingText";
import Loading from "../../componants/loading/PageLoading";
// import Earth from "../earth/Earth";

// IMAGES
// import BirdLogo from "../../assets/img/home/bird-logo.png";
import Nat1 from "../../assets/img/tours/tour-5-1-450x300.jpg";
import Nat2 from "../../assets/img/tours/tour-3-2-450x300.jpg";
import Nat3 from "../../assets/img/tours/tour-9-3-450x300.jpg";
// import HomeBg from "../../assets/img/home/joshua-oluwagbemiga-Z6HQ0EhoD6g-unsplash.jpg";

// VIDEOS
// import BgVideo from "../../assets/videos/cosmos.mp4";
// SCSS
import "./_homepage.scss";
import "../../componants/reusable/_button.scss";
import "../../base/_typography.scss";
import "../../componants/reusable/_navBar.scss";

// Styling
const photoStyle = {
    width: "3.8rem",
    borderRadius: "18px",
};

export const ProfileBtn = styled.a`
    &,
    &:link,
    &:visited {
        display: flex;
        align-items: center;

        transition: all 0.2s;
        box-shadow: 1px 1px 32px 0 rgb(41 99 221 / 50%);

        height: 3.8rem;
        /* width: 3.8rem; */

        border-radius: 18px;

        background-color: #1a5ef3;
        overflow: hidden;

        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
    }

    img {
        background-color: #3be5dd;
    }

    &:hover {
        filter: brightness(1.1);
    }
`;

export default function HomePage(props) {
    // Props
    const { authStatus, userName, userPhoto } = props;

    // Styling
    const userImg = (photo) => {
        return `${process.env.REACT_APP_URL}/api/v1/users/images/${photo}`;
    };

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

    return (
        <>
            <Loading />
            <header className="header">
                <div className="navBar navBar--homepage">
                    <div className="navBar__logo-box">
                        <div className="navBar__logo navBar__logo--homepage">
                            {}
                        </div>
                        <div className="navBar__logo-text navBar__logo-text--homepage">
                            explodii
                        </div>
                    </div>
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
                                    minWidth: "6rem",
                                }}
                            >{`${userName}`}</span>
                        </ProfileBtn>
                    )}
                </div>

                {/* eslint-disable-next-line react/no-unknown-property */}
                {/* <svg>{Earth()}</svg> */}
                <div style={{ display: "flex" }}>
                    <div className="header__headings">
                        <h1 className="header__heading-primary">
                            Discover New Places,Meet New People and Travel.
                        </h1>

                        <RotatingText className="header__heading-secondary" />

                        <a href="/excursions" className="header__btn">
                            See our excursions
                        </a>
                    </div>

                    <div className="header__bgimg" />
                </div>

                {/* <Globe className="header__globe" /> */}
            </header>

            <main>
                <section className="section-about">
                    <h2 className=" heading-primary heading-about">
                        Profound experciences are awaiting you
                        {/* , reconnect with
                        nature */}
                    </h2>

                    <div className="aboutbox">
                        <h3 className="aboutbox__heading-1">
                            you&apos;re going to fall in love with nature
                        </h3>
                        <p className="aboutbox__text-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Nihil iure cum molestias animi magni quisquam
                            at voluptas sint, sunt, ut accusamus. Excepturi
                            saepe facilis porro laboriosam, reiciendis
                            necessitatibus voluptates neque
                        </p>
                        <h3 className="aboutbox__heading-2">
                            Deeply reconnect with nature
                        </h3>
                        <p className="aboutbox__text-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nulla at perferendis facere minima quisquam
                            dolore vero debitis dolorum odio ullam, maiores
                            earum voluptatibus reprehenderit voluptatum
                            consectetur reiciendis beatae, laborum nam.
                        </p>
                        <a
                            href="/"
                            className="aboutbox__btn btn btn--explo btn--blue btn--animated"
                        >
                            Read more
                        </a>
                    </div>

                    <div className="composition">
                        <img
                            src={Nat1}
                            className="composition__photo composition__photo--1"
                            alt="nat-1"
                        />
                        <img
                            src={Nat2}
                            className="composition__photo composition__photo--2"
                            alt="nat-2"
                        />
                        <img
                            src={Nat3}
                            className="composition__photo composition__photo--3"
                            alt="nat-3"
                        />
                    </div>
                </section>

                <section className="section-features">
                    <div className="features">
                        {/* <svg>
                                <use
                                    href={`${Sprite}#icon-world`}
                                    className="features__icon features__icon--1"
                                />
                            </svg> using svg sprite in jsx*/}
                        <i className="features__icon features__icon--1">{}</i>
                        <h1 className="features__heading">
                            Travel in the wilderness
                        </h1>
                        <p className="features__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta maiores ducimus consequatur delectus
                            alias voluptatibus. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className="features">
                        <i className="features__icon features__icon--2">{}</i>
                        <h1 className="features__heading">
                            Discover the world
                        </h1>
                        <p className="features__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta maiores ducimus consequatur delectus
                            alias voluptatibus. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className="features">
                        <i className="features__icon features__icon--3">{}</i>
                        <h1 className="features__heading">
                            Travel to new places
                        </h1>
                        <p className="features__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta maiores ducimus consequatur delectus
                            alias voluptatibus. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className="features">
                        <i className="features__icon features__icon--4">{}</i>
                        <h1 className="features__heading">
                            Reconnect with nature
                        </h1>
                        <p className="features__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta maiores ducimus consequatur delectus
                            alias voluptatibus. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                        </p>
                    </div>
                </section>

                <section className="section-excursions">
                    <h2 className="heading-tours heading-primary">
                        Our most popular excursions
                    </h2>
                    <PopCards />
                    <a
                        href="/excursions"
                        className="excursion-btn btn btn--explo btn--blue btn--animated"
                    >
                        Discover our excursions
                    </a>
                </section>

                <section className="section-reviews">
                    <h2 className="heading-primary heading-reviews">
                        We provide the best service
                    </h2>
                    <Reviews />
                </section>
                <section className="section-reservation">
                    <Reservation />
                </section>
            </main>
            <Footer />
        </>
    );
}

HomePage.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};

// NOTE: If not required use HomePage.defaultProps
