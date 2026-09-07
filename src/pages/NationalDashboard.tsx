import { useNavigate } from 'react-router';
import { Users, AlertTriangle, Activity, Shield, TrendingUp, Map, Download, RefreshCw } from 'lucide-react';
import { KpiCard, PageHeader, Card, SectionHeader, Badge, Trend, Btn } from '../components/ui';
import { IndiaMap } from '../components/IndiaMap';
import { states, nationalYoYTrend } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function NationalDashboard() {
  const navigate = useNavigate();
  const attentionStates = [...states].sort((a, b) => b.distress - a.distress).slice(0, 5);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Distinctive national header */}
      <div className="bg-gradient-to-r from-navy-950 to-navy-800 rounded-2xl p-6 mb-6 border border-navy-700 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Map className="w-4 h-4 text-blue-300" />
              <span className="text-blue-300 text-xs font-medium uppercase tracking-widest">National Overview</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">National Mental Wellbeing Intelligence</h1>
            <p className="text-blue-200 text-sm">Strategic policy, budget and nationwide impact analysis — India, FY 2024–25</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-300 flex-shrink-0">
            <span className="text-xs">Last updated: 5 min ago</span>
            <Btn variant="secondary" size="xs"><RefreshCw className="w-3 h-3" /></Btn>
            <Btn variant="primary" size="xs"><Download className="w-3 h-3" /> Parliamentary Report</Btn>
          </div>
        </div>
      </div>

      {/* National KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <KpiCard icon={<Users className="w-4 h-4" />} title="Total Beneficiaries" value="1,24,200" trend={11.2} trendLabel="vs prev. year"
          sparkData={[90000, 96000, 102000, 108000, 115000, 124200]} color="#2457a8" />
        <KpiCard icon={<Activity className="w-4 h-4" />} title="Active Cases" value="28,412" trend={7.8} trendLabel="vs prev. year"
          sparkData={[22000, 23000, 24800, 25900, 27100, 28412]} color="#7c3aed" />
        <KpiCard icon={<TrendingUp className="w-4 h-4" />} title="Avg. Distress Score" value="54.2" trend={-4.8} invert trendLabel="vs prev. year"
          sparkData={[61, 60, 58, 57, 56, 54.2]} color="#7c3aed" />
        <KpiCard icon={<Shield className="w-4 h-4" />} title="Intervention Coverage" value="71.6" unit="%" trend={8.4} trendLabel="vs prev. year"
          sparkData={[55, 58, 62, 65, 68, 71.6]} color="#22c55e" />
        <KpiCard icon={<AlertTriangle className="w-4 h-4" />} title="High-Risk Cases" value="18,240" trend={-6.1} invert trendLabel="vs prev. year"
          sparkData={[22000, 21000, 20500, 19800, 18900, 18240]} color="#ef4444" />
        <KpiCard icon={<Map className="w-4 h-4" />} title="States Requiring Attention" value="4" trend={-2} invert trendLabel="vs prev. year"
          sparkData={[8, 7, 6, 5, 5, 4]} color="#f97316" />
      </div>

      {/* India Map + State Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <SectionHeader
              title="National Distress Overview"
              subtitle="State-level heatmap — click a state to drill down"
            />
            <IndiaMap />
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <SectionHeader title="States Requiring Attention" subtitle="Ranked by average distress score" />
            <div className="space-y-3">
              {attentionStates.map((s, i) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => s.id === 'maharashtra' ? navigate('/') : undefined}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center font-semibold flex-shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-800 truncate">{s.name}</span>
                      <Badge label={s.risk} size="xs" />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500 font-mono">Distress: {s.distress}</span>
                      <Trend value={s.trend} invert />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Year-over-Year Trend */}
      <Card>
        <SectionHeader title="Year-over-Year National Distress Trend" subtitle="Current year vs. previous year — average distress score" />
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
    </div>
  );
}
