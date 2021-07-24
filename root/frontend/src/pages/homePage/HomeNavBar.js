/* eslint-disable no-constant-condition */
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import MenuBtn from "../../componants/menuBtn/MenuBtn";

import {
    LogoText,
    ProfileBtn,
    Btn,
    BtnLO,
    Logo,
} from "../../globalStyles/NavBarStyles";

const photoStyle = {
    width: "3.8rem",
    borderRadius: "18px",
};

// Functions

const userImg = (photo) => {
    return `${process.env.REACT_APP_URL}/api/v1/users/images/${photo}`;
};

const handleLogOut = async (e) => {
    e.preventDefault();
    try {
        await axios.get(`${process.env.REACT_APP_URL}/api/v1/users/logout`, {
            withCredentials: true,
        });
        window.location.assign("/");
    } catch (err) {
        console.log(err.response.data.message);
    }
};

const Container = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    padding-top: 1rem;
    padding-right: 3rem;
    max-width: 140rem;
    margin: 0 auto;

    @media only screen and (max-width: 56.25em) {
        max-width: 60rem;
        /* padding-right: 11rem; */
        /* margin: auto; */
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
    const isPhone = useMediaQuery({
        query: "(max-width: 37.5em)",
    });
    const isSmallPhone = useMediaQuery({
        query: "(max-width: 22.5em)",
    });
    return (
        <Container>
            <div className="logo-box">
                <Logo fill={false ? 1 : 0} />

                {!isSmallPhone && (
                    <LogoText fill={false ? 1 : 0}>explodii</LogoText>
                )}
            </div>

            {!authStatus && (
                <>
                    <Btn href="/login">Log In</Btn>
                    <Btn href="/signup">Sign Up</Btn>
                </>
            )}

            {authStatus && !isTabPort && (
                <BtnLO href="/" onClick={handleLogOut}>
                    Log Out
                </BtnLO>
            )}
            {authStatus &&
                (isTabPort ? (
                    <MenuBtn
                        isScrolled={false}
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
