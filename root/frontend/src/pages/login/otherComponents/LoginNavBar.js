/* eslint-disable no-constant-condition */
import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import MenuBtnOut from "../../../componants/menuBtnOut/MenuBtnOut";
import { LogoText, Btn, Logo } from "../../../globalStyles/NavBarStyles";

const Container = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    max-width: 105rem;
    width: 90vw;
    margin: 0 auto;

    @media only screen and (max-width: 56.25em) {
        max-width: 48rem;
        width: 85vw;
    }

    .logo-box {
        display: flex;
        align-items: center;

        margin-right: auto;
    }
`;

export default function NavBar() {
    const isSmallPhone = useMediaQuery({
        query: "(max-width: 25em)",
    });

    const isTabPort = useMediaQuery({
        query: "(max-width: 56.25em)",
    });

    const logSignStyle = isSmallPhone ? { padding: "0.8rem 2.5rem" } : null;

    const darkStyle = isTabPort
        ? {
              backgroundImage: `linear-gradient( 76deg, rgb(var(--color-main-1)), 
        rgb(var(--color-main-2)) 50% )`,
          }
        : null;

    return (
        <Container>
            <div className="logo-box">
                <Logo fill={false ? 1 : 0} style={darkStyle} />

                <LogoText fill={false ? 1 : 0} style={darkStyle}>
                    explodii
                </LogoText>
            </div>

            {!isTabPort && (
                <>
                    <Btn style={logSignStyle} to="/">
                        Homepage
                    </Btn>
                    <Btn style={logSignStyle} to="/excursions">
                        Our Excursions
                    </Btn>
                </>
            )}

            {isTabPort && <MenuBtnOut page="login" isScrolled />}
        </Container>
    );
}
