export const context = `const context = new window.AudioContext();`;
export const context_crossbrowser = `const context = new (
    window.AudioContext ||
    window.webkitAudioContext
)();`;
export const master = `const master = context.createGain();
master.gain.value = 0.8;
master.connect(context.destination);`;

export const vco = `const VCO = context.createOscillator();
VCO.frequency.value = 440.00;
VCO.connect(master);`;

export const drone = `// Start the oscillator
VCO.start();

// Stop the oscillator
VCO.stop();`;

export const pulse = `// Start the oscillator now
VCO.start(context.currentTime);

// Stop the oscillator in .25 seconds time
VCO.stop(context.currentTime + 0.25);`;

export const ramp1 = `
const note = {
    vco: context.createOscillator(),
    vca: context.createGain() 
}
note.vco.connect(note.vca);
note.vca.connect(master);`;

export const ramp2 = `// Start the oscillator gradually
note.vca.gain.exponentialRampToValueAtTime(1, time + 0.2);

// Stop the oscillator gradually
note.vca.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);`;

export const random = `const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

note.frequency.value = getRandomInt(220, 880);`;

export const scale = `const C_Maj = [
    { name: "C4", value: 261.63 },
    { name: "D4", value: 293.66 },
    { name: "E4", value: 329.63 },
    ...
];

const noteNumber = getRandomInt(0, C_Maj.length - 1);

note.frequency.value = C_Maj[noteNumber].value;`;

export const dualtone = `const transpose = (freq, steps) => freq * Math.pow(2, steps / 12);

const note = {
    ...note,
    vco2: context.createOscillator(),
    vca2: context.createGain()
};

note.vco2.frequency.value = transpose(pitch, 7);
note.vco2.connect(note.vca2);
note.vca2.connect(master);`;

export const delay = `const delay = context.createDelay();
delay.delayTime.value = 0.4;

delay.connect(master);`;

export const delay_feedback = `

const feedback = context.createGain();
feedback.gain.value = 0.3;

delay.connect(feedback);
feedback.connect(delay);
delay.connect(master);`;

export const delay_filter = `
const filter = context.createBiquadFilter();
filter.frequency.value = 2e3;`;

export const delay_connections = `delay.connect(feedback);
feedback.connect(filter);
filter.connect(delay);
delay.connect(master);`;

export const all_the_things = `import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main";
import { getRandomInt, uuidv4 } from "../../helpers/utils";
import { C_Maj, transpose } from "../../helpers/notes";

import RangeSlider from "../generic/RangeSlider";

const Delay = ({
    useScale = true,
    randomNotes = true,
    showDelayControls = false,
    delayProp = 40,
    feedbackProp = 0,
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

    return (
        '<div className="note__controls">
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
                className={\`
                        button-toggle
                        button-toggle--pulse
                    \`}
                onMouseDown={handleNoteTrigger}
            >
                Pulse
            </button>
        </div>'
    );
};

export default Delay;
`;
