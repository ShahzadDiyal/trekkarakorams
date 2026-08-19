import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mountain, MapPin, Compass, ArrowRight, Sun, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { TREK_PACKAGES } from '../data/treks';
import { Currency } from '../types';

interface DestinationsPageProps {
  currency: Currency;
}

interface DestinationRegion {
  id: string;
  name: string;
  mountainRange: string;
  tagline: string;
  image: string;
  overview: string;
  keyPeaks: string[];
  bestMonths: string;
  hubCity: string;
  accessAirport: string;
  highlights: string[];
  matchedTrekIds: string[];
}

const DESTINATION_REGIONS: DestinationRegion[] = [
  {
    id: 'karakoram',
    name: 'Central Karakoram & Baltoro',
    mountainRange: 'Karakoram Mountain Range',
    tagline: 'Home of K2, Concordia & the World’s Greatest Glacier Highway',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    overview: 'The Central Karakoram in Baltistan is the dense epicenter of global mountaineering. Within a 20km radius of Concordia amphitheatre sit four of the planet’s fourteen 8,000-meter peaks (K2 8,611m, Gasherbrum I 8,080m, Broad Peak 8,051m, Gasherbrum II 8,035m) surrounded by towering granite spires like Trango Towers and Cathedral Peak.',
    keyPeaks: ['K2 (8,611m)', 'Broad Peak (8,051m)', 'Gasherbrum I-IV', 'Trango Towers (6,286m)', 'Muztagh Tower'],
    bestMonths: 'Mid-June to late August (Summer Glacier Season)',
    hubCity: 'Skardu, Gilgit-Baltistan',
    accessAirport: 'Skardu International Airport (Direct flights from Islamabad)',
    highlights: [
      'Concordia (The Throne Room of the Mountain Gods)',
      '62km long Baltoro Glacier trekking route',
      'Gondogoro La glaciated pass (5,585m)',
      'Historic base camps of legendary mountaineers'
    ],
    matchedTrekIds: ['k2-basecamp-gondogoro-la', 'k2-basecamp-classic', 'k2-basecamp-heli-trek']
  },
  {
    id: 'hunza-nagar',
    name: 'Hunza & Nagar Valleys',
    mountainRange: 'Central & Western Karakoram',
    tagline: 'Ancient Silk Road Kingdoms, Hanging Glaciers & Vibrant Orchards',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    overview: 'Flanked by the legendary Karakoram Highway (KKH), Hunza and Nagar are celebrated for dramatic verticality. Rakaposhi (7,788m) rises 6,000 uninterrupted meters from the river valley, while Passu Cones pierce the skyline above apricot and walnut orchards.',
    keyPeaks: ['Rakaposhi (7,788m)', 'Diran Peak (7,266m)', 'Passu Sar (7,478m)', 'Ultar Sar (7,388m)', 'Ladyfinger Peak'],
    bestMonths: 'April to October (Spring Blossoms, Summer Treks, Autumn Gold)',
    hubCity: 'Karimabad / Aliabad',
    accessAirport: 'Gilgit Airport (45 min flight from Islamabad) or KKH drive',
    highlights: [
      'Rakaposhi & Diran Base Camp at Tagafari',
      'Rush Lake (World’s highest alpine lake at 4,694m)',
      'Historic 900-year-old Baltit and Altit Forts',
      'Passu Glacier and Hussaini Suspension Bridge'
    ],
    matchedTrekIds: ['rakaposhi-diran-base-camp', 'rush-lake-and-peak']
  },
  {
    id: 'himalayas-nanga-parbat',
    name: 'Western Himalayas & Nanga Parbat',
    mountainRange: 'Western Himalayan Range',
    tagline: 'Fairy Meadows & The Colossal 8,126m Killer Mountain',
    image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=80',
    overview: 'Nanga Parbat anchors the western terminus of the 2,400km Himalayan chain in Pakistan. With the world’s greatest single vertical rock and ice face (the 4,500m Rupal Face), this mountain provides unparalleled majesty viewed from the lush pine alpine pastures of Fairy Meadows and Beyal Camp.',
    keyPeaks: ['Nanga Parbat (8,126m)', 'Raikot Peak (7,070m)', 'Chongra Peak (6,830m)', 'Mazeno Ridge'],
    bestMonths: 'May to October',
    hubCity: 'Chilas / Raikot Bridge',
    accessAirport: 'Gilgit Airport or Islamabad to Chilas scenic overland highway',
    highlights: [
      'Fairy Meadows log cabins facing the Raikot Glacier',
      'Beyal Camp & Nanga Parbat Base Camp walk',
      '4WD mountain jeep track through Raikot Gorge',
      'View of the Indus River collision with the Himalayas'
    ],
    matchedTrekIds: ['fairy-meadows-nanga-parbat']
  },
  {
    id: 'deosai',
    name: 'Deosai High Plains & Astore',
    mountainRange: 'Himalayan-Karakoram Plateau',
    tagline: 'The Land of Giants — Second Highest Alpine Plateau on Earth',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    overview: 'Averaging 4,114 meters above sea level, Deosai National Park is a breathtaking expanse of rolling wildflowers, crystal-clear glacial streams, and high-altitude lakes. It is the protected wilderness sanctuary of the endangered Himalayan Brown Bear and snow leopards.',
    keyPeaks: ['Nanga Parbat (visible from Sheosar)', 'Burzil Pass (4,100m)', 'Shatung Pass'],
    bestMonths: 'July to September (Wildflower Bloom)',
    hubCity: 'Skardu / Astore Valley',
    accessAirport: 'Skardu Airport (1.5h jeep ascent to Deosai gate)',
    highlights: [
      'Sheosar Lake mirroring high snowcapped peaks',
      'Himalayan Brown Bear habitat safari',
      'Expedition camping under dark starlit skies',
      'Traverse linking Baltistan to Astore Valley'
    ],
    matchedTrekIds: ['deosai-plains-burzil']
  },
  {
    id: 'shimshal',
    name: 'Shimshal Valley & High Pamir',
    mountainRange: 'Northern Karakoram & Pamir Transition',
    tagline: 'Remote Wakhi Mountaineering Villages & 6,000m Trekking Peaks',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    overview: 'Shimshal is the highest settlement in Hunza, inhabited by tough Wakhi mountaineers who have produced many of Pakistan’s legendary K2 summiters. It offers pristine, crowd-free trekking to Shimshal Pass (4,735m) and non-technical alpine ascents of Minglik Sar (6,050m).',
    keyPeaks: ['Minglik Sar (6,050m)', 'Disteghil Sar (7,885m)', 'Kunjut Sar (7,760m)', 'Shimshal Whitehorn'],
    bestMonths: 'June to September',
    hubCity: 'Shimshal / Passu',
    accessAirport: 'Gilgit Airport + KKH + Shimshal Gorge 4WD road',
    highlights: [
      'Non-technical 6,000m summit experience',
      'High Pamir summer pastures with yaks and glacial rivers',
      'Deep cultural immersion with authentic Wakhi mountain folk',
      'Untouched trekking circuits far off standard tourist trails'
    ],
    matchedTrekIds: ['shimshal-minglik-sar']
  }
];

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ currency }) => {
  const navigate = useNavigate();
  const [selectedRegionId, setSelectedRegionId] = useState<string>(DESTINATION_REGIONS[0].id);

  const activeRegion = DESTINATION_REGIONS.find((r) => r.id === selectedRegionId) || DESTINATION_REGIONS[0];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Northern Pakistan Trekking Destinations</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Geographic Explorer & Guide
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Pakistan Mountain Destinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Northern Pakistan is the collision point of three of the world’s greatest mountain ranges: the Karakoram, the Himalayas, and the Hindukush. Explore each region below.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {DESTINATION_REGIONS.map((region) => {
            const isSelected = region.id === selectedRegionId;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`p-3 text-left transition-all cursor-pointer ${isSelected
                    ? 'bg-sky-600 text-white border-sky-600 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400 font-semibold'
                  }`}
              >
                <div className="text-[10px] uppercase opacity-75">{region.mountainRange.split(' ')[0]}</div>
                <div className="text-xs sm:text-sm font-bold truncate mt-0.5">{region.name.split('&')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Region Spotlight */}
        <div className="bg-white  overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Photo (5 cols) */}
            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-auto relative overflow-hidden bg-slate-900">
              <img
                src={activeRegion.image}
                alt={activeRegion.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold bg-sky-500 text-slate-950 px-2 py-0.5">
                  {activeRegion.mountainRange}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeRegion.name}
                </h2>
              </div>
            </div>

            {/* Region Details (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Region Profile
                </span>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  {activeRegion.overview}
                </p>
              </div>

              {/* Facts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="p-3 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-0.5">Primary Hub:</span>
                  <span>{activeRegion.hubCity}</span>
                </div>
                <div className="p-3 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-0.5">Best Season:</span>
                  <span>{activeRegion.bestMonths}</span>
                </div>
                <div className="p-3 bg-slate-50 sm:col-span-2">
                  <span className="font-bold text-slate-900 block mb-0.5">Access Airport / Route:</span>
                  <span>{activeRegion.accessAirport}</span>
                </div>
              </div>

              {/* Highlights & Peaks */}
              <div className="space-y-3 pt-2">
                <div>
                  <span className="font-bold text-xs text-slate-900 uppercase tracking-wider block mb-1.5">
                    Notable Peaks & Spires:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeRegion.keyPeaks.map((peak, i) => (
                      <span key={i} className="text-xs font-semibold bg-sky-50 text-sky-800 px-2.5 py-1 ">
                        {peak}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-xs text-slate-900 uppercase tracking-wider block mb-1.5">
                    Top Geographical Highlights:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {activeRegion.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Matched Expeditions Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Ready to trek in <strong>{activeRegion.name}</strong>?
                </div>
                <button
                  onClick={() => navigate(`/treks?region=${encodeURIComponent(activeRegion.name)}`)}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs px-4 py-2.5 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Browse {activeRegion.name.split(' ')[0]} Treks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Regions Quick Summary Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
            Overview of Northern Pakistan Mountain Sectors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESTINATION_REGIONS.map((r) => (
              <div
                key={r.id}
                className="bg-white  p-5 flex flex-col justify-between hover:border-sky-500 transition-colors"
              >
                <div>
                  <div className="h-40 overflow-hidden mb-3 bg-slate-100">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{r.mountainRange}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{r.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{r.overview}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedRegionId(r.id);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="w-full bg-slate-50 hover:bg-sky-500 hover:text-white text-sky-700 font-bold text-xs py-2 px-3  hover:border-sky-500 transition-colors"
                  >
                    View Destination Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
