import React, { useEffect, useContext } from "react";

import { SlidesContext } from "../Main";

const SlideSwitcher = () => {
    const [slides, setSlides] = useContext(SlidesContext);

    const handleSlideNav = bool => {
        let newCurrent = bool ? slides.current + 1 : slides.current - 1;
        if (newCurrent < 1) {
            newCurrent = 1;
        }
        if (newCurrent > slides.total) {
            newCurrent = slides.total;
        }
        setSlides({
            ...slides,
            current: newCurrent
        });
    };

    const handleKeyDown = e => {
        if (e.code === "ArrowRight" || e.code === "Space") {
            handleSlideNav(true);
        }
        if (e.code === "ArrowLeft") {
            handleSlideNav(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    });

    return (
        <div className="slide-switcher">
            <button
                className="slide-switcher__button slide-switcher__button--prev"
                onClick={() => handleSlideNav(false)}
                disabled={slides.current <= 1}
            >
                <span className="visuallyhidden">prev</span>
                <svg
                    className="slide-switcher__icon"
                    viewBox="0 0 477.175 477.175"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1z" />
                </svg>
            </button>
            <button
                className="slide-switcher__button slide-switcher__button--next"
                onClick={() => handleSlideNav(true)}
                disabled={slides.current >= slides.total}
            >
                <span className="visuallyhidden">next</span>
                <svg
                    className="slide-switcher__icon slide-switcher__icon--next"
                    viewBox="0 0 477.175 477.175"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1z" />
                </svg>
            </button>
        </div>
    );
};

export default SlideSwitcher;
