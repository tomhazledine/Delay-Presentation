import React, { useState, useEffect } from "react";

import SimpleNote from "./steps/SimpleNote";

export const AudioContext = React.createContext();

const Main = ({}) => {
    const [context, setContext] = useState(null);

    useEffect(() => {
        setContext(new (window.AudioContext || window.webkitAudioContext)());
    }, []);

    return (
        <AudioContext.Provider value={context}>
            <div className="wrapper--main">
                <h1>App</h1>
                <SimpleNote />
            </div>
        </AudioContext.Provider>
    );
};

export default Main;
