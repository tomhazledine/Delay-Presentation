import React from "react";

const Header = ({ title, subtitle = false }) => (
    <div className="header">
        <h1 className="heading--main">{title}</h1>
        {subtitle ? <h2 className="heading--subtitle">{subtitle}</h2> : null}
    </div>
);

export default Header;
