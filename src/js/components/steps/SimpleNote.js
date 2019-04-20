import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main.js";
import { getRandomInt } from "../../helpers/utils";
import CodeBlock from "../generic/CodeBlock.js";
import FrequencyGraph from "../generic/FrequencyGraph.js";

const SimpleNote = ({}) => {
    const { context, master } = useContext(AudioContext);
    const [note, setNote] = useState(null);

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
        const note = createNote(context);
        playNote(context, note);
    };

    const handleNoteToggle = () => {
        if (note) {
            note.stop();
            setNote(null);
        } else {
            const note = createNote(context, 220);
            note.start();
            setNote(note);
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
        <div>
            <button className="js__toggle-pulse" onClick={handleNoteToggle}>
                Pulse On
            </button>
            <button className="js__trigger-pulse" onClick={handleNoteTrigger}>
                Trigger Pulse
            </button>

            <FrequencyGraph />
        </div>
    );
};

export default SimpleNote;
