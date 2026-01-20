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
    description: "The amount of advance notice landlords must provide before a tenancy can be terminated, varying by eviction type and reason.",
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
        assaultDamage: "Termination or 'order to correct'",
        goodFaith: "Good faith requirements"
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
        assaultDamage: ">24 - <5 days"
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
    id: "hearing_decision",
    name: "Hearing and Decision",
    shortName: "Hearing",
    description: "The process through which disputes are heard and eviction decisions are made, including accessibility and timeliness.",
    scoreDescriptions: {
      1: "Less than one week to dispute; limited hearing access",
      2: "One week to dispute; basic hearing procedures",
      3: "10-13 days to dispute; standard hearing processes",
      4: "14-20 days to dispute; accessible hearing procedures",
      5: "Two weeks or more to dispute; comprehensive hearing access"
    },
    rubricCriteria: {
      5: {
        disputePeriod: "≥14 days",
        process: "Clear process with minimal barriers",
        hearingAccess: "Free or low-cost, accessible (multiple modes), timely"
      },
      4: {
        disputePeriod: "10-13 days",
        process: "Accessible process",
        hearingAccess: "Accessible (at least 2 modes, moderate cost, minor barriers)"
      },
      3: {
        disputePeriod: "7-9 days",
        process: "Requires effort (written/in-person filing)",
        hearingAccess: "Less accessible (1 mode), moderate cost, some procedural complexity"
      },
      2: {
        disputePeriod: "<7 days",
        process: "High burden effort",
        hearingAccess: "Less accessible (1 mode), higher cost, significant procedural complexity"
      },
      1: {
        disputePeriod: "Extremely limited",
        process: "Unclear dispute process",
        hearingAccess: "Rare or no formal hearing, no tenant participation"
      }
    }
  },
  {
    id: "order_possession",
    name: "Order of Possession",
    shortName: "Possession",
    description: "The final legal stage of eviction, where a court or tribunal issues an order permitting physical removal of the tenant from the rental unit and enforcements.",
    scoreDescriptions: {
      1: "Streamlined for landlords; minimal tenant safeguards",
      2: "Landlord-favorable process; limited protections",
      3: "Balanced process; standard protections",
      4: "Tenant-protective procedures; strong safeguards",
      5: "Comprehensive tenant protections; maximum due process"
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
      2: "Minimal controls; easily circumvented",
      3: "Moderate controls; some limitations",
      4: "Strong, enforceable caps tied to inflation levels",
      5: "Comprehensive rent control with strict enforcement"
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
      1: "No restrictions on above-guideline increases",
      2: "Minimal restrictions; easily obtained",
      3: "Moderate restrictions; standard review process",
      4: "Significant restrictions; rigorous review required",
      5: "Strict limitations; tenant-favorable review process"
    },
    rubricCriteria: {
      5: {
        considerations: "Thorough and mandatory considerations",
        term: "Term limits for AGIs"
      },
      4: {
        considerations: "Thorough and mandatory considerations",
        term: "No term limits"
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
    description: "The grounds for which a landlord can legally evict a tenant, including both at-fault (e.g., non-payment, damage, illegal activity) and no-fault (e.g., landlord use, demolition/renovation).",
    scoreDescriptions: {
      1: "Broad eviction grounds; minimal restrictions",
      2: "Wide eviction grounds; limited restrictions",
      3: "Standard eviction grounds; moderate restrictions",
      4: "Limited eviction grounds; strong restrictions",
      5: "Narrow eviction grounds; maximum tenant protections"
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
      1: "No compensation required",
      2: "Minimal compensation in limited circumstances",
      3: "Moderate compensation requirements",
      4: "Strong compensation requirements for most evictions",
      5: "Comprehensive compensation mandated for all non-fault evictions"
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
      1: "No appeal mechanism; judicial review only",
      2: "Limited appeal rights; restrictive process",
      3: "Standard appeal process; moderate access",
      4: "Accessible appeal process; multiple review options",
      5: "Comprehensive appeal rights; tenant-friendly review mechanisms"
    },
    rubricCriteria: {
      5: {
        cost: "Free appeal process",
        stay: "Automatic stay of eviction",
        accessibility: "Easily accessible",
        period: "30 days between decision and appeal"
      },
      4: {
        cost: "Affordable",
        stay: "Potential for stay",
        accessibility: "Accessible"
      },
      3: {
        availability: "Can appeal",
        stay: "Potential for stay but may not delay eviction"
      },
      2: {
        cost: "Costly or legally burdensome",
        grounds: "Limited grounds for appeal"
      },
      1: {
        availability: "Not practical or available"
      }
    }
  },
  {
    id: "onus_filing",
    name: "Onus and Filing Fee",
    shortName: "Onus & Fees",
    description: "The allocation of legal responsibility and financial burden in eviction proceedings and the cost of filing.",
    scoreDescriptions: {
      1: "Tenant must file; high fees with no waivers",
      2: "Tenant must file; moderate fees with limited waivers",
      3: "Mixed onus; standard fees with some waivers",
      4: "Landlord must file; low fees with waivers available",
      5: "Landlord must file; no fees or automatic waivers"
    },
    rubricCriteria: {
      5: {
        onus: "Onus on landlord",
        fee: "No fees or automatic waivers"
      },
      4: {
        onus: "Onus on landlord",
        fee: "Low fee (<$100)"
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
    description: "Orders that allow tenants facing eviction (particularly for non-payment or remediable breaches) to remain if they meet specific conditions, such as paying arrears by a set date or correcting lease violations/non-payments.",
    scoreDescriptions: {
      1: "No conditional orders available",
      2: "Limited conditional orders; rarely granted",
      3: "Standard conditional orders; available in some cases",
      4: "Accessible conditional orders; frequently available",
      5: "Comprehensive conditional order system; tenant-favorable"
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

// Helper function to get rubric criteria for an indicator
export function getRubricCriteria(indicatorId) {
  const indicator = INDICATORS.find(i => i.id === indicatorId);
  return indicator?.rubricCriteria || null;
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
