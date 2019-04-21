import React from "react";

import PathOne from "../illustrations/PathOne";

const SignalPath = ({ showLabels = false }) => (
    <div className="signal-path">
        <PathOne />
        <div className="signal-path__labels">
            <div className="signal-path__label">
                <div className="signal-path__label-inner">Instrument</div>
                {showLabels ? (
                    <div className="signal-path__label-inner">(oscillator)</div>
                ) : null}
            </div>
            <div className="signal-path__label">
                <div className="signal-path__label-inner">Mixer</div>
                {showLabels ? (
                    <div className="signal-path__label-inner">(gainNode)</div>
                ) : null}
            </div>
            <div className="signal-path__label">
                <div className="signal-path__label-inner">Speakers</div>
                {showLabels ? (
                    <div className="signal-path__label-inner">
                        (context.destination)
                    </div>
                ) : null}
            </div>
        </div>
    </div>
);

export default SignalPath;
