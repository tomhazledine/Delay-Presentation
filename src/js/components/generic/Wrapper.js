import React from "react";
import { css } from "emotion";

import globals from "../../styles/global";

const Wrapper = ({ layout = [326, 400], children }) => {
    const wrapperStyles = css`
        ${globals};
        // width: ${layout[0]}px;
        // height: ${layout[1]}px;
        border: 1px solid red;
        padding: 10px;
        font-family: sans-serif;
    `;
    return <div css={wrapperStyles}>{children}</div>;
};

export default Wrapper;
