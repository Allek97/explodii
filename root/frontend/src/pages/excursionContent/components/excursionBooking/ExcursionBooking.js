/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";

import "./_excursionBooking.scss";
import "../../../../componants/reusable/_composition.scss";

// eslint-disable-next-line no-undef
const stripe = Stripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const BookingBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 25rem;
    margin-bottom: 10rem;
    padding: 5rem 1rem;
    border-radius: 2rem;

    box-shadow: var(--shadow-dark);
    /* box-shadow: 0px 0px 2rem rgb(0 0 0 / 15%); */

    background-image: white;
`;

const BookingBtn = styled.a`
    margin: 8rem 0 0 0 !important;
    font-size: 2rem !important;
    padding: 1.8rem 4rem !important;
    border-radius: 1rem;
    background-image: linear-gradient(
        76deg,
        rgba(var(--color-primary-dark), 70%),
        rgb(var(--color-primary-dark))
    );
    box-shadow: var(--shadow-dark);
    &:hover {
        transform: scale(1.05);
    }
`;

const BookingSvgStyle = styled.div`
    position: absolute;
    bottom: -4rem;
    right: -7rem;

    height: 15rem;
    width: 23rem;
    padding: 1rem;

    box-shadow: var(--shadow-dark);
    border-radius: 3rem;

    background-image: url(${(props) => props.svg});
    background-size: cover;
`;

export default function ExcursionBooking(props) {
    // props
    const {
        excursionId,
        excursionDuration,
        excursionPrice,
        excursionImages,
        excursionName,
        excursionDate,
        authStatus,
        setPaymentStatus,
        setBookedExcursionName,
        setBookedExcursionPrice,
        setBookedExcursionDuration,
        setBookedExcursionDate,
    } = props;

    // Hooks
    const [inProcess, setInProcess] = useState(false);

    // variables
    const Nat1 = require(`../../../../assets/img/tours/${excursionImages[0]}`)
        .default;
    const Nat2 = require(`../../../../assets/img/tours/${excursionImages[1]}`)
        .default;
    const Nat3 = require(`../../../../assets/img/tours/${excursionImages[2]}`)
        .default;

    const bookingSvg1 = require(`../../../../assets/svgs/booking-travel.svg`)
        .default;
    const bookingSvg2 = require(`../../../../assets/svgs/dreamer.svg`).default;

    // console.log(
    //     excursionName,
    //     excursionPrice,
    //     excursionDuration,
    //     excursionDate
    // );

    const handleBookingCheckout = async () => {
        try {
            setInProcess(true);
            const session = await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/bookings/checkout-session/${excursionId}`,
                {
                    withCredentials: true,
                }
            );

            await stripe.redirectToCheckout({
                sessionId: session.data.session.id,
            });

            setPaymentStatus(true);
            // console.log(
            //     excursionName,
            //     excursionPrice,
            //     excursionDuration,
            //     excursionDate
            // );
            setBookedExcursionName(excursionName);
            setBookedExcursionPrice(excursionPrice);
            setBookedExcursionDuration(excursionDuration);
            setBookedExcursionDate(excursionDate);
        } catch (err) {
            // console.log("Payment has failed!");
            console.log(err.response.data.message);
            setPaymentStatus(false);
        }
    };

    return (
        <BookingBox>
            <h1
                className="heading-primary"
                style={{
                    fontSize: "2.5rem",
                    backgroundImage: `linear-gradient(
                    76deg,
                    rgb(var(--color-primary-light)),
                    rgb(var(--color-primary-dark))
                )`,
                }}
            >
                WHAT ARE YOU WAITING FOR?
            </h1>
            <p
                style={{
                    width: "70%",
                    margin: "2rem 0",
                    textAlign: "center",
                    fontSize: "1.7rem",
                    fontFamily: "Poppins",
                    color: "rgb(41, 43, 46)",
                }}
            >
                <span
                    style={{
                        color: "rgb(var(--color-blue-special))",
                        fontSize: "1.8rem",
                    }}
                >
                    {excursionDuration} days.
                </span>{" "}
                1 adventure. Infinite memories. Make it yours today! With a good
                price of{" "}
                <span
                    style={{
                        color: "rgb(var(--color-blue-special))",
                        fontSize: "1.8rem",
                    }}
                >
                    ${excursionPrice}.
                </span>{" "}
            </p>
            <div
                className="composition-excursion"
                style={{ height: "40rem", width: "50rem" }}
            >
                <img
                    src={Nat1}
                    className="composition-excursion__photo composition-excursion__photo--1"
                    alt="nat-1"
                />
                <img
                    src={Nat2}
                    className="composition-excursion__photo composition-excursion__photo--2"
                    alt="nat-2"
                />
                <img
                    src={Nat3}
                    className="composition-excursion__photo composition-excursion__photo--3"
                    alt="nat-3"
                />
            </div>
            {authStatus ? (
                <BookingBtn
                    className="navBar__btn"
                    onClick={handleBookingCheckout}
                >
                    {inProcess ? `Processing...` : `Book Excursion Now →`}
                </BookingBtn>
            ) : (
                <BookingBtn href="/login" className="navBar__btn">
                    Log In To Book This Excursion →
                </BookingBtn>
            )}
            <BookingSvgStyle svg={bookingSvg1} />
            <BookingSvgStyle svg={bookingSvg2} style={{ left: "-7rem" }} />
        </BookingBox>
    );
}

ExcursionBooking.propTypes = {
    excursionId: PropTypes.string.isRequired,
    excursionName: PropTypes.string.isRequired,
    excursionDate: PropTypes.string.isRequired,
    excursionDuration: PropTypes.number.isRequired,
    excursionPrice: PropTypes.number.isRequired,
    excursionImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

    authStatus: PropTypes.bool.isRequired,
    setPaymentStatus: PropTypes.func.isRequired,

    setBookedExcursionName: PropTypes.func.isRequired,
    setBookedExcursionPrice: PropTypes.func.isRequired,
    setBookedExcursionDuration: PropTypes.func.isRequired,
    setBookedExcursionDate: PropTypes.func.isRequired,
};
