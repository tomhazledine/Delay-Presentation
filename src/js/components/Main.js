import React, { useState, useEffect } from "react";

import ControlledNote from "./steps/ControlledNote";
import Delay from "./steps/Delay";
import EnhancedNote from "./steps/EnhancedNote";
import SimpleNote from "./steps/SimpleNote";

import Mixer from "./illustrations/Mixer";

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
        <CodeBlock>{codeSnippets.context}</CodeBlock>,
        <CodeBlock>{codeSnippets.context_crossbrowser}</CodeBlock>,
        <CodeBlock>{codeSnippets.master}</CodeBlock>,
        <CodeBlock>{codeSnippets.vco}</CodeBlock>,
        <React.Fragment>
            <div className="note__wrapper">
                <SimpleNote showDrone={true} />
            </div>
            <CodeBlock>{codeSnippets.drone}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <SimpleNote showDrone={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.drone}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <SimpleNote showPulse={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.pulse}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote showPulse={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.ramp1}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote showPulse={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.ramp2}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <EnhancedNote showPulse={true} randomNotes={true} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.random}</CodeBlock>
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
            <CodeBlock>{codeSnippets.scale}</CodeBlock>
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
            <CodeBlock>{codeSnippets.dualtone}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <Delay showDelayControls={false} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.delay}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <Delay showDelayControls={false} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.delay_connections}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <Delay showDelayControls={true} />
                <FrequencyGraph />
            </div>
        </React.Fragment>,
        <Mixer />
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
