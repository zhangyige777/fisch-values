'use client';

import { useState } from 'react';
import { Copy, CheckCircle, Clock, Gift, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRealTimeData } from '@/hooks/useRealTimeData';

function CodeCard({ code, onCopy }: { code: any; onCopy: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy();
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:bg-slate-750 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-cyan-400 mb-2">{code.code}</h3>
          <p className="text-gray-300 text-sm">{code.reward}</p>
        </div>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="ml-4"
        >
          {copied ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{code.status === 'working' ? 'Working' : 'Expired'}</span>
        </div>
        {code.expiredDate && (
          <div>
            Expires: {new Date(code.expiredDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}

export function CodesClient() {
  const [copyCount, setCopyCount] = useState(0);
  const { data: codes, isLoading, error, lastUpdated, refresh } = useRealTimeData({
    type: 'codes',
    updateInterval: 300000, // 5分钟更新一次
    enableAutoUpdate: true
  });

  const activeCodes = codes?.filter((code: any) => code.status === 'working' || code.status === 'active') || [];
  const expiredCodes = codes?.filter((code: any) => code.status === 'expired') || [];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-green-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <Gift className="h-16 w-16 mx-auto mb-4 text-green-400" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fisch Codes</h1>
          <p className="text-xl text-gray-300 mb-8">
            Latest working Roblox Fisch codes for December 2024. Get free C$, items, and boosts!
          </p>

          {/* 更新状态 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
              <span className="text-sm text-gray-300">
                {isLoading ? 'Updating...' : 'Live Codes'}
              </span>
            </div>
            <span className="text-sm text-gray-400">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {copyCount > 0 && (
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg px-4 py-2 mb-4">
              <p className="text-green-400">✓ {copyCount} code{copyCount > 1 ? 's' : ''} copied to clipboard!</p>
            </div>
          )}
        </div>
      </section>

      {/* Active Codes */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold">Active Codes ({activeCodes.length})</h2>
          </div>

          <div className="grid gap-4 mb-12">
            {activeCodes.map((code: any) => (
              <CodeCard
                key={code.code}
                code={code}
                onCopy={() => setCopyCount(copyCount + 1)}
              />
            ))}
          </div>

          {activeCodes.length === 0 && (
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6 text-center">
              <p className="text-yellow-400">No active codes available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Expired Codes */}
      {expiredCodes.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-400">Expired Codes</h2>
            </div>

            <div className="grid gap-4 opacity-60">
              {expiredCodes.map((code: any) => (
                <div key={code.code} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-gray-500 line-through">{code.code}</h3>
                      <p className="text-gray-500 text-sm">{code.reward}</p>
                    </div>
                    <span className="text-red-400 text-sm">Expired</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Redeem */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to Redeem Fisch Codes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-4 text-cyan-400">Step-by-Step</h3>
              <ol className="space-y-2 text-gray-300">
                <li>1. Open Fisch in Roblox</li>
                <li>2. Click the Menu button (≡)</li>
                <li>3. Look for the Twitter bird icon</li>
                <li>4. Click it and enter your code</li>
                <li>5. Press Enter to claim your reward</li>
              </ol>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-4 text-yellow-400">Pro Tips</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Codes are case-sensitive</li>
                <li>• Each code can only be used once</li>
                <li>• New codes drop during updates</li>
                <li>• Expired codes won't work</li>
                <li>• Bookmark this page for new codes!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-2">How often are new codes released?</h3>
              <p className="text-gray-300">New codes are typically released during game updates, events, holidays, or when the game reaches milestones like likes or visits.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-2">Why isn't my code working?</h3>
              <p className="text-gray-300">Make sure you typed it exactly as shown (codes are case-sensitive), check if it has expired, and ensure you haven't used it before.</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-2">What can I get from codes?</h3>
              <p className="text-gray-300">Codes can give you C$ (in-game currency), free rods, bait, enchant relics, and other exclusive items to help you progress faster.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}