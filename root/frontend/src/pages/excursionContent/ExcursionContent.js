/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import "./_excursionContent.scss";

// Componentes
import Loading from "../../componants/loading/PageLoading";
import ExcursionMap from "./components/excursionMap/ExcursionMap";
import ExcursionReview from "./components/excursionsReviews/ExcursionReviews";
import ExcursionBooking from "./components/excursionBooking/ExcursionBooking";
import NavBar from "./components/otherComponents/ExcursionContentNavBar";
import Footer from "../../componants/footer/Footer";

import Decoration from "./components/otherComponents/InfoSectionDeco";
import BookingDeco from "./components/otherComponents/BookingDeco";

import {
    HeaderPage,
    Heading,
    InfoHeading,
    WithLogo,
} from "./ExcursionContentStyles";

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

export default function ExcursionContent(props) {
    // props
    const { authStatus, userName, userPhoto, setPaymentStatus } = props;
    // URL slug param
    const { slug } = useParams();
    // hooks
    const [isApiConsumed, setApiConsumed] = useState(false);
    const [excursion, setExcursion] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);
    const isPhone = useMediaQuery({ query: "(max-width: 37.5em)" });
    // function
    const guidePhoto = (photo = "default.jpg") => {
        return `${process.env.REACT_APP_URL}/api/v1/users/images/${photo}`;
    };
    const excursionPhoto = (photo = "tour-1-1.jpg") => {
        const compressedPhoto = `${photo.split(".")[0]}-900x600.jpg`;
        return require(`../../assets/img/tours/${compressedPhoto}`).default;
    };
    const imageCover = () => {
        return require(`../../assets/img/tours/${excursion.imageCover}`)
            .default;
    };
    //svgs
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

    // BUG: Fixing lag issue when scolling with navbar
    function debounce(method, delay) {
        clearTimeout(method._tId);
        method._tId = setTimeout(function () {
            method();
        }, delay);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => debounce(listenScrollEvent, 5));
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
                        <NavBar
                            authStatus={authStatus}
                            userName={userName}
                            userPhoto={userPhoto}
                            isScrolled={isScrolled}
                        />

                        <HeaderPage imageCover={imageCover}>
                            <Heading style={{ marginTop: "-5%" }}>
                                <span>{excursion.name}</span>
                                {/* <span>Excursion</span> */}
                            </Heading>
                            <Heading style={{ marginTop: "0" }}>
                                <span>Excursion</span>
                            </Heading>
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: "3rem",
                                }}
                            >
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
                                <article>
                                    <div className="excursion-information__information">
                                        <div>
                                            <InfoHeading
                                                style={{
                                                    marginBottom: "3.5rem",
                                                }}
                                            >
                                                Excursion Information
                                            </InfoHeading>
                                            <WithLogo
                                                svg={calenderSvg}
                                                leftGradiant="rgb(var(--color-blue-special))"
                                                rightGradiant="rgb(var(--color-blue-special))"
                                                style={{
                                                    marginBottom: "2.25rem",
                                                }}
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
                                                style={{
                                                    marginBottom: "2.25rem",
                                                }}
                                            >
                                                <span style={fieldsStyle}>
                                                    DIFFICULTY
                                                </span>
                                                <span
                                                    style={{
                                                        ...infoFieldsStyle,
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {excursion.difficulty}
                                                </span>
                                            </WithLogo>
                                            <WithLogo
                                                svg={participantSvg}
                                                leftGradiant="rgb(var(--color-blue-special))"
                                                rightGradiant="rgb(var(--color-blue-special))"
                                                style={{
                                                    marginBottom: "2.25rem",
                                                }}
                                            >
                                                <span style={fieldsStyle}>
                                                    PARTICIPANTS
                                                </span>
                                                <span
                                                    style={{
                                                        ...infoFieldsStyle,
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {excursion.maxGroupSize}{" "}
                                                    People
                                                </span>
                                            </WithLogo>
                                            <WithLogo
                                                svg={reviewSvg}
                                                leftGradiant="rgb(var(--color-blue-special))"
                                                rightGradiant="rgb(var(--color-blue-special))"
                                                style={{
                                                    marginBottom: "7rem",
                                                }}
                                            >
                                                <span style={fieldsStyle}>
                                                    RATING
                                                </span>
                                                <span style={infoFieldsStyle}>
                                                    {excursion.ratingsAverage} /
                                                    5
                                                </span>
                                            </WithLogo>
                                        </div>

                                        <div>
                                            <InfoHeading
                                                style={{
                                                    marginBottom: "3.5rem",
                                                }}
                                            >
                                                YOUR EXCURSION GUIDES
                                            </InfoHeading>
                                            {excursion.guides
                                                .filter(
                                                    (guide) =>
                                                        guide.role ===
                                                        "lead-guide"
                                                )
                                                .map((guide) => (
                                                    <div
                                                        key={guide.name}
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            marginBottom:
                                                                "2.25rem",
                                                        }}
                                                    >
                                                        <img
                                                            src={guidePhoto(
                                                                guide.photo
                                                            )}
                                                            alt="lead guide"
                                                            style={photoStyle}
                                                        />
                                                        <span
                                                            style={fieldsStyle}
                                                        >
                                                            Lead Guide
                                                        </span>
                                                        <span
                                                            style={
                                                                infoFieldsStyle
                                                            }
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
                                                            alignItems:
                                                                "center",
                                                            marginBottom:
                                                                "3.5rem",
                                                        }}
                                                    >
                                                        <img
                                                            src={guidePhoto(
                                                                guide.photo
                                                            )}
                                                            alt="Excursion guide"
                                                            style={photoStyle}
                                                        />
                                                        <span
                                                            style={fieldsStyle}
                                                        >
                                                            Excursion GUIDE
                                                        </span>
                                                        <span
                                                            style={
                                                                infoFieldsStyle
                                                            }
                                                        >
                                                            {guide.name}
                                                        </span>{" "}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <div className="excursion-information__about">
                                        {/* <AboutSvgBox svg={voyageSvg} /> */}
                                        <InfoHeading
                                            style={{
                                                marginBottom: "3.5rem",
                                                textTransform: "uppercase",
                                                maxWidth: "max-content",
                                            }}
                                        >
                                            ABOUT {excursion.name} EXCURSION
                                        </InfoHeading>
                                        <p style={{ marginBottom: "2.5rem" }}>
                                            {excursion.description.substring(
                                                0,
                                                excursion.description.length / 2
                                            )}
                                            ...
                                        </p>
                                        <p>
                                            {excursion.description.substring(
                                                excursion.description.length / 2
                                            )}
                                            ...
                                        </p>
                                    </div>
                                </article>
                                <Decoration />
                            </section>

                            <section className="excursion-pictures">
                                {excursion.images.map((imageName, idx) => {
                                    if (isPhone && idx === 2) {
                                        return null;
                                    }
                                    return (
                                        <img
                                            src={excursionPhoto(imageName)}
                                            alt="Excursion guide"
                                            key={imageName}
                                        />
                                    );
                                })}
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
                                    excursionCover={excursion.imageCover}
                                    excursionName={excursion.name}
                                    excursionDate={getNextDate(
                                        excursion.startDates
                                    )}
                                    authStatus={authStatus}
                                    setPaymentStatus={setPaymentStatus}
                                />

                                <BookingDeco />
                            </section>
                        </main>
                        <Footer />
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
