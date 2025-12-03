import { Metadata } from 'next';
import Link from 'next/link';
import { ValueListTable } from '@/components/ValueListTable';
import { QuickStats } from '@/components/QuickStats';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calculator, Trophy, Fish } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fisch Value List - Complete Fish & Item Prices | Fisch Database',
  description: 'Complete Fisch value list with all fish prices, rod values, and item costs. Real-time updated database with over 300+ items. Find the most valuable fish and items in Fisch.',
  keywords: ['fisch value list', 'fisch fish prices', 'fisch item values', 'fisch database', 'fisch calculator'],
  openGraph: {
    title: 'Fisch Value List - Complete Database',
    description: 'Find all Fisch fish values, rod prices, and optimize your fishing strategy',
    type: 'website',
    url: 'https://fischvalues.online',
  },
  alternates: {
    canonical: 'https://fischvalues.online',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-slate-800 to-slate-900">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400">
          Fisch Value List
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Complete database of all Fisch fish values, rod prices, and item costs.
          Real-time updated database with over 300+ items. Find the most valuable fish and items in Fisch.
        </p>

        {/* Quick Stats */}
        <QuickStats />

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/calculator">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              <Calculator className="mr-2 h-5 w-5" />
              Calculator
            </Button>
          </Link>
          <Link href="/tier-list">
            <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10">
              <Trophy className="mr-2 h-5 w-5" />
              Tier List
            </Button>
          </Link>
          <Link href="/fisch-codes">
            <Button size="lg" variant="outline" className="border-green-600 text-green-400 hover:bg-green-600/10">
              <TrendingUp className="mr-2 h-5 w-5" />
              Active Codes
            </Button>
          </Link>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar placeholder="Search for fish, rods, items..." />
      </section>

      {/* Value List Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Complete Value List</h2>
          <p className="text-gray-400">
            Find the value of any item in Fisch. Filter by category and sort by value or rarity.
          </p>
        </div>

        <ValueListTable />
      </section>

      {/* Featured Items */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Items</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <Fish className="h-8 w-8 text-cyan-400 mr-3" />
              <h3 className="text-xl font-bold">Most Valuable Fish</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Discover the highest value fish in Fisch and learn where to catch them.
            </p>
            <Link href="/fish/most-valuable">
              <Button variant="outline" className="w-full">
                View Top Fish
              </Button>
            </Link>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <Calculator className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-xl font-bold">Profit Calculator</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Calculate your hourly earnings with our advanced fishing calculator.
            </p>
            <Link href="/calculator">
              <Button variant="outline" className="w-full">
                Calculate Now
              </Button>
            </Link>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <Trophy className="h-8 w-8 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold">Rod Tier List</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Find out which rods are the best and optimize your fishing strategy.
            </p>
            <Link href="/tier-list">
              <Button variant="outline" className="w-full">
                View Rankings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-cyan-400">
              How are fish values calculated?
            </h3>
            <p className="text-gray-300">
              Fish values are calculated based on their base price, weight multiplier, and any mutations.
              Use our calculator to see the exact value with your current setup.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-cyan-400">
              How often are prices updated?
            </h3>
            <p className="text-gray-300">
              We update our database regularly to ensure accuracy. All prices reflect the current game values.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-cyan-400">
              What affects fish value?
            </h3>
            <p className="text-gray-300">
              Fish value is affected by base price, weight, mutations (shiny, colossal, etc.),
              and special variants. Some locations also have value multipliers.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-cyan-400">
              Can I use this on mobile?
            </h3>
            <p className="text-gray-300">
              Yes! Fisch Values Calculator is fully responsive and works perfectly on mobile devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
