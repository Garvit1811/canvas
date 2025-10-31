# Canada Eviction Law Comparison Map

Interactive map comparing eviction laws across all Canadian provinces and territories using a 10-indicator scoring system.

## Overview

This interactive web application visualizes how each Canadian province/territory scores on 10 key eviction law indicators, helping users understand tenant protections across the country.

### Features

- **10 Key Indicators**: Compare provinces across critical eviction law dimensions
- **Interactive Map**: Click provinces to see detailed scores and explanations
- **Score Visualization**: Color-coded gradient (red=minimal to green=comprehensive)
- **Province Navigation**: Quick dropdown to jump to any province
- **Indicator Switching**: Easily switch between different legal indicators
- **PDF Resources**: Links to detailed process maps and methodology documents
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## The 10 Indicators

Each province receives a score of 1-5 for:

1. **Notice of Termination** - Required notice periods
2. **Hearing and Decision** - Dispute periods and hearing processes
3. **Order of Possession** - Possession order procedures
4. **Rent Control** - Rent increase caps and controls
5. **Above Guideline Increases** - Rules for above-guideline increases
6. **Eviction Types** - Range of allowable eviction reasons
7. **Compensation** - Required compensation for evictions
8. **Appeals** - Appeal and review processes
9. **Onus and Filing Fee** - Who must file and costs
10. **Conditional Orders** - Availability of conditional orders

### Score Meanings

- **5** 🟢 Comprehensive protections (Best for tenants)
- **4** 🟢 Strong protections
- **3** 🟡 Moderate protections
- **2** 🟠 Limited protections
- **1** 🔴 Minimal protections

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev
```

Visit http://localhost:5173

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
canvas/
├── src/
│   ├── CanadaEvictionsScoringMap.jsx  # Main map component
│   ├── CanadaEvictionsMap.jsx         # Legacy component (kept for reference)
│   ├── data/
│   │   └── indicatorScores.js         # All scoring data and definitions
│   ├── components/ui/                 # Reusable UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   └── dialog.jsx
│   ├── main.jsx                       # App entry point
│   └── index.css                      # Global styles
├── public/
│   └── pdfs/                          # PDF documents directory
│       └── README.md                  # Instructions for adding PDFs
├── UPDATING_SCORES.md                 # Guide for updating scores
└── README.md                          # This file
```

## Updating Data

### Updating Provincial Scores

See **[UPDATING_SCORES.md](./UPDATING_SCORES.md)** for detailed instructions on:
- How to update scores from Excel data
- Customizing indicator descriptions
- Adding new provinces or indicators

Quick update:
1. Open `src/data/indicatorScores.js`
2. Find the `PROVINCIAL_SCORES` object
3. Update the scores (1-5) for each province and indicator

### Adding PDF Documents

1. Place PDF files in `public/pdfs/` directory:
   - `EvictionMaps_2025.pdf` - Process maps
   - `Eviction_Report.pdf` - Analysis & methodology
   - `Technical_Rubric.pdf` - Scoring criteria

2. See `public/pdfs/README.md` for detailed instructions

## How to Use the Map

### For Website Visitors

1. **Select an Indicator** - Click any of the 10 indicator buttons on the left
2. **View the Map** - Provinces are color-coded by their score (red to green)
3. **Click a Province** - Opens detailed information including:
   - Current indicator score with explanation
   - All 10 indicator scores for that province
   - Links to process maps and analysis documents
4. **Jump to Province** - Use dropdown menu to quickly navigate to specific provinces
5. **Download Resources** - Click PDF links at the top for detailed documentation

### Understanding Scores

When you click on a province, you'll see:
- **Score (1-5)**: Numerical rating for the indicator
- **Explanation**: What that score means for that specific indicator
- **All Indicators**: Quick view of all 10 scores for that province

Example:
> **British Columbia - Rent Control: Score 4**
> "Strong, enforceable caps tied to inflation levels"

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **react-simple-maps** - Interactive map rendering
- **lucide-react** - Icon library

## Data Sources

The scoring is based on analysis of Residential Tenancy Acts across all Canadian provinces and territories, as documented in:
- Technical Rubric (methodology)
- Provincial Eviction Scores spreadsheet
- Individual provincial legislation reviews

## Contributing

To contribute updates or corrections:

1. Update scores in `src/data/indicatorScores.js`
2. Test locally: `npm run dev`
3. Build to verify: `npm run build`
4. Submit changes

## Notes

- Current scores are based on analysis as of 2025
- Provincial laws change over time - verify with official sources
- This tool is for educational and comparison purposes
- Always consult local legal resources for specific cases

## License

Private project. All rights reserved.

## Support

For questions about the scoring methodology, see the Technical Rubric PDF.
For technical issues with the map application, contact the development team.

---

**Last Updated**: October 2025
