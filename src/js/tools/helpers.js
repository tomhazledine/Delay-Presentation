import React from "react";

export const ordinal = i => {
    let j = i % 10,
        k = i % 100;
    let ordinal = "th";
    if (j == 1 && k != 11) {
        ordinal = "st";
    }
    if (j == 2 && k != 12) {
        ordinal = "nd";
    }
    if (j == 3 && k != 13) {
        ordinal = "rd";
    }
    return (
        <span>
            {i}
            <sup>{ordinal}</sup>
        </span>
    );
};
