import React from "react";

import LineGraph from "./LineGraph";

const FrequencyGraph = () => {
    const data = [
        { x: 0, y: 3 },
        { x: 1, y: 2 },
        { x: 2, y: 6 },
        { x: 3, y: 5 },
        { x: 4, y: 12 },
        { x: 5, y: 8 },
        { x: 6, y: 4 }
    ];

    return (
        <div className="frequency-graph__wrapper">
            frequency
            <LineGraph className="frequency-graph" data={data} />
        </div>
    );
};

export default FrequencyGraph;
