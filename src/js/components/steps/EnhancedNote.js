import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main";
import { getRandomInt, uuidv4 } from "../../helpers/utils";
import CodeBlock from "../generic/CodeBlock";
import FrequencyGraph from "../generic/FrequencyGraph";
import { C_Maj, transpose } from "../../helpers/notes";

const EnhancedNote = ({}) => {
    const { context, master } = useContext(AudioContext);
    const [notes, setNotes] = useState([]);

    const randomNote = () => {
        const noteNumber = getRandomInt(0, C_Maj.length - 1);
        return C_Maj[noteNumber].value;
    };

    const createNote = (
        context,
        pitch = getRandomInt(220, 880),
        complex = false,
        key = uuidv4()
    ) => {
        const vco = [];
        const vco1 = context.createOscillator();
        vco.push(vco1);
        vco[0].frequency.value = pitch;

        const masterVca = context.createGain();
        vco[0].connect(masterVca);

        if (complex) {
            const vco2 = context.createOscillator();
            vco2.frequency.value = transpose(pitch, 7);

            const secondaryVca = context.createGain();
            secondaryVca.gain.value = 0.3;
            vco2.connect(secondaryVca);
            secondaryVca.connect(masterVca);
            vco.push(vco2);
        }

        masterVca.connect(master);

        return { vco, gainNode: masterVca, key, pitch };
    };

    const startNote = (note, time = 0.0001) => {
        note.vco.map(vco_n => vco_n.start(time));
        // note.vco1.start(time);
        // note.vco2.start(time);
        note.gainNode.gain.exponentialRampToValueAtTime(1, time + 0.2);
    };

    const stopNote = (note, time = 0.0001) => {
        note.gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
        note.vco.map(vco_n => vco_n.stop(time + 1));
        // note.vco1.stop(time + 1);
        // note.vco2.stop(time + 1);
    };

    const playNote = (context, note) => {
        const time = context.currentTime;
        startNote(note, time);

        stopNote(note, time + 0.5);
    };

    const handleNoteTrigger = () => {
        const note = createNote(context, randomNote(), true);
        playNote(context, note);
    };

    const handleNoteToggle = () => {
        const oldNote = notes.find(note => note.key === "root");
        if (oldNote) {
            console.log("oldNote", oldNote);
            stopNote(oldNote);
            setNotes([]);
        } else {
            const droneFreq = transpose(C_Maj[0].value, -12);
            const newNote = createNote(context, droneFreq, false, "root");
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
