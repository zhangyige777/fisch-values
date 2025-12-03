import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sampleBait, sampleFish, sampleLocations } from '@/data/sample-data';
import { formatCurrency, formatDate, getRarityColor } from '@/lib/utils';
import { ArrowLeft, Package, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return sampleBait.map((bait) => ({
    id: bait.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bait = sampleBait.find((b) => b.id === params.id);

  if (!bait) {
    return {
      title: 'Bait Not Found | Fisch Database',
    };
  }

  return {
    title: `${bait.name} | Fisch Bait Guide`,
    description: `Complete guide for ${bait.name} bait in Fisch. +${bait.effect.preferredLuck} preferred luck. Best for: ${bait.bestFor.join(', ')}. Source: ${bait.source}.`,
    keywords: [
      `${bait.name.toLowerCase()} bait`,
      `fisch bait guide`,
      `${bait.name.toLowerCase()} preferred luck`,
      `best bait fisch`,
      `how to get ${bait.name.toLowerCase()}`
    ],
    openGraph: {
      title: `${bait.name} - Fisch Bait Guide`,
      description: `Complete ${bait.name} bait guide with effects and usage tips`,
    },
  };
}

export default function BaitDetailPage({ params }: Props) {
  const bait = sampleBait.find((b) => b.id === params.id);

  if (!bait) {
    notFound();
  }

  const bestFish = sampleFish.filter(fish =>
    bait.bestFor.includes(fish.id) || fish.fishStats.preferredBait?.includes(bait.id)
  ).slice(0, 6);

  const relatedBait = sampleBait
    .filter(b => b.id !== bait.id && b.rarity === bait.rarity)
    .slice(0, 3);

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
                <h1 className="text-4xl font-bold mb-2">{bait.name}</h1>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(bait.rarity)}`}>
                    {bait.rarity}
                  </span>
                  <span className="text-gray-400">Category: Bait</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Price per unit</div>
                <div className="text-2xl font-bold">{formatCurrency(bait.baseValue)}</div>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{bait.description}</p>

            {/* Effects Display */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Effects
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Preferred Luck</span>
                    <span className="font-bold text-green-400">+{bait.effect.preferredLuck}</span>
                  </div>
                  {bait.effect.speedModifier && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Speed Modifier</span>
                      <span className="font-bold">{bait.effect.speedModifier > 0 ? '+' : ''}{bait.effect.speedModifier}%</span>
                    </div>
                  )}
                  {bait.effect.specialEffect && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Special Effect</span>
                      <span className="font-bold text-purple-400">{bait.effect.specialEffect}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-cyan-400" />
                  Source
                </h3>
                <p className="text-gray-300">{bait.source}</p>
              </div>
            </div>

            <Button className="w-full md:w-auto">
              Add to Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Best Fish */}
      {bestFish.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Best Fish to Catch</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bestFish.map((fish) => (
                <div key={fish.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <Link href={`/fish/${fish.id}`} className="block">
                    <h3 className="font-bold mb-2 hover:text-cyan-400 transition-colors">
                      {fish.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Value:</span>
                        <span>{formatCurrency(fish.baseValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Weight:</span>
                        <span>{fish.fishStats.maxWeight}kg max</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rarity:</span>
                        <span className={getRarityColor(fish.rarity)}>{fish.rarity}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Usage Tips */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Usage Tips</h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3 text-green-400">When to Use</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {bait.effect.preferredLuck > 200 && <li>• Perfect for catching rare/mythic fish</li>}
                  {bait.effect.preferredLuck > 100 && <li>• Good for legendary fish hunting</li>}
                  {bait.effect.speedModifier && bait.effect.speedModifier > 0 && <li>• Increases fishing speed</li>}
                  {bait.effect.specialEffect?.includes('Boss') && <li>• Attracts boss-level fish</li>}
                  {bait.rarity === 'exotic' && <li>• Save for special occasions</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-yellow-400">Cost Efficiency</h3>
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-1">Cost per use</div>
                  <div className="text-2xl font-bold">{formatCurrency(bait.baseValue)}</div>
                </div>
                <p className="text-sm text-gray-300">
                  {bait.baseValue < 200 && "Very cost-effective for regular fishing"}
                  {bait.baseValue >= 200 && bait.baseValue < 800 && "Moderate cost, use for valuable fish"}
                  {bait.baseValue >= 800 && "Premium bait, save for high-value targets"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Locations */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Recommended Locations</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {sampleLocations.slice(0, 3).map((location) => (
              <div key={location.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <Link href={`/location/${location.id}`} className="block">
                  <h3 className="font-bold mb-2 hover:text-cyan-400 transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{location.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Fish types:</span>
                    <span className="text-gray-500">{location.fishAvailable.length}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Bait */}
      {relatedBait.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Similar {bait.rarity} Bait</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedBait.map((relatedBait) => (
                <div key={relatedBait.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <Link href={`/bait/${relatedBait.id}`} className="block">
                    <h3 className="font-bold mb-2 hover:text-cyan-400 transition-colors">
                      {relatedBait.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Luck:</span>
                        <span>+{relatedBait.effect.preferredLuck}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span>{formatCurrency(relatedBait.baseValue)}</span>
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