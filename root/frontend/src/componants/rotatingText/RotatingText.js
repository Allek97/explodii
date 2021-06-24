import React, { useState, useEffect, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import "./_rotatingText.scss";
import "../../base/_animations.scss";

// Animations

const rotationAnimation = {
    animation: "rotationAnimation 4s ease-in-out 1",
};

export default function RotatingText() {
    const [index, setIndex] = useState(0);
    const [sentence, setSentence] = useState("");

    // https://parade.com/1034896/marynliles/nature-quotes/
    const quotes = [
        "In nature, nothing is perfect and everything is perfect",
        "Look deep into nature, and then you will understand everything better",
        "Heaven is under our feet as well as over our heads",
        "We don’t inherit the earth from our ancestors, we borrow it from our children",
    ];

    useEffect(() => {
        setSentence(quotes[0]);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (index === 3) {
                setIndex(0);
                setSentence(quotes[0]);
            } else {
                setIndex(index + 1);
                setSentence(quotes[index + 1]);
            }
        }, 4000);
        return () => {
            clearTimeout(timeout);
        };
    }, [index]);

    return (
        <div className="rotate">
            <span className="rotate__side">{}</span>
            <p
                key={uuidv4()}
                id={uuidv4()}
                className="rotate__text"
                style={rotationAnimation}
            >
                {sentence}
            </p>
            )
        </div>
    );
}
