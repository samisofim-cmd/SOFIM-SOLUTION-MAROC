import { IndustrialPillar } from '../types';

export const INDUSTRIAL_PILLARS: IndustrialPillar[] = [
  {
    id: 'levage',
    title: 'Levage & Manutention',
    subtitle: 'Ponts roulants, palans électriques, potences & épreuves réglementaires',
    iconName: 'Anchor',
    badge: 'Norme EN 13001',
    description: 'Conception, installation, modernisation et vérification périodique d\'équipements de levage industriels. SOFIM SOLUTION MAROC accompagne les usines et plates-formes logistiques pour assurer une manutention fluide et sécurisée.',
    keyServices: [
      'Étude & Pose de Ponts Roulants Monopoutre / Bipoutre',
      'Fourniture & Remplacement de Palans Électriques à Chaîne / Câble',
      'Installation de Potences Murales & Sur Fût',
      'Inspection Périodique & Épreuves Charge Légalement Exigées',
      'Remplacement d\'Élingues, Crochets & Câbles de Levage'
    ],
    equipmentHandled: ['Ponts roulants suspendus', 'Palans Verlinde/GH/STAHL', 'Potences pivotantes', 'Chariots de transfert', 'Systèmes de radiocommande'],
    benefits: ['Sécurité maximale des opérateurs', 'Conformité légale aux audits d\'inspection', 'Réduction des temps d\'arrêt de production']
  },
  {
    id: 'fermetures',
    title: 'Fermetures Industrielles',
    subtitle: 'Portes sectionnelles, rideaux métalliques, portes rapides & équipements de quai',
    iconName: 'DoorClosed',
    badge: 'Haute Isothermie & Isolation',
    description: 'Solutions d\'accès et de confinement pour entrepôts logistiques, usines agroalimentaires et sites industriels. Nous garantissons l\'isolation thermique, la sécurité anti-intrusion et la fluidité des flux de véhicules.',
    keyServices: [
      'Portes Sectionnelles Industrielles Isothermes',
      'Rideaux Métalliques Galvanisés & Lames Blindées',
      'Portes Rapides Souples à Enroulement Auto-Réparables',
      'Niveleurs de Quai Hydrauliques & Sas de Transbordement',
      'Motorisation, Automatismes & Barrières de Sécurité'
    ],
    equipmentHandled: ['Portes rapides PVC', 'Rideaux à lames pleines/micro-perforées', 'Niveleurs à lèvre basculante', 'Autobloqueurs de quai', 'Motorisations d\'urgence'],
    benefits: ['Économies d\'énergie & étanchéité', 'Sécurisation des quais de déchargement', 'Robustesse face au trafic intensif']
  },
  {
    id: 'electricite',
    title: 'Électricité Industrielle & Automatisme',
    subtitle: 'Armoires TGBT, automates programmables, câblage HT/BT & audit énergétique',
    iconName: 'Zap',
    badge: 'Certification Habilitation',
    description: 'Ingénierie électrique complète pour installations industrielles neuves ou en rénovation. Nos équipes réalisent la conception de TGBT, la programmation d\'automates et la mise en conformité des réseaux électriques.',
    keyServices: [
      'Conception & Câblage d\'Armoires TGBT & Coffrets de Commande',
      'Programmation d\'Automates (Schneider Electric, Siemens, ABB)',
      'Tirage de Câbles HT/BT & Chemins de Câbles Métalliques',
      'Installations de Variateurs de Vitesse & Démarreurs Progressifs',
      'Mise en Conformité Normative & Levée de Réserves'
    ],
    equipmentHandled: ['TGBT & Armoires d\'Automatisme', 'Afficheurs IHM & Supervision SCADA', 'Variateurs Altivar / Sinamics', 'Relais de protection électrique'],
    benefits: ['Continuité de service sans coupure', 'Optimisation de la consommation d\'énergie', 'Sécurité anti-court-circuit']
  },
  {
    id: 'incendie',
    title: 'Sécurité Incendie & Désenfumage',
    subtitle: 'Détection automatique, RIA, extincteurs & systèmes de désenfumage',
    iconName: 'Flame',
    badge: 'Norme NF S 61-936',
    description: 'Protection intégrale des établissements industriels (ERP/ERT) contre les risques d\'incendie. De la détection précoce à l\'extinction automatique, nous assurons la sécurité de vos personnels et de vos locaux.',
    keyServices: [
      'Systèmes de Détection Incendie (SDI Adressable & Conventionnel)',
      'Installation & Contrôle de Robinets d\'Incendie Armés (RIA)',
      'Réseaux d\'Extincteurs Portatifs & Sur Roues (Poudre, CO2, Eau)',
      'Désenfumage Pneumatique / Électrique (Exutoires de Toiture)',
      'Maintenance Réglementaire & Registre de Sécurité'
    ],
    equipmentHandled: ['Détecteurs optiques / thermiques', 'Centrales de détection incendie', 'Exutoires de fumée (Skydome)', 'Extincteurs homologués', 'Nourrices RIA'],
    benefits: ['Conformité aux exigences des assurances', 'Protection 24/7 des infrastructures', 'Évacuation rapide et sécurisée']
  },
  {
    id: 'sav',
    title: 'SAV & Maintenance 24/7',
    subtitle: 'Astreinte d\'urgence, maintenance préventive & pièces détachées d\'origine',
    iconName: 'Wrench',
    badge: 'Intervention Rapide Tanger & Maroc',
    description: 'Service après-vente dédié et contrats de maintenance sur mesure pour l\'ensemble de vos équipements industriels. Notre équipe de techniciens itinérants intervient 7j/7 avec un véhicule atelier outillé.',
    keyServices: [
      'Astreinte Téléphonique & Dépannage d\'Urgence 24/7',
      'Contrats de Maintenance Préventive Semestriels / Annuels',
      'Fourniture de Pièces de Rechange d\'Origine toutes marques',
      'Reconstitution de Schémas Électriques & Diagnostic',
      'Rapports d\'Intervention Détaillés pour Audit'
    ],
    equipmentHandled: ['Flotte de véhicules ateliers', 'Pièces de rechange en stock à Tanger', 'Bancs de test portatifs', 'Analyseurs de réseaux'],
    benefits: ['Réduction significative des pannes', 'Gestion prioritaire des urgences', 'Pérennité des investissements']
  }
];

export const INDUSTRIAL_STATS = [
  { label: 'Temps moyen de réponse SAV', value: '< 2 Heures' },
  { label: 'Missions d\'intervention réalisées', value: '500+' },
  { label: 'Techniciens spécialisés', value: 'Équipes Dédiées' },
  { label: 'Zone d\'intervention', value: 'Tanger, Tétouan & Tout le Maroc' }
];
