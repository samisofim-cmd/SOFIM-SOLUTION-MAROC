import React, { useState } from 'react';
import { CALES_PRODUCTS } from '../data/calesData';
import { INDUSTRIAL_PILLARS } from '../data/industrialData';
import { Search, Download, FileText, CheckCircle2, SlidersHorizontal, ArrowRight, ShieldCheck, Wrench, Layers, Building2, Eye, Box } from 'lucide-react';
import catalogHeaderImg from '../assets/images/sofim_catalog_header_1786466801456.jpg';
import officialLogoImg from '../assets/images/sofim_official_logo_1786466786854.jpg';

interface CatalogPageProps {
  onOpenDevisWithRef: (productRef: string) => void;
  onOpenIntervention: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onOpenDevisWithRef,
  onOpenIntervention
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cales' | 'levage' | 'fermetures' | 'electricite' | 'sav'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductDetail, setSelectedProductDetail] = useState<any | null>(null);

  // Combine Cales products & Industrial equipment into unified catalog format
  const calesItems = CALES_PRODUCTS.map((p) => ({
    id: p.id,
    type: 'cale' as const,
    categoryKey: 'cales' as const,
    categoryLabel: 'Cale en Béton Fibre (BFHP)',
    reference: p.reference,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    badge: p.badge || 'BFHP Certifiée',
    specs: [
      { label: 'Enrobages', value: p.enrobages },
      { label: 'Résistance', value: p.resistance },
      { label: 'Classe Béton', value: p.concreteClass },
      { label: 'Normes', value: p.norms }
    ],
    packaging: p.packaging,
    applications: p.applications,
    badgeColor: 'border-[#E85D2C] text-[#E85D2C] bg-[#E85D2C]/10'
  }));

  const industrialItems = [
    {
      id: 'ind-ponts-roulants',
      type: 'industrial' as const,
      categoryKey: 'levage' as const,
      categoryLabel: 'Équipement de Levage',
      reference: 'LEV-PONT-ROULANT',
      title: 'Ponts Roulants Monopoutre & Bipoutre (1T à 50T)',
      subtitle: 'Conception, fabrication, pose et mise en service certifiée au Maroc',
      description: 'Ponts roulants sur mesure équipés de palans Verlinde / GH, variateurs de vitesse, radiocommandes sécurisées et gaines d’alimentation blindées.',
      badge: 'Levage Lourd Certifié',
      specs: [
        { label: 'Capacité', value: '1 à 50 Tonnes' },
        { label: 'Portée Hall', value: 'Jusqu’à 35 Mètres' },
        { label: 'Palans', value: 'Verlinde / GH Cranes' },
        { label: 'Conformité', value: 'Normes CE / ISO 9001' }
      ],
      packaging: 'Clef en main sur site',
      applications: ['Usines automobiles', 'Aéronautique', 'Métallurgie', 'Chantiers navals'],
      badgeColor: 'border-[#C7940A] text-[#C7940A] bg-[#C7940A]/10'
    },
    {
      id: 'ind-portes-sectionnelles',
      type: 'industrial' as const,
      categoryKey: 'fermetures' as const,
      categoryLabel: 'Fermetures Industrielles',
      reference: 'FERM-PORTE-SECT',
      title: 'Portes Sectionnelles Isothermes & Portes Rapides Flexibles',
      subtitle: 'Isolation thermique renforcée et étanchéité pour halls logistiques',
      description: 'Panneaux sandwich isolés 40mm/80mm, motorisations triphasées intensives, sas d’étanchéité et rideaux métalliques de sécurité.',
      badge: 'Isolation & Sécurité',
      specs: [
        { label: 'Épaisseur', value: '40mm / 80mm Isotherme' },
        { label: 'Vitesse Ouverture', value: 'Jusqu’à 2.5 m/s' },
        { label: 'Résistance Vent', value: 'Classe 3 / 4' },
        { label: 'Partenaire', value: 'Hörmann / Dynaco' }
      ],
      packaging: 'Livraison & Pose sur site',
      applications: ['Entrepôts Frigorifiques', 'Plateformes Logistiques', 'Usines Agroalimentaires'],
      badgeColor: 'border-blue-400 text-blue-400 bg-blue-500/10'
    },
    {
      id: 'ind-armoires-tgbt',
      type: 'industrial' as const,
      categoryKey: 'electricite' as const,
      categoryLabel: 'Distribution Électrique TGBT',
      reference: 'ELEC-TGBT-AUTO',
      title: 'Armoires Électriques TGBT & Coffrets d’Automatisme',
      subtitle: 'Distribution de puissance, armoires d’automatismes et variateurs',
      description: 'Conception et câblage d’armoires TGBT jusqu’à 4000A, coffrets d’automates Schneider/Siemens, variateurs Schneider Altivar et compensation d’énergie réactive.',
      badge: 'Haute Puissance',
      specs: [
        { label: 'Intensité Max', value: 'Jusqu’à 4000 Ampères' },
        { label: 'Indice Protection', value: 'IP55 / IP65' },
        { label: 'Marques', value: 'Schneider / Siemens / ABB' },
        { label: 'Contrôle', value: 'Thermographie Infrarouge' }
      ],
      packaging: 'Assemblé & Testé en Atelier',
      applications: ['Distribution usine', 'Halls industriels', 'Postes de transformation'],
      badgeColor: 'border-purple-400 text-purple-400 bg-purple-500/10'
    },
    {
      id: 'ind-securite-incendie',
      type: 'industrial' as const,
      categoryKey: 'sav' as const,
      categoryLabel: 'Sécurité Incendie & RIA',
      reference: 'INC-RIA-EXT',
      title: 'Systèmes de Sécurité Incendie, Extinction & Réseaux RIA',
      subtitle: 'Installation certifiée de RIA, groupes de surpression et désenfumage',
      description: 'Mise en conformité incendie pour établissements industriels : Robinets d’Incendie Armés (RIA), extincteurs certifiés, détection automatique et colonnes sèches.',
      badge: 'Mise aux Normes',
      specs: [
        { label: 'Norme NF', value: 'NF S 62-201 / CE' },
        { label: 'Équipements', value: 'RIA DN25/DN33 + Pression' },
        { label: 'Inspecion', value: 'Visite Réglementaire Annuelle' },
        { label: 'Garantie', value: 'Attestation de Conformité' }
      ],
      packaging: 'Complet avec PV de réception',
      applications: ['Sites classés ICPE', 'Usines', 'Entrepôts logistiques Tanger Med'],
      badgeColor: 'border-rose-400 text-rose-400 bg-rose-500/10'
    }
  ];

  const allCatalogItems = [...calesItems, ...industrialItems];

  // Filter items
  const filteredItems = allCatalogItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.categoryKey === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.reference.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.applications.some((app) => app.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0A1E38] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER HERO BANNER */}
        <div className="relative bg-[#071629] border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${catalogHeaderImg})` }}></div>
          <div className="relative z-10 p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center space-x-3">
                <img src={officialLogoImg} alt="SOFIM Logo" className="w-12 h-12 object-cover border border-[#E85D2C] shadow-lg" referrerPolicy="no-referrer" />
                <span className="text-xs font-black tracking-[0.2em] text-[#E85D2C] uppercase bg-[#E85D2C]/10 px-3 py-1 border border-[#E85D2C]/30">
                  CATALOGUE OFFICIEL B2B 2026
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Catalogue Général Produits & Solutions Industrielles
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Retrouvez l’intégralité de nos cales en béton fibre (BFHP) certifiées EN 12390 et nos équipements de levage, fermetures et TGBT pour le marché industriel au Maroc.
              </p>
            </div>

            <div className="bg-[#0A1E38]/90 p-5 border border-white/10 space-y-3 shrink-0 text-center md:text-left min-w-[260px]">
              <span className="text-[10px] font-bold text-[#C7940A] uppercase tracking-wider block">
                STATISTIQUES CATALOGUE
              </span>
              <div className="text-2xl font-black text-white font-mono">
                {allCatalogItems.length} Gammes Complètes
              </div>
              <p className="text-[11px] text-slate-400">
                100% Stocké à Tanger & Tétouan • Livraison sous 24/48h sur tout le Maroc.
              </p>
              <button
                onClick={() => onOpenDevisWithRef('Catalogue Général 2026')}
                className="w-full py-2.5 px-4 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-extrabold uppercase text-[11px] tracking-widest transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger PDF Catalogue</span>
              </button>
            </div>

          </div>
        </div>

        {/* SEARCH & CATEGORY FILTER BAR */}
        <div className="bg-[#071629] p-4 sm:p-6 border border-white/10 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Rechercher par référence, norme, type d'enrobage (ex: CPME, Verlinde, 35mm)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A1E38] border border-white/15 pl-9 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
              />
            </div>

            {/* Counter */}
            <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-[#E85D2C]" />
              <span>{filteredItems.length} / {allCatalogItems.length} Références Affichées</span>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {[
              { id: 'all', label: 'Toutes les Références' },
              { id: 'cales', label: '🧱 Cales en Béton Fibre (BFHP)' },
              { id: 'levage', label: '🏗️ Ponts Roulants & Levage' },
              { id: 'fermetures', label: '🚪 Portes Sectionnelles & Rapides' },
              { id: 'electricite', label: '⚡ TGBT & Automatisme' },
              { id: 'sav', label: '🔥 Sécurité Incendie & SAV 24/7' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`py-2 px-3.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === tab.id
                    ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                    : 'bg-[#0A1E38] text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* CATALOG ITEMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#071629] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between p-6 space-y-5 shadow-xl group"
            >
              <div className="space-y-4">
                
                {/* Header Badge & Ref */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <span className="font-mono text-xs font-black text-[#E85D2C] bg-[#E85D2C]/10 border border-[#E85D2C]/30 px-2.5 py-1">
                    {item.reference}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-[#E85D2C] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-3">
                  {item.description}
                </p>

                {/* Specs Box */}
                <div className="bg-[#0A1E38] p-3 border border-white/10 space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7940A] block">
                    SPÉCIFICATIONS TECHNIQUES
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="space-y-0.5">
                        <span className="text-slate-400 text-[10px] block">{spec.label}</span>
                        <span className="font-mono text-white font-bold block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications Chips */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    DOMAINES D'APPLICATION :
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.applications.map((app, aIdx) => (
                      <span key={aIdx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 text-slate-300">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => onOpenDevisWithRef(item.reference)}
                  className="w-full py-3 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-extrabold uppercase text-xs tracking-widest transition-colors flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Demander un Devis pour {item.reference}</span>
                </button>

                <button
                  onClick={() => setSelectedProductDetail(item)}
                  className="w-full py-2 bg-[#0A1E38] hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 font-bold uppercase text-[10px] tracking-wider transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Voir la Fiche Technique Complète</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* MODAL FICHE TECHNIQUE DETAILED VIEW */}
        {selectedProductDetail && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#071629] border-2 border-[#E85D2C] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>

              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-[#E85D2C] bg-[#E85D2C]/10 px-2.5 py-1 border border-[#E85D2C]/30 inline-block mb-2">
                  RÉF: {selectedProductDetail.reference}
                </span>
                <h2 className="text-2xl font-black text-white">{selectedProductDetail.title}</h2>
                <p className="text-xs text-slate-300 mt-1">{selectedProductDetail.subtitle}</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[#C7940A] block mb-1">DESCRIPTION TECHNIQUE DÉTAILLÉE</span>
                  <p className="text-slate-200 leading-relaxed">{selectedProductDetail.description}</p>
                </div>

                <div className="bg-[#0A1E38] p-4 border border-white/10 space-y-2">
                  <span className="font-bold text-white block">SPÉCIFICATIONS CONSTRUCTEUR & NORMES :</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {selectedProductDetail.specs.map((s: any, idx: number) => (
                      <li key={idx}>
                        <span className="text-slate-400">{s.label} :</span> <span className="font-mono text-white font-bold">{s.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-white block mb-1">CONDITIONNEMENT & LOGISTIQUE :</span>
                  <p className="text-slate-300 font-mono bg-[#0A1E38] p-2.5 border border-white/10">
                    {selectedProductDetail.packaging || 'Emballage renforcé B2B sur palette'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const ref = selectedProductDetail.reference;
                    setSelectedProductDetail(null);
                    onOpenDevisWithRef(ref);
                  }}
                  className="w-full py-3 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-bold uppercase text-xs tracking-widest"
                >
                  Obtenir un Devis Gratuit Sous 24h
                </button>

                <button
                  onClick={() => setSelectedProductDetail(null)}
                  className="py-3 px-6 bg-slate-800 text-slate-300 hover:text-white font-bold uppercase text-xs tracking-widest"
                >
                  Fermer
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
