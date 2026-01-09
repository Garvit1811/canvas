import React, { useState, useMemo } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Search, FileText, Download, ChevronDown } from "lucide-react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import {
  INDICATORS,
  PROVINCIAL_SCORES,
  PROVINCE_NAMES,
  getProvinceScore,
  getScoreExplanation,
  getScoreColor,
  SCORE_DESCRIPTIONS,
  getRubricCriteria
} from "./data/indicatorScores";

/**
 * Canada Eviction Scoring Map
 * Interactive map showing provincial scores across 10 key eviction indicators
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
  "Northwest Territories": "NT",
  "Nunavut": "NU",
};

// PDF Documents
const PDF_DOCUMENTS = {
  processMap: {
    title: "Provincial Eviction Process Maps",
    description: "Detailed flowcharts of eviction processes for each province",
    url: "/pdfs/EvictionMaps_2025.pdf" // Update with actual path
  },
  methodology: {
    title: "Analysis & Methodology Report",
    description: "Complete methodology and analysis of provincial eviction laws",
    url: "/pdfs/Eviction_Report.pdf" // Update with actual path
  },
  rubric: {
    title: "Technical Rubric",
    description: "Scoring criteria for each indicator",
    url: "/pdfs/Technical_Rubric.pdf" // Update with actual path
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
    .filter(([id]) => !['YT', 'NT', 'NU'].includes(id)) // Exclude territories
    .map(([id, name]) => ({
      id,
      name,
      score: getRegionScore(id)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold mb-3 tracking-tight" style={{ color: '#333f50' }}>
              Canada Eviction Law Comparison
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Interactive analysis of provincial eviction laws across 10 key indicators.
              Compare tenant protections and procedural safeguards nationwide.
            </p>
          </div>

          {/* PDF Resources */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(PDF_DOCUMENTS).map(([key, doc]) => (
              <a
                key={key}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 text-sm font-medium text-slate-700 shadow-sm"
                style={{
                  borderColor: '#333f50',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333f50';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#334155';
                }}
                title={doc.description}
              >
                <FileText className="h-4 w-4" />
                {doc.title}
                <Download className="h-3 w-3" />
              </a>
            ))}
          </div>
        </header>

        {/* Top Section - Dropdowns and Current Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6 mb-6">
          {/* Left - Select Indicator Dropdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-5">
            <h2 className="font-bold mb-4 text-lg flex items-center gap-2" style={{ color: '#333f50' }}>
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#c4a006' }}></div>
              Select Indicator
            </h2>
            <div className="relative">
              <button
                onClick={() => setIndicatorDropdownOpen(!indicatorDropdownOpen)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-left flex items-center justify-between hover:bg-white hover:shadow-sm transition-all duration-200 font-medium text-slate-700"
                style={{ borderColor: '#333f50' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c4a006';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333f50';
                }}
              >
                <span className="text-sm font-semibold">{selectedIndicator.shortName}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${indicatorDropdownOpen ? 'rotate-180' : ''}`} style={{ color: '#333f50' }} />
              </button>

              {indicatorDropdownOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white border-2 rounded-xl shadow-xl max-h-80 overflow-hidden" style={{ borderColor: '#333f50' }}>
                  <div className="max-h-80 overflow-y-auto">
                    {INDICATORS.map((indicator) => (
                      <button
                        key={indicator.id}
                        onClick={() => {
                          setSelectedIndicator(indicator);
                          setIndicatorDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm flex items-center justify-between border-b border-slate-100 last:border-b-0 transition-colors duration-150 font-medium text-slate-700"
                        style={
                          selectedIndicator.id === indicator.id
                            ? { backgroundColor: 'rgba(51, 63, 80, 0.08)', fontWeight: '700' }
                            : {}
                        }
                        onMouseEnter={(e) => {
                          if (selectedIndicator.id !== indicator.id) {
                            e.currentTarget.style.backgroundColor = 'rgba(196, 160, 6, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedIndicator.id !== indicator.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          } else {
                            e.currentTarget.style.backgroundColor = 'rgba(51, 63, 80, 0.08)';
                          }
                        }}
                      >
                        <span>{indicator.shortName}</span>
                        {selectedIndicator.id === indicator.id && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c4a006' }}></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center - Current Indicator Info */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #333f50 0%, #2a3340 100%)' }}>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: '#c4a006' }}>
                    Current Indicator
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedIndicator.name}</h2>
                  <p className="text-sm text-slate-200 leading-relaxed">{selectedIndicator.description}</p>
                </div>
                <div className="flex-shrink-0 rounded-xl px-4 py-3 border-2" style={{ backgroundColor: 'rgba(196, 160, 6, 0.15)', borderColor: '#c4a006' }}>
                  <div className="text-xs font-medium mb-1 text-center" style={{ color: '#c4a006' }}>Score Scale</div>
                  <div className="text-3xl font-bold text-white text-center">1-5</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Jump to Province Dropdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-5">
            <h2 className="font-bold mb-4 text-lg flex items-center gap-2" style={{ color: '#333f50' }}>
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: '#c4a006' }}></div>
              Jump to Province
            </h2>
            <div className="relative">
              <button
                onClick={() => setProvinceDropdownOpen(!provinceDropdownOpen)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-left flex items-center justify-between hover:bg-white hover:shadow-sm transition-all duration-200 font-medium text-slate-700"
                style={{ borderColor: '#333f50' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c4a006';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333f50';
                }}
              >
                <span className="text-sm">Select province...</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${provinceDropdownOpen ? 'rotate-180' : ''}`} style={{ color: '#333f50' }} />
              </button>

              {provinceDropdownOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white border-2 rounded-xl shadow-xl max-h-80 overflow-hidden" style={{ borderColor: '#333f50' }}>
                  <div className="max-h-80 overflow-y-auto">
                    {provinceList.map((prov) => (
                      <button
                        key={prov.id}
                        onClick={() => onSelectProvince(prov.id)}
                        className="w-full px-4 py-3 text-left text-sm flex items-center justify-between border-b border-slate-100 last:border-b-0 transition-colors duration-150 font-medium text-slate-700"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(196, 160, 6, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <span>{prov.name}</span>
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-sm"
                          style={{ backgroundColor: getScoreColor(prov.score) }}
                        >
                          {prov.score}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Section - Full Width */}
        <div className="w-full">
          {/* Map */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
              <div className="p-6">
                <div className="w-full h-[560px] relative bg-slate-50/50 rounded-xl overflow-hidden">
                  {/* Zoom Controls */}
                  <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
                    <button
                      onClick={zoomIn}
                      className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border-2 flex items-center justify-center text-slate-700 transition-all duration-200 font-bold text-xl"
                      style={{ borderColor: '#333f50' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#333f50';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#334155';
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={zoomOut}
                      className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border-2 flex items-center justify-center text-slate-700 transition-all duration-200 font-bold text-xl"
                      style={{ borderColor: '#333f50' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#333f50';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#334155';
                      }}
                    >
                      −
                    </button>
                    <button
                      onClick={resetView}
                      className="px-3 py-2 rounded-full bg-white shadow-lg hover:shadow-xl border-2 text-xs font-semibold text-slate-700 transition-all duration-200"
                      style={{ borderColor: '#333f50' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#333f50';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#334155';
                      }}
                    >
                      Reset
                    </button>
                  </div>

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
                          {({ geographies }) => (
                            <>
                              {geographies.map((geo) => {
                                const p = geo.properties || {};
                                const rawName = p.PRENAME || p.name || p.NAME || (p.PRNAME ? String(p.PRNAME).split("/")[0].trim() : geo.id);
                                const name = String(rawName);
                                const id = NAME_TO_ID[name];

                                // Grey out territories without data (NT, NU)
                                const isGreyedOut = id && ['NT', 'NU'].includes(id);
                                const score = id && !isGreyedOut ? getRegionScore(id) : null;
                                const fill = isGreyedOut ? "#d1d5db" : (score ? getScoreColor(score) : "#e5e7eb");
                                const isClickable = id && !isGreyedOut;

                                return (
                                  <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => isClickable && onSelectProvince(id)}
                                    style={{
                                      default: {
                                        fill,
                                        stroke: "#ffffff",
                                        strokeWidth: 1.5,
                                        outline: "none",
                                        cursor: isClickable ? "pointer" : "default",
                                      },
                                      hover: {
                                        fill: isGreyedOut ? fill : fill,
                                        stroke: isGreyedOut ? "#ffffff" : "#111111",
                                        strokeWidth: isGreyedOut ? 1.5 : 2,
                                        outline: "none",
                                        cursor: isClickable ? "pointer" : "default",
                                        filter: isGreyedOut ? "none" : "brightness(1.1)",
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

                  {/* Comprehensive Legend */}
                  <div className="mt-6 pt-6 border-t-2" style={{ borderColor: '#333f50' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#333f50' }}>Understanding the Scoring System</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Each province is evaluated across 10 key indicators using a 5-point scale. Higher scores indicate stronger tenant protections.
                    </p>

                    {/* Table Format */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-2 rounded-xl overflow-hidden" style={{ borderColor: '#333f50' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#333f50' }}>
                            <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Score</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Measurement Criteria</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Indicators</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          <tr className="hover:bg-green-50/50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(5) }}
                                >5</span>
                                <span className="font-bold text-slate-900">Best</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              Comprehensive protections that meet or exceed best practices
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              Extended notice periods, mandatory good faith requirements, automatic stay of eviction, comprehensive rent control
                            </td>
                          </tr>
                          <tr className="hover:bg-lime-50/50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(4) }}
                                >4</span>
                                <span className="font-bold text-slate-900">Strong</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              Strong protections that meet best practice standards
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              Adequate notice periods, accessible dispute hearings, compensation requirements, procedural transparency
                            </td>
                          </tr>
                          <tr className="hover:bg-yellow-50/50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(3) }}
                                >3</span>
                                <span className="font-bold text-slate-900">Adequate</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              Moderate protections that fall slightly below benchmarks
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              Standard notice periods, moderate filing fees, some delay mechanisms, limited compensation requirements
                            </td>
                          </tr>
                          <tr className="hover:bg-orange-50/50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(2) }}
                                >2</span>
                                <span className="font-bold text-slate-900">Weak</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              Weak protections with limited procedural safeguards
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              Short notice periods, high filing fees, limited compensation, barriers to appeals, gaps in coverage
                            </td>
                          </tr>
                          <tr className="hover:bg-red-50/50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-white font-bold"
                                  style={{ backgroundColor: getScoreColor(1) }}
                                >1</span>
                                <span className="font-bold text-slate-900">Minimal/None</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              Minimal or no protections for tenants
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
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

      {/* Province Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedProvince && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  <span>{PROVINCE_NAMES[selectedProvince]}</span>
                </DialogTitle>
              </DialogHeader>

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
                      {getRegionScore(selectedProvince)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(196, 160, 6, 0.3)' }}>
                  <div className="text-sm font-bold text-slate-700 mb-2">Explanation:</div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {getScoreExplanation(selectedIndicator.id, getRegionScore(selectedProvince))}
                  </p>

                  {/* Scoring Scale with Rubric Criteria */}
                  {(() => {
                    const rubricCriteria = getRubricCriteria(selectedIndicator.id);
                    const currentScore = getRegionScore(selectedProvince);
                    if (rubricCriteria) {
                      return (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">Scoring Scale (1-5)</div>
                          <div className="space-y-4">
                            {[5, 4, 3, 2, 1].map(score => {
                              const criteria = rubricCriteria[score];
                              const isCurrentScore = score === currentScore;
                              return (
                                <div
                                  key={score}
                                  className={`p-3 rounded-lg ${isCurrentScore ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-slate-50 border border-slate-200'}`}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <div
                                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                      style={{ backgroundColor: getScoreColor(score) }}
                                    >
                                      {score}
                                    </div>
                                    {isCurrentScore && (
                                      <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Current Score</span>
                                    )}
                                  </div>
                                  {criteria && (
                                    <div className="space-y-1.5 ml-11">
                                      {Object.entries(criteria).map(([key, value]) => (
                                        <div key={key} className="flex gap-2">
                                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#c4a006' }}></div>
                                          <div className="flex-1">
                                            <span className="font-semibold text-slate-700 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                                            <span className="text-slate-600 text-xs">{value}</span>
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

              {/* All Scores for This Province */}
              <div>
                <h3 className="font-bold text-xl mb-4" style={{ color: '#333f50' }}>All Indicator Scores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {INDICATORS.map(indicator => {
                    const score = getProvinceScore(selectedProvince, indicator.id);
                    return (
                      <button
                        key={indicator.id}
                        onClick={() => {
                          setSelectedIndicator(indicator);
                          setDialogOpen(false);
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
                            <div className="text-xs text-slate-600 mt-1 line-clamp-1">{indicator.description}</div>
                          </div>
                          <div
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg font-bold text-white text-lg shadow-sm"
                            style={{ backgroundColor: getScoreColor(score) }}
                          >
                            {score}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
