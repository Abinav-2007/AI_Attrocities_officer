import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Download, Bell, Phone, Users, AlertTriangle, Activity, Shield, CheckCircle } from 'lucide-react';
import { PageHeader, Card, SectionHeader, KpiCard, Badge, Btn, AIBadge } from '../components/ui';
import { districts, monthlyTrend, riskDistribution, interventionOutcomes, casesPipeline } from '../data/mockData';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend
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
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Districts
      </button>

      <PageHeader
        title={`${district.name} District`}
        subtitle="State of Maharashtra"
        actions={
          <>
            <Btn variant="secondary"><Download className="w-3.5 h-3.5" /> Export Report</Btn>
            <Btn variant="secondary"><Bell className="w-3.5 h-3.5" /> View Alerts</Btn>
            <Btn variant="secondary"><Phone className="w-3.5 h-3.5" /> Contact Admin</Btn>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KpiCard icon={<Users className="w-4 h-4" />} title="Total Beneficiaries" value={district.beneficiaries.toLocaleString()} trend={4.2} color="#2457a8" />
        <KpiCard icon={<AlertTriangle className="w-4 h-4" />} title="High-Risk Cases" value={district.highRisk} trend={-8.1} invert color="#ef4444" />
        <KpiCard icon={<Activity className="w-4 h-4" />} title="Avg. Distress" value={district.distress} trend={-2.4} invert color="#7c3aed" />
        <KpiCard icon={<Shield className="w-4 h-4" />} title="Intervention Coverage" value={district.coverage} unit="%" trend={3.1} color="#22c55e" />
        <KpiCard icon={<CheckCircle className="w-4 h-4" />} title="Success Rate" value={district.successRate} unit="%" trend={1.8} color="#2457a8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Distress Trend */}
        <Card>
          <SectionHeader title="Distress Trend" subtitle="30-day average distress score" action={
            <div className="flex gap-1">
              <Btn variant="ghost" size="xs">30d</Btn>
              <Btn variant="ghost" size="xs">90d</Btn>
            </div>
          } />
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyTrend.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 70]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} />
              <Line type="monotone" dataKey="distress" stroke="#7c3aed" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <SectionHeader title="Risk Distribution" subtitle="Current beneficiary risk breakdown" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={2} dataKey="value">
                  {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {riskDistribution.map(r => (
                <div key={r.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: r.color }} />
                  <span className="text-xs text-slate-600">{r.name}</span>
                  <span className="text-xs font-mono font-medium text-slate-800 ml-auto">{r.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Intervention Outcomes */}
        <Card>
          <SectionHeader title="Intervention Outcomes" subtitle="Distress score before vs. after intervention" />
          <ResponsiveContainer width="100%" height={200}>
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

        {/* Case Progress Pipeline */}
        <Card>
          <SectionHeader title="Case Progress Pipeline" subtitle="Cases at each legal stage" />
          <div className="space-y-2.5">
            {casesPipeline.map((stage, i) => {
              const max = casesPipeline[0].count;
              const pct = (stage.count / max) * 100;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-24 flex-shrink-0">{stage.stage}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-700 w-12 text-right">{stage.count.toLocaleString()}</span>
                  {stage.delayed > 0 && (
                    <span className="text-[10px] text-red-500 w-16 flex-shrink-0">+{stage.delayed} delayed</span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Alerts + Resource Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <SectionHeader title="Recent Alerts" subtitle="High-priority cases requiring attention" action={
            <Btn variant="ghost" size="xs">View all</Btn>
          } />
          <div className="space-y-3">
            {[
              { id: 'A-2847', score: 84, reason: 'Score spike: +22 in 7 days', priority: 'Critical' },
              { id: 'A-3102', score: 71, reason: 'Reported threat, reduced check-ins', priority: 'High' },
              { id: 'A-2901', score: 68, reason: 'Missed 3 consecutive check-ins', priority: 'High' },
            ].map(a => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/cases/${a.id}`)}>
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800">Case #{a.id}</span>
                    <Badge label={a.priority} size="xs" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.reason}</div>
                </div>
                <span className="text-xs font-mono font-bold text-red-600">{a.score}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Resource Status */}
        <Card>
          <SectionHeader title="District Resource Status" subtitle="Current resource availability and gaps" />
          <div className="space-y-4">
            {resources.map(r => {
              const gap = r.required - r.available;
              const pct = (r.available / r.required) * 100;
              return (
                <div key={r.type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{r.type}</span>
                    <span className={`text-xs font-mono font-semibold ${gap > 5 ? 'text-red-600' : gap > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      Gap: {gap}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${gap > 5 ? 'bg-red-400' : gap > 0 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 font-mono w-20 text-right">{r.available}/{r.required}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <AIBadge confidence={88} />
          </div>
        </Card>
      </div>
    </div>
  );
}
