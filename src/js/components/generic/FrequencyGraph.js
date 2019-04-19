import React, { useEffect, useState, useContext } from "react";

import { AudioContext } from "../Main";

import LineGraph from "./LineGraph";

export const DataContext = React.createContext();

const FrequencyGraph = () => {
    const { context, master } = useContext(AudioContext);

    const [analyser, setAnalyser] = useState(false);
    const [data, setData] = useState(false);

    const trimFrequencies = bins => {
        const sampleRate = 44100;
        const fftSize = 1024;
        // const bottomThreshold = -200; // 200Hz
        const topThreshold = 20000; // 20kHz

        var result = [];

        for (var i = 1; i <= bins.length; i++) {
            // Calculate the frequency for each "bin".
            var frequency = (i * sampleRate) / fftSize;
            if (frequency < topThreshold) {
                var output = { frequency, value: bins[i - 1] };
                // output.frequency = frequency;
                // output.value = bins[i - 1]; // Strength of signal at selected frequency
                result.push(output);
            }
        }

        return result;
    };

    const onAudioFrame = () => {
        // Don't do anything if we don't have an analyser
        if (analyser) {
            // Create a new Uint8Array to inject the frequency data into
            let frequencyData = new Uint8Array(analyser.frequencyBinCount);

            // Inject the frequency data into the array
            analyser.getByteFrequencyData(frequencyData);

            const trimmedFrequencyData = trimFrequencies(frequencyData);

            if (data !== trimmedFrequencyData) {
                setData(trimmedFrequencyData);
            }
        }

        // On the next animation frame, repeat the process
        requestAnimationFrame(onAudioFrame);
    };

    useEffect(() => {
        console.log("context has changed");
        if (master && context) {
            console.log("setting up analyser");
            const newAnalyser = context.createAnalyser();
            master.connect(newAnalyser);
            const newDataArray = new Uint8Array(newAnalyser.frequencyBinCount);
            const parsedData = trimFrequencies(newDataArray);
            setData(parsedData);
            setAnalyser(newAnalyser);
        }
    }, [context, master]);

    useEffect(() => {
        onAudioFrame();
    }, [analyser]);

    useEffect(() => {}, [data]);

    return (
        <div className="frequency-graph__wrapper">
            frequency
            <div className="controlPadBase">
                <div className="screw screw_1">
                    <span className="screwInner" />
                </div>
                <div className="screw screw_2">
                    <span className="screwInner" />
                </div>
                <div className="screw screw_3">
                    <span className="screwInner" />
                </div>
                <div className="screw screw_4">
                    <span className="screwInner" />
                </div>
                <div className="controlPadOuter">
                    <div className="crt__wrapper">
                        <div className="crt">
                            <div className="crt__screen">
                                <span className="crt__label crt__label--top">
                                    {"- frequency (Hz) +"}
                                </span>
                                <span className="crt__label crt__label--right">
                                    - level +
                                </span>
                                <span className="crt__label crt__label--bottom">
                                    - frequency (Hz) +
                                </span>
                                <span className="crt__label crt__label--left">
                                    - level +
                                </span>
                                <DataContext.Provider value={data}>
                                    <LineGraph className="frequency-graph" />
                                </DataContext.Provider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrequencyGraph;
