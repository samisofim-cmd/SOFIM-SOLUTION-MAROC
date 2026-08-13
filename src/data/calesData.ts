import { CaleProduct } from '../types';

export const CALES_PRODUCTS: CaleProduct[] = [
  {
    id: 'cpme30-35-40',
    reference: 'CPME30-35-40',
    title: 'Cale Ponctuelle Multi-Enrobage',
    subtitle: 'Trois enrobages en une seule cale : la référence pour les ouvrages exposés',
    enrobages: '35 / 40 / 50 mm',
    positions: '3 positions',
    weight: '120 g',
    resistance: '5000 N',
    concreteClass: 'C45/55 ≥ 55 MPa',
    exposureClass: 'XC1 – XS2',
    applications: ['Poteaux', 'Pieux', 'Voiles', 'Structures fortement exposées'],
    description: 'La cale ponctuelle multi-enrobage permet de choisir, sur une même pièce, entre trois positionnements d\'armature (35, 40 ou 50 mm). Son corps en béton fibre haute résistance garantit un maintien stable de l\'armature durant le coulage, sans écrasement ni glissement.',
    implementation: 'Positionner la cale contre le coffrage, côté enrobage souhaité vers l\'extérieur. Enfiler l\'armature dans l\'encoche centrale. Respecter un maillage régulier (environ 1 cale/m² à 1 cale/0.5m² selon densité du ferraillage).',
    norms: 'EN 12390 / EN 206 / NF A35-016 / CE / EN 10080',
    badge: 'Référence Incontournable',
    packaging: 'Sac de 100 pièces / Palette de 5 000 pièces',
    svgType: 'CPME'
  },
  {
    id: 'ccs25-30',
    reference: 'CCS25-30',
    title: 'Cale Compacte Standard',
    subtitle: 'Le format compact et économique pour les enrobages standards du bâtiment',
    enrobages: '25 / 30 mm',
    positions: '2 positions',
    weight: '40 g',
    resistance: '4000 N',
    concreteClass: 'C40/50 ≥ 50 MPa',
    exposureClass: 'XC1 – XC4',
    applications: ['Dalles', 'Planchers résidentiels', 'Ouvrages courants'],
    description: 'Conçue pour les chantiers de dalles et planchers résidentiels, la cale compacte standard offre un excellent rapport performance / prix. Sa forme en croix assure une portance homogène sur les deux faces d\'appui, quel que soit le sens de pose.',
    implementation: 'Clipser la cale sous le lit d\'armature avant coulage. Vérifier l\'appui sur les deux ailes pour éviter tout basculement lors du coulage du béton.',
    norms: 'EN 12390 / EN 206 / NF A35-016 / CE',
    badge: 'Économique & Compacte',
    packaging: 'Sac de 250 pièces / Palette de 10 000 pièces',
    svgType: 'CCS'
  },
  {
    id: 'cmp20-3025',
    reference: 'CMP20-3025',
    title: 'Cale Mini Précision',
    subtitle: 'La plus légère de la gamme, pour les enrobages fins de la préfabrication',
    enrobages: '20 / 25 mm',
    positions: '2 positions',
    weight: '4 g',
    resistance: '> 800 kg',
    concreteClass: 'C50/60 ≥ 60 MPa',
    exposureClass: 'XC1 – XC3',
    applications: ['Préfabrication', 'Éléments architectoniques fins', 'Plaques minces'],
    description: 'Destinée aux éléments préfabriqués et architectoniques à faible épaisseur, la cale mini précision conjugue une résistance mécanique élevée (béton C50/60) et un poids minimal, pour ne pas alourdir les pièces fines.',
    implementation: 'Positionner en usine avant coulage, en respectant un maillage serré (jusqu\'à 4 cales/m²) adapté aux pièces minces et aux moules de précision.',
    norms: 'EN 12390 / EN 206 / NF A35-016 / CE',
    badge: 'Spécial Préfabrication',
    packaging: 'Sac de 500 pièces',
    svgType: 'CMP'
  },
  {
    id: 'cuts50',
    reference: 'CUTS50',
    title: 'Cale en U Treillis Standard',
    subtitle: 'La cale en U de référence pour la pose des treillis soudés',
    enrobages: '25 – 35 mm',
    positions: 'Variable (Support U)',
    weight: '60 g',
    resistance: '≥ 8 MPa',
    concreteClass: 'C40/50',
    exposureClass: 'XC1 – XC4',
    applications: ['Dallages résidentiels', 'Planchers', 'Prédalles'],
    description: 'Sa forme en U perforée (perforations Ø6 mm) reçoit directement le fil de treillis soudé, assurant un positionnement rapide et stable sur les dallages et prédalles courants.',
    implementation: 'Enclencher le treillis dans l\'encoche en U avant coulage. Espacement recommandé : 60 à 80 cm selon l\'épaisseur de la dalle.',
    norms: 'EN 12390 / EN 206 / NF A35-016 / CE',
    badge: 'Pose Rapide Treillis',
    packaging: 'Sac de 150 pièces / Sacs en vrac sur palette',
    svgType: 'CUTS'
  },
  {
    id: 'cuts50-r',
    reference: 'CUTS50-R',
    title: 'Cale en U Treillis Renforcée',
    subtitle: 'Surface d\'appui XXL (6000 mm²) pour les charges lourdes',
    enrobages: '25 – 35 mm',
    positions: 'Variable (Empreinte XXL)',
    weight: '180 g',
    resistance: '≥ 10 MPa',
    concreteClass: 'C50/60 ≥ 60 MPa',
    exposureClass: 'XC1 – XS1',
    applications: ['Dallages industriels', 'Parkings lourds', 'Entrepôts', 'Quais de chargement'],
    description: 'Version renforcée de la cale en U, avec une base élargie offrant 6000 mm² de surface d\'appui. Elle répartit les charges sur les dallages soumis à un trafic industriel ou à des charges roulantes lourdes.',
    implementation: 'Poser au sol avant le treillis, base élargie vers le bas. Adaptée aux dallages à forte sollicitation (entrepôts, parkings, quais de chargement).',
    norms: 'EN 12390 / EN 206 / NF A35-016 / CE',
    badge: 'Haute Portance XXL',
    packaging: 'Sac de 80 pièces / Palette industrielle',
    svgType: 'CUTSR'
  },
  {
    id: 'cmhbf',
    reference: 'CMHBF',
    title: 'Cale Multi-Hauteurs 4 Positions',
    subtitle: 'Une seule référence, quatre enrobages : le couteau suisse du chantier',
    enrobages: '35 / 40 / 45 / 50 mm',
    positions: '4 positions',
    weight: '28 g',
    resistance: '5000 N',
    concreteClass: 'C50/60 ≥ 60 MPa',
    exposureClass: 'XC1 – XS2',
    applications: ['Polyvalente — tous chantiers', 'Optimisation du stock', 'Gros œuvre BTP'],
    description: 'Avec ses quatre enrobages disponibles sur une seule pièce, la cale multi-hauteurs simplifie radicalement la gestion de stock sur chantier : une référence unique couvre la quasi-totalité des besoins courants, du résidentiel à l\'ouvrage exposé.',
    implementation: 'Choisir la face correspondant à l\'enrobage requis par les plans d\'exécution. Fixer l\'armature dans l\'encoche centrale. Maillage : 3 à 4 cales/m² selon le plan de ferraillage.',
    norms: 'EN 12390 / EN 206 / NF A35-016 / CE',
    badge: '4-en-1 Universelle',
    packaging: 'Sac de 200 pièces / Carton de 1000 pièces',
    svgType: 'CMHBF'
  }
];

export const CALES_COMPARISON = [
  {
    criterion: 'Matériau / Homogénéité avec l\'ouvrage',
    bfhp: '100% Béton Fibré - Adhésion parfaite sans point de rupture',
    pvc: 'Plastique - Mauvaise adhésion, risque de micro-fissure',
    mortier: 'Mortier pauvre - Faible résistance, friable'
  },
  {
    criterion: 'Résistance au feu & Températures',
    bfhp: 'Incombustible (A1) - Pas de fumée toxique, jusqu\'à +600°C',
    pvc: 'Fonte à 120°C, dégagement de fumées chlorées',
    mortier: 'Éclatement thermique rapide'
  },
  {
    criterion: 'Résistance Chimique & Environnemental',
    bfhp: 'Insensible aux sels, sulfates & milieux marins (XC à XS)',
    pvc: 'Dégradation UV et fragilisation au gel',
    mortier: 'Porosité élevée, pénétration de chlorures'
  },
  {
    criterion: 'Résistance Mécanique à la Pression',
    bfhp: 'Jusqu\'à 5000 N / 10 MPa (Pas d\'écrasement)',
    pvc: 'Déformation sous charges lourdes d\'armature',
    mortier: 'Cassant sous les pas des ouvriers'
  },
  {
    criterion: 'Durée de Vie Garantie',
    bfhp: '50+ ans (Garantie de durabilité de la structure)',
    pvc: '10 à 15 ans max',
    mortier: 'Instable dans le temps'
  }
];

export const CERTIFICATIONS_LIST = [
  'Cure contrôlée 28 jours (T° 20°C ± 2, HR 95%)',
  'Certification EN 12390 — Essais sur béton durci',
  'Certification EN 206 — Spécification et conformité du béton',
  'Norme NF A35-016 — Armatures pour béton armé',
  'Marquage CE EN 10080 — Aciers pour l\'armature du béton',
  'Matières : Ciment Portland CEM I 52,5 + Fibres synthétiques / métalliques HR',
  'Stockage : -20°C à +60°C, durée illimitée si conditions respectées',
  'Fabrication 100% Maroc — Site de Tétouan & Logistique Tanger'
];
