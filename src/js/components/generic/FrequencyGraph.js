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
        const bottomThreshold = 200; // 200Hz
        const topThreshold = 20000; // 20kHz

        // const result = bins
        //     .map((bin, i) => {
        //         // console.log(bin);
        //         const frequency = (i * sampleRate) / fftSize;
        //         if (frequency > bottomThreshold && frequency < topThreshold) {
        //             return { frequency: frequency, value: bin };
        //         }
        //     })
        //     .filter(bin => bin);

        var result = [];

        for (var i = 1; i <= bins.length; i++) {
            // Calculate the frequency for each "bin".
            var frequency = (i * sampleRate) / fftSize;
            if (frequency > bottomThreshold && frequency < topThreshold) {
                var output = [];
                output["frequency"] = frequency;
                output["value"] = bins[i - 1]; // Strength of signal at selected frequency
                result.push(output);
            }
        }

        // console.log(result);

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
            <DataContext.Provider value={data}>
                <LineGraph className="frequency-graph" />
            </DataContext.Provider>
        </div>
    );
};

export default FrequencyGraph;
