// TODO: Use this componant for future map building
// NOTE: https://www.youtube.com/watch?v=WZcxJGmLbSo

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import accountMapStyle from "./accountMapStyle";

// Google variables

const libraries = ["places"];

const mapContainerStyle = {
    gridArea: "map",
    justifySelf: "center",
    borderRadius: "2px",

    width: "100%",
    height: "33rem",
    boxShadow: "var(--shadow-dark)",
    marginBottom: "2rem",
    // boxShadow: "0 2rem 6rem #ddd5d5",
};

const center = {
    lat: 45.518465,
    lng: -73.712678,
};

// For styling maps : https://snazzymaps.com
const options = {
    styles: accountMapStyle,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function AccountMap() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps...";

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
            />
        </>
    );
}
