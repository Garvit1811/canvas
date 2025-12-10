# BSH Website Integration Guide
## Canada Evictions Map - bsh.ubc.ca Integration

This guide provides multiple options for integrating the Canada Evictions Scoring Map into the BSH website at bsh.ubc.ca.

---

## Prerequisites

1. **Netlify Deployment** - First ensure your map is deployed to Netlify:
   - Connect your GitHub repository to Netlify
   - Branch: `claude/canada-evictions-map-011CUeqszVM6LmAVwTpuzrHi`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - You'll get a URL like: `https://your-site.netlify.app`

2. **Custom Domain** (Optional but Recommended):
   - Set up a custom subdomain: `evictions.bsh.ubc.ca`
   - Point it to your Netlify site via DNS

---

## Integration Options

### **Option 1: Iframe Embed** (Easiest - 5 minutes)

If the BSH website has a page editor (WordPress, Drupal, etc.), simply add this iframe code:

```html
<div style="width: 100%; min-height: 900px;">
  <iframe
    src="https://your-site.netlify.app"
    width="100%"
    height="900px"
    frameborder="0"
    style="border: none; border-radius: 8px;"
    title="Canada Evictions Scoring Map">
  </iframe>
</div>
```

**Pros:**
- ✅ Extremely simple - just paste code
- ✅ Works with any CMS platform
- ✅ Map updates automatically when you redeploy

**Cons:**
- ❌ Separate scrolling experience
- ❌ URL doesn't change when clicking around

**Best For:** Quick integration, WordPress/Drupal sites, testing

---

### **Option 2: Custom Subdomain** (Recommended - 30 minutes)

Set up `evictions.bsh.ubc.ca` pointing directly to your Netlify deployment.

**Steps:**

1. **In Netlify Dashboard:**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `evictions.bsh.ubc.ca`

2. **In UBC DNS Management** (contact UBC IT if needed):
   - Add a CNAME record:
     - **Host:** `evictions`
     - **Points to:** `your-site.netlify.app`
     - **TTL:** 3600

3. **Wait for DNS propagation** (5-60 minutes)

4. **Enable HTTPS** in Netlify (automatic)

5. **Link from BSH main site:**
   ```html
   <a href="https://evictions.bsh.ubc.ca">
     View Canada Evictions Scoring Map
   </a>
   ```

**Pros:**
- ✅ Clean, professional URL
- ✅ Full-page experience
- ✅ SEO-friendly
- ✅ Easy to maintain

**Cons:**
- ❌ Requires DNS access
- ❌ May need UBC IT approval

**Best For:** Professional deployment, long-term hosting

---

### **Option 3: Full Integration with BSH Template** (Advanced - 2-3 hours)

Wrap the evictions map in BSH's header/footer for seamless branding.

**Steps:**

1. **Export BSH Template:**
   - Get the HTML header from any BSH page
   - Get the HTML footer from any BSH page
   - Save CSS/logo assets

2. **Create Wrapper Page** (see `bsh-wrapper-template.html` in this repository)

3. **Modify React Build:**
   - Update `index.html` in your built `dist/` folder
   - Add BSH header/footer around the React root div
   - Include BSH CSS/branding

4. **Deploy to BSH Server:**
   - Upload modified `dist/` folder to BSH web server
   - Access via: `https://bsh.ubc.ca/evictions-map/` (or similar path)

**Pros:**
- ✅ Perfect brand integration
- ✅ Consistent navigation with BSH site
- ✅ Single domain

**Cons:**
- ❌ More complex setup
- ❌ Requires server access
- ❌ Need to re-integrate after each map update

**Best For:** When seamless branding is critical

---

### **Option 4: Direct Server Upload** (If BSH has static hosting)

Upload the built files directly to the BSH web server.

**Steps:**

1. **Build the project:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with all production files.

2. **Upload `dist/` folder to BSH server:**
   - Via SFTP/FTP to UBC server
   - Place in a subdirectory: `/public_html/evictions-map/`

3. **Access at:**
   ```
   https://bsh.ubc.ca/evictions-map/
   ```

4. **Update BSH navigation** to link to this page

**Pros:**
- ✅ Complete control
- ✅ Fast loading (same server)
- ✅ No third-party hosting

**Cons:**
- ❌ Requires server access
- ❌ Manual updates needed
- ❌ Server must support static files

**Best For:** If you have direct server access and want full control

---

## Recommended Workflow

**Phase 1: Testing (Now)**
1. Deploy to Netlify via GitHub
2. Test using the Netlify URL
3. Use iframe embed on a test BSH page

**Phase 2: Production (After Testing)**
1. Set up custom subdomain: `evictions.bsh.ubc.ca`
2. Update all links to use the custom domain
3. Add prominent link from main BSH homepage

**Phase 3: Enhancement (Optional)**
1. Create BSH-branded wrapper if needed
2. Add introduction page with methodology
3. Integrate with existing BSH content

---

## Adding Context Content to the Map Page

The map currently stands alone. You mentioned wanting "other information" on the page. Here are options:

### A. Add Content Sections Above/Below Map

Modify `src/CanadaEvictionsScoringMap.jsx` to include:

```jsx
<div className="max-w-7xl mx-auto p-6">
  {/* Introduction Section */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold mb-4">
      Canada Evictions Scoring Map
    </h1>
    <p className="text-lg text-gray-700 mb-4">
      This interactive map compares eviction laws across Canadian
      provinces and territories using 10 key indicators...
    </p>
  </div>

  {/* The Map Component */}
  <Card>
    {/* Existing map code */}
  </Card>

  {/* Methodology Section */}
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4">Methodology</h2>
    <p>Our scoring system evaluates...</p>
  </div>
</div>
```

### B. Separate Landing Page + Map

Create two pages:
1. **Landing page** (`/index.html`) - Introduction, methodology, team
2. **Map page** (`/map.html`) - The interactive map

---

## Next Steps

1. **Deploy to Netlify** (if not done yet)
2. **Choose your integration approach** based on:
   - Your access level (CMS editor vs. server access)
   - Timeline (quick vs. polished)
   - BSH website platform

3. **Contact UBC IT** (if choosing subdomain option) to request:
   - DNS CNAME record for `evictions.bsh.ubc.ca`

4. **Test thoroughly** before announcing

---

## Need Help?

**For Netlify deployment:**
- See `DEPLOYMENT_OPTIONS.md` in this repository

**For BSH branding:**
- See `bsh-wrapper-template.html` for a starting template

**For content updates:**
- Edit `src/CanadaEvictionsScoringMap.jsx` and rebuild

---

## Quick Reference

| Integration Method | Time | Difficulty | Requirements | Best For |
|-------------------|------|------------|--------------|----------|
| Iframe Embed | 5 min | Easy | CMS editor access | Quick testing |
| Custom Subdomain | 30 min | Medium | DNS access | Production (recommended) |
| Full Integration | 2-3 hrs | Advanced | Server + BSH template | Seamless branding |
| Direct Upload | 1 hr | Medium | Server access | Full control |

**Recommended:** Start with iframe for testing, then move to custom subdomain for production.
