/* eslint-disable global-require */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { setStarRatingStyle } from "../utils/StarFunctionStyle";

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
                        style={setStarRatingStyle(nbStar, el)}
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
