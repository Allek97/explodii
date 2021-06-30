/* eslint-disable global-require */
import React, { createRef } from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { ReviewBox } from "../../../account/AccountStyledComponents";

const ExcursionReviewContainer = styled.div`
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    /* margin-bottom: 2rem; //TODO: GET RIDE OF THE MARGIN
    margin-top: var(--excursion-clip-height); */

    padding: 15rem;
`;

const RotativeBox = styled.div`
    position: relative;
    z-index: 4;

    display: flex;
    justify-content: flex-start;

    transition: transform 5s;

    width: 89vw;

    padding: 5rem 5rem 0 5rem;

    overflow: hidden;
    transform: translateX(0);

    div {
        display: flex;
        width: max-content;
        padding: 4rem;

        transition: transform 3s ease;

        transform: translateX(-1rem);
    }
`;

export const UserNameStyled = styled.p`
    position: relative;

    color: rgb(var(--color-blue-special));
    font-size: 2rem;

    &::before,
    &::after {
        content: "";

        display: block;

        height: 7px;
        width: 7px;

        border-radius: 50%;
        background-color: rgb(var(--color-blue-special));
    }

    &::before {
        position: absolute;
        top: 1.2rem;
        left: -2rem;
    }
    &::after {
        position: absolute;
        top: 1.2rem;
        right: -2rem;
    }
`;

const Tracker = styled.span`
    display: block;

    height: 1rem;
    width: 1rem;
    margin-right: 1rem;
    border-radius: 50%;

    background-color: ${(props) =>
        props.isSelected
            ? "rgb(var(--color-blue-special))"
            : "rgb(var(--color-grey-dark))"};

    cursor: pointer;
`;

export default function AccountReview(props) {
    //Props
    const { excursionId, excursionName } = props;

    //Hooks
    const [reviews, setReviews] = useState([]);
    const [revIdx, setRevIdx] = useState(0);

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

    useEffect(() => {
        const timeout = setInterval(() => {
            switchReviewIdx();
        }, 10000);
        return () => {
            clearInterval(timeout);
        };
    });

    // console.log(excursionId);

    return (
        <ExcursionReviewContainer bgImg={reviewBgImg}>
            <UserNameStyled>{excursionName}</UserNameStyled>
            <h1 style={{ marginBottom: "2rem", fontSize: "3rem" }}>
                Your words matter to us
            </h1>
            <RotativeBox>
                <div
                    style={{
                        transform: `translateX(${-revIdx * 110 - 1}rem)`,
                    }}
                >
                    {reviews.map((el) => {
                        return (
                            <ReviewBox
                                key={uuidv4()}
                                userReview={el}
                                isExcursion
                            />
                        );
                    })}
                </div>
            </RotativeBox>
            <div style={{ display: "flex" }}>
                {reviews.map((el, idx) => {
                    if (!(idx % 2)) {
                        const index = idx / 2;
                        return (
                            <Tracker
                                key={uuidv4()}
                                id={uuidv4()}
                                isSelected={revIdx === index}
                                onClick={() => {
                                    setRevIdx(index);
                                }}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </ExcursionReviewContainer>
    );
}

AccountReview.propTypes = {
    excursionId: PropTypes.string.isRequired,
    excursionName: PropTypes.string.isRequired,
};
