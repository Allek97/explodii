import styled from "styled-components";

//TODO: CREATE GLOBAL NAVBAR
export const HeroSection = styled.section`
    /* height: 100%; */
    display: grid;
    align-items: center;
    grid-template-columns: repeat(12, 1fr);

    height: 88%;
    max-width: 140rem;
    margin: 0 auto;

    @media only screen and (max-width: 56.25em) {
        margin-top: 5rem;
    }
`;
