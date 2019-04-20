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
