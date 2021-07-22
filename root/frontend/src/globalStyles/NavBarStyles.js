// NOTE: NavBar has global styles cause it will be reused in all pages

import styled from "styled-components";
import svgLogOut from "../assets/svgs/log-out.svg";
import logo from "../assets/img/home/mountain.png";

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

export const Logo = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    height: 6rem;
    width: 6rem;
    margin-right: 2rem;

    background-image: linear-gradient(
        to bottom right,
        ${(props) =>
            props.fill ? "RGBA(var(--color-primary-light))" : "white"},
        ${(props) => (props.fill ? "RGBA(var(--color-primary-dark))" : "white")}
    );
    // background-image: RGBA(var(--color-gold), 1);

    mask-image: url(${logo});
    mask-size: cover;
`;

export const LogoText = styled.h1`
    font-size: 2.5rem;
    font-family: "Manrope", sans-serif;
    background-image: linear-gradient(
        to bottom right,
        ${(props) =>
            props.fill ? "RGBA(var(--color-primary-light))" : "white"},
        ${(props) => (props.fill ? "RGBA(var(--color-primary-dark))" : "white")}
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
`;

export const Btn = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        display: inline-block;

        transition: all 0.2s;

        padding: 0.8rem 3rem;
        box-shadow: 1px 1px 32px 0 RGBA(41 99 221 / 50%);
        border-radius: 4px;

        background-color: #1a5ef3;

        // text-transform: uppercase;
        font-size: 1.4rem;
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
        box-shadow: 0 0.5rem 1rem RGBA(var(--color-black), 0.2);
    }

    &:hover {
        filter: brightness(1.1);
    }

    &:not(:last-child) {
        margin-right: 2rem;
    }
`;

export const BtnLO = styled(Btn)`
    &,
    &:link,
    &:visited {
        position: relative;

        padding: 0.8rem 4rem;
        padding-right: 2.6rem;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0.9rem;
        left: 0.9rem;
        display: inline-block;
        height: 2.1rem;
        width: 2.1rem;
        // background-image: linear-gradient(to right, #02effe, #4dadfe);
        background-image: linear-gradient(76deg, #3be5dd, #05edfe);

        mask-image: url(${svgLogOut});
        mask-size: cover;
    }
`;
