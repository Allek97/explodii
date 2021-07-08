/* eslint-disable global-require */
import React from "react";
import PropTypes from "prop-types";

import { StyledReview, StyledStar } from "../style/AccountStyledComponents";

import { setStarRatingStyle } from "../../../componants/utils/StarFunctionStyle";

export const ReviewBox = (props) => {
    // Props
    const { userReview, isExcursion } = props;
    const { review, rating, user, tour } = userReview;
    const { photo: userPhoto, name: userName } = user;
    const { name: ExcursionName } = tour;

    //variables
    const userImage = `${process.env.REACT_APP_URL}/api/v1/users/images/${userPhoto}`;
    const worldImage = require("../../../assets/img/users/world.jpg").default;
    const quoteSvg = require("../../../assets/svgs/quotes.svg").default;
    const starSvg = require("../../../assets/svgs/star-review.svg").default;

    return (
        <StyledReview img={worldImage} svg={quoteSvg}>
            <img src={userImage} alt="user" />
            <p>{review}</p>
            <p>{isExcursion ? userName : ExcursionName}</p>
            <span />
            <ul>
                {[1, 2, 3, 4, 5].map((el) => {
                    return (
                        <StyledStar
                            style={setStarRatingStyle(rating, el)}
                            key={el}
                            id={el}
                            svg={starSvg}
                            // rating={el <= 4.5 ? null : 4.5}
                        />
                    );
                })}
            </ul>
        </StyledReview>
    );
};

ReviewBox.propTypes = {
    isExcursion: PropTypes.bool.isRequired,
    userReview: PropTypes.shape({
        review: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user: PropTypes.shape({
            photo: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
        tour: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
