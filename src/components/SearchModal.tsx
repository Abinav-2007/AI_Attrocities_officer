import { useState } from 'react';
import { Search, X, FileText, MapPin, AlertTriangle, Users } from 'lucide-react';

const results = {
  Cases: [
    { id: 'A-2847', desc: 'Nagpur — Physical Assault — Distress 84', risk: 'Critical' },
    { id: 'A-3102', desc: 'Pune — Threat/Intimidation — Distress 71', risk: 'High' },
  ],
  Districts: [
    { id: 'Nagpur', desc: 'Maharashtra — Critical — 1,521 beneficiaries' },
    { id: 'Pune', desc: 'Maharashtra — High — 1,842 beneficiaries' },
  ],
  States: [
    { id: 'Maharashtra', desc: 'State Dashboard — 12,482 beneficiaries' },
    { id: 'Uttar Pradesh', desc: 'National — 18,421 beneficiaries' },
  ],
  Alerts: [
    { id: 'ALT-001', desc: 'Case A-2847 — Score spike 22 pts in 7 days' },
  ],
  Reports: [
    { id: 'RPT-2025-03', desc: 'Maharashtra State Report — March 2025' },
  ],
};

const icons: Record<string, React.ElementType> = {
  Cases: Users, Districts: MapPin, States: MapPin, Alerts: AlertTriangle, Reports: FileText,
};

export function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search cases, districts, states, reports…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="py-2 max-h-96 overflow-y-auto">
          {Object.entries(results).map(([cat, items]) => (
            <div key={cat} className="mb-2">
              <div className="px-5 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{cat}</div>
              {items.map((item) => {
                const Icon = icons[cat];
                return (
                  <button
                    key={item.id}
                    onClick={onClose}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-800">{item.id}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-4 text-[11px] text-slate-400">
          <span><kbd className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">↵</kbd> Select</span>
          <span><kbd className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">Esc</kbd> Close</span>
          <span className="ml-auto">Masked identities — no PII displayed</span>
        </div>
      </div>
    </div>
  );
}
