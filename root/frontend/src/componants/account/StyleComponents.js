/* eslint-disable global-require */
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

        padding: 1.5rem 0;
        width: 18rem;
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

    /* display: none; */

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

SuccessSave.propTypes = {
    isSettings: PropTypes.bool.isRequired,
    setDisplaySuccessMsgSet: PropTypes.func.isRequired,
    setDisplaySuccessMsgPW: PropTypes.func.isRequired,
};
