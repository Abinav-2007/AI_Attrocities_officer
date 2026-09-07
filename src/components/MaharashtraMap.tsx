import { useState } from 'react';
import { useNavigate } from 'react-router';
import { districts } from '../data/mockData';

// Simplified district polygon approximations for Maharashtra SVG map
// Represented as rough path data for key districts
const districtPaths: Record<string, { d: string; cx: number; cy: number }> = {
  nagpur: { cx: 380, cy: 120, d: 'M340,80 L420,80 L440,120 L420,160 L340,160 L320,120 Z' },
  amravati: { cx: 270, cy: 130, d: 'M230,100 L310,100 L320,135 L310,165 L230,165 L220,135 Z' },
  nashik: { cx: 140, cy: 155, d: 'M100,130 L185,130 L195,160 L185,190 L100,190 L90,160 Z' },
  pune: { cx: 155, cy: 240, d: 'M110,215 L200,215 L210,245 L200,275 L110,275 L100,245 Z' },
  aurangabad: { cx: 240, cy: 210, d: 'M200,185 L285,185 L295,215 L285,240 L200,240 L190,215 Z' },
  nanded: { cx: 310, cy: 270, d: 'M270,248 L350,248 L360,275 L350,302 L270,302 L260,275 Z' },
  thane: { cx: 110, cy: 205, d: 'M80,185 L145,185 L150,210 L145,230 L80,230 L75,210 Z' },
  solapur: { cx: 225, cy: 285, d: 'M190,265 L265,265 L272,290 L265,315 L190,315 L183,290 Z' },
  kolhapur: { cx: 145, cy: 320, d: 'M110,300 L185,300 L190,325 L185,350 L110,350 L105,325 Z' },
  jalgaon: { cx: 210, cy: 120, d: 'M175,100 L250,100 L258,125 L250,148 L175,148 L167,125 Z' },
};

const riskColor: Record<string, string> = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#f59e0b',
  Low: '#22c55e',
};

export function MaharashtraMap({ onDistrictClick }: { onDistrictClick?: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const hoveredDistrict = districts.find(d => d.id === hovered);

  return (
    <div className="relative w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden" style={{ paddingBottom: '55%' }}>
      <svg
        viewBox="0 0 520 380"
        className="absolute inset-0 w-full h-full"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
      >
        {/* Maharashtra outline (simplified) */}
        <path
          d="M85,120 L130,80 L200,75 L260,78 L330,72 L400,78 L445,95 L455,135 L450,185 L435,215 L420,250 L395,290 L360,320 L310,340 L260,350 L210,340 L165,360 L120,345 L95,310 L80,275 L75,230 L80,190 Z"
          fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5"
        />

        {/* Districts */}
        {districts.map(district => {
          const path = districtPaths[district.id];
          if (!path) return null;
          const color = riskColor[district.risk];
          const isHovered = hovered === district.id;
          return (
            <g key={district.id}>
              <path
                d={path.d}
                fill={color}
                fillOpacity={isHovered ? 0.85 : 0.55}
                stroke={color}
                strokeWidth={isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHovered(district.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  if (onDistrictClick) onDistrictClick(district.id);
                  else navigate(`/district/${district.id}`);
                }}
              />
              <text
                x={path.cx}
                y={path.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fill="#1e293b"
                className="pointer-events-none select-none font-medium"
              >
                {district.name}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        {[['Critical', '#ef4444'], ['High', '#f97316'], ['Medium', '#f59e0b'], ['Low', '#22c55e']].map(([label, color], i) => (
          <g key={label} transform={`translate(16, ${310 + i * 16})`}>
            <rect width="10" height="10" rx="2" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="0.5" />
            <text x="14" y="8" fontSize="8" fill="#475467">{label}</text>
          </g>
        ))}
      </svg>

      {/* Hover tooltip */}
      {hovered && hoveredDistrict && (
        <div
          className="absolute z-10 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200 p-3 w-44 pointer-events-none"
          style={{ left: Math.min(mousePos.x + 12, 300), top: Math.max(mousePos.y - 80, 8) }}
        >
          <div className="font-semibold text-sm text-slate-800 mb-1.5">{hoveredDistrict.name}</div>
          <div className="space-y-0.5">
            {[
              ['Beneficiaries', hoveredDistrict.beneficiaries.toLocaleString()],
              ['High-risk', hoveredDistrict.highRisk.toString()],
              ['Avg. Distress', hoveredDistrict.distress.toString()],
              ['Coverage', `${hoveredDistrict.coverage}%`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-slate-500">{k}</span>
                <span className="font-medium text-slate-800">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
