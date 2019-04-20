import React from "react";

const RangeSlider = ({ value, onChange, min, max }) => {
    return (
        <div className="rangeWrapper">
            <div className="pseudoRangeBackground" />
            <div className="pseudoRangeIndicator" />
            <div className="pseudoRangePlayhead" />
            <input
                type="range"
                min={min}
                max={max}
                className="rangeSlider"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default RangeSlider;
