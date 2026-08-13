import React, { useState } from 'react';
import { Industrial3DViewer, HOTSPOTS_DATA } from './Industrial3DViewer';
import { SchemaNode } from '../types';
import { Layers, ShieldCheck, Wrench, ArrowRight, Activity, FileText, CheckCircle } from 'lucide-react';

interface InteractiveSchemaViewerProps {
  onOpenIntervention: () => void;
  onOpenDevis: () => void;
}

export const InteractiveSchemaViewer: React.FC<InteractiveSchemaViewerProps> = ({
  onOpenIntervention,
  onOpenDevis
}) => {
  const [activeEquipment, setActiveEquipment] = useState<
    'pont_roulant' | 'porte_sectionnelle' | 'armoire_tgbt' | 'securite_incendie'
  >('pont_roulant');

  const [selectedNode, setSelectedNode] = useState<SchemaNode | null>(
    HOTSPOTS_DATA.pont_roulant[0]
  );

  const handleEquipmentChange = (
    type: 'pont_roulant' | 'porte_sectionnelle' | 'armoire_tgbt' | 'securite_incendie'
  ) => {
    setActiveEquipment(type);
    setSelectedNode(HOTSPOTS_DATA[type][0]);
  };

  return (
    <div className="bg-[#0A1E38] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E85D2C] bg-[#E85D2C]/10 px-3 py-1 border border-[#E85D2C]/30 inline-block">
            VISUALISATION & MODÉLISATION 3D INTERACTIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Schémas d'Ingénierie & Organes de Maintenance
          </h2>
          <p className="text-slate-300 text-sm">
            Inspectez en 3D les installations industrielles gérées par <span className="text-[#E85D2C] font-bold">SOFIM SOLUTION MAROC</span>. Cliquez sur les organes pour consulter les protocoles de maintenance et normes CE.
          </p>
        </div>

        {/* EQUIPMENT TYPE SELECTOR TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#071629] p-2 border border-white/10 max-w-4xl mx-auto">
          <button
            onClick={() => handleEquipmentChange('pont_roulant')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border ${
              activeEquipment === 'pont_roulant'
                ? 'bg-[#E85D2C] text-white border-[#E85D2C] shadow-lg'
                : 'bg-transparent text-slate-300 border-transparent hover:border-white/20'
            }`}
          >
            🏗️ Ponts Roulants
          </button>

          <button
            onClick={() => handleEquipmentChange('porte_sectionnelle')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border ${
              activeEquipment === 'porte_sectionnelle'
                ? 'bg-[#E85D2C] text-white border-[#E85D2C] shadow-lg'
                : 'bg-transparent text-slate-300 border-transparent hover:border-white/20'
            }`}
          >
            🚪 Portes Industrielles
          </button>

          <button
            onClick={() => handleEquipmentChange('armoire_tgbt')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border ${
              activeEquipment === 'armoire_tgbt'
                ? 'bg-[#E85D2C] text-white border-[#E85D2C] shadow-lg'
                : 'bg-transparent text-slate-300 border-transparent hover:border-white/20'
            }`}
          >
            ⚡ Armoires TGBT
          </button>

          <button
            onClick={() => handleEquipmentChange('securite_incendie')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border ${
              activeEquipment === 'securite_incendie'
                ? 'bg-[#E85D2C] text-white border-[#E85D2C] shadow-lg'
                : 'bg-transparent text-slate-300 border-transparent hover:border-white/20'
            }`}
          >
            🔥 Sécurité Incendie
          </button>
        </div>

        {/* MAIN DISPLAY GRID: 3D VIEWPORT & MAINTENANCE PROTOCOL CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 3D WebGL Canvas Viewport */}
          <div className="lg:col-span-7">
            <Industrial3DViewer
              equipmentType={activeEquipment}
              selectedNodeId={selectedNode?.id}
              onSelectNode={(node) => setSelectedNode(node)}
            />
          </div>

          {/* Detailed Component Panel */}
          <div className="lg:col-span-5 bg-[#071629] p-6 border border-white/10 space-y-6 shadow-xl">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7940A] block mb-1">
                COMPOSANT SELECTIONNE
              </span>
              <h3 className="text-xl font-black text-white">{selectedNode?.name}</h3>
              <p className="text-xs font-mono text-[#C9C2AE] mt-0.5">Code Norme : {selectedNode?.codeRef}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description & Usage</h4>
              <p className="text-xs text-slate-200 leading-relaxed bg-[#0A1E38] p-3 border border-white/10">
                {selectedNode?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0A1E38] p-3 border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Fréquence SAV</span>
                <span className="text-xs font-bold text-white">{selectedNode?.maintenanceFrequency}</span>
              </div>
              <div className="bg-[#0A1E38] p-3 border border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Réf Pièce SOFIM</span>
                <span className="text-xs font-mono font-bold text-[#E85D2C]">{selectedNode?.sparePartRef}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Points de Contrôle Réglementaire CE / NF</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedNode?.safetyChecklist.map((chk, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
              <button
                onClick={onOpenIntervention}
                className="py-3 px-3 bg-[#C7940A] text-slate-950 hover:bg-amber-400 font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-1 transition-colors"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Demander SAV</span>
              </button>

              <button
                onClick={onOpenDevis}
                className="py-3 px-3 bg-[#E85D2C] text-white hover:bg-[#c94d22] font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-1 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Devis Pièce</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
