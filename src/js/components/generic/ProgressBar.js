import React, { useContext } from "react";

import { SlidesContext } from "../Main";

const ProgressBar = () => {
    const [slides, setSlides] = useContext(SlidesContext);

    const percentageProgress = (slides.current / slides.total) * 100;

    return (
        <div className="progress-bar">
            <div
                style={{ width: `${percentageProgress}%` }}
                className="progress-bar__inner"
            />
            <div className="progress-bar__label">
                slide: {slides.current + 1}/{slides.total + 1}
            </div>
        </div>
    );
};

export default ProgressBar;
