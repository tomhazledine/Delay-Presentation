import React from "react";

import Highlight from "react-highlight.js";

const CodeBlock = ({ lang = "javascript", children }) => {
    return (
        <pre className={`codeblock codeblock--${lang}`}>
            <Highlight language={lang}>{children}</Highlight>
        </pre>
    );
};

export default CodeBlock;
