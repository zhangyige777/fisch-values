import { Metadata } from 'next';
import { CodesClient } from './CodesClient';

export const metadata: Metadata = {
  title: 'Fisch Codes (December 2024) | Latest Working Codes List',
  description: 'Active Fisch Roblox codes for December 2024. Get free C$, items, and boosts. All codes tested and updated regularly. Working codes list with rewards.',
  keywords: ['fisch codes', 'roblox fisch codes', 'fisch codes 2024', 'codes for fisch', 'fisch working codes'],
  openGraph: {
    title: 'Fisch Codes - Latest Working Codes',
    description: 'Get free C$ and items with our updated Fisch codes list',
    type: 'website',
    url: 'https://fischvalues.online/fisch-codes',
  },
  alternates: {
    canonical: 'https://fischvalues.online/fisch-codes',
  },
};

export default function FischCodesPage() {
  return <CodesClient />;
}