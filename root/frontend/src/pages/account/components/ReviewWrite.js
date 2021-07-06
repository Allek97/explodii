/* eslint-disable global-require */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import HoverRating from "./HoverRating";

const ReviewBox = styled.div`
    position: relative;

    position: fixed;
    top: 54%;
    left: 56.5%;
    transform: translate(-50%, -50%);

    z-index: 3;

    display: flex;
    flex-direction: column;

    justify-content: center;

    overflow: hidden;

    border-radius: 3rem;

    transition: all 3s;

    width: 45rem;

    /* background-image: linear-gradient(76deg, #2a3887, #1a5ef3); */
    background-image: linear-gradient(
        76deg,
        RGBA(var(--color-main-2)),
        RGBA(var(--color-main-2))
    );

    color: white;
`;

const ExcursionBg = styled.div`
    height: 25rem;
    background-image: url(${(props) => props.excursionBg});
    background-size: cover;
`;

const ConfirmationBtn = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        display: block;

        transition: all 0.2s;

        padding: 1rem 0.1rem;
        margin: 0 auto;
        width: 25rem;
        margin-top: 3rem;

        border-radius: 8px;
        border: none;

        background-color: #1a5ef3;

        font-size: 1.65rem;
        font-weight: 300;
        text-align: center;
        font-family: inherit;
        text-decoration: none;
        text-transform: uppercase;
        color: #fff;
        cursor: pointer;

        // margin-bottom: 4rem;
    }

    &:active,
    &:focus {
        outline: none;
        transform: translateY(-1px);
        box-shadow: 0 0.5rem 1rem RGBA(var(--color-black), 0.2);
    }
    /* &:focus {
        box-shadow: 1px 1px 32px 0 RGBA(41 99 221 / 50%);
    } */

    &:hover {
        transform: scale(1.05);
    }
`;

export default function ReviewWrite(props) {
    const excursionBg = require("../../../assets/img/tours/tour-1-1.jpg")
        .default;

    return (
        <ReviewBox>
            {/* <ExcursionBg excursionBg={excursionBg} /> */}
            <div style={{ paddingBottom: "4rem" }}>
                <h1
                    style={{
                        paddingTop: "3rem",
                        fontSize: "2.5rem",
                        fontWeight: "400",
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    Share your opinion with us
                </h1>
                <p
                    style={{
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "2rem",
                        paddingTop: "1.5rem",
                    }}
                >
                    Congratulation for taking your first steps towards
                    experiencing adventures all over the world!
                </p>
                <p
                    style={{
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "3rem",
                        paddingTop: "0rem",
                    }}
                >
                    An email has been sent to you with all the details !
                    <HoverRating />
                </p>
                <ConfirmationBtn>Send</ConfirmationBtn>
            </div>
        </ReviewBox>
    );
}

ReviewWrite.propTypes = {};
