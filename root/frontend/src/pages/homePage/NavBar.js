import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import {
    LogoText,
    ProfileBtn,
    Btn,
    BtnLO,
    Container,
    Logo,
} from "./HomePageStyles";

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

export default function NavBar({ authStatus, userName, userPhoto }) {
    const isSmallSmallPhone = useMediaQuery({
        query: "(min-width: 37.5em)",
    });
    return (
        <Container>
            <div className="logo-box">
                <Logo fill={false} />

                {isSmallSmallPhone && <LogoText>explodii</LogoText>}
            </div>

            {!authStatus ? (
                <Btn href="/login">Log In</Btn>
            ) : (
                <BtnLO href="/" onClick={handleLogOut}>
                    Log Out
                </BtnLO>
            )}
            {!authStatus ? (
                <Btn href="/signup">Sign Up</Btn>
            ) : (
                <ProfileBtn href="/account">
                    {/* <div style={profileStyle(userPhoto)}>{}</div> */}
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
