import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sampleLocations, sampleFish, sampleBait } from '@/data/sample-data';
import { getRarityColor } from '@/lib/utils';
import { ArrowLeft, MapPin, Cloud, Sun, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return sampleLocations.map((location) => ({
    id: location.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = sampleLocations.find((l) => l.id === params.id);

  if (!location) {
    return {
      title: 'Location Not Found | Fisch Database',
    };
  }

  return {
    title: `${location.name} | Fisch Fishing Location Guide`,
    description: `Complete guide for ${location.name} in Fisch. Available fish: ${location.fishAvailable.length}. Weather effects: ${location.weatherEffects ? 'Rainy, Foggy, Clear weather bonuses' : 'Standard weather'}. Requirements: ${location.requirements ? 'Level requirement needed' : 'No requirements'}.`,
    keywords: [
      `${location.name.toLowerCase()} location fisch`,
      `fisch fishing spots`,
      `${location.name.toLowerCase()} fish`,
      `best location for fisch`,
      `fisch weather effects`
    ],
    openGraph: {
      title: `${location.name} - Fisch Location Guide`,
      description: `Complete ${location.name} fishing guide with available fish and weather effects`,
    },
  };
}

export default function LocationDetailPage({ params }: Props {
  const location = sampleLocations.find((l) => l.id === params.id);

  if (!location) {
    notFound();
  }

  const availableFish = sampleFish.filter(fish => location.fishAvailable.includes(fish.id));
  const rareFish = availableFish.filter(f => f.rarity === 'legendary' || f.rarity === 'mythic');
  const commonFish = availableFish.filter(f => f.rarity === 'common' || f.rarity === 'uncommon');

  const weatherEffects = location.weatherEffects || {};

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
            <h1 className="text-4xl font-bold mb-4">{location.name}</h1>
            <p className="text-gray-300 mb-6">{location.description}</p>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Fish Types</div>
                <div className="text-2xl font-bold">{location.fishAvailable.length}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Rare Fish</div>
                <div className="text-2xl font-bold text-yellow-400">{rareFish.length}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Weather Effects</div>
                <div className="text-2xl font-bold">{Object.keys(weatherEffects).length}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Requirements</div>
                <div className="text-xl font-bold capitalize">
                  {location.requirements ? 'Yes' : 'None'}
                </div>
              </div>
            </div>

            {/* Requirements */}
            {location.requirements && (
              <div className="bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-600/30">
                <h3 className="font-bold mb-3 text-yellow-400">Requirements</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {location.requirements.level && (
                    <div>
                      <span className="text-gray-400">Level:</span> {location.requirements.level}+
                    </div>
                  )}
                  {location.requirements.item && (
                    <div>
                      <span className="text-gray-400">Item:</span> {location.requirements.item.replace('-', ' ')}
                    </div>
                  )}
                  {location.requirements.cost && (
                    <div>
                      <span className="text-gray-400">Cost:</span> ${location.requirements.cost.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button className="w-full md:w-auto">
              Fish Here
            </Button>
          </div>
        </div>
      </section>

      {/* Weather Effects */}
      {Object.keys(weatherEffects).length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Weather Effects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {weatherEffects.rain && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-blue-400" />
                    Rain
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">Increased spawn rate for:</p>
                  <div className="flex flex-wrap gap-2">
                    {weatherEffects.rain.map((fishId, index) => {
                      const fish = sampleFish.find(f => f.id === fishId);
                      return fish ? (
                        <Link
                          key={index}
                          href={`/fish/${fishId}`}
                          className="px-2 py-1 bg-slate-700 rounded text-sm hover:bg-slate-600"
                        >
                          {fish.name}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {weatherEffects.fog && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-gray-400" />
                    Fog
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">Increased spawn rate for:</p>
                  <div className="flex flex-wrap gap-2">
                    {weatherEffects.fog.map((fishId, index) => {
                      const fish = sampleFish.find(f => f.id === fishId);
                      return fish ? (
                        <Link
                          key={index}
                          href={`/fish/${fishId}`}
                          className="px-2 py-1 bg-slate-700 rounded text-sm hover:bg-slate-600"
                        >
                          {fish.name}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {weatherEffects.clear && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-400" />
                    Clear
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">Increased spawn rate for:</p>
                  <div className="flex flex-wrap gap-2">
                    {weatherEffects.clear.map((fishId, index) => {
                      const fish = sampleFish.find(f => f.id === fishId);
                      return fish ? (
                        <Link
                          key={index}
                          href={`/fish/${fishId}`}
                          className="px-2 py-1 bg-slate-700 rounded text-sm hover:bg-slate-600"
                        >
                          {fish.name}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {weatherEffects.aurora && (
                <div className="bg-slate-800 rounded-lg p-4 border border-purple-600/30">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-400" />
                    Aurora
                  </h3>
                  <p className="text-sm text-gray-300">All fish spawn rate doubled!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Available Fish */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Available Fish ({availableFish.length})</h2>

          {/* Filter tabs */}
          <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg">
              All ({availableFish.length})
            </button>
            <button className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600">
              Common ({commonFish.length})
            </button>
            <button className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600">
              Rare ({rareFish.length})
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableFish.map((fish) => (
              <div key={fish.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <Link href={`/fish/${fish.id}`} className="block">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold hover:text-cyan-400 transition-colors">
                      {fish.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRarityColor(fish.rarity)}`}>
                      {fish.rarity}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Value:</span>
                      <span>${fish.baseValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Weight:</span>
                      <span>{fish.fishStats.minWeight}-{fish.fishStats.maxWeight}kg</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      {location.tips && location.tips.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Fishing Tips</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <ul className="space-y-2 text-gray-300">
                {location.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Best Rods for this Location */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Recommended Rods</h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-bold mb-2 text-green-400">Beginner Friendly</h3>
                <p className="text-sm text-gray-300">Good for starting out and catching common fish</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-bold mb-2 text-yellow-400">Balanced</h3>
                <p className="text-sm text-gray-300">Decent luck and speed for variety fishing</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-bold mb-2 text-purple-400">High Value</h3>
                <p className="text-sm text-gray-300">Maximum luck for rare and mythic fish</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}