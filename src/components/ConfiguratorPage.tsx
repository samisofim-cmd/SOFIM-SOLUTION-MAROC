import React, { useState } from 'react';
import { ConfiguratorState } from '../types';
import { Sliders, Wrench, ShieldCheck, Zap, Download, Send, Check, Calculator, Building2 } from 'lucide-react';

interface ConfiguratorPageProps {
  onOpenDevisWithData?: (data: Partial<ConfiguratorState>) => void;
}

export const ConfiguratorPage: React.FC<ConfiguratorPageProps> = ({
  onOpenDevisWithData
}) => {
  const [config, setConfig] = useState<ConfiguratorState>({
    equipmentType: 'pont_roulant',
    capacityTonnes: 5,
    spanMeters: 18,
    doorWidthMeters: 4,
    doorHeightMeters: 4.5,
    cycleFrequency: 'intensive',
    powerKw: 15,
    hasAutomation: true,
    hasMaintenanceContract: true,
    options: ['Variateur de vitesse', 'Télécommande Radio IKUSI', 'Afficheur numérique de charge']
  });

  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Price Estimator Logic (MAD - Dirham Marocain)
  const calculateEstimatedCost = () => {
    let base = 0;
    if (config.equipmentType === 'pont_roulant') {
      base = 80000 + (config.capacityTonnes || 5) * 12000 + (config.spanMeters || 15) * 2500;
      if (config.options.includes('Télécommande Radio IKUSI')) base += 8500;
      if (config.options.includes('Variateur de vitesse')) base += 12000;
    } else if (config.equipmentType === 'porte_sectionnelle') {
      const area = (config.doorWidthMeters || 4) * (config.doorHeightMeters || 4);
      base = 18000 + area * 1800;
      if (config.hasAutomation) base += 6500;
    } else if (config.equipmentType === 'armoire_tgbt') {
      base = 45000 + (config.powerKw || 15) * 1200;
      if (config.hasAutomation) base += 15000;
    } else {
      base = 25000;
    }

    if (config.hasMaintenanceContract) base *= 0.95; // 5% discount on combo equipment + SAV contract
    return Math.round(base);
  };

  const toggleOption = (optionName: string) => {
    if (config.options.includes(optionName)) {
      setConfig({ ...config, options: config.options.filter((o) => o !== optionName) });
    } else {
      setConfig({ ...config, options: [...config.options, optionName] });
    }
  };

  const handleLaunchQuote = () => {
    setSubmittedMessage(true);
    if (onOpenDevisWithData) {
      onOpenDevisWithData(config);
    }
  };

  const estimatedCost = calculateEstimatedCost();

  return (
    <div className="bg-[#0A1E38] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E85D2C] bg-[#E85D2C]/10 px-3 py-1 border border-[#E85D2C]/30 inline-block">
            CONFIGURATEUR & CALCULATEUR SUR MESURE B2B
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Dimensionnez Vos Équipements Industriels
          </h1>
          <p className="text-slate-300 text-sm">
            Calculez les spécifications techniques et l'estimation budgétaire pour vos installations de levage, fermetures, armoires TGBT et sécurité incendie au Maroc.
          </p>
        </div>

        {/* MAIN CONFIGURATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: CONFIGURATION PARAMETERS FORM */}
          <div className="lg:col-span-7 bg-[#071629] p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl">
            
            {/* Step 1: Equipment Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#E85D2C] mb-2 flex items-center space-x-2">
                <Sliders className="w-4 h-4" />
                <span>1. Type d'Installation Industrielle</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, equipmentType: 'pont_roulant' })}
                  className={`p-3 text-left border text-xs font-bold uppercase tracking-wider transition-all ${
                    config.equipmentType === 'pont_roulant'
                      ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                      : 'bg-[#0A1E38] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  🏗️ Pont Roulant / Bipoutre
                </button>

                <button
                  type="button"
                  onClick={() => setConfig({ ...config, equipmentType: 'porte_sectionnelle' })}
                  className={`p-3 text-left border text-xs font-bold uppercase tracking-wider transition-all ${
                    config.equipmentType === 'porte_sectionnelle'
                      ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                      : 'bg-[#0A1E38] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  🚪 Porte Sectionnelle / Rapide
                </button>

                <button
                  type="button"
                  onClick={() => setConfig({ ...config, equipmentType: 'armoire_tgbt' })}
                  className={`p-3 text-left border text-xs font-bold uppercase tracking-wider transition-all ${
                    config.equipmentType === 'armoire_tgbt'
                      ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                      : 'bg-[#0A1E38] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  ⚡ Armoire Électrique TGBT
                </button>

                <button
                  type="button"
                  onClick={() => setConfig({ ...config, equipmentType: 'securite_incendie' })}
                  className={`p-3 text-left border text-xs font-bold uppercase tracking-wider transition-all ${
                    config.equipmentType === 'securite_incendie'
                      ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                      : 'bg-[#0A1E38] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  🔥 Système Sécurité Incendie
                </button>
              </div>
            </div>

            {/* Step 2: Dynamic Parameters depending on Equipment */}
            {config.equipmentType === 'pont_roulant' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C7940A]">
                  2. Paramètres de Levage
                </label>

                {/* Capacity Slider */}
                <div className="bg-[#0A1E38] p-4 border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-bold">Capacité de Charge Utile :</span>
                    <span className="font-mono text-[#E85D2C] font-black text-sm">{config.capacityTonnes} Tonnes</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={config.capacityTonnes}
                    onChange={(e) => setConfig({ ...config, capacityTonnes: parseInt(e.target.value) })}
                    className="w-full accent-[#E85D2C] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 T</span>
                    <span>10 T</span>
                    <span>25 T</span>
                    <span>50 T</span>
                  </div>
                </div>

                {/* Span Slider */}
                <div className="bg-[#0A1E38] p-4 border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-bold">Portée (Largeur du Hall) :</span>
                    <span className="font-mono text-[#E85D2C] font-black text-sm">{config.spanMeters} Mètres</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="35"
                    step="1"
                    value={config.spanMeters}
                    onChange={(e) => setConfig({ ...config, spanMeters: parseInt(e.target.value) })}
                    className="w-full accent-[#E85D2C] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>6m</span>
                    <span>15m</span>
                    <span>25m</span>
                    <span>35m</span>
                  </div>
                </div>
              </div>
            )}

            {config.equipmentType === 'porte_sectionnelle' && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C7940A]">
                  2. Dimensions de la Baie
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0A1E38] p-4 border border-white/10 space-y-2">
                    <span className="text-xs text-slate-300 font-bold block">Largeur (m)</span>
                    <input
                      type="number"
                      value={config.doorWidthMeters}
                      onChange={(e) => setConfig({ ...config, doorWidthMeters: parseFloat(e.target.value) || 3 })}
                      className="w-full bg-[#071629] border border-white/10 p-2 text-sm text-white font-mono"
                    />
                  </div>

                  <div className="bg-[#0A1E38] p-4 border border-white/10 space-y-2">
                    <span className="text-xs text-slate-300 font-bold block">Hauteur (m)</span>
                    <input
                      type="number"
                      value={config.doorHeightMeters}
                      onChange={(e) => setConfig({ ...config, doorHeightMeters: parseFloat(e.target.value) || 3 })}
                      className="w-full bg-[#071629] border border-white/10 p-2 text-sm text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Options & Accessories Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C9C2AE]">
                3. Options & Automations Recommandées
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Variateur de vitesse',
                  'Télécommande Radio IKUSI',
                  'Afficheur numérique de charge',
                  'Finition anticorrosion C4/C5 Marine',
                  'Alimentation sous gaine de sécurité',
                  'Ligne d\'éclairage sous pont LED'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleOption(opt)}
                    className={`p-3 text-left border flex items-center justify-between font-medium transition-all ${
                      config.options.includes(opt)
                        ? 'bg-[#E85D2C]/20 border-[#E85D2C] text-white'
                        : 'bg-[#0A1E38] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{opt}</span>
                    {config.options.includes(opt) && <Check className="w-4 h-4 text-[#E85D2C] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Maintenance Contract Discount Toggle */}
            <div className="p-4 bg-[#0A1E38] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Inclure Contrat de Maintenance Annuelle SAV 24/7</span>
                <span className="text-[10px] text-slate-400">Bénéficiez de -5% de remise sur l'équipement & visites préventives réglementaires.</span>
              </div>
              <button
                type="button"
                onClick={() => setConfig({ ...config, hasMaintenanceContract: !config.hasMaintenanceContract })}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border ${
                  config.hasMaintenanceContract ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {config.hasMaintenanceContract ? 'OUI (-5%)' : 'NON'}
              </button>
            </div>

          </div>

          {/* RIGHT PANEL: LIVE SUMMARY & COST ESTIMATION CARD */}
          <div className="lg:col-span-5 bg-[#071629] p-6 sm:p-8 border-2 border-[#E85D2C] space-y-6 shadow-2xl relative sticky top-24">
            
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E85D2C] block">
                RÉCAPITULATIF DE VOTRE CONFIGURATION
              </span>
              <h3 className="text-xl font-black text-white mt-1">Estimations & Devis Officiel</h3>
            </div>

            <div className="bg-[#0A1E38] p-4 border border-white/10 space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Équipement :</span>
                <span className="font-bold text-white uppercase">{config.equipmentType.replace('_', ' ')}</span>
              </div>

              {config.equipmentType === 'pont_roulant' && (
                <>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Capacité :</span>
                    <span className="font-mono text-white font-bold">{config.capacityTonnes} Tonnes</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-400">Portée :</span>
                    <span className="font-mono text-white font-bold">{config.spanMeters} mètres</span>
                  </div>
                </>
              )}

              {config.equipmentType === 'porte_sectionnelle' && (
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Dimensions Baie :</span>
                  <span className="font-mono text-white font-bold">{config.doorWidthMeters}m x {config.doorHeightMeters}m</span>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-1">Options sélectionnées ({config.options.length}) :</span>
                <div className="flex flex-wrap gap-1">
                  {config.options.map((opt, i) => (
                    <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 text-slate-300">
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ESTIMATED PRICE BOX */}
            <div className="bg-gradient-to-r from-[#0A1E38] to-[#0d2645] p-5 border border-[#E85D2C]/40 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7940A]">
                ESTIMATION BUDGÉTAIRE INDICATIVE HT
              </span>
              <div className="text-3xl font-black text-[#E85D2C] font-mono">
                ~ {estimatedCost.toLocaleString()} MAD <span className="text-xs text-slate-400">HT</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Tarif indicatif susceptible d'ajustement selon contraintes d'installation sur site.
              </p>
            </div>

            {/* CALL TO ACTION BUTTON */}
            <div className="space-y-2">
              <button
                onClick={handleLaunchQuote}
                className="w-full py-4 px-6 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-extrabold uppercase text-xs tracking-widest shadow-xl flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Transformer en Demande de Devis Officiel</span>
              </button>

              {submittedMessage && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold text-center">
                  ✓ Configuration transmise au pôle ingénierie SOFIM.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
