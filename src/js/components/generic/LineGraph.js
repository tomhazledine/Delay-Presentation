import React, { useEffect, useContext, useState } from "react";
import * as d3 from "d3";

import { DataContext } from "./FrequencyGraph";

const LineGraph = ({ className }) => {
    const data = useContext(DataContext);
    const [line, setLine] = useState();
    const [max, setMax] = useState();
    const [area, setArea] = useState();

    const layout = {
        width: 800,
        height: 300
    };

    const graphDetails = {
        xScale: d3.scaleLog().range([0, layout.width]),
        yScale: d3.scaleLinear().range([layout.height, 0]),
        lineGenerator: d3.line(),
        shapeGenerator: d3.area()
    };

    graphDetails.xScale.domain([200, 20000]);
    graphDetails.yScale.domain([0, 280]);

    graphDetails.lineGenerator.x(d => graphDetails.xScale(d.frequency));
    graphDetails.lineGenerator.y(d => graphDetails.yScale(d.value));

    graphDetails.shapeGenerator.x(d => graphDetails.xScale(d.frequency));
    graphDetails.shapeGenerator.y0(() => graphDetails.yScale(0));
    graphDetails.shapeGenerator.y1(d => graphDetails.yScale(d.value));

    useEffect(() => {
        if (data) {
            // Calculate the data line
            const newLine = graphDetails.lineGenerator(data);
            setLine(newLine);

            // Calculate the max value
            const yMax = d3.max(data, d => d.value);
            setMax(yMax);

            const area = graphDetails.shapeGenerator(data);
            setArea(area);
        }
    }, [data]);

    return (
        <svg
            className={`${className} graph--line`}
            width={layout.width}
            height={layout.height}
        >
            <line
                className="graph__max"
                x1={graphDetails.xScale(200)}
                y1={graphDetails.yScale(max)}
                x2={graphDetails.xScale(20000)}
                y2={graphDetails.yScale(max)}
            />
            <path className="graph__data" key={line} d={line} />
            <path className="graph__area" d={area} />
        </svg>
    );
};

export default LineGraph;
