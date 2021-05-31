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

import wYStyle from "./mapStyles/wYStyle";

// Google variables

const libraries = ["places"];

const mapContainerStyle = {
    width: "50vw",
    height: "80vh",
};

const center = {
    lat: 45.518465,
    lng: -73.712678,
};

// For styling maps : https://snazzymaps.com
const options = {
    styles: wYStyle,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

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
