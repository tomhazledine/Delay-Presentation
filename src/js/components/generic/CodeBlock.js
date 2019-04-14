import React from "react";

const CodeBlock = ({ lang = "javascript", children }) => {
    return <div className={`codeblock codeblock--${lang}`}>{children}</div>;
};

export default CodeBlock;
