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

/** Live availability state for a fixed group departure. */
export type DepartureStatus = 'guaranteed' | 'available' | 'limited' | 'soldout';

export interface DepartureOption {
  date: string;
  status: DepartureStatus;
}

export const DEPARTURE_STATUS_LABEL: Record<DepartureStatus, string> = {
  guaranteed: 'Guaranteed',
  available: 'Available',
  limited: 'Limited Seats',
  soldout: 'Sold Out',
};

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
  basicPriceUSD?: number;
  standardPriceUSD?: number;
  premiumPriceUSD?: number;
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
  departures: DepartureOption[];
  /** Single-room / single-tent supplement in USD (optional; derived when absent). */
  singleSupplementUSD?: number;
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

export type Currency = 'USD' | 'EUR' | 'GBP' | 'PKR' | 'AUD';

export interface BrandValue {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface AudiencePersona {
  id: string;
  title: string;
  profile: string;
  lifestyle: string;
  motivation: string;
  painPoints: string;
  howWeHelp: string;
  dreamExperience: string;
  personaExample: string;
}
