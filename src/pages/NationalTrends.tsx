import { PageHeader, Card, SectionHeader } from '../components/ui';
import { states, nationalYoYTrend } from '../data/mockData';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell
} from 'recharts';

const riskColor: Record<string, string> = { Critical: '#ef4444', High: '#f97316', Medium: '#f59e0b', Low: '#22c55e' };

export default function NationalTrends() {
  const byDistress = [...states].sort((a, b) => b.distress - a.distress);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="National Trends" subtitle="Year-over-year and cross-state comparative analysis" />

      <div className="flex gap-3 mb-6 flex-wrap">
        {['Year', 'State', 'Case Type', 'Risk Level'].map(f => (
          <select key={f} className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 outline-none focus:border-blue-500">
            <option>{f}</option>
          </select>
        ))}
      </div>

      <Card className="mb-6">
        <SectionHeader title="Year-over-Year Distress Trend" subtitle="National average distress score — FY 2023–24 vs FY 2024–25" />
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={nationalYoYTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[44, 65]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} />
            <Legend formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
            <Line type="monotone" dataKey="prev" name="FY 2023–24" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            <Line type="monotone" dataKey="curr" name="FY 2024–25" stroke="#2457a8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SectionHeader title="State Ranking by Average Distress" subtitle="Higher score = more concern" />
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={byDistress} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" domain={[30, 80]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#475467' }} axisLine={false} tickLine={false} width={75} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }} />
              <Bar dataKey="distress" name="Avg Distress" radius={[0, 3, 3, 0]}>
                {byDistress.map((s, i) => <Cell key={i} fill={riskColor[s.risk]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Intervention Coverage by State" subtitle="% of high/medium risk beneficiaries receiving active support" />
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={[...states].sort((a, b) => b.coverage - a.coverage)} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" domain={[40, 100]} unit="%" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#475467' }} axisLine={false} tickLine={false} width={75} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }} formatter={(v: number) => [`${v}%`, 'Coverage']} />
              <Bar dataKey="coverage" name="Coverage" fill="#2457a8" radius={[0, 3, 3, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
