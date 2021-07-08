import styled from "styled-components";

import transitionImg from "../../../assets/img/home/transition.png";
import warningSvg from "../../../assets/svgs/warning.svg";
import checkSvg from "../../../assets/svgs/check-o.svg";

export const ReviewBox = styled.div`
    position: fixed;
    top: 54%;
    left: 56.5%;
    transform: translate(-50%, -50%);

    z-index: 3;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

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

export const ExcursionBg = styled.div`
    height: 22rem;
    width: 100%;
    background-image: url(${(props) => props.excursionBg});
    background-size: cover;
    background-position: center;
`;

export const ConfirmationBtn = styled.a`
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

        background-color: blue;

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

export const UserNameStyled = styled.p`
    position: relative;

    width: max-content;

    color: rgb(var(--color-blue-special));
    font-size: 2rem;

    &::before,
    &::after {
        content: "";

        display: block;

        height: 7px;
        width: 7px;

        border-radius: 50%;
        background-color: rgb(var(--color-blue-special));
    }

    &::before {
        position: absolute;
        top: 1.2rem;
        left: -2rem;
    }
    &::after {
        position: absolute;
        top: 1.2rem;
        right: -2rem;
    }
`;

export const TextArea = styled.textarea`
    resize: vertical;

    padding: 1rem;
    margin-top: 2rem;
    width: 100%;
    height: 10rem;
    min-height: 5rem;
    max-height: 15rem;

    border: 1px solid rgba(var(--color-blue-special));
    /* background-image: linear-gradient(
        76deg,
        RGBA(var(--color-main-2)),
        RGBA(var(--color-main-2))
    ); */

    font-size: 1.3rem;
    font-weight: 600;
    color: rgba(var(--color-main-2));

    outline: none;

    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 8rem;
    }

    &::-webkit-scrollbar-track {
        background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
        //#226f91;
        //  -webkit-border-radius: 10px;
        //  border-radius: 10px;
        background-color: RGBA(var(--color-blue-special));
        box-shadow: inset 0 0 6px RGBA(0, 0, 0, 0.5);
        border-radius: 8rem;
    }

    &::-webkit-scrollbar-thumb:window-inactive {
        background-color: RGBA(var(--color-blue-special));
    }

    &:focus {
        box-shadow: 3px 3px 3rem rgba(var(--color-blue-special), 0.8);
    }
`;

export const Deco = styled.div`
    &::before {
        // After content to add space when overflow
        content: "";

        grid-area: ${(props) =>
            `${props.bookingsRow} / ${1} / ${props.bookingsRow} / ${3}`};

        display: block;

        position: absolute;
        bottom: -5rem;
        left: -10rem;

        height: 20rem;
        width: calc(100% + 150px);

        background-image: linear-gradient(
            to right bottom,
            RGBA(var(--color-primary-light), 0.9),
            RGBA(var(--color-primary-dark), 0.9)
        );

        mask-image: url(${transitionImg});
        mask-size: cover;
        mask-position: 50% 50%;
        mask-repeat: no-repeat;
    }
`;

export const UtilBtn = styled.a`
    &,
    &:link,
    &:visited {
        /* position: absolute;
        top: 0;
        right: 0; */

        display: flex;
        align-items: center;

        transition: all 0.3s;
        /* box-shadow: 1px 1px 3.2rem black; */

        background-color: ${(props) =>
            props.isSelected
                ? "rgba(var(--color-blue-special),1)"
                : "transparent"};

        padding: 8px 1.3rem;
        width: max-content;
        height: max-content;

        border-radius: 3px;

        overflow: hidden;

        text-decoration: none;
        font-size: 1.5rem;
        font-weight: 600;
        /* color: rgba(25,103,210,1.0); */
        color: ${(props) =>
            props.isSelected ? "#fff" : "rgba(25,103,210,1.0)"};
        cursor: pointer;
    }

    &:hover {
        background-color: ${(props) =>
            props.isSelected ? "none" : "rgba(25,103,210,0.2)"} !important;
    }
`;

export const CloseReview = styled.span`
    display: block;

    position: absolute;
    top: 1.5rem;
    right: 2rem;

    transition: all 0.5s;

    height: 2rem;
    width: 2rem;

    background-image: linear-gradient(
        to right,
        rgb(var(--color-blue-special)),
        rgb(var(--color-blue-special))
    );

    mask-image: url(${(props) => props.svg});
    mask-size: cover;
    mask-position: center;

    cursor: pointer;

    /* &:hover {
        transform: scale(1.1);
    } */
`;

export const ErrorBox = styled.div`
    position: relative;

    max-width: 16rem;

    /* position: absolute;

    top: 0;
    right: 0; */

    font-size: 1.22rem;
    font-weight: bolder;
    text-align: center;
    color: rgb(204, 20, 30);

    &::before {
        content: "";

        position: absolute;
        left: -2.3rem;
        bottom: 2px;

        height: 2rem;
        width: 2rem;

        background-color: rgb(204, 20, 30);

        mask-image: url(${warningSvg});
        mask-size: cover;
    }
`;

export const SuccessReview = styled.div`
    position: relative;

    position: absolute;
    top: 55%;
    left: 55%;
    transform: translate(-50%, -50%);
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 30rem;
    width: 45rem;
    padding: 3rem;

    animation: loginStatusEffect 0.7s cubic-bezier(0.64, 0.01, 1, 0.03) 1;

    /* background-color: RGBA(68, 94, 182); */
    background-color: RGBA(var(--color-main-2));

    box-shadow: var(--shadow-dark);

    border-radius: 2rem;

    transition: all 3s;

    color: white;

    font-size: 5rem;

    &::before {
        content: "";

        display: block;
        height: 15rem;
        width: 15rem;

        position: absolute;
        top: -7.5rem;
        left: 15rem;

        margin: 0 auto;

        background-image: linear-gradient(
            to right bottom,
            RGBA(var(--color-green-special)),
            RGBA(var(--color-green-special))
        );

        // background-image: url(../../assets/svgs/checked.svg);

        mask-image: url(${checkSvg});
        mask-size: cover;

        animation: loginLogoEffect 0.9s cubic-bezier(0.64, 0.01, 1, 0.03) 1;
    }

    // animation: loginStatusEffect 1s ease-in 1;
`;
