import { TrekPackage, TrekStyle, Testimonial, FAQItem } from '../types';

export const TREK_PACKAGES: TrekPackage[] = [
  {
    id: 'k2-basecamp-gondogoro-la',
    title: 'K2 Base Camp & Gondogoro La Pass Trek',
    shortTitle: 'K2 Base Camp & Gondogoro La',
    tagline: 'Stand in the Throne Room of the Mountain Gods & cross 5,585m high pass',
    region: 'Karakoram',
    startingCity: 'Islamabad / Skardu',
    durationDays: 19,
    durationNights: 18,
    difficulty: 'Extreme',
    maxAltitude: 5585,
    priceUSD: 2450,
    discountPriceUSD: 2250,
    rating: 5.0,
    reviewsCount: 148,
    featured: true,
    popular: true,
    bestSeason: 'Late June to Early September',
    groupSize: '4 to 12 Trekkers',
    activityType: 'Pass Crossing',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'The ultimate high-altitude mountain journey on Earth. Traverse the mighty 63km Baltoro Glacier through Paiju, Urdukas, and Goro II to arrive at Concordia—the legendary "Throne Room of the Mountain Gods"—surrounded by four 8,000m giants: K2 (8,611m), Broad Peak (8,051m), Gasherbrum I (8,080m), and Gasherbrum II (8,035m). Cap the expedition with a technical fixed-rope ascent over the glaciated Gondogoro La (5,585m) down into the lush green Hushe Valley.',
    highlights: [
      '360° panoramic amphitheater of four 8,000m peaks at Concordia',
      'Direct foot trek to K2 Base Camp (5,150m) and Art Gilkey Memorial',
      'Spectacular crossing of glaciated Gondogoro La Pass (5,585m)',
      'Views of Trango Towers, Cathedral Peak, Masherbrum (7,821m) & Laila Peak',
      'Certified high-altitude Balti guides, safety ropes, and full camp kitchen'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', desc: 'Meet our expedition team at Islamabad International Airport. Transfer to 4-star hotel. Briefing at Ministry of Tourism & Alpine Club.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Scenic Flight to Skardu', desc: 'Spectacular mountain flight past Nanga Parbat to Skardu. (Contingency: Overland drive via Karakoram Highway in case of flight cancellation).', altitude: '2,228m', stay: 'Skardu Resort', trekHours: '0 hrs' },
      { day: 3, title: 'Acclimatization & Skardu Bazar', desc: 'Visit historic Kharpocho Fort, organic village, and check high-altitude mountaineering permits with tour leader.', altitude: '2,228m', stay: 'Skardu Resort', trekHours: '2 hrs' },
      { day: 4, title: '4x4 Jeep Drive to Askole', desc: 'Thrilling off-road drive through Shigar Valley, traversing rugged gorges along the Braldu River to Askole—the last inhabited village.', altitude: '3,000m', stay: 'Camp Askole', trekHours: '0 hrs (Jeep 6-7 hrs)' },
      { day: 5, title: 'Askole to Jhola Camp', desc: 'First day of trekking. Walk along the Braldu river bank, crossing the suspension bridge at the confluence of the Dumordo river.', altitude: '3,100m', stay: 'Tent Jhola', trekHours: '6-7 hrs', distanceKm: 18 },
      { day: 6, title: 'Jhola to Paiju Camp', desc: 'Trek through sand tracks and willow trees to Paiju camp beneath the sheer granite spires of Paiju Peak (6,610m).', altitude: '3,450m', stay: 'Tent Paiju', trekHours: '6-7 hrs', distanceKm: 19 },
      { day: 7, title: 'Rest & Acclimatization Day at Paiju', desc: 'Crucial acclimatization day. Porters bake traditional bread and perform Balti songs and dances.', altitude: '3,450m', stay: 'Tent Paiju', trekHours: '0 hrs' },
      { day: 8, title: 'Paiju to Khoburtse (Baltoro Snout)', desc: 'Step onto the snout of the legendary 63km long Baltoro Glacier. Views of Trango Towers and Cathedral Spire unfold.', altitude: '3,800m', stay: 'Tent Khoburtse', trekHours: '5-6 hrs', distanceKm: 14 },
      { day: 9, title: 'Khoburtse to Urdukas', desc: 'Trek along lateral moraine to grassy cliffs of Urdukas with jaw-dropping views across the glacier to Great Trango.', altitude: '4,050m', stay: 'Tent Urdukas', trekHours: '4-5 hrs', distanceKm: 8 },
      { day: 10, title: 'Urdukas to Goro II', desc: 'Trek in the center of Baltoro Glacier surrounded by Masherbrum (7,821m), Muztagh Tower, and Biarchedi.', altitude: '4,300m', stay: 'Tent Goro II (on glacier)', trekHours: '6-7 hrs', distanceKm: 12 },
      { day: 11, title: 'Goro II to Concordia', desc: 'Arrive at Concordia—the pinnacle junction of Baltoro & Godwin-Austen glaciers. Front-row vistas of K2 and Broad Peak.', altitude: '4,600m', stay: 'Tent Concordia', trekHours: '5-6 hrs', distanceKm: 12 },
      { day: 12, title: 'Concordia to K2 Base Camp Excursion', desc: 'Day trek to Broad Peak Base Camp, Gilkey Memorial, and K2 Base Camp (5,150m). Return to Concordia camp.', altitude: '5,150m', stay: 'Tent Concordia', trekHours: '7-8 hrs', distanceKm: 16 },
      { day: 13, title: 'Concordia to Ali Camp', desc: 'Trek across Vigne Glacier toward the base of Gondogoro La. Early dinner and pre-pass safety briefing.', altitude: '4,800m', stay: 'Tent Ali Camp', trekHours: '5-6 hrs', distanceKm: 10 },
      { day: 14, title: 'Cross Gondogoro La (5,585m) to Khuspang', desc: 'Midnight alpine start with crampons and fixed ropes over Gondogoro La. Sunrise panorama of 4 eight-thousanders and Laila Peak. Descend to Khuspang.', altitude: '5,585m', stay: 'Tent Khuspang', trekHours: '9-11 hrs', distanceKm: 14 },
      { day: 15, title: 'Khuspang to Saicho', desc: 'Follow the Gondogoro glacier down to the green pastures and meltwater streams of Saicho.', altitude: '3,350m', stay: 'Tent Saicho', trekHours: '5-6 hrs', distanceKm: 12 },
      { day: 16, title: 'Saicho to Hushe Village & Drive to Skardu', desc: 'Short walk to Hushe village, meet 4x4 Jeeps and drive back through Khaplu to Skardu hotel for hot showers.', altitude: '2,228m', stay: 'Skardu Resort', trekHours: '3 hrs walk + 4 hrs drive' },
      { day: 17, title: 'Fly Skardu to Islamabad', desc: 'Morning flight to capital city Islamabad. Farewell dinner with traditional cuisine.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 18, title: 'Contingency & Islamabad Sightseeing', desc: 'Buffer day for mountain flight delays. Visit Faisal Mosque, Pakistan Monument, and Lok Virsa.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 19, title: 'International Departure', desc: 'Airport transfer for your onward flight home with lifelong memories of Karakoram.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: [
      'Official Government Trekking Permit & Environmental Fees',
      'All domestic flights (Islamabad-Skardu return)',
      '4-star hotel accommodations in Islamabad & Skardu on twin sharing',
      'All high-altitude camping gear (The North Face / Mountain Hardwear 3-person tents for 2 trekkers)',
      'Professional English-speaking licensed Mountain Guide',
      '1 porter per trekker (up to 15kg personal baggage carried)',
      'All meals on trek prepared by experienced expedition chef (breakfast, hot lunch, dinner, high-tea)',
      'Mess tent, dining table, chairs, toilet tents & kitchen equipment',
      'Fixed rope team & rescue safety gear for Gondogoro La pass',
      'First aid kit, pulse oximeter, and emergency hyperbaric bag (Gamow bag)'
    ],
    exclusions: [
      'International airfare and Pakistan Tourist Visa fee',
      'Personal trekking gear (crampons, harness, sleeping bag -15°C, down jacket)',
      'Emergency helicopter evacuation insurance (mandatory minimum $50k USD)',
      'Gratuities/tips for local guides, cooks, and porters',
      'Personal snacks, alcohol, and soft drinks'
    ],
    gearChecklist: [
      'Four-season sleeping bag (rated to -15°C / 5°F)',
      'Sturdy mountaineering boots with ankle support + microspikes/crampons',
      'Climbing harness, locking carabiners, and climbing helmet',
      'Gore-Tex windproof/waterproof jacket & trousers',
      '800-fill down jacket for sub-zero glacier evenings',
      'Trekking poles with snow baskets',
      'UV Category 4 Glacier sunglasses & high SPF 50+ sunscreen',
      'Personal water filtration system / Katadyn tablets'
    ],
    permitRequirements: 'Requires Gilgit-Baltistan Restricted Area Permit (handled 100% by our agency), copy of passport, Pakistan Trekking E-Visa, and Alpine Club clearance.',
    fitnessLevel: 'High endurance required. Trekkers should have previous multi-day backpacking experience above 3,500m.',
    departureDates: ['June 15, 2026', 'July 01, 2026', 'July 15, 2026', 'August 01, 2026', 'August 15, 2026']
  },
  {
    id: 'k2-basecamp-classic',
    title: 'K2 Base Camp & Concordia Classic Trek',
    shortTitle: 'K2 Base Camp Classic',
    tagline: 'The timeless route up Baltoro Glacier to K2 Base Camp and return via Askole',
    region: 'Karakoram',
    startingCity: 'Islamabad / Skardu',
    durationDays: 16,
    durationNights: 15,
    difficulty: 'Strenuous',
    maxAltitude: 5150,
    priceUSD: 2150,
    discountPriceUSD: 1950,
    rating: 4.9,
    reviewsCount: 112,
    featured: true,
    popular: true,
    bestSeason: 'June to September',
    groupSize: '4 to 14 Trekkers',
    activityType: 'Trekking',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'The classic non-pass crossing variation of the K2 journey. Perfect for high-altitude trekkers seeking to experience the awe-inspiring Baltoro Glacier, Trango Towers, and stand at K2 Base Camp without the technical steepness and harness descent of Gondogoro La. Retraces the majestic Baltoro moraine with more time for photography and pacing.',
    highlights: [
      'Direct trek to K2 Base Camp & Broad Peak Base Camp',
      'Spectacular views of Trango Towers & Masherbrum',
      'Two full nights at Concordia with clear night astro-photography',
      'Less technical than Gondogoro La pass crossing',
      'Full porter support, expedition cook, and medical equipment'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', desc: 'Welcome at airport, transfer to hotel, team briefing and gear check.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Flight to Skardu', desc: 'Scenic flight over Himalaya and Karakoram ranges.', altitude: '2,228m', stay: 'Skardu Hotel', trekHours: '0 hrs' },
      { day: 3, title: 'Skardu Preparation Day', desc: 'Acclimatization, briefing with local authorities, visit Sadpara Lake.', altitude: '2,228m', stay: 'Skardu Hotel', trekHours: '2 hrs' },
      { day: 4, title: '4x4 Drive Skardu to Askole', desc: 'Traverse Shigar valley in Toyota Land Cruisers to trailhead.', altitude: '3,000m', stay: 'Askole Camp', trekHours: '0 hrs (Drive 6 hrs)' },
      { day: 5, title: 'Trek Askole to Jhola', desc: 'Start trek alongside the raging Braldu river.', altitude: '3,100m', stay: 'Jhola Camp', trekHours: '6 hrs', distanceKm: 18 },
      { day: 6, title: 'Trek Jhola to Paiju', desc: 'Scenic walk with first sightings of Cathedral and Paiju Peaks.', altitude: '3,450m', stay: 'Paiju Camp', trekHours: '6-7 hrs', distanceKm: 19 },
      { day: 7, title: 'Acclimatization Day at Paiju', desc: 'Rest day for trekkers; food preparation and baking by crew.', altitude: '3,450m', stay: 'Paiju Camp', trekHours: '0 hrs' },
      { day: 8, title: 'Trek Paiju to Khoburtse', desc: 'Ascend onto the massive Baltoro Glacier.', altitude: '3,800m', stay: 'Khoburtse Camp', trekHours: '6 hrs', distanceKm: 14 },
      { day: 9, title: 'Trek Khoburtse to Urdukas', desc: 'Short steep hike to scenic grassy terrace above glacier.', altitude: '4,050m', stay: 'Urdukas Camp', trekHours: '4-5 hrs', distanceKm: 8 },
      { day: 10, title: 'Trek Urdukas to Goro II', desc: 'Trek along center line of Baltoro under shadows of giant peaks.', altitude: '4,300m', stay: 'Goro II Camp', trekHours: '6 hrs', distanceKm: 12 },
      { day: 11, title: 'Trek Goro II to Concordia', desc: 'Arrive at the Throne Room of the Mountain Gods.', altitude: '4,600m', stay: 'Concordia Camp', trekHours: '5 hrs', distanceKm: 12 },
      { day: 12, title: 'K2 Base Camp & Gilkey Memorial Trek', desc: 'Day excursion to K2 Base Camp (5,150m) and Broad Peak BC.', altitude: '5,150m', stay: 'Concordia Camp', trekHours: '8 hrs', distanceKm: 16 },
      { day: 13, title: 'Concordia to Goro I', desc: 'Begin descent journey back down Baltoro Glacier.', altitude: '4,100m', stay: 'Goro I Camp', trekHours: '6 hrs', distanceKm: 16 },
      { day: 14, title: 'Goro I to Paiju Camp', desc: 'Descend to Paiju campsite.', altitude: '3,450m', stay: 'Paiju Camp', trekHours: '6-7 hrs', distanceKm: 22 },
      { day: 15, title: 'Paiju to Askole & Drive to Skardu', desc: 'Trek to Askole roadhead, drive directly back to Skardu.', altitude: '2,228m', stay: 'Skardu Hotel', trekHours: '7 hrs trek + 4 hrs drive' },
      { day: 16, title: 'Flight Skardu to Islamabad & Departure', desc: 'Fly to Islamabad, onward international flights.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: [
      'Full government permits, environmental taxes, and NOC clearance',
      'All flights between Islamabad and Skardu',
      'All meals throughout the expedition (3 hot meals + snacks)',
      'High-altitude double occupancy waterproof tents with foam mattresses',
      'Licensed professional Balti guide, assistant guides, and camp cook',
      'Porterage for 15kg of personal luggage per trekker',
      'Comprehensive first aid medical kit, pulse oximeter, emergency oxygen'
    ],
    exclusions: [
      'International flights and Pakistan visa',
      'Mandatory emergency rescue insurance',
      'Personal gear and sleeping bags',
      'Tips for staff'
    ],
    gearChecklist: [
      'Down sleeping bag (-10°C to -15°C)',
      'Trekking boots broken in prior to trip',
      'Thermals (merino wool base layers)',
      'Hard-shell waterproof jacket & pants',
      'Fleece jackets and insulating layers',
      'Trekking poles & UV sunglasses'
    ],
    permitRequirements: 'Standard Baltoro trekking permit processed by our licensed office in Skardu.',
    fitnessLevel: 'Moderate to Good physical fitness; suitable for hikers with stamina for 6-8 hours daily walking.',
    departureDates: ['June 20, 2026', 'July 05, 2026', 'July 20, 2026', 'August 05, 2026', 'August 20, 2026']
  },
  {
    id: 'fairy-meadows-nanga-parbat',
    title: 'Fairy Meadows & Nanga Parbat Base Camp Trek',
    shortTitle: 'Fairy Meadows & Nanga Parbat',
    tagline: 'Fairytale pine forests, alpine meadows, and the sheer 8,126m Killer Mountain',
    region: 'Himalayas',
    startingCity: 'Islamabad / Gilgit',
    durationDays: 8,
    durationNights: 7,
    difficulty: 'Moderate',
    maxAltitude: 3967,
    priceUSD: 1150,
    discountPriceUSD: 990,
    rating: 4.9,
    reviewsCount: 204,
    featured: true,
    popular: true,
    bestSeason: 'May to October',
    groupSize: '2 to 14 Trekkers',
    activityType: 'Trekking',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'One of the most scenic and accessible short treks in the western Himalayas of Pakistan. Drive across the world-famous cliff-hugging Jeep track from Raikot Bridge to Tatu village, then hike up through dense pine and birch forests to Fairy Meadows (3,300m). Hike onward to Beyal Camp and stand directly beneath the colossal 4,000m vertical ice and rock Raikot Face of Nanga Parbat (8,126m).',
    highlights: [
      'Iconic cliffside 4x4 Jeep trail from Raikot Bridge',
      'Cozy wooden log cabins in Fairy Meadows facing Nanga Parbat',
      'Hike to Beyal Camp and Nanga Parbat Raikot Base Camp (3,967m)',
      'Close-up views of Raikot Glacier and Chongra Peaks',
      'Great for families, photographers, and moderate hikers'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', desc: 'Airport transfer to hotel. Evening orientation meeting.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Drive or Fly to Gilgit / Chilas', desc: 'Flight to Gilgit or scenic drive through Babusar Pass (4,173m) to Chilas.', altitude: '1,500m', stay: 'Shangrila Chilas / Gilgit', trekHours: '0 hrs' },
      { day: 3, title: 'Raikot Bridge Jeep Ride & Hike to Fairy Meadows', desc: '4x4 mountain Jeep ride to Tatu village, followed by 3-hour hike to Fairy Meadows.', altitude: '3,300m', stay: 'Fairy Meadows Log Cottages', trekHours: '3-4 hrs', distanceKm: 6 },
      { day: 4, title: 'Trek to Beyal Camp & View Point', desc: 'Gentle walk through birch woods to Beyal Camp and upper viewpoint overlooking Raikot Glacier.', altitude: '3,550m', stay: 'Fairy Meadows Log Cottages', trekHours: '4-5 hrs', distanceKm: 8 },
      { day: 5, title: 'Excursion to Nanga Parbat Base Camp (3,967m)', desc: 'Trek to the base camp of German mountaineering expeditions with staggering views of the ice face.', altitude: '3,967m', stay: 'Fairy Meadows Log Cottages', trekHours: '6 hrs', distanceKm: 12 },
      { day: 6, title: 'Descend to Tatu & Drive to Hunza Valley', desc: 'Walk down to Tatu, Jeep back to Raikot Bridge, and drive along KKH to Karimabad, Hunza.', altitude: '2,400m', stay: 'Hunza Serena Inn', trekHours: '2.5 hrs walk + 3 hrs drive' },
      { day: 7, title: 'Hunza Sightseeing & Drive to Gilgit / Besham', desc: 'Explore Baltit and Altit Forts, drive to Gilgit or Besham.', altitude: '1,500m', stay: 'Hotel Gilgit', trekHours: '0 hrs' },
      { day: 8, title: 'Return to Islamabad & Departure', desc: 'Fly or drive to Islamabad, transfer to airport for onward flight.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: [
      'All 4x4 Jeep transfers on Tatu track',
      'Wooden cottage accommodation in Fairy Meadows',
      'Hotel stays in Islamabad, Chilas/Gilgit, and Hunza',
      'All meals (Breakfast, Lunch, Dinner)',
      'Professional guide and luggage porter on hiking trail',
      'Entry fees to national parks and heritage forts'
    ],
    exclusions: [
      'International flights',
      'Personal travel insurance',
      'Tips for drivers, porters, and guide'
    ],
    gearChecklist: [
      'Comfortable hiking boots with good grip',
      'Warm fleece jacket and windproof outer layer',
      'Trekking poles & daypack (25-35L)',
      'Sun hat and UV sunglasses'
    ],
    permitRequirements: 'Open zone; standard Pakistan tourist e-visa only.',
    fitnessLevel: 'Moderate; suitable for beginners and regular walkers.',
    departureDates: ['Weekly departures every Saturday from May 1 to Oct 20, 2026']
  },
  {
    id: 'snow-lake-biafo-hispar',
    title: 'Snow Lake & Biafo-Hispar Glacial Traverse',
    shortTitle: 'Snow Lake & Hispar La',
    tagline: 'The greatest continuous glacial wilderness traverse outside polar regions',
    region: 'Karakoram',
    startingCity: 'Islamabad / Skardu',
    durationDays: 21,
    durationNights: 20,
    difficulty: 'Extreme',
    maxAltitude: 5151,
    priceUSD: 2850,
    discountPriceUSD: 2600,
    rating: 5.0,
    reviewsCount: 56,
    featured: true,
    popular: false,
    bestSeason: 'July to August',
    groupSize: '4 to 10 Trekkers',
    activityType: 'Pass Crossing',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'A legendary 100km ice highway linking the ancient kingdoms of Baltistan and Hunza. Journey up the 60km Biafo Glacier into Lukpe Lawo (Snow Lake)—a surreal 16-kilometer wide basin of snow and ice basin over 1 mile deep. Cross the glaciated Hispar La (5,151m) and descend the 49km Hispar Glacier into the fertile Hunza Valley.',
    highlights: [
      'Traverse 100km of uninterrupted glaciers between Baltistan and Nagar/Hunza',
      'Camp in the middle of vast 16km wide Snow Lake (Lukpe Lawo)',
      'Cross Hispar La (5,151m) with views of Ogre (Baintha Brakk 7,285m) & Latok peaks',
      'One of the purest wilderness treks on Earth with zero permanent settlements',
      'Highly experienced mountain rescue guides with satellite communications'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', desc: 'Expedition meeting and briefing.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Fly Skardu', desc: 'Scenic mountain flight.', altitude: '2,228m', stay: 'Skardu Hotel', trekHours: '0 hrs' },
      { day: 3, title: 'Skardu Final Logistics', desc: 'Gear sorting, team introductions.', altitude: '2,228m', stay: 'Skardu Hotel', trekHours: '0 hrs' },
      { day: 4, title: 'Drive Skardu to Askole', desc: '4x4 drive to Braldu valley trailhead.', altitude: '3,000m', stay: 'Askole Camp', trekHours: '0 hrs (6 hrs Jeep)' },
      { day: 5, title: 'Askole to Namla', desc: 'Turn north onto the Biafo Glacier lateral moraine.', altitude: '3,400m', stay: 'Namla Camp', trekHours: '6 hrs', distanceKm: 14 },
      { day: 6, title: 'Namla to Mango', desc: 'Trek along the grassy oasis campsites beside Biafo ice.', altitude: '3,700m', stay: 'Mango Camp', trekHours: '5 hrs', distanceKm: 12 },
      { day: 7, title: 'Mango to Baintha', desc: 'Ascend to green ablation valley facing Baintha Brakk (The Ogre).', altitude: '4,000m', stay: 'Baintha Camp', trekHours: '6 hrs', distanceKm: 14 },
      { day: 8, title: 'Acclimatization Day Baintha', desc: 'Rest day and hike up ridge for Ogre and Latok photography.', altitude: '4,000m', stay: 'Baintha Camp', trekHours: '3 hrs' },
      { day: 9, title: 'Baintha to Marpogoro', desc: 'Walk on white ice highway of upper Biafo.', altitude: '4,400m', stay: 'Marpogoro Camp', trekHours: '6 hrs', distanceKm: 13 },
      { day: 10, title: 'Marpogoro to Karpogoro', desc: 'Surrounded by granite needle spires and snow walls.', altitude: '4,700m', stay: 'Karpogoro Camp', trekHours: '5 hrs', distanceKm: 11 },
      { day: 11, title: 'Karpogoro to Snow Lake (Lukpe Lawo)', desc: 'Enter the vast snow basin of Snow Lake and set glacier camp.', altitude: '4,900m', stay: 'Snow Lake Camp', trekHours: '5 hrs', distanceKm: 10 },
      { day: 12, title: 'Cross Hispar La (5,151m) to Kani Basa', desc: 'Roped crossing over Hispar pass, descend onto Hispar glacier.', altitude: '5,151m', stay: 'Kani Basa Camp', trekHours: '8-9 hrs', distanceKm: 15 },
      { day: 13, title: 'Kani Basa to Jutmal', desc: 'Navigate side glacier streams and moraine fields.', altitude: '4,300m', stay: 'Jutmal Camp', trekHours: '6 hrs', distanceKm: 12 },
      { day: 14, title: 'Jutmal to Bitanmal', desc: 'Reach beautiful summer pastures of Nagar shepherds.', altitude: '3,800m', stay: 'Bitanmal Camp', trekHours: '5-6 hrs', distanceKm: 13 },
      { day: 15, title: 'Bitanmal to Hispar Village & Drive Karimabad', desc: 'Trek to Hispar village, meet jeeps, drive to Hunza valley.', altitude: '2,400m', stay: 'Hunza Hotel', trekHours: '4 hrs trek + 3 hrs drive' },
      { day: 16, title: 'Rest & Culture in Hunza Valley', desc: 'Visit historic forts, café terraces, and local apricot orchards.', altitude: '2,400m', stay: 'Hunza Hotel', trekHours: '0 hrs' },
      { day: 17, title: 'Drive to Gilgit', desc: 'Short drive along Karakoram Highway.', altitude: '1,500m', stay: 'Gilgit Hotel', trekHours: '0 hrs' },
      { day: 18, title: 'Fly Gilgit to Islamabad', desc: 'Flight back to federal capital.', altitude: '540m', stay: 'Islamabad Hotel', trekHours: '0 hrs' },
      { day: 19, title: 'Contingency / Exploration Day', desc: 'Buffer day for weather flexibility.', altitude: '540m', stay: 'Islamabad Hotel', trekHours: '0 hrs' },
      { day: 20, title: 'Farewell Dinner', desc: 'Celebration dinner in Islamabad.', altitude: '540m', stay: 'Islamabad Hotel', trekHours: '0 hrs' },
      { day: 21, title: 'Fly Home', desc: 'Airport transfer for international departure.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: [
      'Complete wilderness logistics, ice screws, ropes, and certified high-altitude guides',
      'All camping, food, mess tents, dining setup, and porter services',
      'Restricted zone permits and environmental clearing',
      'All internal flights and private 4WD vehicles'
    ],
    exclusions: ['International flights', 'Rescue insurance', 'Personal ice gear', 'Tips'],
    gearChecklist: ['4-season mountaineering tent/sleeping bag', 'Crampons & ice axe', 'Glacier gaiters & thermal overboots'],
    permitRequirements: 'Government Restricted Area Permit required.',
    fitnessLevel: 'Extreme stamina and prior glacier experience required.',
    departureDates: ['July 10, 2026', 'August 01, 2026']
  },
  {
    id: 'k2-basecamp-heli-trek',
    title: 'K2 Base Camp Luxury Heli-Trek Expedition',
    shortTitle: 'K2 Base Camp Heli-Trek',
    tagline: 'Fly by military-grade helicopter direct to Concordia & hike the highlights',
    region: 'Karakoram',
    startingCity: 'Islamabad / Skardu',
    durationDays: 10,
    durationNights: 9,
    difficulty: 'Demanding',
    maxAltitude: 5150,
    priceUSD: 4800,
    discountPriceUSD: 4450,
    rating: 5.0,
    reviewsCount: 38,
    featured: true,
    popular: true,
    bestSeason: 'June to September',
    groupSize: '2 to 8 Trekkers',
    activityType: 'Heli Trek',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Experience the magic of K2 and Baltoro Glacier in a fraction of the time with VIP helicopter transfers. Fly directly from Skardu over the Trango Towers to Concordia/Paiju, trek to K2 Base Camp and Broad Peak with luxury glamping tents and chef-prepared hot cuisine, and fly back over the high peaks.',
    highlights: [
      'Airbus / Ecureuil helicopter scenic flight over Karakoram giants',
      'Direct access to Concordia and K2 Base Camp without 7-day walk-in',
      'Luxury dome tents with heating, real mattresses, and hot water',
      'Professional mountain guides with satellite tracking'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad VIP Arrival', desc: 'Airport greeting, transfer to 5-star Serena Hotel.', altitude: '540m', stay: 'Serena Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Flight to Skardu', desc: 'Transfer to Shangrila Skardu Resort.', altitude: '2,228m', stay: 'Shangrila Resort', trekHours: '0 hrs' },
      { day: 3, title: 'Acclimatization in Skardu & Shigar', desc: 'Visit historic Shigar Serena Fort.', altitude: '2,228m', stay: 'Shigar Fort', trekHours: '0 hrs' },
      { day: 4, title: 'Helicopter Flight to Paiju / Urdukas', desc: 'Fly by private helicopter over Baltoro snout to Urdukas.', altitude: '4,050m', stay: 'Luxury Camp Urdukas', trekHours: '2 hrs' },
      { day: 5, title: 'Hike Urdukas to Goro II', desc: 'Trek along Baltoro Glacier with views of Masherbrum.', altitude: '4,300m', stay: 'Luxury Camp Goro II', trekHours: '5 hrs' },
      { day: 6, title: 'Trek to Concordia', desc: 'Arrive at Concordia throne room.', altitude: '4,600m', stay: 'Luxury Camp Concordia', trekHours: '5 hrs' },
      { day: 7, title: 'K2 Base Camp Helicopter & Hike Excursion', desc: 'Hike to K2 Base Camp, touch the foot of the Savage Mountain.', altitude: '5,150m', stay: 'Luxury Camp Concordia', trekHours: '6 hrs' },
      { day: 8, title: 'Helicopter Flight Concordia to Skardu', desc: 'Morning helicopter flight back to Skardu with aerial vistas.', altitude: '2,228m', stay: 'Serena Skardu', trekHours: '0 hrs' },
      { day: 9, title: 'Fly Skardu to Islamabad', desc: 'Commercial flight back to Islamabad.', altitude: '540m', stay: 'Serena Islamabad', trekHours: '0 hrs' },
      { day: 10, title: 'International Departure', desc: 'VIP airport transfer for onward flight.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: [
      'Chartered Helicopter flights (Skardu - Baltoro return)',
      '5-Star hotel accommodations in Islamabad and Skardu (Serena / Shangrila)',
      'VIP glamping dome tents with warm bedding and private dining',
      'All government royalty and environmental permits'
    ],
    exclusions: ['International airfare', 'Personal insurance', 'Tips'],
    gearChecklist: ['Mountaineering warm clothing', 'Trekking boots', 'Thermal layers'],
    permitRequirements: 'Restricted area permit arranged 4 weeks prior to departure.',
    fitnessLevel: 'Moderate to Good; less walking than full expedition.',
    departureDates: ['July 01, 2026', 'July 15, 2026', 'August 01, 2026', 'August 15, 2026']
  },
  {
    id: 'rakaposhi-diran-base-camp',
    title: 'Rakaposhi & Diran Base Camp Trek',
    shortTitle: 'Rakaposhi & Diran',
    tagline: 'Gaze up at the world’s steepest 6,000m uninterrupted vertical rise in Nagar',
    region: 'Hunza & Nagar',
    startingCity: 'Islamabad / Gilgit',
    durationDays: 7,
    durationNights: 6,
    difficulty: 'Moderate',
    maxAltitude: 3800,
    priceUSD: 950,
    discountPriceUSD: 850,
    rating: 4.8,
    reviewsCount: 89,
    featured: false,
    popular: true,
    bestSeason: 'May to October',
    groupSize: '2 to 12 Trekkers',
    activityType: 'Trekking',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'A breathtaking short trek in the Nagar Valley starting from Minapin village. Ascend through juniper forests to Tagafari and Hapakun camps, directly facing the staggering 6,000m vertical north face of Rakaposhi (7,788m) and Diran Peak (7,266m). Easy accessibility, delicious local cuisine, and spectacular glacial scenery make this ideal for both beginners and experienced trekkers.',
    highlights: [
      'Witness the largest uninterrupted vertical rise on planet Earth (Rakaposhi North Wall)',
      'Camp at Tagafari right beside the Minapin Glacier',
      'Hike across the glacier to Diran Base Camp & Kacheli lake',
      'Taste fresh cherries, apples, and organic apricots in Minapin',
      'Short, rewarding itinerary easily combined with Hunza Valley culture tour'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', desc: 'Airport reception and orientation.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Fly Gilgit / Drive to Minapin Nagar', desc: 'Scenic flight to Gilgit, drive along KKH to Minapin village.', altitude: '2,000m', stay: 'Osho Thang Hotel', trekHours: '0 hrs' },
      { day: 3, title: 'Trek Minapin to Hapakun', desc: 'Hike through pine and juniper woods along the Minapin stream.', altitude: '2,800m', stay: 'Hapakun Camp', trekHours: '3-4 hrs', distanceKm: 6 },
      { day: 4, title: 'Trek Hapakun to Tagafari (Rakaposhi BC)', desc: 'Climb onto the lateral moraine to Tagafari camp under Rakaposhi.', altitude: '3,500m', stay: 'Tagafari Camp', trekHours: '3 hrs', distanceKm: 5 },
      { day: 5, title: 'Excursion to Diran Base Camp & Kacheli', desc: 'Cross the glacier to Diran Base Camp (3,800m) with 360° views.', altitude: '3,800m', stay: 'Tagafari Camp', trekHours: '5 hrs', distanceKm: 9 },
      { day: 6, title: 'Descend to Minapin & Drive to Hunza', desc: 'Hike down to Minapin, drive to Karimabad Hunza.', altitude: '2,400m', stay: 'Hunza View Hotel', trekHours: '4 hrs trek + 1 hr drive' },
      { day: 7, title: 'Drive to Gilgit & Return Flight to Islamabad', desc: 'Fly to Islamabad, onward international connection.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: [
      'Transport in private air-conditioned vehicles and 4x4',
      'Hotel stays in Islamabad, Minapin, and Hunza',
      'All meals on trek and hotels',
      'Camping equipment, tents, guide, and porters'
    ],
    exclusions: ['International flights', 'Travel insurance', 'Tips'],
    gearChecklist: ['Trekking shoes', 'Warm jacket', 'Rain layer', 'Trekking poles'],
    permitRequirements: 'Open trekking area. Standard Pakistan e-visa.',
    fitnessLevel: 'Moderate physical condition.',
    departureDates: ['Every Sunday from May 15 to October 15, 2026']
  },
  {
    id: 'rush-lake-and-peak',
    title: 'Rush Lake & Rush Peak Alpine Trek',
    shortTitle: 'Rush Lake & Peak (4,694m)',
    tagline: 'Trek to one of the highest alpine lakes in the world with 360° Karakoram vistas',
    region: 'Hunza & Nagar',
    startingCity: 'Islamabad / Gilgit',
    durationDays: 9,
    durationNights: 8,
    difficulty: 'Demanding',
    maxAltitude: 5098,
    priceUSD: 1250,
    discountPriceUSD: 1100,
    rating: 4.9,
    reviewsCount: 73,
    featured: false,
    popular: true,
    bestSeason: 'June to September',
    groupSize: '2 to 10 Trekkers',
    activityType: 'Trekking',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Rush Lake (4,694m) in Nagar Valley is an extraordinary turquoise gem nestled beneath the Karakoram peaks. A short climb from the lake takes you to Rush Peak (5,098m)—a non-technical trekking summit offering a staggering 360-degree amphitheater featuring Spantik (Golden Peak 7,027m), Malubiting, Ultar Sar, and even glimpses of K2 and Broad Peak in clear weather.',
    highlights: [
      'Trek to one of the highest alpine lakes on Earth (4,694m)',
      'Summit non-technical Rush Peak (5,098m) for unobstructed panoramas',
      'Traverse the Barpu and Bualtar Glaciers',
      'Witness Spantik (Golden Peak), Miar Peak, and Phuparash',
      'Rich wildlife spotting: Himalayan Ibex, Golden Eagles, and Marmots'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', desc: 'Meet expedition staff, hotel transfer.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Fly to Gilgit & Drive to Hopar Nagar', desc: 'Scenic flight to Gilgit, drive past Rakaposhi viewpoint to Hopar Valley.', altitude: '2,800m', stay: 'Hopar Inn', trekHours: '0 hrs' },
      { day: 3, title: 'Trek Hopar to Bericho Kor', desc: 'Cross the active Bualtar Glacier and ascend to Bericho Kor.', altitude: '3,300m', stay: 'Bericho Kor Camp', trekHours: '4 hrs', distanceKm: 7 },
      { day: 4, title: 'Trek Bericho Kor to Chidin Harai', desc: 'Trek across Barpu glacier to alpine meadow camp.', altitude: '4,000m', stay: 'Chidin Harai Camp', trekHours: '4-5 hrs', distanceKm: 8 },
      { day: 5, title: 'Trek Chidin Harai to Rush Lake', desc: 'Steep ascent to the alpine plateau and turquoise Rush Lake.', altitude: '4,694m', stay: 'Rush Lake Camp', trekHours: '3-4 hrs', distanceKm: 6 },
      { day: 6, title: 'Summit Rush Peak (5,098m) & Rest at Lake', desc: 'Early morning climb to Rush Peak for sunrise over Karakoram, afternoon rest.', altitude: '5,098m', stay: 'Rush Lake Camp', trekHours: '4 hrs', distanceKm: 5 },
      { day: 7, title: 'Descend Rush Lake to Barpu Giram', desc: 'Walk down along flower meadows and shepherd huts.', altitude: '3,400m', stay: 'Barpu Giram Camp', trekHours: '5 hrs', distanceKm: 11 },
      { day: 8, title: 'Trek to Hopar & Drive to Karimabad Hunza', desc: 'Cross glacier back to Hopar village, drive to Hunza hotel.', altitude: '2,400m', stay: 'Hunza Hotel', trekHours: '3 hrs trek + 1 hr drive' },
      { day: 9, title: 'Fly Gilgit to Islamabad & International Departure', desc: 'Flight to Islamabad, onward journey.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: ['All land transport, domestic flight, mountain guides, cook, porters, and meals'],
    exclusions: ['International flights, personal insurance, tips'],
    gearChecklist: ['Trekking boots, thermal gloves, high SPF sunglasses, wind jacket'],
    permitRequirements: 'Standard tourist visa.',
    fitnessLevel: 'Good aerobic fitness for high altitude walking.',
    departureDates: ['June 10, 2026', 'July 01, 2026', 'July 20, 2026', 'August 10, 2026', 'September 01, 2026']
  },
  {
    id: 'shimshal-minglik-sar',
    title: 'Shimshal Valley & Minglik Sar (6,050m) Trek & Climb',
    shortTitle: 'Shimshal & Minglik Sar',
    tagline: 'Venture into the Valley of Mountaineers & climb a non-technical 6,000m peak',
    region: 'Karakoram',
    startingCity: 'Islamabad / Gilgit',
    durationDays: 14,
    durationNights: 13,
    difficulty: 'Extreme',
    maxAltitude: 6050,
    priceUSD: 1850,
    discountPriceUSD: 1690,
    rating: 5.0,
    reviewsCount: 42,
    featured: false,
    popular: true,
    bestSeason: 'June to September',
    groupSize: '3 to 10 Trekkers',
    activityType: 'Expedition',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Shimshal is the highest settlement in Hunza and home to Pakistan’s most celebrated high-altitude climbers (including Samina Baig). Journey along the famous gorge road, trek through the Shimshal Pamir high pastures (Shuwjerab and Shuhtperg), and climb the non-technical trekking peak Minglik Sar (6,050m) with crampons and ice axes.',
    highlights: [
      'Climb your first 6,000m Himalayan/Karakoram peak with expert local instructors',
      'Explore Shimshal Pamir high alpine pastures grazing thousands of Yaks',
      'Meet world-renowned Wakhi mountaineers and experience authentic culture',
      'Stunning views of K2, Gasherbrum, and Chinese Pamir from summit'
    ],
    itinerary: [
      { day: 1, title: 'Islamabad Arrival', desc: 'Orientation and gear check.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Fly Gilgit / Drive Passu', desc: 'Drive past Passu Cones in upper Hunza.', altitude: '2,500m', stay: 'Passu Hotel', trekHours: '0 hrs' },
      { day: 3, title: '4x4 Jeep Drive Passu to Shimshal', desc: 'Drive through the dramatic Shimshal Gorge.', altitude: '3,100m', stay: 'Shimshal Guest House', trekHours: '4 hrs Jeep' },
      { day: 4, title: 'Trek Shimshal to Past Furzin', desc: 'Ascend narrow canyons and rope bridges.', altitude: '3,400m', stay: 'Furzin Camp', trekHours: '5-6 hrs', distanceKm: 12 },
      { day: 5, title: 'Trek Past Furzin to Arbab Purien', desc: 'Traverse high scree paths and river beds.', altitude: '3,900m', stay: 'Arbab Purien Camp', trekHours: '5 hrs', distanceKm: 11 },
      { day: 6, title: 'Trek to Shimshal Pamir Base (Shuwjerab)', desc: 'Enter the vast green Pamir pastures with high lakes.', altitude: '4,700m', stay: 'Pamir High Camp', trekHours: '6 hrs', distanceKm: 14 },
      { day: 7, title: 'Acclimatization & Training at Pamir', desc: 'Rope skills and crampon training on glacier.', altitude: '4,700m', stay: 'Pamir High Camp', trekHours: '3 hrs' },
      { day: 8, title: 'Summit Day: Minglik Sar (6,050m)', desc: 'Alpine dawn start, snow climb to summit, return to camp.', altitude: '6,050m', stay: 'Pamir High Camp', trekHours: '8-10 hrs', distanceKm: 12 },
      { day: 9, title: 'Reserve Summit Day', desc: 'Buffer day in case of weather.', altitude: '4,700m', stay: 'Pamir High Camp', trekHours: '0 hrs' },
      { day: 10, title: 'Trek Pamir to Furzin', desc: 'Begin descent back toward Shimshal.', altitude: '3,400m', stay: 'Furzin Camp', trekHours: '6-7 hrs', distanceKm: 18 },
      { day: 11, title: 'Trek Furzin to Shimshal Village', desc: 'Arrive in village, celebration dinner with yak meat and local bread.', altitude: '3,100m', stay: 'Shimshal Guest House', trekHours: '4 hrs', distanceKm: 10 },
      { day: 12, title: 'Jeep to Karimabad Hunza', desc: 'Drive to central Hunza for hotel comforts.', altitude: '2,400m', stay: 'Hunza Hotel', trekHours: '5 hrs drive' },
      { day: 13, title: 'Fly Gilgit to Islamabad', desc: 'Flight to capital.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 14, title: 'International Departure', desc: 'Airport transfer for flight home.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: ['Climbing guide, climbing permits, high altitude gear, meals, camps, flights and jeeps'],
    exclusions: ['International flights, personal boots & insurance, tips'],
    gearChecklist: ['Crampons, climbing harness, mountaineering boots, -20°C sleeping bag'],
    permitRequirements: 'Trekking & Climbing Peak permit included.',
    fitnessLevel: 'High physical stamina.',
    departureDates: ['July 05, 2026', 'July 25, 2026', 'August 15, 2026']
  },
  {
    id: 'deosai-plains-burzil',
    title: 'Deosai Plains & High Lakes Wilderness Trek',
    shortTitle: 'Deosai Plains & Lakes',
    tagline: 'Cross the "Land of Giants"—the 2nd highest plateau on Earth at 4,114m',
    region: 'Deosai & Astore',
    startingCity: 'Islamabad / Skardu',
    durationDays: 6,
    durationNights: 5,
    difficulty: 'Moderate',
    maxAltitude: 4114,
    priceUSD: 850,
    discountPriceUSD: 750,
    rating: 4.8,
    reviewsCount: 94,
    featured: false,
    popular: true,
    bestSeason: 'July to September',
    groupSize: '2 to 14 Trekkers',
    activityType: 'Trekking',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'The Deosai National Park is a high-altitude alpine plateau with an average elevation of 4,114 meters. Known as the "Land of Giants", in summer it transforms into an endless sea of colorful wildflowers, crystal meandering streams, and the crystalline waters of Sheosar Lake, with Himalayan Brown Bears roaming freely against the snowcapped peaks.',
    highlights: [
      'Camp beside the heart-shaped crystal waters of Sheosar Lake (4,142m)',
      'Spot endangered Himalayan Brown Bears, Golden Marmots & Tibetan Wolves',
      'Traverse between Skardu (Baltistan) and Astore Valley (Diamer)',
      'Night-time stargazing beneath zero-pollution Karakoram skies',
      'Comfortable moderate daily hiking with 4x4 support'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', desc: 'Hotel transfer and briefing.', altitude: '540m', stay: 'Hotel Islamabad', trekHours: '0 hrs' },
      { day: 2, title: 'Fly to Skardu & Visit Sadpara Lake', desc: 'Flight to Skardu, visit Sadpara lake and Ali Sadpara memorial.', altitude: '2,228m', stay: 'Skardu Hotel', trekHours: '0 hrs' },
      { day: 3, title: 'Ascend to Deosai National Park & Ali Malik Camp', desc: '4x4 drive onto the plateau, hike to Ali Malik camp.', altitude: '4,000m', stay: 'Ali Malik Camp', trekHours: '3 hrs hike', distanceKm: 7 },
      { day: 4, title: 'Trek across Deosai to Kala Pani & Bara Pani', desc: 'Hike across rolling flower meadows and suspension bridges.', altitude: '4,100m', stay: 'Bara Pani Camp', trekHours: '5-6 hrs', distanceKm: 14 },
      { day: 5, title: 'Trek to Sheosar Lake & Drive to Astore / Rama', desc: 'Reach magical Sheosar Lake, descend into lush pine forests of Rama.', altitude: '3,200m', stay: 'Rama Green Lake Hotel', trekHours: '4 hrs trek + 2 hrs drive' },
      { day: 6, title: 'Drive to Gilgit & Return to Islamabad', desc: 'Fly back to Islamabad for international departure.', altitude: '540m', stay: 'Departure', trekHours: '0 hrs' }
    ],
    inclusions: ['Park entry fees, guide, tented camps, meals, 4x4 transport, domestic flight'],
    exclusions: ['International flights, personal insurance, tips'],
    gearChecklist: ['Warm sleeping bag, waterproof hiking boots, warm hat, windbreaker'],
    permitRequirements: 'National park permit included.',
    fitnessLevel: 'Moderate.',
    departureDates: ['Weekly departures every Friday from June 25 to September 15, 2026']
  }
];

export const TREK_STYLES: TrekStyle[] = [
  {
    id: 'high-altitude',
    title: 'High Altitude Trekking',
    iconName: 'Mountain',
    count: 14,
    description: 'Glacial passes, Baltoro routes & 5,000m+ world-class wilderness treks.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'heli-treks',
    title: 'Heli-Assisted Expeditions',
    iconName: 'Plane',
    count: 6,
    description: 'VIP direct helicopter drops to Concordia, Paiju, and Fairy Meadows.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'climbing-peaks',
    title: '6000m Trekking Peaks',
    iconName: 'Flag',
    count: 8,
    description: 'Non-technical alpine summits: Minglik Sar, Spantik, and Gondogoro Peak.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'jeep-safari',
    title: '4WD Mountain Safaris',
    iconName: 'Compass',
    count: 12,
    description: 'Rugged jeep tracks through Deosai, Shimshal, and Karakoram Highway.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'family-moderate',
    title: 'Family & Scenic Walks',
    iconName: 'Users',
    count: 9,
    description: 'Gentle alpine hikes in Fairy Meadows, Hunza blossom, and Nagar orchards.',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'photography-tours',
    title: 'Glacier Photography',
    iconName: 'Camera',
    count: 7,
    description: 'Golden hour shoots of K2, Trango Towers, and starry night skies.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus & Elena Vance',
    country: 'United States',
    countryCode: 'US',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    trekTaken: 'K2 Base Camp & Gondogoro La Trek',
    date: 'July 2025',
    rating: 5,
    review: 'Standing at Concordia surrounded by K2, Broad Peak, and the Gasherbrums was the most profound mountain experience of our lives. The Balti kitchen team prepared fresh hot meals on ice every day, and our guide Karim ensured safe passage over Gondogoro La.',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Dr. Florian Schmidt',
    country: 'Germany',
    countryCode: 'DE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    trekTaken: 'Snow Lake & Biafo-Hispar Traverse',
    date: 'August 2025',
    rating: 5,
    review: 'Snow Lake is absolute magic. Total wilderness with zero tourists for 12 days. Karakoram Expeditions is hands down the most professional and trustworthy operator in Pakistan. Their safety protocols and satellite rescue communications gave total peace of mind.',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Sophie Laurent',
    country: 'France',
    countryCode: 'FR',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    trekTaken: 'Fairy Meadows & Nanga Parbat',
    date: 'September 2025',
    rating: 5,
    review: 'As a solo female trekker, I felt completely welcomed and safe. The staff treated me like family. Watching the sunrise turn Nanga Parbat into glowing golden crystal from my wooden cabin in Fairy Meadows was unforgettable.',
    verified: true
  },
  {
    id: 'test-4',
    name: 'Kenji Takahashi',
    country: 'Japan',
    countryCode: 'JP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    trekTaken: 'K2 Base Camp Heli-Trek VIP',
    date: 'July 2025',
    rating: 5,
    review: 'The helicopter flight over Trango Towers and landing at Concordia was breathtaking. Luxury heated dome tents and Michelin-level expedition food at 4,600m altitude. Highly recommended for busy executives who want to see K2.',
    verified: true
  }
];

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'K2 Base Camp Trek 2026: Complete Guide & Permits',
    slug: 'k2-base-camp-trek-guide',
    category: 'Trek Guide',
    readTime: '7 min read',
    author: 'Ali Raza Balti',
    authorRole: 'Head Mountain Guide & 3x K2 Summit Support',
    date: 'Jan 28, 2026',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Everything you need to know before packing for the Baltoro Glacier: permits, fitness training, packing list, and Gondogoro La pass safety.',
    content: [
      'The K2 Base Camp trek through the Baltoro Glacier is widely regarded by international alpinists as the crown jewel of high-altitude trekking.',
      'Unlike the Everest Base Camp trek which is lined with teahouses and commercial wifi cafes, Baltoro is a pure, raw, glaciated wilderness with zero permanent structures for 100 kilometers.',
      'Best Season: The optimum window for trekking to K2 Base Camp runs from June 15 to September 10, when melting snow opens up the higher passes and temperatures at Concordia hover around 5°C to 12°C during daylight.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Pakistan Trekking Visa & Gilgit-Baltistan Permits Simplified',
    slug: 'pakistan-trekking-visa-guide',
    category: 'Permits & Visas',
    readTime: '5 min read',
    author: 'Sultan Ahmed',
    authorRole: 'Logistics & Government Liaison Officer',
    date: 'Feb 12, 2026',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Step-by-step instructions on obtaining the Pakistan E-Visa, Mountaineering & Trekking category, and restricted zone NOC clearance.',
    content: [
      'Pakistan now offers a 100% online E-Visa system for citizens of over 190 countries with standard approvals processed within 48 to 72 hours.',
      'For Restricted Zones like the upper Baltoro Glacier and Gondogoro La, a certified government licensed tour operator like Karakoram Expeditions is legally mandated to process your security clearance and Alpine Club registration.'
    ]
  },
  {
    id: 'blog-3',
    title: 'How to Prevent Altitude Sickness at 5,000m+ in the Karakoram',
    slug: 'altitude-sickness-prevention-karakoram',
    category: 'Health & Safety',
    readTime: '6 min read',
    author: 'Dr. Sarah Jennings',
    authorRole: 'High-Altitude Wilderness Medical Advisor',
    date: 'Feb 18, 2026',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Doctor-approved acclimatization strategies, hydration schedules, Diamox protocols, and daily pulse oximeter monitoring.',
    content: [
      'The golden rule of Karakoram acclimatization is gradual ascent: "Climb high, sleep low".',
      'Our itineraries include mandatory rest and acclimatization days at Paiju (3,450m) and Urdukas (4,050m) before pushing into Concordia (4,600m) and Gondogoro La (5,585m).'
    ]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Visa & Permits',
    question: 'Do I need a special permit to trek to K2 Base Camp?',
    answer: 'Yes. K2 Base Camp and the Baltoro Glacier are located in a designated restricted area near the international border. Trekkers require a formal trekking permit from the Gilgit-Baltistan Department of Tourist Services (DTS) and Alpine Club of Pakistan. As a licensed operator, Karakoram Expeditions handles 100% of the permit paperwork, environmental fees, and military liaison requirements for you.'
  },
  {
    category: 'Visa & Permits',
    question: 'How do I apply for a Pakistan Tourist / Trekking Visa?',
    answer: 'You can apply online through the official Pakistan Online Visa Portal (visa.nadra.gov.pk). Once you book your trek with us, we issue an official Letter of Invitation (LOI), certified tour operator license copy, and confirmed itinerary to attach to your visa application. Tourist e-visas are typically approved in 48-72 hours.'
  },
  {
    category: 'Fitness & Altitude',
    question: 'What level of fitness is needed for K2 Base Camp & Gondogoro La?',
    answer: 'You should have good cardiovascular endurance and leg strength. You will be walking 5 to 7 hours daily over uneven glacial moraine, boulders, and snow for consecutive days, reaching a maximum altitude of 5,585m at Gondogoro La. We recommend 3 to 4 months of prior training including stair climbing, weighted backpack hiking, running, and cycling.'
  },
  {
    category: 'Fitness & Altitude',
    question: 'How do you handle high-altitude sickness (AMS)?',
    answer: 'Safety is our highest priority. All our group itineraries are designed with gradual ascent schedules and rest days at Paiju and Urdukas. Our head guides carry daily pulse oximeters to monitor blood oxygen levels, supplementary medical oxygen bottles, first aid medication, and a portable hyperbaric Gamow bag.'
  },
  {
    category: 'Logistics & Safety',
    question: 'What are the accommodation and meals like during the trek?',
    answer: 'In Islamabad and Skardu, you stay in comfortable 4-star hotels. On the trek, you sleep in high-grade four-season waterproof mountaineering tents (The North Face or Mountain Hardwear) with thick insulating foam pads. Our expedition chef and kitchen crew prepare 3 freshly cooked hot meals daily (porridge, eggs, pancakes for breakfast; soups, pasta, fresh vegetables, chicken/mutton curries, rice, and fresh bread for dinner).'
  },
  {
    category: 'Logistics & Safety',
    question: 'Is Pakistan safe for international trekkers and solo female travelers?',
    answer: 'Gilgit-Baltistan and the Karakoram region are among the safest, friendliest, and most peaceful regions in Asia. The local Balti and Hunza communities are world-renowned for their hospitality, honesty, and respect. Hundreds of international climbers and solo female trekkers travel with us every season without incident.'
  },
  {
    category: 'Booking & Payment',
    question: 'What is your cancellation and weather contingency policy?',
    answer: 'Mountain weather in the Karakoram can be unpredictable. We include 2 buffer days in our itineraries for domestic flight delays. If you need to cancel your booking more than 60 days before departure, your deposit is fully transferable to any future departure date within 24 months.'
  }
];
