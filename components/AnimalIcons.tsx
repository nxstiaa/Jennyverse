import React from 'react';

export function HornbillIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} width={32} height={32} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="32" rx="14" ry="10" fill="#7C4F2C"/>
      <ellipse cx="24" cy="20" rx="10" ry="8" fill="#B7A16A"/>
      <path d="M34 18 Q44 10 28 14 Q40 8 32 18" stroke="#7C4F2C" strokeWidth="2" fill="none"/>
      <circle cx="28" cy="18" r="1.5" fill="#222"/>
    </svg>
  );
}

export function TapirIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} width={32} height={32} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="30" rx="13" ry="8" fill="#222"/>
      <ellipse cx="24" cy="22" rx="8" ry="6" fill="#fff"/>
      <ellipse cx="18" cy="22" rx="2" ry="1.5" fill="#222"/>
      <ellipse cx="30" cy="22" rx="2" ry="1.5" fill="#222"/>
      <circle cx="28" cy="20" r="1" fill="#222"/>
    </svg>
  );
}

export function TurtleIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} width={32} height={32} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="28" rx="10" ry="7" fill="#4ECDC4"/>
      <ellipse cx="24" cy="24" rx="7" ry="5" fill="#B7A16A"/>
      <ellipse cx="16" cy="28" rx="2" ry="1.5" fill="#4ECDC4"/>
      <ellipse cx="32" cy="28" rx="2" ry="1.5" fill="#4ECDC4"/>
      <ellipse cx="24" cy="36" rx="2" ry="1.5" fill="#4ECDC4"/>
      <ellipse cx="24" cy="20" rx="2" ry="1.5" fill="#4ECDC4"/>
    </svg>
  );
} 