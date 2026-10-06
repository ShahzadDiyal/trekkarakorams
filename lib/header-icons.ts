import {
  Compass,
  Phone,
  MessageCircle,
  Calendar,
  CalendarCheck,
  ArrowRight,
  ArrowUpRight,
  Mountain,
  MapPin,
  Send,
  Mail,
  Clock,
  Star,
  Users,
  Globe,
  Camera,
  Backpack,
  Tent,
  Plane,
  Heart,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

/**
 * Curated icon set available for header buttons in Website Settings.
 * Keys are stored in Firestore; components resolve them via `headerIcon()`.
 */
export const HEADER_ICONS: Record<string, LucideIcon> = {
  Compass,
  Phone,
  MessageCircle,
  Calendar,
  CalendarCheck,
  ArrowRight,
  ArrowUpRight,
  Mountain,
  MapPin,
  Send,
  Mail,
  Clock,
  Star,
  Users,
  Globe,
  Camera,
  Backpack,
  Tent,
  Plane,
  Heart,
  ShieldCheck,
};

export const HEADER_ICON_NAMES = Object.keys(HEADER_ICONS);

/** Resolve a stored icon key to its component; null when empty/unknown. */
export function headerIcon(name: string | undefined): LucideIcon | null {
  if (!name) return null;
  return HEADER_ICONS[name] ?? null;
}
