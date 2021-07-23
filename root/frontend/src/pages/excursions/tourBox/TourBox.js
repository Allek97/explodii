/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import {
    DetailBtn,
    StyledStar,
    Tour,
    TourTitle,
    WithSvg,
} from "./TourBoxStyles";

import { setStarRatingStyle } from "../../../componants/utils/StarFunctionStyle";

const TourBox = (props) => {
    // props
    const { excursion, animationLoad } = props;
    const {
        name,
        imageCover,
        duration,
        description,
        ratingsAverage,
        ratingsQuantity,
        price,
        slug,
    } = excursion;

    // hooks

    // variables
    const compressedImageCover = `${imageCover.split(".")[0]}-900x600.jpg`;
    const tourImg =
        require(`../../../assets/img/tours/${compressedImageCover}`).default;

    const roundedPrice = price.toFixed(2);

    const isBroken1 = useMediaQuery({ query: "(max-width: 87.375em)" });
    const isBroken2 = useMediaQuery({ query: "(max-width: 81.25em)" });
    const isBroken3 = useMediaQuery({ query: "(max-width: 75em)" });

    // eslint-disable-next-line no-nested-ternary

    const textLength = () => {
        if (isBroken3) {
            return 250;
        }
        if (isBroken2) {
            return 120;
        }

        if (isBroken1) {
            return 150;
        }

        return 250;
    };

    // const textLength = isBroken1 ? (isBroken2 ? 120 : 150) : 250;

    const shortDescription = description.slice(0, textLength());

    const starSvg = require("../../../assets/svgs/star-review.svg").default;

    // effects

    // console.log(animationLoad);

    return (
        <Tour
            tourImg={tourImg}
            animationLoad={animationLoad}
            // style={animationLoad ? { transform: "translateX(0)" } : null}
        >
            <div>
                <div className="tourbox-image" />
            </div>
            <div>
                <div className="tourbox-information">
                    <div>
                        <TourTitle>{name} Excursion</TourTitle>
                    </div>
                    <ul className="tourbox-rating">
                        {[1, 2, 3, 4, 5].map((el) => {
                            return (
                                <StyledStar
                                    style={setStarRatingStyle(
                                        ratingsAverage,
                                        el
                                    )}
                                    key={el}
                                    id={el}
                                    svg={starSvg}
                                    // rating={el <= 4.5 ? null : 4.5}
                                />
                            );
                        })}
                        <span className="tourbox-rating__quantity">
                            {ratingsQuantity}
                        </span>
                    </ul>

                    <p>
                        {shortDescription}...
                        <a
                            href={`/excursions/${slug}`}
                            style={{
                                color: "rgb(var(--color-blue-special))",
                            }}
                        >
                            More
                        </a>
                    </p>
                </div>
                <div className="tourbox-complement">
                    <WithSvg
                        svg={require("../../../assets/svgs/clock.svg").default}
                    >
                        {duration} days
                    </WithSvg>
                    <WithSvg
                        svg={
                            require("../../../assets/svgs/check-logo-1.svg")
                                .default
                        }
                    >
                        Free Cancellation
                    </WithSvg>
                </div>
            </div>
            <div>
                <div className="tourbox-price">
                    <span>At</span>
                    <span>${roundedPrice}</span>
                    <span>CAD</span>
                </div>
                <DetailBtn href={`/excursions/${slug}`}>Details</DetailBtn>
            </div>
        </Tour>
    );
};

// Props validation

TourBox.propTypes = {
    excursion: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageCover: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        ratingsAverage: PropTypes.number.isRequired,
        ratingsQuantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
    }).isRequired,
    animationLoad: PropTypes.bool.isRequired,
};

export default TourBox;
