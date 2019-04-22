import React from "react";

import PathOne from "../illustrations/PathOne";
import DelayLoop from "../illustrations/DelayLoop";

const SignalPath = ({
    hideLabels = false,
    showLabels = false,
    showLoop = false
}) => (
    <div className="signal-path">
        <PathOne />
        <div className="signal-path__labels">
            <div className="signal-path__label">
                {!hideLabels ? (
                    <div className="signal-path__label-inner">Instrument</div>
                ) : null}
                {showLabels ? (
                    <div className="signal-path__label-inner">(oscillator)</div>
                ) : null}
            </div>
            <div className="signal-path__label">
                {!hideLabels ? (
                    <div className="signal-path__label-inner">Mixer</div>
                ) : null}
                {showLabels ? (
                    <div className="signal-path__label-inner">(gainNode)</div>
                ) : null}
            </div>
            <div className="signal-path__label">
                {!hideLabels ? (
                    <div className="signal-path__label-inner">Speakers</div>
                ) : null}
                {showLabels ? (
                    <div className="signal-path__label-inner">
                        (context.destination)
                    </div>
                ) : null}
            </div>
        </div>
        {showLoop ? <DelayLoop className="svg__delay-loop--small" /> : null}
    </div>
);

export default SignalPath;
