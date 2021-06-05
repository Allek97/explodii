import React from "react";
import styled from "styled-components";

const Deco = styled.span`
    position: absolute;

    display: block;

    height: 4rem;

    padding: 0;

    transform: skewY(-10deg);

    background-color: rgba(${(props) => props.decoColor}, 0.8);
`;

export default function DecorationSection() {
    return (
        <>
            <Deco
                style={{
                    bottom: "2.43rem",
                    left: "0rem",
                    zIndex: "1",
                    width: "27rem",
                }}
                decoColor="var(--color-blue-special)"
            />
            <Deco
                style={{
                    bottom: "6rem",
                    left: "10rem",
                    zIndex: "2",
                    width: "20rem",
                }}
                decoColor="var(--color-primary-dark)"
            />
            <Deco
                style={{
                    top: "2.4rem",
                    right: "0rem",
                    zIndex: "1",
                    width: "27rem",
                }}
                decoColor="var(--color-primary-dark)"
            />
            <Deco
                style={{
                    top: "6rem",
                    right: "10rem",
                    zIndex: "2",
                    width: "20rem",
                }}
                decoColor="var(--color-blue-special)"
            />
        </>
    );
}
