import React from 'react';
import { motion } from 'motion/react';
import { ViewMode } from '../types';
import { Boxes, Wrench, ShieldCheck, Truck, ArrowRight, Award, CheckCircle2, Factory, PhoneCall, Sparkles, MapPin } from 'lucide-react';

interface HubPageProps {
  onSelectView: (view: ViewMode) => void;
  onOpenDevis: () => void;
  onOpenIntervention: () => void;
}

export const HubPage: React.FC<HubPageProps> = ({
  onSelectView,
  onOpenDevis,
  onOpenIntervention
}) => {
  // Container stagger variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const itemSlideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardHoverVariants = {
    rest: { y: 0 },
    hover: { 
      y: -6,
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1E38] text-white relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#E85D2C]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#C7940A]/10 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Hub Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10 w-full my-auto"
      >
        
        {/* Header Title Section with Fade-in & Slide-up */}
        <motion.div variants={itemSlideUpVariants} className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs sm:text-sm font-semibold mb-6 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-[#C7940A]" />
            <span>SOFIM SOLUTION MAROC — SARLAU, Tanger & Tétouan</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Votre Partenaire d'Excellence pour le <span className="bg-gradient-to-r from-[#E85D2C] via-amber-400 to-[#C7940A] bg-clip-text text-transparent">BTP & l'Industrie</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choisissez votre univers ci-dessous pour accéder aux fiches techniques, tarifs, demandes de devis et interventions SAV.
          </p>
        </motion.div>

        {/* Two Large Portal Blocks / Activity Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: CALES & BÉTON */}
          <motion.div 
            variants={itemSlideUpVariants}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative rounded-3xl bg-gradient-to-b from-[#132A4A] to-[#0D223E] border-2 border-[#C9C2AE]/30 hover:border-[#E85D2C] p-8 sm:p-10 transition-colors duration-300 hover:shadow-2xl hover:shadow-[#E85D2C]/20 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Accent Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#E85D2C] to-orange-600 text-white font-black text-xs uppercase px-5 py-2 rounded-bl-2xl shadow-md tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Fabricant Marocain Exclusif</span>
            </div>

            <div>
              {/* Icon & Title */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#C9C2AE]/15 border border-[#C9C2AE]/40 flex items-center justify-center group-hover:bg-[#E85D2C] group-hover:border-[#E85D2C] transition-colors duration-300 shadow-inner">
                  <Boxes className="w-9 h-9 text-[#C9C2AE] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E85D2C]">Univers 01</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#C9C2AE] transition-colors">
                    Cales & Béton
                  </h2>
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="text-[#C9C2AE] font-semibold text-base mb-3">
                Cales d'armature en Béton Fibré Haute Performance (BFHP)
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Fabricant et distributeur agréé de la gamme complète de cales d'enrobage haute performance pour tous vos ouvrages en béton armé (bâtiment, génie civil, préfabrication).
              </p>

              {/* Feature Bullets */}
              <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C] shrink-0" />
                  <span>06 Références spécialisées (CPME, CCS, CMP, CUTS, CUTS-R, CMHBF)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C] shrink-0" />
                  <span>Conformité EN 12390, EN 206, NF A35-016 & Marquage CE</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C] shrink-0" />
                  <span>Résistance chimique extrême & Durée de vie 50+ ans</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E85D2C] shrink-0" />
                  <span>Stock permanent à Tanger & Usine de fabrication à Tétouan</span>
                </div>
              </div>
            </div>

            {/* Action Buttons with Motion */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectView('cales')}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#E85D2C] hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#E85D2C]/30 transition-colors"
              >
                <span>Explorer les Cales</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenDevis}
                className="w-full py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Demander un Devis</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Card 2: SOLUTIONS INDUSTRIELLES */}
          <motion.div 
            variants={itemSlideUpVariants}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative rounded-3xl bg-gradient-to-b from-[#132A4A] to-[#0D223E] border-2 border-[#2E3A3F]/80 hover:border-[#C7940A] p-8 sm:p-10 transition-colors duration-300 hover:shadow-2xl hover:shadow-[#C7940A]/20 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Accent Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#C7940A] to-amber-600 text-slate-950 font-black text-xs uppercase px-5 py-2 rounded-bl-2xl shadow-md tracking-wider flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>SAV & Astreinte 24/7</span>
            </div>

            <div>
              {/* Icon & Title */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#2E3A3F] border border-amber-500/30 flex items-center justify-center group-hover:bg-[#C7940A] transition-colors duration-300 shadow-inner">
                  <Wrench className="w-9 h-9 text-[#C7940A] group-hover:text-slate-950 transition-colors" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C7940A]">Univers 02</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    Solutions Industrielles
                  </h2>
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="text-amber-400 font-semibold text-base mb-3">
                Levage, Fermetures, Électricité, Sécurité Incendie & SAV
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Installations clefs en main, modernisation et maintenance curative/préventive pour les usines, entrepôts logistiques et bâtiments industriels au Maroc.
              </p>

              {/* Feature Bullets */}
              <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A] shrink-0" />
                  <span>Levage & Manutention : Ponts roulants, palans électriques, épreuves</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A] shrink-0" />
                  <span>Fermetures : Portes sectionnelles, rideaux métalliques, portes rapides</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A] shrink-0" />
                  <span>Électricité & Automatisme : Armoires TGBT, automates Schneider/Siemens</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C7940A] shrink-0" />
                  <span>Sécurité Incendie : Détection SDI, RIA, désenfumage & extincteurs</span>
                </div>
              </div>
            </div>

            {/* Action Buttons with Motion */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectView('industrielles')}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#C7940A] hover:bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#C7940A]/30 transition-colors"
              >
                <span>Découvrir les Services</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenIntervention}
                className="w-full py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Demande d'Intervention</span>
              </motion.button>
            </div>
          </motion.div>

        </div>

        {/* Quick Highlights Counter */}
        <motion.div 
          variants={itemSlideUpVariants}
          className="mt-12 lg:mt-16 bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-[#E85D2C]">100%</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Fabrication Marocaine (Tétouan)</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-[#C7940A]">24/7</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Intervention SAV & Astreinte</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-white">50+ ans</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Durée de vie garantie des cales</p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-[#C9C2AE]">Tanger</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Siège social & Stock Permanent</p>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* Footer Contact Snippet */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-slate-950/80 border-t border-white/10 py-6 px-4 text-center text-xs text-slate-400"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#E85D2C]" />
            <span>SOFIM SOLUTION MAROC SARLAU — Tanger, Tétouan & l'ensemble du Royaume</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+212660068610" className="hover:text-white flex items-center gap-1.5 font-bold text-amber-400">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+212 660-068-610</span>
            </a>
            <span>•</span>
            <a href="mailto:sofimsolution@gmail.com" className="hover:text-white">sofimsolution@gmail.com</a>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
