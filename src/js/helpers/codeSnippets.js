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
