export type ViewMode = 'hub' | 'cales' | 'industrielles' | 'catalog' | 'configurator' | 'schema3d' | 'diagnostic' | 'portal' | 'about' | 'contact';
export type ThemeMode = 'dark' | 'light';

export interface CaleProduct {
  id: string;
  reference: string;
  title: string;
  subtitle: string;
  enrobages: string;
  positions: string;
  weight: string;
  resistance: string;
  concreteClass: string;
  exposureClass: string;
  applications: string[];
  description: string;
  implementation: string;
  norms: string;
  badge?: string;
  packaging?: string;
  svgType: 'CPME' | 'CCS' | 'CMP' | 'CUTS' | 'CUTSR' | 'CMHBF';
}

export interface IndustrialPillar {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  description: string;
  keyServices: string[];
  equipmentHandled: string[];
  benefits: string[];
}

export interface DevisFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  productReference: string;
  quantity: string;
  projectType: string;
  message: string;
}

export interface InterventionFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  urgency: 'normale' | 'urgente' | 'critique';
  category: 'levage' | 'fermetures' | 'electricite' | 'incendie' | 'sav';
  equipmentDetails: string;
  description: string;
}

// 3D Hotspot & Schema Node Interface
export interface SchemaNode {
  id: string;
  name: string;
  codeRef: string;
  description: string;
  maintenanceFrequency: string;
  safetyChecklist: string[];
  sparePartRef: string;
  position3D: [number, number, number];
}

// Equipment Configurator Interface
export interface ConfiguratorState {
  equipmentType: 'pont_roulant' | 'porte_sectionnelle' | 'armoire_tgbt' | 'securite_incendie';
  capacityTonnes?: number;
  spanMeters?: number;
  doorWidthMeters?: number;
  doorHeightMeters?: number;
  cycleFrequency?: 'standard' | 'intensive' | 'extreme';
  powerKw?: number;
  hasAutomation?: boolean;
  hasMaintenanceContract?: boolean;
  options: string[];
}

// Diagnostic Quiz Question
export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    scoreWeight: number;
    urgencyLevel?: 'normale' | 'urgente' | 'critique';
    recommendedService: string;
  }[];
}

// Client Ticket System
export interface SAVTicket {
  id: string;
  ticketNumber: string;
  equipmentName: string;
  category: string;
  siteCity: string;
  requestDate: string;
  status: 'recu' | 'diagnostique' | 'technicien_en_route' | 'reparation_en_cours' | 'cloture';
  urgency: 'normale' | 'urgente' | 'critique';
  technicianName?: string;
  estimatedResolutionTime?: string;
  reportSummary?: string;
  certificatePdfName?: string;
}

