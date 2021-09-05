/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { WithSvg } from "../tourBox/TourBoxStyles";

import { setStarRatingStyle } from "../../../componants/utils/StarFunctionStyle";
import "./_responsiveTourBox.scss";

const shadowBoxStrong = { boxShadow: "0 2rem 8rem rgba(0, 0, 0, 1)" };
const shadowBoxLight = { boxShadow: "0 2rem 4rem rgba(0, 0, 0, 0.5)" };

const setBackgroundUrlStyle = (tourBg) => {
    // eslint-disable-next-line import/no-dynamic-require
    // eslint-disable-next-line global-require
    const compressedTourBg = `${tourBg.split(".")[0]}-900x600.jpg`;
    // eslint-disable-next-line global-require
    const img = require(`../../../assets/img/tours/${compressedTourBg}`);
    return {
        backgroundImage: `linear-gradient(
            to right bottom,
            rgba(var(--color-main-1),0.85),
            rgba(var(--color-main-2),0.85) 
        ),url(${img.default})`,
    };
};

const ResponsiveTourBox = ({ excursion }) => {
    const {
        name,
        imageCover,
        duration,
        maxGroupSize,
        ratingsAverage,
        startLocation,
        guides,
        price,
        slug,
    } = excursion;

    //vars

    return (
        <div className="resp-tourBox">
            <div
                className="resp-tourBox__side resp-tourBox__side--front"
                style={shadowBoxStrong}
            >
                <div
                    className="resp-tourBox__picture"
                    style={setBackgroundUrlStyle(imageCover)}
                >
                    &nbsp;
                </div>
                <h4 className="resp-tourBox__heading">
                    <span className="resp-tourBox__heading-span resp-tourBox__heading-span">
                        {name}
                    </span>
                </h4>
                <div className="resp-tourBox__details">
                    <ul className="resp-tourBox__list">
                        <li>{`${duration} day excursion`}</li>
                        <li>{`Up to ${maxGroupSize} people`}</li>
                        <li>{`${guides.length} tour guides`}</li>
                        <li style={{ whiteSpace: "pre-line" }}>
                            {`Starting location : \n`}
                            {startLocation.description}
                        </li>
                        {/* <li>{`Ratings: ${excursion.ratingsAverage}/5`}</li> */}
                        {/* <li>{`Ratings:`}</li> */}
                        <ul className="starbox">
                            <p className="starbox__review">Ratings: </p>
                            {/* {FIXME: Not working proprely} */}
                            {[1, 2, 3, 4, 5].map((el) => {
                                return (
                                    <span
                                        key={el}
                                        id={el}
                                        className="starbox__star"
                                        style={setStarRatingStyle(
                                            ratingsAverage,
                                            el
                                        )}
                                    />
                                );
                            })}{" "}
                        </ul>
                    </ul>
                </div>
            </div>
            <div
                className="resp-tourBox__side resp-tourBox__side--back resp-tourBox__side--back "
                style={shadowBoxStrong}
            >
                <div className="resp-tourBox__cta">
                    <div className="resp-tourBox__price-box">
                        <p className="resp-tourBox__price-only">At</p>
                        <p className="resp-tourBox__price-value">{`$${price.toFixed(
                            2
                        )}CAD`}</p>
                    </div>
                    <Link
                        to={`/excursions/${slug}`}
                        className="resp-tourBox__btn"
                    >
                        Datails
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveTourBox;

ResponsiveTourBox.propTypes = {
    excursion: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageCover: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        maxGroupSize: PropTypes.number.isRequired,
        ratingsAverage: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        startLocation: PropTypes.shape({
            description: PropTypes.string.isRequired,
        }),
        guides: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
};
