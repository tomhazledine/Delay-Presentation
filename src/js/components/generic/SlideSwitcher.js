import React, { useContext } from "react";

import { SlidesContext } from "../Main";

const SlideSwitcher = () => {
    const [slides, setSlides] = useContext(SlidesContext);

    const handleSlideNav = bool => {
        let newCurrent = bool ? slides.current + 1 : slides.current - 1;
        if (newCurrent < 1) {
            newCurrent = 1;
        }
        setSlides({
            ...slides,
            current: newCurrent
        });
    };
    return (
        <div className="slide-switcher">
            <button
                className="slide-switcher__button slide-switcher__button--prev"
                onClick={() => handleSlideNav(false)}
                disabled={slides.current <= 1}
            >
                prev
            </button>
            <button
                className="slide-switcher__button slide-switcher__button--next"
                onClick={() => handleSlideNav(true)}
            >
                next
            </button>
        </div>
    );
};

export default SlideSwitcher;
