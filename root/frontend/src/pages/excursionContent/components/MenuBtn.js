/* eslint-disable global-require */
import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import useOuterClick from "../../../componants/utils/UseOuterClick";

const photoStyle = {
    width: "3.8rem",
    borderRadius: "18px",
};

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

        background-image: linear-gradient(
            76deg,
            ${(props) =>
                props.isScrolled
                    ? "rgb(var(--color-main-1))"
                    : "rgb(var(--color-blue-special))"},
            ${(props) =>
                    props.isScrolled
                        ? "rgb(var(--color-main-2))"
                        : "rgb(var(--color-blue-special))"}
                50%
        );
        overflow: hidden;

        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
    }
    &:hover {
        filter: brightness(1.1);
    }

    img {
        background-color: #3be5dd;
    }
`;

const ArrowMenu = styled.span`
    display: block;

    transition: all 0.5s ease;

    height: 2rem;
    width: 2rem;

    margin-right: 6px;

    background-image: linear-gradient(to right bottom, white, white);

    mask-image: url(${(props) => props.svg});
    mask-size: cover;

    transform: ${(props) => (props.isMenu ? "rotate(180deg)" : "rotate(0)")};
`;

export const SideNav = styled.ul`
    position: absolute;
    top: -3rem;
    left: 0rem;
    width: 100%;

    display: flex;
    flex-direction: column;

    margin-top: 8rem;

    box-shadow: var(--shadow-dark);

    background-image: linear-gradient(
        to right bottom,
        ${(props) =>
            props.isScrolled
                ? "rgb(var(--color-main-1))"
                : "rgb(var(--color-blue-special))"},
        ${(props) =>
            props.isScrolled
                ? "rgb(var(--color-main-2))"
                : "rgb(var(--color-blue-special))"}
    );

    /* background-image: linear-gradient(to right bottom, white, white); */
    color: black;

    cursor: pointer;
`;

export const SideItem = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        display: flex;
        align-items: center;

        height: 6rem;

        text-decoration: none;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 3px;
        background-color: ${(props) =>
            props.isScrolled
                ? "rgb(var(--color-blue-special))"
                : "rgb(var(--color-main-2))"};
        transform: scaleY(0);
        transform-origin: bottom;
        transition: transform 0.3s, width 0.3s cubic-bezier(1, 0, 0, 1) 0.3s,
            background-color 0.5s;
    }

    &:hover::before {
        transform: scaleY(1);
        width: 100%;
    }

    &:active::before {
        background-color: rgb(var(--color-primary-dark));
    }

    // On ajoute les svgs

    &:after {
        content: "";

        position: absolute;
        top: 2.1rem;
        left: 2rem;

        display: block;

        height: 1.7rem;
        width: 1.7rem;

        /* background-image: linear-gradient(76deg, #3be5dd, #05edfe); */
        background-image: linear-gradient(
            76deg,
            ${(props) => (props.isScrolled ? "#3be5dd" : "white")},
            ${(props) => (props.isScrolled ? "#05edfe" : "white")}
        );

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
        mask-position: center;
    }
`;

export const SideLink = styled.span`
    position: relative;

    padding-left: 5rem;

    font-size: 1.25rem;
    font-weight: 600;
    text-decoration: none;

    /* color: black; */
    color: white;
`;

export default function MenuBtn(props) {
    //props
    const { isScrolled, userName, userPhoto } = props;
    // Hooks
    const [isMenu, setMenu] = useState(false);
    // Refs
    const menuWrapperRef = useRef(null);

    const closeMenu = () => {
        setMenu(false);
    };

    useOuterClick(menuWrapperRef, closeMenu);

    // eslint-disable-next-line import/no-dynamic-require
    const userPicture = `${process.env.REACT_APP_URL}/api/v1/users/images/${userPhoto}`;
    // svgs
    const arrowSvg = require("../../../assets/svgs/keyboard_arrow_down.svg")
        .default;
    const accountSvg = require("../../../assets/svgs/switch_account.svg")
        .default;
    const homeSvg = require("../../../assets/svgs/home.svg").default;
    const logoutSvg = require("../../../assets/svgs/log-out.svg").default;

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/users/logout`,
                {
                    withCredentials: true,
                }
            );
            window.location.assign("/excursions");
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    return (
        <div style={{ position: "relative" }} ref={menuWrapperRef}>
            <ProfileBtn
                onClick={() => setMenu(!isMenu)}
                style={{ position: "relative" }}
                isScrolled={isScrolled}
            >
                <img src={userPicture} alt="userPhoto" style={photoStyle} />
                <span
                    style={{
                        paddingLeft: "1.2rem",
                        paddingRight: "5px",
                        minWidth: "9rem",
                    }}
                >
                    {userName}
                </span>
                <ArrowMenu svg={arrowSvg} isMenu={isMenu} />
            </ProfileBtn>
            {isMenu && (
                <SideNav isScrolled={isScrolled}>
                    <SideItem
                        svg={accountSvg}
                        isScrolled={isScrolled}
                        href="/account"
                    >
                        <SideLink>Account</SideLink>
                    </SideItem>
                    <SideItem svg={homeSvg} isScrolled={isScrolled} href="/">
                        <SideLink>Homepage</SideLink>
                    </SideItem>
                    <SideItem
                        svg={logoutSvg}
                        isScrolled={isScrolled}
                        onClick={handleLogOut}
                    >
                        <SideLink>Logout</SideLink>
                    </SideItem>
                </SideNav>
            )}
        </div>
    );
}

MenuBtn.propTypes = {
    isScrolled: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};
