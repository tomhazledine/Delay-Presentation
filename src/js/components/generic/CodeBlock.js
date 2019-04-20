import React from "react";

import Highlight from "react-highlight.js";

const CodeBlock = ({ lang = "javascript", children }) => {
    return (
        <div className="codeblock__wrapper">
            <pre className={`codeblock codeblock--${lang}`}>
                <Highlight language={lang}>{children}</Highlight>
            </pre>
        </div>
    );
};

export default CodeBlock;
