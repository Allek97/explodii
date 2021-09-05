import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

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

    & > div:nth-child(1) {
        flex: 0 0 38%;
        height: 100%;

        margin-bottom: 32%;
    }

    .tourbox-image {
        height: 100%;
        overflow: hidden;

        clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);

        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;

        &::before {
            content: "";

            display: block;

            transition: all 0.5s ease-in;

            width: 100%;
            height: 100%;

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
    & > div:nth-child(3) {
        display: flex;
        flex-direction: column;

        padding: 1.2rem 1.8rem;
        padding-right: 2.5rem;
    }

    & > div:nth-child(2) {
        flex: 1;

        p {
            margin-top: 3rem;
            margin-bottom: 3px;

            @media only screen and (max-width: 81.25em) {
                margin-top: 2rem;
            }
        }
    }

    .tourbox-information {
        flex: 1 1 auto;
    }

    .tourbox-rating {
        display: flex;
        margin-top: 1rem;
        align-items: center;

        &__quantity {
            margin-left: 6px;
            font-size: 1.3rem;
            color: rgb(85, 87, 91);
        }
    }

    .tourbox-complement {
        display: flex;
        flex-direction: column;
        font-weight: 600;
    }

    .tourbox-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        span:nth-child(2),
        span:nth-child(3) {
            font-size: 1.9rem;
            font-weight: bold;
        }
        span:nth-child(3) {
            margin-top: -1rem;
        }
    }
`;

export const TourTitle = styled.span`
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

    @media only screen and (max-width: 81.25em) {
        font-size: 2.2rem;
    }

    @media only screen and (max-width: 75em) {
        font-size: 2.5rem;
    }
`;

export const StyledStar = styled.span`
    display: block;

    height: 2.2rem;
    width: 2.2rem;

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: 50% 50%;
`;

export const WithSvg = styled.span`
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

export const DetailBtn = styled(Link)`
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
