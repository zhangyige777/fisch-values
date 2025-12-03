import { Metadata } from 'next';
import { FAQClient } from './FAQClient';

export const metadata: Metadata = {
  title: 'Fisch FAQ - Frequently Asked Questions | Complete Guide',
  description: 'Find answers to the most common questions about Fisch Roblox game. Learn about fish values, best rods, codes, locations, and gameplay mechanics.',
  keywords: ['fisch faq', 'fisch questions', 'fisch help', 'fisch guide', 'roblox fisch tips'],
  openGraph: {
    title: 'Fisch FAQ - Complete Guide',
    description: 'Frequently asked questions about Fisch game',
    url: 'https://fischvalues.online/faq',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}