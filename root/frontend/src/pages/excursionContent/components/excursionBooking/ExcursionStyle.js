import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const BookingBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* margin-top: 20rem; */
    /* margin-bottom: 15rem; */
    padding: 5rem 1rem;
    border-radius: 2rem;

    box-shadow: var(--shadow-dark);
    /* box-shadow: 0px 0px 2rem rgb(0 0 0 / 15%); */

    background-image: white;

    max-width: 75rem;
    margin: 0 auto;
`;

export const BookingBtn = styled(Link)`
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

    @media only screen and (max-width: 29em) {
        margin: 5rem 0 0 0 !important;
        font-size: 1.5rem !important;
        padding: 1.5rem 2rem !important;
    }
`;

export const BookingSvgStyle = styled.div`
    position: absolute;
    bottom: -4rem;
    ${(props) =>
        props.isSvg1
            ? css`
                  left: -7rem;
              `
            : css`
                  right: -7rem;
              `}

    height: 15rem;
    width: 23rem;
    padding: 1rem;

    box-shadow: var(--shadow-dark);
    border-radius: 3rem;

    background-image: url(${(props) => props.svg});
    background-size: cover;
    background-position: center;

    @media only screen and (max-width: 47em) {
        ${(props) =>
            props.isSvg1
                ? css`
                      bottom: -11rem;
                      left: 1rem;
                  `
                : css`
                      top: -11rem;
                      right: 1rem;
                  `}
        height: 13rem;
        width: 20rem;
    }
    @media only screen and (max-width: 29em) {
        ${(props) =>
            props.isSvg1
                ? css`
                      bottom: -7rem;
                  `
                : css`
                      top: -7rem;
                  `}

        height: 10rem;
        width: 15rem;
    }
`;
