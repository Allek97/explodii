/* eslint-disable import/no-dynamic-require */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import "./_accountBooking.scss";
import { Disclaimer } from "../components/Disclaimer";
import { BookBtn } from "../style/AccountStyledComponents";
import ReviewWrite from "../components/ReviewWrite";

import transitionImg from "../../../assets/img/home/transition.png";

const Deco = styled.div`
    &::before {
        // After content to add space when overflow
        content: "";

        grid-area: ${(props) =>
            `${props.bookingsRow} / ${1} / ${props.bookingsRow} / ${3}`};

        display: block;

        position: absolute;
        bottom: -5rem;
        left: -10rem;

        height: 20rem;
        width: calc(100% + 150px);

        background-image: linear-gradient(
            to right bottom,
            RGBA(var(--color-primary-light), 0.9),
            RGBA(var(--color-primary-dark), 0.9)
        );

        mask-image: url(${transitionImg});
        mask-size: cover;
        mask-position: 50% 50%;
        mask-repeat: no-repeat;
    }
`;

const UtilBtn = styled.a`
    &,
    &:link,
    &:visited {
        /* position: absolute;
        top: 0;
        right: 0; */

        display: flex;
        align-items: center;

        transition: all 0.3s;
        /* box-shadow: 1px 1px 3.2rem black; */

        background-color: ${(props) =>
            props.isSelected
                ? "rgba(var(--color-blue-special),1)"
                : "transparent"};

        padding: 8px 1.3rem;
        width: max-content;
        height: max-content;

        border-radius: 3px;

        overflow: hidden;

        text-decoration: none;
        font-size: 1.5rem;
        font-weight: 600;
        /* color: rgba(25,103,210,1.0); */
        color: ${(props) =>
            props.isSelected ? "#fff" : "rgba(25,103,210,1.0)"};
        cursor: pointer;
    }

    &:hover {
        background-color: ${(props) =>
            props.isSelected ? "none" : "rgba(25,103,210,0.2)"} !important;
    }
`;

export default function AccountReview() {
    //Props
    // Hooks
    const [bookings, setBookings] = useState([]);
    const [suggestedBookings, setSuggestedBookings] = useState([]);
    // suggested or not
    const [isBookings, setIsBookings] = useState(true);

    const bookingsData = () => {
        if (isBookings) {
            return bookings;
        }
        return suggestedBookings;
    };

    useEffect(() => {
        async function fetchApi() {
            try {
                // Axios envoit tous les informations concernant la request/responce
                const userBookingsRes = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/bookings/my-bookings`,
                    {
                        withCredentials: true,
                        credentials: "include",
                    }
                );
                console.log(userBookingsRes);
                if (userBookingsRes.data.status === "success")
                    setBookings(userBookingsRes.data.tours);
            } catch (err) {
                if (
                    err.response.data.message ===
                    "No document found with that ID"
                ) {
                    setIsBookings(false);
                } else {
                    console.log(err.response.data.message);
                }
            }
        }
        fetchApi();
    }, []);

    useEffect(() => {
        async function fetchApi() {
            try {
                // Axios envoit tous les informations concernant la request/responce
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/tours/top-5-cheap`,
                    {
                        withCredentials: true,
                        credentials: "include",
                    }
                );
                if (res.data.status === "success") {
                    setSuggestedBookings(res.data.data);
                }
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
        fetchApi();
    }, []);

    // Set background image from our api directely
    const setBackgroundUrlStyle = (tourBg) => {
        // eslint-disable-next-line import/no-dynamic-require
        // eslint-disable-next-line global-require
        const img = require(`../../../assets/img/tours/${tourBg}`);
        return {
            backgroundImage: `linear-gradient(
                to right bottom,
                rgba(var(--color-primary-dark),0.8),
                rgba(var(--color-primary-dark),0.8) 
            ),url(${img.default})`,
        };
    };

    const setReviewStarsBg = (reviewVal) => {
        if (reviewVal) {
            let decimal = reviewVal - Math.floor(reviewVal);
            decimal *= 100;
            return {
                backgroundImage: `linear-gradient(
                to right,
                rgba(85,96,159,1) ${decimal}%,
                rgba(0,0,0,0.25) ${decimal}%
            )`,
            };
        }
        return {
            backgroundImage: `linear-gradient(
            to right bottom,
            rgba(var(--color-primary-light),0.8),
            rgba(var(--color-primary-dark),0.8)
        )`,
        };
    };

    const shadowBox = { boxShadow: "0 2.5rem 4rem rgba(0, 0, 0, 0.5)" };

    // NOTE: for the cards to a top 3, the most popular in front with intense box shadow

    return (
        <>
            <ReviewWrite />
            <div className="bookings" style={{ filter: "blur(2rem)" }}>
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        top: "2rem",
                    }}
                >
                    <UtilBtn
                        isSelected={isBookings}
                        style={{ marginRight: "3rem" }}
                        onClick={() => {
                            setIsBookings(true);
                        }}
                    >
                        My Bookings
                    </UtilBtn>
                    <UtilBtn
                        isSelected={!isBookings}
                        onClick={() => {
                            setIsBookings(false);
                        }}
                    >
                        Recommendations
                    </UtilBtn>
                </div>
                <Disclaimer
                    isBookings={isBookings}
                    isBookingsEmpty={bookings.length === 0}
                />
                {bookingsData().map((excursion, idx) => {
                    return (
                        <div
                            key={excursion._id}
                            id={excursion._id}
                            className="bookings__container"
                            style={{ zIndex: "2" }}
                        >
                            <div
                                style={idx === 1 ? shadowBox : null}
                                className="bookings__side bookings__side--front"
                            >
                                <div
                                    className="bookings__picture"
                                    style={setBackgroundUrlStyle(
                                        excursion.imageCover
                                    )}
                                >
                                    &nbsp;
                                </div>
                                <h4 className="bookings__heading">
                                    <span className="bookings__heading-span bookings__heading-span">
                                        {excursion.name}
                                    </span>
                                </h4>
                                <div className="bookings__details">
                                    <ul className="bookings__list">
                                        <li>{`${excursion.duration} day excursion`}</li>
                                        <li>{`Up to ${excursion.maxGroupSize} people`}</li>
                                        <li>{`${excursion.guides.length} tour guides`}</li>
                                        <li>{`Starting location: ${excursion.startLocation.description}`}</li>
                                        {/* <li>{`Ratings: ${excursion.ratingsAverage}/5`}</li> */}
                                        {/* <li>{`Ratings:`}</li> */}
                                        <ul className="starbox">
                                            <p className="starbox__review">
                                                Ratings:{" "}
                                            </p>
                                            {/* {FIXME: Not working proprely} */}
                                            {[1, 2, 3, 4, 5].map((el) => {
                                                return (
                                                    <span
                                                        key={el}
                                                        id={el}
                                                        className="starbox__star"
                                                        style={
                                                            excursion.ratingsAverage >
                                                            el
                                                                ? setReviewStarsBg()
                                                                : setReviewStarsBg(
                                                                      excursion.ratingsAverage
                                                                  )
                                                        }
                                                    >
                                                        {}
                                                    </span>
                                                );
                                            })}
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                            <div className="bookings__side bookings__side--back bookings__side--back">
                                <div className="bookings__cta">
                                    {isBookings ? (
                                        <>
                                            <div className="bookings__price-box">
                                                <p className="bookings__price-only">
                                                    Thank you for the purchase !
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: "2rem",
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    Use the button below to
                                                    write a review
                                                </p>
                                            </div>
                                            <BookBtn>
                                                Rate the excursion!
                                            </BookBtn>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bookings__price-box">
                                                <p className="bookings__price-only">
                                                    Only
                                                </p>
                                                <p className="bookings__price-value">{`$${excursion.price}`}</p>
                                            </div>
                                            <BookBtn
                                                href={`/excursions/${excursion.slug}`}
                                            >
                                                Book now!
                                            </BookBtn>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <Deco bookingsRow={Math.ceil(bookings.length / 2) + 2} />
            </div>
        </>
    );
}
