export type TrekRegion = 
  | 'Karakoram' 
  | 'Himalayas' 
  | 'Hindukush' 
  | 'Hunza & Nagar' 
  | 'Deosai & Astore';

export type TrekDifficulty = 'Easy' | 'Moderate' | 'Demanding' | 'Strenuous' | 'Extreme';

export type ActivityType = 
  | 'Trekking' 
  | 'Heli Trek' 
  | 'Expedition' 
  | 'Jeep Safari' 
  | 'Pass Crossing'
  | 'Cultural Trek';

export interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
  altitude: string;
  stay: string;
  trekHours: string;
  distanceKm?: number;
}

export interface TrekPackage {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  region: TrekRegion;
  startingCity: string;
  durationDays: number;
  durationNights: number;
  difficulty: TrekDifficulty;
  maxAltitude: number; // in meters
  priceUSD: number;
  discountPriceUSD?: number;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  popular: boolean;
  bestSeason: string;
  groupSize: string;
  activityType: ActivityType;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gearChecklist: string[];
  permitRequirements: string;
  fitnessLevel: string;
  departureDates: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface TrekStyle {
  id: string;
  title: string;
  iconName: string;
  count: number;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  avatar: string;
  trekTaken: string;
  date: string;
  rating: number;
  review: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Visa & Permits' | 'Fitness & Altitude' | 'Logistics & Safety' | 'Booking & Payment';
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'PKR';
