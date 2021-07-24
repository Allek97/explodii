import styled from "styled-components";
import "../../assets/fonts/_global-fonts.scss";

export const ExcursionInfoSort = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 2rem 2rem 1rem;
    color: #55575b;
    font-size: 1.4rem;
    font-family: Poppins;
    font-weight: 300;

    span:first-child {
        margin-right: auto;
    }

    @media only screen and (max-width: 56.25em) {
        max-width: 50rem;
        margin: 0 auto 2rem;
    }
`;

export const FilterBtn = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        display: flex;
        align-items: center;

        transition: all 0.2s;

        padding: 0.8rem 2rem;
        /* box-shadow: 1px 1px 32px 0 RGBA(255, 255, 255 / 50%); */
        border: 1px solid #ccc;
        border-radius: 5px;

        background-color: white;

        // text-transform: uppercase;
        font-size: 1.4rem;
        font-family: Poppins;
        text-decoration: none;
        text-align: center;
        font-weight: 400;

        color: #2a2d32;
        cursor: pointer;
    }

    &:active,
    &:focus {
        outline: none;
        box-shadow: 0 0.5rem 1rem RGBA(var(--color-black), 0.2);
    }

    &:hover {
        background-color: #dfe0e2;
    }

    &:not(:last-child) {
        margin-right: 2rem;
    }

    @media only screen and (max-width: 56.25em) {
        &,
    &:link,
    &:visited {
        border-radius: 3rem;
        padding: 0.8rem 1rem ;
    }
`;
