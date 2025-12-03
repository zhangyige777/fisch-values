import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sampleRods, sampleBait, sampleLocations } from '@/data/sample-data';
import { formatCurrency, formatDate, getRarityColor } from '@/lib/utils';
import { ArrowLeft, Star, Target, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return sampleRods.map((rod) => ({
    id: rod.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rod = sampleRods.find((r) => r.id === params.id);

  if (!rod) {
    return {
      title: 'Rod Not Found | Fisch Database',
    };
  }

  return {
    title: `${rod.name} Value: ${formatCurrency(rod.baseValue || 0)} | Best Fisch Rod`,
    description: `Complete guide for ${rod.name} in Fisch. Stats: +${rod.rodStats.luck}% luck, ${rod.rodStats.lureSpeed}% speed, ${rod.rodStats.maxKg}kg max weight. Best use case: ${rod.bestUseCase || 'General fishing'}.`,
    keywords: [
      `${rod.name.toLowerCase()} value`,
      `${rod.name.toLowerCase()} price fisch`,
      `fisch rod value`,
      `how to get ${rod.name.toLowerCase()}`,
      `${rod.name.toLowerCase()} stats`,
      `best fisch rods`
    ],
    openGraph: {
      title: `${rod.name} - Fisch Rod Guide`,
      description: `Complete ${rod.name} guide with stats, value, and usage tips`,
    },
  };
}

export default function RodDetailPage({ params }: Props) {
  const rod = sampleRods.find((r) => r.id === params.id);

  if (!rod) {
    notFound();
  }

  const bestLocations = sampleLocations.filter(loc =>
    loc.fishAvailable.some(fish => {
      const fishData = sampleBait.find(b => b.id === fish);
      return fishData && fishData.baseValue > 1000; // High value fish
    })
  ).slice(0, 3);

  const relatedRods = sampleRods
    .filter(r => r.id !== rod.id && r.rarity === rod.rarity)
    .slice(0, 3);

  const statBars = [
    { label: 'Luck', value: rod.rodStats.luck, max: 250, icon: <Star className="h-4 w-4" />, color: 'text-yellow-400' },
    { label: 'Speed', value: rod.rodStats.lureSpeed, max: 100, icon: <Zap className="h-4 w-4" />, color: 'text-cyan-400' },
    { label: 'Control', value: rod.rodStats.control, max: 100, icon: <Target className="h-4 w-4" />, color: 'text-green-400' },
    { label: 'Resilience', value: rod.rodStats.resilience, max: 100, icon: <Shield className="h-4 w-4" />, color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Breadcrumb */}
      <nav className="py-4 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Value List
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{rod.name}</h1>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(rod.rarity)}`}>
                    {rod.rarity}
                  </span>
                  <span className="text-gray-400">Category: Rod</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Base Value</div>
                <div className="text-2xl font-bold">{formatCurrency(rod.baseValue || 0)}</div>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{rod.description}</p>

            {/* Stats Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {statBars.map((stat) => (
                <div key={stat.label} className="bg-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={stat.color}>{stat.icon}</span>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <div className="font-bold">
                    +{stat.value}%{stat.label === 'Luck' || stat.label === 'Speed' ? '' : ''}
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${stat.label === 'Luck' ? 'bg-yellow-400' : stat.label === 'Speed' ? 'bg-cyan-400' : stat.label === 'Control' ? 'bg-green-400' : 'bg-purple-400'}`}
                      style={{ width: `${(stat.value / stat.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Max Weight</div>
                <div className="font-bold text-xl">{rod.rodStats.maxKg.toLocaleString()}kg</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Best Use</div>
                <div className="font-bold text-sm">{rod.bestUseCase || 'General fishing'}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Tier</div>
                <div className="font-bold capitalize">{rod.rarity}</div>
              </div>
            </div>

            {/* Passive Ability */}
            {rod.passiveAbility && (
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-4 mb-6 border border-purple-600/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-400" />
                  Passive Ability: {rod.passiveAbility.name}
                </h3>
                <p className="text-gray-300">{rod.passiveAbility.description}</p>
                {rod.passiveAbility.multiplier && (
                  <p className="text-purple-400 font-medium mt-2">
                    Value Multiplier: {rod.passiveAbility.multiplier}x
                  </p>
                )}
              </div>
            )}

            <Button className="w-full md:w-auto">
              Add to Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Requirements */}
      {rod.requirements && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">How to Get</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="grid md:grid-cols-3 gap-4">
                {rod.requirements.level && (
                  <div>
                    <h3 className="font-medium text-gray-400 mb-1">Required Level</h3>
                    <p className="text-xl">Level {rod.requirements.level}</p>
                  </div>
                )}
                {rod.requirements.quest && (
                  <div>
                    <h3 className="font-medium text-gray-400 mb-1">Quest</h3>
                    <p className="text-xl">{rod.requirements.quest}</p>
                  </div>
                )}
                {rod.requirements.cost && (
                  <div>
                    <h3 className="font-medium text-gray-400 mb-1">Cost</h3>
                    <p className="text-xl">{formatCurrency(rod.requirements.cost)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Best Fishing Spots */}
      {bestLocations.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Best Fishing Spots</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {bestLocations.map((location) => (
                <div key={location.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <Link href={`/location/${location.id}`} className="block">
                    <h3 className="font-bold mb-2 hover:text-cyan-400 transition-colors">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{location.description}</p>
                    <div className="text-xs text-gray-500">
                      {location.fishAvailable.length} fish types available
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tips & Strategies */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Tips & Strategies</h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3 text-green-400">Strengths</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {rod.rodStats.luck > 100 && <li>• Excellent luck for rare fish</li>}
                  {rod.rodStats.lureSpeed > 50 && <li>• Fast casting rate</li>}
                  {rod.rodStats.control > 80 && <li>• High control for difficult fish</li>}
                  {rod.rodStats.resilience > 80 && <li>• Great resilience against fish struggling</li>}
                  {rod.rodStats.maxKg > 5000 && <li>• Can catch heavy fish</li>}
                  {rod.passiveAbility && <li>• Strong passive ability</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-red-400">Weaknesses</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {rod.rodStats.luck < 50 && <li>• Low luck rate</li>}
                  {rod.rodStats.lureSpeed < 0 && <li>• Slow casting speed</li>}
                  {rod.rodStats.control < 50 && <li>• Low control</li>}
                  {rod.rodStats.resilience < 50 && <li>• May struggle with strong fish</li>}
                  {rod.rodStats.maxKg < 1000 && <li>• Cannot catch heavy fish</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rods */}
      {relatedRods.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Similar {rod.rarity} Rods</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedRods.map((relatedRod) => (
                <div key={relatedRod.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <Link href={`/rod/${relatedRod.id}`} className="block">
                    <h3 className="font-bold mb-2 hover:text-cyan-400 transition-colors">
                      {relatedRod.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Luck:</span>
                        <span>+{relatedRod.rodStats.luck}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Speed:</span>
                        <span>+{relatedRod.rodStats.lureSpeed}%</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}