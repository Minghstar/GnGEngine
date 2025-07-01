# GNG Engine

A modern platform showcasing Australian college athletes, powered by AI and built with Next.js, React, TailwindCSS, and Airtable.

## Features

- **Modern Dark Theme**: Premium design inspired by Whoop.com and Teamworks.com
- **Athlete Directory**: Browse verified Australian athletes across NCAA
- **Real-time Data**: Live updates from Airtable backend
- **Responsive Design**: Optimized for all devices
- **AI-Powered**: Automated athlete discovery and verification

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