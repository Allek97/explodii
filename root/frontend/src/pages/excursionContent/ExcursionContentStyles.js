import styled from "styled-components";

export const HeaderPage = styled.header`
    position: relative;

    z-index: 5;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 85vh;
    padding: 0 2rem;

    background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-primary-light), 0.85),
            rgba(var(--color-primary-dark), 0.85) 50%
        ),
        url(${(props) => props.imageCover});

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    clip-path: polygon(
        0 0,
        100% 0,
        100% calc(100% - (var(--excursion-clip-height))),
        0 100%
    );
`;

export const Heading = styled.h1`
    display: block;

    font-size: 4.5rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: 300;

    color: #fff;
    span {
        padding: 0.5rem 1.5rem;

        background-image: linear-gradient(
            to right bottom,
            rgba(var(--color-primary-light), 0.6),
            rgba(var(--color-primary-dark), 0.6) 50%
        );

        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
        /* background-image: linear-gradient(
            76deg,
            rgba(var(--color-main-1), 0.9),
            rgba(var(--color-main-2), 0.9) 50%
        ); */
    }
`;

export const WithLogo = styled.span`
    display: flex;
    align-items: center;

    font-size: 1.5rem;
    color: white;

    &::before {
        content: "";

        height: 1.9rem;
        width: 1.9rem;
        margin-right: 5px;

        background-image: linear-gradient(
            to right,
            ${(props) => (props.leftGradiant ? props.leftGradiant : "white")},
            ${(props) => (props.rightGradiant ? props.rightGradiant : "white")}
        );

        box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.6);

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
    }
`;

export const InfoHeading = styled.h1`
    position: relative;

    display: inline-block;

    font-size: 2.25rem;
    text-transform: uppercase;
    font-weight: 700;
    background-image: linear-gradient(
        76deg,
        rgb(var(--color-primary-light)),
        rgb(var(--color-primary-light))
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 0.1rem;
    line-height: 1.3;
`;

export const AboutSvgBox = styled.div`
    position: absolute;

    top: 18rem;
    right: 20rem;
    height: 10rem;
    width: 13rem;
    padding: 1rem;
    box-shadow: var(--shadow-dark);
    border-radius: 3rem;

    background-image: url(${(props) => props.svg});
    background-size: cover;
    background-position: center;
`;
