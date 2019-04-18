import React, { useState, useEffect } from "react";

import EnhancedNote from "./steps/EnhancedNote";
import SimpleNote from "./steps/SimpleNote";
import ProgressBar from "./generic/ProgressBar";
import SlideSwitcher from "./generic/SlideSwitcher";

export const AudioContext = React.createContext();
export const SlidesContext = React.createContext();

const Main = ({}) => {
    const [context, setContext] = useState(null);
    const [master, setMaster] = useState(null);
    const [slides, setSlides] = useState({ current: 2, total: 2 });

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
                <div className="wrapper--main">
                    <ProgressBar />
                    <h1>App. slide {slides.current}</h1>
                    {slides.current === 1 ? <SimpleNote /> : null}
                    {slides.current === 2 ? <EnhancedNote /> : null}
                    <SlideSwitcher />
                </div>
            </SlidesContext.Provider>
        </AudioContext.Provider>
    );
};

export default Main;
