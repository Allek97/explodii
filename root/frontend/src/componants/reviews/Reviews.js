/* eslint-disable import/no-dynamic-require */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./_reviews.scss";
import "../../base/_animations.scss";

export default function Reviews() {
    // VARIABLES

    const [reviews, setReviews] = useState([]);

    // This hook state will track which review should be displayed
    const [revIdx, setRevIdx] = useState(0);

    // This state hook will trigger revIdx change
    const [isMount, setMount] = useState(true);

    // Keep track on which direction the review will be coming/dissapearing
    const [direction, setDirection] = useState("right");

    // Keep track of the type of animation
    const [animationState, setAnimation] = useState(true);

    // Use this mutable hook to skip the first render voir: https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    const initialRender = useRef(true);
    // colors
    const rootColor = getComputedStyle(document.body);
    const BgColor1 = rootColor.getPropertyValue("--color-primary-light");
    const BgColor2 = rootColor.getPropertyValue("--color-primary-dark");

    // Animations
    // Mount
    const slideFromLeft = {
        animation: "slideFromLeft 0.7s ease-in 1",
    };
    const slideFromRight = {
        animation: "slideFromRight 0.7s ease-in 1",
    };

    // Unmount
    const slideToLeft = {
        animation: "slideToLeft 0.7s linear 1",
    };
    const slideToRight = {
        animation: "slideToRight 0.7s linear 1",
    };

    // STYLE FUNCTIONS

    // https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_gradient-linear,
    // m'a fait comprendre en profondeur les linear-gradiants
    const setReviewStarsBg = (reviewVal) => {
        if (reviewVal) {
            let decimal = reviewVal - Math.floor(reviewVal);
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
            rgba(${BgColor1},0.8),
            rgba(${BgColor2},0.8)
        )`,
        };
    };

    const setBackgroundUrlStyle = (tourBg) => {
        // eslint-disable-next-line global-require
        const userImg = `${process.env.REACT_APP_URL}/api/v1/users/images/${tourBg}`;
        return {
            backgroundImage: `linear-gradient(
                to right,
                rgba(13, 13, 63, 0.25),
                rgba(11, 11, 59, 0.25)
            ),url(${userImg})`,
        };
    };

    // LOGIC FUNCTIONS
    const switchReviewIdx = (flow) => {
        // console.log("Changing Idx");
        if (flow === "right") {
            if (revIdx === reviews.length - 2) {
                setRevIdx(0);
                return;
            }
            setRevIdx(revIdx + 2);
            return;
        }
        if (revIdx === 0) {
            setRevIdx(reviews.length - 2);
        } else {
            setRevIdx(revIdx - 2);
        }
    };
    // mount/unmount style
    const setMountStyle = (stateAnimation, flow) => {
        //NOTE: Deal with react strict mode
        if (stateAnimation) {
            return flow === "right" ? slideFromLeft : slideFromRight;
        }
        return flow === "right" ? slideToRight : slideToLeft;
    };

    // Fonction to return unique reviews from unique users
    const getUnique = (obj, filtProp) => {
        const uniqueObj = new Map();

        obj.forEach((el) => {
            if (uniqueObj.has(el[filtProp])) {
                if (Math.random < 0.5) {
                    uniqueObj.set(el.user[filtProp], el);
                }
            } else {
                uniqueObj.set(el.user[filtProp], el);
            }
        });
        // console.log(uniqueObj);
        return [...uniqueObj.values()];
    };

    // Request the reviews from my RestAPI while server is running
    useEffect(() => {
        async function fetchApi() {
            try {
                // BUG: https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
                // NOTE: I need to make requests to backend that will store my sensitive variables so I can get the data I need, react .env file is not secure

                // TODO: FIND A WAY TO GET RESTRICTED DATA FREOM BACKEND WITHOUT JWT / LOGIN // FAIT

                // const body = {
                //     email: "admin@natours.io",
                //     password: process.env.REACT_APP_ADMIN_PASSWORD,
                //     adminCode: process.env.REACT_APP_ADMIN_SPECIAL_CODE, // NOTE: Not secure everyone can view it in dev tools
                // };
                // // On doit login first pour recevoir le token
                // const loginRes = await axios.post(
                //     "http://localhost:5001/api/v1/users/login",
                //     body,
                //     { withCredentials: true, credentials: "include" } // For allowing cookie stooring
                // );
                // const { token } = loginRes.data;
                // const config = {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // };
                const reviewsRes = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/reviews/`
                );
                let reviewsData = reviewsRes.data.data;
                // Get reviews from unique users
                reviewsData = getUnique(reviewsData, "name");

                setReviews(reviewsData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchApi();
    }, []);

    // Delay The unmount of my componant(review)
    useEffect(() => {
        let timeOut1;
        let timeOut2;
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            // console.log("second render");
            timeOut1 = setTimeout(() => {
                switchReviewIdx(direction);
            }, 650);

            timeOut2 = setTimeout(() => {
                setAnimation(true);
            }, 600);
        }
        return () => {
            clearTimeout(timeOut1);
            clearTimeout(timeOut2);
        };
    }, [isMount]);

    // Set interval for reviews to rotate every now and then
    useEffect(() => {
        const interval = setInterval(() => {
            switchReviewIdx("right");
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    });

    // console.log(reviews);
    // console.log(revIdx);

    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <>
            <div className="reviews-container">
                <span
                    className="arrow-left"
                    role="button"
                    aria-label="Change review"
                    tabIndex={0}
                    onClick={() => {
                        setAnimation(false);
                        setDirection("left");
                        setMount(!isMount);
                    }}
                    onKeyDown={() => {
                        // switchReviewIdx("left");
                    }}
                />
                <div className="reviewBox">
                    {reviews.map((review, idx) => {
                        return (
                            (idx === revIdx || idx === revIdx + 1) && (
                                <div
                                    key={uuidv4()}
                                    id={uuidv4()}
                                    className="review"
                                    style={setMountStyle(
                                        animationState,
                                        direction
                                    )}
                                >
                                    {/* <img
                                    // eslint-disable-next-line global-require
                                    src={require("../../assets/img/users/user-2.jpg").default}
                                    alt="user"
                                    className="review__picture"
                            /> */}
                                    <div
                                        className="review__picture"
                                        style={setBackgroundUrlStyle(
                                            review.user.photo
                                        )}
                                    >
                                        {}
                                    </div>
                                    <div className="review__text">
                                        {review.review}
                                    </div>
                                    <div className="review__name">
                                        {review.user.name}
                                    </div>
                                    <div className="review__rating">
                                        <ul className="starbox">
                                            {/* {FIXME: Not working proprely} */}
                                            {[1, 2, 3, 4, 5].map((el) => {
                                                // console.log(
                                                //     `${review.user.name}: ${review.rating}`
                                                // );
                                                return (
                                                    <span
                                                        key={uuidv4()}
                                                        id={uuidv4()}
                                                        className="starbox__star"
                                                        style={
                                                            review.rating >= el
                                                                ? setReviewStarsBg()
                                                                : setReviewStarsBg(
                                                                      review.rating
                                                                  )
                                                        }
                                                    >
                                                        {}
                                                    </span>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>

                <span
                    className="arrow-right"
                    role="button"
                    aria-label="Change review"
                    tabIndex={0}
                    onClick={() => {
                        setAnimation(false);
                        setDirection("right");
                        setMount(!isMount);
                    }}
                    onKeyDown={() => {}}
                />
            </div>
            <div className="review-tracker">
                {/* TODO: Add setTimout to rotate reviews */}
                {reviews.map((el, idx) => {
                    if (!(idx % 2)) {
                        // console.log(`revIdx: ${revIdx} \n index:${idx}`);
                        return (
                            <div
                                key={uuidv4()}
                                id={uuidv4()}
                                role="button"
                                aria-label="Change review"
                                tabIndex={0}
                                onClick={() => {
                                    setRevIdx(idx);
                                }}
                                onKeyDown={() => {
                                    // TODO: Functions for changing reviews with keyboards
                                }}
                                className={
                                    idx === revIdx
                                        ? "carousel carousel--selected"
                                        : "carousel"
                                }
                            >
                                {}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </>
    );
}
