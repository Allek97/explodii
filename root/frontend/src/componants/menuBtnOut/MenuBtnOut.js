import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
    FaTwitterSquare,
    FaFacebookSquare,
    FaLinkedin,
    FaInstagramSquare,
    FaGithubSquare,
} from "react-icons/fa";

import { ReactComponent as MenuSvg } from "../../assets/svgs/menu.svg";

import "../../assets/fonts/_global-fonts.scss";
import "../../globalStyles/_svgUtils.scss";

const FixedBox = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    display: grid;
    place-items: center;

    transition: all 0.3s linear;
    transform: ${(props) =>
        props.isOpen ? "translateX(0)" : "translateX(-100%)"};

    width: 100%;
    height: 100%;

    opacity: ${(props) => (props.isOpen ? "1" : "0")};

    background: #f1f5f8;
`;

const slideRight = keyframes`
    0% {
        transform: translateX(-20rem);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;

const List = styled.ul`
    list-style: none;

    ${(props) =>
        props.isOpen &&
        css`
            li:first-of-type {
                animation-delay: 0.25s;
            }
            li:nth-child(2) {
                animation-delay: 0.5s;
            }
            li:nth-child(3) {
                animation-delay: 0.75s;
            }
            li:nth-child(4) {
                animation-delay: 1s;
            }

            li {
                opacity: 0;
                animation: ${slideRight} 0.5s ease-in-out 0.3s forwards;
            }
        `}
`;

const SideLink = styled(Link)`
    &,
    &:link,
    &:visited {
        display: block;

        transition: all 0.3s linear;

        margin-bottom: 0.8rem;

        border-radius: 0.4rem;

        text-align: center;
        text-transform: capitalize;
        text-decoration: none;

        font-size: 3.8rem;
        font-family: Poppins;
        font-weight: 400;
        letter-spacing: 0.32rem;

        color: #617d98;
    }

    &:focus,
    &:active,
    &:hover {
        background: #bff8fd;
        color: #2caeba;
    }
`;

const slideUp = keyframes`
    0% {
        transform: translateY(20rem);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;

const SocialList = styled.ul`
    display: flex;

    justify-content: space-between;

    width: 30rem;
    margin-top: 4rem;

    list-style: none;

    ${(props) =>
        props.isOpen &&
        css`
            li:first-of-type {
                animation-delay: 0.25s;
            }
            li:nth-child(2) {
                animation-delay: 0.5s;
            }
            li:nth-child(3) {
                animation-delay: 0.75s;
            }
            li:nth-child(4) {
                animation-delay: 1s;
            }
            li:nth-child(5) {
                animation-delay: 1.25s;
            }

            li {
                opacity: 0;
                height: 3.8rem;
                width: 3.8rem;

                animation: ${slideUp} 0.5s ease-in-out 0.3s forwards;

                &:hover {
                    transform: scale(1.1);
                }
            }
        `}
`;

const SideLinkSvg = styled.a`
    transition: all 0.3s linear;

    text-decoration: none;

    color: #102a42;

    &:hover {
        transform: scale(1.1);
    }
`;

const CloseSvgStyle = {
    position: "absolute",
    right: "4.75%",
    top: "2.75%",

    height: "5rem",
    width: "5rem",

    fill: "rgba(var(--color-blue-special))",
    background: "transparent",
    borderColor: "transparent",

    cursor: "pointer",
};

const socialSvgStyle = {
    height: "100%",
    width: "100%",
};

const MenuBtnOut = ({ page, isScrolled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuSvgStyle = {
        height: "3.8rem",
        width: "3.8rem",
        fill: isScrolled ? "rgb(var(--color-main-2))" : "white",
        cursor: "pointer",
    };

    return (
        <div>
            <MenuSvg
                style={menuSvgStyle}
                onClick={() => {
                    setIsOpen(true);
                }}
            />

            <FixedBox isOpen={isOpen}>
                <IoClose
                    style={CloseSvgStyle}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                />
                <div>
                    <List isOpen={isOpen}>
                        {page !== "login" && (
                            <li>
                                <SideLink to="/login">Log In</SideLink>
                            </li>
                        )}
                        {page !== "signup" && (
                            <li>
                                <SideLink to="/signup">Sign Up</SideLink>
                            </li>
                        )}
                        <li>
                            <SideLink to="/">Homepage</SideLink>
                        </li>
                        <li>
                            <SideLink to="/excursions">Excursions</SideLink>
                        </li>
                    </List>

                    <SocialList isOpen={isOpen}>
                        <li>
                            <SideLinkSvg href="/">
                                <FaTwitterSquare
                                    style={socialSvgStyle}
                                    className="media-svg-effect"
                                />
                            </SideLinkSvg>
                        </li>
                        <li>
                            <SideLinkSvg href="/">
                                <FaGithubSquare
                                    style={socialSvgStyle}
                                    className="media-svg-effect"
                                />
                            </SideLinkSvg>
                        </li>
                        <li>
                            <SideLinkSvg href="/">
                                <FaFacebookSquare
                                    style={socialSvgStyle}
                                    className="media-svg-effect"
                                />
                            </SideLinkSvg>
                        </li>
                        <li>
                            <SideLinkSvg href="/">
                                <FaLinkedin
                                    style={socialSvgStyle}
                                    className="media-svg-effect"
                                />
                            </SideLinkSvg>
                        </li>
                        <li>
                            <SideLinkSvg href="/">
                                <FaInstagramSquare
                                    style={socialSvgStyle}
                                    className="media-svg-effect"
                                />
                            </SideLinkSvg>
                        </li>
                    </SocialList>
                </div>
            </FixedBox>
        </div>
    );
};

MenuBtnOut.propTypes = {
    page: PropTypes.string,
    isScrolled: PropTypes.bool,
};

MenuBtnOut.defaultProps = {
    page: "excursion-content",
    isScrolled: false,
};

export default MenuBtnOut;
