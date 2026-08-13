import React from 'react';
import { ViewMode } from '../types';
import { Boxes, Wrench, Phone, Mail, Globe, MapPin, ArrowUp } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface FooterProps {
  setActiveView: (view: ViewMode) => void;
  onOpenDevis: () => void;
  onOpenIntervention: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveView,
  onOpenDevis,
  onOpenIntervention
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071527] text-slate-300 border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E85D2C] to-[#C7940A] p-0.5">
                <div className="w-full h-full bg-[#0A1E38] rounded-[10px] flex items-center justify-center text-white font-black text-lg">
                  S
                </div>
              </div>
              <span className="text-lg font-black text-white tracking-tight">SOFIM SOLUTION MAROC</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Fabricant et distributeur agréé de cales en béton fibre haute performance (BFHP) & Prestataire de services et maintenances industrielles (levage, fermetures, électricité, sécurité incendie) au Maroc.
            </p>

            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <p className="font-semibold text-slate-200">Directrice Générale : Mme Halima AGGUER</p>
              <p>SARLAU — Tanger & Tétouan, Maroc (@SOFIMmaroc)</p>
            </div>
          </div>

          {/* Cales & Béton Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[#E85D2C] flex items-center gap-1.5">
              <Boxes className="w-4 h-4 text-[#C9C2AE]" />
              <span>Cales & Béton</span>
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => setActiveView('cales')} className="hover:text-white transition-colors">
                  CPME30-35-40 Multi-Enrobage
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('cales')} className="hover:text-white transition-colors">
                  CCS25-30 Cale Compacte Standard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('cales')} className="hover:text-white transition-colors">
                  CMP20-3025 Mini Précision
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('cales')} className="hover:text-white transition-colors">
                  CUTS50 & CUTS50-R Treillis U
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('cales')} className="hover:text-white transition-colors">
                  CMHBF 4 Positions Multi-Hauteurs
                </button>
              </li>
            </ul>
            <button
              onClick={onOpenDevis}
              className="mt-2 py-1.5 px-3 rounded-lg bg-[#E85D2C] text-white font-bold text-[11px]"
            >
              Demander un Devis Cales
            </button>
          </div>

          {/* Solutions Industrielles Links */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[#C7940A] flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-300" />
              <span>Solutions Industrielles</span>
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => setActiveView('industrielles')} className="hover:text-white transition-colors">
                  Levage & Manutention (Ponts roulants & Palans)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('industrielles')} className="hover:text-white transition-colors">
                  Fermetures (Portes Sectionnelles & Rapides)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('industrielles')} className="hover:text-white transition-colors">
                  Électricité Industrielle & Automatisme (TGBT)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('industrielles')} className="hover:text-white transition-colors">
                  Sécurité Incendie & Désenfumage (SDI, RIA)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('industrielles')} className="hover:text-white transition-colors">
                  SAV & Astreinte Dépannage 24/7
                </button>
              </li>
            </ul>
            <button
              onClick={onOpenIntervention}
              className="mt-2 py-1.5 px-3 rounded-lg bg-[#C7940A] text-slate-950 font-bold text-[11px]"
            >
              Demande d'Intervention SAV
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SOFIM SOLUTION MAROC SARLAU. Tous droits réservés.</p>
          <div className="flex items-center space-x-3">
            <span className="text-[11px]">Thème :</span>
            <ThemeToggle variant="compact" />
          </div>
          <p className="text-[11px] hidden md:inline-block">Catalogue technique B2B Tanger & Tétouan</p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Haut de page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
