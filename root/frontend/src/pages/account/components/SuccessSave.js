/* eslint-disable global-require */
import React from "react";
import PropTypes from "prop-types";

import { SuccessSaveDiv } from "../style/AccountStyledComponents";

export const SuccessSave = (props) => {
    const successSvg = require("../../../assets/svgs/check-o.svg").default;

    const {
        isSettings,
        setDisplaySuccessMsgSet,
        setDisplaySuccessMsgPW,
    } = props;

    const msg = isSettings
        ? "Your modifications have been saved"
        : "Your password has been updated";

    return (
        <SuccessSaveDiv
            svg={successSvg}
            onClick={() =>
                isSettings
                    ? setDisplaySuccessMsgSet(false)
                    : setDisplaySuccessMsgPW(false)
            }
        >
            <p
                style={{
                    fontSize: "1.7rem",
                    fontWeight: "bolder",
                    color: "rgba(0,0,0,.7)",
                }}
            >
                Success
            </p>
            <p
                style={{
                    fontSize: "1.1rem",
                    color: "rgb(var(--color-grey-dark-2))",
                }}
            >
                {msg}
            </p>
        </SuccessSaveDiv>
    );
};

SuccessSave.propTypes = {
    isSettings: PropTypes.bool.isRequired,
    setDisplaySuccessMsgSet: PropTypes.func.isRequired,
    setDisplaySuccessMsgPW: PropTypes.func.isRequired,
};
