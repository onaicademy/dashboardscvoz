import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  textColor?: string;
}

export const Logo8D: React.FC<LogoProps> = ({ className, width = 40, height = 40, textColor = "#1A1A1A" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* 3D Shadow Gradient */}
        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
        </linearGradient>

        {/* Main Color Gradient for 3D effect */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={textColor} stopOpacity="1" />
          <stop offset="70%" stopColor={textColor} stopOpacity="0.85" />
          <stop offset="100%" stopColor={textColor} stopOpacity="0.7" />
        </linearGradient>

        {/* Highlight gradient */}
        <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Number 8 */}
      <g>
        {/* Shadow for 8 */}
        <ellipse cx="23" cy="16" rx="10" ry="9" fill="url(#shadowGradient)" transform="translate(2, 2)" />
        <ellipse cx="23" cy="40" rx="11" ry="10" fill="url(#shadowGradient)" transform="translate(2, 2)" />

        {/* Main 8 - top circle */}
        <ellipse cx="23" cy="16" rx="10" ry="9" fill="url(#mainGradient)" stroke={textColor} strokeWidth="2" />
        {/* Highlight on top circle */}
        <ellipse cx="20" cy="13" rx="4" ry="3" fill="url(#highlightGradient)" opacity="0.5" />

        {/* Main 8 - bottom circle */}
        <ellipse cx="23" cy="40" rx="11" ry="10" fill="url(#mainGradient)" stroke={textColor} strokeWidth="2" />
        {/* Highlight on bottom circle */}
        <ellipse cx="20" cy="37" rx="5" ry="4" fill="url(#highlightGradient)" opacity="0.5" />

        {/* Connection between circles */}
        <path
          d="M 18 24 Q 23 28 28 24"
          stroke={textColor}
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* Letter D */}
      <g>
        {/* Shadow for D */}
        <path
          d="M 50 8 L 50 50 L 70 50 C 85 50 95 40 95 29 C 95 18 85 8 70 8 Z"
          fill="url(#shadowGradient)"
          transform="translate(3, 3)"
        />

        {/* Main D body */}
        <path
          d="M 50 8 L 50 50 L 70 50 C 85 50 95 40 95 29 C 95 18 85 8 70 8 Z"
          fill="url(#mainGradient)"
          stroke={textColor}
          strokeWidth="2"
        />

        {/* D - inner cutout for depth */}
        <path
          d="M 58 16 L 58 42 L 68 42 C 78 42 85 36 85 29 C 85 22 78 16 68 16 Z"
          fill={textColor === '#1A1A1A' ? '#F8FAFC' : '#FFD700'}
          opacity="0.2"
        />

        {/* Highlight on D */}
        <ellipse cx="56" cy="15" rx="8" ry="4" fill="url(#highlightGradient)" opacity="0.4" />

        {/* 3D edge effect on D */}
        <path
          d="M 70 8 C 85 8 95 18 95 29 C 95 40 85 50 70 50"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
      </g>
    </svg>
  );
};
