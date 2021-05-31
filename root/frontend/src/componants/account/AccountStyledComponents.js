/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// NOTE: Variables/Animations
const slideFromUp = keyframes`
 0% { 
     transform: translateY(-100%);
     /* opacity:0;  */
}
 100% { 
     transform: translateY(0);
     opacity:1; 
}
`;

// Side Nav
export const SideNav = styled.ul`
    display: flex;
    flex-direction: column;

    margin-top: 8rem;

    cursor: pointer;
`;

export const SideItem = styled.li`
    display: flex;
    align-items: center;

    height: 6rem;

    /* margin-bottom: 7.5rem; */

    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 3px;
        background-color: rgb(var(--color-blue-special));
        transform: scaleY(0);
        transform-origin: bottom;
        transition: transform 0.3s, width 0.3s cubic-bezier(1, 0, 0, 1) 0.3s,
            background-color 2s;
    }

    &:hover::before {
        transform: scaleY(1);
        width: 100%;
    }

    &:active::before {
        background-color: rgb(var(--color-blue-special));
    }

    // On ajoute les svgs

    &:after {
        content: "";

        position: absolute;
        top: 2.1rem;
        left: 5.5rem;

        display: block;

        height: 1.7rem;
        width: 1.7rem;

        background-image: linear-gradient(to right, white, white);

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
        mask-position: center;
    }
`;

export const SideLink = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        padding-left: 9rem;

        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        /* text-transform: uppercase; */
        color: #fff;
    }
`;

// NOTE: Section Account Setting

export const FunctionalBtn = styled(SideLink)`
    transition: all 0.4s;

    &:first-of-type {
        margin-top: 10rem;
    }

    &:last-child {
        margin-top: 3rem;
    }

    &::before {
        content: "";

        position: absolute;
        top: 0;
        left: 5.8rem;

        display: block;

        height: 1.7rem;
        width: 1.7rem;

        background-image: linear-gradient(to right, white, white);

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
        mask-position: center;

        transition: background-image 5s ease-in-out;
    }

    &:hover {
        color: rgb(var(--color-blue-special));
    }

    &:hover::before {
        animation: blueSvgAnimation 2s ease-in-out 1;
        background-image: linear-gradient(
            to right,
            rgb(var(--color-blue-special)),
            rgb(var(--color-blue-special))
        );
    }
`;

export const SettingsButton = styled.button`
    &,
    &:link,
    &:visited {
        position: relative;

        display: block;

        transition: all 0.2s;

        padding: 1.8rem 0;
        width: 20rem;
        margin-top: 3rem;
        margin-left: auto;

        border: none;
        border-radius: 3rem;

        background-color: #1a5ef3;

        // text-transform: uppercase;
        font-size: 1.3rem;
        font-family: inherit;
        font-weight: 700;
        text-decoration: none;
        text-align: center;
        text-transform: uppercase;
        color: #fff;
        cursor: pointer;
    }

    &:active,
    &:focus {
        outline: none;
        box-shadow: 1px 1px 32px 0 rgb(41 99 221 / 50%);
    }

    &:hover {
        filter: brightness(1.1);
    }
`;

// Success messages after saving
export const SuccessSaveDiv = styled.div`
    position: absolute;
    bottom: 3.5rem;
    left: 0rem;

    display: flex;
    flex-direction: column;
    background-color: white;

    padding: 1rem 1.3rem 1rem 6rem;

    box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.3);

    border-radius: 4px;

    overflow: hidden;

    cursor: pointer;

    animation: successMsgAnimation 0.6s ease-out 1;

    &::before {
        content: "";
        /* display: block; */

        position: absolute;
        top: 0;
        left: 0;

        width: 5px;
        height: 6.4rem;

        background-color: rgb(var(--color-blue-special));
    }

    &::after {
        content: "";
        display: block;

        position: absolute;
        top: 1.7rem;
        left: 1.7rem;

        width: 3rem;
        height: 3rem;

        color: transparent;

        background-image: linear-gradient(to right, #1a5ef3, #1a5ef3);

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
        mask-position: top;
    }

    /* p {
        padding-left: 4rem;
    } */
`;

export const SuccessSave = (props) => {
    const successSvg = require("../../assets/svgs/check-o.svg").default;

    const {
        isSettings,
        setDisplaySuccessMsgSet,
        setDisplaySuccessMsgPW,
    } = props;

    const msg = isSettings
        ? "Your modifications have been saved"
        : "Your password has been updated";

    return (
        <SuccessSaveDiv
            svg={successSvg}
            onClick={() =>
                isSettings
                    ? setDisplaySuccessMsgSet(false)
                    : setDisplaySuccessMsgPW(false)
            }
        >
            <p
                style={{
                    fontSize: "1.7rem",
                    fontWeight: "bolder",
                    color: "rgba(0,0,0,.7)",
                }}
            >
                Success
            </p>
            <p
                style={{
                    fontSize: "1.1rem",
                    color: "rgb(var(--color-grey-dark-2))",
                }}
            >
                {msg}
            </p>
        </SuccessSaveDiv>
    );
};

// NOTE: Section Account Booking
export const BookBtn = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        display: inline-block;

        transition: all 0.2s;

        padding: 1.5rem 3rem;
        box-shadow: 1px 1px 32px 0 rgb(41 99 221 / 50%);
        border-radius: 4px;

        background-color: #1a5ef3;

        // text-transform: uppercase;
        font-size: 1.7rem;
        text-decoration: none;
        text-align: center;
        font-family: inherit;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
    }

    &:active,
    &:focus {
        outline: none;
        box-shadow: 0 0.5rem 1rem rgba(var(--color-black), 0.2);
    }

    &:hover {
        /* filter: brightness(1.1); */
        transform: scale(1.1);
    }

    &:not(:last-child) {
        margin-right: 2rem;
    }
`;

export const StyledDisclaminer = styled.div`
    grid-area: 1/1/1/3;

    display: flex;
    justify-content: center;

    width: 90%;
    margin-right: 8rem;

    span {
        position: relative;

        width: 60%;

        font-size: 2.3rem;
        text-align: left;
        color: rgba(var(--color-primary-dark), 0.8);

        animation: ${slideFromUp} 0.3s ease-in 1;
    }

    img {
        height: 100%;
        width: 30rem;

        animation: ${slideFromUp} 0.3s ease-in 1;
    }

    &::before {
        content: "";

        position: absolute;
        top: 29.8rem;
        left: 0;

        display: block;

        height: 20rem;
        width: 100%;

        background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-primary-light), 0.85),
            rgba(var(--color-primary-dark), 0.85)
        );

        mask-image: url(${(props) => props.transition});
        mask-size: cover;
        mask-position: 50% 50%;
        mask-repeat: no-repeat;

        transform: rotate(180deg);
    }
`;

export const Disclaimer = () => {
    const bookingSvg = require("../../assets/svgs/booking.svg").default;
    const arrowSvg = require("../../assets/svgs/big-arrow.svg").default;
    const transition = require("../../assets/img/home/transition.png").default;
    return (
        <StyledDisclaminer transition={transition} arrow={arrowSvg}>
            <img src={bookingSvg} alt="booking" />
            <span>
                We noticed that you have no bookings on our platform. We have
                put together our most affordable excursions for you. Take a look
                below !
            </span>
        </StyledDisclaminer>
    );
};

////////////////////////////////////////////////
// NOTE: Section Review
////////////////////////////////////////////////

const setReviewStarsBg = (reviewVal) => {
    if (reviewVal) {
        let decimal = reviewVal - Math.floor(reviewVal);
        decimal *= 100;
        return {
            backgroundImage: `linear-gradient(
            to right,
            rgba(85,96,159,1) ${decimal}%,
            rgba(0,0,0,0.25) ${decimal}%
        )`,
        };
    }

    return {
        backgroundImage: `linear-gradient(
        to right bottom,
        rgba(var(--color-primary-light),0.9),
        rgba(var(--color-primary-dark),0.9)
    )`,
    };
};

const StyledStar = styled.span`
    display: block;

    height: 2.5rem;
    width: 2.5rem;

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: 50% 50%;
`;

const StyledReview = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 50rem !important;

    padding: 3rem;
    margin-right: 5rem;
    border-radius: 3px;

    box-shadow: 0px 0px 2rem rgb(0 0 0 / 15%);

    text-align: center;

    img {
        height: 8.5rem;
        width: 8.5rem;

        border-radius: 50%;
        margin-bottom: 1.5rem;
    }

    p:nth-of-type(1) {
        /* width: 35%; */
        margin-bottom: 1.5rem;

        font-size: 1.4rem;
        font-weight: 400;
        color: rgba(var(--color-primary-dark), 0.65);
    }
    p:nth-of-type(2) {
        font-size: 1.8rem;
        font-weight: 600;

        margin-bottom: 2rem;
    }

    & > span {
        position: absolute;
        top: -3rem;
        right: 4rem;
        opacity: 1;

        height: 6rem;
        width: 6rem;

        background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-primary-light), 1),
            rgba(var(--color-primary-dark), 1)
        );

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
        mask-position: 50% 50%;
        mask-repeat: no-repeat;

        transform: rotate(180deg);

        transition: all 0.5s ease;
    }

    ul {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &::before {
        content: "";

        position: absolute;
        top: 0;
        left: 0;

        transition: opacity 0.5s;

        display: block;

        opacity: 1;

        height: 12rem;
        width: 20rem;

        background-image: linear-gradient(
            to right bottom,
            rgba(211, 207, 207, 0.7),
            rgba(211, 207, 207, 0.4)
        );

        mask-image: url(${(props) => props.img});
        mask-size: cover;
        mask-position: 50% 50%;
        mask-repeat: no-repeat;
    }

    &::after {
        content: "";

        position: absolute;
        bottom: 0;
        left: 0;

        transition: transform 0.5s;

        height: 4px;
        width: 100%;

        transform: scale(0, 1);

        background-color: #2c3a8a;
        transform-origin: right;
    }

    &:hover {
        &::after {
            transform: scale(1, 1);
            transform-origin: left;
        }

        &::before {
            opacity: 0;
        }
    }
`;

export const ReviewBox = (props) => {
    // Props
    const { userReview, isExcursion } = props;
    const { review, rating, user, tour } = userReview;
    const { photo: UserPhoto, name: UserName } = user;
    const { name: ExcursionName } = tour;

    //variables
    const userImage = require(`../../assets/img/users/${UserPhoto}`).default;
    const worldImage = require("../../assets/img/users/world.jpg").default;
    const quoteSvg = require("../../assets/svgs/quotes.svg").default;
    const starSvg = require("../../assets/svgs/star-review.svg").default;
    return (
        <StyledReview img={worldImage} svg={quoteSvg}>
            <img src={userImage} alt="user" />
            <p>{review}</p>
            <p>{isExcursion ? UserName : ExcursionName}</p>
            <span />
            <ul>
                {[1, 2, 3, 4, 5].map((el) => {
                    return (
                        <StyledStar
                            style={
                                rating >= el
                                    ? setReviewStarsBg()
                                    : setReviewStarsBg(rating)
                            }
                            key={uuidv4()}
                            id={uuidv4()}
                            svg={starSvg}
                            // rating={el <= 4.5 ? null : 4.5}
                        />
                    );
                })}
            </ul>
        </StyledReview>
    );
};

// Prop Validation
SuccessSave.propTypes = {
    isSettings: PropTypes.bool.isRequired,
    setDisplaySuccessMsgSet: PropTypes.func.isRequired,
    setDisplaySuccessMsgPW: PropTypes.func.isRequired,
};

ReviewBox.propTypes = {
    isExcursion: PropTypes.bool.isRequired,
    userReview: PropTypes.shape({
        review: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user: PropTypes.shape({
            photo: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
        tour: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
