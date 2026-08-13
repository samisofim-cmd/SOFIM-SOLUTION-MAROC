import React from 'react';

export const SeoSchema: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'IndustrialBusiness',
    name: 'SOFIM SOLUTION MAROC SARLAU',
    description:
      'Fabricant et distributeur agréé de cales en béton fibre (BFHP) & Spécialiste des équipements et maintenances industrielles à Tanger et sur tout le Maroc.',
    url: 'https://www.sofim-maroc.ma',
    telephone: '+212660068610',
    email: 'sofimsolution@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tanger',
      addressRegion: 'Tanger-Tétouan-Al Hoceïma',
      addressCountry: 'MA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '35.7595',
      longitude: '-5.8340'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Produits et Services Industriels SOFIM',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Cales en Béton Fibre Haute Performance (BFHP)',
            description: 'Cales en béton armé fibre haute résistance pour enrobages de précision sur chantiers BTP.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maintenance & SAV Ponts Roulants 24/7',
            description: 'Inspection, mise aux normes CE, maintenance préventive et dépannage de ponts roulants à Tanger.'
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
