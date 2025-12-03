'use client';

import { useState } from 'react';
import { sampleRods, sampleLocations, sampleBait, sampleFish } from '@/data/sample-data';
import { Button } from '@/components/ui/button';

export function CalculatorForm() {
  const [selectedRod, setSelectedRod] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBait, setSelectedBait] = useState('');
  const [weather, setWeather] = useState('clear');
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [results, setResults] = useState<any>(null);

  const calculateProfit = () => {
    // Simple calculation logic
    const rod = sampleRods.find(r => r.id === selectedRod);
    const location = sampleLocations.find(l => l.id === selectedLocation);
    const bait = sampleBait.find(b => b.id === selectedBait);

    if (!rod || !location) return;

    // Calculate casts per hour based on lure speed
    const baseCPH = 60; // Base casts per hour
    const actualCPH = baseCPH * (1 + rod.rodStats.lureSpeed / 100);

    // Calculate success rate
    const baseSuccessRate = 0.7; // 70% base
    const luckBonus = rod.rodStats.luck / 1000; // Luck gives bonus
    const weatherBonus = weather === 'aurora' ? 0.3 : 0;
    const successRate = Math.min(0.95, baseSuccessRate + luckBonus + weatherBonus);

    // Calculate average fish value
    const availableFish = sampleFish.filter(f => location.fishAvailable.includes(f.id));
    const avgFishValue = availableFish.reduce((sum, fish) => sum + fish.baseValue, 0) / availableFish.length;

    // Calculate profit
    const profitPerCast = avgFishValue * successRate * (bait ? 1 + bait.effect.preferredLuck / 100 : 1);
    const hourlyProfit = profitPerCast * actualCPH;

    // Line snap risk
    const maxFishWeight = Math.max(...availableFish.map(f => f.fishStats.maxWeight));
    const lineSnapRisk = maxFishWeight > rod.rodStats.maxKg ? 0.8 : 0.1;

    setResults({
      hourlyProfit,
      profitPerCast,
      castsPerHour: actualCPH,
      successRate: successRate * 100,
      lineSnapRisk: lineSnapRisk * 100,
      bestFish: {
        name: availableFish.reduce((best, fish) => fish.baseValue > best.baseValue ? fish : best).name,
        value: avgFishValue,
        catchRate: successRate * 100
      },
      tips: [
        lineSnapRisk > 0.5 ? 'Warning: Your rod may snap with heavier fish!' : null,
        weather === 'aurora' ? 'Aurora weather gives massive luck boost!' : null,
        bait ? `Using ${bait.name} increases catch rate` : null,
        rod.rodStats.luck > 150 ? 'High luck rod - great for rare fish!' : null,
        actualCPH > 100 ? 'Very fast casting - great for volume fishing!' : null
      ].filter(Boolean)
    });
  };

  return (
    <div className="space-y-6">
      {/* Rod Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Select Your Rod</label>
        <select
          value={selectedRod}
          onChange={(e) => setSelectedRod(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">Choose a rod...</option>
          {sampleRods.map((rod) => (
            <option key={rod.id} value={rod.id}>
              {rod.name} (Luck: +{rod.rodStats.luck}%, Speed: +{rod.rodStats.lureSpeed}%)
            </option>
          ))}
        </select>
      </div>

      {/* Location Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Fishing Location</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">Choose a location...</option>
          {sampleLocations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bait Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Bait (Optional)</label>
        <select
          value={selectedBait}
          onChange={(e) => setSelectedBait(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">No bait</option>
          {sampleBait.map((bait) => (
            <option key={bait.id} value={bait.id}>
              {bait.name} (Luck: +{bait.effect.preferredLuck})
            </option>
          ))}
        </select>
      </div>

      {/* Weather & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Weather</label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="clear">Clear</option>
            <option value="rain">Rain</option>
            <option value="fog">Fog</option>
            <option value="aurora">Aurora (Special)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Time of Day</label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="day">Day</option>
            <option value="night">Night</option>
          </select>
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        onClick={calculateProfit}
        size="lg"
        className="w-full bg-cyan-600 hover:bg-cyan-700"
        disabled={!selectedRod || !selectedLocation}
      >
        Calculate Profit
      </Button>

      {/* Quick Tips */}
      {selectedRod && (
        <div className="p-4 bg-slate-700/50 rounded-lg">
          <p className="text-sm text-gray-400">
            <strong>Selected Rod:</strong> {sampleRods.find(r => r.id === selectedRod)?.name}
            <br />
            <strong>Max Weight:</strong> {sampleRods.find(r => r.id === selectedRod)?.rodStats.maxKg.toLocaleString()}kg
          </p>
        </div>
      )}
    </div>
  );
}