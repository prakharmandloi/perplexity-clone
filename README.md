# Perplexity AI Clone

A fully functional AI-powered search and reasoning platform built with Next.js 14, TypeScript, and Tailwind CSS. This clone replicates the core functionality of Perplexity AI with intelligent responses powered by OpenAI GPT-4.

## Features

- 🔍 **AI-Powered Search** - Get instant answers with intelligent reasoning
- 💬 **Chat Interface** - Conversational UI similar to Perplexity
- 🤖 **GPT-4 Integration** - Powered by OpenAI's most advanced model
- 🎨 **Modern UI** - Clean, dark-themed interface with smooth animations
- ⚡ **Real-time Responses** - Fast, streaming responses
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons
- **Markdown**: React Markdown with GFM support
- **AI**: OpenAI GPT-4

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prakharmandloi/perplexity-clone.git
cd perplexity-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```env
OPENAI_API_KEY=sk-your-api-key-here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prakharmandloi/perplexity-clone)

### Environment Variables in Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Environment**: Select all (Production, Preview, Development)
4. Redeploy

## Configuration

### Change AI Model

Edit `app/api/search/route.ts`:

```typescript
model: 'gpt-4', // Options: 'gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'
```

### Adjust Response Length

```typescript
max_tokens: 2000, // Increase for longer responses
```

### Styling

Customize the theme in `app/globals.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

## Project Structure

```
perplexity-clone/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts      # OpenAI API integration
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main chat interface
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## Features Breakdown

### Chat Interface
- Real-time message streaming
- User and AI message differentiation
- Auto-scroll to latest message
- Loading states

### OpenAI Integration
- GPT-4 powered responses
- Error handling and fallbacks
- Markdown response formatting
- Customizable system prompts

### UI/UX
- Dark theme optimized for readability
- Smooth animations and transitions
- Responsive design for mobile/tablet/desktop
- Custom scrollbar styling

## API Usage & Costs

This app uses OpenAI's API which has usage costs:
- **GPT-4**: ~$0.03 per 1K tokens (input) + $0.06 per 1K tokens (output)
- **GPT-3.5-Turbo**: ~$0.0015 per 1K tokens (much cheaper alternative)

Monitor your usage at: https://platform.openai.com/usage

## Troubleshooting

### "API key not found" error
- Make sure `OPENAI_API_KEY` is set in Vercel environment variables
- Redeploy after adding the key

### "Insufficient credits" error
- Check your OpenAI account balance
- Add credits at: https://platform.openai.com/account/billing

### Deployment keeps canceling
- Don't manually cancel deployments in Vercel
- Let the build complete (takes ~2 minutes)
- Check build logs for errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: prakharmandloi22@gmail.com

## Acknowledgments

- Inspired by [Perplexity AI](https://perplexity.ai)
- Powered by [OpenAI](https://openai.com)
- Built with Next.js and Vercel

---

Made with ❤️ by [Prakhar Mandloi](https://github.com/prakharmandloi)
