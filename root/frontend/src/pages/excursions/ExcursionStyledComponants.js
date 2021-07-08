/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import PropTypes from "prop-types";

import { setStarRatingStyle } from "../../componants/utils/StarFunctionStyle";

export const ProfileBtn = styled.a`
    &,
    &:link,
    &:visited {
        display: flex;
        align-items: center;

        transition: all 0.2s;
        box-shadow: 1px 1px 32px 0 rgb(41 99 221 / 50%);

        height: 3.8rem;
        /* width: 3.8rem; */

        border-radius: 18px;

        background-color: #1a5ef3;
        overflow: hidden;

        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
    }

    img {
        background-color: #3be5dd;
    }

    &:hover {
        filter: brightness(1.1);
    }
`;

// NOTE: TOUR COMPONANT

const tourAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100%{
        opacity: 1;
        transform: translateX(0%);
    }
`;

export const Tour = styled.div`
    display: flex;

    /* transition: all 2s; */
    /* transform: translateX(100%); */
    /* transform: translateX(0%); */

    width: 98rem;
    margin-left: auto;
    margin-bottom: 5rem;

    // TODO: FIND A WAY TO DO IT ONLY ON RELOAD
    /* animation: ${(props) =>
        props.animationLoad
            ? css`
                  ${tourAnimation} 0.3s cubic-bezier(0.64, 0.01, 1, 0.03) 1
              `
            : "none"}; */

    box-shadow: 0px 0px 2rem rgb(0 0 0 / 20%);
    border-radius: 1rem;

    font-size: 1.4rem;
    font-weight: 300;
    font-family: Poppins, sans-serif;
    color: #55575b;

    cursor: pointer;

    & > div:first-child {
        flex: 0 0 35rem;
        height: 28rem;
        overflow: hidden;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;

        clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
        &::before {
            content: "";

            display: block;

            transition: all 0.5s ease-in;

            height: 28rem;

            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;

            background-image: linear-gradient(
                    to right bottom,
                    rgba(var(--color-main-1), 0.85),
                    rgba(var(--color-main-2), 0.85)
                ),
                url(${(props) => props.tourImg});

            background-blend-mode: color-dodge; // TODO: Change
            background-size: cover;
            background-position: 50% 50%;
            background-repeat: no-repeat;
        }

        &:hover::before {
            transition: all 0.5s ease-in;
            transform: scale(1.05);
        }
    }

    & > div:nth-child(2),
    div:nth-child(3) {
        display: flex;
        flex-direction: column;

        padding: 1.2rem 1.8rem;
        padding-right: 2.5rem;
    }

    & > div:nth-child(2) {
        flex: 0 0 50rem;
    }
`;

const TourTitle = styled.span`
    /* width: 25rem; */

    /* -webkit-box-decoration-break: clone;
    box-decoration-break: clone; */
    background-image: linear-gradient(
        to right bottom,
        rgba(var(--color-blue-special), 1),
        rgba(var(--color-primary-dark), 0.85)
    );

    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    font-family: Poppins, sans-serif;
    font-size: 2.5rem;
    font-weight: 600;
    text-transform: uppercase;
`;

const StyledStar = styled.span`
    display: block;

    height: 2.2rem;
    width: 2.2rem;

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: 50% 50%;
`;

const WithSvg = styled.span`
    display: flex;

    &::before {
        content: "";

        align-self: center;

        display: block;

        margin-right: 1rem;
        height: 2rem;
        width: 2rem;

        background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-blue-special), 1),
            rgba(var(--color-primary-dark), 0.85)
        );

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
    }
`;

const DetailBtn = styled.a`
    &,
    &:link,
    &:visited {
        /* position: absolute; */

        display: flex;
        align-items: center;

        margin-top: auto;

        transition: all 0.2s;
        box-shadow: 0 0 2rem rgb(41 99 221 / 30%);

        height: 3.8rem;
        /* width: 3.8rem; */
        padding: 1rem 2rem;

        border-radius: 3px;

        background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-blue-special), 1),
            rgba(var(--color-primary-dark), 0.85)
        );
        overflow: hidden;

        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
    }
    &:hover {
        filter: brightness(1.15);
    }
`;
export const TourBox = (props) => {
    // props
    const { excursion, animationLoad } = props;
    const {
        name,
        imageCover,
        duration,
        description,
        ratingsAverage,
        ratingsQuantity,
        price,
        slug,
    } = excursion;

    // hooks

    // variables
    const tourImg = require(`../../assets/img/tours/${imageCover}`).default;

    const roundedPrice = price.toFixed(2);
    const shortDescription = description.slice(0, 200);

    const starSvg = require("../../assets/svgs/star-review.svg").default;

    // effects

    // console.log(animationLoad);

    return (
        <Tour
            tourImg={tourImg}
            animationLoad={animationLoad}
            // style={animationLoad ? { transform: "translateX(0)" } : null}
        >
            <div />
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TourTitle>{name} Excursion</TourTitle>
                </div>
                <ul
                    style={{
                        display: "flex",
                        marginTop: "1rem",
                        alignItems: "center",
                    }}
                >
                    {[1, 2, 3, 4, 5].map((el) => {
                        return (
                            <StyledStar
                                style={setStarRatingStyle(ratingsAverage, el)}
                                key={el}
                                id={el}
                                svg={starSvg}
                                // rating={el <= 4.5 ? null : 4.5}
                            />
                        );
                    })}
                    <span
                        style={{
                            marginLeft: "6px",
                            fontSize: "1.3rem",
                            color: "rgb(85, 87, 91)",
                        }}
                    >
                        {ratingsQuantity}
                    </span>
                </ul>
                <p style={{ marginTop: "3rem" }}>
                    {shortDescription}...
                    <a
                        href={`/excursions/${slug}`}
                        style={{ color: "rgb(var(--color-blue-special))" }}
                    >
                        More
                    </a>
                </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "auto",
                        fontWeight: "600",
                    }}
                >
                    <WithSvg
                        svg={require("../../assets/svgs/clock.svg").default}
                    >
                        {duration} days
                    </WithSvg>
                    <WithSvg
                        svg={
                            require("../../assets/svgs/check-logo-1.svg")
                                .default
                        }
                    >
                        Free Cancellation
                    </WithSvg>
                </div>
            </div>
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                    }}
                >
                    <span>At</span>
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.9rem",
                        }}
                    >
                        ${roundedPrice}
                    </span>
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.9rem",
                            marginTop: "-1rem",
                        }}
                    >
                        CAD
                    </span>
                </div>
                <DetailBtn href={`/excursions/${slug}`}>Details</DetailBtn>
            </div>
        </Tour>
    );
};

// Props validation

TourBox.propTypes = {
    excursion: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageCover: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        ratingsAverage: PropTypes.number.isRequired,
        ratingsQuantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
    }).isRequired,
    animationLoad: PropTypes.bool.isRequired,
};
