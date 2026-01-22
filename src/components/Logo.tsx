'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 28, className = '' }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ensō - Brush stroke style */}
      <circle 
        cx="32" 
        cy="32" 
        r="24" 
        stroke="url(#gold-gradient)" 
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="145 10"
        fill="none"
        transform="rotate(-30 32 32)"
      />
      {/* Gap highlight - the opening represents incompleteness/growth */}
      <circle 
        cx="32" 
        cy="32" 
        r="24" 
        stroke="url(#gold-gradient)"
        strokeWidth="3"
        strokeOpacity="0.3"
        fill="none"
      />
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d590"/>
          <stop offset="50%" stopColor="#d4a856"/>
          <stop offset="100%" stopColor="#a08040"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
