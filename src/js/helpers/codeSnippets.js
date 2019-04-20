export const cs1 = `const context = new (window.AudioContext || window.webkitAudioContext)();

const master = context.createGain();
master.gain.value = 0.2;
master.connect(context.destination);

const osc = context.createOscillator();
osc.frequency.value = pitch;
osc.connect(master);`;
