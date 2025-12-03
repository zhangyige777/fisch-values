import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sampleFish } from '@/data/sample-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, MapPin, Clock, Weight, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  params: { id: string };
}

// Generate static params for all fish
export async function generateStaticParams() {
  return sampleFish.map((fish) => ({
    id: fish.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fish = sampleFish.find((f) => f.id === params.id);

  if (!fish) {
    return {
      title: 'Fish Not Found | Fisch Database',
    };
  }

  const maxValue = fish.baseValue * Math.max(...Object.values(fish.mutations));

  return {
    title: `${fish.name} Value: ${formatCurrency(fish.baseValue)} | Fisch Fish Price Guide`,
    description: `${fish.name} - Complete information including value, location, and catching guide. ${fish.name} is worth ${formatCurrency(fish.baseValue)} in Fisch. Found at: ${fish.fishStats.locations.join(', ')}.`,
    keywords: [
      `${fish.name.toLowerCase()} value`,
      `${fish.name.toLowerCase()} price fisch`,
      `fisch fish value`,
      `how much is ${fish.name.toLowerCase()} worth`,
      `${fish.name.toLowerCase()} location`,
      `fisch ${fish.category.toLowerCase()} database`
    ],
    openGraph: {
      title: `${fish.name} - Fisch Database`,
      description: `Complete ${fish.name} guide with locations, value, and catching tips`,
      images: [{
        url: `/images/fish/${fish.id}.png`,
        width: 1200,
        height: 630,
        alt: fish.name,
      }],
    },
  };
}

export default function FishDetailPage({ params }: Props) {
  const fish = sampleFish.find((f) => f.id === params.id);

  if (!fish) {
    notFound();
  }

  const maxValue = fish.baseValue * Math.max(...Object.values(fish.mutations));
  const relatedFish = sampleFish
    .filter(f => f.id !== fish.id && f.rarity === fish.rarity)
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
                <h1 className="text-4xl font-bold mb-2">{fish.name}</h1>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(fish.rarity)}`}>
                    {fish.rarity}
                  </span>
                  <span className="text-gray-400">Category: Fish</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Base Value</div>
                <div className="text-2xl font-bold">{formatCurrency(fish.baseValue)}</div>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{fish.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Weight Range</div>
                <div className="font-bold">{fish.fishStats.minWeight} - {fish.fishStats.maxWeight}kg</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Max Value</div>
                <div className="font-bold text-green-400">{formatCurrency(maxValue)}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Time</div>
                <div className="font-bold capitalize">{fish.fishStats.time}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Season</div>
                <div className="font-bold capitalize">{fish.fishStats.season?.join('/') || 'Any'}</div>
              </div>
            </div>

            <Button className="w-full md:w-auto">
              <Gift className="mr-2 h-5 w-5" />
              Add to Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Location Info */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-400" />
              Locations
            </h2>
            <div className="space-y-3">
              {fish.fishStats.locations.map((location) => (
                <div key={location} className="flex items-center justify-between">
                  <span className="capitalize">{location.replace('-', ' ')}</span>
                  <Link
                    href={`/location/${location}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
            {fish.fishStats.weather && fish.fishStats.weather.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <h3 className="font-medium mb-2">Best Weather</h3>
                <div className="flex gap-2 flex-wrap">
                  {fish.fishStats.weather.map((weather) => (
                    <span key={weather} className="px-2 py-1 bg-slate-700 rounded text-sm capitalize">
                      {weather}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bait & Catching Info */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-4">Catching Guide</h2>
            {fish.fishStats.preferredBait && fish.fishStats.preferredBait.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Best Bait</h3>
                <div className="space-y-1">
                  {fish.fishStats.preferredBait.map((bait) => (
                    <div key={bait} className="capitalize text-gray-300">
                      {bait.replace('-', ' ')}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {fish.tips && fish.tips.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Tips</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {fish.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mutation Values */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Mutation Values</h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-3">Mutation</th>
                  <th className="pb-3">Multiplier</th>
                  <th className="pb-3">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {Object.entries(fish.mutations).map(([mutation, multiplier]) => (
                  <tr key={mutation}>
                    <td className="py-3 capitalize">{mutation.replace(/([A-Z])/g, ' $1').trim()}</td>
                    <td className="py-3">{multiplier}x</td>
                    <td className="py-3 font-mono text-green-400">
                      {formatCurrency(fish.baseValue * multiplier)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related Fish */}
      {relatedFish.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Similar {fish.rarity} Fish</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedFish.map((relatedFish) => (
                <div key={relatedFish.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <Link href={`/fish/${relatedFish.id}`} className="block">
                    <h3 className="font-bold mb-2 hover:text-cyan-400 transition-colors">
                      {relatedFish.name}
                    </h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Value:</span>
                      <span>{formatCurrency(relatedFish.baseValue)}</span>
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

function getRarityColor(rarity: string): string {
  const colors = {
    common: 'bg-gray-600',
    uncommon: 'bg-green-600',
    rare: 'bg-blue-600',
    epic: 'bg-purple-600',
    legendary: 'bg-orange-600',
    mythic: 'bg-red-600',
    exotic: 'bg-yellow-600',
  };
  return colors[rarity as keyof typeof colors] || 'bg-gray-600';
}