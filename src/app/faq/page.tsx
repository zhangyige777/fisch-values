import { Metadata } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, ExternalLink, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fisch FAQ - Frequently Asked Questions | Complete Guide',
  description: 'Find answers to the most common questions about Fisch Roblox game. Learn about fish values, best rods, codes, locations, and gameplay mechanics.',
  keywords: ['fisch faq', 'fisch questions', 'fisch help', 'fisch guide', 'roblox fisch tips'],
  openGraph: {
    title: 'Fisch FAQ - Complete Guide',
    description: 'Frequently asked questions about Fisch game',
    url: 'https://fischvalues.online/faq',
  },
};

const faqCategories = [
  {
    title: "Getting Started",
    icon: "🎮",
    questions: [
      {
        q: "What is Fisch?",
        a: "Fisch is a popular Roblox fishing simulation game where players catch various fish, complete quests, upgrade their equipment, and explore different fishing locations. It combines RPG elements with relaxing fishing gameplay."
      },
      {
        q: "How do I start playing Fisch?",
        a: "Simply search for 'Fisch' on Roblox and click the play button. You'll start with a basic rod and can immediately begin fishing. No installation is required!"
      },
      {
        q: "What's the goal of the game?",
        a: "The main goals are to: 1) Catch all types of fish for your bestiary, 2) Upgrade to better rods and equipment, 3) Earn money (C$) to buy better gear, 4) Discover hidden locations and rare fish, 5) Complete achievements and quests."
      }
    ]
  },
  {
    title: "Fish & Values",
    icon: "🐟",
    questions: [
      {
        q: "How are fish values calculated?",
        a: "Fish value = Base Price × Weight Multiplier × Mutation Multiplier. For example, a fish worth 1000C$ with 2x weight and 1.85x shiny mutation would be worth 1000 × 2 × 1.85 = 3700C$."
      },
      {
        q: "What do mutations do?",
        a: "Mutations multiply a fish's base value. Common mutations include: Shiny (1.85x), Albino (1.1x), Sparkling (1.85x), Colossal (2.0x), Mythical (4.5x), and Heavenly (6x)."
      },
      {
        q: "What's the most valuable fish?",
        a: "The most valuable fish depends on mutations, but base value-wise, fish like the Megalodon, Ancient Kraken, and Colossal Blue Dragon are among the highest valued."
      },
      {
        q: "Where can I find specific fish?",
        a: "Each fish has specific locations, weather conditions, and sometimes time requirements. Use our fish database to search for any fish and find their exact locations."
      }
    ]
  },
  {
    title: "Rods & Equipment",
    icon: "🎣",
    questions: [
      {
        q: "Which rod should I use?",
        a: "For beginners: Carbon Rod or Destiny Rod. For money-making: Heaven's Rod or Rod of Eternal King. For rare fish: Trident Rod or Ethereal Prism Rod. Check our rod tier list for detailed rankings."
      },
      {
        q: "What do rod stats mean?",
        a: "Luck: Increases rare fish chance. Speed: Affects casting speed. Control: Helps in the fishing mini-game. Resilience: Reduces fish struggling. Max KG: Maximum fish weight you can catch."
      },
      {
        q: "How do I get better rods?",
        a: "Rods can be purchased with C$, obtained through quests, earned from achievements, or crafted. Some special rods require completing specific challenges."
      },
      {
        q: "Can I upgrade my rod?",
        a: "Yes, you can enchant rods using Enchant Relics, which add special abilities and stat bonuses."
      }
    ]
  },
  {
    title: "Bait & Fishing",
    icon: "🪱",
    questions: [
      {
        q: "What does bait do?",
        a: "Bait increases your preferred luck, making rare fish more likely to bite. Different bait works better for different fish types."
      },
      {
        q: "Which bait is the best?",
        a: "Truffle Worm (300 preferred luck) is the best for boss fish. Fish Head is good for predatory fish. Weird algae works well for unknown fishing spots."
      },
      {
        q: "How do I get bait?",
        a: "Bait can be purchased from shops, earned from achievements, found in crates, or crafted from fish."
      },
      {
        q: "Do I need bait to fish?",
        a: "No, you can fish without bait, but using bait significantly increases your chances of catching rare and valuable fish."
      }
    ]
  },
  {
    title: "Locations & Weather",
    icon: "🗺",
    questions: [
      {
        q: "What are special locations?",
        a: "Special locations include The Depths, Ancient Archives, Vertigo, and other hidden areas that require specific requirements to access and contain rare fish."
      },
      {
        q: "How does weather affect fishing?",
        a: "Weather changes fish spawn rates. Rain increases certain fish spawns, fog attracts deep-sea creatures, and aurora weather gives a global 6x luck boost."
      },
      {
        q: "What's Aurora weather?",
        a: "Aurora is a rare weather event that gives all players a 6x luck multiplier, making it the best time to fish for rare catches."
      },
      {
        q: "How do seasons work?",
        a: "Seasons change every ~10 hours and affect which fish are available. Some fish only appear in specific seasons."
      }
    ]
  },
  {
    title: "Codes & Items",
    icon: "🎁",
    questions: [
      {
        q: "Where do I enter codes?",
        a: "Click the menu button, then look for the Twitter bird icon or codes button. Enter the code there to claim your rewards."
      },
      {
        q: "How often are new codes released?",
        a: "New codes are typically released during updates, events, holidays, or when the game reaches milestones like likes or visits."
      },
      {
        q: "What can I get from codes?",
        a: "Codes can give you C$, free rods, bait, enchant relics, and other exclusive items."
      },
      {
        q: "Why isn't my code working?",
        a: "Make sure you typed it exactly as shown (codes are case-sensitive), check if it has expired, and ensure you haven't used it before."
      }
    ]
  },
  {
    title: "Technical Issues",
    icon: "⚙️",
    questions: [
      {
        q: "Why did my fish escape?",
        a: "Fish escape when you fail the mini-game or when your line snaps. Check if your rod can handle the fish's weight."
      },
      {
        q: "What causes line snaps?",
        a: "Line snaps happen when trying to catch fish heavier than your rod's max capacity or when the fish struggles too much for your rod's resilience."
      },
      {
        q: "How do I fix lag issues?",
        a: "Try playing on less crowded servers, lower your graphics settings, or play during off-peak hours."
      },
      {
        q: "I lost my items! What do I do?",
        a: "Unfortunately, lost items usually cannot be recovered. Always save before risky actions and be careful with trades."
      }
    ]
  },
  {
    title: "Community & Trading",
    icon: "👥",
    questions: [
      {
        q: "How do I trade with other players?",
        a: "Trading is available through the trading system. Find players willing to trade in the community servers or Discord."
      },
      {
        q: "What's a fair trade?",
        a: "A fair trade considers the base value, rarity, and demand of items. Use our value calculator to determine if a trade is fair."
      },
      {
        q: "Where can I find other players?",
        a: "Join the official Fisch Discord server, Roblox groups, or community forums to find trading partners."
      }
    ]
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-blue-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fisch FAQ</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your complete guide to everything Fisch. Find answers to common questions and master the game.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/fisch-codes" className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:bg-slate-700 transition-colors">
            <h3 className="font-bold mb-2 text-green-400">Active Codes</h3>
            <p className="text-sm text-gray-400">Get the latest working Fisch codes</p>
          </Link>
          <Link href="/calculator" className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:bg-slate-700 transition-colors">
            <h3 className="font-bold mb-2 text-cyan-400">Profit Calculator</h3>
            <p className="text-sm text-gray-400">Calculate your earnings per hour</p>
          </Link>
          <Link href="/tier-list" className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:bg-slate-700 transition-colors">
            <h3 className="font-bold mb-2 text-yellow-400">Rod Tier List</h3>
            <p className="text-sm text-gray-400">Find the best rods for your playstyle</p>
          </Link>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-800 rounded-lg border border-slate-700">
              <button
                onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                  <span className="text-sm text-gray-400">({category.questions.length} questions)</span>
                </div>
                {openCategory === category.title ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {openCategory === category.title && (
                <div className="px-6 pb-6 space-y-4">
                  {category.questions.map((item, index) => (
                    <div key={index} className="border-t border-slate-700 pt-4 first:border-t-0">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-lg">{item.q}</h3>
                          {openQuestion === index ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </button>
                      {openQuestion === index && (
                        <div className="text-gray-300 mt-2 leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-8 border border-purple-600/30">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Join our community to get help from experienced players and stay updated with the latest news.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://discord.gg/fisch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Join Discord
            </a>
            <a
              href="https://www.roblox.com/groups/group.aspx?gid=123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              Roblox Group
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-gray-400 text-sm">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>
    </div>
  );
}