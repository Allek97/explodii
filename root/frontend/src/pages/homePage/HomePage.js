/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
// import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Componants
import PopCards from "../../componants/cards/Card";
import Reviews from "../../componants/reviews/Reviews";
import Reservation from "../../componants/reservation/Reservation";
import Footer from "../../componants/footer/Footer";
import NavBar from "./HomeNavBar";
// import Globe from "../globe/Globe";
import RotatingText from "../../componants/rotatingText/RotatingText";
import Loading from "../../componants/loading/PageLoading";
import { HeroSection } from "./HomePageStyles";
// import Earth from "../earth/Earth";

// IMAGES
// import BirdLogo from "../../assets/img/home/bird-logo.png";
import Nat1 from "../../assets/img/tours/tour-5-1-900x600.jpg";
import Nat2 from "../../assets/img/tours/tour-3-2-900x600.jpg";
import Nat3 from "../../assets/img/tours/tour-9-3-900x600.jpg";
// SVGS
import { ReactComponent as HeroSvg } from "../../assets/svgs/hero-globe.svg";
// VIDEOS
// import BgVideo from "../../assets/videos/cosmos.mp4";
// SCSS
import "./_homepage.scss";
import "../../componants/reusable/_button.scss";
import "../../base/_typography.scss";
import "../../componants/reusable/_navBar.scss";

export default function HomePage(props) {
    // Props
    const { authStatus, userName, userPhoto } = props;

    return (
        <>
            <Loading />
            <header className="header">
                <NavBar
                    authStatus={authStatus}
                    userName={userName}
                    userPhoto={userPhoto}
                />

                {/* eslint-disable-next-line react/no-unknown-property */}
                {/* <svg>{Earth()}</svg> */}

                <HeroSection>
                    <article className="header__headings">
                        <h1 className="header__heading-primary">
                            Discover New Places,Meet New People and Travel.
                        </h1>

                        <RotatingText />

                        <Link to="/excursions" className="header__btn">
                            See our excursions
                        </Link>
                    </article>

                    <HeroSvg className="header__bgimg" />
                </HeroSection>

                {/* <Globe className="header__globe" /> */}
            </header>

            <main>
                <section className="section-about">
                    <h2 className=" heading-primary heading-about">
                        Profound experiences are awaiting you
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
                            necessitatibus voluptates neque.
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
                    <div className="feature-box">
                        <div className="features">
                            {/* <svg>
                                <use
                                    href={`${Sprite}#icon-world`}
                                    className="features__icon features__icon--1"
                                />
                            </svg> using svg sprite in jsx*/}
                            <i className="features__icon features__icon--1">
                                {}
                            </i>
                            <h1 className="features__heading">
                                Travel in the wilderness
                            </h1>
                            <p className="features__text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dicta maiores ducimus
                                consequatur delectus alias voluptatibus. Lorem
                                ipsum dolor sit amet consectetur adipisicing
                                elit.
                            </p>
                        </div>
                        <div className="features">
                            <i className="features__icon features__icon--2">
                                {}
                            </i>
                            <h1 className="features__heading">
                                Discover the world
                            </h1>
                            <p className="features__text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dicta maiores ducimus
                                consequatur delectus alias voluptatibus. Lorem
                                ipsum dolor sit amet consectetur adipisicing
                                elit.
                            </p>
                        </div>
                        <div className="features">
                            <i className="features__icon features__icon--3">
                                {}
                            </i>
                            <h1 className="features__heading">
                                Travel to new places
                            </h1>
                            <p className="features__text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dicta maiores ducimus
                                consequatur delectus alias voluptatibus. Lorem
                                ipsum dolor sit amet consectetur adipisicing
                                elit.
                            </p>
                        </div>
                        <div className="features">
                            <i className="features__icon features__icon--4">
                                {}
                            </i>
                            <h1 className="features__heading">
                                Reconnect with nature
                            </h1>
                            <p className="features__text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dicta maiores ducimus
                                consequatur delectus alias voluptatibus. Lorem
                                ipsum dolor sit amet consectetur adipisicing
                                elit.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section-excursions">
                    <h2 className="heading-tours heading-primary">
                        Our most popular excursions
                    </h2>
                    <PopCards />
                    <Link
                        to="/excursions"
                        className="excursion-btn btn btn--explo btn--blue btn--animated"
                    >
                        Discover our excursions
                    </Link>
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
