import styled, { css } from "styled-components";

////////////////////////////////////////////////
// NOTE: Section Review
////////////////////////////////////////////////

export const StyledStar = styled.span`
    display: block;

    height: 2.5rem;
    width: 2.5rem;

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: 50% 50%;
`;

export const StyledReview = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: ${(props) =>
        props.isExcursion ? "var(--excursion-review-box-width-1)" : "50rem"};

    padding: 3rem;
    margin-right: var(--excursion-review-box-margin);
    border-radius: 3px;

    box-shadow: 0px 0px 2rem rgb(0 0 0 / 15%);

    text-align: center;

    @media only screen and (max-width: 56.25em) {
        max-width: ${(props) =>
            props.isExcursion
                ? "var(--excursion-review-box-width-2)"
                : "50rem"};
    }
    @media only screen and (max-width: 37.5em) {
        max-width: ${(props) =>
            props.isExcursion
                ? "var(--excursion-review-box-width-3)"
                : "50rem"};

        margin-right: var(--excursion-review-box-margin-3);
    }

    img {
        position: relative;
        z-index: 10;
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
        word-break: break-all;
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

export const UtilSvg = styled.span`
    display: block;

    transition: transform 0.1s;

    height: 2.5rem;
    width: 2.5rem;

    background-image: linear-gradient(
        76deg,
        RGBA(var(--color-primary-light)),
        RGBA(var(--color-primary-dark))
    );

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-position: center;

    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }
`;
