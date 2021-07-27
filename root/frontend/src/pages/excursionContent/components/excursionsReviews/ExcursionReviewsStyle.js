import styled from "styled-components";

export const ExcursionReviewContainer = styled.div`
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 174rem;
    margin: 0 auto;

    padding: 15rem 0;

    overflow: hidden;
`;

export const RotativeBox = styled.div`
    position: relative;
    z-index: 4;

    transition: transform 5s;

    max-width: calc(
        3 *
            (
                var(--excursion-review-box-width-1) +
                    var(--excursion-review-box-margin)
            ) + 1.1vw
    );

    padding: 9rem 0 9rem 2vw;

    overflow: hidden;
    transform: translateX(0);

    @media only screen and (max-width: 56.25em) {
        max-width: calc(
            2 *
                (
                    var(--excursion-review-box-width-2) +
                        var(--excursion-review-box-margin)
                ) + 0.9vw
        );
    }

    @media only screen and (max-width: 37.5em) {
        max-width: calc(
            (
                    var(--excursion-review-box-width-3) +
                        var(--excursion-review-box-margin-3)
                ) - 2vw
        );
    }

    & > div {
        display: flex;
        width: max-content;

        transition: transform 3s ease;
    }
`;

export const UserNameStyled = styled.p`
    position: relative;

    color: rgb(var(--color-blue-special));
    font-size: 2rem;

    &::before,
    &::after {
        content: "";

        display: block;

        height: 7px;
        width: 7px;

        border-radius: 50%;
        background-color: rgb(var(--color-blue-special));
    }

    &::before {
        position: absolute;
        top: 1.2rem;
        left: -2rem;
    }
    &::after {
        position: absolute;
        top: 1.2rem;
        right: -2rem;
    }
`;

export const Tracker = styled.span`
    display: block;

    height: 1rem;
    width: 1rem;
    margin-right: 1rem;
    border-radius: 50%;

    background-color: ${(props) =>
        props.isSelected
            ? "rgb(var(--color-blue-special))"
            : "rgb(var(--color-grey-dark))"};

    cursor: pointer;
`;
