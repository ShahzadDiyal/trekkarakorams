import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProviders } from '@/lib/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Trek Karakoram | Discover the Spirit of the Mountains',
    template: '%s',
  },
  description:
    'Trek Karakoram invites you into the soul of Northern Pakistan. End-to-end guided expeditions to K2 Base Camp, Nanga Parbat, Rakaposhi, Baltoro Glacier, and Fairy Meadows with certified Balti mountaineers.',
  keywords: [
    'Trek Karakoram',
    'K2 Base Camp Trek',
    'Nanga Parbat',
    'Rakaposhi Base Camp',
    'Baltoro Glacier',
    'Concordia',
    'Fairy Meadows',
    'Biafo Hispar',
    'Pakistan Trekking',
    'Gilgit-Baltistan Adventure',
    'Skardu Treks',
  ],
  authors: [{ name: 'Trek Karakoram' }],
  openGraph: {
    title: 'Trek Karakoram - Discover the Spirit of the Mountains',
    description:
      "Your complete, worry-free gateway to the heart of the Karakoram. From airport pickup to the world's highest peaks, discover authentic Pakistan mountain journeys.",
    type: 'website',
    siteName: 'Trek Karakoram',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trek Karakoram - Discover the Spirit of the Mountains',
    description:
      'End-to-end guided expeditions to K2 Base Camp, Nanga Parbat, Rakaposhi, and Baltoro Glacier.',
  },
  other: {
    'geo.region': 'PK-GB',
    'geo.placename': 'Skardu, Gilgit-Baltistan, Pakistan',
    'geo.position': '35.3204;75.5528',
    ICBM: '35.3204, 75.5528',
  },
};

export const viewport: Viewport = {
  themeColor: '#0284c7',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Trek Karakoram',
  slogan: 'Discover the Spirit of the Mountains',
  image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
  description:
    'Full-service adventure travel partner specializing in end-to-end, soulful mountain expeditions across the Karakoram, Himalaya, and Hindukush ranges in Pakistan.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'College Road, Airport Link',
    addressLocality: 'Skardu',
    addressRegion: 'Gilgit-Baltistan',
    postalCode: '16100',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.3204,
    longitude: 75.5528,
  },
  telephone: '+92-300-9876543',
  priceRange: '$$$',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Gilgit-Baltistan, Pakistan' },
    { '@type': 'Place', name: 'Karakoram Mountain Range' },
    { '@type': 'Place', name: 'K2 Base Camp' },
    { '@type': 'Place', name: 'Nanga Parbat' },
    { '@type': 'Place', name: 'Rakaposhi' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data for Trek Karakoram */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-slate-950">
        <AppProviders>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
