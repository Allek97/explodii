import React, { useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
    ReviewBox as DeleteBox,
    ConfirmationBtn,
    CloseReview,
} from "../style/ReviewWriteUpdateStyle";

import closeBtnSvg from "../../../assets/svgs/x.svg";

export const ReviewDelete = (props) => {
    const {
        userReviewObject,
        setIsDeleteReviewOpen,
        setIsDeleteReviewSuccess,
    } = props;

    const { id: reviewId, tour } = userReviewObject;
    const { name: excursionName } = tour;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    function reRender() {
        forceUpdate();
    }
    async function handleDeleteSubmission() {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_URL}/api/v1/reviews/${reviewId}`,
                {
                    withCredentials: true,
                    credentials: "include",
                }
            );

            if (res.statusText === "No Content") {
                window.setTimeout(() => {
                    setIsDeleteReviewOpen(false);
                    setIsDeleteReviewSuccess(true);
                }, 50);
                window.setTimeout(() => {
                    setIsDeleteReviewSuccess(false);
                }, 2000);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <DeleteBox>
            <CloseReview
                svg={closeBtnSvg}
                onClick={() => {
                    setIsDeleteReviewOpen(false);
                }}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: "4rem 6rem",
                }}
            >
                <h1
                    style={{
                        paddingBottom: "1.5rem",
                        fontSize: "2rem",
                        fontWeight: "400",
                        textAlign: "center",
                        textTransform: "unset",
                    }}
                >
                    Do you want to delete your review about {excursionName}{" "}
                    excursion ?
                    {/* {`TODO: SUCCESS MESSAGE AFTER SUCCESSFUL TRANSACTION && SUCCESSFUL REVIEW SUBMISSION`} */}
                </h1>
                <div style={{ display: "flex" }}>
                    <ConfirmationBtn
                        style={{ marginRight: "2rem", width: "12rem" }}
                        onClick={() => {
                            handleDeleteSubmission();
                        }}
                    >
                        Yes
                    </ConfirmationBtn>
                    <ConfirmationBtn
                        style={{ width: "12rem" }}
                        onClick={() => {
                            setIsDeleteReviewOpen(false);
                        }}
                    >
                        No
                    </ConfirmationBtn>
                </div>
            </div>
        </DeleteBox>
    );
};

ReviewDelete.propTypes = {
    setIsDeleteReviewOpen: PropTypes.func.isRequired,
    setIsDeleteReviewSuccess: PropTypes.func.isRequired,
    userReviewObject: PropTypes.shape({
        id: PropTypes.string.isRequired,
        tour: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
