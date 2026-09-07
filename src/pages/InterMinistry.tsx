import { PageHeader, Card, Badge } from '../components/ui';
import { RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

const integrations = [
  {
    id: 'MoHFW', name: 'Ministry of Health & Family Welfare',
    status: 'Connected', lastSync: '12 min ago', recordsSynced: 18421, dataTypes: ['Medical referrals', 'Health support cases'],
    color: '#22c55e',
  },
  {
    id: 'MHA', name: 'Ministry of Home Affairs',
    status: 'Syncing', lastSync: '38 min ago', recordsSynced: 12480, dataTypes: ['FIR registrations', 'Witness protection cases'],
    color: '#2457a8',
  },
  {
    id: 'NLCC', name: 'National Legal Services Authority',
    status: 'Attention Required', lastSync: '2 hr ago', recordsSynced: 6234, dataTypes: ['Legal aid assignments', 'Trial case status'],
    color: '#ef4444',
  },
  {
    id: 'MoSJE', name: 'Ministry of Social Justice & Empowerment',
    status: 'Connected', lastSync: '8 min ago', recordsSynced: 24120, dataTypes: ['Beneficiary registry', 'Scheme enrollments', 'Counselor roster'],
    color: '#22c55e',
  },
];

const timeline = [
  { time: '09:42', ministry: 'MoHFW', event: '1,842 medical referral records synced', status: 'Success' },
  { time: '09:18', ministry: 'MHA', event: 'Witness protection case update received', status: 'Success' },
  { time: '08:30', ministry: 'NLCC', event: 'Sync failed — API timeout. Retry scheduled in 30 min', status: 'Failed' },
  { time: '07:55', ministry: 'MoSJE', event: 'Counselor roster updated: 14 new assignments', status: 'Success' },
  { time: '07:00', ministry: 'MHA', event: 'FIR batch upload: 312 records', status: 'Success' },
];

export default function InterMinistry() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Inter-Ministry Coordination" subtitle="Data synchronization status across government ministries" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {integrations.map(m => (
          <Card key={m.id} className={m.status === 'Attention Required' ? 'border-red-200 bg-red-50/30' : ''}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-slate-800 font-mono">{m.id}</span>
                  <Badge label={m.status} size="xs" />
                </div>
                <div className="text-xs text-slate-500">{m.name}</div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${m.color}15` }}>
                {m.status === 'Connected' ? <CheckCircle className="w-4 h-4" style={{ color: m.color }} />
                  : m.status === 'Syncing' ? <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
                  : <AlertTriangle className="w-4 h-4 text-red-500" />}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-slate-50 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 mb-0.5">Last Sync</div>
                <div className="text-xs font-mono text-slate-700">{m.lastSync}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5">
                <div className="text-[10px] text-slate-400 mb-0.5">Records Synced</div>
                <div className="text-xs font-mono font-semibold text-slate-700">{m.recordsSynced.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {m.dataTypes.map(dt => (
                <span key={dt} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{dt}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Synchronization Activity Timeline</h3>
        <div className="space-y-0">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-start gap-4 py-3 border-b border-slate-50 last:border-0">
              <span className="text-[11px] text-slate-400 font-mono w-12 flex-shrink-0 pt-0.5">{t.time}</span>
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${t.status === 'Success' ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <div className="flex-1">
                <span className="text-[10px] font-semibold text-slate-500 mr-2 font-mono">[{t.ministry}]</span>
                <span className="text-sm text-slate-700">{t.event}</span>
              </div>
              <span className={`text-[10px] font-medium ${t.status === 'Success' ? 'text-emerald-600' : 'text-red-500'}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
