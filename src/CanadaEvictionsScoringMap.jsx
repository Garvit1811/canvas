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
  SCORE_DESCRIPTIONS
} from "./data/indicatorScores";

/**
 * Canada Eviction Scoring Map
 * Interactive map showing provincial scores across 10 key eviction indicators
 */

// Map data - using local GeoJSON file for reliability
const GEO_URL = "/canada.geojson";

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

  const provinceList = Object.entries(PROVINCE_NAMES).map(([id, name]) => ({
    id,
    name,
    score: getRegionScore(id)
  })).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full min-h-screen p-6 bg-neutral-50 text-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Canada Eviction Law Comparison</h1>
          <p className="text-lg text-neutral-600 mb-4">
            Compare provincial eviction laws across 10 key indicators. Each province is scored 1-5,
            with higher scores indicating stronger tenant protections.
          </p>

          {/* PDF Resources */}
          <div className="flex flex-wrap gap-3 mb-4">
            {Object.entries(PDF_DOCUMENTS).map(([key, doc]) => (
              <a
                key={key}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition text-sm"
                title={doc.description}
              >
                <FileText className="h-4 w-4" />
                {doc.title}
                <Download className="h-3 w-3" />
              </a>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left Sidebar - Indicator Selector */}
          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="font-semibold mb-3 text-lg">Select Indicator</h2>
              <div className="space-y-2">
                {INDICATORS.map((indicator) => (
                  <button
                    key={indicator.id}
                    onClick={() => setSelectedIndicator(indicator)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition text-sm font-medium ${
                      selectedIndicator.id === indicator.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {indicator.shortName}
                  </button>
                ))}
              </div>
            </Card>

            {/* Province Quick Navigation */}
            <Card className="p-4">
              <h2 className="font-semibold mb-3 text-lg">Jump to Province</h2>
              <div className="relative">
                <button
                  onClick={() => setProvinceDropdownOpen(!provinceDropdownOpen)}
                  className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-lg text-left flex items-center justify-between hover:bg-neutral-50"
                >
                  <span className="text-sm">Select province...</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {provinceDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {provinceList.map((prov) => (
                      <button
                        key={prov.id}
                        onClick={() => onSelectProvince(prov.id)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 flex items-center justify-between"
                      >
                        <span>{prov.name}</span>
                        <span
                          className="px-2 py-1 rounded text-xs font-semibold text-white"
                          style={{ backgroundColor: getScoreColor(prov.score) }}
                        >
                          {prov.score}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content - Map and Info */}
          <div className="space-y-6">
            {/* Current Indicator Info */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-blue-900">{selectedIndicator.name}</h2>
                  <p className="text-sm text-blue-700 mt-1">{selectedIndicator.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600 font-medium">Current Indicator</div>
                  <div className="text-2xl font-bold text-blue-900">{selectedIndicator.shortName}</div>
                </div>
              </div>
            </Card>

            {/* Map */}
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="bg-white rounded-2xl p-4 border border-neutral-200">
                  <div className="w-full h-[560px] relative">
                    {/* Zoom Controls */}
                    <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
                      <Button size="icon" variant="secondary" className="rounded-full shadow" onClick={zoomIn}>+</Button>
                      <Button size="icon" variant="secondary" className="rounded-full shadow" onClick={zoomOut}>−</Button>
                      <Button size="sm" variant="outline" className="rounded-full shadow" onClick={resetView}>Reset</Button>
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
                                const score = id ? getRegionScore(id) : null;
                                const fill = score ? getScoreColor(score) : "#e5e7eb";

                                return (
                                  <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => id && onSelectProvince(id)}
                                    style={{
                                      default: {
                                        fill,
                                        stroke: "#ffffff",
                                        strokeWidth: 1.5,
                                        outline: "none",
                                        cursor: id ? "pointer" : "default",
                                      },
                                      hover: {
                                        fill,
                                        stroke: "#111111",
                                        strokeWidth: 2,
                                        outline: "none",
                                        cursor: id ? "pointer" : "default",
                                        filter: "brightness(1.1)",
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

                  {/* Legend */}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <span className="text-sm font-medium text-neutral-700">Score:</span>
                      <div className="flex flex-wrap gap-3 text-sm">
                        {[1, 2, 3, 4, 5].map(score => (
                          <span key={score} className="inline-flex items-center gap-2">
                            <span
                              className="inline-block w-5 h-5 rounded"
                              style={{ backgroundColor: getScoreColor(score) }}
                            ></span>
                            <span className="font-medium">{score}</span>
                            <span className="text-neutral-600">- {SCORE_DESCRIPTIONS[score]}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Province Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProvince && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  <span>{PROVINCE_NAMES[selectedProvince]}</span>
                </DialogTitle>
              </DialogHeader>

              {/* Current Indicator Score Details */}
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-neutral-500 font-medium">Indicator</div>
                    <div className="text-lg font-semibold text-neutral-900">{selectedIndicator.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wide text-neutral-500 font-medium">Score</div>
                    <div
                      className="text-3xl font-bold text-white px-3 py-1 rounded-lg inline-block"
                      style={{ backgroundColor: getScoreColor(getRegionScore(selectedProvince)) }}
                    >
                      {getRegionScore(selectedProvince)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-300">
                  <div className="text-sm font-medium text-neutral-700 mb-1">Explanation:</div>
                  <p className="text-sm text-neutral-800 leading-relaxed">
                    {getScoreExplanation(selectedIndicator.id, getRegionScore(selectedProvince))}
                  </p>
                </div>
              </div>

              {/* All Scores for This Province */}
              <div>
                <h3 className="font-semibold text-lg mb-3">All Indicator Scores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {INDICATORS.map(indicator => {
                    const score = getProvinceScore(selectedProvince, indicator.id);
                    return (
                      <button
                        key={indicator.id}
                        onClick={() => {
                          setSelectedIndicator(indicator);
                          setDialogOpen(false);
                        }}
                        className="text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{indicator.shortName}</div>
                            <div className="text-xs text-neutral-600 mt-0.5">{indicator.description}</div>
                          </div>
                          <div
                            className="ml-3 px-3 py-1 rounded font-bold text-white text-lg"
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
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="font-semibold text-sm mb-2">Resources</h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={PDF_DOCUMENTS.processMap.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                  >
                    <FileText className="h-3 w-3" />
                    Process Map
                  </a>
                  <span className="text-neutral-300">•</span>
                  <a
                    href={PDF_DOCUMENTS.methodology.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                  >
                    <FileText className="h-3 w-3" />
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
