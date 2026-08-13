import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, FileText, Wrench } from 'lucide-react';

interface DiagnosticQuizProps {
  onOpenIntervention: () => void;
  onOpenDevis: () => void;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "Secteur d'Activité & Zone d'Implantation",
    subtitle: "Sélectionnez l'environnement dans lequel évoluent vos installations industrielles.",
    options: [
      {
        label: "Zone Franche / Portuaire (TFZ, TAC, Tanger Med, Nador West)",
        description: "Contraintes salines élevées, usage intensif 24/7.",
        scoreWeight: 3,
        recommendedService: "Maintenance Préventive Rapprochée & Protection Anticorrosion Marine"
      },
      {
        label: "Usine / Site Industriel Standard (Rabat, Casablanca, Kenitra)",
        description: "Fabrication automobile, textile, agroalimentaire, métallurgie.",
        scoreWeight: 2,
        recommendedService: "Contrat de Maintenance Trimestriel avec Registre de Sécurité"
      },
      {
        label: "Chantier BTP & Génie Civil en Cours",
        description: "Structures de coffrage, besoin en cales béton BFHP & levage temporaire.",
        scoreWeight: 1,
        recommendedService: "Fourniture Cales BFHP certifiées & Essai de charge provisoire"
      }
    ]
  },
  {
    id: 2,
    title: "Ancienneté & Équipements de Levage / Fermetures",
    subtitle: "Quel est l'état général et la date du dernier contrôle réglementaire de vos ponts et portes ?",
    options: [
      {
        label: "Matériel sous tension sans contrôle réglementaire depuis +12 mois",
        description: "Risque de non-conformité légale & arrêt immédiat par l'inspection.",
        scoreWeight: 5,
        urgencyLevel: 'critique',
        recommendedService: "Audit de Conformité d'Urgence & Épreuve de Charge 125%"
      },
      {
        label: "Équipements récents avec pannes intermittentes ou bruits anormaux",
        description: "Garnitures de frein usées, galets désalignés, télécommande défaillante.",
        scoreWeight: 3,
        urgencyLevel: 'urgente',
        recommendedService: "Intervention SAV Corrective & Remplacement Pièces d'Origine"
      },
      {
        label: "Installation neuve ou projet de modernisation de hall",
        description: "Besoin de dimensionnement, fourniture et pose d'appareils neufs.",
        scoreWeight: 1,
        recommendedService: "Étude d'Ingénierie & Devis de Fourniture/Pose d'Équipements"
      }
    ]
  },
  {
    id: 3,
    title: "Priorité Opérationnelle Immédiate",
    subtitle: "Quel objectif souhaitez-vous atteindre avec l'intervention SOFIM SOLUTION MAROC ?",
    options: [
      {
        label: "Dépannage URGENT d'une ligne ou porte bloquée (Arrêt de Production)",
        description: "Intervention technique immédiate sous 24h sur site.",
        scoreWeight: 5,
        urgencyLevel: 'critique',
        recommendedService: "Astreinte Techniciens SAV 24/7"
      },
      {
        label: "Mise aux Normes CE & Visite Préventive Contractuelle",
        description: "Anticiper les pannes et garantir la sécurité des opérateurs.",
        scoreWeight: 2,
        recommendedService: "Souscription au Contrat Sérénité SOFIM"
      },
      {
        label: "Approvisionnement en Cales en Béton Fibre BFHP pour Béton Armé",
        description: "Besoin d'enrobage précis sur chantier (CPME, CMP, CCS, CMHBF).",
        scoreWeight: 1,
        recommendedService: "Commande Express Cales Béton avec Livraison Chantier"
      }
    ]
  }
];

export const DiagnosticQuiz: React.FC<DiagnosticQuizProps> = ({
  onOpenIntervention,
  onOpenDevis
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...answers, optionIndex];
    setAnswers(updatedAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  // Compute total risk score
  const calculateResult = () => {
    let totalScore = 0;
    let criticalFlag = false;

    answers.forEach((ansIdx, qIdx) => {
      const q = QUIZ_QUESTIONS[qIdx];
      if (q && q.options[ansIdx]) {
        totalScore += q.options[ansIdx].scoreWeight;
        if (q.options[ansIdx].urgencyLevel === 'critique') {
          criticalFlag = true;
        }
      }
    });

    return { totalScore, criticalFlag };
  };

  const { totalScore, criticalFlag } = calculateResult();

  return (
    <div className="bg-[#0A1E38] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C7940A] bg-[#C7940A]/10 px-3 py-1 border border-[#C7940A]/30 inline-block">
            QUIZ DE DIAGNOSTIC & ORIENTATION SÉCURITÉ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Évaluez la Conformité & Vos Besoins Industriels
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Répondez à 3 questions rapides pour obtenir un diagnostic instantané de vos risques opérationnels et la recommandation d'ingénierie SOFIM.
          </p>
        </div>

        {/* PROGRESS BAR */}
        {!quizCompleted && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>Étape {currentStep + 1} / {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complété</span>
            </div>
            <div className="w-full bg-[#071629] h-2 border border-white/10">
              <div
                className="bg-[#E85D2C] h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* QUESTION CARD */}
        {!quizCompleted ? (
          <div className="bg-[#071629] p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E85D2C] block">
                QUESTION {QUIZ_QUESTIONS[currentStep].id}
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                {QUIZ_QUESTIONS[currentStep].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {QUIZ_QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left p-4 bg-[#0A1E38] hover:bg-[#0d2645] border border-white/10 hover:border-[#E85D2C] transition-all group flex items-start justify-between space-x-4"
                >
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-white group-hover:text-[#E85D2C] block">
                      {opt.label}
                    </span>
                    <span className="text-xs text-slate-400 block">{opt.description}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#E85D2C] shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* RESULT DIAGNOSTIC CARD */
          <div className="bg-[#071629] p-6 sm:p-8 border-2 border-[#E85D2C] space-y-6 shadow-2xl text-center animate-in zoom-in-95 duration-300">
            
            <div className="w-16 h-16 mx-auto bg-[#E85D2C]/20 border border-[#E85D2C] flex items-center justify-center text-[#E85D2C]">
              {criticalFlag ? <ShieldAlert className="w-10 h-10 text-rose-500 animate-pulse" /> : <CheckCircle2 className="w-10 h-10 text-emerald-400" />}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C7940A]">
                DIAGNOSTIC COMPLET & NIVEAU DE RISQUE
              </span>
              <h3 className="text-2xl font-black text-white">
                {criticalFlag ? 'Attention : Risque Élevé d’Arrêt / Non-Conformité' : 'Installation Nécessitant Suivi Réglementaire'}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                Basé sur vos réponses, vos installations requièrent un contrôle technique immédiat pour prévenir les pannes lourdes et garantir la sécurité du personnel.
              </p>
            </div>

            <div className="bg-[#0A1E38] p-4 border border-white/10 text-left space-y-2 max-w-lg mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                RECOMMANDATION D'INGÉNIERIE SOFIM :
              </span>
              <p className="text-xs font-bold text-[#E85D2C]">
                ✓ Intervention prioritaire par technicien certifié SOFIM MAROC
              </p>
              <p className="text-xs text-slate-300">
                ✓ Contrôle visuel, vérification des organes de sécurité, rapport de visite & devis gratuit.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenIntervention}
                className="w-full sm:w-auto py-3.5 px-6 bg-[#C7940A] text-slate-950 font-bold uppercase text-xs tracking-widest hover:bg-amber-400 transition-colors flex items-center justify-center space-x-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Demander Intervention Technicien</span>
              </button>

              <button
                onClick={onOpenDevis}
                className="w-full sm:w-auto py-3.5 px-6 bg-[#E85D2C] text-white font-bold uppercase text-xs tracking-widest hover:bg-[#c94d22] transition-colors flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Demander Devis Général</span>
              </button>

              <button
                onClick={handleReset}
                className="py-3 px-4 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Recommencer</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
