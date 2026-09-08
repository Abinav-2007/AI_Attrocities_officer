import { PageHeader, Card, SectionHeader, Badge, Btn } from '../components/ui';
import { casesPipeline, cases } from '../data/mockData';
import { useNavigate } from 'react-router';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function CaseProgress() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Case Progress" subtitle="Statewide legal case monitoring — Maharashtra" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-xs text-slate-700">Cases requiring attention</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-red-600">312 cases</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xs text-slate-700">Delayed cases</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-orange-600">1,018 cases</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-slate-700">Avg. trial duration</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">210 days</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Simplified Pipeline */}
      <Card className="mb-6">
        <SectionHeader title="Legal Case Pipeline" subtitle="Cases by current stage" />
        <div className="space-y-4">
          {casesPipeline.map((stage, i) => {
            const max = casesPipeline[0].count;
            const pct = Math.round((stage.count / max) * 100);
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-800 w-32">{stage.stage}</span>
                    <span className="text-sm font-mono text-slate-700">{stage.count.toLocaleString()} cases</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {stage.avg_days > 0 && (
                      <span className="text-xs text-slate-500">Avg: {stage.avg_days} days</span>
                    )}
                    {stage.delayed > 0 && (
                      <span className="text-xs text-red-600 font-semibold">{stage.delayed} delayed</span>
                    )}
                  </div>
                </div>
                <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${stage.delayed > 50 ? 'bg-red-500' : stage.delayed > 0 ? 'bg-orange-500' : 'bg-blue-600'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Cases Table */}
      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Cases Requiring Attention</h3>
          <Btn variant="secondary" size="xs">Export</Btn>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Case ID', 'District', 'Case Type', 'Stage', 'Days in Stage', 'Status', 'Action'].map(h => (
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
                  <span className={c.daysInStage > 100 ? 'text-red-600 font-semibold' : ''}>{c.daysInStage} days</span>
                </td>
                <td className="px-4 py-3.5"><Badge label={c.status} size="xs" /></td>
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
