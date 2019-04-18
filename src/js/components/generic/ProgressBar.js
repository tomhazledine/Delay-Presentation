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
        </div>
    );
};

export default ProgressBar;
