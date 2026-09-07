import { useState } from 'react';
import { useNavigate } from 'react-router';
import { states } from '../data/mockData';

// Simplified India state outlines (approximate SVG paths)
const statePaths: Record<string, { d: string; cx: number; cy: number }> = {
  rajasthan:     { cx: 175, cy: 160, d: 'M120,110 L230,108 L238,160 L230,215 L175,225 L120,218 L108,160 Z' },
  uttarpradesh: { cx: 290, cy: 145, d: 'M238,110 L355,108 L365,150 L355,192 L238,195 L235,150 Z' },
  madhyapradesh:{ cx: 255, cy: 225, d: 'M175,195 L340,192 L345,230 L340,265 L175,268 L170,230 Z' },
  maharashtra:  { cx: 215, cy: 300, d: 'M160,268 L275,265 L280,305 L265,335 L215,345 L165,335 L155,305 Z' },
  gujarat:      { cx: 145, cy: 250, d: 'M100,220 L170,218 L175,252 L170,285 L130,295 L100,280 L90,252 Z' },
  bihar:        { cx: 340, cy: 180, d: 'M305,158 L375,156 L382,182 L375,206 L305,208 L298,182 Z' },
  jharkhand:    { cx: 340, cy: 222, d: 'M305,208 L375,206 L382,225 L375,242 L305,244 L298,225 Z' },
  odisha:       { cx: 335, cy: 265, d: 'M295,242 L375,240 L382,268 L375,295 L295,298 L288,268 Z' },
  haryana:      { cx: 218, cy: 118, d: 'M188,100 L252,98 L258,120 L252,142 L188,145 L182,120 Z' },
  punjab:       { cx: 195, cy: 90, d: 'M168,74 L225,72 L230,92 L225,112 L168,115 L163,92 Z' },
  karnataka:    { cx: 225, cy: 360, d: 'M175,335 L275,332 L280,362 L270,392 L225,400 L180,392 L170,362 Z' },
  tamilnadu:    { cx: 260, cy: 415, d: 'M210,395 L300,392 L308,418 L300,448 L260,455 L218,448 L205,418 Z' },
};

const riskColor: Record<string, string> = {
  Critical: '#ef4444', High: '#f97316', Medium: '#f59e0b', Low: '#22c55e',
};

export function IndiaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const hoveredState = states.find(s => s.id === hovered);

  return (
    <div className="relative w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden" style={{ paddingBottom: '68%' }}>
      <svg
        viewBox="0 0 480 480"
        className="absolute inset-0 w-full h-full"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
      >
        {/* India rough outline */}
        <path
          d="M100,70 L230,60 L380,65 L395,110 L410,165 L400,215 L385,260 L365,310 L330,370 L290,415 L255,455 L225,470 L195,460 L170,430 L140,395 L120,355 L90,310 L75,265 L68,210 L75,155 L88,110 Z"
          fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5"
        />

        {Object.entries(statePaths).map(([id, { d, cx, cy }]) => {
          const state = states.find(s => s.id === id);
          if (!state) return null;
          const color = riskColor[state.risk];
          const isHovered = hovered === id;
          return (
            <g key={id}>
              <path
                d={d}
                fill={color}
                fillOpacity={isHovered ? 0.85 : 0.5}
                stroke={color}
                strokeWidth={isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => id === 'maharashtra' ? navigate('/') : undefined}
              />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#1e293b" className="pointer-events-none select-none font-medium">
                {state.name.split(' ')[0]}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        {[['Critical', '#ef4444'], ['High', '#f97316'], ['Medium', '#f59e0b'], ['Low', '#22c55e']].map(([label, color], i) => (
          <g key={label} transform={`translate(8, ${380 + i * 18})`}>
            <rect width="12" height="12" rx="2" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.5" />
            <text x="16" y="10" fontSize="9" fill="#475467">{label}</text>
          </g>
        ))}
      </svg>

      {/* Hover tooltip */}
      {hovered && hoveredState && (
        <div
          className="absolute z-10 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200 p-3 w-52 pointer-events-none"
          style={{ left: Math.min(mousePos.x + 14, 280), top: Math.max(mousePos.y - 90, 8) }}
        >
          <div className="font-semibold text-sm text-slate-800 mb-1.5">{hoveredState.name}</div>
          <div className="space-y-0.5">
            {[
              ['Beneficiaries', hoveredState.beneficiaries.toLocaleString()],
              ['High-risk', `${hoveredState.highRiskPct}%`],
              ['Avg. Distress', hoveredState.distress.toString()],
              ['Coverage', `${hoveredState.coverage}%`],
              ['Trend', `${hoveredState.trend > 0 ? '+' : ''}${hoveredState.trend}%`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-slate-500">{k}</span>
                <span className="font-medium text-slate-800">{v}</span>
              </div>
            ))}
          </div>
          {hovered === 'maharashtra' && (
            <div className="mt-2 text-[10px] text-blue-600 font-medium">Click to open State Dashboard →</div>
          )}
        </div>
      )}
    </div>
  );
}
