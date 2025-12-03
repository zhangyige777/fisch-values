import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found | Fisch Values Calculator',
  description: 'The page you are looking for does not exist. Use the search or navigate to find what you need.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="px-4 py-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4 text-slate-600">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
            Try searching or use the navigation below.
          </p>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link
                href="/"
                className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <Home className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <span className="block">Home</span>
              </Link>
              <Link
                href="/fisch-codes"
                className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <span className="text-2xl mb-2 block">🎁</span>
                <span className="block">Active Codes</span>
              </Link>
              <Link
                href="/calculator"
                className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <span className="text-2xl mb-2 block">🧮</span>
                <span className="block">Calculator</span>
              </Link>
              <Link
                href="/tier-list"
                className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <span className="text-2xl mb-2 block">🏆</span>
                <span className="block">Tier List</span>
              </Link>
            </div>

            {/* Search Suggestion */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-3 text-gray-300">Looking for something specific?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Try searching for fish, rods, or locations:
              </p>
              <div className="flex gap-2 flex-wrap justify-center text-sm">
                <span className="px-3 py-1 bg-slate-700 rounded">Inferno Hide</span>
                <span className="px-3 py-1 bg-slate-700 rounded">Trident Rod</span>
                <span className="px-3 py-1 bg-slate-700 rounded">Volcanic Vents</span>
                <span className="px-3 py-1 bg-slate-700 rounded">Heaven's Rod</span>
                <span className="px-3 py-1 bg-slate-700 rounded">Megalodon</span>
                <span className="px-3 py-1 bg-slate-700 rounded">Truffle Worm</span>
              </div>
            </div>
          </div>

          {/* Return Home Button */}
          <Button asChild size="lg" className="mt-8 bg-cyan-600 hover:bg-cyan-700">
            <Link href="/">
              Go Back Home
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            Still can't find what you're looking for?{' '}
            <Link href="/faq" className="text-cyan-400 hover:text-cyan-300">
              Check our FAQ
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}