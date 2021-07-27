/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { BsFilterRight } from "react-icons/bs";

import Loading from "../../componants/loading/PageLoading";
import ExcursionFilter from "./excursionFilter/ExcursionFilter";
import ExcursionSort from "./excursionSort/ExcursionSort";
import TourBox from "./tourBox/TourBox";
import ResponsiveTourBox from "./responsiveTourBox/ResponsiveTourBox";
import Decoration from "./otherComponents/ExcursionDecoration";
import Footer from "../../componants/footer/Footer";
import NavBar from "./otherComponents/ExcursionNavBar";
import { ExcursionInfoSort, FilterBtn } from "./ExcursionStyles";

import { ReactComponent as FilterSvg } from "../../assets/svgs/filter.svg";

import "./_excursion.scss";
import "../../componants/reusable/_navBar.scss";

export default function Excursions(props) {
    // props
    const { authStatus, userName, userPhoto, paymentStatus } = props;
    // hooks
    const [excursions, setExcursions] = useState([]);
    const [nbResults, setNbResults] = useState(0);
    const [sortField, setSortField] = useState("");
    const [isApiConsumed, setIsApiConsumed] = useState(false);
    const [animationLoad, setAnimationLoad] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    // variables
    const isTabLand = useMediaQuery({ query: "(max-width: 75em )" });
    const isTabPort = useMediaQuery({ query: "(max-width: 56.25em )" });

    useEffect(() => {
        async function fetchApi() {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/tours`
                );
                // setExcursions(res.data.data);
                // setNbResults(res.data.data.length);
                // console.log(res);
                if (res.data.status === "success") {
                    setIsApiConsumed(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchApi();
    }, []);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setAnimationLoad(true);
        }, 500);

        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    useEffect(() => {
        if (!isTabLand) {
            setIsFilterOpen(false);
        }
    }, [isTabLand]);

    return (
        <>
            {isApiConsumed && (
                <>
                    <Loading loadingTime={500} />
                    <div>
                        <div className="excursion">
                            <NavBar
                                authStatus={authStatus}
                                userName={userName}
                                userPhoto={userPhoto}
                            />

                            <main className="excursion-main">
                                <ExcursionFilter
                                    setExcursions={setExcursions}
                                    setNbResults={setNbResults}
                                    sortField={sortField}
                                    authStatus={authStatus}
                                    isFilterOpen={isFilterOpen}
                                    setIsFilterOpen={setIsFilterOpen}
                                    setIsFilterApplied={setIsFilterApplied}
                                />

                                <div
                                    className="excursion-main__content"
                                    style={
                                        isFilterOpen
                                            ? {
                                                  filter: "grayscale(1)",
                                                  pointerEvents: "none",
                                              }
                                            : null
                                    }
                                >
                                    <ExcursionInfoSort>
                                        <span>
                                            {nbResults}{" "}
                                            {nbResults > 1
                                                ? `results`
                                                : `result`}
                                        </span>
                                        {isTabLand && (
                                            <FilterBtn
                                                onClick={() => {
                                                    setIsFilterOpen(true);
                                                }}
                                                style={
                                                    isFilterApplied
                                                        ? {
                                                              backgroundColor:
                                                                  "#7b7e84",
                                                              color: "white",
                                                          }
                                                        : null
                                                }
                                            >
                                                {isTabPort ? (
                                                    <FilterSvg
                                                        style={{
                                                            width: "1.6rem",
                                                            height: "1.6rem",
                                                            marginRight: "4px",
                                                            margin: "0 auto",
                                                        }}
                                                    />
                                                ) : (
                                                    <BsFilterRight
                                                        style={{
                                                            width: "1.6rem",
                                                            height: "1.6rem",
                                                            marginRight: "7px",
                                                        }}
                                                    />
                                                )}
                                                {!isTabPort && (
                                                    <span>Filters</span>
                                                )}
                                            </FilterBtn>
                                        )}
                                        <ExcursionSort
                                            setExcursions={setExcursions}
                                            setSortField={setSortField}
                                        />
                                    </ExcursionInfoSort>
                                    {excursions.map((el) => {
                                        return (
                                            <div
                                                key={el._id}
                                                style={
                                                    !isTabPort
                                                        ? {
                                                              display: "flex",
                                                              flexDirection:
                                                                  "column",
                                                              flex: "1 1",
                                                          }
                                                        : null
                                                }
                                            >
                                                {isTabPort ? (
                                                    <ResponsiveTourBox
                                                        id={el.name}
                                                        key={el.name}
                                                        excursion={el}
                                                        animationLoad={
                                                            animationLoad
                                                        }
                                                    />
                                                ) : (
                                                    <TourBox
                                                        id={el._id}
                                                        key={el._id}
                                                        excursion={el}
                                                        animationLoad={
                                                            animationLoad
                                                        }
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <Decoration />
                            </main>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}

Excursions.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    paymentStatus: PropTypes.bool.isRequired,
};
