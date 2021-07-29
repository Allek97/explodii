/* eslint-disable no-constant-condition */
import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MenuBtn from "../../../../componants/menuBtn/MenuBtn";
import MenuBtnOut from "../../../../componants/menuBtnOut/MenuBtnOut";

import { LogoText, Btn, Logo } from "../../../../globalStyles/NavBarStyles";

import { ReactComponent as HomeSvg } from "../../../../assets/svgs/home.svg";

const Header = styled.div`
    position: ${(props) => (props.isScrolled ? "fixed" : "absolute")};
    top: 0;
    left: 0;

    z-index: 6;

    display: flex;
    align-items: center;

    margin: 0 auto;

    transition: all 0.3s ease-in;

    width: 100%;
    padding: 0 2rem;

    box-shadow: ${(props) =>
        props.isScrolled ? "0 0 5px rgb(0 0 0 / 20%);" : "none"};

    background-color: ${(props) =>
        props.isScrolled ? "white" : "transparent"};
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    margin-right: auto;

    max-width: 150rem;
    padding: 0 2rem;
    margin: 0 auto;

    .logo-box {
        display: flex;
        align-items: center;

        margin-right: auto;

        & > * {
            transition: all 0.5s ease-in;

            transform: ${(props) =>
                props.isScrolled ? "scale(1.1)" : "scale(1)"};

            background-image: linear-gradient(
                76deg,
                ${(props) =>
                    props.isScrolled ? "rgb(var(--color-main-1))" : "white"},
                ${(props) =>
                        props.isScrolled ? "rgb(var(--color-main-2))" : "white"}
                    50%
            ) !important;
        }
    }

    & > a {
        &,
        &:link,
        &:visited {
            background-image: linear-gradient(
                76deg,
                ${(props) =>
                    props.isScrolled
                        ? "rgb(var(--color-main-1))"
                        : "transparent"},
                ${(props) =>
                        props.isScrolled
                            ? "rgb(var(--color-main-2))"
                            : "transparent"}
                    50%
            );
        }
    }
`;

export default function ExcursionContentNavBar({
    authStatus,
    userName,
    userPhoto,
    isScrolled,
}) {
    const isSmallPhone = useMediaQuery({
        query: "(max-width: 29em)",
    });

    const isPhone = useMediaQuery({
        query: "(max-width: 37.5em)",
    });

    const isTabPort = useMediaQuery({
        query: "(max-width: 56.25em)",
    });

    const isTabLand = useMediaQuery({
        query: "(max-width: 75em)",
    });

    const darkStyle = {
        backgroundImage: `linear-gradient( 76deg, rgb(var(--color-main-1)), 
        rgb(var(--color-main-2)) 50% )`,
    };

    return (
        <Header isScrolled={isScrolled}>
            <Container isScrolled={isScrolled}>
                <div className="logo-box">
                    <Logo fill={false ? 1 : 0} style={darkStyle} />
                    {!authStatus && (
                        <LogoText fill={false ? 1 : 0} style={darkStyle}>
                            explodii
                        </LogoText>
                    )}
                    {authStatus && !isPhone && (
                        <LogoText fill={false ? 1 : 0} style={darkStyle}>
                            explodii
                        </LogoText>
                    )}
                </div>

                {authStatus && !isSmallPhone && <Btn href="/">Homepage</Btn>}
                {authStatus && isSmallPhone && (
                    <Btn
                        href="/"
                        style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                            borderRadius: "50%",
                        }}
                    >
                        <HomeSvg
                            style={{
                                height: "1.9rem",
                                width: "1.9rem",
                                fill: "white",
                                paddingTop: "3px",
                            }}
                        />
                    </Btn>
                )}

                {authStatus && (
                    <MenuBtn
                        isScrolled={isScrolled}
                        userName={userName}
                        userPhoto={userPhoto}
                        page="excursion-content"
                    />
                )}

                {!authStatus && !isTabLand && (
                    <>
                        <Btn href="/">Homepage</Btn>
                        <Btn href="/excursions">Excursions</Btn>
                        <Btn href="/login">Log In</Btn>
                        <Btn href="/signup">Sign Up</Btn>
                    </>
                )}

                {!authStatus && isTabLand && (
                    <MenuBtnOut
                        isScrolled={isScrolled}
                        page="excursion-content"
                    />
                )}
            </Container>
        </Header>
    );
}

ExcursionContentNavBar.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    isScrolled: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};
