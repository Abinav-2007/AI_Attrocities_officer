import { useNavigate } from 'react-router';
import { Users, AlertTriangle, Activity, Shield, TrendingDown, RefreshCw, Download, ChevronRight } from 'lucide-react';
import { KpiCard, PageHeader, Card, SectionHeader, Badge, Trend, Btn } from '../components/ui';
import { MaharashtraMap } from '../components/MaharashtraMap';
import { districts, monthlyTrend } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function StateDashboard() {
  const navigate = useNavigate();
  const topDistricts = [...districts].sort((a, b) => b.distress - a.distress).slice(0, 5);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader
        title="State Overview"
        subtitle="Monitoring distress trends, case progress and resource requirements across Maharashtra"
        meta="Last updated: 2 minutes ago"
        actions={
          <>
            <Btn variant="secondary"><RefreshCw className="w-3.5 h-3.5" /> Refresh</Btn>
            <Btn variant="primary"><Download className="w-3.5 h-3.5" /> Export Report</Btn>
          </>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          icon={<Users className="w-4 h-4" />}
          title="Total Beneficiaries"
          value="12,482"
          unit=" people"
          trend={8.4}
          trendLabel="vs prev. month"
          sparkData={[9800, 10200, 10800, 11100, 11600, 12000, 12482]}
          color="#2457a8"
          tooltip="Total number of registered atrocity survivors under monitoring in Maharashtra."
        />
        <KpiCard
          icon={<AlertTriangle className="w-4 h-4" />}
          title="High Risk Cases"
          value="1,284"
          unit=" cases"
          trend={-5.2}
          trendLabel="vs prev. month"
          sparkData={[1600, 1520, 1450, 1410, 1380, 1310, 1284]}
          color="#ef4444"
          invert
          tooltip="Survivors with a distress score above 70 points, requiring immediate intervention."
        />
        <KpiCard
          icon={<Shield className="w-4 h-4" />}
          title="Intervention Coverage"
          value="78.4"
          unit="%"
          trend={6.8}
          trendLabel="vs prev. month"
          sparkData={[62, 65, 68, 70, 73, 76, 78.4]}
          color="#22c55e"
          tooltip="Percentage of high and medium risk beneficiaries currently receiving active support."
        />
        <KpiCard
          icon={<TrendingDown className="w-4 h-4" />}
          title="Avg. Distress Score"
          value="46.8"
          unit=" points"
          trend={-3.4}
          trendLabel="vs prev. month"
          sparkData={[54, 52, 51, 50, 49, 48, 46.8]}
          color="#7c3aed"
          invert
          tooltip="State-wide mean distress score (0-100 points). Lower is better. Calculated from weekly survivor check-ins."
        />
      </div>

      {/* Map + Attention Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <SectionHeader
              title="District Distress Overview"
              subtitle="Click a district to open detailed view"
              action={
                <div className="flex gap-1">
                  <Btn variant="ghost" size="xs">Zoom</Btn>
                  <Btn variant="ghost" size="xs">Reset</Btn>
                  <Btn variant="ghost" size="xs">Map</Btn>
                </div>
              }
            />
            <MaharashtraMap onDistrictClick={id => navigate(`/district/${id}`)} />
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <SectionHeader title="State Attention Required" subtitle="Districts requiring intervention" />
            <div className="space-y-3">
              {topDistricts.map((d, i) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-slate-100"
                  onClick={() => navigate(`/district/${d.id}`)}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center font-semibold flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-800">{d.name}</span>
                      <Badge label={d.risk} size="xs" />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500 font-mono">{d.distress} points</span>
                      <Trend value={d.trend} invert size="xs" />
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Trend Chart */}
      <Card>
        <SectionHeader title="Monthly Distress Trend" subtitle="State-wide average — March 2024 to March 2025" />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[40, 60]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} label={{ value: 'Distress Score (points)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#94a3b8' } }} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }}
              formatter={(v: number) => [`${v} points`, 'Avg Distress']}
            />
            <Line type="monotone" dataKey="distress" stroke="#2457a8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
