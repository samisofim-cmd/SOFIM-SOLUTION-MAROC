import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Globe, Factory, Truck, UserCheck, HelpCircle, ChevronDown, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';

interface AboutContactPageProps {
  onOpenDevis: () => void;
  onOpenIntervention: () => void;
}

interface FAQItem {
  id: string;
  category: 'cales' | 'industrielles' | 'logistique';
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-bfhp-vs-pvc',
    category: 'cales',
    question: "Quels sont les avantages des cales en béton fibré (BFHP) par rapport aux cales en PVC ou mortier traditionnel ?",
    answer: "Les cales en béton fibré haute performance (BFHP) offrent une homogénéité totale avec le béton coulé (même coefficient de dilatation thermique, adhérence parfaite et porosité quasi nulle). Contrairement au PVC, elles ne créent aucun point faible d'infiltration d'eau, ne se déforment pas sous les armatures lourdes (résistance > 55 MPa) et garantissent une résistance au feu (incombustible classe A1) ainsi qu'une durabilité de plus de 50 ans.",
    highlights: [
      "Zéro pont thermique & étanchéité parfaite",
      "Résistance à la compression > 55 à 80 MPa",
      "Tenue au feu Euroclasse A1 & anti-corrosion",
      "Élimination complète des spectres de cales aux décoffrages"
    ]
  },
  {
    id: 'faq-normes-certif',
    category: 'cales',
    question: "Quelles sont les normes et certifications respectées par les cales SOFIM ?",
    answer: "Toutes nos gammes de cales d'enrobage sont certifiées conformes aux exigences strictes du génie civil et des DTU marocains et européens : norme EN 12390 (essais de compression), NF EN 206 (durabilité et classes d'exposition environnementale), NF A35-016 (armatures pour béton armé) et marquage CE. Des procès-verbaux d'essais en laboratoire agréé sont fournis sur simple demande.",
    highlights: [
      "Normes EN 12390-3 & EN 206",
      "Conformité NF A35-016 & Fascicule 65 Cachan",
      "Fiches techniques et PV d'essais téléchargeables"
    ]
  },
  {
    id: 'faq-delais-livraison',
    category: 'logistique',
    question: "Quels sont les délais de livraison sur Tanger, Tétouan et l'ensemble du Maroc ?",
    answer: "Grâce à notre stock permanent situé à Tanger et à notre usine de fabrication à Tétouan, nous garantissons des livraisons sous 24h sur la région Tanger-Tétouan-Al Hoceima et sous 24h à 48h maximum sur l'ensemble du Royaume (Casablanca, Rabat, Kénitra, Fès, Meknès, Marrakech, Agadir, Oujda, etc.). Des enlèvements directs à notre dépôt sont également possibles.",
    highlights: [
      "Livraison sous 24h à Tanger & Tétouan",
      "Livraison 24h/48h partout au Maroc",
      "Conditionnement renforcé sur palettes B2B filmées"
    ]
  },
  {
    id: 'faq-solutions-levage',
    category: 'industrielles',
    question: "Quels types d'équipements industriels et ponts roulants proposez-vous ?",
    answer: "Notre pôle Solutions Industrielles conçoit, installe et maintient des ponts roulants monopoutres et bipoutres (de 1T à 50T), des palans électriques à câble ou à chaîne (partenariats Verlinde, GH Cranes), des potences de levage, des portes sectionnelles isothermes, des portes rapides industrielles, ainsi que des armoires électriques TGBT et des systèmes de sécurité incendie certifiés.",
    highlights: [
      "Ponts roulants sur-mesure de 1 à 50 Tonnes",
      "Partenariats agréés fabricants leaders (Verlinde, Hörmann, Dynaco, Schneider)",
      "Épreuves de charge réglementaires & certification initiale"
    ]
  },
  {
    id: 'faq-sav-astreinte',
    category: 'industrielles',
    question: "Comment fonctionne le service d'astreinte et d'intervention SAV 24/7 ?",
    answer: "Nous mettons à disposition des industriels un service d'astreinte 24h/24 et 7j/7 avec une ligne téléphonique dédiée (+212 660-068-610) et un portail digital de déclaration de tickets. Nos équipes techniques mobiles interviennent en urgence pour le dépannage de vos ponts roulants, portes sectionnelles ou armoires TGBT afin de minimiser tout arrêt de ligne de production.",
    highlights: [
      "Ligne d'astreinte directe 24/7 : +212 660-068-610",
      "Temps de réponse rapide sur zones industrielles",
      "Contrats de maintenance préventive personnalisés"
    ]
  },
  {
    id: 'faq-echantillons-devis',
    category: 'logistique',
    question: "Est-il possible de recevoir des échantillons de cales et un devis personnalisé ?",
    answer: "Absolument. Nous mettons gratuitement à disposition des maîtres d'ouvrage, bureaux de contrôle et entreprises des kits d'échantillons complets (CPME, CCS, CMP, CUTS, CUTS-R, CMHBF) pour validation sur chantier. Les devis techniques et chiffrages sont établis sous 24h ouvrées via notre configurateur en ligne ou directement par nos chargés d'affaires.",
    highlights: [
      "Kits d'échantillons gratuits sur simple demande",
      "Devis gratuit sous 24h avec remise par volume",
      "Assistance technique de dimensionnement d'enrobage"
    ]
  }
];

export const AboutContactPage: React.FC<AboutContactPageProps> = ({ onOpenDevis, onOpenIntervention }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-bfhp-vs-pvc');
  const [faqFilter, setFaqFilter] = useState<'all' | 'cales' | 'industrielles' | 'logistique'>('all');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (faqFilter === 'all') return true;
    return item.category === faqFilter;
  });

  return (
    <div className="bg-[#0A1E38] text-white min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="relative bg-[#071629] py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E85D2C]">L'ENTREPRISE</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 tracking-tight">
            SOFIM SOLUTION <span className="text-[#E85D2C]">MAROC</span>
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto mt-3">
            Fabricant et distributeur agréé de cales en béton fibre (BFHP) & Spécialiste des équipements et maintenances industrielles à Tanger et sur tout le Maroc.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* COMPANY PRESENTATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Notre Mission & Nos Engagements
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              SOFIM SOLUTION MAROC SARL est le fabricant et le distributeur agréé des cales en béton fibre sur l'ensemble du territoire marocain. Notre mission : garantir aux bureaux d'études, entreprises de gros œuvre, préfabricateurs et industriels un accès simple, rapide et fiable à une gamme complète de cales d’enrobage haute performance ainsi qu'un accompagnement sur leurs équipements industriels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#0d2645] p-4 border border-white/10">
                <div className="w-8 h-8 bg-[#E85D2C] text-white flex items-center justify-center mb-2">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs text-white uppercase tracking-wider">Stock Permanent</h3>
                <p className="text-[11px] text-slate-400 mt-1">Toutes références disponibles pour livraison immédiate sur chantier.</p>
              </div>

              <div className="bg-[#0d2645] p-4 border border-white/10">
                <div className="w-8 h-8 bg-[#C7940A] text-white flex items-center justify-center mb-2">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs text-white uppercase tracking-wider">Support Technique</h3>
                <p className="text-[11px] text-slate-400 mt-1">Accompagnement par nos ingénieurs pour le choix de l'enrobage idéal.</p>
              </div>

              <div className="bg-[#0d2645] p-4 border border-white/10">
                <div className="w-8 h-8 bg-[#C9C2AE] text-slate-950 flex items-center justify-center mb-2">
                  <Factory className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs text-white uppercase tracking-wider">Fabrication Maroc</h3>
                <p className="text-[11px] text-slate-400 mt-1">Site de production à Tétouan & réseau logistique national.</p>
              </div>
            </div>
          </div>

          {/* Contact Box Card */}
          <div className="lg:col-span-5 bg-[#0d2645] p-6 sm:p-8 border border-white/10 relative shadow-2xl">
            <div className="absolute top-0 right-0 bg-[#E85D2C] text-white text-[10px] font-bold uppercase tracking-tighter px-3 py-1">
              Siège Direction
            </div>

            <h3 className="text-xl font-extrabold text-white mb-1">SOFIM SOLUTION MAROC</h3>
            <p className="text-xs text-[#C9C2AE] font-semibold mb-6">Directrice Générale : Mme Halima AGGUER</p>

            <div className="space-y-3 text-xs text-slate-200">
              <a
                href="tel:+212660068610"
                className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 hover:border-[#E85D2C] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E85D2C] shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Téléphone / WhatsApp</span>
                  <span className="font-bold text-white text-sm">+212 660-068-610</span>
                </div>
              </a>

              <a
                href="mailto:sofimsolution@gmail.com"
                className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 hover:border-[#E85D2C] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#E85D2C] shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Email Officiel</span>
                  <span className="font-semibold text-white">sofimsolution@gmail.com</span>
                </div>
              </a>

              <a
                href="http://www.sofim-maroc.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 hover:border-[#E85D2C] transition-colors"
              >
                <Globe className="w-4 h-4 text-[#E85D2C] shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Site Web</span>
                  <span className="font-semibold text-white">www.sofim-maroc.ma</span>
                </div>
              </a>

              <div className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-[#E85D2C] shrink-0" />
                <div>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Localisation & Usine</span>
                  <span className="font-semibold text-white">Tanger & Tétouan, Maroc</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
              <button
                onClick={onOpenDevis}
                className="py-3 px-3 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-bold uppercase text-xs tracking-widest text-center transition-colors"
              >
                Devis Cales
              </button>
              <button
                onClick={onOpenIntervention}
                className="py-3 px-3 border border-[#C7940A] text-[#C7940A] hover:bg-[#C7940A] hover:text-slate-950 font-bold uppercase text-xs tracking-widest text-center transition-colors"
              >
                SAV 24/7
              </button>
            </div>
          </div>

        </div>

        {/* LOGISTICS & COVERAGE MAP SECTION */}
        <div className="bg-[#071629] p-8 border border-white/10 text-center space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C7940A]">RÉSEAU LOGISTIQUE</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Couverture Nationale & Livraison Express
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Acheminement garanti sous 24/48h sur tous les chantiers et zones industrielles du Royaume du Maroc.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {['Tanger', 'Tétouan', 'Larache', 'Kénitra', 'Rabat', 'Casablanca', 'El Jadida', 'Marrakech', 'Agadir', 'Fès', 'Meknès', 'Oujda', 'Nador'].map((city, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-200"
              >
                📍 {city}
              </span>
            ))}
          </div>
        </div>

        {/* DYNAMIC FAQ SECTION WITH FRAMER MOTION ACCORDION */}
        <div className="bg-[#071629] border border-white/10 p-6 sm:p-10 space-y-8 shadow-2xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E85D2C]/10 border border-[#E85D2C]/30 text-[#E85D2C] text-xs font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Foire Aux Questions</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Questions Fréquentes & Conseils Techniques
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Trouvez rapidement les réponses à vos interrogations sur nos cales en béton fibré, nos prestations industrielles et nos modalités de commande.
              </p>
            </div>

            {/* FAQ Category Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {[
                { id: 'all', label: 'Toutes' },
                { id: 'cales', label: 'Cales BFHP' },
                { id: 'industrielles', label: 'Solutions Industrielles' },
                { id: 'logistique', label: 'Logistique & Devis' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFaqFilter(tab.id as any)}
                  className={`py-1.5 px-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                    faqFilter === tab.id
                      ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                      : 'bg-[#0A1E38] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`border transition-colors duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#E85D2C] bg-[#0A1E38]'
                      : 'border-white/10 bg-[#0A1E38]/60 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors focus:outline-none focus:ring-1 focus:ring-[#E85D2C]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <span className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono text-xs font-bold shrink-0 border transition-colors ${
                        isOpen
                          ? 'bg-[#E85D2C] text-white border-[#E85D2C]'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="shrink-0 text-slate-400"
                    >
                      <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#E85D2C]' : 'text-slate-400'}`} />
                    </motion.div>
                  </button>

                  {/* Animated Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-white/10 space-y-4">
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                            {faq.answer}
                          </p>

                          {faq.highlights && faq.highlights.length > 0 && (
                            <div className="bg-[#071629] p-3.5 sm:p-4 border border-white/10 space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7940A] flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Points Clés & Conformité :</span>
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                                {faq.highlights.map((item, hIdx) => (
                                  <div key={hIdx} className="flex items-start space-x-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E85D2C] shrink-0 mt-0.5" />
                                    <span className="text-[11px] sm:text-xs text-slate-300">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Need More Assistance Banner */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0d2645] to-[#071629] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#E85D2C]/20 border border-[#E85D2C]/40 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-[#E85D2C]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Vous avez une question spécifique sur votre chantier ?</h4>
                <p className="text-xs text-slate-300">Nos ingénieurs et techniciens vous répondent en moins de 2 heures.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={onOpenDevis}
                className="py-2.5 px-4 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-bold uppercase text-xs tracking-wider transition-colors"
              >
                Poser une Question
              </button>
              <a
                href="https://wa.me/212660068610"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs tracking-wider transition-colors"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};


