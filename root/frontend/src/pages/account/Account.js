/* eslint-disable camelcase */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import PropTypes from "prop-types";

import {
    SideNav,
    SideItem,
    SideLink,
    FunctionalBtn,
} from "./style/AccountStyledComponents";

import "./_account.scss";
import "../../componants/reusable/_navBar.scss";
import "../../base/_animations.scss";

//Components
import Loading from "../../componants/loading/PageLoading";
import PaymentSuccessBox from "./components/PaymentSuccessBox";
import AccountSettings from "./AccountSettings";
import AccountBooking from "./accountBooking/AccountBooking";
import AccountReview from "./accountReview/AccountReview";
import Footer from "../../componants/footer/Footer";

// svgs for sideNav
// TRICK: You can use variables in styled components, add default to img/svgs for it to work
// const settingSvg = require("../../assets/svgs/cog1.svg").default;
const settingSvg = require("../../assets/svgs/settings.svg").default;
const bookingSvg = require("../../assets/svgs/suitcase1.svg").default;
const reviewSvg = require("../../assets/svgs/star.svg").default;
const billingSvg = require("../../assets/svgs/credit-card.svg").default;
const helpSvg = require("../../assets/svgs/message-circle.svg").default;
const logoutSvg = require("../../assets/svgs/log-out.svg").default;

// styled components

export default function Account(props) {
    // PROPS
    const {
        userName,
        userEmail,
        userPhoto,
        userId,
        setUserName,
        setUserPhoto,
        setUserEmail,
    } = props;
    // HOOKS
    // Which buttons in selected in sideNav
    // settings > bookings > reviews > billing
    const [selectedBtn, setSelectedBtn] = useState({
        setting: true,
        booking: false,
        review: false,
        billing: false,
    });
    const [orderStatus, setOrderStatus] = useState(false);
    const [orderPrice, setOrderPrice] = useState(null);
    const [orderExcursion, setOrderExcursion] = useState(null);
    const [orderImageCover, setOrderImageCover] = useState(null);
    // VARIABLES
    // Profile photo in side navigation bar
    const profilePhoto = `${process.env.REACT_APP_URL}/api/v1/users/images/${userPhoto}`;
    // url link to retreive session_id
    const { search } = useLocation();

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await axios.get(
                `${process.env.REACT_APP_URL}/api/v1/users/logout`,
                {
                    withCredentials: true,
                }
            );
            window.location.assign("/");
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    useEffect(() => {
        async function fetchApi() {
            try {
                const { session_id } = queryString.parse(search);

                const orderRes = await axios.get(
                    `${process.env.REACT_APP_URL}/api/v1/bookings/order/${session_id}`,
                    {
                        withCredentials: true,
                    }
                );
                const { tour: tourId, price, status } = orderRes.data;

                if (status === "successful purchase") {
                    const excursionRes = await axios.get(
                        `${process.env.REACT_APP_URL}/api/v1/tours/${tourId}`,
                        {
                            withCredentials: true,
                        }
                    );

                    const { imageCover, name } = excursionRes.data.data.data;
                    setOrderExcursion(name);
                    setOrderImageCover(imageCover);
                    setOrderPrice(price);
                    setOrderStatus(true);
                }
            } catch (err) {
                console.log(err.response.data);
            }
        }

        fetchApi();
    }, []);

    return (
        <>
            <Loading />
            {orderStatus && (
                <PaymentSuccessBox
                    setOrderStatus={setOrderStatus}
                    orderExcursion={orderExcursion}
                    orderPrice={orderPrice}
                    orderImageCover={orderImageCover}
                />
            )}
            <div
                className="account"
                style={
                    orderStatus
                        ? { filter: "grayscale(100%)", pointerEvents: "none" }
                        : null
                }
            >
                <div className="navBar navBar--account">
                    <div className="navBar__logo-box">
                        <div className="navBar__logo navBar__logo--account">
                            {}
                        </div>
                        <div className="navBar__logo-text navBar__logo-text--account">
                            explodii
                        </div>
                    </div>
                    <a href="/" className="navBar__btn">
                        Homepage
                    </a>
                    <a href="/excursions" className="navBar__btn">
                        Our excursions
                    </a>
                </div>

                <div className="dashboard">
                    <nav className="dashboard__view">
                        <div className="profile">
                            <img
                                src={profilePhoto}
                                alt="profile"
                                className="profile__photo"
                            />
                            {/*TODO: METTRE DISPLAY GRID POUR REGLER LE PROBLEME DES NOMS LONGS */}
                            {/*NOTE: Jamais utiliser position absolute avec des variables */}

                            <h1 className="profile__name">{userName}</h1>
                            <p className="profile__email">{userEmail}</p>
                        </div>
                        <SideNav>
                            <SideItem
                                svg={settingSvg}
                                onClick={() => {
                                    setSelectedBtn({
                                        setting: true,
                                        booking: false,
                                        review: false,
                                        billing: false,
                                    });
                                }}
                                style={
                                    selectedBtn.setting
                                        ? {
                                              backgroundColor:
                                                  "rgb(var(--color-blue-special))",
                                          }
                                        : null
                                }
                            >
                                <SideLink>Settings</SideLink>
                            </SideItem>
                            <SideItem
                                svg={bookingSvg}
                                onClick={() => {
                                    setSelectedBtn({
                                        setting: false,
                                        booking: true,
                                        review: false,
                                        billing: false,
                                    });
                                }}
                                style={
                                    selectedBtn.booking
                                        ? {
                                              backgroundColor:
                                                  "rgb(var(--color-blue-special))",
                                          }
                                        : null
                                }
                            >
                                <SideLink>My Bookings</SideLink>
                            </SideItem>
                            <SideItem
                                svg={reviewSvg}
                                onClick={() => {
                                    setSelectedBtn({
                                        setting: false,
                                        booking: false,
                                        review: true,
                                        billing: false,
                                    });
                                }}
                                style={
                                    selectedBtn.review
                                        ? {
                                              backgroundColor:
                                                  "rgb(var(--color-blue-special))",
                                          }
                                        : null
                                }
                            >
                                <SideLink>My Reviews</SideLink>
                            </SideItem>
                            <SideItem
                                svg={billingSvg}
                                onClick={() => {
                                    setSelectedBtn({
                                        setting: false,
                                        booking: false,
                                        review: false,
                                        billing: true,
                                    });
                                }}
                                style={
                                    selectedBtn.billing
                                        ? {
                                              backgroundColor:
                                                  "rgb(var(--color-blue-special))",
                                          }
                                        : null
                                }
                            >
                                <SideLink>Billing</SideLink>
                            </SideItem>
                            <FunctionalBtn svg={helpSvg}>
                                Get help
                            </FunctionalBtn>
                            <FunctionalBtn
                                svg={logoutSvg}
                                onClick={handleLogOut}
                            >
                                Logout
                            </FunctionalBtn>
                        </SideNav>
                    </nav>
                    {/* Contenu de la section account */}
                    {selectedBtn.setting && (
                        <AccountSettings
                            userName={userName}
                            userEmail={userEmail}
                            userPhoto={userPhoto}
                            userId={userId}
                            setUserName={setUserName}
                            setUserPhoto={setUserPhoto}
                            setUserEmail={setUserEmail}
                        />
                    )}
                    {selectedBtn.booking && (
                        <AccountBooking
                            userId={userId}
                            userName={userName}
                            userEmail={userEmail}
                            userPhoto={userPhoto}
                        />
                    )}
                    {selectedBtn.review && (
                        <AccountReview userId={userId} userName={userName} />
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}

Account.propTypes = {
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    setUserName: PropTypes.func.isRequired,
    setUserPhoto: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
};
