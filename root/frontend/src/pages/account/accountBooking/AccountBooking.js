/* eslint-disable import/no-dynamic-require */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

import "./_accountBooking.scss";
import { Disclaimer } from "../components/Disclaimer";
import { BookBtn } from "../style/AccountStyledComponents";
import ReviewWrite from "../components/ReviewWrite";

import { Deco, UtilBtn } from "../style/AccountBookingStyle";

export default function AccountBooking(props) {
    //Props
    const { userId, userName, userEmail, userPhoto } = props;
    // Hooks
    const [bookings, setBookings] = useState([]);
    const [suggestedBookings, setSuggestedBookings] = useState([]);
    const [tourIdReview, setTourIdReview] = useState("");

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
            <ReviewWrite
                userId={userId}
                userName={userName}
                userEmail={userEmail}
                userPhoto={userPhoto}
            />
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
                                            <BookBtn
                                                onClick={() => {
                                                    setTourIdReview(
                                                        excursion._id
                                                    );
                                                }}
                                            >
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

AccountBooking.propTypes = {
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};
