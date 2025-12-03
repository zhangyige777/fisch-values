import { Metadata } from 'next';
import { Copy, CheckCircle, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { workingCodes } from '@/data/sample-data';

export const metadata: Metadata = {
  title: 'Fisch Codes (December 2024) | Latest Working Codes List',
  description: 'Active Fisch Roblox codes for December 2024. Get free C$, items, and boosts. All codes tested and updated regularly. Working codes list with rewards.',
  keywords: ['fisch codes', 'roblox fisch codes', 'fisch codes 2024', 'codes for fisch', 'fisch working codes'],
  openGraph: {
    title: 'Fisch Codes - Latest Working Codes',
    description: 'Get free C$ and items with our updated Fisch codes list',
    type: 'website',
    url: 'https://fischvalues.online/fisch-codes',
  },
  alternates: {
    canonical: 'https://fischvalues.online/fisch-codes',
  },
};

export default function FischCodesPage() {
  const activeCodes = workingCodes.filter(code => code.status === 'active');
  const expiredCodes = workingCodes.filter(code => code.status === 'expired');

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-green-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
            Fisch Codes (December 2024)
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Latest working Fisch Roblox codes. Get free C$, items, and exclusive rewards!
          </p>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">All codes tested and updated daily</span>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-green-400 mb-2">{activeCodes.length}</div>
            <div className="text-sm text-gray-400">Active Codes</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-cyan-400 mb-2">31.5K</div>
            <div className="text-sm text-gray-400">C$ Available</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">5</div>
            <div className="text-sm text-gray-400">Free Items</div>
          </div>
        </div>
      </section>

      {/* Active Codes */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Working Fisch Codes</h2>
        <div className="space-y-4">
          {activeCodes.map((code, index) => (
            <CodeCard key={index} code={code} />
          ))}
        </div>
      </section>

      {/* How to Redeem */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">How to Redeem Codes</h2>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <h3 className="font-bold">Open Fisch in Roblox</h3>
                <p className="text-gray-400">Make sure you're logged into your Roblox account</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <h3 className="font-bold">Click on Menu</h3>
                <p className="text-gray-400">Look for the menu button (usually on the bottom or side of the screen)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <h3 className="font-bold">Enter Codes</h3>
                <p className="text-gray-400">Click on the Twitter/Bird icon or Codes button and type in the code</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <h3 className="font-bold">Claim Rewards</h3>
                <p className="text-gray-400">Hit Redeem and enjoy your free C$ and items!</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Expired Codes */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Recently Expired Codes</h2>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <p className="text-gray-400 mb-4">These codes no longer work, but check back often for new codes!</p>
          <div className="grid md:grid-cols-2 gap-4">
            {expiredCodes.map((code, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <Clock className="h-5 w-5 text-red-400" />
                <div>
                  <div className="font-mono text-gray-400 line-through">{code.code}</div>
                  <div className="text-xs text-gray-500">Expired: {code.expires}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-green-400">
              When do new codes come out?
            </h3>
            <p className="text-gray-300">
              New codes are typically released during game updates, events, holidays, or when the game reaches milestones (like likes or visits). Follow the developer on Twitter or join the Discord for instant updates.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-green-400">
              Why isn't my code working?
            </h3>
            <p className="text-gray-300">
              Make sure you've typed the code exactly as shown (codes are case-sensitive). Also check if the code has expired. If it still doesn't work, try restarting the game.
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-3 text-green-400">
              How often are codes updated?
            </h3>
            <p className="text-gray-300">
              We update this list daily! All codes are tested regularly to ensure they work. Check back often for new codes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CodeCard({ code }: { code: any }) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-green-600/30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <code className="text-2xl font-mono font-bold text-cyan-400">
              {code.code}
            </code>
            <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full">
              Active
            </span>
          </div>
          <p className="text-gray-300 mb-1">
            <Gift className="inline h-4 w-4 mr-2" />
            {code.reward}
          </p>
          <p className="text-sm text-gray-500">
            Expires: {code.expires}
          </p>
        </div>
        <CopyButton code={code.code} />
      </div>
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      className={`w-full md:w-auto ${
        copied ? 'border-green-600 text-green-400' : 'border-cyan-600 text-cyan-400'
      }`}
    >
      {copied ? (
        <>
          <CheckCircle className="mr-2 h-5 w-5" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-5 w-5" />
          Copy Code
        </>
      )}
    </Button>
  );
}

// Add React import
import * as React from 'react';