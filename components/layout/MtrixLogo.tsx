import React from 'react';

/**
 * Renders the Mtrix logo as a scalable vector graphic (SVG).
 * This replaces the previous implementation that used a broken base64-encoded image,
 * ensuring the logo displays correctly and sharply across all devices.
 */
export const MtrixLogo: React.FC = () => (
  <svg
    viewBox="0 0 125 28"
    className="h-7 w-auto"
    aria-label="Mtrix Logo"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#002e31">
      {/* Icon: A simplified but recognizable version of the Mtrix brand mark */}
      <path d="M18.81,11.33c-4.13,0-7.48,3.35-7.48,7.48s3.35,7.48,7.48,7.48,7.48-3.35,7.48-7.48-3.35-7.48-7.48-7.48Zm0,12.72c-2.89,0-5.24-2.35-5.24-5.24s2.35-5.24,5.24-5.24,5.24,2.35,5.24,5.24-2.35,5.24-5.24,5.24Z" />
      <circle cx="18.81" cy="18.81" r="2.6" />
      <path d="M18.81,2.83c-2.73,0-4.95,2.22-4.95,4.95s2.22,4.95,4.95,4.95,4.95-2.22,4.95-4.95-2.22-4.95-4.95-4.95Z" />
      <path d="M11.33,21.33c-2.73,0-4.95,2.22-4.95,4.95s2.22,4.95,4.95,4.95,4.95-2.22,4.95-4.95-2.22-4.95-4.95-4.95Z" />
      <path d="M26.29,21.33c-2.73,0-4.95,2.22-4.95,4.95s2.22,4.95,4.95,4.95,4.95-2.22,4.95-4.95-2.22-4.95-4.95-4.95Z" />

      {/* Text: "Mtrix" */}
      <text
        x="38"
        y="22"
        fontFamily="Lato, sans-serif"
        fontSize="21"
        fontWeight="700"
        letterSpacing="0.5"
      >
        Mtrix
      </text>
    </g>
  </svg>
);
