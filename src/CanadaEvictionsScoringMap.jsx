import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Search, FileText, Download, ChevronDown } from "lucide-react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import {
  INDICATORS,
  PROVINCIAL_SCORES,
  PROVINCE_NAMES,
  getProvinceScore,
  getScoreExplanation,
  getScoreColor,
  SCORE_DESCRIPTIONS,
  getRubricCriteria,
  getProvinceModifiers,
  getNoticeBreakdown,
  getDisputeBreakdown,
  getOrderBreakdown,
  NOTICE_BREAKDOWN
} from "./data/indicatorScores";

/**
 * Canada Eviction Scoring Map
 * Interactive map showing provincial scores across 12 key eviction indicators
 */

// Use external GeoJSON URL (same as standalone.html) - most reliable for production
const GEO_URL = "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson";

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
  "Yukon Territory": "YT",
  "Northwest Territories": "NT",
  "Nunavut": "NU",
};

// PDF Documents
const PDF_DOCUMENTS = {
  methodology: {
    title: "Analysis & Methodology Report",
    description: "Complete methodology and analysis of provincial eviction laws",
    url: "/pdfs/RenterRights_2026_Final.pdf"
  },
  rubric: {
    title: "Canadian Eviction Processes",
    description: "Scoring criteria for each indicator",
    url: "/pdfs/Evictions%20Process%20Report_Final.pdf"
  },
  processMap: {
    title: "Provincial Eviction Process Maps",
    description: "Detailed flowcharts of eviction processes for each province",
    url: "/pdfs/EvictionMaps_2025.pdf"
  }
};

export default function CanadaEvictionsScoringMap() {
  const [selectedIndicator, setSelectedIndicator] = useState(INDICATORS[0]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [center, setCenter] = useState([-96, 61]);
  const [zoom, setZoom] = useState(1);
  const [provinceDropdownOpen, setProvinceDropdownOpen] = useState(false);
  const [indicatorDropdownOpen, setIndicatorDropdownOpen] = useState(false);
  const [showAllScoreLevels, setShowAllScoreLevels] = useState(false);
  const [showAllIndicators, setShowAllIndicators] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('mapHintDismissed');
    }
    return false;
  });
  const [showLegend, setShowLegend] = useState(false);

  // Auto-dismiss hint after 3 seconds
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        setShowHint(false);
        if (typeof window !== 'undefined') {
          localStorage.setItem('mapHintDismissed', 'true');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  // Get score for a province based on selected indicator
  const getRegionScore = (provinceId) => {
    return getProvinceScore(provinceId, selectedIndicator.id);
  };

  // Handle province selection
  const onSelectProvince = (provinceId) => {
    setSelectedProvince(provinceId);
    setDialogOpen(true);
    setProvinceDropdownOpen(false);
  };

  const zoomIn = () => setZoom((z) => Math.min(z * 1.4, 8));
  const zoomOut = () => setZoom((z) => Math.max(z / 1.4, 0.6));
  const resetView = () => { setCenter([-96, 61]); setZoom(1); };

  const provinceList = Object.entries(PROVINCE_NAMES)
    .map(([id, name]) => ({
      id,
      name,
      score: getRegionScore(id)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #b0c4de 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-8">
          <div
            className="rounded-xl shadow-md overflow-hidden bg-slate-900"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(31, 41, 55, 0.68) 0%, rgba(15, 23, 42, 0.84) 100%), url('/hero-photo.jpeg')",
              backgroundPosition: 'center 38%',
              backgroundSize: 'cover',
            }}
          >
            <div className="text-center px-6 py-10 sm:py-12">
              <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">
                Canadian Eviction Process Comparison
              </h1>
              <p className="text-lg mb-3 max-w-4xl mx-auto leading-relaxed text-gold">
                An interactive tool to understand and compare tenant protections across Canada.
              </p>
              <p className="text-sm text-slate-300 max-w-4xl mx-auto leading-relaxed mb-4">
                Eviction laws determine how and when landlords can remove tenants from rental housing. These laws vary significantly across Canada, affecting millions of renters. This tool evaluates each province across 12 key indicators—including notice periods, hearing processes, rent control, and appeal rights—using a 5-point scale. Higher scores indicate stronger tenant protections.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(PDF_DOCUMENTS).map(([key, doc]) => (
                  <a
                    key={key}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs shadow-sm"
                    title={doc.description}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {doc.title}
                    <Download className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Top Section - Dropdowns and Current Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-4 mb-6">
          {/* Left - Select Indicator Dropdown */}
          <div className="relative">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">Select Indicator</label>
            <button
              onClick={() => setIndicatorDropdownOpen(!indicatorDropdownOpen)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-left flex items-center justify-between hover:border-gold transition-all duration-200 shadow-sm"
            >
              <span className="text-sm font-semibold text-dark">{selectedIndicator.shortName}</span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${indicatorDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {indicatorDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg max-h-80 overflow-hidden"
                >
                  <div className="max-h-80 overflow-y-auto">
                    {INDICATORS.map((indicator) => (
                      <button
                        key={indicator.id}
                        onClick={() => {
                          setSelectedIndicator(indicator);
                          setIndicatorDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between border-b border-slate-100 last:border-b-0 transition-colors duration-150 font-medium ${
                          selectedIndicator.id === indicator.id
                            ? 'bg-dark/[0.06] font-bold text-dark'
                            : 'text-slate-600 hover:bg-gold/10'
                        }`}
                      >
                        <span>{indicator.shortName}</span>
                        {selectedIndicator.id === indicator.id && (
                          <div className="w-2 h-2 rounded-full bg-gold"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center - Current Indicator Info */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider font-semibold mb-1.5 text-gold">
                  Current Indicator
                </div>
                <h2 className="text-xl font-bold text-dark mb-1.5">{selectedIndicator.name}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedIndicator.description}</p>
              </div>
              <div className="flex-shrink-0 rounded-lg px-3 py-2 bg-dark/5 border border-dark/10">
                <div className="text-[10px] font-medium mb-0.5 text-center text-slate-500">Scale</div>
                <div className="text-2xl font-bold text-dark text-center">1-5</div>
              </div>
            </div>
          </div>

          {/* Right - Jump to Province/Territory */}
          <div className="relative">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">Jump to Province/Territory</label>
            <button
              onClick={() => setProvinceDropdownOpen(!provinceDropdownOpen)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-left flex items-center justify-between hover:border-gold transition-all duration-200 shadow-sm"
            >
              <span className="text-sm text-slate-500">Select province...</span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${provinceDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {provinceDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg max-h-80 overflow-hidden"
                >
                  <div className="max-h-80 overflow-y-auto">
                    {provinceList.map((prov) => (
                      <button
                        key={prov.id}
                        onClick={() => onSelectProvince(prov.id)}
                        className="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between border-b border-slate-100 last:border-b-0 transition-colors duration-150 font-medium text-slate-600 hover:bg-gold/10"
                      >
                        <span>{prov.name}</span>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-bold text-white"
                          style={{ backgroundColor: getScoreColor(prov.score) }}
                        >
                          {prov.score}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Map Section - Full Width */}
        <div className="w-full">
          {/* Map */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <div className="w-full h-[560px] relative rounded-lg overflow-hidden border border-slate-200" style={{ backgroundColor: '#f8fafc' }}>
                  {/* Zoom Controls */}
                  <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5">
                    <button onClick={zoomIn} className="zoom-btn w-9 h-9 rounded-full shadow-md flex items-center justify-center font-bold text-lg">+</button>
                    <button onClick={zoomOut} className="zoom-btn w-9 h-9 rounded-full shadow-md flex items-center justify-center font-bold text-lg">−</button>
                    <button onClick={resetView} className="zoom-btn px-2.5 py-1.5 rounded-full shadow-md text-xs font-semibold">Reset</button>
                  </div>

                  {/* Inline Color Legend */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-slate-200">
                    {[
                      { score: 1, label: 'Minimal' },
                      { score: 2, label: 'Weak' },
                      { score: 3, label: 'Adequate' },
                      { score: 4, label: 'Strong' },
                      { score: 5, label: 'Best' },
                    ].map(({ score, label }) => (
                      <div key={score} className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: getScoreColor(score) }}></div>
                        <span className="text-[10px] font-medium text-slate-600">{score} {label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Loading State */}
                  {mapLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-20">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#c4a006] mb-3"></div>
                        <div className="text-slate-600 font-semibold">Loading map...</div>
                      </div>
                    </div>
                  )}

                  {/* First-Time User Hint */}
                  {showHint && !mapLoading && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-pulse pointer-events-none">
                      <div className="px-6 py-3 rounded-xl shadow-2xl" style={{ background: 'linear-gradient(135deg, #333f50 0%, #2a3340 100%)' }}>
                        <div className="text-white text-base font-semibold">
                          👆 Click provinces to explore details
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover Tooltip */}
                  {hoveredProvince && !mapLoading && (
                    <div
                      className="absolute z-30 px-3 py-2 rounded-lg shadow-lg pointer-events-none"
                      style={{
                        left: mousePosition.x + 10,
                        top: mousePosition.y + 10,
                        backgroundColor: '#333f50',
                        color: 'white'
                      }}
                    >
                      <div className="text-sm font-bold">{PROVINCE_NAMES[hoveredProvince]}</div>
                      <div className="text-xs" style={{ color: '#c4a006' }}>
                        Score: {getRegionScore(hoveredProvince)}/5
                      </div>
                    </div>
                  )}

                    <ComposableMap
                      projection="geoEqualEarth"
                      projectionConfig={{ scale: 650, center: [-96, 61] }}
                      width={760}
                      height={560}
                      preserveAspectRatio="xMidYMid meet"
                      className="w-full h-full"
                    >
                      <ZoomableGroup center={center} zoom={zoom} onMoveEnd={({ coordinates, zoom }) => { setCenter(coordinates); setZoom(zoom); }}>
                        <Geographies geography={GEO_URL}>
                          {({ geographies }) => {
                            // Set loading to false once geographies are loaded
                            if (mapLoading) {
                              setTimeout(() => setMapLoading(false), 100);
                            }

                            return (
                              <>
                                {geographies.map((geo) => {
                                  const p = geo.properties || {};
                                  const rawName = p.PRENAME || p.name || p.NAME || (p.PRNAME ? String(p.PRNAME).split("/")[0].trim() : geo.id);
                                  const name = String(rawName);
                                  const id = NAME_TO_ID[name];

                                  const score = id ? getRegionScore(id) : null;
                                  const fill = score ? getScoreColor(score) : "#e5e7eb";
                                  const isClickable = !!id;

                                  return (
                                    <Geography
                                      key={geo.rsmKey}
                                      geography={geo}
                                      onClick={() => isClickable && onSelectProvince(id)}
                                      onMouseEnter={(e) => {
                                        if (isClickable) {
                                          setHoveredProvince(id);
                                        }
                                      }}
                                      onMouseMove={(e) => {
                                        if (isClickable) {
                                          const container = e.currentTarget.closest('.w-full.h-full');
                                          if (container) {
                                            const rect = container.getBoundingClientRect();
                                            setMousePosition({
                                              x: e.clientX - rect.left,
                                              y: e.clientY - rect.top
                                            });
                                          }
                                        }
                                      }}
                                      onMouseLeave={() => {
                                        setHoveredProvince(null);
                                      }}
                                      style={{
                                        default: {
                                          fill,
                                          stroke: "#ffffff",
                                          strokeWidth: 1.5,
                                          outline: "none",
                                          cursor: isClickable ? "pointer" : "default",
                                        },
                                        hover: {
                                          fill,
                                          stroke: isClickable ? "#111111" : "#ffffff",
                                          strokeWidth: isClickable ? 2 : 1.5,
                                          outline: "none",
                                          cursor: isClickable ? "pointer" : "default",
                                          filter: isClickable ? "brightness(1.1)" : "none",
                                        },
                                        pressed: { fill, outline: "none" },
                                      }}
                                    />
                                  );
                                })}
                              </>
                            );
                          }}
                        </Geographies>
                      </ZoomableGroup>
                    </ComposableMap>
                  </div>

                  {/* Comprehensive Legend */}
                  <div className="mt-8 pt-8 border-t-2" style={{ borderColor: 'rgba(196, 160, 6, 0.3)' }}>
                    <button
                      onClick={() => setShowLegend(!showLegend)}
                      className="w-full flex items-center justify-between mb-3 lg:cursor-default"
                    >
                      <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: '#333f50' }}>
                        <div className="w-1.5 h-6 rounded-full shadow-sm" style={{ backgroundColor: '#c4a006' }}></div>
                        Understanding the Scoring System
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 lg:hidden ${showLegend ? 'rotate-180' : ''}`}
                        style={{ color: '#c4a006' }}
                      />
                    </button>

                    <div className={`${showLegend ? 'block' : 'hidden'} lg:block`}>
                      <p className="text-base text-slate-600 mb-5 leading-relaxed">
                        Each province is evaluated across 12 key indicators using a 5-point scale. Higher scores indicate stronger tenant protections.
                      </p>

                      {/* Table Format */}
                      <div className="overflow-x-auto">
                      <table className="w-full border-2 rounded-xl overflow-hidden shadow-sm" style={{ borderColor: '#333f50' }}>
                        <thead>
                          <tr style={{ background: 'linear-gradient(135deg, #333f50 0%, #2a3340 100%)' }}>
                            <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Score</th>
                            <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Measurement Criteria</th>
                            <th className="px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Indicators</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          <tr className="hover:bg-green-50/50 transition-colors">
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(5) }}
                                >5</span>
                                <span className="font-bold text-slate-900">Best</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                              Comprehensive protections that meet or exceed best practices
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">
                              Extended notice periods, mandatory good faith requirements, automatic stay of eviction, comprehensive rent control
                            </td>
                          </tr>
                          <tr className="hover:bg-lime-50/50 transition-colors">
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(4) }}
                                >4</span>
                                <span className="font-bold text-slate-900">Strong</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                              Strong protections that meet best practice standards
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">
                              Adequate notice periods, accessible dispute hearings, compensation requirements, procedural transparency
                            </td>
                          </tr>
                          <tr className="hover:bg-yellow-50/50 transition-colors">
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(3) }}
                                >3</span>
                                <span className="font-bold text-slate-900">Adequate</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                              Moderate protections that fall slightly below benchmarks
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">
                              Standard notice periods, moderate filing fees, some delay mechanisms, limited compensation requirements
                            </td>
                          </tr>
                          <tr className="hover:bg-orange-50/50 transition-colors">
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(2) }}
                                >2</span>
                                <span className="font-bold text-slate-900">Weak</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                              Weak protections with limited procedural safeguards
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">
                              Short notice periods, high filing fees, limited compensation, barriers to appeals, gaps in coverage
                            </td>
                          </tr>
                          <tr className="hover:bg-red-50/50 transition-colors">
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(1) }}
                                >1</span>
                                <span className="font-bold text-slate-900">Minimal/None</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                              Minimal or no protections for tenants
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">
                              Immediate or very short notice, no hearing requirements, no rent control, major coverage exclusions, no compensation
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </div>

      {/* Province Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="!max-w-4xl w-full mx-auto !p-0 !rounded-2xl overflow-hidden">
          {selectedProvince && (
            <div className="space-y-0">
              <DialogHeader className="!mb-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, #333f50 0%, #2a3340 100%)' }}>
                <DialogTitle className="px-8 py-8">
                  <div className="text-4xl font-extrabold text-white mb-2">{PROVINCE_NAMES[selectedProvince]}</div>
                  <div className="text-base font-semibold tracking-wide" style={{ color: '#c4a006' }}>Provincial Eviction Score Breakdown</div>
                </DialogTitle>
              </DialogHeader>

              <div className="px-8 py-6 space-y-6">
              {/* Current Indicator Score Details */}
              <div className="rounded-xl p-5 border-2 shadow-sm" style={{ backgroundColor: 'rgba(51, 63, 80, 0.04)', borderColor: '#333f50' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: '#c4a006' }}>Current Indicator</div>
                    <div className="text-xl font-bold" style={{ color: '#333f50' }}>{selectedIndicator.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: '#c4a006' }}>Score</div>
                    <div
                      className="text-4xl font-bold text-white px-4 py-2 rounded-xl inline-block shadow-md"
                      style={{ backgroundColor: getScoreColor(getRegionScore(selectedProvince)) }}
                    >
                      {getRegionScore(selectedProvince)}/5
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(196, 160, 6, 0.3)' }}>
                  <div className="text-sm font-bold text-slate-700 mb-2">Explanation:</div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedIndicator.description}
                  </p>

                  {/* Scoring Scale with Rubric Criteria */}
                  {(() => {
                    const rubricCriteria = getRubricCriteria(selectedIndicator.id);
                    const currentScore = getRegionScore(selectedProvince);
                    if (rubricCriteria) {
                      return (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Scoring Scale (1-5)</div>
                            <button
                              onClick={() => setShowAllScoreLevels(!showAllScoreLevels)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 border-2"
                              style={{
                                backgroundColor: showAllScoreLevels ? '#c4a006' : 'rgba(196, 160, 6, 0.1)',
                                borderColor: '#c4a006',
                                color: showAllScoreLevels ? 'white' : '#333f50'
                              }}
                              onMouseEnter={(e) => {
                                if (!showAllScoreLevels) {
                                  e.currentTarget.style.backgroundColor = 'rgba(196, 160, 6, 0.2)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!showAllScoreLevels) {
                                  e.currentTarget.style.backgroundColor = 'rgba(196, 160, 6, 0.1)';
                                }
                              }}
                            >
                              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showAllScoreLevels ? 'rotate-180' : ''}`} />
                              {showAllScoreLevels ? 'Hide Levels' : 'View All Levels'}
                            </button>
                          </div>
                          <div className="space-y-2.5">
                            {[5, 4, 3, 2, 1]
                              .filter(score => showAllScoreLevels || score === currentScore)
                              .map(score => {
                                const criteria = rubricCriteria[score];
                                const isCurrentScore = score === currentScore;
                                return (
                                  <div
                                    key={score}
                                    className={`p-2.5 rounded-lg ${isCurrentScore ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-slate-50 border border-slate-200'}`}
                                  >
                                    <div className="flex items-center gap-2.5 mb-1.5">
                                      <div
                                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                        style={{ backgroundColor: getScoreColor(score) }}
                                      >
                                        {score}
                                      </div>
                                      {isCurrentScore && (
                                        <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Current Score</span>
                                      )}
                                    </div>
                                    {criteria && (
                                      <div className="space-y-1 ml-9">
                                        {Object.entries(criteria).map(([key, value]) => (
                                          <div key={key} className="flex gap-2 items-start">
                                            <div className="flex-shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ backgroundColor: '#c4a006' }}></div>
                                            <div className="flex-1 text-xs leading-tight">
                                              <span className="font-semibold text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                                              <span className="text-slate-600">{value}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>

              {/* Binary Bonus/Penalty Modifiers */}
              {selectedProvince && (() => {
                const modifiers = getProvinceModifiers(selectedProvince, selectedIndicator.id);
                const noticeBreakdown = selectedIndicator.id === 'notice_termination' ? getNoticeBreakdown(selectedProvince) : null;
                const disputeBreakdown = selectedIndicator.id === 'dispute_period' ? getDisputeBreakdown(selectedProvince) : null;
                const orderBreakdown = selectedIndicator.id === 'order_possession' ? getOrderBreakdown(selectedProvince) : null;
                const hasContent = modifiers.length > 0 || noticeBreakdown || disputeBreakdown || orderBreakdown;

                if (!hasContent) return null;

                return (
                  <div className="rounded-xl p-5 border-2 shadow-sm" style={{ backgroundColor: 'rgba(196, 160, 6, 0.04)', borderColor: 'rgba(196, 160, 6, 0.3)' }}>
                    <div className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: '#c4a006' }}>
                      Score Modifiers & Breakdown
                    </div>

                    {/* Notice of Termination breakdown */}
                    {noticeBreakdown && (
                      <div className="mb-3">
                        <div className="text-sm font-semibold text-slate-700 mb-2">Sub-Category Breakdown</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-white rounded-lg px-3 py-2 border border-slate-200">
                            <span className="text-slate-500">Sub-scores total:</span>
                            <span className="font-bold text-slate-800 ml-1">{noticeBreakdown.total}/25</span>
                          </div>
                          <div className="bg-white rounded-lg px-3 py-2 border border-slate-200">
                            <span className="text-slate-500">Average:</span>
                            <span className="font-bold text-slate-800 ml-1">{noticeBreakdown.average}/5</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bonus modifiers */}
                    {modifiers.length > 0 && (
                      <div className="space-y-2">
                        {modifiers.map((mod) => (
                          <div key={mod.key} className="flex items-start gap-2.5 bg-white rounded-lg px-3 py-2.5 border border-slate-200">
                            <div className="flex-shrink-0 mt-0.5">
                              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white ${mod.type === 'bonus' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {mod.type === 'bonus' ? '+' : '−'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-slate-800">{mod.label}</div>
                              <div className="text-xs text-slate-600 mt-0.5">{mod.description}</div>
                              {mod.detail && (
                                <div className="text-xs mt-1 px-2 py-1 rounded bg-slate-50 border border-slate-100 text-slate-700 italic">
                                  {mod.detail}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Show which bonuses the province does NOT have */}
                    {noticeBreakdown && (
                      <div className="mt-2 space-y-1.5">
                        {!noticeBreakdown.goodFaith && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-white text-[10px] font-bold">✕</span>
                            No good faith requirement legislation
                          </div>
                        )}
                        {!noticeBreakdown.protectedGroup && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 text-white text-[10px] font-bold">✕</span>
                            No additional protected group provisions
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* All Scores for This Province */}
              <div className="rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-md" style={{ borderColor: showAllIndicators ? '#c4a006' : 'rgba(51, 63, 80, 0.2)' }}>
                <button
                  onClick={() => setShowAllIndicators(!showAllIndicators)}
                  className="w-full px-5 py-4 flex items-center justify-between transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: showAllIndicators ? 'rgba(51, 63, 80, 0.06)' : 'rgba(51, 63, 80, 0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(51, 63, 80, 0.08)';
                    e.currentTarget.closest('div').style.borderColor = '#c4a006';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = showAllIndicators ? 'rgba(51, 63, 80, 0.06)' : 'rgba(51, 63, 80, 0.03)';
                    e.currentTarget.closest('div').style.borderColor = showAllIndicators ? '#c4a006' : 'rgba(51, 63, 80, 0.2)';
                  }}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl" style={{ color: '#333f50' }}>All Indicator Scores</h3>
                    {!showAllIndicators && (
                      <span className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#c4a006' }}>
                        12
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-200 ${showAllIndicators ? 'rotate-180' : ''}`}
                    style={{ color: '#c4a006' }}
                  />
                </button>
                {showAllIndicators && (
                  <div className="p-5 border-t-2" style={{ borderColor: 'rgba(196, 160, 6, 0.2)' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INDICATORS.map(indicator => {
                        const score = getProvinceScore(selectedProvince, indicator.id);
                        return (
                          <button
                            key={indicator.id}
                            onClick={() => {
                              setSelectedIndicator(indicator);
                            }}
                            className="text-left p-4 rounded-xl border-2 border-slate-200 transition-all duration-200 hover:shadow-md group"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#c4a006';
                              e.currentTarget.style.backgroundColor = 'rgba(196, 160, 6, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#e2e8f0';
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-slate-900 transition-colors">{indicator.shortName}</div>
                                <div className="text-xs text-slate-600 mt-1 line-clamp-2">{indicator.description}</div>
                              </div>
                              <div
                                className="flex-shrink-0 px-3 py-1.5 rounded-lg font-bold text-white text-lg shadow-sm"
                                style={{ backgroundColor: getScoreColor(score) }}
                              >
                                {score}/5
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div className="pt-5 border-t border-slate-200">
                <h3 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ color: '#333f50' }}>Additional Resources</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={PDF_DOCUMENTS.processMap.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 rounded-lg transition-all duration-200 text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(196, 160, 6, 0.1)', borderColor: '#c4a006', color: '#333f50' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#c4a006';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(196, 160, 6, 0.1)';
                      e.currentTarget.style.color = '#333f50';
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    Process Map
                  </a>
                  <a
                    href={PDF_DOCUMENTS.methodology.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 rounded-lg transition-all duration-200 text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(196, 160, 6, 0.1)', borderColor: '#c4a006', color: '#333f50' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#c4a006';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(196, 160, 6, 0.1)';
                      e.currentTarget.style.color = '#333f50';
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    Full Analysis
                  </a>
                </div>
              </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
