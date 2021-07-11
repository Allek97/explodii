/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
import React from "react";
import PropTypes from "prop-types";

import {
    StyledDisclaminer,
    DisclaimerSvg,
} from "../style/AccountStyledComponents";

export const Disclaimer = ({ isBookings, isBookingsEmpty }) => {
    const bookingSvg = require("../../../assets/svgs/checking.svg").default;
    const suggestedBookingSvg =
        require("../../../assets/svgs/booking.svg").default;
    const arrowSvg = require("../../../assets/svgs/big-arrow.svg").default;
    const transition =
        require("../../../assets/img/home/transition.png").default;

    function disclaimerContent() {
        console.log(isBookingsEmpty);
        if (isBookings) {
            if (isBookingsEmpty) {
                return `It looks like you didn't booked any excursions in our service ! 
                We put in place a recommendation section above for our most cost-effective excursions.`;
            }
            return `Take a look on your bookings ! We hope that we offered you the best service possible,
            don't forget to share your excursion's experience with a review !`;
        }

        return `We have
        put together our most affordable excursions for you. Take a look
        below ! Don't miss out on those offers ! `;
    }
    return (
        <StyledDisclaminer transition={transition} arrow={arrowSvg}>
            <DisclaimerSvg
                svg={isBookings ? bookingSvg : suggestedBookingSvg}
            />
            <span>{disclaimerContent()}</span>
        </StyledDisclaminer>
    );
};

Disclaimer.propTypes = {
    isBookings: PropTypes.bool.isRequired,
    isBookingsEmpty: PropTypes.bool.isRequired,
};
