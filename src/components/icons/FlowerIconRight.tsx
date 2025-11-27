import React from 'react';

const TulipShape = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
        <g transform="translate(0, -30)"> {/* Move flower up so stem can start at 0,0 */}
            <path d="M-20 0 C -20 -20, -10 -20, 0 0 C 10 -20, 20 -20, 20 0 Q 0 10, -20 0" fill="none" stroke="currentColor" strokeWidth="3" />
        </g>
        <path d="M0 0 C 0 20, 5 40, 0 60" fill="none" stroke="currentColor" strokeWidth="3" /> {/* Stem */}
    </g>
);


export const FlowerIconRight: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <g>
        <TulipShape transform="translate(40 40) scale(0.8) rotate(-10)" />
        <TulipShape transform="translate(75 30) scale(1)" />
        <TulipShape transform="translate(110 40) scale(0.8) rotate(10)" />
      </g>
    </svg>
);