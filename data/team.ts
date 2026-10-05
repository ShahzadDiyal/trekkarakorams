/**
 * Team members shown in the "Meet Our Team" section.
 *
 * HOW TO ADD A MEMBER
 * 1. Drop their photo into `public/images/team/` (e.g. `public/images/team/shahzad.jpg`).
 * 2. Add an entry below with `image: '/images/team/shahzad.jpg'`.
 * 3. Leave `image` empty to show an initials avatar instead.
 *
 * Contact fields are all optional — only the ones you fill in will render.
 */
export interface TeamMember {
  name: string;
  title: string;
  /** Path under /public, e.g. '/images/team/shahzad.jpg'. Leave '' for initials avatar. */
  image?: string;
  /** Short bio shown on the card (1–2 lines). */
  bio?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Team Member Name',
    title: 'Founder & Managing Director',
    image: '',
    bio: 'Leads every expedition personally, from the first briefing in Skardu to the final summit push.',
    phone: '+92 300 0000000',
    whatsapp: '+92 300 0000000',
    email: 'info@trekkarakoram.com',
  },
  {
    name: 'Team Member Name',
    title: 'Lead Mountain Guide',
    image: '',
    bio: 'Certified high-altitude guide with 15+ seasons on K2, Broad Peak and the Baltoro Glacier.',
    phone: '+92 300 0000000',
    whatsapp: '+92 300 0000000',
    email: 'info@trekkarakoram.com',
  },
  {
    name: 'Team Member Name',
    title: 'Operations Manager',
    image: '',
    bio: 'Runs permits, logistics and base-camp operations so every trek departs on schedule.',
    phone: '+92 300 0000000',
    email: 'info@trekkarakoram.com',
  },
];
