/* eslint-disable global-require */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import "../../assets/fonts/_global-fonts.scss";

import checked from "../../assets/svgs/check-logo.svg";

const SortBtn = styled.a`
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

const SortBox = styled.ul`
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

const SortField = styled.li`
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

export default function ExcursionSort(props) {
    // props
    const { setSortField } = props;

    // hooks
    const arrow = require("../../assets/svgs/big-arrow.svg").default;
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [selectedName, setSelectedName] = useState("Featured");

    // list of the fields to be sorted (see Tour Model in backend)
    const sortFields = [
        "createdAt",
        "-ratingsAverage",
        "price",
        "-price",
        "duration",
        "-duration",
        "maxGroupSize",
        "-maxGroupSize",
    ];

    useEffect(() => {
        setSortField(sortFields[selected]);
    }, [selected]);

    return (
        <div style={{ position: "relative", display: "flex" }}>
            <span>Sort by: </span>
            <SortBtn
                svg={arrow}
                isOpen={isOpen}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {selectedName}
            </SortBtn>
            {isOpen && (
                <SortBox>
                    <SortField
                        isSelected={selected === 0}
                        onClick={() => {
                            setSelected(0);
                            setIsOpen(!isOpen);
                            setSelectedName("Featured");
                        }}
                    >
                        Featured
                    </SortField>
                    <SortField
                        isSelected={selected === 1}
                        onClick={() => {
                            setSelected(1);
                            setIsOpen(!isOpen);
                            setSelectedName("Travel Rating");
                        }}
                    >
                        Travel Rating
                    </SortField>
                    <SortField
                        isSelected={selected === 2}
                        onClick={() => {
                            setSelected(2);
                            setIsOpen(!isOpen);
                            setSelectedName("Price (Low to High)");
                        }}
                    >
                        Price (Low to High)
                    </SortField>
                    <SortField
                        isSelected={selected === 3}
                        onClick={() => {
                            setSelected(3);
                            setIsOpen(!isOpen);
                            setSelectedName("Price (High to Low)");
                        }}
                    >
                        Price (High to Low)
                    </SortField>
                    <SortField
                        isSelected={selected === 4}
                        onClick={() => {
                            setSelected(4);
                            setIsOpen(!isOpen);
                            setSelectedName("Duration (Short to Long)");
                        }}
                    >
                        Duration (Short to Long)
                    </SortField>
                    <SortField
                        isSelected={selected === 5}
                        onClick={() => {
                            setSelected(5);
                            setIsOpen(!isOpen);
                            setSelectedName("Duration (Long to Short)");
                        }}
                    >
                        Duration (Long to Short)
                    </SortField>
                    <SortField
                        isSelected={selected === 6}
                        onClick={() => {
                            setSelected(6);
                            setIsOpen(!isOpen);
                            setSelectedName("Participants (Least to Most)");
                        }}
                    >
                        Participants (Least to Most)
                    </SortField>
                    <SortField
                        isSelected={selected === 7}
                        onClick={() => {
                            setSelected(7);
                            setIsOpen(!isOpen);
                            setSelectedName("Participants (Most to Least)");
                        }}
                    >
                        Participants (Most to Least)
                    </SortField>
                </SortBox>
            )}
        </div>
    );
}

ExcursionSort.propTypes = {
    setSortField: PropTypes.func.isRequired,
};
