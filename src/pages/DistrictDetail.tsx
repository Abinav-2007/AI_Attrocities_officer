import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { PageHeader, Card, SectionHeader, KpiCard, Badge, Btn, AIBadge, DistressScoreBar } from '../components/ui';
import { districts, monthlyTrend, riskDistribution, interventionOutcomes } from '../data/mockData';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts';

export default function DistrictDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const district = districts.find(d => d.id === id) ?? districts[0];

  const resources = [
    { type: 'Counselors', required: 42, available: 31 },
    { type: 'Medical Support', required: 18, available: 15 },
    { type: 'Legal Support', required: 24, available: 19 },
  ];

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Districts
      </button>

      <PageHeader
        title={`${district.name} District`}
        subtitle="State of Maharashtra"
      />

      {/* KPIs — 3 cards only (Coverage removed) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard
          icon={<Users className="w-4 h-4" />}
          title="Total Beneficiaries"
          value={district.beneficiaries.toLocaleString()}
          unit=" people"
          trend={4.2}
          color="#2457a8"
        />
        <KpiCard
          icon={<AlertTriangle className="w-4 h-4" />}
          title="High-Risk Cases"
          value={district.highRisk}
          unit=" cases"
          trend={-8.1}
          invert
          color="#ef4444"
        />
        <KpiCard
          icon={<CheckCircle className="w-4 h-4" />}
          title="Success Rate"
          value={district.successRate}
          unit="%"
          trend={1.8}
          color="#22c55e"
        />
      </div>

      {/* Row 1: Distress Score + Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <SectionHeader title="Average Distress Score" subtitle="Current district average" />
          <DistressScoreBar score={district.distress} className="mb-4" />
          <p className="text-xs text-slate-600 leading-relaxed">
            Based on weekly check-ins from {district.beneficiaries.toLocaleString()} beneficiaries.
            Score represents psychological distress on a 0–100 point scale.
          </p>
        </Card>

        <Card>
          <SectionHeader title="Risk Distribution" subtitle="Current beneficiary risk breakdown" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5">
              {riskDistribution.map(r => (
                <div key={r.name} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: r.color }}
                  />
                  <span className="text-xs text-slate-700">{r.name}</span>
                  <span className="text-xs font-mono font-semibold text-slate-900 ml-auto pl-3">
                    {r.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: Distress Trend + Intervention Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <SectionHeader
            title="6-Month Distress Trend"
            subtitle="Average score over time"
            action={
              <div className="flex gap-1">
                <Btn variant="ghost" size="xs">30d</Btn>
                <Btn variant="ghost" size="xs">90d</Btn>
              </div>
            }
          />
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyTrend.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[40, 70]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: 'Score (points)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: '#64748b' },
                }}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
                formatter={(v: number) => [`${v} points`, 'Distress']}
              />
              <Line
                type="monotone"
                dataKey="distress"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader
            title="Intervention Outcomes"
            subtitle="Before vs. after (distress score in points)"
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={interventionOutcomes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="district"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: 'Score (points)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: '#64748b' },
                }}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
                formatter={(v: number) => [`${v} points`, '']}
              />
              <Legend formatter={v => <span style={{ fontSize: 11, color: '#374151' }}>{v}</span>} />
              <Bar dataKey="before" name="Before" fill="#fca5a5" radius={[3, 3, 0, 0]} />
              <Bar dataKey="after" name="After" fill="#86efac" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 3: Recent Alerts + Resource Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SectionHeader
            title="Recent Alerts"
            subtitle="High-priority cases requiring attention"
            action={<Btn variant="ghost" size="xs">View all</Btn>}
          />
          <div className="space-y-3">
            {[
              { id: 'A-2847', score: 84, reason: 'Score spike: +22 pts in 7 days', priority: 'Critical' },
              { id: 'A-3102', score: 71, reason: 'Reported threat, reduced check-ins', priority: 'High' },
              { id: 'A-2901', score: 68, reason: 'Missed 3 consecutive check-ins', priority: 'High' },
            ].map(a => (
              <div
                key={a.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/cases/${a.id}`)}
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800">Case #{a.id}</span>
                    <Badge label={a.priority} size="xs" />
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{a.reason}</div>
                </div>
                <span className="text-sm font-mono font-bold text-red-600 flex-shrink-0">
                  {a.score} pts
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader
            title="District Resource Status"
            subtitle="Current availability and gaps"
          />
          <div className="space-y-5">
            {resources.map(r => {
              const gap = r.required - r.available;
              const pct = (r.available / r.required) * 100;
              return (
                <div key={r.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800">{r.type}</span>
                    <span
                      className={`text-xs font-semibold ${
                        gap > 5
                          ? 'text-red-600'
                          : gap > 0
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {gap > 0 ? `${gap} short` : 'Fully staffed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          gap > 5
                            ? 'bg-red-400'
                            : gap > 0
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-700 flex-shrink-0">
                      {r.available} / {r.required}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100">
            <AIBadge confidence={88} />
          </div>
        </Card>
      </div>
    </div>
  );
}
