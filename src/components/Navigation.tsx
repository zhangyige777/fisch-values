'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, Calculator, Trophy, Gift, Menu, X, Search, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Calculator', href: '/calculator', icon: Calculator },
  { name: 'Tier List', href: '/tier-list', icon: Trophy },
  { name: 'Active Codes', href: '/fisch-codes', icon: Gift },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-cyan-400">🐟</span>
              <span className="text-xl font-bold">Fisch Values</span>
            </Link>

            <div className="flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-cyan-400">🐟</span>
              <span className="text-xl font-bold">Fisch Values</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="pb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="border-t border-slate-700 mt-4 pt-4">
                <Link
                  href="/faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700 transition-colors"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>FAQ</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search fish, rods, items..."
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Implement search functionality
                console.log('Search for:', e.currentTarget.value);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}