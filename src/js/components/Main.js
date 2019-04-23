import React, { useState, useEffect } from "react";

import Delay from "./steps/Delay";
import EnhancedNote from "./steps/EnhancedNote";
import SimpleNote from "./steps/SimpleNote";

import DelayLoop from "./illustrations/DelayLoop";

import CodeBlock from "./generic/CodeBlock";
import Header from "./generic/Header";
import Footer from "./generic/Footer";
import FrequencyGraph from "./generic/FrequencyGraph";
import ProgressBar from "./generic/ProgressBar";
import SignalPath from "./generic/SignalPath";
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
            total: slidesArray.length - 1
            // current: slidesArray.length - 1
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
        <React.Fragment>
            <Header title={"Signal Path"} />
            <SignalPath />
        </React.Fragment>,
        <React.Fragment>
            <Header title={"Signal Path"} />
            <SignalPath showLabels={true} />
        </React.Fragment>,
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
            <Header title={"FX Loop"} />
            <SignalPath hideLabels={true} showLabels={false} showLoop={false} />
        </React.Fragment>,
        <React.Fragment>
            <Header title={"FX Loop"} />
            <SignalPath hideLabels={true} showLabels={false} showLoop={true} />
        </React.Fragment>,
        <React.Fragment>
            <Header title={"FX Loop"} />
            <div className="delay-loop__wrapper">
                <DelayLoop className="svg__delay-loop--large" />
            </div>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <Delay showDelayControls={false} delay={40} />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.delay}</CodeBlock>
        </React.Fragment>,
        <React.Fragment>
            <Header title={"FX Loop"} />
            <div className="delay-loop__wrapper">
                <DelayLoop className="svg__delay-loop--large" />
                <svg viewBox="0 0 200 200" className="delay-loop__feedback">
                    <line
                        className="svg__signal--loop"
                        x1={200}
                        y1={0}
                        x2={0}
                        y2={0}
                        stroke="red"
                        fill="none"
                        strokeWidth="43"
                        strokeDasharray="24,20"
                    />
                </svg>
            </div>
        </React.Fragment>,
        <React.Fragment>
            <div className="note__wrapper">
                <Delay
                    showDelayControls={false}
                    delayProp={40}
                    feedbackProp={30}
                />
                <FrequencyGraph />
            </div>
            <CodeBlock>{codeSnippets.delay_feedback}</CodeBlock>
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
        </React.Fragment>
    ];

    return (
        <AudioContext.Provider value={{ context, master }}>
            <SlidesContext.Provider value={[slides, setSlides]}>
                <ProgressBar />

                {slidesArray[slides.current]}

                <Footer />
                <SlideSwitcher />
            </SlidesContext.Provider>
        </AudioContext.Provider>
    );
};

export default Main;
