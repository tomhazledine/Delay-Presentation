import React, { useState, useEffect } from "react";

import ControlledNote from "./steps/ControlledNote";
import Delay from "./steps/Delay";
import EnhancedNote from "./steps/EnhancedNote";
import SimpleNote from "./steps/SimpleNote";

import CodeBlock from "./generic/CodeBlock";
import Header from "./generic/Header";
import FrequencyGraph from "./generic/FrequencyGraph";
import ProgressBar from "./generic/ProgressBar";
import SlideSwitcher from "./generic/SlideSwitcher";

export const AudioContext = React.createContext();
export const SlidesContext = React.createContext();

import * as codeSnippets from "../helpers/codeSnippets";

const Main = ({}) => {
    const [context, setContext] = useState(null);
    const [master, setMaster] = useState(null);
    const [slides, setSlides] = useState({
        showNav: false,
        current: 0,
        total: 20
    });

    useEffect(() => {
        setContext(new (window.AudioContext || window.webkitAudioContext)());

        // setSlides({ ...slides, total: slidesArray.length - 1 });
        setSlides({
            ...slides,
            total: slidesArray.length - 1,
            current: slidesArray.length - 1
        });
    }, []);

    useEffect(() => {
        if (context) {
            const master = context.createGain();
            master.gain.value = 0.2;
            setMaster(master);
        }
    }, [context]);

    useEffect(() => {
        if (master && context) {
            master.connect(context.destination);
        }
    }, [master]);

    useEffect(() => {
        // console.log("slide has changed!", slides);
    }, [slides.current]);

    const slidesArray = [
        <React.Fragment>
            <Header
                title={"Audio Context"}
                subtitle={"Create a master gain node"}
            />
        </React.Fragment>,
        <CodeBlock>{codeSnippets.cs1}</CodeBlock>,
        <CodeBlock>{codeSnippets.cs2}</CodeBlock>,
        <CodeBlock>{codeSnippets.cs3}</CodeBlock>,
        <CodeBlock>{codeSnippets.cs4}</CodeBlock>,
        <React.Fragment>
            <div className="note__wrapper">
                <SimpleNote showDrone={true} />
            </div>
            <CodeBlock>{codeSnippets.cs5}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <SimpleNote showDrone={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.cs5}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <SimpleNote showPulse={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.cs6}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote showPulse={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.cs7}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote showPulse={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.cs7b}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote showPulse={true} randomNotes={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.cs8}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote
                    showPulse={true}
                    randomNotes={true}
                    useScale={true}
                />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.cs9}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote
                    showPulse={true}
                    randomNotes={true}
                    useScale={true}
                    complex={true}
                />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.cs10}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <Delay
                    showPulse={true}
                    randomNotes={true}
                    useScale={true}
                    complex={true}
                />
                <FrequencyGraph />
            </div>
        </React.Fragment>
    ];

    return (
        <AudioContext.Provider value={{ context, master }}>
            <SlidesContext.Provider value={[slides, setSlides]}>
                <ProgressBar />

                {slidesArray[slides.current]}

                <SlideSwitcher />
            </SlidesContext.Provider>
        </AudioContext.Provider>
    );
};

export default Main;
