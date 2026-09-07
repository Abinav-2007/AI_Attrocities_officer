import { PageHeader, Card, SectionHeader, Trend } from '../components/ui';
import { actWiseData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ActWise() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Act-wise Analysis" subtitle="Case distribution and outcomes by SC/ST Act and IPC provisions" />

      <Card className="mb-6">
        <SectionHeader title="Cases by Act / Section" subtitle="Number of cases registered under each provision" />
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={actWiseData} layout="vertical" margin={{ left: 160 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="act" tick={{ fontSize: 10, fill: '#475467' }} axisLine={false} tickLine={false} width={155} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 11 }} />
            <Bar dataKey="cases" name="Cases" fill="#2457a8" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Provision-level Analysis</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Act / Section', 'Cases', 'Avg Distress', 'High Risk %', 'Coverage', 'Trend'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {actWiseData.map(a => (
              <tr key={a.act} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-slate-800 font-mono text-xs">{a.act}</td>
                <td className="px-5 py-3.5 text-sm font-mono text-slate-700 tabular-nums">{a.cases}</td>
                <td className="px-5 py-3.5 text-sm font-mono text-slate-700">{a.distress}</td>
                <td className="px-5 py-3.5 text-sm font-mono text-slate-700">{a.highRiskPct}%</td>
                <td className="px-5 py-3.5 text-sm font-mono text-slate-700">{a.coverage}%</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-mono font-semibold ${a.trend.startsWith('+') ? 'text-red-500' : 'text-emerald-600'}`}>{a.trend}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
