# Vidpilot Alpha

Vidpilot is an AI-powered YouTube growth dashboard. This Alpha version connects to your real YouTube account via Google Sign-In and uses OpenAI for content generation.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- Firebase Project (for Auth)
- OpenAI API Key

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

For AI features to work locally or in Vercel, you need `OPENAI_API_KEY` set in your *deployment* environment variables (or local `.env.local` if using Vercel CLI).

### 4. Run Locally
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 🛠️ Features
- **Real YouTube Data**: Connects via OAuth to fetch Subscriber & View counts.
- **AI Studio**: Generate titles, descriptions, and thumbnails (powered by GPT-3.5).
- **Dashboard**: "Just the stats that matter" interface.

## ⚠️ Known Limitations (Alpha)
- **Quota**: Daily YouTube API limit is 10k units.
- **AI Limits**: Max 5 generations per topic/day (client-side limit).
- **Data**: Only shows lifetime stats (Analytics API integration coming in Beta).
