import { PageHeader, Card, SectionHeader, Badge, Btn } from '../components/ui';
import { casesPipeline, cases, monthlyTrend } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router';

export default function CaseProgress() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Case Progress" subtitle="Statewide legal case monitoring — Maharashtra" />

      {/* Pipeline */}
      <Card className="mb-6">
        <SectionHeader title="Case Progress Pipeline" subtitle="All cases by current legal stage" />
        <div className="flex items-end gap-2">
          {casesPipeline.map((stage, i) => {
            const max = casesPipeline[0].count;
            const h = Math.round((stage.count / max) * 120) + 40;
            return (
              <div key={i} className="flex-1 text-center group">
                <div className="text-xs font-mono font-semibold text-slate-700 mb-1">{stage.count.toLocaleString()}</div>
                <div
                  className="w-full rounded-t-lg bg-blue-600 group-hover:bg-blue-700 transition-colors relative cursor-pointer"
                  style={{ height: h }}
                >
                  {stage.delayed > 0 && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-red-500 whitespace-nowrap font-mono">{stage.delayed}↑</div>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-2 leading-tight">{stage.stage}</div>
                {stage.avg_days > 0 && <div className="text-[9px] text-slate-400 font-mono">avg {stage.avg_days}d</div>}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <SectionHeader title="Case Progression Trend" subtitle="New cases by stage — monthly" />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }} />
                <Bar dataKey="interventions" name="Interventions" fill="#2457a8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="highRisk" name="High Risk Cases" fill="#fca5a5" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Cases requiring attention', value: 312, color: 'text-red-600' },
            { label: 'Delayed cases', value: 1018, color: 'text-orange-600' },
            { label: 'Avg. trial duration', value: '210 days', color: 'text-slate-800' },
          ].map(s => (
            <Card key={s.label}>
              <div className="text-xs text-slate-500">{s.label}</div>
              <div className={`text-2xl font-bold font-mono tabular-nums mt-1 ${s.color}`}>{s.value}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Cases Table */}
      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Cases Requiring Attention</h3>
          <Btn variant="secondary" size="xs">Export</Btn>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Case ID', 'District', 'Case Type', 'Stage', 'Days in Stage', 'Status', 'Last Update', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3.5">
                  <button onClick={() => navigate(`/cases/${c.id}`)} className="text-sm font-mono font-medium text-blue-600 hover:underline">#{c.id}</button>
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-700">{c.district}</td>
                <td className="px-4 py-3.5 text-sm text-slate-600">{c.type}</td>
                <td className="px-4 py-3.5 text-sm text-slate-700">{c.stage}</td>
                <td className="px-4 py-3.5 text-sm font-mono text-slate-700 tabular-nums">
                  <span className={c.daysInStage > 100 ? 'text-red-600 font-semibold' : ''}>{c.daysInStage}d</span>
                </td>
                <td className="px-4 py-3.5"><Badge label={c.status} size="xs" /></td>
                <td className="px-4 py-3.5 text-xs text-slate-400">{c.lastUpdate}</td>
                <td className="px-4 py-3.5">
                  <Btn size="xs" variant="ghost" onClick={() => navigate(`/cases/${c.id}`)}>View</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
