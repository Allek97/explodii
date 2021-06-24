import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

    overflow: hidden;

    border-radius: 3rem;

    transition: all 3s;

    animation: signupStatusEffect 0.6s linear 1;

    width: 50rem;

    background-color: #2a3887;

    color: white;

    & > div:first-child {
        height: 28rem;
        background-image: url(${(props) => props.svg});
        background-size: cover;
    }
`;

export default function PaymentSuccessBox(props) {
    // props
    const {
        bookedExcursionName,
        bookedExcursionPrice,
        bookedExcursionDuration,
        bookedExcursionDate,
    } = props;

    // eslint-disable-next-line global-require
    const svg = require("../../assets/svgs/check.svg").default;
    return (
        <SuccessBox svg={svg}>
            <div />
            <div style={{ paddingBottom: "4rem" }}>
                <h1
                    style={{
                        fontSize: "3.5rem",
                        fontWeight: "bolder",
                        textAlign: "center",
                        paddingTop: "5rem",
                    }}
                >
                    Welcome to Explodii
                </h1>
                <span>{bookedExcursionName}</span>
                <span>{bookedExcursionDuration}</span>
                <span>{bookedExcursionDate}</span>
                <span>{bookedExcursionPrice}</span>
                <p
                    style={{
                        fontSize: "1.7rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "3rem",
                        paddingTop: "1.5rem",
                    }}
                >
                    Congratulation for taking your first steps towards
                    experiencing adventures all over the world!
                </p>
                <a href="/" className="navBar__btn">
                    Continue
                </a>
            </div>
        </SuccessBox>
    );
}

PaymentSuccessBox.propTypes = {
    bookedExcursionName: PropTypes.string.isRequired,
    bookedExcursionDuration: PropTypes.number.isRequired,
    bookedExcursionDate: PropTypes.string.isRequired,
    bookedExcursionPrice: PropTypes.number.isRequired,
};
