/* eslint-disable camelcase */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState } from "react";

import PropTypes from "prop-types";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

import { BookingBox, BookingBtn, BookingSvgStyle } from "./ExcursionStyle";

import "./_excursionBooking.scss";
import "../../../../componants/reusable/_composition.scss";

// eslint-disable-next-line no-undef
const stripe = Stripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

export default function ExcursionBooking(props) {
    // props
    const {
        excursionId,
        excursionDuration,
        excursionPrice,
        excursionImages,
        excursionCover,
        authStatus,
        setPaymentStatus,
    } = props;

    // Hooks
    const [inProcess, setInProcess] = useState(false);
    const isSmallPhone = useMediaQuery({ query: "(max-width: 29em)" });

    // variables
    const compressedCover = `${excursionCover.split(".")[0]}-900x600.jpg`;
    const cover =
        require(`../../../../assets/img/tours/${compressedCover}`).default;

    const compressedNat1 = `${excursionImages[0].split(".")[0]}-450x300.jpg`;
    const nat1 =
        require(`../../../../assets/img/tours/${compressedNat1}`).default;

    const compressedNat2 = `${excursionImages[1].split(".")[0]}-450x300.jpg`;
    const nat2 =
        require(`../../../../assets/img/tours/${compressedNat2}`).default;

    const compressedNat3 = `${excursionImages[2].split(".")[0]}-450x300.jpg`;
    const nat3 =
        require(`../../../../assets/img/tours/${compressedNat3}`).default;

    const bookingSvg1 = require(`../../../../assets/svgs/dreamer.svg`).default;
    const bookingSvg2 =
        require(`../../../../assets/svgs/booking-travel.svg`).default;

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
            <p className="booking-info">
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
            <div className="composition-excursion">
                {!isSmallPhone ? (
                    <>
                        <img
                            src={nat1}
                            className="composition-excursion__photo composition-excursion__photo--1"
                            alt="nat-1"
                        />
                        <img
                            src={nat2}
                            className="composition-excursion__photo composition-excursion__photo--2"
                            alt="nat-2"
                        />
                        <img
                            src={nat3}
                            className="composition-excursion__photo composition-excursion__photo--3"
                            alt="nat-3"
                        />
                    </>
                ) : (
                    <img
                        src={cover}
                        className="composition-excursion__photo composition-excursion__photo--cover"
                        alt="nat-1"
                    />
                )}
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
            <BookingSvgStyle svg={bookingSvg1} isSvg1 />
            <BookingSvgStyle svg={bookingSvg2} isSvg1={false} />
        </BookingBox>
    );
}

ExcursionBooking.propTypes = {
    excursionId: PropTypes.string.isRequired,
    excursionDuration: PropTypes.number.isRequired,
    excursionPrice: PropTypes.number.isRequired,
    excursionCover: PropTypes.string.isRequired,
    excursionImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

    authStatus: PropTypes.bool.isRequired,
    setPaymentStatus: PropTypes.func.isRequired,
};
