export const cs1 = `const context = new window.AudioContext();`;
export const cs2 = `const context = new (
    window.AudioContext ||
    window.webkitAudioContext
)();`;
export const cs3 = `const master = context.createGain();
master.gain.value = 0.8;
master.connect(context.destination);`;

export const cs4 = `const VCO = context.createOscillator();
VCO.frequency.value = 440.00;
VCO.connect(master);`;

export const cs5 = `// Start the oscillator
VCO.start();

// Stop the oscillator
VCO.stop();`;

export const cs6 = `// Start the oscillator now
VCO.start(context.currentTime);

// Stop the oscillator in .25 seconds time
VCO.stop(context.currentTime + 0.25);`;

export const cs7 = `
const note = {
    vco: context.createOscillator(),
    vca: context.createGain() 
}
note.vco.connect(note.vca);
note.vca.connect(master);`;

export const cs7b = `// Start the oscillator gradually
note.vca.gain.exponentialRampToValueAtTime(1, time + 0.2);

// Stop the oscillator gradually
note.vca.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);`;

export const cs8 = `const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

note.frequency.value = getRandomInt(220, 880);`;

export const cs9 = `const C_Maj = [
    { name: "C4", value: 261.63 },
    { name: "D4", value: 293.66 },
    { name: "E4", value: 329.63 },
    ...
];

const noteNumber = getRandomInt(0, C_Maj.length - 1);

note.frequency.value = C_Maj[noteNumber].value;`;

export const cs10 = `
const transpose = (freq, steps) => freq * Math.pow(2, steps / 12);

const note = {
    ...note,
    vco2: context.createOscillator(),
    vca2: context.createGain()
};

note.vco2.frequency.value = transpose(pitch, 7);
note.vco2.connect(note.vca2);
note.vca2.connect(master);`;
