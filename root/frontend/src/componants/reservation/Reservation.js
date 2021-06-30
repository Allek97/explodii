/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./_reservation.scss";

import { useLoadScript } from "@react-google-maps/api";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";

import GoogleLogo from "../../assets/img/home/powered_by_google_on_white.png";

const libraries = ["places"];

// The bias location for address suggestions centered around Montreal
const center = {
    lat: 45.518465,
    lng: -73.712678,
};

export default function reservation() {
    // Load google maps script without using the SDK
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loadings Maps";

    return (
        <div className="reservation">
            <form action="#" className="form">
                <h2 className="form__heading heading-primary">
                    Make a reservation now
                </h2>

                <label htmlFor="full-name" className="form__label">
                    <input
                        type="text"
                        className="form__input"
                        placeholder="Full name"
                        id="full-name"
                        required
                    />
                    <p className="form__label-text">Full name</p>
                </label>

                <label htmlFor="email" className="form__label">
                    <input
                        type="email"
                        className="form__input"
                        placeholder="Email address"
                        id="email-address"
                        required
                    />
                    <p className="form__label-text">Email</p>
                </label>
                <label htmlFor="address" className="form__label">
                    {}
                    <Search />
                </label>
                <a
                    href="/"
                    className="form__btn btn btn--explo btn--blue btn--animated"
                >
                    Book now &rarr;
                </a>
            </form>
        </div>
    );
}
// NOTE: Ca vient de : https://www.npmjs.com/package/use-places-autocomplete

function Search() {
    const {
        ready,
        value,
        suggestions: { data, status },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 45.518465, lng: () => -73.712678 },
            radius: 200 * 1000,
        },
    });

    // BUG: Seems to not work proprely, it does dismiss the Coboxbox when selected
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => async () => {
        try {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions

            const results = await getGeocode({ address: description });
            const { lat, lng } = await getLatLng(results[0]);
            // console.log("📍 Coordinates: ", { lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div ref={ref}>
            <input
                className="form__input"
                id="address"
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Address"
                required
            />
            <p className="form__label-text">Address</p>

            {/* NOTE: We can de-construct element directly from map function */}
            {status === "OK" && (
                <ul className="form__suggestions">
                    {data.map((suggestion) => {
                        const {
                            structured_formatting: {
                                main_text,
                                secondary_text,
                            },
                        } = suggestion;
                        return (
                            //  eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <a
                                key={`${main_text},${secondary_text}`}
                                id={`${main_text},${secondary_text}`}
                                role="button"
                                tabIndex={0}
                                onClick={handleSelect(suggestion)}
                                onKeyDown={() => {}}
                                // value={description}
                                className="form__address"
                            >
                                <span
                                    style={{
                                        width: "max-content",
                                        textAlign: "match-parent",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: "600",
                                            marginRight: ".5rem",
                                        }}
                                    >
                                        {main_text}
                                    </span>{" "}
                                    <span
                                        style={{
                                            fontSize: "1.3rem",
                                        }}
                                    >
                                        {secondary_text}
                                    </span>
                                </span>{" "}
                            </a>
                        );
                    })}
                    <div className="form__google-logo">
                        <img src={GoogleLogo} alt="Power by google logo" />
                    </div>
                </ul>
            )}
        </div>
    );
}
