import React from "react";
import * as d3 from "d3";

const LineGraph = ({ data, className }) => {
    const layout = {
        width: 400,
        height: 300
    };

    const graphDetails = {
        xScale: d3.scaleLinear().range([0, layout.width]),
        yScale: d3.scaleLinear().range([layout.height, 0]),
        lineGenerator: d3.line()
    };

    const xDomain = d3.extent(data, d => d.x); //parseInt(d.year));

    const yMax = d3.max(data, d => d.y);

    graphDetails.xScale.domain(xDomain);
    graphDetails.yScale.domain([0, yMax]);

    const lines = graphDetails => {
        graphDetails.lineGenerator.x(d => graphDetails.xScale(d.x));
        graphDetails.lineGenerator.y(d => graphDetails.yScale(d.y));
        let line = graphDetails.lineGenerator(data);

        return <path d={line} fill="none" stroke={"black"} />;
    };

    return (
        <svg
            className={`${className} graph--line`}
            width={layout.width}
            height={layout.height}
        >
            {lines(graphDetails)}
        </svg>
    );
};

export default LineGraph;
