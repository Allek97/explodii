import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import useDelayUnmount from "../utils/UseDelayunmount";

import "./_reviews.scss";
import "../../base/_animations.scss";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    // This hook state will track which review should be displayed
    const [revIdx, setRevIdx] = useState(0);
    // This state hook keep track if the componant should be mounted or unmounted
    const [isMount, setMount] = useState(true);
    // This state hook keep track if the componant should be mounted or unmounted
    const [isComing, setComing] = useState(false);
    // Keep track on which direction the review will be coming/dissapearing
    const [direction, setDirection] = useState("right");
    // Use this mutable hook to skip the first render voir: https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    const initialRender = useRef(true);
    // colors
    const rootColor = getComputedStyle(document.body);
    const BgColor1 = rootColor.getPropertyValue("--color-primary-light");
    const BgColor2 = rootColor.getPropertyValue("--color-primary-dark");

    // Animations
    // Mount
    const slideFromLeft = {
        animation: "slideFromLeft 1s ease-in 1",
    };
    const slideFromRight = {
        animation: "slideFromRight 1s ease-in 1",
    };
    // Unmount
    const slideToLeft = { animation: "slideToLeft 1s ease-in 1" };
    const slideToRight = { animation: "slideToRight 1s ease-in 1" };

    // functions
    const setReviewStarsBg = (reviewVal) => {
        if (reviewVal) {
            let decimal = reviewVal - Math.floor(reviewVal);
            decimal *= 100;
            return {
                backgroundImage: `linear-gradient(
                to right,
                rgba(85,96,159,1) ${decimal}% ,
                rgba(0,0,0,0.25) ${100 - decimal}%
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

    const switchReviewIdx = (flow) => {
        console.log("Changing Idx");
        if (flow === "right") {
            if (revIdx === reviews.length - 1) {
                setRevIdx(0);
                return;
            }
            setRevIdx(revIdx + 1);
            return;
        }
        if (revIdx === 0) {
            setRevIdx(reviews.length - 1);
        } else {
            setRevIdx(revIdx - 1);
        }
    };
    // mount/unmount style
    const setMountStyle = (mountState, flow) => {
        if (!mountState) {
            return flow === "left" ? slideToLeft : slideToRight;
        }
    };

    // Request the reviews from my RestAPI while server is running
    useEffect(async () => {
        try {
            const body = {
                email: "admin@natours.io",
                password: "test1234",
            };
            // On doit login first pour recevoir le token
            const loginRes = await axios.post(
                "http://localhost:5001/api/v1/users/login",
                body
            );
            const { token } = loginRes.data;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const reviewsRes = await axios.get(
                "http://localhost:5001/api/v1/reviews/",
                config
            );
            setReviews(reviewsRes.data.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    // Delay The unmount of my componant(review)
    useEffect(() => {
        let timeoutId;
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            console.log(`isMount : ${isMount}`);
            if (!isMount) {
                timeoutId = setTimeout(() => {
                    switchReviewIdx(direction);
                }, 1000);
            }

            // switchReviewIdx(direction);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isMount]);

    // wait before unmounting
    useEffect(() => {
        let timeoutId;
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            timeoutId = setTimeout(() => {
                setMount(true);
            }, 1000);

            // switchReviewIdx(direction);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    });

    console.log(revIdx);
    // console.log(isMount);

    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div className="reviewsBox">
            <span
                className="arrow-left"
                role="button"
                aria-label="Change review"
                tabIndex={0}
                onClick={() => {
                    // switchReviewIdx("left");
                    setDirection("left");
                    setMount(!isMount);
                }}
                onKeyDown={() => {
                    // switchReviewIdx("left");
                }}
            />
            {revIdx === 0 && (
                <div
                    className="review"
                    style={
                        isMount
                            ? slideFromLeft
                            : setMountStyle(isMount, direction)
                    }
                >
                    {/* <img
                    // eslint-disable-next-line global-require
                    src={require("../../assets/img/users/user-2.jpg").default}
                    alt="user"
                    className="review__picture"
                /> */}
                    <div className="review__picture">{}</div>
                    <div className="review__text">
                        "Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Doloribus adipisci, impedit voluptatibus commodi
                        voluptatem error ratione quia. Saepe harum quis sunt
                        reiciendis corporis odit fugiat odio praesentium
                        debitis! Enim, sit.odit fugiat odio praesentium debitis!
                        Enim, sit."
                    </div>
                    <div className="review__name">Yi Wung</div>
                    <div className="review__rating">
                        <ul className="starbox">
                            {[1, 2, 3, 4, 5].map((el) => {
                                return (
                                    <span
                                        key={uuidv4()}
                                        id={uuidv4()}
                                        className="starbox__star"
                                        style={
                                            reviews.rating > el
                                                ? setReviewStarsBg()
                                                : setReviewStarsBg(
                                                      reviews.ratingsAverage
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
            )}
            {revIdx === 1 && (
                <div
                    className="review"
                    style={setMountStyle(isMount, direction)}
                >
                    {/* <img
                    // eslint-disable-next-line global-require
                    src={require("../../assets/img/users/user-2.jpg").default}
                    alt="user"
                    className="review__picture"
                /> */}
                    <div className="review__picture">{}</div>
                    <div className="review__text">
                        "Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Doloribus adipisci, impedit voluptatibus commodi
                        voluptatem error ratione quia. Saepe harum quis sunt
                        reiciendis corporis odit fugiat odio praesentium
                        debitis! Enim, sit.odit fugiat odio praesentium debitis!
                        Enim, sit."
                    </div>
                    <div className="review__name">SECOND TESTING</div>
                    <div className="review__rating">
                        <ul className="starbox">
                            {[1, 2, 3, 4, 5].map((el) => {
                                return (
                                    <span
                                        key={uuidv4()}
                                        id={uuidv4()}
                                        className="starbox__star"
                                        style={
                                            reviews.rating > el
                                                ? setReviewStarsBg()
                                                : setReviewStarsBg(
                                                      reviews.ratingsAverage
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
            )}

            <span
                className="arrow-right"
                role="button"
                aria-label="Change review"
                tabIndex={0}
                onClick={() => {
                    setDirection("right");
                    setMount(!isMount);
                }}
                onKeyDown={() => {
                    switchReviewIdx("right");
                }}
            />
        </div>
    );
}
