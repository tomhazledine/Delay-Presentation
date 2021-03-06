import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main";
import { getRandomInt, uuidv4 } from "../../helpers/utils";
import { C_Maj, C_Maj_bass, transpose } from "../../helpers/notes";

import RangeSlider from "../generic/RangeSlider";

const Showcase = ({
    useScale = true,
    randomNotes = true,
    showDelayControls = true,
    delayProp = 40,
    feedbackProp = 70,
    useFilter = false
}) => {
    const { context, master } = useContext(AudioContext);

    const [tones, setTones] = useState([
        {
            wave: "sine", // sine | square | triangle | sawtooth
            volume: 1,
            offset: 0
        },
        {
            wave: "sine",
            volume: 0.2,
            offset: 7
        }
    ]);
    const [bassTones, setBassTones] = useState([
        {
            wave: "triangle", // sine | square | triangle | sawtooth
            volume: 0.1,
            offset: 0
        },
        {
            wave: "sine", // sine | square | triangle | sawtooth
            volume: 0.2,
            offset: 7
        }
    ]);

    const [delayOptions, setDelayOptions] = useState({
        duration: delayProp,
        feedback: feedbackProp,
        node: null
    });
    const [delay, setDelay] = useState(null);

    const randomNote = () => {
        if (useScale) {
            const noteNumber = getRandomInt(0, C_Maj.length - 1);
            return C_Maj[noteNumber].value;
        } else {
            return getRandomInt(220, 880);
        }
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
        if (delay) {
            masterVca.connect(delay.delayNode);
        }

        return { vco: vcos, gainNode: masterVca, key, pitch };
    };

    const createBassNote = (context, pitch = randomNote(), key = uuidv4()) => {
        const masterVca = context.createGain();

        const vcos = [];
        for (let i = 0; i < bassTones.length; i++) {
            const vco = context.createOscillator();
            vco.frequency.value = transpose(pitch, bassTones[i].offset);
            vco.type = bassTones[i].wave;
            const vca = context.createGain();
            vca.gain.value = bassTones[i].volume;
            vco.connect(vca);
            vca.connect(masterVca);
            vcos.push(vco);
        }

        masterVca.connect(master);

        return { vco: vcos, gainNode: masterVca, key, pitch };
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

    const playBassNote = (context, note) => {
        const time = context.currentTime;
        startNote(note, time);

        stopNote(note, time + 20);
    };

    const handleNoteTrigger = () => {
        let pitch = randomNotes ? randomNote() : 440;
        const note = createNote(context, pitch, true);
        playNote(context, note);
    };

    const handleDelayDurationChange = e => {
        const newDuration = e.target.value;
        setDelayOptions({ ...delayOptions, duration: newDuration });
    };
    const handleDelayFeedbackChange = e => {
        const newFeedback = e.target.value;
        setDelayOptions({ ...delayOptions, feedback: newFeedback });
    };

    useEffect(() => {
        setDelayOptions({
            ...delayOptions,
            feedback: feedbackProp,
            delay: delayProp
        });
    }, []);

    useEffect(() => {
        if (delay) {
            delay.delayNode.delayTime.value = delayOptions.duration / 100;
            delay.delayFeedback.gain.value = delayOptions.feedback / 100;
        }
    }, [delayOptions]);

    useEffect(() => {
        if (context && master) {
            const delayNode = context.createDelay();
            delayNode.delayTime.value = delayOptions.duration / 100;

            const delayFeedback = context.createGain();
            delayFeedback.gain.value = delayOptions.feedback / 100;

            delayNode.connect(delayFeedback);

            const delayFilter = context.createBiquadFilter();
            delayFilter.frequency.value = 2000;
            delayFilter.type = "lowshelf";

            if (useFilter) {
                delayFeedback.connect(delayFilter);
                delayFilter.connect(delayNode);
            } else {
                delayFeedback.connect(delayNode);
            }

            delayNode.connect(master);

            setDelay({ delayNode, delayFeedback, delayFilter });
        }
    }, [context, master]);

    const handleKeyDown = e => {
        // console.log(e.code);
        if (e.code === "KeyA") {
            const note = createBassNote(context, C_Maj_bass[0].value, true);
            playBassNote(context, note);
        }
        if (e.code === "KeyS") {
            const note = createBassNote(context, C_Maj_bass[3].value, true);
            playBassNote(context, note);
        }
        if (e.code === "KeyD") {
            const note = createBassNote(context, C_Maj_bass[4].value, true);
            playBassNote(context, note);
        }
        if (e.code === "KeyF") {
            let pitch = randomNotes ? randomNote() : 440;
            const note = createNote(context, pitch, true);
            playNote(context, note);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    });

    return (
        <div className="note__controls">
            {showDelayControls ? (
                <React.Fragment>
                    <div className="rangeOuter">
                        <h4>Duration: {delayOptions.duration}0ms</h4>
                        <RangeSlider
                            min={0}
                            max={100}
                            value={delayOptions.duration}
                            onChange={handleDelayDurationChange}
                        />
                    </div>
                    <div className="rangeOuter">
                        <h4>Feedback: {delayOptions.feedback}%</h4>
                        <RangeSlider
                            min={0}
                            max={100}
                            value={delayOptions.feedback}
                            onChange={handleDelayFeedbackChange}
                        />
                    </div>
                </React.Fragment>
            ) : null}
            <button
                className={`
                        button-toggle
                        button-toggle--pulse
                    `}
                onMouseDown={handleNoteTrigger}
            >
                Pulse
            </button>
        </div>
    );
};

export default Showcase;
