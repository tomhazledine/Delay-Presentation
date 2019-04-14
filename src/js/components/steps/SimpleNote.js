import React, { useState, useContext } from "react";

import { AudioContext } from "../Main.js";
import { getRandomInt } from "../../helpers/utils";

const SimpleNote = ({}) => {
    const context = useContext(AudioContext);
    const [note, setNote] = useState(null);

    const createNote = context => {
        var osc = context.createOscillator();
        osc.frequency.value = getRandomInt(220, 880);
        osc.connect(context.destination);
        return osc;
    };

    const playNote = (context, note) => {
        note.start(context.currentTime);
        note.stop(context.currentTime + 0.25);
    };

    const handleNoteTrigger = () => {
        const note = createNote(context);
        playNote(context, note);
    };

    const handleNoteToggle = () => {
        if (note) {
            note.stop();
            setNote(null);
        } else {
            const note = createNote(context);
            note.start();
            setNote(note);
        }
    };

    return (
        <div>
            <h1>App</h1>
            <button className="js__toggle-pulse" onClick={handleNoteToggle}>
                Pulse On
            </button>
            <button className="js__trigger-pulse" onClick={handleNoteTrigger}>
                Trigger Pulse
            </button>
        </div>
    );
};

export default SimpleNote;
