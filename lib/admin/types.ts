/**
 * Firestore document shapes used by the /admin panel.
 * Collection names are defined in lib/admin/db.ts (COLLECTIONS).
 */

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  footerAbout: string;
  announcementBar: string;
  announcementBarEnabled: boolean;
  /** Header navigation menus (each may carry one level of sub-menus). */
  headerMenus: NavMenuItem[];
  /** Header action buttons with full styling control. */
  headerButtons: HeaderButton[];
  /** Footer link columns (brand column + contact stay fixed). */
  footerColumns: FooterColumn[];
  /** Homepage hero section. */
  hero: HeroSettings;
}

/** One header nav item; `children` renders as a dropdown sub-menu. */
export interface NavMenuItem {
  label: string;
  href: string;
  children: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
}

/** A header CTA button with full visual styling. */
export interface HeaderButton {
  label: string;
  href: string;
  /** Key from lib/header-icons.ts ('' = no icon). */
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  /** px */
  borderWidth: number;
  /** px */
  borderRadius: number;
  /** px */
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700' | '800';
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface HeroSettings {
  mediaType: 'image' | 'video';
  imageUrl: string;
  videoUrl: string;
  posterUrl: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export interface HeroContent {
  bgType: 'image' | 'video';
  bgImageUrl: string;
  bgVideoUrl: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export interface AdminTrek {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  region: string;
  startingCity: string;
  durationDays: number;
  durationNights: number;
  difficulty: string;
  maxAltitude: number;
  priceUSD: number;
  discountPriceUSD?: number;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  popular: boolean;
  published: boolean;
  bestSeason: string;
  groupSize: string;
  image: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  itinerary: { day: string; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  permitRequirements: string;
  fitnessLevel: string;
}

export interface AdminBlog {
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
  /** paragraphs */
  content: string[];
  published: boolean;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  phone: string;
  whatsapp: string;
  email: string;
  order: number;
}

export interface AdminTestimonial {
  id: string;
  name: string;
  country: string;
  avatar: string;
  trekTaken: string;
  date: string;
  rating: number;
  review: string;
  verified: boolean;
}

export interface AdminFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
}

export type BookingStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled';

export interface AdminBooking {
  id: string;
  trekTitle: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  travelDate: string;
  travelers: number;
  message: string;
  status: BookingStatus;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  tags: string[];
  totalTrips: number;
  createdAt: string;
}
