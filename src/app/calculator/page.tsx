import { Metadata } from 'next';
import { Calculator, DollarSign, Fish, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalculatorForm } from '@/components/CalculatorForm';
import { CalculationResults } from '@/components/CalculationResults';
import { sampleRods, sampleFish, sampleLocations } from '@/data/sample-data';

export const metadata: Metadata = {
  title: 'Fisch Calculator - Profit & Value Calculator | Fisch Tools',
  description: 'Official Fisch calculator for profit analysis and trade value. Calculate fishing earnings per hour, rod efficiency, and optimal strategies. Free online tool.',
  keywords: ['fisch calculator', 'fisch profit calculator', 'fisch trade calculator', 'fisch earnings calculator'],
  openGraph: {
    title: 'Fisch Calculator - Profit Calculator',
    description: 'Calculate your fishing profit and optimize your strategy',
    type: 'website',
    url: 'https://fischvalues.online/calculator',
  },
  alternates: {
    canonical: 'https://fischvalues.online/calculator',
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-cyan-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400">
            Fisch Calculator
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Calculate your fishing profit and optimize your strategy. Find the best rod, location, and bait for maximum earnings.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-cyan-400" />
                <h2 className="text-2xl font-bold">Setup Your Configuration</h2>
              </div>

              <CalculatorForm />
            </div>

            {/* Tips Section */}
            <div className="mt-6 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4 text-yellow-400">
                💡 Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Higher luck increases rare fish chances</li>
                <li>• Lure speed affects casts per hour</li>
                <li>• Weather conditions affect spawn rates</li>
                <li>• Some fish require specific bait</li>
                <li>• Aurora weather gives 6x global luck boost</li>
              </ul>
            </div>
          </div>

          {/* Results Display */}
          <div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-green-400" />
                <h2 className="text-2xl font-bold">Calculation Results</h2>
              </div>

              <CalculationResults />

              {/* Simulation Info */}
              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="text-sm text-gray-400">
                    <p className="font-medium mb-1">How it works:</p>
                    <p>Results are based on 10,000 simulated fishing sessions using your selected configuration. Values include base prices and average mutation multipliers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparisons */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Quick Rod Comparisons</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sampleRods.slice(0, 3).map((rod) => (
            <div key={rod.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">{rod.name}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Luck:</span>
                  <span className="font-bold text-cyan-400">+{rod.rodStats.luck}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lure Speed:</span>
                  <span className="font-bold">+{rod.rodStats.lureSpeed}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Weight:</span>
                  <span className="font-bold">{rod.rodStats.maxKg.toLocaleString()}kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Control:</span>
                  <span className="font-bold">{rod.rodStats.control}</span>
                </div>
              </div>
              {rod.passiveAbility && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-xs text-gray-400">
                    <span className="font-medium text-yellow-400">Passive:</span> {rod.passiveAbility.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Best Earning Strategies */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Best Earning Strategies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-green-400">High Volume Strategy</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Use rods with high lure speed</li>
              <li>• Focus on common/uncommon fish</li>
              <li>• Use cheap, effective bait</li>
              <li>• Best for consistent income</li>
              <li>• Recommended Rod: Rapid Rod</li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-purple-400">High Value Strategy</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Use rods with high luck</li>
              <li>• Target mythic/legendary fish</li>
              <li>• Use premium bait (Truffle Worm)</li>
              <li>• Wait for special weather events</li>
              <li>• Recommended Rod: Heaven's Rod</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}