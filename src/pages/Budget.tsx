import { PageHeader, Card, SectionHeader } from '../components/ui';
import { statesBudget } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function Budget() {
  const allocated = 240, utilized = 186, remaining = 54;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Budget & Resource Utilization" subtitle="National allocation and expenditure — FY 2024–25" />

      {/* Budget overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Allocated', value: '₹240 Cr', sub: 'Total FY budget', color: '#2457a8', pct: 100 },
          { label: 'Utilized', value: '₹186 Cr', sub: '77.5% of allocation', color: '#22c55e', pct: 77.5 },
          { label: 'Remaining', value: '₹54 Cr', sub: 'Q4 carry-forward', color: '#94a3b8', pct: 22.5 },
        ].map(b => (
          <Card key={b.label} className="text-center">
            <div className="text-xs text-slate-500 mb-2">{b.label}</div>
            <div className="text-3xl font-bold font-mono tabular-nums mb-1" style={{ color: b.color }}>{b.value}</div>
            <div className="text-xs text-slate-400">{b.sub}</div>
            <div className="mt-3 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <SectionHeader title="State-wise Budget Utilization" subtitle="Allocated vs. utilized (₹ Cr)" />
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={statesBudget} layout="vertical" margin={{ left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" unit=" Cr" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="state" tick={{ fontSize: 11, fill: '#475467' }} axisLine={false} tickLine={false} width={95} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }}
              formatter={(v: number) => [`₹${v} Cr`]}
            />
            <Bar dataKey="allocated" name="Allocated" fill="#bfdbfe" radius={[0, 3, 3, 0]} />
            <Bar dataKey="utilized" name="Utilized" fill="#2457a8" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Table */}
      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">State Budget Detail</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['State', 'Allocated (₹ Cr)', 'Utilized (₹ Cr)', 'Utilization %', 'Beneficiaries', 'Cost / Beneficiary', 'Anomaly'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statesBudget.map(s => {
              const pct = Math.round((s.utilized / s.allocated) * 100);
              const cpb = Math.round((s.utilized * 10000000) / s.beneficiaries);
              const anomaly = pct < 60 ? 'Low utilization' : pct > 95 ? 'Near cap' : null;
              return (
                <tr key={s.state} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{s.state}</td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-700">₹{s.allocated}</td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-700">₹{s.utilized}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full ${pct < 60 ? 'bg-red-400' : pct > 95 ? 'bg-amber-400' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-mono">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-700 tabular-nums">{s.beneficiaries.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-mono text-slate-700">₹{cpb.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {anomaly && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${anomaly === 'Low utilization' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                        ⚠ {anomaly}
                      </span>
                    )}
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
