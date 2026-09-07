import { PageHeader, Card, SectionHeader } from '../components/ui';
import { monthlyTrend, caseTypeData, riskDistribution, interventionOutcomes, districtTrendComparison } from '../data/mockData';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

const colors = ['#2457a8', '#22c55e', '#f59e0b', '#ef4444', '#7c3aed'];

export default function Analytics() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="State Analytics" subtitle="Comprehensive data analysis for Maharashtra — March 2025" />

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {['Date Range', 'District', 'Case Type', 'Risk Level'].map(f => (
          <select key={f} className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 outline-none focus:border-blue-500">
            <option>{f}</option>
          </select>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Distress Trend */}
        <Card>
          <SectionHeader title="Monthly Distress Trend" subtitle="Average distress score — 12 months" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 60]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} />
              <Line type="monotone" dataKey="distress" stroke="#7c3aed" strokeWidth={2} dot={false} name="Avg Distress" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Case Type Distribution */}
        <Card>
          <SectionHeader title="Case Type Distribution" subtitle="Proportion of cases by type" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={caseTypeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={2}>
                  {caseTypeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {caseTypeData.map(c => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-xs text-slate-600">{c.name}</span>
                  <span className="text-xs font-mono font-medium text-slate-800 ml-auto">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Intervention Success */}
        <Card>
          <SectionHeader title="Intervention Success Rate" subtitle="Distress score before vs. after intervention by district" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={interventionOutcomes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="district" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} />
              <Legend formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
              <Bar dataKey="before" name="Before" fill="#fca5a5" radius={[3, 3, 0, 0]} />
              <Bar dataKey="after" name="After" fill="#86efac" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* District Trend Comparison */}
        <Card>
          <SectionHeader title="District Trend Comparison" subtitle="Average distress by district — last 6 months" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={districtTrendComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[45, 90]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }} />
              <Legend formatter={v => <span style={{ fontSize: 11 }}>{v}</span>} />
              {['Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane'].map((d, i) => (
                <Line key={d} type="monotone" dataKey={d} stroke={colors[i]} strokeWidth={1.5} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <SectionHeader title="Risk Distribution Breakdown" subtitle="Statewide beneficiary risk categories" />
        <div className="grid grid-cols-4 gap-4">
          {riskDistribution.map(r => (
            <div key={r.name} className="text-center p-4 rounded-xl" style={{ background: `${r.color}10` }}>
              <div className="text-2xl font-bold font-mono tabular-nums" style={{ color: r.color }}>{r.value.toLocaleString()}</div>
              <div className="text-xs text-slate-500 mt-1">{r.name} Risk</div>
              <div className="text-[10px] text-slate-400 font-mono">{((r.value / 12482) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
