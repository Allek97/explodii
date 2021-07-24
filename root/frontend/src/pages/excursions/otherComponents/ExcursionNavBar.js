/* eslint-disable no-constant-condition */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MenuBtn from "../../../componants/menuBtn/MenuBtn";

import { handleLogOut } from "../../../componants/utils/handleLogOut";

import {
    LogoText,
    ProfileBtn,
    Btn,
    BtnLO,
    Logo,
} from "../../../globalStyles/NavBarStyles";

const photoStyle = {
    width: "3.8rem",
    borderRadius: "18px",
};

// Functions

const userImg = (photo) => {
    return `${process.env.REACT_APP_URL}/api/v1/users/images/${photo}`;
};

const Container = styled.div`
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;

    padding-top: 1rem;
    max-width: 140rem;

    margin: 0 auto;

    @media only screen and (max-width: 75em) {
        max-width: 100rem;
    }
    @media only screen and (max-width: 56.25em) {
        max-width: 50rem;
    }

    .logo-box {
        display: flex;
        align-items: center;

        margin-right: auto;
    }
`;

export default function NavBar({ authStatus, userName, userPhoto }) {
    const isTabPort = useMediaQuery({
        query: "(max-width: 56.25em)",
    });
    const isTabLand = useMediaQuery({
        query: "(max-width: 75em)",
    });
    const isSmallPhone = useMediaQuery({
        query: "(min-width: 22.5em)",
    });

    const darkStyle = {
        backgroundImage: `linear-gradient( 76deg, rgb(var(--color-main-1)), 
        rgb(var(--color-main-2)) 50% )`,
    };

    return (
        <Container>
            <div className="logo-box">
                <Logo fill={true ? 1 : 0} style={darkStyle} />

                {isSmallPhone && (
                    <LogoText fill={true ? 1 : 0} style={darkStyle}>
                        explodii
                    </LogoText>
                )}
            </div>
            {authStatus && isTabLand && !isTabPort && (
                <BtnLO href="/" onClick={handleLogOut}>
                    Log Out
                </BtnLO>
            )}
            {!isTabPort && <Btn href="/">HomePage</Btn>}

            {!authStatus && (
                <>
                    <Btn href="/login">Log In</Btn>
                    <Btn href="/signup">Sign Up</Btn>
                </>
            )}

            {authStatus &&
                (isTabPort ? (
                    <MenuBtn
                        isScrolled
                        userName={userName}
                        userPhoto={userPhoto}
                    />
                ) : (
                    <ProfileBtn href="/account">
                        <img
                            src={userImg(userPhoto)}
                            alt="profile"
                            style={photoStyle}
                        />
                        <span
                            style={{
                                padding: "0 2rem",
                                paddingLeft: "1.2rem",
                                minWidth: "6rem",
                            }}
                        >{`${userName}`}</span>
                    </ProfileBtn>
                ))}
        </Container>
    );
}

NavBar.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};
