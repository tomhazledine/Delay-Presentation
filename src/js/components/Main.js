import React, { useState, useEffect } from "react";

import SimpleNote from "./steps/SimpleNote";

export const AudioContext = React.createContext();

const Main = ({}) => {
    const [context, setContext] = useState(null);
    const [note, setNote] = useState(null);

    const createNote = context => {
        var osc = context.createOscillator();
        osc.frequency.value = 440.0;
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

    useEffect(() => {
        setContext(new (window.AudioContext || window.webkitAudioContext)());
    }, []);

    return (
        <AudioContext.Provider value={context}>
            <div className="mainWrapper">
                <h1>App</h1>
                <SimpleNote />
            </div>
        </AudioContext.Provider>
    );
};

export default Main;
