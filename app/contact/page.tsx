import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Get In Touch With Our Team | Trek Karakoram',
  description:
    'Contact our Skardu headquarters or Islamabad coordination office for custom expedition planning, permit questions, and immediate 24/7 mountain support.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
