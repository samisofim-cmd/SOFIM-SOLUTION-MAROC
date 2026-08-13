import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Phone, Menu, X, Building2, Wrench, Boxes, ChevronRight, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import officialLogoImg from '../assets/images/sofim_official_logo_1786466786854.jpg';

interface NavbarProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  onOpenDevisModal: () => void;
  onOpenInterventionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenDevisModal,
  onOpenInterventionModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0A1E38]/95 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { setActiveView('hub'); setMobileMenuOpen(false); }} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 border border-[#E85D2C]/60 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img
                src={officialLogoImg}
                alt="SOFIM SOLUTION MAROC Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-[#E85D2C] transition-colors">
                  SOFIM SOLUTION MAROC
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 hidden sm:inline-block">
                  SARLAU
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>Tanger & Tétouan</span>
                <span className="w-1 h-1 rounded-full bg-[#E85D2C]"></span>
                <span className="text-slate-300">BTP & Industrie</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-[#071629] p-1.5 border border-white/10">
            <button
              onClick={() => setActiveView('hub')}
              className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeView === 'hub'
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Accueil
            </button>

            <button
              onClick={() => setActiveView('cales')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeView === 'cales'
                  ? 'bg-[#E85D2C] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-[#E85D2C]/20'
              }`}
            >
              <Boxes className="w-3.5 h-3.5 text-[#C9C2AE]" />
              <span>Cales & Béton</span>
            </button>

            <button
              onClick={() => setActiveView('industrielles')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeView === 'industrielles'
                  ? 'bg-[#C7940A] text-slate-950 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-[#C7940A]/20'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-amber-300" />
              <span>Solutions Industrielles</span>
            </button>

            <button
              onClick={() => setActiveView('catalog')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                activeView === 'catalog'
                  ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                  : 'border-[#E85D2C]/40 text-[#E85D2C] hover:bg-[#E85D2C]/10'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Catalogue</span>
            </button>

            <button
              onClick={() => setActiveView('configurator')}
              className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeView === 'configurator'
                  ? 'bg-[#E85D2C] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Configurateur
            </button>

            <button
              onClick={() => setActiveView('schema3d')}
              className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeView === 'schema3d'
                  ? 'bg-[#E85D2C] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              3D
            </button>

            <button
              onClick={() => setActiveView('diagnostic')}
              className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeView === 'diagnostic'
                  ? 'bg-[#C7940A] text-slate-950 font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Quiz
            </button>

            <button
              onClick={() => setActiveView('portal')}
              className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                activeView === 'portal'
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
              }`}
            >
              Portail SAV
            </button>
          </nav>

          {/* Action CTAs, Theme Toggle & Phone */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <ThemeToggle variant="header" />

            <a
              href="tel:+212660068610"
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E85D2C]" />
              <span>+212 660-068-610</span>
            </a>

            {activeView === 'industrielles' ? (
              <button
                onClick={onOpenInterventionModal}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C7940A] to-amber-600 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Demande d'Intervention</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenDevisModal}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E85D2C] to-orange-600 text-white font-bold text-xs shadow-lg shadow-[#E85D2C]/30 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Demander un Devis</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile menu button & Mobile Theme Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle variant="header" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071629] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => { setActiveView('hub'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider ${
              activeView === 'hub' ? 'bg-white/15 text-white' : 'text-slate-300 bg-[#0A1E38]'
            }`}
          >
            <span>Accueil Hub</span>
            <Building2 className="w-4 h-4 opacity-70" />
          </button>

          <button
            onClick={() => { setActiveView('cales'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider ${
              activeView === 'cales' ? 'bg-[#E85D2C] text-white' : 'text-slate-300 bg-[#0A1E38]'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Boxes className="w-4 h-4 text-[#C9C2AE]" />
              <span>Cales & Béton (BFHP)</span>
            </div>
            <span className="text-[10px] bg-black/20 px-2 py-0.5 text-white">Fabricant</span>
          </button>

          <button
            onClick={() => { setActiveView('industrielles'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider ${
              activeView === 'industrielles' ? 'bg-[#C7940A] text-slate-950 font-bold' : 'text-slate-300 bg-[#0A1E38]'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-amber-300" />
              <span>Solutions Industrielles</span>
            </div>
            <span className="text-[10px] bg-black/20 px-2 py-0.5 text-slate-900">SAV 24/7</span>
          </button>

          <button
            onClick={() => { setActiveView('configurator'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider ${
              activeView === 'configurator' ? 'bg-[#E85D2C] text-white' : 'text-slate-300 bg-[#0A1E38]'
            }`}
          >
            <span>Configurateur 3D B2B</span>
          </button>

          <button
            onClick={() => { setActiveView('schema3d'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider ${
              activeView === 'schema3d' ? 'bg-[#E85D2C] text-white' : 'text-slate-300 bg-[#0A1E38]'
            }`}
          >
            <span>3D & Schémas Interactifs</span>
          </button>

          <button
            onClick={() => { setActiveView('diagnostic'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider ${
              activeView === 'diagnostic' ? 'bg-[#C7940A] text-slate-950' : 'text-slate-300 bg-[#0A1E38]'
            }`}
          >
            <span>Quiz Diagnostic Sécurité</span>
          </button>

          <button
            onClick={() => { setActiveView('portal'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider border ${
              activeView === 'portal' ? 'bg-emerald-600 text-white border-emerald-400' : 'border-emerald-500/40 text-emerald-300 bg-[#0A1E38]'
            }`}
          >
            <span>Espace Client & Portail SAV</span>
          </button>

          <button
            onClick={() => { setActiveView('about'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider ${
              activeView === 'about' ? 'bg-white/15 text-white' : 'text-slate-300 bg-[#0A1E38]'
            }`}
          >
            <span>À Propos & Stock Tanger</span>
          </button>

          {/* Mobile Theme Toggle Row */}
          <div className="pt-1">
            <ThemeToggle variant="mobile" />
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => { onOpenDevisModal(); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-[#E85D2C] text-white font-bold text-xs uppercase tracking-widest text-center"
            >
              Devis Cales
            </button>
            <button
              onClick={() => { onOpenInterventionModal(); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-[#C7940A] text-slate-950 font-bold text-xs uppercase tracking-widest text-center"
            >
              Intervention SAV
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
