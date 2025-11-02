/**
 * Provincial Eviction Scores
 * Based on Technical Rubric analysis of Residential Tenancy Acts
 * Score range: 1 (minimal/red) to 5 (best/green)
 */

// Score descriptions for each level (1-5)
export const SCORE_DESCRIPTIONS = {
  1: "Minimal protections",
  2: "Limited protections",
  3: "Moderate protections",
  4: "Strong protections",
  5: "Comprehensive protections"
};

// 10 Key Indicators
export const INDICATORS = [
  {
    id: "notice_termination",
    name: "Notice of Termination",
    shortName: "Notice",
    description: "Required notice periods and termination procedures",
    scoreDescriptions: {
      1: "Minimal notice requirements; limited tenant protections",
      2: "Short notice periods; basic requirements",
      3: "Moderate notice periods; standard protections",
      4: "Extended notice periods; strong tenant safeguards",
      5: "Comprehensive notice requirements; maximum tenant protections"
    }
  },
  {
    id: "hearing_decision",
    name: "Hearing and Decision",
    shortName: "Hearing",
    description: "Dispute period and hearing processes",
    scoreDescriptions: {
      1: "Less than one week to dispute; limited hearing access",
      2: "One week to dispute; basic hearing procedures",
      3: "10-13 days to dispute; standard hearing processes",
      4: "14-20 days to dispute; accessible hearing procedures",
      5: "Two weeks or more to dispute; comprehensive hearing access"
    }
  },
  {
    id: "order_possession",
    name: "Order of Possession",
    shortName: "Possession",
    description: "Process for obtaining and enforcing possession orders",
    scoreDescriptions: {
      1: "Streamlined for landlords; minimal tenant safeguards",
      2: "Landlord-favorable process; limited protections",
      3: "Balanced process; standard protections",
      4: "Tenant-protective procedures; strong safeguards",
      5: "Comprehensive tenant protections; maximum due process"
    }
  },
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
  },
  {
    id: "above_guideline",
    name: "Above Guideline Increases",
    shortName: "AGI",
    description: "Rules for rent increases above standard guidelines",
    scoreDescriptions: {
      1: "No restrictions on above-guideline increases",
      2: "Minimal restrictions; easily obtained",
      3: "Moderate restrictions; standard review process",
      4: "Significant restrictions; rigorous review required",
      5: "Strict limitations; tenant-favorable review process"
    }
  },
  {
    id: "eviction_types",
    name: "Eviction Types",
    shortName: "Eviction Types",
    description: "Range and scope of allowable eviction reasons",
    scoreDescriptions: {
      1: "Broad eviction grounds; minimal restrictions",
      2: "Wide eviction grounds; limited restrictions",
      3: "Standard eviction grounds; moderate restrictions",
      4: "Limited eviction grounds; strong restrictions",
      5: "Narrow eviction grounds; maximum tenant protections"
    }
  },
  {
    id: "compensation",
    name: "Compensation",
    shortName: "Compensation",
    description: "Required compensation for certain evictions",
    scoreDescriptions: {
      1: "No compensation required",
      2: "Minimal compensation in limited circumstances",
      3: "Moderate compensation requirements",
      4: "Strong compensation requirements for most evictions",
      5: "Comprehensive compensation mandated for all non-fault evictions"
    }
  },
  {
    id: "appeals",
    name: "Appeals",
    shortName: "Appeals",
    description: "Appeal and review processes available",
    scoreDescriptions: {
      1: "No appeal mechanism; judicial review only",
      2: "Limited appeal rights; restrictive process",
      3: "Standard appeal process; moderate access",
      4: "Accessible appeal process; multiple review options",
      5: "Comprehensive appeal rights; tenant-friendly review mechanisms"
    }
  },
  {
    id: "onus_filing",
    name: "Onus and Filing Fee",
    shortName: "Onus & Fees",
    description: "Who must file and associated costs",
    scoreDescriptions: {
      1: "Tenant must file; high fees with no waivers",
      2: "Tenant must file; moderate fees with limited waivers",
      3: "Mixed onus; standard fees with some waivers",
      4: "Landlord must file; low fees with waivers available",
      5: "Landlord must file; no fees or automatic waivers"
    }
  },
  {
    id: "conditional_orders",
    name: "Conditional Orders",
    shortName: "Conditional",
    description: "Availability of conditional eviction orders",
    scoreDescriptions: {
      1: "No conditional orders available",
      2: "Limited conditional orders; rarely granted",
      3: "Standard conditional orders; available in some cases",
      4: "Accessible conditional orders; frequently available",
      5: "Comprehensive conditional order system; tenant-favorable"
    }
  }
];

// Provincial scores for each indicator
// REAL DATA from Provincial Eviction Scores.xlsx (extracted and integrated)
export const PROVINCIAL_SCORES = {
  BC: {
    notice_termination: 4,
    hearing_decision: 4,
    order_possession: 5,
    rent_control: 4,
    above_guideline: 4,
    eviction_types: 3,
    compensation: 4,
    appeals: 3,
    onus_filing: 1,
    conditional_orders: 1
  },
  AB: {
    notice_termination: 3,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 2,
    appeals: 2,
    onus_filing: 3,
    conditional_orders: 4
  },
  SK: {
    notice_termination: 4,
    hearing_decision: 5,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 3,
    appeals: 2,
    onus_filing: 4,
    conditional_orders: 4
  },
  MB: {
    notice_termination: 5,
    hearing_decision: 2,
    order_possession: 4,
    rent_control: 3,
    above_guideline: 5,
    eviction_types: 3,
    compensation: 3,
    appeals: 4,
    onus_filing: 3,
    conditional_orders: 3
  },
  ON: {
    notice_termination: 4,
    hearing_decision: 5,
    order_possession: 3,
    rent_control: 3,
    above_guideline: 3,
    eviction_types: 3,
    compensation: 4,
    appeals: 5,
    onus_filing: 5,
    conditional_orders: 4
  },
  QC: {
    notice_termination: 5,
    hearing_decision: 5,
    order_possession: 4,
    rent_control: 3,
    above_guideline: 2,
    eviction_types: 4,
    compensation: 5,
    appeals: 3,
    onus_filing: 4,
    conditional_orders: 3
  },
  NB: {
    notice_termination: 4,
    hearing_decision: 5,
    order_possession: 2,
    rent_control: 3,
    above_guideline: 3,
    eviction_types: 3,
    compensation: 3,
    appeals: 3,
    onus_filing: 2,
    conditional_orders: 3
  },
  NS: {
    notice_termination: 4,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 5,
    appeals: 4,
    onus_filing: 3,
    conditional_orders: 1
  },
  PE: {
    notice_termination: 5,
    hearing_decision: 5,
    order_possession: 3,
    rent_control: 5,
    above_guideline: 4,
    eviction_types: 3,
    compensation: 4,
    appeals: 5,
    onus_filing: 2,
    conditional_orders: 2
  },
  NL: {
    notice_termination: 3,
    hearing_decision: 5,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 3,
    appeals: 3,
    onus_filing: 4,
    conditional_orders: 1
  },
  YT: {
    notice_termination: 3,
    hearing_decision: 3,
    order_possession: 3,
    rent_control: 2,
    above_guideline: 2,
    eviction_types: 3,
    compensation: 2,
    appeals: 3,
    onus_filing: 3,
    conditional_orders: 3
  },
  NT: {
    notice_termination: 3,
    hearing_decision: 3,
    order_possession: 3,
    rent_control: 2,
    above_guideline: 2,
    eviction_types: 3,
    compensation: 2,
    appeals: 3,
    onus_filing: 3,
    conditional_orders: 3
  },
  NU: {
    notice_termination: 3,
    hearing_decision: 3,
    order_possession: 3,
    rent_control: 2,
    above_guideline: 2,
    eviction_types: 3,
    compensation: 2,
    appeals: 3,
    onus_filing: 3,
    conditional_orders: 3
  }
};

// Province names mapping
export const PROVINCE_NAMES = {
  BC: "British Columbia",
  AB: "Alberta",
  SK: "Saskatchewan",
  MB: "Manitoba",
  ON: "Ontario",
  QC: "Québec",
  NB: "New Brunswick",
  NS: "Nova Scotia",
  PE: "Prince Edward Island",
  NL: "Newfoundland and Labrador",
  YT: "Yukon",
  NT: "Northwest Territories",
  NU: "Nunavut"
};

// Helper function to get score for a province and indicator
export function getProvinceScore(provinceId, indicatorId) {
  return PROVINCIAL_SCORES[provinceId]?.[indicatorId] || 3;
}

// Helper function to get score description
export function getScoreExplanation(indicatorId, score) {
  const indicator = INDICATORS.find(i => i.id === indicatorId);
  return indicator?.scoreDescriptions[score] || "No description available";
}

// Color mapping for scores (1=red to 5=green)
export function getScoreColor(score) {
  const colors = {
    1: "#ef4444", // red-500 - Minimal
    2: "#f97316", // orange-500 - Limited
    3: "#eab308", // yellow-500 - Moderate
    4: "#84cc16", // lime-500 - Strong
    5: "#22c55e"  // green-500 - Comprehensive
  };
  return colors[score] || "#9ca3af"; // gray-400 for no data
}
