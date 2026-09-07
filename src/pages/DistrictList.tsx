import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Download, ChevronUp, ChevronDown, Brain } from 'lucide-react';
import { PageHeader, Card, Badge, Trend, Btn, DistressScore } from '../components/ui';
import { districts } from '../data/mockData';

type SortKey = keyof typeof districts[0];

export default function DistrictList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('distress');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = districts
    .filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
    .filter(d => riskFilter === 'All' || d.risk === riskFilter)
    .sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === 'desc' ? (bv > av ? 1 : -1) : (av > bv ? 1 : -1);
    });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="ml-1">
      {sortKey === k
        ? sortDir === 'desc' ? <ChevronDown className="w-3 h-3 inline" /> : <ChevronUp className="w-3 h-3 inline" />
        : <ChevronDown className="w-3 h-3 inline text-slate-300" />}
    </span>
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader
        title="District Performance"
        subtitle="Sortable comparison of all districts in Maharashtra"
        actions={<Btn variant="secondary"><Download className="w-3.5 h-3.5" /> Export</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table */}
        <div className="lg:col-span-3">
          <Card className="!p-0 overflow-hidden">
            {/* Filters */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search district…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 w-44"
                />
              </div>
              <select
                value={riskFilter}
                onChange={e => setRiskFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-500 text-slate-600"
              >
                {['All', 'Critical', 'High', 'Medium', 'Low'].map(r => <option key={r}>{r}</option>)}
              </select>
              <span className="text-xs text-slate-400 ml-auto">{filtered.length} districts</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {[
                      { label: '#', key: null },
                      { label: 'District', key: 'name' as SortKey },
                      { label: 'Beneficiaries', key: 'beneficiaries' as SortKey },
                      { label: 'High Risk %', key: 'highRisk' as SortKey },
                      { label: 'Avg Distress', key: 'distress' as SortKey },
                      { label: 'Coverage', key: 'coverage' as SortKey },
                      { label: 'Success Rate', key: 'successRate' as SortKey },
                      { label: 'Active Cases', key: 'activeCases' as SortKey },
                      { label: 'Trend', key: 'trend' as SortKey },
                      { label: 'Action', key: null },
                    ].map(col => (
                      <th
                        key={col.label}
                        onClick={() => col.key && toggleSort(col.key)}
                        className={`px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider ${col.key ? 'cursor-pointer hover:text-slate-700' : ''}`}
                      >
                        {col.label}{col.key && <SortIcon k={col.key} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d, i) => (
                    <tr
                      key={d.id}
                      className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer"
                      onClick={() => navigate(`/district/${d.id}`)}
                    >
                      <td className="px-4 py-3 text-xs text-slate-400 font-mono">{i + 1}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-slate-800">{d.name}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700 font-mono tabular-nums">{d.beneficiaries.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-mono tabular-nums text-slate-700">
                        {((d.highRisk / d.beneficiaries) * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3"><DistressScore score={d.distress} /></td>
                      <td className="px-4 py-3 text-sm text-slate-700 font-mono">{d.coverage}%</td>
                      <td className="px-4 py-3 text-sm text-slate-700 font-mono">{d.successRate}%</td>
                      <td className="px-4 py-3 text-sm text-slate-700 font-mono tabular-nums">{d.activeCases}</td>
                      <td className="px-4 py-3"><Trend value={d.trend} invert /></td>
                      <td className="px-4 py-3">
                        <Badge label={d.risk} size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">Showing {filtered.length} of {districts.length} districts</span>
              <div className="flex items-center gap-1">
                {[1].map(p => (
                  <button key={p} className="w-6 h-6 rounded text-xs bg-blue-600 text-white font-medium">{p}</button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Side panel */}
        <div>
          <Card className="bg-amber-50/50 border-amber-100">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">What needs attention?</span>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-amber-700 leading-relaxed">
                3 districts have shown a <strong>sustained increase in distress</strong> over the last 30 days.
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Nagpur</strong> and <strong>Nashik</strong> are approaching critical threshold with counselor shortages.
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Intervention coverage in <strong>Nanded</strong> has dropped 4 points since February.
              </p>
              <div className="pt-2 border-t border-amber-200">
                <div className="text-[10px] text-amber-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  AI-assisted insight — requires human review
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
