import React, { useState, useEffect } from "react";

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
        current: 6,
        total: 20
    });

    useEffect(() => {
        setContext(new (window.AudioContext || window.webkitAudioContext)());
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

    return (
        <AudioContext.Provider value={{ context, master }}>
            <SlidesContext.Provider value={[slides, setSlides]}>
                <ProgressBar />

                {slides.current === 1 ? (
                    <React.Fragment>
                        {/* <Header
                            title={"Audio Context"}
                            subtitle={"Setup our context"}
                        /> */}
                        <CodeBlock>{codeSnippets.cs1}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 2 ? (
                    <React.Fragment>
                        {/* <Header
                            title={"Audio Context"}
                            subtitle={"Setup our context"}
                        /> */}
                        <CodeBlock>{codeSnippets.cs2}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 3 ? (
                    <React.Fragment>
                        {/* <Header
                            title={"Audio Context"}
                            subtitle={"Create a master gain node"}
                        /> */}
                        <CodeBlock>{codeSnippets.cs3}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 4 ? (
                    <React.Fragment>
                        {/* <Header
                            title={"Create a note"}
                            subtitle={
                                "Setup an oscillator, give it a pitch value, and connect it to our master gain node"
                            }
                        /> */}
                        <CodeBlock>{codeSnippets.cs4}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 5 ? (
                    <React.Fragment>
                        {/* <Header title={"Create a note"} /> */}
                        <div className="note__wrapper">
                            <SimpleNote showDrone={true} />
                        </div>
                        <CodeBlock>{codeSnippets.cs5}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 6 ? (
                    <React.Fragment>
                        {/* <Header title={"Create a note"} /> */}
                        <div className="note__wrapper">
                            <SimpleNote showDrone={true} />
                            <FrequencyGraph />
                        </div>
                        <CodeBlock>{codeSnippets.cs5}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 7 ? (
                    <React.Fragment>
                        {/* <Header title={"Create a note"} /> */}
                        <div className="note__wrapper">
                            <SimpleNote showPulse={true} />
                            <FrequencyGraph />
                        </div>
                        <CodeBlock>{codeSnippets.cs6}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 8 ? (
                    <React.Fragment>
                        {/* <Header title={"Create a note"} /> */}
                        <div className="note__wrapper">
                            <EnhancedNote showPulse={true} />
                            <FrequencyGraph />
                        </div>
                        <CodeBlock>{codeSnippets.cs7}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 9 ? (
                    <React.Fragment>
                        {/* <Header title={"Create a note"} /> */}
                        <div className="note__wrapper">
                            <EnhancedNote showPulse={true} randomNotes={true} />
                            <FrequencyGraph />
                        </div>
                        <CodeBlock>{codeSnippets.cs8}</CodeBlock>
                    </React.Fragment>
                ) : null}

                {slides.current === 10 ? (
                    <React.Fragment>
                        {/* <Header title={"Create a note"} /> */}
                        <div className="note__wrapper">
                            <EnhancedNote
                                showPulse={true}
                                randomNotes={true}
                                useScale={true}
                            />
                            <FrequencyGraph />
                        </div>
                        <CodeBlock>{codeSnippets.cs9}</CodeBlock>
                    </React.Fragment>
                ) : null}

                <SlideSwitcher />
            </SlidesContext.Provider>
        </AudioContext.Provider>
    );
};

export default Main;
