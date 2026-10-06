/**
 * Built-in destination regions (fallback when Firestore is unreachable).
 * The admin panel manages these live in the `destinations` collection.
 */

export interface DestinationRegion {
  id: string;
  /** Public URL slug (defaults to id). */
  slug?: string;
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


export const DESTINATION_REGIONS: DestinationRegion[] = [
  {
    id: 'karakoram',
    name: 'Central Karakoram & Baltoro',
    mountainRange: 'Karakoram Mountain Range',
    tagline:
      'Home of K2, Concordia & the World’s Greatest Glacier Highway',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    overview:
      'The Central Karakoram in Baltistan is the dense epicenter of global mountaineering. Within a 20km radius of Concordia amphitheatre sit four of the planet’s fourteen 8,000-meter peaks (K2 8,611m, Gasherbrum I 8,080m, Broad Peak 8,051m, Gasherbrum II 8,035m) surrounded by towering granite spires like Trango Towers and Cathedral Peak.',
    keyPeaks: [
      'K2 (8,611m)',
      'Broad Peak (8,051m)',
      'Gasherbrum I-IV',
      'Trango Towers (6,286m)',
      'Muztagh Tower',
    ],
    bestMonths: 'Mid-June to late August (Summer Glacier Season)',
    hubCity: 'Skardu, Gilgit-Baltistan',
    accessAirport:
      'Skardu International Airport (Direct flights from Islamabad)',
    highlights: [
      'Concordia (The Throne Room of the Mountain Gods)',
      '62km long Baltoro Glacier trekking route',
      'Gondogoro La glaciated pass (5,585m)',
      'Historic base camps of legendary mountaineers',
    ],
    matchedTrekIds: [
      'k2-basecamp-gondogoro-la',
      'k2-basecamp-classic',
      'k2-basecamp-heli-trek',
    ],
  },
  {
    id: 'hunza-nagar',
    name: 'Hunza & Nagar Valleys',
    mountainRange: 'Central & Western Karakoram',
    tagline:
      'Ancient Silk Road Kingdoms, Hanging Glaciers & Vibrant Orchards',
    image:
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Flanked by the legendary Karakoram Highway (KKH), Hunza and Nagar are celebrated for dramatic verticality. Rakaposhi (7,788m) rises 6,000 uninterrupted meters from the river valley, while Passu Cones pierce the skyline above apricot and walnut orchards.',
    keyPeaks: [
      'Rakaposhi (7,788m)',
      'Diran Peak (7,266m)',
      'Passu Sar (7,478m)',
      'Ultar Sar (7,388m)',
      'Ladyfinger Peak',
    ],
    bestMonths:
      'April to October (Spring Blossoms, Summer Treks, Autumn Gold)',
    hubCity: 'Karimabad / Aliabad',
    accessAirport:
      'Gilgit Airport (45 min flight from Islamabad) or KKH drive',
    highlights: [
      'Rakaposhi & Diran Base Camp at Tagafari',
      'Rush Lake (World’s highest alpine lake at 4,694m)',
      'Historic 900-year-old Baltit and Altit Forts',
      'Passu Glacier and Hussaini Suspension Bridge',
    ],
    matchedTrekIds: ['rakaposhi-diran-base-camp', 'rush-lake-and-peak'],
  },
  {
    id: 'himalayas-nanga-parbat',
    name: 'Western Himalayas & Nanga Parbat',
    mountainRange: 'Western Himalayan Range',
    tagline:
      'Fairy Meadows & The Colossal 8,126m Killer Mountain',
    image:
      'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Nanga Parbat anchors the western terminus of the 2,400km Himalayan chain in Pakistan. With the world’s greatest single vertical rock and ice face (the 4,500m Rupal Face), this mountain provides unparalleled majesty viewed from the lush pine alpine pastures of Fairy Meadows and Beyal Camp.',
    keyPeaks: [
      'Nanga Parbat (8,126m)',
      'Raikot Peak (7,070m)',
      'Chongra Peak (6,830m)',
      'Mazeno Ridge',
    ],
    bestMonths: 'May to October',
    hubCity: 'Chilas / Raikot Bridge',
    accessAirport:
      'Gilgit Airport or Islamabad to Chilas scenic overland highway',
    highlights: [
      'Fairy Meadows log cabins facing the Raikot Glacier',
      'Beyal Camp & Nanga Parbat Base Camp walk',
      '4WD mountain jeep track through Raikot Gorge',
      'View of the Indus River collision with the Himalayas',
    ],
    matchedTrekIds: ['fairy-meadows-nanga-parbat'],
  },
  {
    id: 'deosai',
    name: 'Deosai High Plains & Astore',
    mountainRange: 'Himalayan-Karakoram Plateau',
    tagline:
      'The Land of Giants Second Highest Alpine Plateau on Earth',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Averaging 4,114 meters above sea level, Deosai National Park is a breathtaking expanse of rolling wildflowers, crystal-clear glacial streams, and high-altitude lakes. It is the protected wilderness sanctuary of the endangered Himalayan Brown Bear and snow leopards.',
    keyPeaks: [
      'Nanga Parbat (visible from Sheosar)',
      'Burzil Pass (4,100m)',
      'Shatung Pass',
    ],
    bestMonths: 'July to September (Wildflower Bloom)',
    hubCity: 'Skardu / Astore Valley',
    accessAirport:
      'Skardu Airport (1.5h jeep ascent to Deosai gate)',
    highlights: [
      'Sheosar Lake mirroring high snowcapped peaks',
      'Himalayan Brown Bear habitat safari',
      'Expedition camping under dark starlit skies',
      'Traverse linking Baltistan to Astore Valley',
    ],
    matchedTrekIds: ['deosai-plains-burzil'],
  },
  {
    id: 'shimshal',
    name: 'Shimshal Valley & High Pamir',
    mountainRange: 'Northern Karakoram & Pamir Transition',
    tagline:
      'Remote Wakhi Mountaineering Villages & 6,000m Trekking Peaks',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Shimshal is the highest settlement in Hunza, inhabited by tough Wakhi mountaineers who have produced many of Pakistan’s legendary K2 summiters. It offers pristine, crowd-free trekking to Shimshal Pass (4,735m) and non-technical alpine ascents of Minglik Sar (6,050m).',
    keyPeaks: [
      'Minglik Sar (6,050m)',
      'Disteghil Sar (7,885m)',
      'Kunjut Sar (7,760m)',
      'Shimshal Whitehorn',
    ],
    bestMonths: 'June to September',
    hubCity: 'Shimshal / Passu',
    accessAirport:
      'Gilgit Airport + KKH + Shimshal Gorge 4WD road',
    highlights: [
      'Non-technical 6,000m summit experience',
      'High Pamir summer pastures with yaks and glacial rivers',
      'Deep cultural immersion with authentic Wakhi mountain folk',
      'Untouched trekking circuits far off standard tourist trails',
    ],
    matchedTrekIds: ['shimshal-minglik-sar'],
  },
];
