import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HubPage } from './components/HubPage';
import { CalesUniverse } from './components/CalesUniverse';
import { IndustrialUniverse } from './components/IndustrialUniverse';
import { ConfiguratorPage } from './components/ConfiguratorPage';
import { InteractiveSchemaViewer } from './components/InteractiveSchemaViewer';
import { DiagnosticQuiz } from './components/DiagnosticQuiz';
import { ClientPortal } from './components/ClientPortal';
import { CatalogPage } from './components/CatalogPage';
import { AboutContactPage } from './components/AboutContactPage';
import { Footer } from './components/Footer';
import { DevisModal } from './components/DevisModal';
import { InterventionModal } from './components/InterventionModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { SeoSchema } from './components/SeoSchema';

function AppContent() {
  const [activeView, setActiveView] = useState<ViewMode>('hub');
  
  // Devis Modal State
  const [devisModalOpen, setDevisModalOpen] = useState<boolean>(false);
  const [devisProductRef, setDevisProductRef] = useState<string>('CPME30-35-40');

  // Intervention Modal State
  const [interventionModalOpen, setInterventionModalOpen] = useState<boolean>(false);
  const [interventionCategory, setInterventionCategory] = useState<string>('sav');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const handleOpenDevisWithRef = (ref: string) => {
    setDevisProductRef(ref);
    setDevisModalOpen(true);
  };

  const handleOpenInterventionWithCat = (cat: string) => {
    setInterventionCategory(cat);
    setInterventionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A1E38] font-sans text-slate-100 flex flex-col justify-between selection:bg-[#E85D2C] selection:text-white transition-colors duration-300">
      
      {/* Schema.org JSON-LD for Search Engines */}
      <SeoSchema />

      {/* Navigation Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenDevisModal={() => setDevisModalOpen(true)}
        onOpenInterventionModal={() => setInterventionModalOpen(true)}
      />

      {/* Main View Router with Framer Motion Page Transitions */}
      <main className="flex-grow overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            {activeView === 'hub' && (
              <HubPage
                onSelectView={setActiveView}
                onOpenDevis={() => setDevisModalOpen(true)}
                onOpenIntervention={() => setInterventionModalOpen(true)}
              />
            )}

            {activeView === 'cales' && (
              <CalesUniverse
                onOpenDevisWithProduct={handleOpenDevisWithRef}
              />
            )}

            {activeView === 'industrielles' && (
              <IndustrialUniverse
                onOpenInterventionWithCategory={handleOpenInterventionWithCat}
              />
            )}

            {activeView === 'catalog' && (
              <CatalogPage
                onOpenDevisWithRef={handleOpenDevisWithRef}
                onOpenIntervention={() => setInterventionModalOpen(true)}
              />
            )}

            {activeView === 'configurator' && (
              <ConfiguratorPage
                onOpenDevisWithData={() => setDevisModalOpen(true)}
              />
            )}

            {activeView === 'schema3d' && (
              <InteractiveSchemaViewer
                onOpenDevis={() => setDevisModalOpen(true)}
                onOpenIntervention={() => setInterventionModalOpen(true)}
              />
            )}

            {activeView === 'diagnostic' && (
              <DiagnosticQuiz
                onOpenDevis={() => setDevisModalOpen(true)}
                onOpenIntervention={() => setInterventionModalOpen(true)}
              />
            )}

            {activeView === 'portal' && (
              <ClientPortal
                onOpenIntervention={() => setInterventionModalOpen(true)}
              />
            )}

            {(activeView === 'about' || activeView === 'contact') && (
              <AboutContactPage
                onOpenDevis={() => setDevisModalOpen(true)}
                onOpenIntervention={() => setInterventionModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        setActiveView={setActiveView}
        onOpenDevis={() => setDevisModalOpen(true)}
        onOpenIntervention={() => setInterventionModalOpen(true)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton activeView={activeView} />

      {/* Quote Request Modal (Cales & Béton) */}
      <DevisModal
        isOpen={devisModalOpen}
        onClose={() => setDevisModalOpen(false)}
        initialProductRef={devisProductRef}
      />

      {/* Intervention Request Modal (Solutions Industrielles) */}
      <InterventionModal
        isOpen={interventionModalOpen}
        onClose={() => setInterventionModalOpen(false)}
        initialCategory={interventionCategory}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

