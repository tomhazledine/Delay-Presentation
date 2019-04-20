export const cs1 = `const context = new window.AudioContext();`;
export const cs2 = `const context = new (
    window.AudioContext ||
    window.webkitAudioContext
)();`;
export const cs3 = `const master = context.createGain();
master.gain.value = 0.8;
master.connect(context.destination);`;

export const cs4 = `const note = context.createOscillator();
note.frequency.value = 440.00;
note.connect(master);`;

export const cs5 = `// Start the oscillator
note.start();

// Stop the oscillator
note.stop();`;

export const cs6 = `// Start the oscillator now
note.note.start(context.currentTime);

// Stop the oscillator in .25 seconds time
note.stop(context.currentTime + 0.25);`;

export const cs7 = `// Start the oscillator gradually
note.gainNode.gain.exponentialRampToValueAtTime(1, time + 0.2);

// Stop the oscillator gradually
note.gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);`;

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
