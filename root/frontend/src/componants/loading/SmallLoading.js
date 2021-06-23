import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% {
        transform: rotate(0deg) scale(1);
    }
    50% {
        transform: rotate(180deg) scale(1.1);
    }
    100% {
        transform: rotate(360deg) ;
    }
`;

const Spinner1 = styled.div`
    position: relative;
    width: 4rem;
    height: 4rem;
    border: solid rgba(0, 0, 0, 0.025) 1.4px;

    border-radius: 50%;
`;

const Spinner2 = styled.div`
    position: absolute;
    top: -1.5px;
    bottom: -1.5px;

    animation: ${spin} 1s linear infinite;

    width: 4rem;
    height: 4rem;

    border-top: solid rgba(var(--color-blue-special), 0.7) 1.5px;
    border-right: solid rgba(var(--color-blue-special), 0.7) 1.5px;

    border-radius: 50%;
`;

export default function PageLoading() {
    return (
        <Spinner1>
            <Spinner2 />
        </Spinner1>
    );
}
