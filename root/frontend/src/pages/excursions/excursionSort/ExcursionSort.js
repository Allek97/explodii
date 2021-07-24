/* eslint-disable global-require */
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import { SortBox, SortBtn, SortField } from "./ExcursionSortStyles";

import useOuterClick from "../../../componants/utils/UseOuterClick";

export default function ExcursionSort(props) {
    // props
    const { setSortField } = props;

    // hooks
    const arrow = require("../../../assets/svgs/big-arrow.svg").default;
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [selectedName, setSelectedName] = useState("Featured");
    const isSmallPhone = useMediaQuery({ query: "(max-width: 22em )" });

    //close when click outside
    const componentWrapper = useRef(null);

    const closeComponent = () => {
        setIsOpen(false);
    };

    useOuterClick(componentWrapper, closeComponent);

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
        <div
            ref={componentWrapper}
            style={{ position: "relative", display: "flex" }}
        >
            {!isSmallPhone && <span>Sort by: </span>}
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
