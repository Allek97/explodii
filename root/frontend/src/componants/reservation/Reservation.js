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

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import useOnclickOutside from "react-cool-onclickoutside";

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
                    {/* <input
                        type="text"
                        className="form__input"
                        placeholder="Address"
                        id="physical-address"
                        required
                    /> */}
                    <Search />
                    <p className="form__label-text">Address</p>
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

    const handleSelect = (description) => async () => {
        try {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions

            const results = await getGeocode({ address: description });
            const { lat, lng } = await getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div>
            <Combobox>
                <ComboboxInput
                    className="form__input"
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Address"
                    required
                />
                <ComboboxPopover key={uuidv4()} id={uuidv4()}>
                    {/* NOTE: We can de-construct element directly from map function */}
                    {status === "OK" &&
                        data.map(({ description }) => {
                            return (
                                <>
                                    <ComboboxOption
                                        key={uuidv4()}
                                        id={uuidv4()}
                                        onClick={handleSelect(description)}
                                        value={description}
                                        className="form__address-list"
                                    />
                                </>
                            );
                        })}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
