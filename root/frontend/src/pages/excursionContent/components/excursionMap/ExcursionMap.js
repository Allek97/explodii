/* eslint-disable global-require */
// TODO: Use this componant for future map building
// NOTE: https://www.youtube.com/watch?v=WZcxJGmLbSo

import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    StreetViewPanorama,
    InfoWindow,
} from "@react-google-maps/api";

import styleGM from "./styleGM";

// Google variables

const mapContainerStyle = {
    display: "block",
    width: "100%",
    height: "80rem",
};

// const libraries = ["places"];
export default function ExcursionMap(props) {
    const [libraries] = useState(["places"]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
        id: "excursion",
    });

    // props
    const { locations } = props;

    let { startLocation } = props;
    startLocation = { ...startLocation, day: 0 };

    // hooks
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState({});

    const [markerInfoWindow, setMarkerInfoWindow] = useState(null);

    useEffect(() => {
        setCenter({
            lat: startLocation.coordinates[1] || 45.518465,
            lng: startLocation.coordinates[0] || -73.712678,
        });
        setMarkers([startLocation].concat(locations));
        // TODO: SOLVE THE BUG WHEN EXCURSIONCONTENT IS LOADED
        // setMarkerInfoWindow(startLocation);

        return () => {
            setMarkers([]);
        };
    }, []);

    const renderMap = () => {
        // NOTE: For styling maps : https://snazzymaps.com

        // const center = {
        //     lat: startLocation.coordinates[1] || 45.518465,
        //     lng: startLocation.coordinates[0] || -73.712678,
        // };

        const options = {
            styles: styleGM,
            disableDefaultUI: false,
            zoomControl: true,
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.LEFT_BOTTOM,
            },
            streetViewControlOptions: {
                position: window.google.maps.ControlPosition.TOP_RIGHT,
            },
            mapTypeControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_TOP,
            },
            fullscreenControlOptions: {
                position: window.google.maps.ControlPosition.BOTTOM_LEFT,
            },
        };

        const panoramaOptions = {
            enableCloseButton: true,
            zoomControl: true,
            addressControlOptions: {
                position: window.google.maps.ControlPosition.LEFT_CENTER,
            },
            panControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_TOP,
            },
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.RIGHT_TOP,
            },
        };

        return (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
            >
                <StreetViewPanorama options={panoramaOptions} />
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.coordinates[1]}_${marker.coordinates[0]}_${marker.day}`}
                        position={{
                            lat: marker.coordinates[1],
                            lng: marker.coordinates[0],
                        }}
                        icon={{
                            url: require("../../../../assets/svgs/placeholder.svg")
                                .default,
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        title={`Day ${marker.day + 1}: ${marker.description}`}
                        onClick={() => {
                            setMarkerInfoWindow(marker);
                            setCenter({
                                lat: marker.coordinates[1],
                                lng: marker.coordinates[0],
                            });
                        }}
                    />
                ))}
                {/* BUG: Fix the bug about infowindow close button getting focus when I load */}
                {markerInfoWindow && (
                    <InfoWindow
                        position={{
                            lat: markerInfoWindow.coordinates[1],
                            lng: markerInfoWindow.coordinates[0],
                        }}
                        options={{
                            pixelOffset: new window.google.maps.Size(0, -30),
                        }}
                        onCloseClick={() => setMarkerInfoWindow(null)}
                    >
                        <div
                            style={{
                                height: "2rem",
                                width: "max-content",
                                fontSize: "1.4rem",
                                color: "rgba(0,0,0,0.7)",
                            }}
                        >
                            <p>{`Day ${markerInfoWindow.day + 1}: ${
                                markerInfoWindow.description
                            }`}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    };
    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? (
        renderMap()
    ) : (
        <div>Map cannot be loaded right now, sorry.</div>
    );
}

ExcursionMap.propTypes = {
    startLocation: PropTypes.shape({
        description: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    }).isRequired,

    locations: PropTypes.arrayOf(
        PropTypes.shape({
            coordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
                .isRequired,
            description: PropTypes.string.isRequired,
            day: PropTypes.number.isRequired,
        })
    ).isRequired,
};
