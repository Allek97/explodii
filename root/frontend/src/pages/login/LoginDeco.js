import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const Deco = styled.span`
    position: absolute;

    display: block;

    height: 4rem;

    padding: 0;

    transform: skewY(-5.2deg);

    background-color: rgba(${(props) => props.decoColor}, 0.8);

    @media only screen and (min-width: 56.25em) {
        display: none;
    }
`;

const Deco1 = styled(Deco)`
    top: 60rem;
    left: 0rem;
    /* right: calc(34% + 45rem); */
    width: 28rem;

    z-index: 0;
`;

const Deco2 = styled(Deco)`
    top: 63rem;
    left: 0;
    /* right: calc(34% + 50rem); */
    width: 23rem;

    z-index: 2;
`;

const Deco3 = styled(Deco)`
    top: 30rem;
    right: 0rem;
    /* left: calc(34% + 45rem); */
    width: 28rem;

    z-index: 0;
`;

const Deco4 = styled(Deco)`
    top: 31.5rem;
    right: 0;
    /* left: calc(34% + 50rem); */
    width: 23rem;

    z-index: 0;
`;

export default function LoginDeco() {
    return (
        <>
            <div>
                <Deco1 decoColor="var(--color-blue-special)" />
                <Deco2 decoColor="var(--color-primary-dark)" />
                <Deco3 decoColor="var(--color-primary-dark)" />
                <Deco4 decoColor="var(--color-blue-special)" />
            </div>
        </>
    );
}
