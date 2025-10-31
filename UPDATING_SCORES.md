# Updating Provincial Scores

This guide explains how to update the provincial eviction scores in the interactive map.

## Score Data Location

The provincial scores are stored in: **`src/data/indicatorScores.js`**

## Updating Scores

### From Excel File (Provincial Eviction Scores.xlsx)

1. Open `src/data/indicatorScores.js`
2. Find the `PROVINCIAL_SCORES` object (around line 90)
3. Update the scores for each province and indicator

### Score Format

Each province has scores for 10 indicators:

```javascript
BC: {
  notice_termination: 4,      // Score 1-5
  hearing_decision: 4,
  order_possession: 4,
  rent_control: 4,
  above_guideline: 4,
  eviction_types: 4,
  compensation: 3,
  appeals: 3,
  onus_filing: 2,
  conditional_orders: 4
}
```

## The 10 Indicators

1. **notice_termination** - Notice of Termination requirements
2. **hearing_decision** - Hearing and Decision processes (dispute periods)
3. **order_possession** - Order of Possession procedures
4. **rent_control** - Rent Control mechanisms
5. **above_guideline** - Above Guideline Increases rules
6. **eviction_types** - Eviction Types allowed
7. **compensation** - Compensation requirements
8. **appeals** - Appeals processes
9. **onus_filing** - Onus and Filing Fee
10. **conditional_orders** - Conditional Orders availability

## Score Meanings

- **5** = Comprehensive protections (green) - Best for tenants
- **4** = Strong protections (lime)
- **3** = Moderate protections (yellow)
- **2** = Limited protections (orange)
- **1** = Minimal protections (red) - Least tenant protections

## Customizing Score Descriptions

To update what each score means for a specific indicator:

1. Find the `INDICATORS` array in `src/data/indicatorScores.js`
2. Locate the indicator you want to update
3. Modify the `scoreDescriptions` object

Example:
```javascript
{
  id: "rent_control",
  name: "Rent Control",
  shortName: "Rent Control",
  description: "Rent increase caps and control mechanisms",
  scoreDescriptions: {
    1: "No rent control",
    2: "Minimal controls; easily circumvented",
    3: "Moderate controls; some limitations",
    4: "Strong, enforceable caps tied to inflation levels",
    5: "Comprehensive rent control with strict enforcement"
  }
}
```

## Testing Changes

After updating scores:

1. Save the file
2. The development server will auto-reload (if running `npm run dev`)
3. Or rebuild: `npm run build`
4. Click through provinces and indicators to verify changes

## Province Codes

Use these two-letter codes in the data file:

- BC = British Columbia
- AB = Alberta
- SK = Saskatchewan
- MB = Manitoba
- ON = Ontario
- QC = Québec
- NB = New Brunswick
- NS = Nova Scotia
- PE = Prince Edward Island
- NL = Newfoundland and Labrador
- YT = Yukon
- NT = Northwest Territories
- NU = Nunavut

## Notes

- All scores must be integers from 1 to 5
- The map colors update automatically based on scores
- Current scores are placeholders - replace with actual data from your Technical Rubric analysis
