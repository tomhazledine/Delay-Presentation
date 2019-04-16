import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main.js";
import { getRandomInt } from "../../helpers/utils";
import CodeBlock from "../generic/CodeBlock.js";

const SimpleNote = ({}) => {
    const context = useContext(AudioContext);
    const [note, setNote] = useState(null);

    const createNote = (context, pitch = getRandomInt(220, 880)) => {
        var osc = context.createOscillator();
        osc.frequency.value = pitch;
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
            const note = createNote(context, 220);
            note.start();
            setNote(note);
        }
    };

    useEffect(() => {
        console.log("rendering SimpleNote");
        return function cleanup() {
            console.log("derendering SimpleNote");
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

            <CodeBlock>{`some code`}</CodeBlock>
        </div>
    );
};

export default SimpleNote;
