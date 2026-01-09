# Deployment Checklist - Canada Evictions Map
## From GitHub to BSH Website

This checklist walks you through deploying your Canada Evictions Map to production and integrating it with bsh.ubc.ca.

---

## Phase 1: Deploy to Netlify (30 minutes)

### Step 1: Create Netlify Account
- [ ] Go to https://www.netlify.com
- [ ] Sign up with your GitHub account (recommended)
- [ ] Verify your email address

### Step 2: Connect GitHub Repository
- [ ] In Netlify dashboard, click "Add new site" → "Import an existing project"
- [ ] Choose "Deploy with GitHub"
- [ ] Authorize Netlify to access your GitHub repositories
- [ ] Select your repository: `Garvit1811/canvas` (or your repo name)

### Step 3: Configure Build Settings
- [ ] **Branch to deploy:** `claude/canada-evictions-map-011CUeqszVM6LmAVwTpuzrHi`
- [ ] **Build command:** `npm run build`
- [ ] **Publish directory:** `dist`
- [ ] **Node version:** Set environment variable:
  - Key: `NODE_VERSION`
  - Value: `20.19.0` (or higher)

### Step 4: Deploy
- [ ] Click "Deploy site"
- [ ] Wait 2-5 minutes for build to complete
- [ ] Check build logs for any errors
- [ ] Visit the provided Netlify URL (e.g., `https://random-name-123.netlify.app`)
- [ ] **Verify the map displays correctly** (this is critical!)

### Step 5: Test Thoroughly
- [ ] All 10 indicator buttons work
- [ ] Province dropdown navigation works
- [ ] Province click interactions work
- [ ] Colors display correctly (red to green gradient)
- [ ] PDF links work
- [ ] Responsive design works on mobile
- [ ] No console errors in browser DevTools

**✅ Checkpoint:** Map must be fully functional on Netlify before proceeding to BSH integration.

---

## Phase 2: Choose Integration Method

Review `BSH_INTEGRATION_GUIDE.md` and select ONE approach:

### Option A: Quick Test (Iframe) ✅ Start Here
- [ ] Fastest way to see it on BSH site
- [ ] No DNS or server access needed
- [ ] See Phase 3A below

### Option B: Production Subdomain (Recommended for Final)
- [ ] Best professional solution
- [ ] Requires DNS access
- [ ] See Phase 3B below

### Option C: Full BSH Template Integration
- [ ] Perfect branding match
- [ ] More complex
- [ ] See `BSH_INTEGRATION_GUIDE.md` Option 3

---

## Phase 3A: Quick Integration (Iframe Method)

### What You Need:
- Access to edit a page on bsh.ubc.ca (WordPress editor, HTML editor, or CMS)
- Your Netlify URL from Phase 1

### Steps:
1. [ ] Log into BSH website admin panel
2. [ ] Create a new page: "Evictions Map" or edit existing page
3. [ ] In the page editor, add this HTML/iframe code:

```html
<div style="width: 100%; min-height: 900px; margin: 2rem 0;">
  <iframe
    src="https://YOUR-NETLIFY-URL.netlify.app"
    width="100%"
    height="900px"
    frameborder="0"
    style="border: none; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
    title="Canada Evictions Scoring Map">
  </iframe>
</div>
```

4. [ ] Replace `YOUR-NETLIFY-URL.netlify.app` with your actual Netlify URL
5. [ ] Save and publish the page
6. [ ] Test the page at `https://bsh.ubc.ca/your-page-url`
7. [ ] Verify map displays and works correctly

### Add Context Around the Map:
- [ ] Add introduction text above the iframe
- [ ] Add methodology section below the iframe
- [ ] Link to PDF documents
- [ ] See `bsh-wrapper-template.html` for content ideas

**✅ Done!** Your map is now live on the BSH website via iframe.

**Next Steps:**
- Share the URL with stakeholders
- Gather feedback
- Consider moving to custom subdomain for final production

---

## Phase 3B: Production Integration (Custom Subdomain)

This is the recommended final solution. It creates `evictions.bsh.ubc.ca` pointing to your Netlify site.

### Step 1: Request DNS Access
- [ ] Contact UBC IT Support or BSH web administrator
- [ ] Request ability to add a CNAME record for `evictions.bsh.ubc.ca`
- [ ] Get credentials or assistance for DNS management

### Step 2: Configure Netlify
- [ ] In Netlify dashboard, go to your site
- [ ] Click "Domain settings" or "Set up a custom domain"
- [ ] Click "Add custom domain"
- [ ] Enter: `evictions.bsh.ubc.ca`
- [ ] Netlify will provide DNS instructions

### Step 3: Add DNS Record
In UBC/BSH DNS management panel:
- [ ] Add a new CNAME record:
  - **Type:** CNAME
  - **Name/Host:** `evictions`
  - **Value/Points to:** `YOUR-SITE.netlify.app` (your Netlify domain)
  - **TTL:** 3600 (or auto)

### Step 4: Wait for Propagation
- [ ] Wait 5-60 minutes for DNS to propagate
- [ ] Check status: https://www.whatsmydns.net/#CNAME/evictions.bsh.ubc.ca

### Step 5: Enable HTTPS
- [ ] In Netlify, go to Domain settings → HTTPS
- [ ] Click "Verify DNS configuration"
- [ ] Wait for SSL certificate provisioning (automatic, 1-5 minutes)
- [ ] Verify HTTPS works: `https://evictions.bsh.ubc.ca`

### Step 6: Update BSH Navigation
- [ ] Add link to main BSH navigation menu
- [ ] Link text: "Evictions Map" or "Research: Evictions Map"
- [ ] Link URL: `https://evictions.bsh.ubc.ca`

### Step 7: Announcement
- [ ] Create announcement/blog post on BSH site
- [ ] Share on social media if applicable
- [ ] Email stakeholders with the new URL

**✅ Production Complete!** Your map is now live at a professional subdomain.

---

## Phase 4: Content Enhancement (Optional)

### Add Introduction Landing Page:
- [ ] Modify `src/CanadaEvictionsScoringMap.jsx` to add intro section
- [ ] Include project background
- [ ] Explain methodology
- [ ] Add team/contact information

### Update with BSH Branding:
- [ ] Add BSH logo to the map interface
- [ ] Match BSH color scheme in Tailwind config
- [ ] Add BSH footer with links

### Example Code Addition:
Edit `src/CanadaEvictionsScoringMap.jsx` at the top of the return statement:

```jsx
return (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4">
      {/* Add Introduction Section */}
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Canada Evictions Scoring Map
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          This interactive map compares eviction laws across Canadian
          provinces and territories...
        </p>
      </div>

      {/* Existing map code continues here */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        ...
```

After making changes:
- [ ] Commit to GitHub
- [ ] Push to branch `claude/canada-evictions-map-011CUeqszVM6LmAVwTpuzrHi`
- [ ] Netlify auto-deploys (if configured)
- [ ] Verify updates appear on live site

---

## Troubleshooting

### Map Not Displaying on Netlify:
- [ ] Check browser console for errors (F12 → Console tab)
- [ ] Verify GeoJSON URL is accessible: https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson
- [ ] Check Netlify build logs for errors
- [ ] Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Iframe Not Showing on BSH Site:
- [ ] Check if BSH site blocks iframes (security policy)
- [ ] Verify iframe src URL is correct
- [ ] Check for CSP (Content Security Policy) errors in console
- [ ] Try increasing iframe height

### DNS Not Resolving:
- [ ] Verify CNAME record is correct
- [ ] Wait longer (DNS can take up to 24 hours, but usually 5-60 minutes)
- [ ] Check with: `dig evictions.bsh.ubc.ca` or `nslookup evictions.bsh.ubc.ca`
- [ ] Contact UBC IT if still not working after 24 hours

### SSL Certificate Not Provisioning:
- [ ] Verify DNS is fully propagated first
- [ ] In Netlify, try "Renew certificate" button
- [ ] Contact Netlify support if it fails after 1 hour

---

## Maintenance & Updates

### To Update Map Data:
1. [ ] Edit `src/data/indicatorScores.js` with new scores
2. [ ] Commit and push to GitHub
3. [ ] Netlify automatically rebuilds and deploys
4. [ ] Changes live in 2-5 minutes

### To Update Indicator Descriptions:
1. [ ] Edit `INDICATORS` array in `src/data/indicatorScores.js`
2. [ ] Commit and push to GitHub
3. [ ] Auto-deploys via Netlify

### To Change Styling:
1. [ ] Edit `src/CanadaEvictionsScoringMap.jsx`
2. [ ] Or edit Tailwind config if needed
3. [ ] Commit, push, auto-deploys

**Tip:** All updates to the GitHub branch automatically trigger Netlify rebuilds, so your map always stays up-to-date.

---

## Success Criteria

Your deployment is complete when:

- [✅] Map displays correctly on Netlify URL
- [✅] All 10 indicators work
- [✅] All provinces/territories are clickable
- [✅] Colors match scores (red → green gradient)
- [✅] Map is accessible on bsh.ubc.ca (via iframe or subdomain)
- [✅] PDF links work
- [✅] Mobile responsive
- [✅] HTTPS enabled (secure connection)
- [✅] Stakeholders can access and use it

---

## Quick Reference

**Your GitHub Branch:**
```
claude/canada-evictions-map-011CUeqszVM6LmAVwTpuzrHi
```

**Build Commands:**
- Build: `npm run build`
- Local dev: `npm run dev`
- Preview build: `npm run preview`

**Key Files:**
- Main component: `src/CanadaEvictionsScoringMap.jsx`
- Data: `src/data/indicatorScores.js`
- Config: `vite.config.mjs`
- Package: `package.json`

**Documentation:**
- Integration guide: `BSH_INTEGRATION_GUIDE.md`
- Wrapper template: `bsh-wrapper-template.html`
- General deployment: `DEPLOYMENT_OPTIONS.md`

---

## Need Help?

**Netlify Issues:**
- Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support

**UBC IT Support:**
- Contact BSH web administrator
- UBC IT Help Desk for DNS issues

**Code Changes:**
- All code is in GitHub repository
- Modify and push to trigger auto-deploy
- See `README.md` for development guide

---

## Timeline Estimate

| Phase | Time | Difficulty |
|-------|------|------------|
| Netlify Deployment | 30 min | Easy |
| Iframe Integration | 15 min | Easy |
| Custom Subdomain Setup | 30-60 min | Medium |
| Content Enhancement | 1-2 hrs | Medium |
| **Total (Quick)** | **45 min** | - |
| **Total (Full)** | **2-3 hrs** | - |

**Recommended:** Start with Netlify + iframe (45 min), then upgrade to custom subdomain when ready.

---

**Ready to start? Begin with Phase 1: Deploy to Netlify!**
