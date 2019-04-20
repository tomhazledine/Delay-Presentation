import React, { useState, useEffect } from "react";

import EnhancedNote from "./steps/EnhancedNote";
import SimpleNote from "./steps/SimpleNote";

import CodeBlock from "./generic/CodeBlock";
import Header from "./generic/Header";
import ProgressBar from "./generic/ProgressBar";
import SlideLayout from "./generic/SlideLayout";
import SlideSwitcher from "./generic/SlideSwitcher";

export const AudioContext = React.createContext();
export const SlidesContext = React.createContext();

import * as codeSnippets from "../helpers/codeSnippets";

const Main = ({}) => {
    const [context, setContext] = useState(null);
    const [master, setMaster] = useState(null);
    const [slides, setSlides] = useState({
        showNav: false,
        current: 1,
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
                        <Header
                            title={"Audio Context"}
                            subtitle={"Setup our context"}
                        />
                        <SlideLayout>
                            <CodeBlock>{codeSnippets.cs1}</CodeBlock>
                        </SlideLayout>
                    </React.Fragment>
                ) : null}

                {slides.current === 2 ? (
                    <React.Fragment>
                        <Header
                            title={"Audio Context"}
                            subtitle={"Setup our context"}
                        />
                        <SlideLayout>
                            <CodeBlock>{codeSnippets.cs2}</CodeBlock>
                        </SlideLayout>
                    </React.Fragment>
                ) : null}

                {slides.current === 3 ? (
                    <React.Fragment>
                        <Header
                            title={"Audio Context"}
                            subtitle={"Create a master gain node"}
                        />
                        <SlideLayout>
                            <CodeBlock>{codeSnippets.cs3}</CodeBlock>
                        </SlideLayout>
                    </React.Fragment>
                ) : null}

                {slides.current === 4 ? (
                    <React.Fragment>
                        <Header
                            title={"Create a note"}
                            subtitle={
                                "Setup an oscillator, give it a pitch value, and connect it to our master gain node"
                            }
                        />
                        <SlideLayout>
                            <CodeBlock>{codeSnippets.cs4}</CodeBlock>
                        </SlideLayout>
                    </React.Fragment>
                ) : null}

                {slides.current === 5 ? (
                    <React.Fragment>
                        <Header title={"Create a note"} />
                        <SimpleNote />
                        <SlideLayout>
                            <CodeBlock>{codeSnippets.cs5}</CodeBlock>
                        </SlideLayout>
                    </React.Fragment>
                ) : null}

                {slides.current === 6 ? (
                    <React.Fragment>
                        <Header title={"Create a note"} />
                        <SimpleNote />
                        <SlideLayout>
                            <CodeBlock>{codeSnippets.cs6}</CodeBlock>
                        </SlideLayout>
                    </React.Fragment>
                ) : null}

                {/* {slides.current === 3 ? (
                    <SlideLayout>
                        <CodeBlock>{codeSnippets.cs2}</CodeBlock>
                    </SlideLayout>
                ) : null}
                {slides.current === 4 ? (
                    <SlideLayout>
                        <SimpleNote />
                        <CodeBlock>{codeSnippets.cs1}</CodeBlock>
                    </SlideLayout>
                ) : null}
                {slides.current === 5 ? <EnhancedNote /> : null} */}
                <SlideSwitcher />
            </SlidesContext.Provider>
        </AudioContext.Provider>
    );
};

export default Main;
