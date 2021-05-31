/* eslint-disable global-require */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
        rgba(var(--color-primary-light),0.9),
        rgba(var(--color-primary-dark),0.9)
    )`,
    };
};

const StyledStar = styled.span`
    display: block;

    height: ${(props) => props.starSize}rem;
    width: ${(props) => props.starSize}rem;

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: 50% 50%;
`;

export default function Stars(props) {
    const { nbStar, starSize } = props;
    const starSvg = require("../../assets/svgs/star-review.svg").default;
    return (
        <div style={{ display: "flex" }}>
            {[1, 2, 3, 4, 5].map((el) => {
                return (
                    <StyledStar
                        style={
                            nbStar >= el
                                ? setReviewStarsBg()
                                : setReviewStarsBg(el)
                        }
                        key={el}
                        id={el}
                        svg={starSvg}
                        starSize={starSize}
                    />
                );
            })}
        </div>
    );
}

Stars.propTypes = {
    nbStar: PropTypes.number.isRequired,
    starSize: PropTypes.number,
};

Stars.defaultProps = {
    starSize: 2.2,
};
