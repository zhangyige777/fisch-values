import { Metadata } from 'next';
import { Trophy, Star, Info } from 'lucide-react';
import { sampleRods } from '@/data/sample-data';
import { formatCurrency, getRarityColor } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Best Rods in Fisch - Complete Rod Tier List | Fisch Tools',
  description: 'Ultimate tier list of all rods in Fisch. Ranked from S-tier to F-tier based on stats, value, and effectiveness. Find the best rod for your level and playstyle.',
  keywords: ['best rods in fisch', 'fisch rod tier list', 'fisch best rod', 'fisch rod ranking', 'top rods fisch'],
  openGraph: {
    title: 'Fisch Rod Tier List - Best Rods Ranked',
    description: 'Find the best rod for your playstyle with our comprehensive tier list',
    type: 'website',
    url: 'https://fischvalues.online/tier-list',
  },
  alternates: {
    canonical: 'https://fischvalues.online/tier-list',
  },
};

export default function TierListPage() {
  // Define tier list rankings
  const tierList = {
    S: [
      {
        id: 'ethereal-prism-rod',
        name: "Ethereal Prism Rod",
        rating: 9.8,
        reason: "50% chance for 8x value (Prismize)",
        stats: { luck: 195, speed: 95, control: 85, maxKg: 10000 }
      }
    ],
    A: [
      {
        id: 'rod-eternal-king',
        name: "Rod of the Eternal King",
        rating: 9.2,
        reason: "35% chance for 4x value (Greedy)",
        stats: { luck: 160, speed: 50, control: 90, maxKg: 10000 }
      },
      {
        id: 'heavens-rod',
        name: "Heaven's Rod",
        rating: 8.9,
        reason: "35% chance for 6x value (Heavenly)",
        stats: { luck: 225, speed: 30, control: 70, maxKg: 3000 }
      }
    ],
    B: [
      {
        id: 'no-life-rod',
        name: "No-Life Rod",
        rating: 8.1,
        reason: "90% lure speed, 1.5x value (Hexed)",
        stats: { luck: 105, speed: 90, control: 80, maxKg: 7500 }
      },
      {
        id: 'trident-rod',
        name: "Trident Rod",
        rating: 7.8,
        reason: "3x value (Atlantean), stun ability",
        stats: { luck: 100, speed: 20, control: 80, maxKg: 5000 }
      }
    ],
    C: [
      {
        id: 'aurora-rod',
        name: "Aurora Rod",
        rating: 7.2,
        reason: "Amazing during aurora weather",
        stats: { luck: 150, speed: 40, control: 85, maxKg: 3500 }
      },
      {
        id: 'destiny-rod',
        name: "Destiny Rod",
        rating: 6.9,
        reason: "250% luck for rare mutations",
        stats: { luck: 250, speed: -10, control: 75, maxKg: 4000 }
      }
    ],
    D: [
      {
        id: 'magnet-rod',
        name: "Magnet Rod",
        rating: 5.5,
        reason: "Good for crates, not fishing",
        stats: { luck: 0, speed: 55, control: 60, maxKg: 0 }
      },
      {
        id: 'carbon-rod',
        name: "Carbon Rod",
        rating: 4.8,
        reason: "Decent beginner rod",
        stats: { luck: 25, speed: -10, control: 50, maxKg: 500 }
      }
    ]
  };

  const getTierColor = (tier: string) => {
    const colors = {
      S: 'border-red-500 bg-red-500/10',
      A: 'border-orange-500 bg-orange-500/10',
      B: 'border-yellow-500 bg-yellow-500/10',
      C: 'border-green-500 bg-green-500/10',
      D: 'border-blue-500 bg-blue-500/10'
    };
    return colors[tier as keyof typeof colors] || 'border-gray-500 bg-gray-500/10';
  };

  const getTierDescription = (tier: string) => {
    const descriptions = {
      S: "Meta-defining, best in game",
      A: "Excellent choice, core meta",
      B: "Good for specific uses",
      C: "Average performance",
      D: "Below average, situational"
    };
    return descriptions[tier as keyof typeof descriptions] || "Unknown tier";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-yellow-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
            Best Rods in Fisch
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Complete tier list ranking all rods from best to worst. Find the perfect rod for your playstyle and budget.
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>Last Updated: December 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Legend */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-cyan-400" />
            Tier Rankings Explained
          </h2>
          <div className="grid md:grid-cols-5 gap-4 text-sm">
            {Object.entries(tierList).map(([tier]) => (
              <div key={tier} className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded font-bold text-lg ${getTierColor(tier)}`}>
                  {tier}
                </span>
                <span className="text-gray-400">{getTierDescription(tier)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier List */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {Object.entries(tierList).map(([tier, rods]) => (
            <div key={tier} className={`${getTierColor(tier)} border-2 rounded-lg`}>
              <div className="px-6 py-4 border-b border-current/20">
                <h2 className={`text-3xl font-bold flex items-center gap-3`}>
                  <Trophy className="h-8 w-8" />
                  Tier {tier} - {getTierDescription(tier)}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rods.map((rod) => (
                    <RodCard key={rod.id} rod={rod} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rod Comparison Table */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Detailed Comparison</h2>
        <div className="overflow-x-auto bg-slate-800 rounded-lg border border-slate-700">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700">
                <th className="px-4 py-3 text-left">Rod</th>
                <th className="px-4 py-3 text-center">Rating</th>
                <th className="px-4 py-3 text-center">Luck</th>
                <th className="px-4 py-3 text-center">Speed</th>
                <th className="px-4 py-3 text-center">Control</th>
                <th className="px-4 py-3 text-center">Max KG</th>
                <th className="px-4 py-3 text-left">Special</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {Object.entries(tierList).flatMap(([tier, rods]) =>
                rods.map((rod, index) => (
                  <tr key={rod.id} className="hover:bg-slate-700/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getTierColor(tier)}`}>
                          {tier}
                        </span>
                        <span className="font-medium">{rod.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-bold">{rod.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-mono">+{rod.stats.luck}%</td>
                    <td className="px-4 py-3 text-center font-mono">+{rod.stats.speed}%</td>
                    <td className="px-4 py-3 text-center font-mono">{rod.stats.control}</td>
                    <td className="px-4 py-3 text-center font-mono">{rod.stats.maxKg.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{rod.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recommendations */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Our Recommendations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-green-400">Best for Beginners</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Carbon Rod - Cheap upgrade</li>
              <li>• Destiny Rod - Great for mutations</li>
              <li>• No-Life Rod - Fast XP farming</li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-yellow-400">Best for Money</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Heaven's Rod - High value multiplier</li>
              <li>• Rod of Eternal King - Consistent earnings</li>
              <li>• Ethereal Prism Rod - Ultimate choice</li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-purple-400">Best for Endgame</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Ethereal Prism Rod - Best overall</li>
              <li>• Aurora Rod - Weather dependent</li>
              <li>• Rod of Depths - Deep sea fishing</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function RodCard({ rod }: { rod: any }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg">{rod.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="font-mono text-sm">{rod.rating}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Luck:</span>
          <span className="font-bold text-cyan-400">+{rod.stats.luck}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Speed:</span>
          <span className="font-bold">+{rod.stats.speed}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Control:</span>
          <span className="font-bold">{rod.stats.control}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Max KG:</span>
          <span className="font-bold">{rod.stats.maxKg.toLocaleString()}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-700">
        <p className="text-xs text-gray-400">{rod.reason}</p>
      </div>
    </div>
  );
}