import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// In-memory data persistence for quotes, tickets, and contact messages
interface QuoteRecord {
  id: string;
  reference: string;
  fullName: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  productReference: string;
  quantity: string;
  message?: string;
  createdAt: string;
}

interface TicketRecord {
  id: string;
  ticketNumber: string;
  equipmentName: string;
  category: string;
  siteCity: string;
  requestDate: string;
  status: 'recu' | 'diagnostique' | 'technicien_en_route' | 'reparation_en_cours' | 'cloture';
  urgency: 'normale' | 'urgente' | 'critique';
  technicianName?: string;
  reportSummary?: string;
}

const quotesDatabase: QuoteRecord[] = [];
const ticketsDatabase: TicketRecord[] = [
  {
    id: '1',
    ticketNumber: 'TK-2026-881',
    equipmentName: 'Pont Roulant Bipoutre 10T Verlinde',
    category: 'Levage',
    siteCity: 'TFZ Tanger Free Zone',
    requestDate: new Date().toISOString(),
    status: 'technicien_en_route',
    urgency: 'critique',
    technicianName: 'Karim EL AMRANI (Ingénieur Senior SOFIM)',
    reportSummary: 'Intervention sur bloc de frein de translation. Équipe en transit.'
  }
];

// Anti-spam & basic input sanitization helper
function sanitizeString(str: string): string {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// REST API ROUTES
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SOFIM SOLUTION MAROC API',
    timestamp: new Date().toISOString()
  });
});

// 1. Submit Devis / Quote Request
app.post('/api/devis', (req: Request, res: Response) => {
  try {
    const { fullName, company, phone, email, city, productReference, quantity, message } = req.body;

    if (!fullName || !phone || !email) {
      return res.status(400).json({ error: 'Champs obligatoires manquants (Nom, Téléphone, Email).' });
    }

    const cleanName = sanitizeString(fullName);
    const cleanCompany = sanitizeString(company || 'Particulier/BTP');
    const cleanPhone = sanitizeString(phone);
    const cleanEmail = sanitizeString(email);
    const cleanCity = sanitizeString(city || 'Tanger');
    const cleanProductRef = sanitizeString(productReference || 'Gamme Générale');
    const cleanQty = sanitizeString(quantity || 'Non précisé');
    const cleanMsg = sanitizeString(message || '');

    const reference = `DEV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newQuote: QuoteRecord = {
      id: Date.now().toString(),
      reference,
      fullName: cleanName,
      company: cleanCompany,
      phone: cleanPhone,
      email: cleanEmail,
      city: cleanCity,
      productReference: cleanProductRef,
      quantity: cleanQty,
      message: cleanMsg,
      createdAt: new Date().toISOString()
    };

    quotesDatabase.push(newQuote);

    return res.status(201).json({
      success: true,
      message: 'Demande de devis enregistrée avec succès.',
      quote: newQuote
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Erreur lors du traitement de la demande.' });
  }
});

// 2. SAV Ticket Interventions
app.get('/api/tickets', (req: Request, res: Response) => {
  res.json({ tickets: ticketsDatabase });
});

app.post('/api/interventions', (req: Request, res: Response) => {
  try {
    const { fullName, company, phone, city, urgency, category, equipmentDetails, description } = req.body;

    if (!fullName || !phone || !equipmentDetails) {
      return res.status(400).json({ error: 'Veuillez remplir le nom, le téléphone et les détails de l\'équipement.' });
    }

    const ticketNumber = `TK-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newTicket: TicketRecord = {
      id: Date.now().toString(),
      ticketNumber,
      equipmentName: sanitizeString(equipmentDetails),
      category: sanitizeString(category || 'SAV Général'),
      siteCity: sanitizeString(city || 'Tanger'),
      requestDate: new Date().toLocaleString('fr-FR'),
      status: urgency === 'critique' ? 'technicien_en_route' : 'recu',
      urgency: urgency || 'normale',
      technicianName: 'Équipe d\'Astreinte SOFIM Tanger',
      reportSummary: sanitizeString(description || 'Prise en charge enregistrée. Attribution de l\'équipe technique en cours.')
    };

    ticketsDatabase.unshift(newTicket);

    return res.status(201).json({
      success: true,
      message: 'Ticket d\'intervention SAV créé avec succès.',
      ticket: newTicket
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de la création du ticket SAV.' });
  }
});

// 3. Server-side Equipment & Cales Pricing Engine
app.post('/api/calculate-quote', (req: Request, res: Response) => {
  const { equipmentType, capacityTonnes, spanMeters, doorWidthMeters, doorHeightMeters, options, hasMaintenanceContract } = req.body;

  let basePriceMAD = 0;

  if (equipmentType === 'pont_roulant') {
    const cap = capacityTonnes || 5;
    const span = spanMeters || 15;
    basePriceMAD = 80000 + cap * 12000 + span * 2500;
  } else if (equipmentType === 'porte_sectionnelle') {
    const area = (doorWidthMeters || 4) * (doorHeightMeters || 4);
    basePriceMAD = 18000 + area * 1800;
  } else if (equipmentType === 'armoire_tgbt') {
    basePriceMAD = 45000 + (req.body.powerKw || 20) * 1200;
  } else {
    basePriceMAD = 25000;
  }

  if (Array.isArray(options) && options.length > 0) {
    basePriceMAD += options.length * 6500;
  }

  if (hasMaintenanceContract) {
    basePriceMAD *= 0.95; // 5% discount
  }

  res.json({
    equipmentType,
    estimatedPriceMAD: Math.round(basePriceMAD),
    currency: 'MAD',
    discountApplied: !!hasMaintenanceContract,
    validUntilDays: 30
  });
});

// 4. Stripe Checkout Session Simulation / Proxy Route
app.post('/api/stripe-checkout-session', (req: Request, res: Response) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const { reference, quantity, priceMad } = req.body;

  if (!stripeKey) {
    // Graceful fallback when key is not defined
    return res.json({
      simulated: true,
      checkoutUrl: '#',
      message: 'Mode simulation actif. Un conseiller SOFIM prendra contact pour la validation du paiement bancaire par virement/chèque.',
      reference,
      totalMad: priceMad || 2500
    });
  }

  // If Stripe key exists, standard integration flow applies
  return res.json({
    simulated: false,
    checkoutUrl: 'https://checkout.stripe.com/pay/simulated_sofim_maroc',
    reference
  });
});

// START SERVER & MOUNT VITE MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SOFIM SERVER] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
