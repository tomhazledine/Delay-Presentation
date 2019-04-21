import React from "react";

import PathOne from "../illustrations/PathOne";

const SignalPath = () => (
    <div className="signal-path">
        <PathOne />
        <div className="signal-path__labels">
            <span className="signal-path__label">
                Instrument
                <br />
                (oscillator)
            </span>
            <span className="signal-path__label">
                Mixer
                <br />
                (gainNode)
            </span>
            <span className="signal-path__label">
                Speakers
                <br />
                (context.destination)
            </span>
        </div>
    </div>
);

export default SignalPath;
