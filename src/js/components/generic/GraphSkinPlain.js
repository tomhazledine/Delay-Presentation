import React from "react";

const GraphSkin = ({ children }) => (
    <div className="crt__screen">
        <span className="crt__label crt__label--top">
            {"- frequency (Hz) +"}
        </span>
        <span className="crt__label crt__label--right">- level +</span>
        <span className="crt__label crt__label--bottom">
            - frequency (Hz) +
        </span>
        <span className="crt__label crt__label--bottom-left">20Hz</span>
        <span className="crt__label crt__label--bottom-right">200kHz</span>
        <span className="crt__label crt__label--left">- level +</span>
        {children}
    </div>
);

export default GraphSkin;
