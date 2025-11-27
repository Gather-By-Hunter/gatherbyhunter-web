import React from 'react';

const FlowerShape = ({ transform }: { transform?: string }) => (
  <g transform={transform}>
    <g transform="translate(0, -35)"> {/* Move flower up so stem can start at 0,0 */}
        <circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" strokeWidth="3"/>
        <ellipse cx="0" cy="-25" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(0)"/>
        <ellipse cx="0" cy="-25" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(60)"/>
        <ellipse cx="0" cy="-25" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(120)"/>
        <ellipse cx="0" cy="-25" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(180)"/>
        <ellipse cx="0" cy="-25" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(240)"/>
        <ellipse cx="0" cy="-25" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(300)"/>
    </g>
    <path d="M0 0 C 5 20, -5 40, 0 60" stroke="currentColor" strokeWidth="3" fill="none" /> {/* Stem */}
  </g>
);

export const FlowerIconLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <g>
      <FlowerShape transform="translate(40 40) scale(0.8) rotate(-10)" />
      <FlowerShape transform="translate(75 30) scale(1)" />
      <FlowerShape transform="translate(110 40) scale(0.8) rotate(10)" />
    </g>
  </svg>
);