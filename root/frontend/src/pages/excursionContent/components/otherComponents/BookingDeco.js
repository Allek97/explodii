import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const Deco = styled.span`
    position: absolute;

    display: block;

    height: 40px;

    padding: 0;

    transform: skewY(-5.2deg);

    background-color: rgba(${(props) => props.decoColor}, 0.8);
`;

const Deco1 = styled(Deco)`
    bottom: 41.3rem;
    left: 0rem;
    right: calc(54% + 33rem);
    z-index: 1;
`;

const Deco2 = styled(Deco)`
    bottom: 44rem;
    /* left: 25rem; */
    right: calc(54% + 38rem);

    width: 25rem;

    z-index: 2;

    @media only screen and (max-width: 75em) {
        bottom: 38.5rem;
        width: 18rem;
    }
`;

const Deco3 = styled(Deco)`
    top: 42.6rem;
    right: 0rem;
    left: calc(54% + 33rem);
    z-index: 1;
`;

const Deco4 = styled(Deco)`
    top: 45.3rem;
    /* right: 25rem; */
    left: calc(54% + 38rem);

    width: 25rem;

    z-index: 2;

    @media only screen and (max-width: 75em) {
        top: 44.6rem;
        width: 18rem;
    }
`;

export default function BookingDeco() {
    const isTab = useMediaQuery({ query: "(max-width: 47em)" });
    return (
        <>
            {!isTab && (
                <div>
                    <Deco1 decoColor="var(--color-blue-special)" />
                    <Deco2 decoColor="var(--color-primary-dark)" />
                    <Deco3 decoColor="var(--color-primary-dark)" />
                    <Deco4 decoColor="var(--color-blue-special)" />
                </div>
            )}
        </>
    );
}
