const setReviewStarsBg = (rating) => {
    if (rating) {
        let decimal = rating - Math.floor(rating);
        decimal *= 100;
        return {
            backgroundImage: `linear-gradient(
            to right,
            rgba(85,96,159,1) ${decimal}%,
            rgba(0,0,0,0.25) ${decimal}%
        )`,
        };
    }

    return {
        backgroundImage: `linear-gradient(
        to right bottom,
        rgba(var(--color-primary-light),0.9),
        rgba(var(--color-primary-dark),0.9)
    )`,
    };
};

export function setStarRatingStyle(value, el) {
    if (el === Math.ceil(value)) {
        const decimal = value - Math.floor(value);
        if (decimal > 0) {
            return setReviewStarsBg(value);
        }
        return setReviewStarsBg();
    }
    if (el > value) {
        return setReviewStarsBg(1);
    }

    return setReviewStarsBg();
}
