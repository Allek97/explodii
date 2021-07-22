import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import {
    LogoText,
    ProfileBtn,
    Btn,
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

    @media only screen and (max-width: 56.25em) {
        max-width: 60rem;
        padding-right: 5rem;
    }

    .logo-box {
        display: flex;
        align-items: center;

        margin-right: auto;
    }
`;

export default function NavBar({ authStatus, userName, userPhoto }) {
    const isSmallSmallPhone = useMediaQuery({
        query: "(min-width: 37.5em)",
    });
    return (
        <Container>
            <div className="logo-box">
                <Logo fill />

                {isSmallSmallPhone && <LogoText fill>explodii</LogoText>}
            </div>

            <Btn href="/">HomePage</Btn>

            {!authStatus ? (
                <>
                    <Btn href="/login">Log In</Btn>
                    <Btn href="/signup">Sign Up</Btn>
                </>
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
            )}
        </Container>
    );
}

NavBar.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
};
