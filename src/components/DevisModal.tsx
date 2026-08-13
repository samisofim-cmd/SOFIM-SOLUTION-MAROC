import React, { useState } from 'react';
import { CALES_PRODUCTS } from '../data/calesData';
import { X, Send, CheckCircle2, Boxes, Building, Phone, Mail, MapPin } from 'lucide-react';

interface DevisModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductRef?: string;
}

export const DevisModal: React.FC<DevisModalProps> = ({ isOpen, onClose, initialProductRef = '' }) => {
  const [productRef, setProductRef] = useState(initialProductRef || 'CPME30-35-40');
  const [quantity, setQuantity] = useState('1000 pièces');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Tanger');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdRef, setCreatedRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          company,
          phone,
          email,
          city,
          productReference: productRef,
          quantity,
          message
        })
      });
      const data = await response.json();
      if (data.quote && data.quote.reference) {
        setCreatedRef(data.quote.reference);
      }
    } catch (err) {
      console.error('Error submitting devis:', err);
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
      <div className="bg-[#0d2645] border border-[#E85D2C] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-white shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#071629] hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-[#E85D2C] flex items-center justify-center">
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E85D2C]">Cales & Béton BFHP</span>
                <h3 className="text-xl font-extrabold text-white">Demande de Devis Gratuit</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              Obtenez nos tarifs direct usine et disponibilités sous 24h pour vos chantiers BTP au Maroc.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Référence de Cale *
                  </label>
                  <select
                    value={productRef}
                    onChange={(e) => setProductRef(e.target.value)}
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E85D2C]"
                  >
                    <option value="Toutes les références (Gamme complète)">Toutes les références (Gamme complète)</option>
                    {CALES_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.reference}>
                        {p.reference} ({p.title})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Quantité estimée *
                  </label>
                  <input
                    type="text"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="ex: 2 000 pièces / 5 palettes"
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Entreprise / Bureau d'étude *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ex: TGCC, SGTM, NGE Maroc..."
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Ville du Chantier *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Tanger, Tétouan, Casablanca..."
                    className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@entreprise.ma"
                  className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Précisions sur le chantier / Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Épaisseur d'enrobage requise, délai souhaité..."
                  className="w-full bg-[#071629] border border-white/15 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E85D2C]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-5 bg-[#E85D2C] hover:bg-[#c94d22] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer la Demande de Devis</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#E85D2C]/20 text-[#E85D2C] mx-auto flex items-center justify-center border border-[#E85D2C]/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-white">Demande Transmise !</h3>
            {createdRef && (
              <div className="inline-block bg-[#E85D2C]/20 border border-[#E85D2C] px-3 py-1 font-mono text-xs font-bold text-[#E85D2C]">
                RÉFÉRENCE : {createdRef}
              </div>
            )}
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Merci <span className="font-bold text-white">{fullName}</span>. Notre service commercial <span className="text-[#E85D2C] font-bold">SOFIM SOLUTION MAROC</span> à Tanger examine votre demande pour <span className="font-bold text-white">{productRef}</span> ({quantity}) et vous répondra sous 24h.
            </p>

            <div className="bg-[#071629] p-4 border border-white/10 text-left text-xs space-y-1.5 max-w-md mx-auto text-slate-300">
              <p><span className="text-slate-400 uppercase tracking-wider text-[10px]">Entreprise:</span> {company}</p>
              <p><span className="text-slate-400 uppercase tracking-wider text-[10px]">Ville Chantier:</span> {city}</p>
              <p><span className="text-slate-400 uppercase tracking-wider text-[10px]">Téléphone:</span> {phone}</p>
              <p><span className="text-slate-400 uppercase tracking-wider text-[10px]">Email:</span> {email}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-[#E85D2C] text-white font-bold text-xs uppercase tracking-widest"
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
