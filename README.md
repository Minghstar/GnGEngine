# GNG Engine

A modern platform showcasing Australian college athletes, powered by AI and built with Next.js, React, TailwindCSS, and Airtable.

## Features

- **Modern Dark Theme**: Premium design inspired by Whoop.com and Teamworks.com
- **Athlete Directory**: Browse verified Australian athletes across NCAA
- **AI-Powered Search**: Natural language search using OpenAI GPT
- **Real-time Data**: Live updates from Airtable backend
- **Responsive Design**: Optimized for all devices
- **Smart Filtering**: AI-powered athlete discovery and verification

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **Backend**: Airtable API
- **Deployment**: Render

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FrontEnd-GnG
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   # OpenAI API Key for AI-powered search
   OPENAI_API_KEY=sk-your-openai-api-key-here
   
   # Airtable Configuration
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_airtable_base_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment on Render

### Prerequisites
- Render account
- Git repository (GitHub, GitLab, etc.)

### Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with your Git provider

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository

4. **Configure Service**
   - **Name**: `gng-engine`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Starter` (free tier)

5. **Add Environment Variables**
   In the Render dashboard, add these environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key (for AI search)
   - `AIRTABLE_API_KEY`: Your Airtable API key
   - `AIRTABLE_BASE_ID`: Your Airtable base ID
   - `NODE_ENV`: `production`

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Your site will be available at `https://your-app-name.onrender.com`

### Environment Variables

Make sure to set these in your Render dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key for AI search | `sk-...` |
| `AIRTABLE_API_KEY` | Your Airtable API key | `patI5AKLv1...` |
| `AIRTABLE_BASE_ID` | Your Airtable base ID | `appwuNAQLA...` |
| `NODE_ENV` | Environment | `production` |

## Project Structure

```
FrontEnd GnG/
├── components/          # React components
│   ├── AthleteCard.tsx
│   ├── FilterBar.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── Navbar.tsx
├── pages/              # Next.js pages
│   ├── _app.tsx
│   ├── index.tsx
│   ├── directory.tsx
│   ├── about.tsx
│   └── profile/
├── utils/              # Utility functions
│   └── airtable.ts
├── styles/             # Global styles
│   └── globals.css
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # TailwindCSS configuration
└── package.json        # Dependencies
```

## AI-Powered Search

The platform features an intelligent search system powered by OpenAI GPT that allows users to search for athletes using natural language queries.

### Example Queries
- `"Male D1 tennis players from Melbourne"`
- `"Female golfers graduating in 2026"`
- `"New Zealand swimmers from Division 2"`
- `"Australian basketball players in D1"`

### Setup
1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add `OPENAI_API_KEY=sk-your-key-here` to your `.env.local` file
3. The AI search will automatically parse queries and filter athletes

### Features
- **Natural Language Processing**: Convert text queries to structured filters
- **Search History**: Recent searches are saved locally
- **Keyboard Shortcuts**: Press `/` to focus search, `Enter` to search, `Escape` to clear
- **Smart Filtering**: Combines multiple criteria in a single query

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'dark': '#0F0F0F',
  'dark-gray': '#1A1A1A',
  'light-gray': '#2A2A2A',
  'accent-blue': '#38BDF8',
  'accent-rose': '#F43F5E',
}
```

### Content
- **Athlete Data**: Update your Airtable base
- **Copy**: Edit text in component files
- **Images**: Replace placeholder images in components

## Support

For issues or questions:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Render documentation](https://render.com/docs)
3. Check [Airtable API docs](https://airtable.com/api)

## License

This project is proprietary to GNG Engine. 