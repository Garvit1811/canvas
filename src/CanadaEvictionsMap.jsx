import React, { useState, useMemo } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Search } from "lucide-react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

/**
 * Canada Eviction Processes – Interactive Map (Draft)
 * -------------------------------------------------
 * What this is:
 * - A single-file React app that renders an interactive choropleth-style map of Canada by province/territory.
 * - Hover/click a region to see a concise, comparable snapshot of eviction processes.
 * - Includes a search and filter bar, legend, and a details dialog with a step-by-step flow summary.
 *
 * How to use:
 * - This is a draft with placeholder data and simplified SVG geometries for performance.
 * - Replace `REGION_DATA` with authoritative content per region.
 * - The color scale is driven by `avgTimelineDays` but you can switch to any metric.
 *
 * Notes:
 * - Uses Tailwind classes and shadcn/ui components.
 * - Geometry: coarse polygons sized for dashboard use; swap with topojson if you need exact borders.
 */

// ---------------------------
// 1) Data model (replace me!)
// ---------------------------

// Minimal comparable schema. You can extend as needed.
const REGION_DATA = [
  {
    id: "BC",
    name: "British Columbia",
    tribunal: "BC Residential Tenancy Branch (RTB)",
    noticeTypes: [
      { code: "10-day", reason: "Non-payment of rent" },
      { code: "1-month", reason: "Cause / Breach" },
      { code: "2-month", reason: "Landlord use / sale" },
    ],
    filing: "Online (RTB), fee applies; expedited where safety/illegal acts alleged.",
    hearing: "Mostly remote; written submissions common.",
    appeal: "Review Consideration (RTC) or JR at BC Supreme Court.",
    avgTimelineDays: 45,
    notes: "Service rules strict; evidence package deadlines ~7 days before hearing.",
    steps: [
      "Serve notice (proper form + method).",
      "If disputed, tenant files Dispute Resolution within statutory window.",
      "Hearing scheduled; parties exchange evidence.",
      "Decision/order; if eviction granted, order enforceable via Supreme Court (bailiff).",
    ],
    links: [
      { label: "RTB – Eviction Notices", url: "https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/evictions" },
    ],
  },
  {
    id: "AB",
    name: "Alberta",
    tribunal: "Residential Tenancy Dispute Resolution Service (RTDRS) / Court",
    noticeTypes: [
      { code: "14-day", reason: "Cause / Breach" },
      { code: "24-hour", reason: "Substantial interference / safety" },
      { code: "Immediate", reason: "Fixed-term end (no renewal)" },
    ],
    filing: "RTDRS (online/in-person) or Provincial Court; fees apply.",
    hearing: "Virtual or in-person; affidavits accepted.",
    appeal: "Court of King's Bench (appeal/JR depending).",
    avgTimelineDays: 35,
    notes: "Possession orders enforced by Civil Enforcement Agencies.",
    steps: [
      "Serve notice (Form 7/8 equivalents).",
      "File with RTDRS if tenant disputes/doesn’t vacate.",
      "Hearing; order of possession.",
      "Enforcement via Civil Enforcement (bailiff).",
    ],
    links: [
      { label: "RTDRS – File a Claim", url: "https://www.alberta.ca/residential-tenancy-dispute-resolution-service" },
    ],
  },
  {
    id: "SK",
    name: "Saskatchewan",
    tribunal: "Office of Residential Tenancies (ORT)",
    noticeTypes: [
      { code: "14-day", reason: "Non-payment / Cause" },
      { code: "Immediate", reason: "Severe breach" },
    ],
    filing: "ORT application online; fees apply.",
    hearing: "Phone/virtual; documentary evidence.",
    appeal: "Court of King's Bench (appeal on law).",
    avgTimelineDays: 30,
    notes: "Use proper service per The Residential Tenancies Act, 2006.",
    steps: [
      "Serve notice with particulars.",
      "Apply to ORT if disputed/non-compliance.",
      "Hearing and order.",
      "Sheriff enforcement if necessary.",
    ],
    links: [
      { label: "ORT – Applications", url: "https://saskatchewan.ca/ORT" },
    ],
  },
  {
    id: "MB",
    name: "Manitoba",
    tribunal: "Residential Tenancies Branch / Commission",
    noticeTypes: [
      { code: "5-day", reason: "Non-payment" },
      { code: "1-week+", reason: "Breach / Cause" },
    ],
    filing: "Branch applications; some expedited processes.",
    hearing: "Phone/virtual hearings.",
    appeal: "Residential Tenancies Commission; JR at Court of KB.",
    avgTimelineDays: 40,
    notes: "Enforcement via Court of KB Sheriff.",
    steps: [
      "Serve notice per Act/regulations.",
      "Apply to Branch for order of possession.",
      "Hearing; order issued.",
      "File with court for enforcement if needed.",
    ],
    links: [
      { label: "Manitoba RTB", url: "https://www.gov.mb.ca/cca/rtb/" },
    ],
  },
  {
    id: "ON",
    name: "Ontario",
    tribunal: "Landlord and Tenant Board (LTB)",
    noticeTypes: [
      { code: "N4", reason: "Non-payment of rent" },
      { code: "N5/N7", reason: "Interference / safety" },
      { code: "N12/N13", reason: "Landlord use / demolition" },
    ],
    filing: "LTB e-File (e.g., L1 for non-payment). Fees apply.",
    hearing: "Zoom/phone written; disclosure deadlines apply.",
    appeal: "Request to Review / Divisional Court JR.",
    avgTimelineDays: 90,
    notes: "Sheriff (Court Enforcement Office) executes eviction, not landlord.",
    steps: [
      "Serve correct N-form with details.",
      "File application (e.g., L1) if tenant doesn’t remedy/vacate.",
      "Hearing; order of eviction/repayment/conditions.",
      "File with Sheriff to enforce; locksmith on execution day.",
    ],
    links: [
      { label: "LTB – Forms & Guides", url: "https://tribunalsontario.ca/ltb/" },
    ],
  },
  {
    id: "QC",
    name: "Québec",
    tribunal: "Tribunal administratif du logement (TAL)",
    noticeTypes: [
      { code: "10 days", reason: "Non-payment (mise en demeure)" },
      { code: "3 months+", reason: "Repossession / major work (varies)" },
    ],
    filing: "TAL online services; fees apply.",
    hearing: "In-person/virtual; French/English.",
    appeal: "Reconsideration/JR at Superior Court.",
    avgTimelineDays: 60,
    notes: "Enforcement via bailiff (huissier); strong Written notice norms.",
    steps: [
      "Serve notice / demand letter as required.",
      "File application with TAL.",
      "Hearing; decision (ordonnance).",
      "Bailiff enforcement.",
    ],
    links: [
      { label: "TAL – Tenants & Lessors", url: "https://www.tal.gouv.qc.ca/" },
    ],
  },
  {
    id: "NB",
    name: "New Brunswick",
    tribunal: "Residential Tenancies Tribunal (Service NB)",
    noticeTypes: [
      { code: "7-15 days", reason: "Non-payment / Cause (varies)" },
    ],
    filing: "Application to the Tribunal (online).",
    hearing: "Teleconference/written decisions common.",
    appeal: "Judicial review at Court of KB.",
    avgTimelineDays: 28,
    notes: "Sheriff/bailiff enforcement.",
    steps: [
      "Serve notice per Act.",
      "File application if unresolved.",
      "Hearing and order.",
      "Court-filed enforcement if needed.",
    ],
    links: [
      { label: "Service NB – Rentals", url: "https://www2.snb.ca/" },
    ],
  },
  {
    id: "NS",
    name: "Nova Scotia",
    tribunal: "Residential Tenancies Program (NS)",
    noticeTypes: [
      { code: "15 days", reason: "Non-payment / Cause" },
      { code: "2 months+", reason: "Landlord use / renovations" },
    ],
    filing: "Director’s Order / Hearing application.",
    hearing: "Phone/virtual hearings; standard forms.",
    appeal: "Small Claims Court / Supreme Court pathways.",
    avgTimelineDays: 35,
    notes: "Sheriff enforcement.",
    steps: [
      "Serve Notice to Quit (Form C/D/etc.).",
      "Apply for hearing if unresolved.",
      "Hearing; order of vacant possession.",
      "File with court for enforcement.",
    ],
    links: [
      { label: "NS – Residential Tenancies", url: "https://novascotia.ca/sns/access/land/residential-tenancies.asp" },
    ],
  },
  {
    id: "PE",
    name: "Prince Edward Island",
    tribunal: "Island Regulatory & Appeals Commission (IRAC) – Rentals",
    noticeTypes: [
      { code: "10 days", reason: "Non-payment" },
      { code: "1-2 months", reason: "Cause / Landlord use" },
    ],
    filing: "IRAC application; fees modest.",
    hearing: "Hearings scheduled quickly; written possible.",
    appeal: "Appeal division / Supreme Court.",
    avgTimelineDays: 25,
    notes: "Sheriff enforcement if needed.",
    steps: [
      "Serve notice using IRAC forms.",
      "Apply to IRAC if tenant disputes or doesn’t vacate.",
      "Hearing; order of possession.",
      "Court-filed enforcement.",
    ],
    links: [
      { label: "IRAC – Rentals", url: "https://www.irac.pe.ca/rental-appeal-board" },
    ],
  },
  {
    id: "NL",
    name: "Newfoundland & Labrador",
    tribunal: "Residential Tenancies – Service NL",
    noticeTypes: [
      { code: "5-10 days", reason: "Non-payment / Cause (varies)" },
    ],
    filing: "Director’s application; expedited options exist.",
    hearing: "Phone/in-person.",
    appeal: "Supreme Court of NL (JR).",
    avgTimelineDays: 32,
    notes: "Sheriff enforcement where needed.",
    steps: [
      "Serve notice (Form A/B/etc.).",
      "Apply to Director if unresolved.",
      "Hearing; order issued.",
      "Enforce via court.",
    ],
    links: [
      { label: "Service NL – Residential Tenancies", url: "https://www.gov.nl.ca/dgsnl/residential-tenancies/" },
    ],
  },
  {
    id: "YT",
    name: "Yukon",
    tribunal: "Residential Tenancies Office (RTO)",
    noticeTypes: [
      { code: "14 days", reason: "Non-payment / Cause" },
    ],
    filing: "RTO application.",
    hearing: "Phone/virtual; written submissions.",
    appeal: "Supreme Court of Yukon (JR).",
    avgTimelineDays: 27,
    notes: "Sheriff/bailiff enforcement via court.",
    steps: [
      "Serve notice per Act.",
      "Apply to RTO.",
      "Hearing; order.",
      "Court-filed enforcement.",
    ],
    links: [
      { label: "Yukon RTO", url: "https://yukon.ca/en/housing-and-property/residential-tenancy" },
    ],
  },
  {
    id: "NT",
    name: "Northwest Territories",
    tribunal: "Rental Office / Supreme Court of NWT",
    noticeTypes: [
      { code: "14 days", reason: "Non-payment / Cause" },
      { code: "24 hours", reason: "Serious harm" },
    ],
    filing: "Applications to the Rental Officer.",
    hearing: "Hearings scheduled; written allowed.",
    appeal: "Supreme Court of NWT (appeal on law).",
    avgTimelineDays: 34,
    notes: "Sheriff enforcement.",
    steps: [
      "Serve notice per Act.",
      "Apply to Rental Officer.",
      "Hearing; order issued.",
      "Court-filed enforcement.",
    ],
    links: [
      { label: "NWT – Rental Office", url: "https://www.justice.gov.nt.ca/en/rental-office/" },
    ],
  },
  {
    id: "NU",
    name: "Nunavut",
    tribunal: "Rental Officer (Justice)",
    noticeTypes: [
      { code: "14 days", reason: "Non-payment / Cause" },
    ],
    filing: "Application to Rental Officer.",
    hearing: "Phone/virtual; written submissions.",
    appeal: "Nunavut Court of Justice (appeal/JR).",
    avgTimelineDays: 36,
    notes: "Sheriff enforcement via court.",
    steps: [
      "Serve notice per Act.",
      "Apply to Rental Officer.",
      "Hearing; order issued.",
      "File with court to enforce.",
    ],
    links: [
      { label: "Nunavut – Residential Tenancies", url: "https://www.gov.nu.ca/justice/information/residential-tenancies" },
    ],
  },
];

// ---------------------------
// 2) Real map geometry via GeoJSON (react-simple-maps)
// ---------------------------

// StatsCan Admin-1 (Provinces & Territories) – Cartographic Boundary, 2021 (TopoJSON/GeoJSON)
// We'll try a StatsCan-style file first, then gracefully fall back to the prior GeoJSON if it fails to load.
const STATS_CAN_URL = "https://raw.githubusercontent.com/StatCan/geojson/master/2021/province/limits-prov_000b21a_e.json"; // expects properties like PRENAME/PRNAME
const FALLBACK_GEO_URL = "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson";

// Map feature names to our REGION_DATA ids (handles multiple property name variants)
const NAME_TO_ID = {
  "British Columbia": "BC",
  "Alberta": "AB",
  "Saskatchewan": "SK",
  "Manitoba": "MB",
  "Ontario": "ON",
  "Quebec": "QC",
  "Québec": "QC",
  "New Brunswick": "NB",
  "Nova Scotia": "NS",
  "Prince Edward Island": "PE",
  "Newfoundland and Labrador": "NL",
  "Yukon": "YT",
  "Northwest Territories": "NT",
  "Nunavut": "NU",
};

// ---------------------------
// 3) Helpers
// ---------------------------

const getRegionMetric = (id) => REGION_DATA.find(r => r.id === id)?.avgTimelineDays ?? null;

const colorForValue = (v) => {
  // Return hex fills instead of Tailwind classes for reliability in SVG
  if (v == null) return "#e5e7eb"; // gray-200
  if (v < 30) return "#86efac";   // green-300
  if (v < 45) return "#fde68a";   // yellow-300
  if (v < 60) return "#fdba74";   // orange-300
  return "#fca5a5";               // red-300
};

const formatDays = (d) => `${d} days`;

// ---------------------------
// General section: Onus to file + Filing fee per jurisdiction
// ---------------------------
const GENERAL_DATA = {
  BC: {
    onus: { short: "Tenant", details: "Notice of eviction is deemed accepted if not disputed during the allowed period; tenant disputes by filing with the RTB.", ref: "RTA ss. 46(5), 47(5), 48(6), 49(9), 49.1(6)" },
    fee:  { short: "$100", details: "$100; or $300 + $10/unit for rent increase apps; fee waiver possible.", ref: "RTA Regs s.8" }
  },
  AB: {
    onus: { short: "Landlord (most cases)", details: "Landlord applies to RTDRS or court; tenant files only to challenge non-renewal of fixed term.", ref: "RTA ss. 15, 29, 30" },
    fee:  { short: "$75", details: "RTDRS application fee, non‑refundable.", ref: "Alberta e‑Services" }
  },
  SK: {
    onus: { short: "Landlord", details: "Landlord applies to ORT; tenant can dispute notice by applying to ORT.", ref: "RTR, 2007 s.17(1), s.18(2); RTA, 2006 s.58–60" },
    fee:  { short: "$50", details: "—", ref: "Form 8 – Notice to Vacate" }
  },
  MB: {
    onus: { short: "Landlord / Hybrid", details: "Landlord gives notice; if tenant doesn’t vacate, landlord applies for order of possession.", ref: "RTA s.84(1)" },
    fee:  { short: "$60", details: "Application for order of possession.", ref: "Manitoba RTB" }
  },
  ON: {
    onus: { short: "Landlord", details: "Landlord must apply to the LTB; tenant need not apply to dispute.", ref: "RTA s.37(1)" },
    fee:  { short: "$186–$201", details: "$186 online; fee waiver possible.", ref: "LTB website" }
  },
  QC: {
    onus: { short: "Landlord", details: "Landlord gives notice; must file with TAL within 1 month if tenant does not respond.", ref: "Civil Code; TAL Act" },
    fee:  { short: "$58–$90", details: "Varies by rent amount.", ref: "TAL Costs" }
  },
  NB: {
    onus: { short: "Landlord", details: "Landlord serves notice, then applies to Tribunal if tenant doesn’t vacate.", ref: "RTA s.21" },
    fee:  { short: "None (application)", details: "$75 Sheriff fee for enforcement.", ref: "Info Bulletin" }
  },
  NS: {
    onus: { short: "Landlord", details: "Landlord serves notice; applies to Director if tenant doesn’t vacate.", ref: "RTA s.10AF(1)" },
    fee:  { short: "$31.15", details: "Application to Director.", ref: "NS Residential Tenancy Forms" }
  },
  PE: {
    onus: { short: "Tenant", details: "Tenant deemed to accept notice unless they file a dispute application.", ref: "RTA ss.60(5), 61(6), 62(5), etc." },
    fee:  { short: "Free", details: "No fee for tenant application.", ref: "PEI RTO" }
  },
  NL: {
    onus: { short: "Landlord", details: "Landlord applies for Order of Possession if tenant doesn’t vacate.", ref: "RTA s.42" },
    fee:  { short: "$20", details: "Waived if application is for return of security deposit.", ref: "NL Landlord & Tenant" }
  },
  YT: {
    onus: { short: "Landlord", details: "Landlord applies for Dispute Resolution Hearing if tenant doesn’t vacate.", ref: "RLATA 2012, s.47–s.55" },
    fee:  { short: "$50", details: "Waived if individual cannot pay.", ref: "Yukon Handbook" }
  },
  NT: {
    onus: { short: "Landlord", details: "Landlord applies to Rental Officer for termination order.", ref: "RTA 1988 s.54" },
    fee:  { short: "$100", details: "Application filing fee.", ref: "NWT Rental Office" }
  },
  NU: {
    onus: { short: "Landlord", details: "Landlord applies to Rental Officer for termination order.", ref: "RTA 2024 s.54–s.60" },
    fee:  { short: "None", details: "No fee mentioned in legislation.", ref: "Nunavut RTO" }
  },
};

// ---------------------------
// 4) Main component
// ---------------------------

export default function CanadaEvictionsMap() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [geoSource, setGeoSource] = useState(STATS_CAN_URL);
  const [center, setCenter] = useState([-96, 61]);
  const [zoom, setZoom] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return REGION_DATA;
    return REGION_DATA.filter(r => r.name.toLowerCase().includes(q));
  }, [query]);

  const onSelect = (id) => {
    const region = REGION_DATA.find(r => r.id === id);
    setActive(region || null);
    if (region) setOpen(true);
  };

  // Try fetching StatsCan once to confirm availability; fall back if 404/network error.
  React.useEffect(() => {
    fetch(STATS_CAN_URL, { method: 'HEAD' })
      .then((r) => { if (!r.ok) throw new Error('not ok'); })
      .catch(() => setGeoSource(FALLBACK_GEO_URL));
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z * 1.4, 8));
  const zoomOut = () => setZoom((z) => Math.max(z / 1.4, 0.6));
  const resetView = () => { setCenter([-96, 61]); setZoom(1); };

  return (
    <div className="w-full min-h-screen p-6 bg-neutral-50 text-neutral-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Canada Eviction Processes</h1>
          <p className="text-neutral-600">Click a province/territory to see <span className="font-medium">General info</span> (onus to file, filing fee) and <span className="font-medium">Official resources</span>. Draft data — confirm locally before publication.</p>
        </header>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              className="w-full pl-9 pr-3 py-2 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
              placeholder="Search by province, tribunal, or notice code (e.g., N4, 14-day)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setQuery("")}>Clear</Button>
        </div>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
              {/* Map */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200">
                <div className="w-full h-[520px] relative">
                  {/* Pan/Zoom Controls */}
                  <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="rounded-full shadow" onClick={zoomIn}>+</Button>
                    <Button size="icon" variant="secondary" className="rounded-full shadow" onClick={zoomOut}>−</Button>
                    <Button size="sm" variant="outline" className="rounded-full shadow" onClick={resetView}>Reset</Button>
                  </div>

                  <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{ scale: 650, center: [-96, 61] }}
                    width={760}
                    height={520}
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-full"
                  >
                    <ZoomableGroup center={center} zoom={zoom} onMoveEnd={({ coordinates, zoom }) => { setCenter(coordinates); setZoom(zoom); }}>
                      <Geographies geography={geoSource}>
                        {({ geographies }) => (
                          <>
                            {geographies.map((geo) => {
                              const p = geo.properties || {};
                              const rawName = p.PRENAME || p.name || p.NAME || (p.PRNAME ? String(p.PRNAME).split("/")[0].trim() : geo.id);
                              const name = String(rawName);
                              const id = NAME_TO_ID[name];
                              const v = id ? getRegionMetric(id) : null;
                              const fill = colorForValue(v);
                              const isFilteredOut = id ? !filtered.find(fr => fr.id === id) : false;
                              return (
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  onClick={() => id && onSelect(id)}
                                  style={{
                                    default: {
                                      fill,
                                      stroke: "#ffffff",
                                      strokeWidth: 1.2,
                                      opacity: isFilteredOut ? 0.3 : 1,
                                      outline: "none",
                                      cursor: id ? "pointer" : "default",
                                    },
                                    hover: {
                                      fill,
                                      stroke: "#111111",
                                      strokeWidth: 1.2,
                                      opacity: isFilteredOut ? 0.3 : 1,
                                      outline: "none",
                                      cursor: id ? "pointer" : "default",
                                    },
                                    pressed: { fill, outline: "none" },
                                  }}
                                />
                              );
                            })}
                          </>
                        )}
                      </Geographies>
                    </ZoomableGroup>
                  </ComposableMap>
                </div>
                <div className="mt-3 text-sm text-neutral-600">Color scale shows approximate average timeline from notice to enforceable order.</div>
              </div>

              {/* Side list */}
              <div className="space-y-3">
                {filtered.map(r => (
                  <button key={r.id} onClick={() => onSelect(r.id)} className="w-full text-left">
                    <div className="rounded-xl border border-neutral-200 bg-white p-3 hover:shadow-sm transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{r.name}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-700">
          <span className="inline-flex items-center gap-2"><span className="inline-block w-4 h-4 rounded" style={{background:'#86efac'}}></span>&lt; 30 days</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-4 h-4 rounded" style={{background:'#fde68a'}}></span>30–44</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-4 h-4 rounded" style={{background:'#fdba74'}}></span>45–59</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-4 h-4 rounded" style={{background:'#fca5a5'}}></span>60+</span>
          <span className="text-neutral-400">(Metric is configurable)</span>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          {active && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl">{active.name}</DialogTitle>
              </DialogHeader>

              {/* General: Onus to file + Filing fee */}
              {GENERAL_DATA[active.id] && (
                <div className="mb-2 text-sm text-neutral-800">
                  <div className="font-medium mb-1">General</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-neutral-200 p-3 bg-neutral-50">
                      <div className="text-xs uppercase tracking-wide text-neutral-500">Onus to file</div>
                      <div className="font-medium">{GENERAL_DATA[active.id].onus.short}</div>
                      <div className="text-neutral-700 mt-1">{GENERAL_DATA[active.id].onus.details}</div>
                      <div className="text-neutral-500 text-xs mt-1">Ref: {GENERAL_DATA[active.id].onus.ref}</div>
                    </div>
                    <div className="rounded-lg border border-neutral-200 p-3 bg-neutral-50">
                      <div className="text-xs uppercase tracking-wide text-neutral-500">Filing fee</div>
                      <div className="font-medium">{GENERAL_DATA[active.id].fee.short}</div>
                      <div className="text-neutral-700 mt-1">{GENERAL_DATA[active.id].fee.details}</div>
                      <div className="text-neutral-500 text-xs mt-1">Ref: {GENERAL_DATA[active.id].fee.ref}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Official resources */}
              <div>
                <div className="font-medium mb-2">Official resources</div>
                <ul className="list-disc pl-5 text-sm">
                  {active.links?.map((l, i) => (
                    <li key={i}><a href={l.url} target="_blank" rel="noreferrer" className="underline">{l.label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
