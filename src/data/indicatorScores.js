/**
 * Provincial Eviction Scores
 * Based on Technical Rubric analysis of Residential Tenancy Acts
 * Data source: ProvincialScores_AM.xlsx and RenterRights_2026.docx
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

// 12 Key Indicators
export const INDICATORS = [
  {
    id: "notice_termination",
    name: "Notice of Termination",
    shortName: "Notice",
    description: "The amount of advance notice landlords must provide before a tenancy can be terminated, varying by eviction type and reason. Score is based on an average of five sub-categories (non-payment, landlord use, purchaser's use, demolition/renovation, assault/damage), with additional points for good faith requirements and protected group provisions.",
    scoreDescriptions: {
      1: "Minimal notice requirements; limited tenant protections",
      2: "Short notice periods; basic requirements",
      3: "Moderate notice periods; standard protections",
      4: "Extended notice periods; strong tenant safeguards",
      5: "Comprehensive notice requirements; maximum tenant protections"
    },
    rubricCriteria: {
      5: {
        nonPayment: "More than 20 days",
        landlordUse: "More than 3 months",
        purchaserUse: "More than 3 months",
        demolitionRenovation: "More than 4 months",
        assaultDamage: "Termination or 'order to correct'"
      },
      4: {
        nonPayment: "15-20 days",
        landlordUse: "2-3 months",
        purchaserUse: "2-3 months",
        demolitionRenovation: "3-4 months",
        assaultDamage: "10-20 days"
      },
      3: {
        nonPayment: "7-14 days",
        landlordUse: "1-2 months",
        purchaserUse: "1-2 months",
        demolitionRenovation: "2-3 months",
        assaultDamage: ">5 days - <10 days"
      },
      2: {
        nonPayment: "1-7 days",
        landlordUse: "Less than 1 month",
        purchaserUse: "Less than 1 month",
        demolitionRenovation: "1-2 months",
        assaultDamage: ">24 hours - <5 days"
      },
      1: {
        nonPayment: "Immediate",
        landlordUse: "Immediate",
        purchaserUse: "Immediate",
        demolitionRenovation: "Less than 1 month",
        assaultDamage: "<24 hours"
      }
    }
  },
  {
    id: "dispute_period",
    name: "Dispute Period",
    shortName: "Dispute",
    description: "The amount of time a tenant has to dispute a notice of termination once received. Higher scores are given to provinces with mediation/investigation processes, longer dispute periods, clear processes, and multiple dispute options.",
    scoreDescriptions: {
      1: "Extremely limited or unclear dispute process",
      2: "Short dispute period with high burden on tenant",
      3: "Moderate dispute period with accessible process",
      4: "14+ days to dispute with clear, accessible process",
      5: "Rental officer investigates and seeks mediated solution prior to hearing"
    },
    rubricCriteria: {
      5: {
        process: "Rental officer investigates and seeks mediated solution prior to hearing"
      },
      4: {
        disputePeriod: "≥14 days",
        process: "Clear process with minimal barriers"
      },
      3: {
        disputePeriod: "10-13 days",
        process: "Accessible process"
      },
      2: {
        disputePeriod: "<10 days",
        process: "High burden effort"
      },
      1: {
        disputePeriod: "Extremely limited",
        process: "Unclear dispute process"
      }
    }
  },
  {
    id: "hearing_decision",
    name: "Hearing and Decision",
    shortName: "Hearing",
    description: "The process through which disputes are heard and eviction decisions are made. Provinces are scored on cost, accessibility (modes of hearing), and timeliness of decisions.",
    scoreDescriptions: {
      1: "Rare or no formal hearing; tenants have no ability to participate",
      2: "Less accessible (1 mode), higher cost, procedural complexity for tenant",
      3: "Less accessible (1 mode), moderate cost, procedural complexity for tenant",
      4: "Accessible mode (at least 2 modes, moderate cost, minor barriers)",
      5: "Free/low-cost, accessible (multiple modes of hearing), timely"
    },
    rubricCriteria: {
      5: {
        cost: "Free or low-cost",
        hearingAccess: "Multiple modes of hearing available",
        timeliness: "Timely decisions"
      },
      4: {
        hearingAccess: "At least 2 modes of hearing",
        cost: "Moderate cost",
        barriers: "Minor barriers"
      },
      3: {
        hearingAccess: "1 mode of hearing",
        cost: "Moderate cost",
        barriers: "Some procedural complexity for tenant"
      },
      2: {
        hearingAccess: "1 mode of hearing",
        cost: "Higher cost",
        barriers: "Procedural complexity for tenant"
      },
      1: {
        hearingAccess: "Rare or no formal hearing",
        tenantParticipation: "Tenants have no ability to participate"
      }
    }
  },
  {
    id: "order_possession",
    name: "Order of Possession",
    shortName: "Possession",
    description: "The final legal stage of eviction, where a court or tribunal issues an order permitting physical removal of the tenant from the rental unit and enforcements.",
    scoreDescriptions: {
      1: "Almost automatic eviction; no opportunity for tenant input or delay",
      2: "Minimal checks; no opportunity to delay or contest enforcement",
      3: "Typical enforcement process; order issued after hearing",
      4: "Procedural checks; tribunal/court discretion to delay or refuse enforcement",
      5: "Multiple procedural checks; proven necessity from landlord; landlord application needed"
    },
    rubricCriteria: {
      5: {
        proceduralChecks: "Multiple procedural checks required",
        landlordRequirement: "Proven necessity from landlord required",
        application: "Landlord application needed"
      },
      4: {
        proceduralChecks: "Procedural checks in place",
        discretion: "Tribunal/court discretion to delay or refuse enforcement"
      },
      3: {
        enforcement: "Typical enforcement process",
        orderIssued: "Order issued after hearing"
      },
      2: {
        checks: "Minimal checks",
        tenantOpportunity: "No opportunity to delay or contest enforcement"
      },
      1: {
        eviction: "Almost automatic eviction",
        tenantInput: "No opportunity for tenant input or delay"
      }
    }
  },
  {
    id: "rent_control",
    name: "Rent Control",
    shortName: "Rent Control",
    description: "Regulations that cap the annual percentage by which landlords can increase rent for occupied units, typically tied to inflation or cost indices, and whether increases are tied to the unit (vacancy control) or the tenant.",
    scoreDescriptions: {
      1: "No rent control",
      2: "Rare, weak protections; easy to bypass",
      3: "Limited protections; rent control only for certain tenancies or easy for landlord to get increases",
      4: "Strong, enforceable caps tied to inflation level",
      5: "Strong, enforceable caps tied to the unit (not tenancy)"
    },
    rubricCriteria: {
      5: {
        strength: "Strong, enforceable caps to increases",
        coverage: "Tied to the unit (not tenancy)"
      },
      4: {
        strength: "Strong, enforceable caps",
        coverage: "Tied to inflation level"
      },
      3: {
        protections: "Limited protections",
        coverage: "Rent control only for certain tenancies",
        landlordAccess: "Easy for landlord to get increases"
      },
      2: {
        strength: "Rare, weak protections",
        landlordAccess: "Easy to bypass process for increases"
      },
      1: {
        status: "No rent control"
      }
    }
  },
  {
    id: "above_guideline",
    name: "Above Guideline Increases",
    shortName: "AGI",
    description: "The rules governing when and how landlords can apply for rent increases exceeding the annual allowable guideline, including the evidentiary requirements, review process, and tenant participation rights.",
    scoreDescriptions: {
      1: "Not applicable (no rent control)",
      2: "No maximum on above guideline increases; no term limits",
      3: "Some consideration but no term limits",
      4: "Thorough and mandatory considerations; no term limits",
      5: "Thorough and mandatory considerations; with term limits for AGIs"
    },
    rubricCriteria: {
      5: {
        considerations: "Thorough and mandatory considerations",
        term: "Term limits for AGIs"
      },
      4: {
        considerations: "Thorough and mandatory considerations",
        term: "No term limits (no end date upon which the AGI expires)"
      },
      3: {
        considerations: "Some consideration",
        term: "No term limits"
      },
      2: {
        maximum: "No maximum on above guideline increases",
        term: "No term limits"
      },
      1: {
        status: "Not applicable"
      }
    }
  },
  {
    id: "eviction_types",
    name: "Eviction Types",
    shortName: "Eviction Types",
    description: "The grounds on which a landlord can legally evict a tenant, including both at-fault (e.g., non-payment, damage, illegal activity) and no-fault (e.g., landlord use, demolition/renovation).",
    scoreDescriptions: {
      1: "No limits on eviction grounds",
      2: "Landlord discretion for no-cause; few restrictions",
      3: "Allows some no-fault evictions with safeguards (notice, compensation, proof)",
      4: "Strict cause required in most cases; tightly regulated",
      5: "Only for serious cause; no-fault evictions banned"
    },
    rubricCriteria: {
      5: {
        grounds: "Only for serious cause",
        noFault: "No-fault evictions banned"
      },
      4: {
        grounds: "Strict cause required in most cases",
        regulation: "Tightly regulated"
      },
      3: {
        grounds: "Allows some no-fault evictions",
        safeguards: "With safeguards (notice, compensation, proof)"
      },
      2: {
        grounds: "Landlord discretion for no-cause",
        restrictions: "Few restrictions"
      },
      1: {
        limits: "No limits on eviction grounds"
      }
    }
  },
  {
    id: "compensation",
    name: "Compensation",
    shortName: "Compensation",
    description: "The financial remedies available to tenants evicted for no-fault reasons such as landlord use, property sale, or planned demolition/renovation.",
    scoreDescriptions: {
      1: "No compensation",
      2: "Rare or discretionary; not required by law",
      3: "Limited to specific cases; requires application",
      4: "Available for no-fault/renoviction; less than 3 months rent",
      5: "Mandatory, substantial compensation (≥3 months rent)"
    },
    rubricCriteria: {
      5: {
        requirement: "Mandatory compensation",
        amount: "Substantial (≥3 months rent)"
      },
      4: {
        availability: "Available for no-fault/renoviction",
        amount: "Less than 3 months rent"
      },
      3: {
        availability: "Limited to specific cases",
        process: "Requires application"
      },
      2: {
        availability: "Rare or discretionary",
        requirement: "Not required by law"
      },
      1: {
        status: "No compensation"
      }
    }
  },
  {
    id: "appeals",
    name: "Appeals",
    shortName: "Appeals",
    description: "The ability to challenge eviction decisions through a higher review process, including availability, cost, timelines, and automatic stay provisions.",
    scoreDescriptions: {
      1: "No stay available",
      2: "Potential for stay if appealed within 7-30 days",
      3: "Automatic stay; less than 10 days between decision and appeal",
      4: "Automatic stay; 10-20 days between decision and appeal",
      5: "Automatic stay; 20-30 days between decision and appeal"
    },
    rubricCriteria: {
      5: {
        stay: "Automatic stay of eviction",
        period: "20-30 days between decision and appeal"
      },
      4: {
        stay: "Automatic stay of eviction",
        period: "10-20 days between decision and appeal"
      },
      3: {
        stay: "Automatic stay of eviction",
        period: "Less than 10 days between decision and appeal"
      },
      2: {
        stay: "Potential for stay if appealed within 7-30 days"
      },
      1: {
        availability: "No stay available"
      }
    }
  },
  {
    id: "onus_filing",
    name: "Onus and Filing Fee",
    shortName: "Onus & Fees",
    description: "The allocation of legal responsibility and financial burden in eviction proceedings and the cost of filing.",
    scoreDescriptions: {
      1: "High fee; onus on tenant",
      2: "Onus on tenant",
      3: "Hybrid onus (shared responsibility)",
      4: "Onus on landlord; lower fee (<$100)",
      5: "Onus on landlord; high fee for landlord (>$100)"
    },
    rubricCriteria: {
      5: {
        onus: "Onus on landlord",
        fee: "High fee for landlord (>$100)"
      },
      4: {
        onus: "Onus on landlord",
        fee: "Lower fee (<$100)"
      },
      3: {
        onus: "Hybrid onus (shared responsibility)"
      },
      2: {
        onus: "Onus on tenant"
      },
      1: {
        onus: "Onus on tenant",
        fee: "High fee (>$100), no waivers"
      }
    }
  },
  {
    id: "conditional_orders",
    name: "Conditional Orders",
    shortName: "Conditional",
    description: "Orders that allow tenants facing eviction (particularly for non-payment or remediable breaches) to remain if specific conditions are met, such as paying arrears by a set date or correcting lease violations including payments.",
    scoreDescriptions: {
      1: "Not permitted or unclear",
      2: "Rarely used or allowed",
      3: "Theoretically available; rarely used",
      4: "Available and issued in some cases",
      5: "Routinely used to prevent eviction"
    },
    rubricCriteria: {
      5: {
        usage: "Routinely used to prevent eviction"
      },
      4: {
        availability: "Available and issued in some cases"
      },
      3: {
        availability: "Theoretically available",
        usage: "Rarely used"
      },
      2: {
        usage: "Rarely used or allowed"
      },
      1: {
        status: "Not permitted or unclear"
      }
    }
  },
  {
    id: "deemed_renewal",
    name: "Deemed Renewal",
    shortName: "Deemed Renewal",
    description: "Whether a fixed-term tenancy automatically continues (is 'deemed renewed') when it expires, without requiring a new agreement or the landlord's consent, so long as the tenant remains in possession and the tenancy has not been lawfully terminated.",
    scoreDescriptions: {
      1: "No deemed renewal",
      2: "Deemed renewal with landlord consent required",
      3: "Deemed renewal with weaker protection (shorter term, more additional conditions)",
      4: "Deemed renewal with grace period",
      5: "Strong automatic deemed renewal with full protections"
    },
    rubricCriteria: {
      5: {
        renewal: "Strong automatic deemed renewal",
        protections: "Full legal protections maintained"
      },
      4: {
        renewal: "Deemed renewal with grace period"
      },
      3: {
        renewal: "Deemed renewal with weaker protection",
        conditions: "Shorter term or more additional conditions"
      },
      2: {
        renewal: "Deemed renewal with landlord consent required"
      },
      1: {
        status: "No deemed renewal"
      }
    }
  }
];

// Provincial scores for each indicator
// Data from ProvincialScores_AM.xlsx (verified March 2026)
// Notice of Termination scores are rounded from composite (average of 5 sub-categories + binary bonuses), capped at 5
export const PROVINCIAL_SCORES = {
  BC: {
    notice_termination: 4,
    dispute_period: 3,
    hearing_decision: 4,
    order_possession: 5,
    rent_control: 4,
    above_guideline: 4,
    eviction_types: 3,
    compensation: 4,
    appeals: 1,
    onus_filing: 1,
    conditional_orders: 1,
    deemed_renewal: 5
  },
  AB: {
    notice_termination: 3,
    dispute_period: 3,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 2,
    appeals: 1,
    onus_filing: 3,
    conditional_orders: 4,
    deemed_renewal: 1
  },
  SK: {
    notice_termination: 4,
    dispute_period: 4,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 3,
    appeals: 4,
    onus_filing: 4,
    conditional_orders: 4,
    deemed_renewal: 1
  },
  MB: {
    notice_termination: 5,
    dispute_period: 2,
    hearing_decision: 3,
    order_possession: 4,
    rent_control: 3,
    above_guideline: 5,
    eviction_types: 4,
    compensation: 3,
    appeals: 3,
    onus_filing: 3,
    conditional_orders: 3,
    deemed_renewal: 4
  },
  ON: {
    notice_termination: 4,
    dispute_period: 4,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 3,
    above_guideline: 3,
    eviction_types: 3,
    compensation: 4,
    appeals: 4,
    onus_filing: 5,
    conditional_orders: 4,
    deemed_renewal: 5
  },
  QC: {
    notice_termination: 5,
    dispute_period: 4,
    hearing_decision: 3,
    order_possession: 4,
    rent_control: 3,
    above_guideline: 2,
    eviction_types: 4,
    compensation: 5,
    appeals: 1,
    onus_filing: 4,
    conditional_orders: 3,
    deemed_renewal: 4
  },
  NB: {
    notice_termination: 4,
    dispute_period: 4,
    hearing_decision: 1,
    order_possession: 2,
    rent_control: 3,
    above_guideline: 3,
    eviction_types: 3,
    compensation: 3,
    appeals: 3,
    onus_filing: 2,
    conditional_orders: 1,
    deemed_renewal: 1
  },
  NS: {
    notice_termination: 4,
    dispute_period: 3,
    hearing_decision: 5,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 5,
    appeals: 4,
    onus_filing: 3,
    conditional_orders: 1,
    deemed_renewal: 2
  },
  PE: {
    notice_termination: 5,
    dispute_period: 4,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 5,
    above_guideline: 4,
    eviction_types: 3,
    compensation: 4,
    appeals: 5,
    onus_filing: 2,
    conditional_orders: 2,
    deemed_renewal: 5
  },
  NL: {
    notice_termination: 3,
    dispute_period: 4,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 1,
    compensation: 3,
    appeals: 2,
    onus_filing: 4,
    conditional_orders: 1,
    deemed_renewal: 4
  },
  YT: {
    notice_termination: 5,
    dispute_period: 3,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 4,
    above_guideline: 4,
    eviction_types: 3,
    compensation: 4,
    appeals: 2,
    onus_filing: 2,
    conditional_orders: 1,
    deemed_renewal: 4
  },
  NT: {
    notice_termination: 4,
    dispute_period: 5,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 1,
    appeals: 2,
    onus_filing: 2,
    conditional_orders: 3,
    deemed_renewal: 5
  },
  NU: {
    notice_termination: 4,
    dispute_period: 5,
    hearing_decision: 4,
    order_possession: 3,
    rent_control: 1,
    above_guideline: 1,
    eviction_types: 3,
    compensation: 1,
    appeals: 3,
    onus_filing: 3,
    conditional_orders: 1,
    deemed_renewal: 5
  }
};

// Notice of Termination sub-component data from spreadsheet
// Total = sum of 5 sub-category scores (each 1-5, max 25), Average = Total/5
// Good Faith: 1 = has good faith legislation, 0 = does not
// Protected Group: 1 = has protected group provisions, 0 = does not
export const NOTICE_BREAKDOWN = {
  BC:  { total: 17, average: 3.4, goodFaith: true,  protectedGroup: false },
  AB:  { total: 16, average: 3.2, goodFaith: false, protectedGroup: false },
  SK:  { total: 16, average: 3.2, goodFaith: true,  protectedGroup: false },
  MB:  { total: 14, average: 2.8, goodFaith: false, protectedGroup: true  },
  ON:  { total: 16, average: 3.2, goodFaith: true,  protectedGroup: false },
  QC:  { total: 24, average: 4.8, goodFaith: false, protectedGroup: true  },
  NB:  { total: 15, average: 3.0, goodFaith: true,  protectedGroup: false },
  NS:  { total: 16, average: 3.2, goodFaith: true,  protectedGroup: false },
  PE:  { total: 21, average: 4.2, goodFaith: true,  protectedGroup: false },
  NL:  { total: 16, average: 3.2, goodFaith: false, protectedGroup: false },
  YT:  { total: 19, average: 3.8, goodFaith: false, protectedGroup: true  },
  NT:  { total: 17, average: 3.4, goodFaith: false, protectedGroup: true  },
  NU:  { total: 17, average: 3.4, goodFaith: false, protectedGroup: true  }
};

// Binary bonus/penalty indicators per province
// These are additional +1 or -1 modifiers applied to certain indicator scores
export const BINARY_MODIFIERS = {
  // Notice of Termination bonuses (already factored into final score)
  notice_termination: {
    goodFaith: {
      label: "Good Faith Requirement",
      description: "Province has legislation requiring that terminations are made in good faith",
      type: "bonus",
      provinces: ["BC", "SK", "ON", "NB", "NS", "PE"]
    },
    protectedGroup: {
      label: "Protected Group Provisions",
      description: "Certain groups have additional protections (e.g., seniors, tenants with school-age children, mobile home tenants in winter months)",
      type: "bonus",
      details: {
        QC: "Seniors who have lived in the unit for >10 years cannot be evicted for landlord use",
        MB: "Tenants with school-age children cannot be evicted during the school year if residence is within reasonable distance to school",
        YT: "Protection against eviction for people living in mobile homes during December, January, and February",
        NT: "Protection against eviction for people living in mobile homes during December, January, and February",
        NU: "Protection against eviction for people living in mobile homes during December, January, and February"
      },
      provinces: ["QC", "MB", "YT", "NT", "NU"]
    }
  },
  // Dispute Period bonuses
  dispute_period: {
    voidOption: {
      label: "Void Option",
      description: "Tenant has the option to void the notice of termination",
      type: "bonus",
      provinces: [] // Data not available in spreadsheet; can be populated later
    }
  },
  // Order of Possession bonuses
  order_possession: {
    gracePeriod: {
      label: "Grace Period",
      description: "A grace period is provided before enforcement of the order of possession",
      type: "bonus",
      provinces: [] // Data not available in spreadsheet; can be populated later
    },
    proportionality: {
      label: "Proportionality",
      description: "Proportionality considerations are included in order of possession decisions",
      type: "bonus",
      provinces: [] // Data not available in spreadsheet; can be populated later
    }
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

// Helper function to get rubric criteria for an indicator
export function getRubricCriteria(indicatorId) {
  const indicator = INDICATORS.find(i => i.id === indicatorId);
  return indicator?.rubricCriteria || null;
}

// Get binary modifiers for a province and indicator
export function getProvinceModifiers(provinceId, indicatorId) {
  const indicatorModifiers = BINARY_MODIFIERS[indicatorId];
  if (!indicatorModifiers) return [];

  const results = [];
  for (const [key, modifier] of Object.entries(indicatorModifiers)) {
    if (modifier.provinces.includes(provinceId)) {
      results.push({
        key,
        label: modifier.label,
        description: modifier.description,
        type: modifier.type,
        detail: modifier.details?.[provinceId] || null
      });
    }
  }
  return results;
}

// Get notice breakdown for a province
export function getNoticeBreakdown(provinceId) {
  return NOTICE_BREAKDOWN[provinceId] || null;
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
