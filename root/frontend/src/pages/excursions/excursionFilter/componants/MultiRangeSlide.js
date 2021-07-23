import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./_multiRangeSlider.scss";

const MultiRangeSlider = ({
    min,
    max,
    setPriceRangeLeft,
    setPriceRangeRight,
    resetRange,
}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        minValRef.current = 300;
        maxValRef.current = 3000;
        setMinVal(300);
        setMaxVal(3000);
    }, [resetRange]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // useEffect(() => {
    //     const minPercent = getPercent(minValRef.current);
    //     const maxPercent = getPercent(maxVal);

    //     if (range.current) {
    //         range.current.style.width = `${maxPercent - minPercent}%`;
    //     }
    // }, [priceRangeLeft, priceRangeRight]);

    const updatePrice = (event, position) => {
        event.preventDefault();
        if (position === "left") {
            const value = Math.min(Number(event.target.value), maxVal - 1);

            setPriceRangeLeft(value);
        }

        if (position === "right") {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setPriceRangeRight(value);
        }
    };

    return (
        <div className="range-container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(
                        Number(event.target.value),
                        maxVal - 1
                    );
                    setMinVal(value);
                    minValRef.current = value;
                }}
                onMouseUp={(event) => {
                    updatePrice(event, "left");
                }}
                onTouchEnd={(event) => {
                    updatePrice(event, "left");
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(
                        Number(event.target.value),
                        minVal + 1
                    );
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                onMouseUp={(event) => {
                    updatePrice(event, "right");
                }}
                onTouchEnd={(event) => {
                    updatePrice(event, "right");
                }}
                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value">${minVal}</div>
                <div className="slider__right-value">${maxVal}</div>
            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    setPriceRangeLeft: PropTypes.func.isRequired,
    setPriceRangeRight: PropTypes.func.isRequired,
    resetRange: PropTypes.bool.isRequired,
};

export default MultiRangeSlider;
