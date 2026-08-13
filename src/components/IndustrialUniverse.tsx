import React, { useState } from 'react';
import { INDUSTRIAL_PILLARS, INDUSTRIAL_STATS } from '../data/industrialData';
import { IndustrialPillar } from '../types';
import { Wrench, Shield, Zap, Flame, DoorClosed, CheckCircle2, Clock, MapPin, ArrowRight, AlertTriangle, PhoneCall, ChevronRight } from 'lucide-react';

interface IndustrialUniverseProps {
  onOpenInterventionWithCategory?: (category: string) => void;
}

export const IndustrialUniverse: React.FC<IndustrialUniverseProps> = ({ onOpenInterventionWithCategory }) => {
  const [activePillarId, setActivePillarId] = useState<string>('levage');

  const activePillar = INDUSTRIAL_PILLARS.find(p => p.id === activePillarId) || INDUSTRIAL_PILLARS[0];

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'levage': return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'fermetures': return <DoorClosed className="w-5 h-5 text-amber-400" />;
      case 'electricite': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'incendie': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'sav': return <Clock className="w-5 h-5 text-amber-400" />;
      default: return <Wrench className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="bg-[#0A1E38] text-white min-h-screen">
      
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-b from-[#0F2847] via-[#0A1E38] to-[#0A1E38] border-b border-white/10 py-16 lg:py-24 overflow-hidden">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url('/src/assets/images/sofim_industrial_solutions_1786465347225.jpg')` }}></div>
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#C7940A]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7940A]/20 border border-[#C7940A]/40 text-[#C7940A] text-xs font-black uppercase tracking-wider">
                <Wrench className="w-4 h-4" />
                <span>Ingénierie & Maintenance Industrielle</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Solutions Industrielles & <br />
                <span className="text-[#C7940A]">Maintenance 24/7</span> au Maroc
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                De la fourniture d'équipements de levage et fermetures industrielles à la maintenance préventive et curative. Intervention d'urgence sur Tanger, Tétouan, Casablanca et l'ensemble du Royaume.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2 bg-[#2E3A3F] px-4 py-2 rounded-xl border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A]" />
                  <span>Levage & Ponts Roulants</span>
                </div>
                <div className="flex items-center gap-2 bg-[#2E3A3F] px-4 py-2 rounded-xl border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A]" />
                  <span>Portes Sectionnelles & Rapides</span>
                </div>
                <div className="flex items-center gap-2 bg-[#2E3A3F] px-4 py-2 rounded-xl border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A]" />
                  <span>Électricité TGBT & Automatisme</span>
                </div>
                <div className="flex items-center gap-2 bg-[#2E3A3F] px-4 py-2 rounded-xl border border-white/10 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A]" />
                  <span>Sécurité Incendie & Désenfumage</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    if (onOpenInterventionWithCategory) {
                      onOpenInterventionWithCategory('sav');
                    }
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#C7940A] hover:bg-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-[#C7940A]/30 flex items-center gap-2 transition-all"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Demander une Intervention Dépannage</span>
                </button>

                <a
                  href="#pillars"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition-all"
                >
                  <span>Explorer les 05 Pôles</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Visual Industrial Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#C7940A]/40 shadow-2xl group">
                <img
                  src="/src/assets/images/sofim_industrial_solutions_1786465347225.jpg"
                  alt="SOFIM SOLUTION MAROC Maintenance Industrielle Tanger"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E38] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <p className="text-xs text-[#C7940A] font-black uppercase tracking-wider">Astreinte Dépannage 24/7</p>
                  <p className="text-sm font-extrabold text-white">Équipes de Techniciens avec Véhicules Ateliers</p>
                  <p className="text-xs text-slate-300">Tanger Free Zone, TAC, Tétouan Shore & tout le Maroc</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-[#0D2443] border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {INDUSTRIAL_STATS.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
                <p className="text-2xl sm:text-3xl font-black text-[#C7940A]">{stat.value}</p>
                <p className="text-xs text-slate-300 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 05 PILLARS TABS & DETAILED CARDS */}
      <div id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#C7940A]">Domaines d'Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Nos 05 Pôles d'Ingénierie Industrielle
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Cliquez sur un pôle pour consulter nos prestations, équipements pris en charge et avantages.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {INDUSTRIAL_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#C7940A] text-slate-950 border-[#C7940A] shadow-xl shadow-[#C7940A]/20 scale-105'
                    : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {getPillarIcon(pillar.id)}
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card */}
        <div className="bg-[#112642] rounded-3xl border-2 border-[#C7940A]/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7940A]/20 text-[#C7940A] text-xs font-extrabold uppercase mb-2">
                <span>{activePillar.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{activePillar.title}</h3>
              <p className="text-amber-400 font-semibold text-sm mt-1">{activePillar.subtitle}</p>
            </div>

            <button
              onClick={() => {
                if (onOpenInterventionWithCategory) {
                  onOpenInterventionWithCategory(activePillar.id);
                }
              }}
              className="py-3 px-6 rounded-xl bg-[#C7940A] hover:bg-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <span>Demande d'Intervention pour {activePillar.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            {activePillar.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Key Services */}
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/10">
              <h4 className="text-sm font-extrabold text-[#C7940A] mb-3 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Prestations Principales</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {activePillar.keyServices.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C7940A] font-bold">•</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipment Handled */}
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/10">
              <h4 className="text-sm font-extrabold text-amber-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Équipements Pris en Charge</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {activePillar.equipmentHandled.map((eq, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value Benefits */}
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/10">
              <h4 className="text-sm font-extrabold text-emerald-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Bénéfices Client</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {activePillar.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* SAV 24/7 SPECIAL BANNER */}
      <div className="bg-gradient-to-r from-[#132A4A] via-[#1B3252] to-[#132A4A] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F243E] rounded-3xl p-8 sm:p-10 border-2 border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span>Urgence Dépannage & Astreinte</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Un Équipement Industriel en Panne ?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Nos techniciens mobiles interviennent rapidement sur vos sites à Tanger, Tétouan, Larache, Kénitra, Casablanca et dans tout le Maroc.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <a
                href="tel:+212660068610"
                className="px-6 py-3.5 rounded-2xl bg-[#C7940A] hover:bg-amber-500 text-slate-950 font-black text-sm text-center flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Appeler: +212 660-068-610</span>
              </a>

              <button
                onClick={() => {
                  if (onOpenInterventionWithCategory) {
                    onOpenInterventionWithCategory('sav');
                  }
                }}
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-white/20 text-center transition-all"
              >
                <span>Formulaire d'Intervention</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
