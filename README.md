# BernamaBiz Clone

This is a clone of [BernamaBiz](http://bernamabiz.com/) built with Next.js 16.

## Features
1. **Posting Space**: `/post` - Create news posts with title, content, category, and AI tools.
2. **CRM / Lead Capture**: Lead form at the bottom of the home page.
3. **Automation**: Simulated email/WhatsApp sending upon lead capture (check server logs).
4. **AI Features**: Grammar check and Image generation (mocked for demo).
5. **Dual Database Strategy**:
   - **Development**: Uses `data.json` for zero-config persistence.
   - **Production**: Uses **Prisma + Vercel Postgres** (optional, see setup guide).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Deployment

See [DEPLOY.md](./DEPLOY.md) for instructions on how to deploy to Vercel with a free domain and set up the production database.
