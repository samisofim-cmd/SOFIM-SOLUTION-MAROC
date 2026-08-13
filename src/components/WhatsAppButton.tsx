import React from 'react';
import { ViewMode } from '../types';

interface WhatsAppButtonProps {
  activeView: ViewMode;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ activeView }) => {
  const getMessage = () => {
    if (activeView === 'cales') {
      return encodeURIComponent("Bonjour SOFIM SOLUTION MAROC, je souhaite des informations / un devis pour des cales en béton fibre (BFHP).");
    }
    if (activeView === 'industrielles') {
      return encodeURIComponent("Bonjour SOFIM SOLUTION MAROC, je souhaite une intervention SAV / un devis pour des équipements industriels.");
    }
    return encodeURIComponent("Bonjour SOFIM SOLUTION MAROC, je souhaite entrer en contact avec vos équipes.");
  };

  const whatsappUrl = `https://wa.me/212660068610?text=${getMessage()}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border border-white/20"
      aria-label="Contact WhatsApp Direct"
      title="Contact WhatsApp +212 660-068-610"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.988L2 22l5.167-1.357c1.464.799 3.111 1.22 4.84 1.22h.006c5.506 0 9.989-4.478 9.99-9.984 0-2.669-1.037-5.176-2.922-7.062C17.198 2.93 14.692 2.001 12.012 2z"/>
      </svg>
    </a>
  );
};

