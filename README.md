# Juba Growth Desk 🇸🇸

[![Static Site](https://img.shields.io/badge/architecture-static%20jamstack-123f38)](https://github.com)
[![Deployment](https://img.shields.io/badge/deploy-Vercel%20ready-black)](https://vercel.com)
[![Location](https://img.shields.io/badge/city-Juba%2C%20South%20Sudan-e17c50)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

A high-performance, mobile-first marketing and inquiry-support website tailored specifically for hotels, guesthouses, restaurants, conference halls, and event venues in **Juba, South Sudan**.

---

## ✨ Features & Juba Enhancements

- **WhatsApp-First Inquiry Routing:** South Sudan's hospitality market runs on WhatsApp. Visitors can dispatch organized inquiry briefs directly to your business WhatsApp number (+211...) or email.
- **Dual Communication & Clipboard Copy:** If a visitor has slow connectivity or no default email client, a 1-tap **Copy Inquiry Text** button copies the formatted brief for instant pasting into WhatsApp, SMS, or Telegram.
- **Juba Venue Fit Explorer:** Interactive recommendation hub addressing specific bottlenecks for:
  - 🏨 **Hotels & Guesthouses:** Power continuity (generator backup), Wi-Fi speeds, airport shuttle clarity, and front-desk booking scripts.
  - 🍽️ **Restaurants & Nile Terraces:** Mobile menu cards, weekend Nile brunch promotions, and table booking routing.
  - 🏛️ **Conference & Workshop Halls:** 1-page workshop PDF/spec sheets, seating capacities, and quick quote templates for UN agencies, NGOs, and corporate seminars.
  - 🌿 **Event Gardens & Weddings:** Banquet packages, guest capacity clarity, and date availability workflows.
- **Juba District Selection:** Built-in neighborhood selector (Hai Malakal, Juba Town, Riverside / Nile Waterfront, Tongping, Airport Road, Munuki, Gudele, Kololo/Buluk).
- **Progressive Web App (PWA):** Includes `manifest.json` allowing venue managers and clients in Juba to add the site directly to their mobile home screens.
- **Ultra-Lightweight & Fast:** Zero heavy JavaScript frameworks or database dependencies—loads instantly even on 3G mobile data connections in Juba.
- **Accessible & Responsive:** Fluid layouts, semantic HTML, high contrast, and keyboard navigation.

---

## 🛠️ Project Structure

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI build & verification
├── public/
│   ├── assets/
│   │   ├── hero-hospitality.webp
│   │   ├── inquiry-planning.webp
│   │   ├── logo-mark.png
│   │   └── signal-mark.svg
│   ├── index.html               # Main semantic marketing page
│   ├── manifest.json            # Web App Manifest for mobile installation
│   ├── site.css                 # Editorial CSS with responsive styling
│   └── site.js                  # WhatsApp routing, tabs, and clipboard logic
├── scripts/
│   ├── build.mjs                # Node.js static build script (dist/)
│   ├── build.ps1                # PowerShell build script for Windows
│   └── test.mjs                 # Automated asset and markup verification
├── dist/                        # Production-ready static output (generated)
├── package.json                 # Scripts and metadata
├── server.mjs                   # Local development preview server
├── vercel.json                  # Vercel deployment configuration & caching headers
└── README.md                    # Documentation
```

---

## 🚀 Local Development

### Option A: Using Node.js (v18+)

```bash
# 1. Start local preview server (http://localhost:3000)
npm run dev

# 2. Run automated validation checks
npm test

# 3. Build static output to dist/
npm run build
```

### Option B: Using Windows PowerShell (No Node.js Required)

If working on a Windows environment without Node installed:

```powershell
# Run the native PowerShell build script
powershell -ExecutionPolicy Bypass -File .\scripts\build.ps1
```

The compiled static files are ready in `dist/`.

---

## ⚙️ Configuration (WhatsApp & Email)

Update your public business contact coordinates in `public/site.js` and `public/index.html`:

In `public/site.js`:
```javascript
const CONTACT = {
  // Digits only with country code (211 for South Sudan).
  whatsapp: "211918509971",
  whatsappDisplay: "+211 918 509 971",
  email: "junubone@gmail.com"
};
```

---

## 🚢 GitHub Deployment Guide

To deploy this project to your GitHub account:

### 1. Initialize Git and Stage Files
```bash
git init -b main
git add .
git commit -m "Initial commit: Juba Growth Desk hospitality platform"
```

### 2. Connect to Your GitHub Repository
Create a new repository on [GitHub](https://github.com/new) (e.g., `juba-growth-desk`), then run:

```bash
# Replace <your-username> with your GitHub username
git remote add origin https://github.com/<your-username>/juba-growth-desk.git
git branch -M main
git push -u origin main
```

The included `.github/workflows/ci.yml` will automatically verify your build across Node versions on GitHub Actions.

---

## ▲ Vercel Deployment Guide

Deploying to Vercel takes under 2 minutes:

### 1-Click Import via Vercel Dashboard

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select your newly pushed GitHub repository (`juba-growth-desk`).
4. In the Project Configuration:
   - **Framework Preset:** Select **Other**.
   - **Root Directory:** `./` (leave default).
   - **Build Command:** `npm run build` (auto-detected via `vercel.json`).
   - **Output Directory:** `dist` (auto-detected via `vercel.json`).
5. Click **Deploy**.

Vercel will build the site, assign a production URL (e.g., `https://juba-growth-desk.vercel.app`), and enable continuous deployment whenever you push to GitHub!

### Or Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## 📄 License

MIT License. Built for hospitality and event venues in Juba, South Sudan.
