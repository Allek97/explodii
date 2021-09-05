//NOTE: component hell needs cleaning/re-organizing

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { AiOutlineClose } from "react-icons/ai";

import "./_excursionFilter.scss";

import Stars from "../../../componants/reusable/Stars";
import MultiRangeSlide from "./componants/MultiRangeSlide";
import Checkbox from "./componants/Checkbox";
import { BtnLO, Btn } from "../../../globalStyles/NavBarStyles";

const FilterSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2.5rem;
    border-bottom: 1px solid rgb(229, 229, 229);
`;

const filterHeadingStyle = {
    fontSize: "1.7rem",
    fontWeight: "bolder",
};

const handleLogOut = async (e) => {
    e.preventDefault();
    try {
        await axios.get(`${process.env.REACT_APP_URL}/api/v1/users/logout`, {
            withCredentials: true,
        });
        window.location.assign("/");
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export default function ExcursionFilter(props) {
    // props
    const {
        setExcursions,
        setNbResults,
        authStatus,
        sortField,
        isFilterOpen,
        setIsFilterOpen,
        setIsFilterApplied,
    } = props;
    // Hooks
    const [durationChecked, setDurationChecked] = useState(
        new Array(5).fill(false)
    );

    const [participantChecked, setParticipantChecked] = useState(
        new Array(5).fill(false)
    );

    const [ratingChecked, setRatingChecked] = useState(
        new Array(5).fill(false)
    );
    const [priceRangeLeft, setPriceRangeLeft] = useState(300);
    const [priceRangeRight, setPriceRangeRight] = useState(3000);

    const [resetRange, setResetRange] = useState(false);

    // NOTE: filter hooks
    const [durationQueryObject, setDurationQueryObject] = useState([{}]);
    const [participantQueryObject, setParticipantQueryObject] = useState([{}]);
    const [ratingQueryObject, setRatingQueryObject] = useState([{}]);
    const [priceQueryObject, setPriceQueryObject] = useState([{}]);
    // responsive hook
    const isTabLand = useMediaQuery({ query: "(max-width: 75em)" });

    // Variables

    const durationFields = [
        { filterContent: "Up to 3 days", min: 0, max: 3 },
        { filterContent: "4 to 7 days", min: 4, max: 7 },
        { filterContent: "8 to 11 days", min: 8, max: 11 },
        { filterContent: "12+ days", min: 12, max: Number.MAX_SAFE_INTEGER },
    ];

    const participantFields = [
        { filterContent: "Up to 8 people", min: 0, max: 8 },
        { filterContent: "9 to 12 people", min: 10, max: 12 },
        { filterContent: "13 to 16 people", min: 13, max: 16 },
        { filterContent: "17 to 20 people", min: 17, max: 20 },
        { filterContent: "21+ people", min: 21, max: Number.MAX_SAFE_INTEGER },
    ];

    const ratingField = [1, 2, 3, 4, 5];

    // Functions
    const handleCheckboxChange = (index, field) => {
        const arr = Array.from({ length: 5 }, (i, idx) => {
            if (field === "duration") {
                return idx === index
                    ? !durationChecked[index]
                    : durationChecked[idx];
            }

            if (field === "participant") {
                return idx === index
                    ? !participantChecked[index]
                    : participantChecked[idx];
            }
            if (field === "rating") {
                return idx === index ? !ratingChecked[index] : false;
            }
            return i;
        });

        if (field === "duration") {
            setDurationChecked(arr);
        } else if (field === "participant") {
            setParticipantChecked(arr);
        } else if (field === "rating") {
            setRatingChecked(arr);
        }
    };

    // duration filter
    useEffect(() => {
        let query = [];
        durationChecked.forEach((isChecked, idx) => {
            if (isChecked) {
                // console.log(`index:${idx}`);
                const durationQuery = {
                    duration: {
                        gte: durationFields[idx].min,
                        lte: durationFields[idx].max,
                    },
                };
                query.push(durationQuery);
            }
        });
        query = query.length === 0 ? [{}] : query;
        setDurationQueryObject(query);
    }, [durationChecked]);

    // particiapant filter
    useEffect(() => {
        let query = [];
        participantChecked.forEach((isChecked, idx) => {
            if (isChecked) {
                const participantQuery = {
                    maxGroupSize: {
                        gte: participantFields[idx].min,
                        lte: participantFields[idx].max,
                    },
                };
                query.push(participantQuery);
            }
        });
        query = query.length === 0 ? [{}] : query;
        setParticipantQueryObject(query);
    }, [participantChecked]);

    // rating filter
    useEffect(() => {
        let query = [];
        ratingChecked.forEach((isChecked, idx) => {
            if (isChecked) {
                const ratingQuery = {
                    ratingsAverage: {
                        gte: ratingField[idx],
                    },
                };
                query.push(ratingQuery);
            }
        });
        query = query.length === 0 ? [{}] : query;
        // console.log(query);
        setRatingQueryObject(query);
    }, [ratingChecked]);

    // price filter
    useEffect(() => {
        const priceQuery = [
            {
                price: {
                    lte: priceRangeRight,
                    gte: priceRangeLeft,
                },
            },
        ];
        setPriceQueryObject(priceQuery);
    }, [priceRangeLeft, priceRangeRight]);

    // Update the final queryObject everytime there is a check
    useEffect(() => {
        async function fetchApi() {
            try {
                const query = {
                    and: [
                        {
                            or: durationQueryObject,
                        },
                        {
                            or: participantQueryObject,
                        },
                        {
                            or: ratingQueryObject,
                        },
                        {
                            or: priceQueryObject,
                        },
                    ],
                };

                const queryStr = JSON.stringify(query);

                // console.log(priceQueryObject);

                const res = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/tours?q=${queryStr}&sort=${sortField}`,
                    {
                        withCredentials: true,
                    }
                );

                setExcursions(res.data.data);
                setNbResults(res.data.data.length);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
        fetchApi();
    }, [
        durationQueryObject,
        participantQueryObject,
        ratingQueryObject,
        priceQueryObject,
        sortField,
    ]);

    useEffect(() => {
        if (
            JSON.stringify(durationQueryObject) === `[{}]` &&
            JSON.stringify(participantQueryObject) === `[{}]` &&
            JSON.stringify(ratingQueryObject) === `[{}]` &&
            (JSON.stringify(priceQueryObject) === `[{}]` ||
                JSON.stringify(priceQueryObject) ===
                    JSON.stringify([{ price: { lte: 3000, gte: 300 } }]))
        ) {
            setIsFilterApplied(false);
        } else {
            setIsFilterApplied(true);
        }
    }, [
        durationQueryObject,
        participantQueryObject,
        ratingQueryObject,
        priceQueryObject,
        sortField,
    ]);

    const resetQuery = () => {
        setDurationChecked(new Array(5).fill(false));
        setParticipantChecked(new Array(5).fill(false));
        setRatingChecked(new Array(5).fill(false));
        setResetRange(!resetRange);
        setPriceRangeLeft(300);
        setPriceRangeRight(3000);
    };

    return (
        <>
            <div
                className="excursion-filter"
                style={!isTabLand || isFilterOpen ? null : { display: "none" }}
            >
                {/*TODO: add another filter field like difficulty or location  */}
                {isTabLand && (
                    <div
                        style={{
                            padding: "2.5rem",
                            borderBottom: "1px solid rgb(206, 203, 203)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <span className="excursion-filter__title">
                                Filters
                            </span>
                            <AiOutlineClose
                                className="excursion-filter__close"
                                onClick={() => {
                                    setIsFilterOpen(false);
                                }}
                            />
                        </div>
                    </div>
                )}
                <div className="excursion-filter__content">
                    <FilterSection
                        style={{
                            paddingBottom: "4rem",
                            marginTop: "0",
                            paddingTop: "2.5rem",
                        }}
                    >
                        <span
                            style={{
                                ...filterHeadingStyle,
                                marginBottom: "5rem",
                            }}
                        >
                            Price
                        </span>
                        <MultiRangeSlide
                            min={300}
                            max={3000}
                            setPriceRangeLeft={setPriceRangeLeft}
                            setPriceRangeRight={setPriceRangeRight}
                            resetRange={resetRange}
                        />
                    </FilterSection>

                    <FilterSection style={{ paddingBottom: "2rem" }}>
                        <span
                            style={{
                                ...filterHeadingStyle,
                                marginBottom: "2rem",
                            }}
                        >
                            Duration
                        </span>
                        {durationFields.map(({ filterContent }, idx) => (
                            <div
                                key={filterContent}
                                style={{
                                    display: "flex",
                                    marginBottom: "1rem",
                                }}
                            >
                                <Checkbox
                                    checked={durationChecked[idx]}
                                    handleCheckboxChange={() =>
                                        handleCheckboxChange(idx, "duration")
                                    }
                                />
                                <span
                                    style={{
                                        marginLeft: "1rem",
                                        fontSize: "1.45rem",
                                        color: "#55575b",
                                        fontFamily: "Poppins",
                                        fontWeight: "400",
                                    }}
                                >
                                    {filterContent}
                                </span>
                            </div>
                        ))}
                    </FilterSection>

                    <FilterSection style={{ paddingBottom: "2rem" }}>
                        <span
                            style={{
                                ...filterHeadingStyle,
                                marginBottom: "2rem",
                            }}
                        >
                            Participants / Max Group Size
                        </span>
                        {participantFields.map(({ filterContent }, idx) => (
                            <div
                                key={filterContent}
                                style={{
                                    display: "flex",
                                    marginBottom: "1rem",
                                }}
                            >
                                <Checkbox
                                    checked={participantChecked[idx]}
                                    handleCheckboxChange={() =>
                                        handleCheckboxChange(idx, "participant")
                                    }
                                />
                                <span
                                    style={{
                                        marginLeft: "1rem",
                                        fontSize: "1.45rem",
                                        color: "#55575b",
                                        fontFamily: "Poppins",
                                        fontWeight: "400",
                                    }}
                                >
                                    {filterContent}
                                </span>
                            </div>
                        ))}
                    </FilterSection>

                    <FilterSection style={{ paddingBottom: "2rem" }}>
                        <span
                            style={{
                                ...filterHeadingStyle,
                                marginBottom: "2rem",
                            }}
                        >
                            Rating
                        </span>
                        {[5, 4, 3, 2, 1].map((nbStars, idx) => (
                            <div
                                key={nbStars}
                                style={{
                                    display: "flex",
                                    marginBottom: "1rem",
                                    alignItems: "center",
                                }}
                            >
                                <Checkbox
                                    checked={ratingChecked[4 - idx]}
                                    handleCheckboxChange={() =>
                                        handleCheckboxChange(4 - idx, "rating")
                                    }
                                    borderRadius={50}
                                />

                                <span style={{ margin: "0 5px" }}>
                                    <Stars nbStar={nbStars} starSize={1.9} />
                                </span>
                                <span
                                    style={{
                                        color: "#55575b",
                                        fontSize: "1.4rem",
                                        fontWeight: "300",
                                    }}
                                >
                                    {nbStars !== 5 && `& up`}
                                </span>
                            </div>
                        ))}
                    </FilterSection>
                    {authStatus && !isTabLand && (
                        <div style={{ padding: "0 2.5rem 2.5rem 2.5rem" }}>
                            <BtnLO
                                to="/"
                                onClick={handleLogOut}
                                style={{
                                    backgroundColor:
                                        "rgba(var(--color-primary-dark),1)",
                                }}
                            >
                                Log Out
                            </BtnLO>
                            <Btn
                                onClick={() => {
                                    resetQuery();
                                }}
                                style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    border: "1px solid rgba(var(--color-primary-dark), 1)",
                                    boxShadow: "none",
                                }}
                            >
                                Clear All
                            </Btn>
                        </div>
                    )}
                </div>
                {isTabLand && (
                    <>
                        <div className="excursion-filter__utilities">
                            <Btn
                                onClick={() => {
                                    resetQuery();
                                }}
                            >
                                Clear All
                            </Btn>

                            <Btn
                                onClick={() => {
                                    setIsFilterOpen(false);
                                }}
                            >
                                Apply
                            </Btn>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

ExcursionFilter.propTypes = {
    setExcursions: PropTypes.func.isRequired,
    setNbResults: PropTypes.func.isRequired,
    authStatus: PropTypes.bool.isRequired,
    sortField: PropTypes.string.isRequired,
    isFilterOpen: PropTypes.bool.isRequired,
    setIsFilterOpen: PropTypes.func.isRequired,
    setIsFilterApplied: PropTypes.func.isRequired,
};
