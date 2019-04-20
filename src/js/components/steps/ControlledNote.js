import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main";
import { getRandomInt, uuidv4 } from "../../helpers/utils";
import { C_Maj, transpose } from "../../helpers/notes";

const ControlledNote = () => {
    const { context, master } = useContext(AudioContext);
    const [options, setOptions] = useState({ attack: 0.2, release: 0.5 });
    const [tones, setTones] = useState([
        {
            wave: "sine", // sine | square | triangle | sawtooth
            volume: 1,
            offset: 0
        }
        // {
        //     wave: "square",
        //     volume: 0.2,
        //     offset: 5
        // },
        // {
        //     wave: "sawtooth",
        //     volume: 0.2,
        //     offset: 7
        // }
    ]);

    const randomNote = () => {
        const noteNumber = getRandomInt(0, C_Maj.length - 1);
        return C_Maj[noteNumber].value;
    };

    const createNote = (context, pitch = randomNote(), key = uuidv4()) => {
        const masterVca = context.createGain();

        const vcos = [];
        for (let i = 0; i < tones.length; i++) {
            const vco = context.createOscillator();
            vco.frequency.value = transpose(pitch, tones[i].offset);
            vco.type = tones[i].wave;
            const vca = context.createGain();
            vca.gain.value = tones[i].volume;
            vco.connect(vca);
            vca.connect(masterVca);
            vcos.push(vco);
        }

        masterVca.connect(master);

        return { vco: vcos, gainNode: masterVca, key, pitch };
    };

    const startNote = (note, time = 0.0001) => {
        note.vco.map(vco_n => vco_n.start(time));
        note.gainNode.gain.exponentialRampToValueAtTime(
            1,
            time + options.attack
        );
    };

    const stopNote = (note, time = 0.0001) => {
        note.gainNode.gain.exponentialRampToValueAtTime(
            0.0001,
            time + options.release
        );
        note.vco.map(vco_n => vco_n.stop(time + 1));
    };

    const playNote = (context, note) => {
        const time = context.currentTime;
        startNote(note, time);

        stopNote(note, time + 0.5);
    };

    const handleNoteTrigger = () => {
        let pitch = randomNote();
        const note = createNote(context, pitch, true);
        playNote(context, note);
    };

    const ToneButton = ({ wave, active = false }) => {
        let path =
            "M84.2 176c-26.1 0-49-15.2-66.2-43.9C5.6 111.3.4 90.8.2 89.9c-1.1-4.3 1.6-8.6 5.9-9.7 4.3-1.1 8.6 1.6 9.7 5.9.2 1 18.9 73.9 68.4 73.9 46.6 0 59.6-37.5 68.2-72.7l.3-1.2c2.9-12 8.4-34.3 20.8-52.6 15-22.2 36.2-33.5 63-33.5 25.2 0 47.9 15.2 65.4 43.8 12.7 20.7 18.3 41.2 18.5 42.1 1.2 4.3-1.4 8.7-5.6 9.8-4.3 1.2-8.7-1.4-9.8-5.6-.2-.7-20.7-74.1-68.5-74.1-21.5 0-37.8 8.6-49.8 26.4-10.8 16-15.6 35.7-18.5 47.5l-.3 1.2c-6.7 27.6-20.7 84.9-83.7 84.9z";
        if (wave === "square") {
            path =
                "M160.4 176.5H8c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8s8 3.6 8 8v72h136.4l.1-72-.1-79.9c0-2.1.8-4.2 2.3-5.7 1.5-1.5 3.5-2.3 5.7-2.3H313c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8s-8-3.6-8-8v-72H168.4l.1 72-.1 80.1c0 4.2-3.6 7.8-8 7.8z";
        }
        if (wave === "triangle") {
            path =
                "M84.2 176.5c-2.2 0-4.3-1.1-5.8-2.7L2.2 93.6c-3-3.2-2.9-8.3.3-11.4 3.2-3 8.3-3 11.3.2l70.4 73.9 70.5-73.9 76.1-79.7c1.5-1.6 3.6-2.2 5.8-2.2 2.2 0 4.3.6 5.8 2.2l76.2 79.9c3 3.2 2.9 8.2-.3 11.2-3.2 3-8.3 2.9-11.3-.3l-70.4-73.9-70.3 73.9L90 173.8c-1.5 1.6-3.6 2.7-5.8 2.7z";
        }
        if (wave === "sawtooth") {
            path =
                "M8 176c-1.4 0-2.9-.4-4.1-1.2-2.4-1.4-3.9-4-3.9-6.8V88.5c0-4.4 3.6-8 8-8s8 3.6 8 8v66.3l140.9-73.9L309.3.9c2.5-1.3 5.5-1.2 7.9.2 2.4 1.4 3.9 4 3.9 6.8v80.5c0 4.4-3.6 8-8 8s-8-3.6-8-8V21.2L164.3 95.1l-152.6 80c-1.1.6-2.4.9-3.7.9z";
        }

        return (
            <button
                className={`tone__button tone__button--${wave} tone__button--${
                    active ? "active" : "inactive"
                }`}
            >
                <svg
                    className={`tone__wave tone__wave--${wave}`}
                    viewBox="0 0 321 176.5"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d={path} />
                </svg>
            </button>
        );
    };

    const tonesDisplay = tones.map((tone, i) => (
        <div key={`tone_${i}`} className="tone">
            <span className="tone__number">{i + 1}.</span>
            <ToneButton wave="sine" active={tone.wave === "sine"} />
            <ToneButton wave="square" />
            <ToneButton wave="triangle" />
            <ToneButton wave="sawtooth" />
            <span className="tone__offset">offset: {tone.offset}</span>
        </div>
    ));

    return (
        <div className="note__controls">
            <div className="note__tones">
                <div className="tone__title">Tones</div>
                {tonesDisplay}
            </div>
            <button
                className="button-toggle button-toggle--pulse"
                onMouseDown={handleNoteTrigger}
            >
                Pulse
            </button>
        </div>
    );
};

export default ControlledNote;
