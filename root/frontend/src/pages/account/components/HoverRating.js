import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const labels = {
    0.5: "Awful",
    1: "Awful+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        width: "21rem",
        fontSize: "1.7rem",
    },
    sizeSmall: {
        fontSize: "3rem",
        fill: "red",
    },
});

const StyledRating = withStyles({
    iconFilled: {
        color: "blue",
    },
    iconHover: {
        color: "blue",
    },
    iconEmpty: {
        color: "rgba(128,128,128,.3)",
    },
})(Rating);

export default function HoverRating({ rating, setRating }) {
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    function boxColor() {
        if (hover !== -1) {
            return {
                color:
                    hover < 3.5
                        ? "#cc141e"
                        : "rgba(var(--color-green-special))",
            };
        }
        return {
            color:
                rating < 3.5 ? "#cc141e" : "rgba(var(--color-green-special))",
        };
    }

    return (
        <div className={classes.root}>
            <StyledRating
                name="hover-feedback"
                className={classes.sizeSmall}
                value={rating}
                precision={0.5}
                size="small"
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                // icon={<GradeIcon fontSize="inherit" />}
            />
            {rating !== null && (
                <Box ml={1} style={boxColor()}>
                    {labels[hover !== -1 ? hover : rating]}
                </Box>
            )}
        </div>
    );
}

HoverRating.propTypes = {
    rating: PropTypes.number,
    setRating: PropTypes.func.isRequired,
};

HoverRating.defaultProps = {
    rating: 2,
};
