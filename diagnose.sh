#!/bin/bash

echo "==================================="
echo "Canada Evictions Map Diagnostics"
echo "==================================="
echo ""

echo "1. Checking if you're in the right directory..."
if [ -f "package.json" ]; then
    echo "   ✅ Found package.json"
else
    echo "   ❌ package.json not found - you're in the wrong directory!"
    exit 1
fi

echo ""
echo "2. Checking for canada.geojson file..."
if [ -f "public/canada.geojson" ]; then
    SIZE=$(ls -lh public/canada.geojson | awk '{print $5}')
    echo "   ✅ Found canada.geojson (${SIZE})"
else
    echo "   ❌ canada.geojson NOT FOUND - this is the problem!"
    echo "   Run this to fix:"
    echo "   curl -o public/canada.geojson https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson"
    exit 1
fi

echo ""
echo "3. Checking git branch..."
BRANCH=$(git branch --show-current 2>/dev/null)
if [ -n "$BRANCH" ]; then
    echo "   Current branch: $BRANCH"
    if [ "$BRANCH" != "claude/canada-evictions-map-011CUeqszVM6LmAVwTpuzrHi" ]; then
        echo "   ⚠️  You're on the wrong branch!"
        echo "   Run: git checkout claude/canada-evictions-map-011CUeqszVM6LmAVwTpuzrHi"
    else
        echo "   ✅ On correct branch"
    fi
else
    echo "   ⚠️  Not a git repository"
fi

echo ""
echo "4. Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null)
if [ -n "$NODE_VERSION" ]; then
    echo "   ✅ Node.js $NODE_VERSION"
else
    echo "   ❌ Node.js not found!"
fi

echo ""
echo "5. Checking if dependencies are installed..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules exists"
else
    echo "   ❌ node_modules not found - run: npm install"
fi

echo ""
echo "6. Checking src/CanadaEvictionsScoringMap.jsx..."
if grep -q 'const GEO_URL = "/canada.geojson"' src/CanadaEvictionsScoringMap.jsx 2>/dev/null; then
    echo "   ✅ Using local GeoJSON file"
else
    echo "   ❌ Code is using external URL (outdated)"
    echo "   Run: git pull"
fi

echo ""
echo "==================================="
echo "Summary:"
echo "==================================="
echo "If all checks passed, try:"
echo "1. Stop the dev server (Ctrl+C)"
echo "2. rm -rf node_modules/.vite"
echo "3. npm run dev"
echo "4. Hard refresh browser (Cmd+Shift+R)"
echo ""
