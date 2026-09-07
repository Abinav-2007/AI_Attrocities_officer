import { PageHeader, Card, SectionHeader, AIBadge, Btn } from '../components/ui';
import { resourceData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell } from 'recharts';
import { Brain, CheckCircle, Edit3, X } from 'lucide-react';

export default function Resources() {
  const totalRequired = resourceData.reduce((s, d) => s + d.required, 0);
  const totalAvailable = resourceData.reduce((s, d) => s + d.available, 0);
  const totalGap = totalRequired - totalAvailable;
  const critical = resourceData.filter(d => d.gap > 8).length;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Resource Allocation" subtitle="Counselor, legal, and medical support distribution across Maharashtra" />

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Counselors Required', value: totalRequired, color: '#2457a8' },
          { label: 'Counselors Deployed', value: totalAvailable, color: '#22c55e' },
          { label: 'Current Gap', value: totalGap, color: '#ef4444' },
          { label: 'Districts w/ Critical Shortage', value: critical, color: '#f97316' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-xs text-slate-500 mb-2">{k.label}</div>
            <div className="text-2xl font-bold font-mono tabular-nums" style={{ color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bar chart */}
        <div className="lg:col-span-2">
          <Card>
            <SectionHeader title="Counselor Requirement vs. Availability by District" />
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={resourceData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="district" tick={{ fontSize: 11, fill: '#475467' }} axisLine={false} tickLine={false} width={55} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }} />
                <Legend formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
                <Bar dataKey="required" name="Required" fill="#bfdbfe" radius={[0, 3, 3, 0]} />
                <Bar dataKey="available" name="Available" fill="#2457a8" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* AI Recommendation */}
        <div>
          <Card className="bg-slate-900 text-white border-slate-800 h-full">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold">AI Resource Recommendation</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Based on distress trends, active caseload and intervention coverage, <strong className="text-white">Nagpur</strong> and <strong className="text-white">Pune</strong> require additional counselor capacity.
            </p>
            <div className="space-y-3 mb-4">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-[10px] text-slate-400 mb-1">Supporting Evidence</div>
                <ul className="space-y-1">
                  <li className="text-xs text-slate-300">· Nagpur: gap of 23 counselors, distress at 78</li>
                  <li className="text-xs text-slate-300">· Pune: gap of 11, sustained high-risk trend</li>
                  <li className="text-xs text-slate-300">· 4 districts above critical threshold</li>
                </ul>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Suggested allocation</span>
                <span className="text-white font-mono font-semibold">+34 counselors</span>
              </div>
            </div>
            <div className="mb-4">
              <AIBadge confidence={87} />
            </div>
            <div className="flex gap-2">
              <Btn size="xs" variant="primary"><CheckCircle className="w-3 h-3" /> Review</Btn>
              <Btn size="xs" variant="ghost"><Edit3 className="w-3 h-3" /> Modify</Btn>
              <Btn size="xs" variant="danger"><X className="w-3 h-3" /></Btn>
            </div>
          </Card>
        </div>
      </div>

      {/* Gap table */}
      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">District Resource Gap Detail</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['District', 'Required', 'Available', 'Gap', 'Coverage %', 'Status'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resourceData.map(r => {
              const pct = Math.round((r.available / r.required) * 100);
              const status = r.gap > 10 ? 'Critical' : r.gap > 5 ? 'High' : r.gap > 2 ? 'Medium' : 'Adequate';
              const statusColor = r.gap > 10 ? 'text-red-600' : r.gap > 5 ? 'text-orange-600' : r.gap > 2 ? 'text-amber-600' : 'text-emerald-600';
              return (
                <tr key={r.district} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-slate-800">{r.district}</td>
                  <td className="px-5 py-3 text-sm font-mono text-slate-700">{r.required}</td>
                  <td className="px-5 py-3 text-sm font-mono text-slate-700">{r.available}</td>
                  <td className="px-5 py-3 text-sm font-mono font-semibold text-red-600">{r.gap}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-20 overflow-hidden">
                        <div className={`h-full rounded-full ${r.gap > 10 ? 'bg-red-400' : r.gap > 5 ? 'bg-orange-400' : 'bg-emerald-400'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-mono text-slate-600">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold">
                    <span className={statusColor}>{status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
