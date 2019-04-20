import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main.js";
import { getRandomInt } from "../../helpers/utils";

const SimpleNote = ({ showDrone = false, showPulse = false }) => {
    const { context, master } = useContext(AudioContext);
    const [note, setNote] = useState(null);
    const [playing, setPlaying] = useState({ drone: false, pulse: false });

    const createNote = (context, pitch = getRandomInt(220, 880)) => {
        const osc = context.createOscillator();
        osc.frequency.value = pitch;
        osc.connect(master);
        return osc;
    };

    const playNote = (context, note) => {
        note.start(context.currentTime);
        note.stop(context.currentTime + 0.25);
    };

    const handleNoteTrigger = () => {
        const note = createNote(context, 440);
        playNote(context, note);
    };

    const handleNoteToggle = () => {
        if (note) {
            note.stop();
            setNote(null);
            setPlaying({ ...playing, drone: false });
        } else {
            const note = createNote(context, 440);
            note.start();
            setNote(note);
            setPlaying({ ...playing, drone: true });
        }
    };

    useEffect(() => {
        return function cleanup() {
            if (note) {
                note.stop();
                setNote(null);
            }
        };
    });

    return (
        <div className="note__controls">
            {showDrone ? (
                <button
                    className={`
                        button-toggle
                        button-toggle--drone
                        button-toggle--${playing.drone ? "active" : "inactive"}
                    `}
                    onClick={handleNoteToggle}
                >
                    {playing.drone ? "Stop" : "Start"} Drone
                </button>
            ) : null}
            {showPulse ? (
                <button
                    className={`
                        button-toggle
                        button-toggle--pulse
                        button-toggle--${playing.drone ? "active" : "inactive"}
                    `}
                    onMouseDown={handleNoteTrigger}
                >
                    Pulse
                </button>
            ) : null}
        </div>
    );
};

export default SimpleNote;
