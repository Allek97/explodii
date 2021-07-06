/* eslint-disable global-require */
import React, { useState } from "react";
import PropTypes from "prop-types";

import HoverRating from "./HoverRating";

import {
    ConfirmationBtn,
    ExcursionBg,
    ReviewBox,
    TextArea,
    UserNameStyled,
} from "../style/AccountBookingStyle";

export default function ReviewWrite(props) {
    const { userId, userName, userEmail, userPhoto } = props;

    const [reviewSize, setReviewSize] = useState(0);

    const excursionBg = require("../../../assets/img/tours/tour-1-1.jpg")
        .default;

    return (
        <ReviewBox>
            {/* <ExcursionBg excursionBg={excursionBg} /> */}
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
                    Share your opinion with us
                </h1>
                <UserNameStyled>{userName}</UserNameStyled>
                <UserNameStyled style={{ marginBottom: "3rem" }}>
                    The Sea Explorer Excursion
                </UserNameStyled>
                <span
                    style={{
                        alignSelf: "flex-start",
                        marginBottom: "1rem",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#fff",
                    }}
                >
                    Overall rating*
                </span>
                <HoverRating />

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
                        <span style={{ marginRight: "1rem" }}>
                            Write a review*
                        </span>
                        <span>({`${reviewSize} / 200`})</span>
                    </span>
                    <TextArea
                        name="review"
                        id="review-text"
                        placeholder="Tell us about your experience!"
                        maxLength={200}
                        onChange={(e) => {
                            setReviewSize(e.target.value.length);
                        }}
                    />
                </div>
                <ConfirmationBtn>Submit</ConfirmationBtn>
            </div>
        </ReviewBox>
    );
}

ReviewWrite.propTypes = {
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};
