# Burn Rate Analysis Dashboard

A modern, responsive dashboard for financial burn rate analysis with AI-powered insights and real-time data visualization.

## Features

- **Interactive Dashboard**: Clean, modern UI with real-time data streaming
- **Financial Analysis**: Burn rate calculations, runway projections, and expense breakdowns
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Beautiful transitions and typewriter effects
- **Data Visualization**: Interactive charts and KPI cards
- **AI-Powered**: Simulated AI streaming responses with follow-up suggestions

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Framer Motion** for animations

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd burn-rate-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Deployment

This project is configured for easy deployment on Netlify:

1. **Automatic Deployment**: Push to your main branch and Netlify will automatically build and deploy
2. **Manual Deployment**: Run `npm run build` and upload the `dist` folder to Netlify
3. **Netlify CLI**: Use `netlify deploy --prod --dir=dist`

## Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Left navigation
│   ├── Topbar.tsx      # Top header with search
│   ├── CanvasLayout.tsx # Main layout manager
│   ├── MessageStream.tsx # AI text streaming
│   ├── AnalysisPanel.tsx # Right analysis panel
│   ├── Composer.tsx    # Input composer
│   ├── LeftFollowUps.tsx # Follow-up suggestions
│   └── FeedbackIcons.tsx # Feedback icons
├── hooks/              # Custom React hooks
│   └── useBurnRate.tsx # Data streaming simulation
├── data/               # Mock data
│   └── demo.ts         # Financial demo data
└── main.tsx           # App entry point
```

## Features in Detail

### Real-time Streaming
- Simulated AI responses with typewriter effect
- Progressive data loading with smooth animations
- Dynamic chart updates as data streams in

### Responsive Design
- 65/35 split layout on desktop
- Mobile-friendly responsive breakpoints
- Smooth transitions between states

### Data Visualization
- Interactive line charts with Recharts
- KPI cards with skeleton loading states
- Gradient fills and modern styling

### User Experience
- Smooth animations with Framer Motion
- Horizontal scrolling pills
- Auto-scroll functionality
- Modern scrollbar styling

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

If you have any questions or need help, please open an issue on GitHub.