export const buildOctave = a => ({
    b: a * Math.pow(2, 2 / 12),
    aSharp: a * Math.pow(2, 1 / 12),
    a: a,
    gSharp: a * Math.pow(2, -1 / 12),
    g: a * Math.pow(2, -2 / 12),
    fSharp: a * Math.pow(2, -3 / 12),
    f: a * Math.pow(2, -4 / 12),
    e: a * Math.pow(2, -5 / 12),
    dSharp: a * Math.pow(2, -6 / 12),
    d: a * Math.pow(2, -7 / 12),
    cSharp: a * Math.pow(2, -8 / 12),
    c: a * Math.pow(2, -9 / 12)
});

export const transpose = (freq, steps) => freq * Math.pow(2, steps / 12);

export const notes = [
    { name: "C4", value: 261.63 },
    { name: "C#4", value: 277.18 },
    { name: "D4", value: 293.66 },
    { name: "D#4", value: 311.13 },
    { name: "E4", value: 329.63 },
    { name: "F4", value: 349.23 },
    { name: "F#4", value: 369.99 },
    { name: "G4", value: 392.0 },
    { name: "G#4", value: 415.3 },
    { name: "A4", value: 440.0 },
    { name: "A#4", value: 466.16 },
    { name: "B4", value: 493.88 },
    { name: "C5", value: 523.25 },
    { name: "C#5", value: 554.37 },
    { name: "D5", value: 587.33 },
    { name: "D#5", value: 622.25 },
    { name: "E5", value: 659.26 },
    { name: "F5", value: 698.46 },
    { name: "F#5", value: 739.99 },
    { name: "G5", value: 783.99 },
    { name: "G#5", value: 830.61 }
];

export const C_Maj = [
    { name: "C3", value: transpose(261.63, -12) },
    { name: "D3", value: transpose(293.66, -12) },
    { name: "E3", value: transpose(329.63, -12) },
    { name: "F3", value: transpose(349.23, -12) },
    { name: "G3", value: transpose(392.0, -12) },
    { name: "A3", value: transpose(440.0, -12) },
    { name: "B3", value: transpose(493.88, -12) },
    { name: "C4", value: transpose(523.25, -12) },
    { name: "D4", value: transpose(587.33, -12) },
    { name: "E4", value: transpose(659.26, -12) },
    { name: "F4", value: transpose(698.46, -12) },
    { name: "G4", value: transpose(783.99, -12) },
    { name: "C4", value: 261.63 },
    { name: "D4", value: 293.66 },
    { name: "E4", value: 329.63 },
    { name: "F4", value: 349.23 },
    { name: "G4", value: 392.0 },
    { name: "A4", value: 440.0 },
    { name: "B4", value: 493.88 },
    { name: "C5", value: 523.25 },
    { name: "D5", value: 587.33 },
    { name: "E5", value: 659.26 },
    { name: "F5", value: 698.46 },
    { name: "G5", value: 783.99 }
];
