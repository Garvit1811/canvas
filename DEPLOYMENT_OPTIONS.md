# How to View the Canada Evictions Map

## The Issue
You're seeing "connection refused" because the server is running in a **remote development environment**, but you're trying to access it from **your local computer**. They're separate machines!

## ✅ Best Solutions (Pick One)

---

### **Option 1: Run on Your Computer** (Easiest for Development)

1. **Clone this repository to your computer:**
   ```bash
   git clone <your-repo-url>
   cd canvas
   ```

2. **Install Node.js** (if you don't have it):
   - Download from: https://nodejs.org/
   - Choose LTS version
   - Install it

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

5. **Open in your browser:**
   - Go to: http://localhost:5173/
   - ✅ The map will work!

**Advantages:**
- ✅ Fast hot-reload during development
- ✅ Easy to make changes
- ✅ See updates instantly

---

### **Option 2: Deploy to Free Hosting** (Best for Sharing)

Deploy to a free hosting service so anyone can access it via a public URL.

#### **A) Netlify (Recommended - Easiest)**

1. **Sign up at**: https://netlify.com (free)
2. **Drag and drop the `dist/` folder** to Netlify
3. **You get a public URL** like: `https://your-site.netlify.app`

**OR use Netlify CLI:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

#### **B) Vercel**

1. **Sign up at**: https://vercel.com (free)
2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```
3. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

#### **C) GitHub Pages**

1. **Push your code to GitHub**
2. **Add to package.json:**
   ```json
   "homepage": "https://yourusername.github.io/canvas",
   ```
3. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```
4. **Add deploy script to package.json:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
5. **Deploy:**
   ```bash
   npm run deploy
   ```
6. **Enable GitHub Pages** in repository settings

---

### **Option 3: Use a Simple HTTP Server** (Quick View)

If you just want to view the built files:

1. **Navigate to the project:**
   ```bash
   cd canvas
   ```

2. **Use Python (if installed):**
   ```bash
   # Python 3
   cd dist
   python3 -m http.server 8000
   ```

   **OR use Node.js:**
   ```bash
   npm install -g http-server
   cd dist
   http-server -p 8000
   ```

3. **Open browser:**
   - Go to: http://localhost:8000/

---

## 📋 Quick Comparison

| Option | Speed | Public URL | Best For |
|--------|-------|------------|----------|
| **Run Locally** | ⚡ Instant | ❌ No | Development, testing |
| **Netlify** | 🚀 2 minutes | ✅ Yes | Sharing with others |
| **Vercel** | 🚀 2 minutes | ✅ Yes | Production hosting |
| **GitHub Pages** | 🐌 5 minutes | ✅ Yes | Open source projects |
| **HTTP Server** | ⚡ 30 seconds | ❌ No | Quick local viewing |

---

## 🎯 Recommended Path

**For you right now:**
1. Option 1 (Run on your computer) - for testing and viewing
2. Option 2A (Netlify) - when ready to share with others

**Why?**
- You can develop and test locally
- Deploy to Netlify when you want to share a link with colleagues/public
- Free and takes 2 minutes

---

## 🆘 Need Help?

**Don't have Node.js?**
- Download: https://nodejs.org/ (LTS version)
- Verify: `node --version` (should show v16+)

**Can't clone the repository?**
- Download as ZIP from GitHub
- Extract to a folder
- Follow the same steps

**Still stuck?**
- Check HOW_TO_RUN.md in this folder
- Or deploy directly to Netlify (drag & drop the `dist/` folder)

---

## 📦 What's in the `dist/` Folder?

The `dist/` folder contains the **built, production-ready version** of your map:
- `index.html` - Main HTML file
- `assets/` - JavaScript and CSS files
- `pdfs/` - Your PDF documents

You can:
- ✅ Upload it to any web host
- ✅ Deploy to Netlify/Vercel
- ✅ Serve it with any HTTP server

You cannot:
- ❌ Double-click `index.html` (won't work due to CORS)
- ❌ Open it directly in browser without a server

---

## 🚀 Fastest Option Right Now

**Use Netlify Drop:**
1. Go to: https://app.netlify.com/drop
2. Drag the entire `dist/` folder from your computer
3. Get instant public URL
4. Share with anyone!

**Takes 30 seconds!** 🎉
