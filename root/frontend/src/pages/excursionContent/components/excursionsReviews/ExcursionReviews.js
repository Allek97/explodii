/* eslint-disable global-require */
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import { ReviewBox } from "../../../../componants/reviewBox/ReviewBox";

import {
    ExcursionReviewContainer,
    RotativeBox,
    Tracker,
    UserNameStyled,
} from "./ExcursionReviewsStyle";

export default function ExcursionReview(props) {
    //Props
    const { excursionId, excursionName } = props;

    //Hooks
    const [reviews, setReviews] = useState([]);
    const [revIdx, setRevIdx] = useState(0);
    const isPhone = useMediaQuery({ query: "(max-width: 37.5em)" });
    const isTabPort = useMediaQuery({ query: "(max-width: 56.25em)" });

    // variables
    const reviewBgImg = require("../../../../assets/img/home/bg.png").default;

    useEffect(() => {
        async function fetchApi() {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/tours/${excursionId}/reviews`,
                    { withCredentials: true, credentials: "include" }
                );
                setReviews(res.data.data);
            } catch (err) {
                console.log(err.response.data);
                setReviews([]);
            }
        }
        fetchApi();
    }, []);

    const switchReviewIdx = () => {
        const maxIdx =
            (reviews.length / 2) % 1 === 0
                ? reviews.length / 2 - 1
                : Math.floor(reviews.length / 2);
        // console.log(revIdx, maxIdx);
        if (revIdx === maxIdx) {
            return setRevIdx(0);
        }
        setRevIdx(revIdx + 1);
    };

    const switchReviewIdxPhone = () => {
        if (revIdx === reviews.length - 1) {
            return setRevIdx(0);
        }
        return setRevIdx(revIdx + 1);
    };

    useEffect(() => {
        const timeout = setInterval(() => {
            if (isPhone) return switchReviewIdxPhone();
            switchReviewIdx();
        }, 20000);
        return () => {
            clearInterval(timeout);
        };
    });

    const reviewSlide = () => {
        if (isPhone) {
            return {
                transform: `translateX(calc(
                ${-revIdx} *
                    (
                        var(--excursion-review-box-width-3) +
                            var(--excursion-review-box-margin-3)
                    )
            ))`,
            };
        }
        if (isTabPort) {
            return {
                transform: `translateX(calc(
                ${-2 * revIdx} *
                    (
                        var(--excursion-review-box-width-2) +
                            var(--excursion-review-box-margin)
                    )
            ))`,
            };
        }
        return {
            transform: `translateX(calc(
            ${-2 * revIdx} *
                (
                    var(--excursion-review-box-width-1) +
                        var(--excursion-review-box-margin)
                )
        ))`,
        };
    };

    return (
        <ExcursionReviewContainer bgImg={reviewBgImg}>
            <UserNameStyled>{excursionName}</UserNameStyled>
            <h1 style={{ marginBottom: "2rem", fontSize: "3rem" }}>
                Your words matter to us
            </h1>
            <RotativeBox>
                <div style={reviewSlide()}>
                    {reviews.map((el) => {
                        return (
                            <ReviewBox
                                key={el._id}
                                userReview={el}
                                isExcursion
                            />
                        );
                    })}
                </div>
            </RotativeBox>
            <div style={{ display: "flex" }}>
                {!isPhone &&
                    reviews.map((el, idx) => {
                        if (!(idx % 2)) {
                            const index = idx / 2;
                            return (
                                <Tracker
                                    key={el._id}
                                    id={el._id}
                                    isSelected={revIdx === index}
                                    onClick={() => {
                                        setRevIdx(index);
                                    }}
                                />
                            );
                        }
                        return null;
                    })}

                {isPhone &&
                    reviews.map((el, idx) => {
                        return (
                            <Tracker
                                key={el._id}
                                id={el._id}
                                isSelected={revIdx === idx}
                                onClick={() => {
                                    setRevIdx(idx);
                                }}
                            />
                        );
                    })}
            </div>
        </ExcursionReviewContainer>
    );
}

ExcursionReview.propTypes = {
    excursionId: PropTypes.string.isRequired,
    excursionName: PropTypes.string.isRequired,
};
