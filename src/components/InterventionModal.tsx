import React, { useState } from 'react';
import { X, Send, CheckCircle2, Wrench, AlertTriangle, Building, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface InterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const InterventionModal: React.FC<InterventionModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'sav'
}) => {
  const [category, setCategory] = useState(initialCategory || 'sav');
  const [urgency, setUrgency] = useState<'normale' | 'urgente' | 'critique'>('urgente');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Tanger Zone Franche');
  const [equipmentDetails, setEquipmentDetails] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicketNum, setCreatedTicketNum] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/interventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          company,
          phone,
          email,
          city,
          urgency,
          category,
          equipmentDetails,
          description
        })
      });
      const data = await response.json();
      if (data.ticket && data.ticket.ticketNumber) {
        setCreatedTicketNum(data.ticket.ticketNumber);
      }
    } catch (err) {
      console.error('Error creating intervention ticket:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0d2645] border border-[#C7940A] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-white shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#071629] hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-[#C7940A] flex items-center justify-center text-slate-950">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7940A]">Solutions Industrielles</span>
                <h3 className="text-xl font-extrabold text-white">Demande d'Intervention / SAV</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              Astreinte technique et dépannage sur vos sites industriels à Tanger, Tétouan et tout le Maroc.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Urgency Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Niveau d'Urgence *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('normale')}
                    className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                      urgency === 'normale'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-[#071629] text-slate-400 border-white/10 hover:bg-slate-800'
                    }`}
                  >
                    Programmée
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('urgente')}
                    className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                      urgency === 'urgente'
                        ? 'bg-[#C7940A] text-slate-950 border-[#C7940A]'
                        : 'bg-[#071629] text-slate-400 border-white/10 hover:bg-slate-800'
                    }`}
                  >
                    Urgente 24h
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('critique')}
                    className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                      urgency === 'critique'
                        ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                        : 'bg-[#071629] text-slate-400 border-white/10 hover:bg-slate-800'
                    }`}
                  >
                    Immédiat
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Domaine / Équipement *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7940A]"
                  >
                    <option value="levage">Levage & Ponts Roulants</option>
                    <option value="fermetures">Fermetures Industrielles & Quai</option>
                    <option value="electricite">Électricité & TGBT & Automates</option>
                    <option value="incendie">Sécurité Incendie & RIA</option>
                    <option value="sav">Astreinte & Maintenance Générale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Équipement concerné / Marque
                  </label>
                  <input
                    type="text"
                    value={equipmentDetails}
                    onChange={(e) => setEquipmentDetails(e.target.value)}
                    placeholder="ex: Pont Verlinde 5T, Porte Hörmann..."
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7940A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Nom & Prénom du Responsable *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Responsable maintenance / usine"
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7940A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Société / Site Industriel *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ex: Renault Tanger, APM Terminals..."
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7940A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Téléphone Direct / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7940A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Localisation / Zone *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="TFZ, Tanger Automotive City, Tétouan..."
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7940A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maintenance@societe.ma"
                  className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7940A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Symptôme de la panne / Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez le dysfonctionnement constaté..."
                  className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C7940A]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-5 bg-[#C7940A] text-slate-950 hover:bg-amber-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmettre la Demande d'Intervention</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#C7940A]/20 text-[#C7940A] mx-auto flex items-center justify-center border border-[#C7940A]/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-white">Demande d'Intervention Enregistrée !</h3>
            {createdTicketNum && (
              <div className="inline-block bg-[#C7940A]/20 border border-[#C7940A] px-3 py-1 font-mono text-xs font-bold text-[#C7940A]">
                TICKET N° : {createdTicketNum}
              </div>
            )}
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              L'équipe technique <span className="text-[#C7940A] font-bold">SOFIM SOLUTION MAROC</span> prend en charge votre alerte [Niveau {urgency.toUpperCase()}] pour le site de <span className="font-bold text-white">{city}</span>. Un technicien vous appelle directement sur le <span className="font-bold text-white">{phone}</span>.
            </p>

            <div className="bg-[#071629] p-4 border border-white/10 text-left text-xs space-y-1.5 max-w-md mx-auto text-slate-300">
              <p><span className="text-slate-400 uppercase tracking-wider text-[10px]">Responsable:</span> {fullName} ({company})</p>
              <p><span className="text-slate-400 uppercase tracking-wider text-[10px]">Domaine:</span> {category.toUpperCase()}</p>
              <p><span className="text-slate-400 uppercase tracking-wider text-[10px]">Détail Panne:</span> {description}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-[#C7940A] text-slate-950 font-bold text-xs uppercase tracking-widest"
              >
                Fermer & Revenir au site
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
