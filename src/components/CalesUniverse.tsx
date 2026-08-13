import React, { useState } from 'react';
import { CALES_PRODUCTS, CALES_COMPARISON, CERTIFICATIONS_LIST } from '../data/calesData';
import { CaleProduct } from '../types';
import { CaleSvgIcon } from './CaleSvgIcon';
import { Boxes, ShieldCheck, Calculator, CheckCircle2, FileText, Download, ArrowRight, Info, Check, Filter, X, PhoneCall, Send, Sparkles } from 'lucide-react';

interface CalesUniverseProps {
  onOpenDevisWithProduct?: (reference: string) => void;
}

export const CalesUniverse: React.FC<CalesUniverseProps> = ({ onOpenDevisWithProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState<CaleProduct | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Calculator state
  const [calcSurface, setCalcSurface] = useState<number>(100);
  const [calcStructureType, setCalcStructureType] = useState<'dalle' | 'voile' | 'prefa'>('dalle');

  // Calculation logic
  const getCalculationResults = () => {
    let density = 2; // cales / m2
    let recommendedRef = 'CUTS50 ou CCS25-30';
    
    if (calcStructureType === 'dalle') {
      density = 2;
      recommendedRef = 'CUTS50 (Treillis) ou CUTS50-R (Industriel)';
    } else if (calcStructureType === 'voile') {
      density = 3;
      recommendedRef = 'CPME30-35-40 ou CMHBF (Multi-enrobage)';
    } else if (calcStructureType === 'prefa') {
      density = 4;
      recommendedRef = 'CMP20-3025 (Mini Précision)';
    }

    const totalNeeded = Math.ceil(calcSurface * density);
    const estimatedWeightKg = ((totalNeeded * 60) / 1000).toFixed(1); // avg weight 60g

    return { totalNeeded, density, recommendedRef, estimatedWeightKg };
  };

  const calc = getCalculationResults();

  // Filter products
  const filteredProducts = CALES_PRODUCTS.filter(p => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'multi') return p.positions.includes('3') || p.positions.includes('4');
    if (activeFilter === 'treillis') return p.reference.includes('CUTS');
    if (activeFilter === 'compact') return p.reference.includes('CCS') || p.reference.includes('CMP');
    return true;
  });

  return (
    <div className="bg-[#0A1E38] text-white min-h-screen">
      
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-b from-[#0B213D] via-[#0D2647] to-[#0A1E38] border-b border-white/10 overflow-hidden py-16 lg:py-24">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url('/src/assets/images/sofim_concrete_spacers_1786465327801.jpg')` }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D2C]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D2C]/20 border border-[#E85D2C]/40 text-[#E85D2C] text-xs font-bold uppercase tracking-wider">
                <Boxes className="w-4 h-4 text-[#C9C2AE]" />
                <span>Fabricant Exclusif Marocain</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Cales en Béton Fibre <br className="hidden sm:inline" />
                <span className="text-[#E85D2C]">Haute Performance</span> (BFHP)
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                06 références conçues pour tous vos ouvrages en béton armé. SOFIM SOLUTION MAROC garantit un enrobage exact, une durabilité de 50+ ans et une adhésion parfaite au béton de coulage.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-white/10 text-[#C9C2AE]">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C]" />
                  <span>Conformité EN 12390 & NF A35-016</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-white/10 text-[#C9C2AE]">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C]" />
                  <span>Usine à Tétouan & Stock Tanger</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-white/10 text-[#C9C2AE]">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C]" />
                  <span>Livraison immédiate tout le Maroc</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#catalog"
                  className="px-6 py-3.5 rounded-2xl bg-[#E85D2C] hover:bg-orange-600 text-white font-bold text-sm shadow-xl shadow-[#E85D2C]/30 flex items-center gap-2 transition-all"
                >
                  <span>Voir la Gamme (06 Réf)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#estimator"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition-all"
                >
                  <Calculator className="w-4 h-4 text-[#C9C2AE]" />
                  <span>Calculateur d'Enrobage</span>
                </a>
              </div>
            </div>

            {/* Visual Hero Image Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#C9C2AE]/30 shadow-2xl group">
                <img
                  src="/src/assets/images/sofim_concrete_spacers_1786465327801.jpg"
                  alt="Cales en Béton Fibre Haute Performance SOFIM SOLUTION MAROC"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E38] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <p className="text-xs text-[#E85D2C] font-bold uppercase tracking-wider">Qualité Certifiée</p>
                  <p className="text-sm font-extrabold text-white">Enrobage Garanti sur Plans d'Exécution</p>
                  <p className="text-xs text-slate-300">Resiste aux contraintes mécaniques et chimiques (XC à XS)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PRODUCT CATALOG SECTION */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E85D2C]">Gamme Complète</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
            06 Références de Cales BFHP
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Chaque référence correspond à une classe d'exposition et un niveau de résistance mécanique distincts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#E85D2C] text-white shadow-lg'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Toutes les références (06)
          </button>
          <button
            onClick={() => setActiveFilter('multi')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'multi'
                ? 'bg-[#E85D2C] text-white shadow-lg'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Multi-Enrobages (CPME / CMHBF)
          </button>
          <button
            onClick={() => setActiveFilter('treillis')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'treillis'
                ? 'bg-[#E85D2C] text-white shadow-lg'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Pose Treillis U (CUTS / CUTS-R)
          </button>
          <button
            onClick={() => setActiveFilter('compact')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'compact'
                ? 'bg-[#E85D2C] text-white shadow-lg'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Compactes & Précision (CCS / CMP)
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#112642] rounded-3xl border border-[#C9C2AE]/20 hover:border-[#E85D2C] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#E85D2C]/20 group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#E85D2C]/20 text-[#E85D2C] border border-[#E85D2C]/30">
                    {prod.reference}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                    {prod.concreteClass}
                  </span>
                </div>

                {/* SVG Icon Visual */}
                <div className="bg-slate-900/80 rounded-2xl p-6 mb-5 flex items-center justify-center border border-white/5 group-hover:bg-slate-900 transition-colors">
                  <CaleSvgIcon type={prod.svgType} className="w-32 h-32 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-[#C9C2AE] transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs text-[#C9C2AE] font-medium mb-4 line-clamp-2">
                  {prod.subtitle}
                </p>

                {/* Technical Specs Key Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/50 p-3 rounded-xl border border-white/5 mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Enrobages:</span>
                    <span className="font-bold text-white">{prod.enrobages}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Résistance:</span>
                    <span className="font-bold text-[#E85D2C]">{prod.resistance}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Poids unitaire:</span>
                    <span className="font-semibold text-slate-200">{prod.weight}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Positions:</span>
                    <span className="font-semibold text-slate-200">{prod.positions}</span>
                  </div>
                </div>

                {/* Applications Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {prod.applications.map((app, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                      • {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-[#C9C2AE]" />
                  <span>Fiche Technique</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenDevisWithProduct) {
                      onOpenDevisWithProduct(prod.reference);
                    }
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#E85D2C] hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Devis Réf</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* CALCULATOR / ESTIMATOR SECTION */}
      <div id="estimator" className="bg-gradient-to-b from-[#0A1E38] via-[#112847] to-[#0A1E38] py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#E85D2C] flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>Outil d'Aide au Chantier</span>
              </span>
              <h2 className="text-3xl font-black text-white">
                Calculateur de Nombre de Cales
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Estimez instantanément la quantité de cales requise pour vos voiles, dalles, planchers et éléments préfabriqués selon les normes d'enrobage du BTP.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Dallages & Planchers :</span>
                    <span>Espacement standard de 2 cales / m² (ou tous les 60-80cm pour les treillis).</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Poteaux & Voiles verticaux :</span>
                    <span>Maillage de 3 cales / m² pour stabiliser contre le coffrage.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Box */}
            <div className="lg:col-span-7 bg-[#132A4A] rounded-3xl p-6 sm:p-8 border-2 border-[#C9C2AE]/30 shadow-2xl">
              
              <div className="space-y-6">
                {/* Structure Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                    Type d'ouvrage en béton armé
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcStructureType('dalle')}
                      className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                        calcStructureType === 'dalle'
                          ? 'bg-[#E85D2C] text-white border-[#E85D2C] shadow-lg'
                          : 'bg-slate-900/60 text-slate-300 border-white/10 hover:bg-slate-800'
                      }`}
                    >
                      Dallage / Plancher
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcStructureType('voile')}
                      className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                        calcStructureType === 'voile'
                          ? 'bg-[#E85D2C] text-white border-[#E85D2C] shadow-lg'
                          : 'bg-slate-900/60 text-slate-300 border-white/10 hover:bg-slate-800'
                      }`}
                    >
                      Voile / Poteau / Pieu
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcStructureType('prefa')}
                      className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                        calcStructureType === 'prefa'
                          ? 'bg-[#E85D2C] text-white border-[#E85D2C] shadow-lg'
                          : 'bg-slate-900/60 text-slate-300 border-white/10 hover:bg-slate-800'
                      }`}
                    >
                      Préfabrication
                    </button>
                  </div>
                </div>

                {/* Surface Range Slider & Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase text-slate-300">
                      Surface totale de l'ouvrage (m²)
                    </label>
                    <span className="text-lg font-black text-[#E85D2C] bg-slate-900 px-3 py-1 rounded-lg border border-white/10">
                      {calcSurface} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="10"
                    value={calcSurface}
                    onChange={(e) => setCalcSurface(Number(e.target.value))}
                    className="w-full accent-[#E85D2C] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>10 m²</span>
                    <span>500 m²</span>
                    <span>1 000 m²</span>
                    <span>2 000 m²</span>
                  </div>
                </div>

                {/* Results Card */}
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-[#E85D2C]/40 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center divide-x divide-white/10">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-medium block">Besoin Estimé</span>
                      <span className="text-3xl font-black text-white">{calc.totalNeeded.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 block">cales d'enrobage</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-medium block">Poids Total Approx.</span>
                      <span className="text-3xl font-black text-[#E85D2C]">{calc.estimatedWeightKg}</span>
                      <span className="text-xs text-slate-400 block">kg de béton fibré</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Référence conseillée : </span>
                      <span className="font-bold text-[#C9C2AE]">{calc.recommendedRef}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (onOpenDevisWithProduct) {
                          onOpenDevisWithProduct(`Devis pour ${calcSurface} m² (${calc.totalNeeded} cales)`);
                        }
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#E85D2C] text-white font-bold text-xs shadow-md hover:bg-orange-600 transition-colors"
                    >
                      Demander Devis pour cette Quantité
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* COMPARISON SECTION: BFHP VS PVC VS MORTIER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#E85D2C]">Pourquoi Choisir le Béton Fibré</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Cales Béton Fibré (BFHP) vs PVC & Mortier
          </h2>
          <p className="text-slate-300 text-sm mt-2">
            Sans un enrobage constant, la corrosion fragilise l'acier et fait éclater le béton. Nos cales garantissent la pérennité de l'ouvrage.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#112642] shadow-2xl">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-900 text-xs font-bold uppercase text-slate-300 border-b border-white/10">
              <tr>
                <th className="p-4 sm:p-5">Critère Technique</th>
                <th className="p-4 sm:p-5 text-[#E85D2C] bg-[#E85D2C]/10 font-black">Cales SOFIM (Béton Fibré BFHP)</th>
                <th className="p-4 sm:p-5">Cales PVC Plastique</th>
                <th className="p-4 sm:p-5">Cales Mortier Classique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
              {CALES_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">{row.criterion}</td>
                  <td className="p-4 sm:p-5 bg-[#E85D2C]/5 font-semibold text-white border-x border-[#E85D2C]/20">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Check className="w-4 h-4 shrink-0" />
                      {row.bfhp}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400">{row.pvc}</td>
                  <td className="p-4 sm:p-5 text-slate-400">{row.mortier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CERTIFICATIONS & NORMS BAR */}
      <div className="bg-[#091A30] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-extrabold text-white">Qualité & Certifications Normatives</h3>
            <p className="text-xs text-slate-400 mt-1">Chaque pièce est fabriquée selon un process contrôlé avec essais en laboratoire</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS_LIST.slice(0, 4).map((cert, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E85D2C] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-medium leading-relaxed">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DETAIL MODAL FOR PRODUCT */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#112642] border-2 border-[#E85D2C] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-white shadow-2xl">
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#E85D2C] text-white text-xs font-black">
                Réf: {selectedProduct.reference}
              </span>
              <span className="text-xs text-[#C9C2AE] font-semibold">{selectedProduct.badge}</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-1">{selectedProduct.title}</h3>
            <p className="text-sm text-[#C9C2AE] mb-6">{selectedProduct.subtitle}</p>

            <div className="bg-slate-900/80 rounded-2xl p-6 mb-6 flex justify-center border border-white/10">
              <CaleSvgIcon type={selectedProduct.svgType} className="w-40 h-40" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Enrobages</span>
                <span className="font-bold text-[#E85D2C] text-sm">{selectedProduct.enrobages}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Résistance</span>
                <span className="font-bold text-white text-sm">{selectedProduct.resistance}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Classe Béton</span>
                <span className="font-bold text-slate-200 text-sm">{selectedProduct.concreteClass}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Poids Unitaire</span>
                <span className="font-bold text-slate-200 text-sm">{selectedProduct.weight}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Exposition</span>
                <span className="font-bold text-slate-200 text-sm">{selectedProduct.exposureClass}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">Conditionnement</span>
                <span className="font-bold text-slate-200 text-xs">{selectedProduct.packaging || 'Sac standard'}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300 mb-6">
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Description Technique :</h4>
                <p className="leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">Conseils de Mise en Œuvre :</h4>
                <p className="leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-white/10">
                  {selectedProduct.implementation}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">Normes & Homologations :</h4>
                <p className="text-[#C9C2AE] font-mono">{selectedProduct.norms}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  const ref = selectedProduct.reference;
                  setSelectedProduct(null);
                  if (onOpenDevisWithProduct) {
                    onOpenDevisWithProduct(ref);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#E85D2C] hover:bg-orange-600 text-white font-bold text-xs shadow-lg"
              >
                Demander un Devis pour {selectedProduct.reference}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
