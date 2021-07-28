import React from "react";
import styled from "styled-components";

const Deco = styled.span`
    position: absolute;

    display: block;

    height: 4rem;

    padding: 0;

    transform: skewY(-5.2deg);

    background-color: rgba(${(props) => props.decoColor}, 0.8);
`;

const Deco1 = styled(Deco)`
    bottom: 40%;
    left: 0rem;
    right: calc(54% + 40rem);
    z-index: 1;

    @media only screen and (max-width: 56.25em) {
        display: none;
    }

    @media only screen and (max-width: 37.5em) {
        display: block;

        bottom: 67%;
        right: 54%;
    }
`;

const Deco2 = styled(Deco)`
    bottom: 37%;
    left: 0rem;
    right: calc(54% + 55rem);

    z-index: 2;

    @media only screen and (max-width: 75em) {
        right: calc(54% + 45rem);
    }

    @media only screen and (max-width: 56.25em) {
        display: none;
    }

    @media only screen and (max-width: 37.5em) {
        display: block;

        bottom: 65%;
        right: calc(54% + 10rem);
    }
`;

const Deco3 = styled(Deco)`
    display: none;

    /* transform: skewY(5.2deg); */

    @media only screen and (max-width: 37.5em) {
        display: block;

        bottom: 35%;
        left: 54%;
        right: 0;
    }
`;

const Deco4 = styled(Deco)`
    display: none;

    /* transform: skewY(5.2deg); */

    @media only screen and (max-width: 37.5em) {
        display: block;

        bottom: 33.5%;
        left: calc(54% + 10rem);
        right: 0;
    }
`;

export default function DecorationSection() {
    return (
        <>
            <Deco1 decoColor="var(--color-blue-special)" />
            <Deco2 decoColor="var(--color-primary-dark)" />
            <Deco3 decoColor="var(--color-primary-dark)" />
            <Deco4 decoColor="var(--color-blue-special)" />
        </>
    );
}
