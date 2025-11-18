import React, { useState } from 'react';
import { MapPin, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const IndoreWasteDashboard = () => {
  const [selectedZone, setSelectedZone] = useState(null);

  // Waste generation data for different zones in Indore
  const wasteZones = [
    { id: 1, name: "Rajwada", fillRate: 92, x: 300, y: 280 },
    { id: 2, name: "Vijay Nagar", fillRate: 78, x: 380, y: 200 },
    { id: 3, name: "Palasia", fillRate: 85, x: 320, y: 260 },
    { id: 4, name: "Rau", fillRate: 65, x: 240, y: 380 },
    { id: 5, name: "Sanwer Road", fillRate: 88, x: 280, y: 320 },
    { id: 6, name: "MR 10", fillRate: 72, x: 400, y: 190 },
    { id: 7, name: "Bhanwarkuan", fillRate: 81, x: 310, y: 300 },
    { id: 8, name: "Aerodrome", fillRate: 68, x: 220, y: 270 }
  ];

  // Sankey diagram data
  const wasteFlow = {
    collection: 1000,
    recycling: 650,
    composting: 300,
    landfill: 50
  };

  const diversionRate = ((wasteFlow.recycling + wasteFlow.composting) / wasteFlow.collection * 100).toFixed(1);

  // KPIs
  const kpis = {
    diversionRate: 95,
    logisticsSavings: 40,
    traceability: 100
  };

  const getColor = (fillRate) => {
    if (fillRate >= 85) return '#dc2626';
    if (fillRate >= 70) return '#ea580c';
    return '#16a34a';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">OPERATIONAL IMPACT</h1>
          <div className="h-1 w-32 bg-orange-500 mb-4"></div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-6xl font-bold text-green-600 mb-3">{kpis.diversionRate}%</p>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Diversion Rate</h3>
            <p className="text-sm text-slate-500">Via MRF Sorting & Co-Processing</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-6xl font-bold text-blue-600 mb-3">{kpis.logisticsSavings}%</p>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Logistics Savings</h3>
            <p className="text-sm text-slate-500">Via IoT Sensors & ACO Routing</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-6xl font-bold text-orange-600 mb-3">{kpis.traceability}%</p>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Traceability</h3>
            <p className="text-sm text-slate-500">Via Industrial Mass Balance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Geospatial Heatmap */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">1. GEOSPATIAL HEATMAP</h2>
            </div>

            <div className="relative bg-amber-50 rounded-lg h-96 overflow-hidden border-2 border-slate-300">
              <svg width="100%" height="100%" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
                {/* Clear background */}
                <rect width="600" height="500" fill="#fef3c7"/>
                
                {/* District boundary - clear and bold */}
                <path 
                  d="M 100 80 L 150 60 L 220 70 L 280 85 L 340 75 L 400 90 L 450 120 L 480 180 L 490 250 L 470 320 L 430 370 L 370 410 L 290 430 L 220 420 L 160 390 L 120 340 L 90 270 L 85 200 L 90 140 Z" 
                  fill="#f5deb3" 
                  stroke="#8b6914" 
                  strokeWidth="3"
                />
                
                {/* Khan River - clear blue line */}
                <path 
                  d="M 110 120 Q 200 140 300 155 Q 400 170 480 190" 
                  stroke="#2563eb" 
                  strokeWidth="8" 
                  fill="none"
                />
                
                {/* Major Roads - bright yellow */}
                <line x1="90" y1="260" x2="490" y2="280" stroke="#fbbf24" strokeWidth="8"/>
                <line x1="300" y1="70" x2="280" y2="430" stroke="#fbbf24" strokeWidth="8"/>
                
                {/* Ring Road */}
                <circle cx="300" cy="280" r="100" stroke="#94a3b8" strokeWidth="5" fill="none"/>
                
                {/* Town labels - large and clear */}
                <text x="140" y="100" fontSize="20" fill="#1f2937" fontWeight="bold">Depalpur</text>
                <text x="410" y="130" fontSize="20" fill="#1f2937" fontWeight="bold">Sanwer</text>
                <text x="240" y="400" fontSize="20" fill="#1f2937" fontWeight="bold">Mhow</text>
                
                {/* Central Indore - very clear */}
                <circle cx="300" cy="280" r="15" fill="#1f2937"/>
                <text x="300" y="320" fontSize="32" fill="#1f2937" textAnchor="middle" fontWeight="bold">INDORE</text>
                
                {/* Waste zone markers - CLEAR AND VISIBLE */}
                {wasteZones.map(zone => (
                  <g key={zone.id} className="cursor-pointer" onClick={() => setSelectedZone(zone)}>
                    {/* Outer circle - visible glow */}
                    <circle
                      cx={zone.x}
                      cy={zone.y}
                      r="18"
                      fill={getColor(zone.fillRate)}
                      opacity="0.3"
                    />
                    {/* Main marker - clear and solid */}
                    <circle
                      cx={zone.x}
                      cy={zone.y}
                      r="10"
                      fill={getColor(zone.fillRate)}
                      stroke="white"
                      strokeWidth="3"
                    />
                    {/* Center dot */}
                    <circle
                      cx={zone.x}
                      cy={zone.y}
                      r="4"
                      fill="white"
                    />
                  </g>
                ))}
                
                {/* Title box - large and clear */}
                <rect x="20" y="20" width="180" height="60" fill="white" stroke="#8b6914" strokeWidth="2" rx="5"/>
                <text x="110" y="45" fontSize="24" fill="#1f2937" textAnchor="middle" fontWeight="bold">INDORE</text>
                <text x="110" y="65" fontSize="18" fill="#64748b" textAnchor="middle">DISTRICT</text>
                
                {/* Compass - large and clear */}
                <g transform="translate(540, 50)">
                  <circle cx="0" cy="0" r="30" fill="white" stroke="#1f2937" strokeWidth="2"/>
                  <polygon points="0,-22 -8,12 0,8 8,12" fill="#dc2626"/>
                  <text x="0" y="-28" fontSize="16" fill="#1f2937" textAnchor="middle" fontWeight="bold">N</text>
                </g>
                
                {/* Legend - large and clear */}
                <g transform="translate(20, 380)">
                  <rect x="0" y="0" width="200" height="100" fill="white" stroke="#8b6914" strokeWidth="2" rx="5"/>
                  <text x="10" y="20" fontSize="16" fill="#1f2937" fontWeight="bold">LEGEND</text>
                  
                  <line x1="10" y1="35" x2="50" y2="35" stroke="#fbbf24" strokeWidth="5"/>
                  <text x="60" y="40" fontSize="14" fill="#1f2937">Highway</text>
                  
                  <line x1="10" y1="55" x2="50" y2="55" stroke="#2563eb" strokeWidth="5"/>
                  <text x="60" y="60" fontSize="14" fill="#1f2937">River</text>
                  
                  <circle cx="30" cy="75" r="8" fill="#dc2626"/>
                  <text x="60" y="80" fontSize="14" fill="#1f2937">Hotspot</text>
                </g>
              </svg>

              {/* Selected zone popup */}
              {selectedZone && (
                <div className="absolute top-4 right-4 bg-white rounded-lg p-5 shadow-2xl border-4 border-blue-500 max-w-xs">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl text-slate-800">{selectedZone.name}</h3>
                    <button 
                      onClick={() => setSelectedZone(null)}
                      className="text-slate-400 hover:text-slate-600 text-2xl font-bold leading-none"
                    >×</button>
                  </div>
                  <div className="space-y-2 text-base">
                    <p><span className="font-semibold">Fill Rate:</span> <span className="text-xl font-bold">{selectedZone.fillRate}%</span></p>
                    <p><span className="font-semibold">Status:</span> 
                      <span className={`ml-2 font-bold text-lg ${
                        selectedZone.fillRate >= 85 ? 'text-red-600' : 
                        selectedZone.fillRate >= 70 ? 'text-orange-600' : 
                        'text-green-600'
                      }`}>
                        {selectedZone.fillRate >= 85 ? 'CRITICAL' : 
                         selectedZone.fillRate >= 70 ? 'HIGH' : 'NORMAL'}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Zone list */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {wasteZones.map(zone => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className="text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-200 transition-colors border-2 border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-white shadow-md" 
                      style={{ backgroundColor: getColor(zone.fillRate) }}
                    ></div>
                    <span className="font-semibold text-slate-800">{zone.name}</span>
                    <span className="text-slate-600 ml-auto font-bold">{zone.fillRate}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sankey Diagram */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">2. SANKEY DIAGRAM (MFA)</h2>
            </div>

            <div className="bg-slate-50 rounded-lg p-8 h-96 flex flex-col justify-center">
              <svg className="w-full h-64" viewBox="0 0 400 200">
                {/* Collection node */}
                <rect x="10" y="80" width="60" height="40" fill="#3b82f6" rx="4" />
                <text x="40" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Collection
                </text>
                <text x="40" y="135" textAnchor="middle" fill="#64748b" fontSize="11">
                  {wasteFlow.collection}T
                </text>

                {/* Flows */}
                <path d="M 70 90 Q 180 50 290 70" fill="none" stroke="#22c55e" strokeWidth="50" opacity="0.6"/>
                <path d="M 70 100 Q 180 100 290 110" fill="none" stroke="#84cc16" strokeWidth="30" opacity="0.6"/>
                <path d="M 70 110 Q 180 150 290 150" fill="none" stroke="#ef4444" strokeWidth="5" opacity="0.6"/>

                {/* Recycling node */}
                <rect x="290" y="50" width="80" height="40" fill="#22c55e" rx="4" />
                <text x="330" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Recycling</text>
                <text x="330" y="85" textAnchor="middle" fill="white" fontSize="10">{wasteFlow.recycling}T (65%)</text>

                {/* Composting node */}
                <rect x="290" y="95" width="80" height="40" fill="#84cc16" rx="4" />
                <text x="330" y="113" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Composting</text>
                <text x="330" y="128" textAnchor="middle" fill="white" fontSize="10">{wasteFlow.composting}T (30%)</text>

                {/* Landfill node */}
                <rect x="290" y="140" width="80" height="40" fill="#ef4444" rx="4" />
                <text x="330" y="158" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Landfill</text>
                <text x="330" y="173" textAnchor="middle" fill="white" fontSize="10">{wasteFlow.landfill}T (5%)</text>
              </svg>

              {/* Diversion rate */}
              <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                <div className="text-sm text-slate-600 mb-1">Total Diversion Rate</div>
                <div className="text-4xl font-bold text-green-600">{diversionRate}%</div>
                <div className="text-xs text-slate-500 mt-1">Target: 95% | Current: Above target ✓</div>
              </div>
            </div>

            {/* Flow breakdown */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="bg-green-50 rounded p-2 text-center">
                <div className="font-semibold text-green-700">Recycling</div>
                <div className="text-lg font-bold text-green-600">{wasteFlow.recycling}T</div>
              </div>
              <div className="bg-lime-50 rounded p-2 text-center">
                <div className="font-semibold text-lime-700">Composting</div>
                <div className="text-lg font-bold text-lime-600">{wasteFlow.composting}T</div>
              </div>
              <div className="bg-red-50 rounded p-2 text-center">
                <div className="font-semibold text-red-700">Landfill</div>
                <div className="text-lg font-bold text-red-600">{wasteFlow.landfill}T</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Indore Smart City Waste Management System | Data updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default IndoreWasteDashboard;