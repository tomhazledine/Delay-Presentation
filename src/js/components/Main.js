import React, { useState, useEffect } from "react";

import EnhancedNote from "./steps/EnhancedNote";
import SimpleNote from "./steps/SimpleNote";
import CodeBlock from "./generic/CodeBlock";
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
        showNav: true,
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
                <h1>App. slide {slides.current}</h1>
                {slides.current === 1 ? (
                    <SlideLayout>
                        <SimpleNote />
                        <CodeBlock>{codeSnippets.cs1}</CodeBlock>
                    </SlideLayout>
                ) : null}
                {slides.current === 2 ? <EnhancedNote /> : null}
                <SlideSwitcher />
            </SlidesContext.Provider>
        </AudioContext.Provider>
    );
};

export default Main;
