'use client';

import { DollarSign, Fish, AlertTriangle, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function CalculationResults({ data }: { data?: any }) {
  if (!data) {
    return (
      <div className="text-center py-12 text-gray-400">
        <DollarSign className="h-12 w-12 mx-auto mb-4" />
        <p>Configure your setup and click calculate to see results</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ResultCard
        icon={<DollarSign className="h-6 w-6 text-green-400" />}
        title="Hourly Profit"
        value={formatCurrency(data.hourlyProfit)}
        subtitle={`C$${data.profitPerCast.toFixed(0)} per cast`}
      />

      <ResultCard
        icon={<Fish className="h-6 w-6 text-cyan-400" />}
        title="Best Fish to Catch"
        value={data.bestFish.name}
        subtitle={`${formatCurrency(data.bestFish.value)} average`}
      />

      <ResultCard
        icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
        title="Success Rate"
        value={`${data.successRate.toFixed(1)}%`}
        subtitle={`${data.castsPerHour.toFixed(0)} casts per hour`}
      />

      {data.lineSnapRisk > 50 && (
        <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-400">Line Snap Warning</h4>
              <p className="text-sm text-gray-300">
                {data.lineSnapRisk.toFixed(0)}% chance of line snapping! Consider upgrading your rod.
              </p>
            </div>
          </div>
        </div>
      )}

      {data.tips && data.tips.length > 0 && (
        <div className="p-4 bg-slate-700/50 rounded-lg">
          <h4 className="font-bold mb-3 text-yellow-400">Optimization Tips:</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {data.tips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ResultCard({ icon, title, value, subtitle }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-medium text-gray-400">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {subtitle && (
        <div className="text-sm text-gray-400 mt-1">{subtitle}</div>
      )}
    </div>
  );
}