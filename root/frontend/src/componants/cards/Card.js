/* eslint-disable import/no-dynamic-require */
import React, { useState, useEffect } from "react";
import axios from "axios";
// import styled from "styled-components";

import "./_cards.scss";

import { setStarRatingStyle } from "../utils/StarFunctionStyle";

export default function PopCards() {
    // List of requested excursions
    const [excursions, setExcursions] = useState([]);
    // Background image colors
    const rootColor = getComputedStyle(document.body);
    const BgColor1 = rootColor.getPropertyValue("--color-primary-light");
    const BgColor2 = rootColor.getPropertyValue("--color-primary-dark");

    useEffect(() => {
        async function fetchApi() {
            try {
                // Axios envoit tous les informations concernant la request/responce
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/tours/top-3-popular`
                );
                // console.log(res.data.data);
                setExcursions(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchApi();
    }, []);

    // console.log(excursions);

    // Set background image from our api directely
    const setBackgroundUrlStyle = (tourBg) => {
        // eslint-disable-next-line import/no-dynamic-require
        // eslint-disable-next-line global-require
        const compressedTourBg = `${tourBg.split(".")[0]}-450x300`;
        // eslint-disable-next-line global-require
        const img = require(`../../assets/img/tours/${compressedTourBg}.jpg`);
        return {
            backgroundImage: `linear-gradient(
                to right bottom,
                rgba(${BgColor1},0.8),
                rgba(${BgColor2},0.8) 
            ),url(${img.default})`,
        };
    };

    const shadowBox = { boxShadow: "0 2.5rem 4rem rgba(0, 0, 0, 0.5)" };

    // NOTE: for the cards to a top 3, the most popular in front with intense box shadow

    return (
        <div className="cardbox">
            {excursions.map((excursion, idx) => {
                return (
                    <div
                        key={excursion._id}
                        id={excursion._id}
                        className="cardbox__container"
                    >
                        <div
                            style={idx === 1 ? shadowBox : null}
                            className="cardbox__side cardbox__side--front"
                        >
                            <div
                                className="cardbox__picture"
                                style={setBackgroundUrlStyle(
                                    excursion.imageCover
                                )}
                            >
                                &nbsp;
                            </div>
                            <h4 className="cardbox__heading">
                                <span className="cardbox__heading-span cardbox__heading-span">
                                    {excursion.name}
                                </span>
                            </h4>
                            <div className="cardbox__details">
                                <ul className="cardbox__list">
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
                                                    style={setStarRatingStyle(
                                                        excursion.ratingsAverage,
                                                        el
                                                    )}
                                                />
                                            );
                                        })}
                                    </ul>
                                </ul>
                            </div>
                        </div>
                        <div className="cardbox__side cardbox__side--back cardbox__side--back">
                            <div className="cardbox__cta">
                                <div className="cardbox__price-box">
                                    <p className="cardbox__price-only">Only</p>
                                    <p className="cardbox__price-value">{`$${excursion.price}`}</p>
                                </div>
                                <a
                                    href={`/excursions/${excursion.slug}`}
                                    className="cardbox__btn btn btn--explo btn--blue btn--animated"
                                >
                                    Book now!
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
