import React from "react";
import styled from "styled-components";

//NOTE: Insipiré par stripe

const Container = styled.div`
    position: absolute;
    left: 0;
    top: 53rem;
    z-index: -1;
    width: 100%;
    /* transform: skewY(-10deg); */
    height: 35rem;

    @media only screen and (max-width: 93.75em) {
        display: none;
    }
`;

const Deco = styled.span`
    position: absolute;

    display: block;

    height: 4rem;

    padding: 0;

    transform: skewY(-10deg);

    background-color: rgba(${(props) => props.decoColor}, 0.8);
`;

const Deco1 = styled(Deco)`
    bottom: 2.43rem;
    left: 0rem;
    right: calc(70% + 35rem);
    z-index: 1;
`;
const Deco2 = styled(Deco)`
    bottom: 6rem;
    left: 8rem;
    right: calc(60% + 48.5rem);
    z-index: 2;
    @media only screen and (max-width: 106.5em) {
        left: 4rem;
    }
`;
const Deco3 = styled(Deco)`
    top: 2.4rem;
    right: 0rem;
    z-index: 1;
    left: calc(50% + 68rem);
`;
const Deco4 = styled(Deco)`
    top: 6rem;
    right: 8rem;
    z-index: 2;
    left: calc(50% + 65.65rem);
    @media only screen and (max-width: 106.5em) {
        right: 4rem;
    }
`;

export default function DecorationSection() {
    return (
        <Container>
            <Deco1 decoColor="var(--color-blue-special)" />
            <Deco2 decoColor="var(--color-primary-dark)" />
            <Deco3 decoColor="var(--color-primary-dark)" />
            <Deco4 decoColor="var(--color-blue-special)" />
        </Container>
    );
}
