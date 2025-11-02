# How to Run the Canada Evictions Map

## Quick Start (3 Steps)

### 1. Download the Project
First, clone or download this repository to your computer:

```bash
# If you have git installed:
git clone [your-repository-url]
cd canvas

# Or download the ZIP file from GitHub and extract it
```

### 2. Install Dependencies
Open a terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all required packages (React, Vite, Tailwind, etc.)

### 3. Start the Development Server
Run:

```bash
npm run dev
```

You should see:
```
VITE v5.4.20  ready in 289 ms

➜  Local:   http://localhost:5173/
```

### 4. Open in Browser
Open your web browser and go to:
**http://localhost:5173/**

The interactive map will load!

---

## Troubleshooting

### "npm not found"
You need to install Node.js first:
- Download from: https://nodejs.org/ (LTS version recommended)
- Install it
- Restart your terminal
- Try `npm install` again

### Port 5173 already in use
If you get a port conflict:
```bash
# Kill the process or use a different port:
npm run dev -- --port 3000
# Then visit http://localhost:3000/
```

### Dependencies fail to install
```bash
# Clear cache and try again:
rm -rf node_modules package-lock.json
npm install
```

---

## Production Build (For Deployment)

To create a static build you can host anywhere:

```bash
npm run build
```

This creates a `dist/` folder with all files. You can:
- Upload to any web server
- Host on Netlify, Vercel, GitHub Pages
- Open `dist/index.html` directly in a browser

---

## Project Structure

```
canvas/
├── src/                          # Source code
│   ├── CanadaEvictionsScoringMap.jsx  # Main component
│   ├── data/
│   │   └── indicatorScores.js    # All scoring data
│   └── components/ui/            # UI components
├── public/
│   └── pdfs/                     # PDF documents
├── package.json                  # Dependencies
└── README.md                     # Documentation
```

---

## Common Commands

```bash
npm run dev       # Start development server (hot reload)
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

## System Requirements

- **Node.js**: v16 or higher
- **npm**: v7 or higher (comes with Node.js)
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **OS**: Windows, macOS, or Linux

---

## Need Help?

1. Check that Node.js is installed: `node --version`
2. Check that npm is installed: `npm --version`
3. Make sure you're in the project directory
4. See README.md for more details
