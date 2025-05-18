
import React from "react";

const Logo: React.FC<{ size?: number; className?: string }> = ({ 
  size = 48, 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" fill="#6366f1" />
        <path
          d="M8 12L11 15L16 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7V17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M7 12H17"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default Logo;
