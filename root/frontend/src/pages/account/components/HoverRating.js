import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import GradeIcon from "@material-ui/icons/Grade";

import { ReactComponent as FavoriteIcon } from "../../../assets/svgs/star-review.svg";

const labels = {
    0.5: "Useless",
    1: "Useless+",
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

export default function HoverRating() {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <StyledRating
                name="hover-feedback"
                className={classes.sizeSmall}
                value={value}
                precision={0.5}
                size="small"
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                icon={<GradeIcon fontSize="inherit" />}
            />
            {value !== null && (
                <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </div>
    );
}
