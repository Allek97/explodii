import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

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

const Overlay = styled.div`
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition-duration: 0.15s;
    transition-duration: 0.15s;

    width: 100%;
    height: 100%;

    background-color: white;
`;

const Spinner1 = styled.div`
    position: relative;
    width: 6rem;
    height: 6rem;
    border: solid rgba(0, 0, 0, 0.025) 1.4px;

    border-radius: 50%;
`;

const Spinner2 = styled.div`
    position: absolute;
    top: -1.5px;
    bottom: -1.5px;

    animation: ${spin} 0.6s linear infinite;

    width: 6rem;
    height: 6rem;

    border-top: solid rgba(var(--color-blue-special), 0.7) 1.8px;
    border-bottom: solid rgba(var(--color-blue-special), 0.7) 1.8px;
    /* border-right: solid rgba(var(--color-blue-special), 0.7) 1.8px; */

    border-radius: 50%;
`;

export default function Loading({ loadingTime }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setIsLoading(false);
        }, loadingTime);
        return () => {
            clearTimeout(timeOut);
        };
    }, []);
    return (
        <>
            {isLoading && (
                <Overlay>
                    <Spinner1>
                        <Spinner2 />
                    </Spinner1>
                </Overlay>
            )}
        </>
    );
}

Loading.propTypes = {
    loadingTime: PropTypes.number,
};

Loading.defaultProps = {
    loadingTime: 600,
};
