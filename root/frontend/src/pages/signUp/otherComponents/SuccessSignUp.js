import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import travelImg from "../../../assets/img/home/travel-equipment-900x711.jpg";

const Container = styled.div`
    position: relative;

    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;

    display: flex;
    flex-direction: column;

    justify-content: center;

    transition: all 1s;
    animation: signupStatusEffect 1s cubic-bezier(0.64, 0.01, 1, 0.03) 1;

    max-width: 45em;
    width: 90vw;

    border-radius: 3rem;
    background-image: linear-gradient(
        76deg,
        rgba(var(--color-main-1)),
        rgba(var(--color-main-2))
    );
    color: white;

    overflow: hidden;
`;

const SuccessInfo = styled.div`
    padding-bottom: 4rem;
    font-size: 1.7rem;
    font-weight: bold;
    text-align: center;
    padding: 3rem 1.5rem;

    h1 {
        font-size: 3.5rem;
        font-weight: bolder;
        /* padding-top: 4rem; */
    }

    p:first-of-type {
        margin-bottom: 4rem;
        margin-top: 3rem;
    }

    p:nth-of-type(2) {
        margin-bottom: 5rem;
    }
`;

const SuccessBtn = styled(Link)`
    &,
    &:link,
    &:visited {
        position: relative;

        display: block;

        transition: all 0.2s;

        padding: 1rem 0.1rem;
        width: 15rem;

        margin: 3rem auto 0;

        border: none;
        border-radius: 8px;

        background-color: #1a5ef3;

        // text-transform: uppercase;
        font-size: 1.65rem;
        font-family: inherit;
        font-weight: 700;
        text-decoration: none;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }

    &:active,
    &:focus {
        outline: none;
        transform: translateY(-1px);
        box-shadow: 0 0.5rem 1rem RGBA(var(--color-black), 0.2);
        box-shadow: 1px 1px 32px 0 RGBA(41 99 221 / 50%);
    }

    &:hover {
        filter: brightness(1.1);
    }
`;

const SuccessSignUp = () => {
    const ImgStyle = {
        objectFit: "cover",
        height: "25rem",
    };
    return (
        <Container>
            <img src={travelImg} alt="travel/map" style={ImgStyle} />
            <SuccessInfo>
                <h1>Welcome to Explodii</h1>
                <p>
                    Congratulation for taking your first steps towards
                    experiencing adventures all over the world!
                </p>
                <p> An email has been sent to you with all the details !</p>
                <SuccessBtn to="/">Continue</SuccessBtn>
            </SuccessInfo>
        </Container>
    );
};

export default SuccessSignUp;
