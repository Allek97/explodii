/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ConfirmationBtn } from "../style/ReviewWriteUpdateStyle";

import CheckSvg from "../../../assets/svgs/check-circle.svg";

const temp =
    "?session_id=cs_test_a17zkeCJbpFixG9u4cjwAQnwFiPtJMjpp45Lso4S9AHjC9c6pShuLpe3ja";

const SuccessBox = styled.div`
    position: relative;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    overflow: hidden;

    width: 40rem;
    padding: 3rem 2rem;

    border-radius: 3rem;

    transition: all 3s;

    animation: signupStatusEffect 0.6s linear 1;

    background-color: RGBA(var(--color-main-2));

    color: white;
`;

const SuccessSvg = styled.div`
    display: block;

    width: 7rem;
    height: 7rem;

    color: transparent;

    background-image: linear-gradient(
        to right,
        RGBA(var(--color-green-special)),
        RGBA(var(--color-green-special))
    );

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-position: top;
`;

export default function PaymentSuccessBox(props) {
    // props
    const { setOrderStatus, orderExcursion, orderPrice, orderImageCover } =
        props;

    const compressedOrderImageCover = `${
        orderImageCover.split(".")[0]
    }-900x600.jpg`;

    const excursionImg =
        require(`../../../assets/img/tours/${compressedOrderImageCover}`).default;
    return (
        <SuccessBox>
            {/* <img
                src={excursionImg}
                alt="excursion"
                style={{ height: "30rem" }}
            /> */}
            <SuccessSvg svg={CheckSvg} />

            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "bolder",
                    textAlign: "center",
                    color: "RGBA(var(--color-green-special))",
                }}
            >
                Booking Successfully Placed
            </h1>
            <p
                style={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingTop: "1.5rem",
                }}
            >
                Congratulation ! You booked{" "}
                <span style={{ color: "#1a5ef3" }}>{orderExcursion}</span>{" "}
                excursion for the price of {orderPrice}$CA.
            </p>
            <p
                style={{
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingTop: "1.5rem",
                }}
            >
                You can see additional informations about your purchase on the
                My Bookings section of your account !
            </p>

            <ConfirmationBtn
                href="/account"
                onClick={() => {
                    setOrderStatus(false);
                }}
                style={{
                    fontSize: "1.45rem",
                    fontWeight: "700",
                }}
            >
                Continue
            </ConfirmationBtn>
        </SuccessBox>
    );
}

PaymentSuccessBox.propTypes = {
    setOrderStatus: PropTypes.func.isRequired,
    orderExcursion: PropTypes.string.isRequired,
    orderPrice: PropTypes.number.isRequired,
    orderImageCover: PropTypes.string.isRequired,
};
