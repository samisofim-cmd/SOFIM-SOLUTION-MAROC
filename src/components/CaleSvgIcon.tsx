import React from 'react';

interface Props {
  type: 'CPME' | 'CCS' | 'CMP' | 'CUTS' | 'CUTSR' | 'CMHBF';
  className?: string;
}

export const CaleSvgIcon: React.FC<Props> = ({ type, className = 'w-24 h-24' }) => {
  switch (type) {
    case 'CPME':
      // Cross shape with 35, 40, 40, 30 labels & center hole
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="concreteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D8D3C5" />
              <stop offset="50%" stopColor="#BAB29F" />
              <stop offset="100%" stopColor="#968E7C" />
            </linearGradient>
            <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
            </filter>
          </defs>
          <path
            d="M 60,20 C 80,35 120,35 140,20 C 160,50 160,80 180,100 C 160,120 160,150 140,180 C 120,165 80,165 60,180 C 40,150 40,120 20,100 C 40,80 40,50 60,20 Z"
            fill="url(#concreteGrad)"
            stroke="#7C7565"
            strokeWidth="3"
            filter="url(#dropShadow)"
          />
          {/* Center hole */}
          <circle cx="100" cy="100" r="16" fill="#423C32" stroke="#2B261F" strokeWidth="2" />
          {/* Engraved numbers */}
          <text x="100" y="62" fill="#4A443A" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">35</text>
          <text x="100" y="152" fill="#4A443A" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">30</text>
          <text x="52" y="108" fill="#4A443A" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">40</text>
          <text x="148" y="108" fill="#4A443A" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">40</text>
        </svg>
      );

    case 'CCS':
      // Compact cross 25 / 30
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="concreteGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFD9CB" />
              <stop offset="100%" stopColor="#A39B8A" />
            </linearGradient>
          </defs>
          <path
            d="M 70,30 C 85,42 115,42 130,30 C 145,55 145,75 170,90 C 145,105 145,125 130,150 C 115,138 85,138 70,150 C 55,125 55,105 30,90 C 55,75 55,55 70,30 Z"
            fill="url(#concreteGrad2)"
            stroke="#6E6758"
            strokeWidth="3"
          />
          <circle cx="100" cy="90" r="14" fill="#3D372E" />
          <text x="100" y="65" fill="#3B352C" fontSize="22" fontWeight="bold" textAnchor="middle">25</text>
          <text x="62" y="108" fill="#3B352C" fontSize="20" fontWeight="bold" textAnchor="middle">30</text>
        </svg>
      );

    case 'CMP':
      // Mini precision 20/25
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="40" width="120" height="120" rx="20" fill="#CEC7B8" stroke="#7A7364" strokeWidth="3" />
          <path d="M 40,80 Q 100,100 160,80" fill="none" stroke="#9E9686" strokeWidth="2" />
          <circle cx="100" cy="110" r="12" fill="#2E2A23" />
          <text x="100" y="75" fill="#3B352C" fontSize="22" fontWeight="bold" textAnchor="middle">20</text>
          <text x="135" y="115" fill="#3B352C" fontSize="18" fontWeight="bold" textAnchor="middle">25</text>
        </svg>
      );

    case 'CUTS':
      // U-shape Mesh spacer
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 30,160 L 30,60 C 30,40 50,40 60,60 C 70,100 130,100 140,60 C 150,40 170,40 170,60 L 170,160 Z"
            fill="#C4BCAB"
            stroke="#6B6455"
            strokeWidth="3"
          />
          <circle cx="100" cy="115" r="8" fill="#3D372E" />
          <text x="100" y="150" fill="#3D372E" fontSize="16" fontWeight="bold" textAnchor="middle">CUTS50</text>
        </svg>
      );

    case 'CUTSR':
      // Reinforced U-shape with XXL Base
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 15,170 L 35,65 C 35,45 55,45 65,65 C 75,100 125,100 135,65 C 145,45 165,45 165,65 L 185,170 Z"
            fill="#B8AF9E"
            stroke="#595346"
            strokeWidth="4"
          />
          <rect x="15" y="150" width="170" height="20" rx="4" fill="#999180" stroke="#4A453A" strokeWidth="2" />
          <circle cx="100" cy="115" r="9" fill="#2E2A23" />
          <text x="100" y="145" fill="#2E2A23" fontSize="15" fontWeight="bold" textAnchor="middle">XXL 6000mm²</text>
        </svg>
      );

    case 'CMHBF':
      // Multi height 4 positions
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 50,30 L 150,30 C 140,70 140,130 150,170 L 50,170 C 60,130 60,70 50,30 Z"
            fill="#CDC5B5"
            stroke="#6E6758"
            strokeWidth="3"
          />
          <circle cx="100" cy="100" r="14" fill="#3B352C" />
          <text x="100" y="55" fill="#3B352C" fontSize="18" fontWeight="bold" textAnchor="middle">35mm</text>
          <text x="100" y="155" fill="#3B352C" fontSize="18" fontWeight="bold" textAnchor="middle">40mm</text>
          <text x="35" y="105" fill="#3B352C" fontSize="16" fontWeight="bold" textAnchor="middle">50</text>
          <text x="165" y="105" fill="#3B352C" fontSize="16" fontWeight="bold" textAnchor="middle">45</text>
        </svg>
      );

    default:
      return null;
  }
};
