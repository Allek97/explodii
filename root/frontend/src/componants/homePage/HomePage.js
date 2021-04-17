import React from "react";
// import { v4 as uuidv4 } from "uuid";

// Componants
import PopCards from "../cards/Card";
import Reviews from "../reviews/Reviews";
import Reservation from "../reservation/Reservation";

// IMAGES
import BirdLogo from "../../assets/img/home/bird-logo.png";
import Nat1 from "../../assets/img/tours/tour-1-1.jpg";
import Nat2 from "../../assets/img/tours/tour-3-2.jpg";
import Nat3 from "../../assets/img/tours/tour-9-3.jpg";
// import Banner from "../../assets/img/home/banner.png";
// SVGS
// import Sprite from "../../assets/svgs/symbol-defs.svg";
// SCSS
import "./_homepage.scss";
import "../reusable/_button.scss";
import "../../base/_typography.scss";

export default function HomePage() {
    return (
        <>
            <header className="header">
                <div className="header__logo-box">
                    <img src={BirdLogo} alt="logo" className="header__logo" />
                    {/* <img
                    src={Banner}
                    alt="banner for logo"
                    className="header__banner"
                /> */}
                    {/* <div className="header__logo-text">Adventure</div> */}
                </div>
                <div className="header__headings">
                    <h1 className="header__heading-primary">Explotour</h1>
                    <h2 className="header__heading-secondary">
                        Your nature travel
                    </h2>
                    {/* <div className="header__arrow">{}</div> */}
                    <a
                        href="/"
                        className="header__btn btn btn--explo btn--gold btn--animated"
                    >
                        See our excursions
                    </a>
                </div>
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
                            necessitatibus voluptates neque0
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
                        href="/"
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
        </>
    );
}
