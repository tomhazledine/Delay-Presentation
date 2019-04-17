import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main.js";
import { getRandomInt, uuidv4 } from "../../helpers/utils";
import CodeBlock from "../generic/CodeBlock.js";
import FrequencyGraph from "../generic/FrequencyGraph.js";

const EnhancedNote = ({}) => {
    const { context, master } = useContext(AudioContext);
    const [notes, setNotes] = useState([]);

    const createNote = (
        context,
        pitch = getRandomInt(220, 880),
        key = uuidv4()
    ) => {
        const vco1 = context.createOscillator();
        vco1.frequency.value = pitch;

        const vco2 = context.createOscillator();
        vco2.frequency.value = pitch * 0.5;

        const secondaryVca = context.createGain();
        secondaryVca.gain.value = 0.3;
        vco2.connect(secondaryVca);

        const masterVca = context.createGain();
        vco1.connect(masterVca);
        secondaryVca.connect(masterVca);
        masterVca.connect(master);

        return { vco1, vco2, gainNode: masterVca, key, pitch };
    };

    const startNote = (note, time = 0.0001) => {
        note.vco1.start(time);
        note.vco2.start(time);
        note.gainNode.gain.exponentialRampToValueAtTime(1, time + 0.2);
    };

    const stopNote = (note, time = 0.0001) => {
        note.gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
        note.vco1.stop(time + 1);
        note.vco2.stop(time + 1);
    };

    const playNote = (context, note) => {
        const time = context.currentTime;
        startNote(note, time);

        stopNote(note, time + 0.5);
    };

    const handleNoteTrigger = () => {
        const note = createNote(context);
        playNote(context, note);
    };

    const handleNoteToggle = () => {
        const oldNote = notes.find(note => note.key === "root");
        if (oldNote) {
            console.log("oldNote", oldNote);
            stopNote(oldNote);
            setNotes([]);
        } else {
            const newNote = createNote(context, 220, "root");
            console.log("newNote", newNote);
            startNote(newNote);
            setNotes([...notes, newNote]);
        }
    };

    useEffect(() => {
        return function cleanup() {
            if (notes.length > 0) {
                notes.forEach(note => {
                    stopNote(note);
                });
                setNotes([]);
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

            <CodeBlock>{`some code`}</CodeBlock>
        </div>
    );
};

export default EnhancedNote;
