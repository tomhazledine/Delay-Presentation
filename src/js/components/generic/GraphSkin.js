import React from "react";

const GraphSkin = ({ children }) => (
    <div className="frequency-graph__wrapper">
        <div className="controlPadBase">
            <div className="screw screw_1">
                <span className="screwInner" />
            </div>
            <div className="screw screw_2">
                <span className="screwInner" />
            </div>
            <div className="screw screw_3">
                <span className="screwInner" />
            </div>
            <div className="screw screw_4">
                <span className="screwInner" />
            </div>
            <div className="controlPadOuter">
                <div className="crt__wrapper">
                    <div className="crt">
                        <div className="crt__screen">
                            <span className="crt__label crt__label--top">
                                {"- frequency (Hz) +"}
                            </span>
                            <span className="crt__label crt__label--right">
                                - level +
                            </span>
                            <span className="crt__label crt__label--bottom">
                                - frequency (Hz) +
                            </span>
                            <span className="crt__label crt__label--left">
                                - level +
                            </span>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default GraphSkin;
