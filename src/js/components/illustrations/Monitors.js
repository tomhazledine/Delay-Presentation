import React from "react";

const Monitors = ({ className = "", fill = "#00B7C6" }) => (
    <svg
        className={`illustration--monitors ${className}`}
        viewBox="0 0 775 517"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g fill="none">
            <rect
                stroke={fill}
                strokeWidth="12"
                x="443.245"
                y="6.48"
                width="325.509"
                height="504"
                rx="32"
            />
            <rect
                stroke={fill}
                strokeWidth="12"
                x="6.736"
                y="6.48"
                width="325.509"
                height="504"
                rx="32"
            />
            <circle
                stroke={fill}
                strokeWidth="32"
                cx="606"
                cy="330.477"
                r="129"
            />
            <circle
                stroke={fill}
                strokeWidth="32"
                cx="169.491"
                cy="330.477"
                r="129"
            />
            <circle stroke={fill} strokeWidth="8" cx="606" cy="100" r="56" />
            <circle
                stroke={fill}
                strokeWidth="8"
                cx="169.491"
                cy="100"
                r="56"
            />
            <circle
                stroke={fill}
                strokeWidth="6"
                cx="606"
                cy="330.477"
                r="53.452"
            />
            <circle
                stroke={fill}
                strokeWidth="6"
                cx="169.491"
                cy="330.477"
                r="53.452"
            />
            <circle stroke={fill} strokeWidth="4" cx="606" cy="100" r="31" />
            <circle
                stroke={fill}
                strokeWidth="4"
                cx="169.491"
                cy="100"
                r="31"
            />
            <circle fill={fill} cx="606" cy="330.477" r="44.977" />
            <circle fill={fill} cx="169.491" cy="330.477" r="44.977" />
            <circle fill={fill} cx="606" cy="100" r="24.5" />
            <circle fill={fill} cx="169.491" cy="100" r="24.5" />
        </g>
    </svg>
);

export default Monitors;
