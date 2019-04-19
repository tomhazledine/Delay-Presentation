import React, { useEffect, useContext, useState } from "react";
import * as d3 from "d3";

import { DataContext } from "./FrequencyGraph";

const LineGraph = ({ className }) => {
    const data = useContext(DataContext);
    const [line, setLine] = useState();
    const [max, setMax] = useState();
    const [area, setArea] = useState();

    const layout = {
        width: 500,
        height: 300
    };

    const graphDetails = {
        xScale: d3.scaleLog().range([0, layout.width]),
        yScale: d3.scaleLinear().range([layout.height, 0]),
        lineGenerator: d3.line(),
        shapeGenerator: d3.area()
    };

    graphDetails.xScale.domain([200, 10000]);
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

    const verticalTicks = [
        // 100,
        // 200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        1000,
        2000,
        3000,
        4000,
        5000,
        6000,
        7000,
        8000,
        9000,
        10000
    ].map(freq => (
        <line
            className={`graph__tick--${freq > 1000 ? "solid" : "dashed"}`}
            x1={graphDetails.xScale(freq)}
            y1={graphDetails.yScale(0)}
            x2={graphDetails.xScale(freq)}
            y2={graphDetails.yScale(280)}
        />
    ));

    const horizontalTicks = [50, 100, 150, 200, 250].map(value => (
        <line
            className={`graph__tick--${
                value % 100 === 0 ? "dashed" : "dotted"
            }`}
            x1={graphDetails.xScale(200)}
            y1={graphDetails.yScale(value)}
            x2={graphDetails.xScale(20000)}
            y2={graphDetails.yScale(value)}
        />
    ));

    return (
        <svg
            className={`${className} graph--line`}
            width={layout.width}
            height={layout.height}
        >
            <linearGradient id="graph__gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
            {verticalTicks}
            {horizontalTicks}
            <line
                className="graph__tick"
                x1={graphDetails.xScale(200)}
                y1={graphDetails.yScale(100)}
                x2={graphDetails.xScale(20000)}
                y2={graphDetails.yScale(100)}
            />
            <line
                className="graph__tick"
                x1={graphDetails.xScale(200)}
                y1={graphDetails.yScale(200)}
                x2={graphDetails.xScale(20000)}
                y2={graphDetails.yScale(200)}
            />
            <line
                className="graph__max"
                x1={graphDetails.xScale(200)}
                y1={graphDetails.yScale(max)}
                x2={graphDetails.xScale(20000)}
                y2={graphDetails.yScale(max)}
            />
            <path
                className="graph__area"
                d={area}
                fill="url('#graph__gradient')"
            />
            <path className="graph__data" key={line} d={line} />
        </svg>
    );
};

export default LineGraph;
