import styled from "styled-components";

import "../../../assets/fonts/_global-fonts.scss";
import checked from "../../../assets/svgs/check-logo.svg";

export const SortBtn = styled.a`
    &,
    &:link,
    &:visited {
        position: relative;

        display: flex;
        align-items: center;

        transition: background-color 0.3s linear, padding 0.3s linear;

        margin-left: 0.5rem;

        /* padding: 1rem; */

        /* border-radius: 10rem; */
        border: none;
        color: black;

        text-transform: capitalize;
        text-decoration: none;
        font-size: 1.4rem;
        font-family: Poppins;

        cursor: pointer;
    }

    &::after {
        content: "";

        display: block;
        height: 1rem;
        width: 1rem;

        transition: all 0.3s;
        transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});

        margin-left: 1rem;
        margin-top: 1px;

        /* position: absolute;
        right: 0;
        top: 0; */

        background-image: linear-gradient(to right, #1a5ef3, black);

        mask-image: url(${(props) => props.svg});
        mask-size: cover;
        mask-position: center;
    }
`;

export const SortBox = styled.ul`
    position: absolute;
    top: 2.5rem;
    right: 0rem;
    z-index: 3;

    width: max-content;

    box-shadow: 0px 0px 2rem rgb(0 0 0 / 20%);

    background-color: white;
    border: 1px solid rgba(128, 128, 128, 0.3);
    list-style: none;

    cursor: pointer;
`;

export const SortField = styled.li`
    display: flex;
    align-items: center;

    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.6rem;

    font-family: Poppins, sans-serif;
    font-weight: 400;
    color: rgb(85, 87, 91);

    &:hover {
        background-color: rgba(128, 128, 128, 0.2);
    }

    &::after {
        content: "";

        display: block;
        height: 1.7rem;
        width: 1.7rem;

        margin-left: 1rem;

        background-image: linear-gradient(
            to right,
            rgb(var(--color-green-special)),
            rgb(var(--color-green-special))
        );
        mask-image: url(${(props) => props.isSelected && checked});
        mask-size: cover;
        mask-position: center;
    }
`;
