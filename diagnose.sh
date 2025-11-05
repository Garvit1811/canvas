#!/bin/bash

echo "=================================="
echo "Canada Evictions Map - Diagnostics"
echo "=================================="
echo ""

# Check 1: Are we in the right directory?
echo "✓ Checking directory..."
if [ -f "package.json" ]; then
    echo "  ✅ Found package.json"
else
    echo "  ❌ ERROR: package.json not found. Are you in the canvas directory?"
    exit 1
fi

# Check 2: Is the GeoJSON file present?
echo ""
echo "✓ Checking GeoJSON file..."
if [ -f "public/canada.geojson" ]; then
    SIZE=$(ls -lh public/canada.geojson | awk '{print $5}')
    echo "  ✅ Found public/canada.geojson (Size: $SIZE)"
else
    echo "  ❌ ERROR: public/canada.geojson is missing!"
    echo "  → Downloading now..."
    curl -s -o public/canada.geojson https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson
    if [ -f "public/canada.geojson" ]; then
        echo "  ✅ Downloaded successfully!"
    else
        echo "  ❌ Failed to download. Check your internet connection."
        exit 1
    fi
fi

# Check 3: Check the component configuration
echo ""
echo "✓ Checking component configuration..."
if grep -q 'const GEO_URL = "/canada.geojson"' src/CanadaEvictionsScoringMap.jsx; then
    echo "  ✅ Component configured correctly"
else
    echo "  ⚠️  WARNING: Component may not be using local GeoJSON file"
fi

# Check 4: Node modules installed?
echo ""
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✅ node_modules found"
else
    echo "  ⚠️  node_modules not found"
    echo "  → Run: npm install"
fi

echo ""
echo "=================================="
echo "Summary"
echo "=================================="
echo ""
echo "If all checks passed ✅, try:"
echo ""
echo "1. Stop dev server (Ctrl+C)"
echo "2. Clear cache: rm -rf node_modules/.vite"
echo "3. Restart: npm run dev"
echo "4. Open: http://localhost:5173/"
echo "5. Hard refresh: Cmd+Shift+R"
echo ""
