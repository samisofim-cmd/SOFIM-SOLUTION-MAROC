import React, { useState, useEffect } from 'react';
import { SAVTicket } from '../types';
import { Clock, CheckCircle2, ShieldCheck, FileText, Calendar, Bell, Wrench, Search, Download, AlertCircle, ArrowUpRight, User, MapPin } from 'lucide-react';

interface ClientPortalProps {
  onOpenIntervention: () => void;
}

const MOCK_TICKETS: SAVTicket[] = [
  {
    id: '1',
    ticketNumber: 'TK-2026-881',
    equipmentName: 'Pont Roulant Bipoutre 10T Verlinde',
    category: 'Levage',
    siteCity: 'TFZ Tanger Free Zone',
    requestDate: '11/08/2026 08:30',
    status: 'technicien_en_route',
    urgency: 'critique',
    technicianName: 'Karim EL AMRANI (Ingénieur Senior SOFIM)',
    estimatedResolutionTime: 'Aujourd\'hui à 14h00',
    reportSummary: 'Intervention sur bloc de frein de translation. Équipe en transit avec pièces certifiées.'
  },
  {
    id: '2',
    ticketNumber: 'TK-2026-754',
    equipmentName: 'Porte Sectionnelle Isotherme Hörmann',
    category: 'Fermetures',
    siteCity: 'Zone Industrielle Tétouan Park',
    requestDate: '09/08/2026 14:15',
    status: 'cloture',
    urgency: 'normale',
    technicianName: 'Youssef BENNANI',
    reportSummary: 'Remplacement cellule photoélectrique et ré-équilibrage ressort de torsion. Rapport transmis.',
    certificatePdfName: 'PV_Conformite_Porte_Hörmann_2026.pdf'
  },
  {
    id: '3',
    ticketNumber: 'TK-2026-620',
    equipmentName: 'TGBT Principal & Coffret Inverter',
    category: 'Électricité',
    siteCity: 'Kénitra Automotive City',
    requestDate: '02/08/2026 10:00',
    status: 'cloture',
    urgency: 'normale',
    technicianName: 'Hassan CHAOUKI',
    reportSummary: 'Contrôle thermographique infrarouge sous charge. Aucun point chaud détecté.',
    certificatePdfName: 'Attestation_Thermographie_TGBT_2026.pdf'
  }
];

export const ClientPortal: React.FC<ClientPortalProps> = ({ onOpenIntervention }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'audit' | 'certificats'>('tickets');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveAlert, setLiveAlert] = useState<string | null>(
    '🔔 WebSocket : Mise à jour Ticket #TK-2026-881 - Technicien Karim est arrivé sur le site TFZ Tanger.'
  );

  // Appointment Audit Form State
  const [auditDate, setAuditDate] = useState('');
  const [auditSite, setAuditSite] = useState('');
  const [auditCompany, setAuditCompany] = useState('');
  const [auditSuccess, setAuditSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLiveAlert('⚡ Notification SAV : Rapport d\'intervention #TK-2026-754 archivé avec succès.');
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuditSuccess(true);
  };

  const filteredTickets = MOCK_TICKETS.filter(
    (t) =>
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.siteCity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0A1E38] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C7940A] bg-[#C7940A]/10 px-3 py-1 border border-[#C7940A]/30 inline-block">
              ESPACE CLIENT & PORTAIL SAV 24/7
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Suivi des Interventions & Conformité
            </h1>
            <p className="text-slate-300 text-xs mt-1">
              Gérez le parc matériel, suivez vos demandes de maintenance et téléchargez vos PV réglementaires.
            </p>
          </div>

          <button
            onClick={onOpenIntervention}
            className="py-3 px-5 bg-[#C7940A] text-slate-950 hover:bg-amber-400 font-bold uppercase text-xs tracking-widest flex items-center space-x-2 transition-colors shrink-0 shadow-lg"
          >
            <Wrench className="w-4 h-4" />
            <span>Nouveau Ticket SAV Urgent</span>
          </button>
        </div>

        {/* LIVE SIMULATED WEBSOCKET NOTIFICATION BAR */}
        {liveAlert && (
          <div className="bg-[#071629] border border-[#E85D2C] p-3 text-xs flex items-center justify-between text-slate-200 animate-pulse">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[#E85D2C] shrink-0" />
              <span>{liveAlert}</span>
            </div>
            <button
              onClick={() => setLiveAlert(null)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* PORTAL NAVIGATION TABS */}
        <div className="flex border-b border-white/10 space-x-4">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'tickets'
                ? 'border-[#E85D2C] text-[#E85D2C]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📋 Tickets Interventions SAV ({MOCK_TICKETS.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'audit'
                ? 'border-[#E85D2C] text-[#E85D2C]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📅 Prise de RDV / Audit Site
          </button>

          <button
            onClick={() => setActiveTab('certificats')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'certificats'
                ? 'border-[#E85D2C] text-[#E85D2C]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📂 Certificats & Rapports CE
          </button>
        </div>

        {/* TAB 1: SAV TICKETS LIST & TIMELINE */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Rechercher par n° ticket, équipement, ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#071629] border border-white/15 pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
              />
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-[#071629] p-6 border border-white/10 space-y-4 hover:border-white/30 transition-all">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-[#E85D2C] bg-[#E85D2C]/10 border border-[#E85D2C]/30 px-2.5 py-1">
                        {ticket.ticketNumber}
                      </span>
                      <h3 className="text-base font-extrabold text-white">{ticket.equipmentName}</h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border ${
                        ticket.status === 'technicien_en_route'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {ticket.status === 'technicien_en_route' ? '⚡ Technicien en Route' : '✓ Clôturé & Validé'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#E85D2C] shrink-0" />
                      <span>{ticket.siteCity}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-[#C7940A] shrink-0" />
                      <span>Technicien : {ticket.technicianName || 'Attribué'}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Demandé le : {ticket.requestDate}</span>
                    </div>
                  </div>

                  <div className="bg-[#0A1E38] p-3 border border-white/10 text-xs text-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Rapport d'Intervention :</span>
                    <p>{ticket.reportSummary}</p>
                  </div>

                  {ticket.certificatePdfName && (
                    <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-xs text-emerald-300">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-mono text-white">{ticket.certificatePdfName}</span>
                      </div>
                      <button className="text-xs font-bold underline hover:text-white flex items-center space-x-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>Télécharger PDF</span>
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: AUDIT APPOINTMENT BOOKING */}
        {activeTab === 'audit' && (
          <div className="bg-[#071629] p-6 sm:p-8 border border-white/10 max-w-2xl mx-auto space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E85D2C]">
                RÉSERVATION D'AUDIT SUR SITE
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                Planifier une Visite de Diagnostic Technique
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Un ingénieur SOFIM SOLUTION MAROC se déplace dans votre usine pour l'inspection de vos ponts roulants, portes ou TGBT.
              </p>
            </div>

            {!auditSuccess ? (
              <form onSubmit={handleAuditSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Entreprise / Site Industriel *
                  </label>
                  <input
                    type="text"
                    required
                    value={auditCompany}
                    onChange={(e) => setAuditCompany(e.target.value)}
                    placeholder="ex: Renault Tanger Med, Lear Corporation..."
                    className="w-full bg-[#0A1E38] border border-white/15 p-3 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Ville du Site *
                    </label>
                    <input
                      type="text"
                      required
                      value={auditSite}
                      onChange={(e) => setAuditSite(e.target.value)}
                      placeholder="Tanger, Tétouan, Kenitra..."
                      className="w-full bg-[#0A1E38] border border-white/15 p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Date Souhaitée *
                    </label>
                    <input
                      type="date"
                      required
                      value={auditDate}
                      onChange={(e) => setAuditDate(e.target.value)}
                      className="w-full bg-[#0A1E38] border border-white/15 p-3 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-extrabold uppercase text-xs tracking-widest transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirmer la Demande de RDV Audit</span>
                </button>
              </form>
            ) : (
              <div className="bg-emerald-950/60 border border-emerald-500/50 p-6 text-center space-y-3 text-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Demande d'Audit Enregistrée</h3>
                <p className="text-xs">
                  Merci <span className="font-bold text-white">{auditCompany}</span>. Notre pôle planification vous contactera pour confirmer l'heure du passage à <span className="font-bold text-white">{auditSite}</span> le {auditDate}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CERTIFICATES & COMPLIANCE DOWNLOAD CENTER */}
        {activeTab === 'certificats' && (
          <div className="bg-[#071629] p-6 border border-white/10 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7940A] block">
              REGISTRE DE SÉCURITÉ & ATTESTATIONS CE
            </span>
            <h2 className="text-xl font-extrabold text-white">Documents de Conformité & Rapports Organes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { name: 'Attestation Épreuve de Charge Pont Roulant (125%)', ref: 'PV-SOFIM-2026-LEV', date: 'Juillet 2026' },
                { name: 'Certificat Contrôle Sécurité Portes Sectionnelles', ref: 'PV-SOFIM-2026-FERM', date: 'Juin 2026' },
                { name: 'Rapport Thermographie Infrarouge Armoire TGBT', ref: 'PV-SOFIM-2026-ELEC', date: 'Mai 2026' },
                { name: 'Attestation de Conformité Cales Béton BFHP', ref: 'CERT-SOFIM-CALES-BFHP', date: 'Janvier 2026' }
              ].map((doc, idx) => (
                <div key={idx} className="bg-[#0A1E38] p-4 border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">{doc.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Réf: {doc.ref} • {doc.date}</p>
                  </div>
                  <button className="p-2 bg-[#E85D2C] hover:bg-[#c94d22] text-white transition-colors" title="Télécharger Document">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
