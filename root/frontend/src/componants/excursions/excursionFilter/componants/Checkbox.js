import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import "../../../../assets/fonts/_global-fonts.scss";

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2.5px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div`
    position: relative;

    display: flex;
    width: 2rem;
    height: 2rem;

    transition: ${(props) => (props.checked ? "all .3s" : "none")};

    box-shadow: ${(props) =>
        props.checked ? "0px 0px 2rem rgb(0 0 0 / 25%)" : "none"};

    border-radius: ${(props) =>
        props.borderRadius ? `${props.borderRadius}%` : "3px"};

    border: ${(props) => (props.checked ? "none" : "2px solid #767676")};

    background: ${(props) =>
        props.checked ? "rgb(var(--color-blue-special))" : "white"};

    ${Icon} {
        transform: ${(props) => (props.checked ? "scale(1)" : "scale(0)")};
        transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
        position: absolute;
        left: 1px;
    }
`;

function Checkbox(props) {
    const { checked, handleCheckboxChange, borderRadius } = props;

    return (
        <CheckboxContainer onClick={handleCheckboxChange}>
            <HiddenCheckbox checked={checked} onChange={handleCheckboxChange} />
            <StyledCheckbox checked={checked} borderRadius={borderRadius}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="18 7 9 17 4 12" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    );
}

export default Checkbox;

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    borderRadius: PropTypes.number,
};

Checkbox.defaultProps = {
    borderRadius: 0,
};
