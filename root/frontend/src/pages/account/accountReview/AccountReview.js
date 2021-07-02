import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ReviewBox } from "../AccountStyledComponents";

import "./_accountReview.scss";

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
    const { userId, userName } = props;

    //Hooks
    const [reviews, setReviews] = useState([]);
    const [revIdx, setRevIdx] = useState(0);

    useEffect(() => {
        async function fetchApi() {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/users/${userId}/reviews`,
                    { withCredentials: true, credentials: "include" }
                );

                setReviews(res.data.data);
                // console.log(res.data.data);
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

    // console.log(revIdx);

    return (
        <div className="accountReview">
            <UserNameStyled>{userName}</UserNameStyled>
            <h1 style={{ marginBottom: "2rem", fontSize: "3rem" }}>
                Your words matter to us
            </h1>
            <p style={{ fontSize: "2.1rem", fontWeight: "900" }}>
                You don't have any reviews yet !
            </p>
            <div className="accountReview__reviewBox">
                <div
                    className="accountReview__rotativeBox"
                    style={{
                        transform: `translateX(${-revIdx * 110 - 1}rem)`,
                    }}
                >
                    {reviews.map((el) => {
                        return (
                            <ReviewBox
                                key={el._id}
                                userReview={el}
                                isExcursion={false}
                            />
                        );
                    })}
                </div>
            </div>
            <div style={{ display: "flex" }}>
                {reviews.map((el, idx) => {
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
            </div>
        </div>
    );
}

AccountReview.propTypes = {
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
};
