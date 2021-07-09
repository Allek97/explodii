/* eslint-disable global-require */
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import HoverRating from "./HoverRating";

import {
    ConfirmationBtn,
    ReviewBox,
    TextArea,
    UserNameStyled,
    CloseReview,
    ErrorBox,
} from "../style/ReviewWriteUpdateStyle";

export default function ReviewUpdate(props) {
    // props
    const {
        setIsUpdateReviewOpen,
        setIsUpdateReviewSuccess,
        userReviewObject,
    } = props;
    const {
        review: initialReview,
        rating: initialRating,
        user,
        tour,
        id: reviewId,
    } = userReviewObject;
    const { name: userName } = user;
    const { name: excursionName } = tour;
    // hooks
    const [review, setReview] = useState(initialReview);
    const [rating, setRating] = useState(initialRating);
    const [reviewSize, setReviewSize] = useState(0);
    const [reviewError, setReviewError] = useState(null);
    const [ratingError, setRatingError] = useState(null);

    //

    const closeBtnSvg = require("../../../assets/svgs/x.svg").default;

    async function handleUpdateSubmission() {
        setRatingError("");
        setReviewError("");
        try {
            const body = {
                review: review,
                rating: rating,
            };
            // NOTE: Mongo for some reasons allow null as number value
            if (rating) {
                const res = await axios.patch(
                    `${process.env.REACT_APP_URL}/api/v1/reviews/${reviewId}`,
                    body,
                    {
                        withCredentials: true,
                        credentials: "include",
                    }
                );

                // setIsUpdateReviewOpen(false);
                if (res.data.status === "success") {
                    window.setTimeout(() => {
                        setIsUpdateReviewOpen(false);
                        setIsUpdateReviewSuccess(true);
                    }, 50);
                    window.setTimeout(() => {
                        setIsUpdateReviewSuccess(false);
                    }, 2000);
                }
            } else {
                setRatingError("Review must have a rating!");
            }
        } catch (err) {
            const { message } = err.response.data;

            if (message.includes("Review cannot be empty!")) {
                setReviewError("Your review cannot be empty !");
            } else if (message.includes("Review must have a rating")) {
                setRatingError("Review must have a rating !");
            } else if (message.includes("duplicate key error")) {
                setReviewError(
                    "You already wrote a review for this excursion !"
                );
            } else {
                setReviewError("An error occured. Please try again !");
            }
        }
    }

    return (
        <>
            <ReviewBox style={{ position: "fixed !important" }}>
                {/* <ExcursionBg excursionBg={excursionBg} /> */}
                <CloseReview
                    svg={closeBtnSvg}
                    onClick={() => {
                        setIsUpdateReviewOpen(false);
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        padding: "4rem 6rem",
                    }}
                >
                    <h1
                        style={{
                            paddingBottom: "1.5rem",
                            fontSize: "2.2rem",
                            fontWeight: "400",
                            textAlign: "center",
                            textTransform: "uppercase",
                        }}
                    >
                        Update Your Review{" "}
                        {/* {`TODO: SUCCESS MESSAGE AFTER SUCCESSFUL TRANSACTION && SUCCESSFUL REVIEW SUBMISSION`} */}
                    </h1>
                    <UserNameStyled style={{ textTransform: "capitalize" }}>
                        {userName}
                    </UserNameStyled>
                    <UserNameStyled
                        style={{
                            marginBottom: "3rem",
                            textTransform: "capitalize",
                        }}
                    >
                        {excursionName} excursion
                    </UserNameStyled>
                    <div
                        style={{
                            position: "relative",
                            alignSelf: "flex-start",
                            marginBottom: "1rem",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "#fff",
                            display: "flex",
                            width: "100%",
                            height: "2rem",
                        }}
                    >
                        <span style={{ marginRight: "auto" }}>
                            update overall rating*
                        </span>
                        {ratingError && <ErrorBox>{ratingError}</ErrorBox>}
                    </div>
                    <HoverRating rating={rating} setRating={setRating} />

                    <div
                        style={{
                            marginTop: "2rem",
                            width: "100%",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                color: "#fff",
                            }}
                        >
                            <div style={{ display: "flex", height: "2rem" }}>
                                <span style={{ marginRight: "1rem" }}>
                                    update your review*
                                </span>
                                <span style={{ marginRight: "auto" }}>
                                    ({`${reviewSize} / 200`})
                                </span>
                                {reviewError && (
                                    <ErrorBox>{reviewError}</ErrorBox>
                                )}
                            </div>
                        </span>
                        <TextArea
                            name="review"
                            id="review-text"
                            placeholder="Tell us about your experience!"
                            maxLength={200}
                            value={review}
                            onChange={(e) => {
                                setReviewSize(e.target.value.length);
                                setReview(e.target.value);
                            }}
                        />
                    </div>

                    <ConfirmationBtn
                        onClick={() => {
                            handleUpdateSubmission();
                        }}
                    >
                        Update
                    </ConfirmationBtn>
                </div>
            </ReviewBox>
        </>
    );
}

ReviewUpdate.propTypes = {
    setIsUpdateReviewOpen: PropTypes.func.isRequired,
    setIsUpdateReviewSuccess: PropTypes.func.isRequired,
    userReviewObject: PropTypes.shape({
        review: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
            photo: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
        tour: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
