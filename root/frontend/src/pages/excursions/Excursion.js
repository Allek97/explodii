/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { IoColorFilterOutline } from "react-icons/io5";

import Loading from "../../componants/loading/PageLoading";
import ExcursionFilter from "./excursionFilter/ExcursionFilter";
import ExcursionSort from "./excursionSort/ExcursionSort";
import TourBox from "./tourBox/TourBox";
import Decoration from "./otherComponents/ExcursionDecoration";
import Footer from "../../componants/footer/Footer";
import NavBar from "./otherComponents/ExcursionNavBar";
import { ExcursionInfoSort, FilterBtn } from "./ExcursionStyles";

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
    // variables
    const isTablet = useMediaQuery({ query: "(max-width: 75em )" });

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

    return (
        <>
            {isApiConsumed && (
                <>
                    <Loading loadingTime={500} />
                    <div>
                        <div
                            className="excursion"
                            style={
                                paymentStatus
                                    ? {
                                          filter: "blur(5px)",
                                          pointerEvents: "none",
                                      }
                                    : null
                            }
                        >
                            <NavBar
                                authStatus={authStatus}
                                userName={userName}
                                userPhoto={userPhoto}
                            />

                            <main className="excursion-main">
                                <div className="excursion-main__filter">
                                    <ExcursionFilter
                                        setExcursions={setExcursions}
                                        setNbResults={setNbResults}
                                        sortField={sortField}
                                        authStatus={authStatus}
                                    />
                                </div>

                                <div className="excursion-main__content">
                                    <ExcursionInfoSort>
                                        <span>{nbResults} results</span>
                                        {isTablet && (
                                            <FilterBtn
                                                onClick={() => {
                                                    setIsFilterOpen(true);
                                                }}
                                            >
                                                <IoColorFilterOutline
                                                    style={{
                                                        width: "1.7rem",
                                                        height: "1.7rem",
                                                        marginRight: "3px",
                                                    }}
                                                />
                                                <span>Filters</span>
                                            </FilterBtn>
                                        )}
                                        <ExcursionSort
                                            setExcursions={setExcursions}
                                            setSortField={setSortField}
                                        />
                                    </ExcursionInfoSort>
                                    {excursions.map((el) => {
                                        return (
                                            <TourBox
                                                id={el.name}
                                                key={el.name}
                                                excursion={el}
                                                animationLoad={animationLoad}
                                            />
                                        );
                                    })}
                                </div>

                                <Decoration />
                            </main>
                        </div>
                        <Footer />
                    </div>
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
