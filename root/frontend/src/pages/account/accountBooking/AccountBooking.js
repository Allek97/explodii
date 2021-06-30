/* eslint-disable import/no-dynamic-require */
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./_accountBooking.scss";
import { BookBtn, Disclaimer } from "../AccountStyledComponents";

export default function AccountReview() {
    //Props

    // Hooks
    const [bookings, setBookings] = useState([]);
    // suggested or not
    const [suggested, setSuggested] = useState(false);
    // Background image colors

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
                setBookings(userBookingsRes.data.data);
            } catch (err) {
                if (
                    err.response.data.message ===
                    "No document found with that ID"
                ) {
                    const res = await axios.get(
                        `${process.env.REACT_APP_URL}/api/v1/tours/top-5-cheap`,
                        {
                            withCredentials: true,
                            credentials: "include",
                        }
                    );
                    setBookings(res.data.data);
                    setSuggested(true);
                } else {
                    console.log(err.response.data.message);
                }
            }
        }
        fetchApi();
    }, []);

    // useEffect(() => {
    //     async function fetchApi() {
    //         try {
    //             // Empty booking means user didnt book yet
    //             if (bookings.length === 0) {
    //                 const res = await axios.get(
    //                     `${process.env.REACT_APP_URL}/api/v1/tours/top-5-cheap`,
    //                     {
    //                         withCredentials: true,
    //                     }
    //                 );
    //                 setBookings(res.data.data);
    //                 setSuggested(true);
    //             }
    //         } catch (err) {
    //             console.log(err.response.data.message);
    //         }
    //     }

    //     fetchApi();
    // }, []);

    // console.log(bookings);

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
        <div className="bookings">
            {suggested && <Disclaimer />}
            {bookings.map((excursion, idx) => {
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
                                <div className="bookings__price-box">
                                    <p className="bookings__price-only">Only</p>
                                    <p className="bookings__price-value">{`$${excursion.price}`}</p>
                                </div>
                                <BookBtn href={`/excursions/${excursion.slug}`}>
                                    Book now!
                                </BookBtn>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
