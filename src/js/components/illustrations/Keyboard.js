import React from "react";

const Keyboard = ({ className = "", fill = "#00B7C6", bgFill = "#fff" }) => (
    <svg
        className={`illustration--keyboard ${className}`}
        viewBox="0 0 1032 415"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <circle id="a" cx="33.344" cy="32.777" r="32.777" />
        </defs>
        <path
            stroke={fill}
            fill={bgFill}
            strokeWidth="8"
            d="M4 4.98h1024v351.98H4z"
        />
        <path fill={fill} d="M0 360.96h1032v54H0z" />
        <path
            stroke={fill}
            strokeWidth="8"
            fill={fill}
            d="M84 100.565h864v21H84z"
        />
        <path
            stroke={fill}
            strokeWidth="8"
            fill={bgFill}
            d="M84 125.96h54v253.946H84zM300 125.96h54v253.946h-54zM516 125.96h54v253.946h-54zM732 125.96h54v253.946h-54zM138 125.96h54v253.946h-54zM354 125.96h54v253.946h-54zM570 125.96h54v253.946h-54zM786 125.96h54v253.946h-54zM192 125.96h54v253.946h-54zM408 125.96h54v253.946h-54zM624 125.96h54v253.946h-54zM840 125.96h54v253.946h-54zM246 125.96h54v253.946h-54zM462 125.96h54v253.946h-54zM678 125.96h54v253.946h-54zM894 125.96h54v253.946h-54z"
        />
        <g
            transform="translate(124 133.565)"
            fill={fill}
            stroke={fill}
            strokeWidth="8"
        >
            <rect width="28" height="154" rx="4" />
            <rect x="378" width="28" height="154" rx="4" />
            <rect x="54" width="28" height="154" rx="4" />
            <rect x="432" width="28" height="154" rx="4" />
            <rect x="162" width="28" height="154" rx="4" />
            <rect x="540" width="28" height="154" rx="4" />
            <rect x="216" width="28" height="154" rx="4" />
            <rect x="594" width="28" height="154" rx="4" />
            <rect x="270" width="28" height="154" rx="4" />
            <rect x="648" width="28" height="154" rx="4" />
            <rect x="756" width="28" height="154" rx="4" />
        </g>
        <g
            transform="translate(124 113.565)"
            fill={bgFill}
            stroke={fill}
            strokeWidth="8"
        >
            <rect width="28" height="166" rx="4" />
            <rect x="378" width="28" height="166" rx="4" />
            <rect x="54" width="28" height="166" rx="4" />
            <rect x="432" width="28" height="166" rx="4" />
            <rect x="162" width="28" height="166" rx="4" />
            <rect x="540" width="28" height="166" rx="4" />
            <rect x="216" width="28" height="166" rx="4" />
            <rect x="594" width="28" height="166" rx="4" />
            <rect x="270" width="28" height="166" rx="4" />
            <rect x="648" width="28" height="166" rx="4" />
            <rect x="756" width="28" height="166" rx="4" />
        </g>
        <path
            d="M104.996 36.51l-11.28 11.28 2.474 2.475 11.28-11.28c5.069 6.3 4.679 15.54-1.17 21.39-6.267 6.266-16.427 6.266-22.694 0-6.267-6.267-6.267-16.428 0-22.695 5.848-5.848 15.088-6.239 21.39-1.17zM150.09 36.51l-11.28 11.28 2.475 2.475 11.28-11.28c5.068 6.3 4.678 15.54-1.17 21.39-6.268 6.266-16.428 6.266-22.695 0-6.267-6.267-6.267-16.428 0-22.695 5.849-5.848 15.089-6.239 21.39-1.17zM195.184 36.51l-11.28 11.28 2.475 2.475 11.28-11.28c5.068 6.3 4.678 15.54-1.17 21.39-6.267 6.266-16.428 6.266-22.695 0-6.266-6.267-6.266-16.428 0-22.695 5.85-5.848 15.09-6.239 21.39-1.17zM240.279 36.51l-11.28 11.28 2.474 2.475 11.28-11.28c5.069 6.3 4.679 15.54-1.17 21.39-6.267 6.266-16.427 6.266-22.694 0-6.267-6.267-6.267-16.428 0-22.695 5.848-5.848 15.088-6.239 21.39-1.17z"
            fill={fill}
        />
        <g transform="translate(866.156 15.98)">
            <mask id="b" fill={bgFill}>
                <use xlinkHref="#a" />
            </mask>
            <g
                mask="url(#b)"
                stroke={fill}
                strokeLinecap="square"
                strokeWidth="4"
            >
                <path d="M18.76-17.58L84.388 48.05M11.468-10.288l65.628 65.629M4.176-2.996l65.628 65.629M-3.116 4.296l65.628 65.629M-10.408 11.588L55.22 77.217M-17.7 18.88L47.927 84.51" />
            </g>
        </g>
    </svg>
);

export default Keyboard;
