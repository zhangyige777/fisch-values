# Fisch Values Calculator

The ultimate Fisch tool for optimizing your fishing strategy. Calculate profits, find active codes, and discover the best rods.

## Features

- **Value List** - Complete database of all Fisch fish and item values
- **Calculator** - Calculate your hourly earnings with advanced simulation
- **Active Codes** - Always up-to-date list of working Fisch codes
- **Tier List** - Complete rod rankings from S to F tier

## SEO Keywords Targeted

- fisch value list (1,000 searches)
- fisch calculator (1,000 searches)
- fisch codes (74,000 searches!)
- best rods in fisch (5,400 searches)

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Lucide Icons

## Deployment

This site is optimized for deployment on Cloudflare Pages.

### Build Command

```bash
npm run build
```

### Output Directory

```bash
out
```

### Environment Variables

No environment variables required.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage (Value List)
│   ├── calculator/page.tsx   # Calculator page
│   ├── fisch-codes/page.tsx  # Codes page
│   └── tier-list/page.tsx    # Tier list page
├── components/               # Reusable components
│   ├── ui/                  # Base UI components
│   ├── CalculatorForm.tsx
│   ├── CalculationResults.tsx
│   └── ...
├── data/                     # Game data
│   └── sample-data.ts
├── lib/                      # Utilities
│   └── utils.ts
└── types/                    # TypeScript definitions
    └── game.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Built with [Claude Code](https://claude.com/claude-code)
- Game data based on Fisch Roblox game
