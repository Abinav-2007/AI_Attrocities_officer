import { PageHeader, Card, Badge } from '../components/ui';

const auditEntries = [
  { ts: '2025-04-01 09:42:18', official: 'Dir. Rajiv Kumar', action: 'Acknowledged Alert', resource: 'Case A-2847', prev: 'New', next: 'Acknowledged', ip: '10.0.0.45', status: 'Success' },
  { ts: '2025-04-01 09:38:02', official: 'Dir. Rajiv Kumar', action: 'Approved Intervention', resource: 'Case A-3102 — Legal Aid', prev: 'Pending', next: 'Approved', ip: '10.0.0.45', status: 'Success' },
  { ts: '2025-04-01 08:55:34', official: 'Adv. Priya Mehta', action: 'Assigned Counselor', resource: 'Case A-2901', prev: 'Unassigned', next: 'Assigned', ip: '10.0.0.61', status: 'Success' },
  { ts: '2025-04-01 08:30:00', official: 'Sys Admin', action: 'Report Generated', resource: 'Parliamentary Briefing Q4', prev: '—', next: 'Generated', ip: '10.0.0.1', status: 'Success' },
  { ts: '2025-03-31 17:12:44', official: 'Dir. Rajiv Kumar', action: 'Escalated Alert', resource: 'Case A-2847', prev: 'Acknowledged', next: 'Escalated', ip: '10.0.0.45', status: 'Success' },
  { ts: '2025-03-31 14:22:11', official: 'Dr. Arun Nair', action: 'Dismissed Alert', resource: 'Case A-3300 (duplicate)', prev: 'New', next: 'Dismissed — Duplicate entry', ip: '10.0.0.72', status: 'Success' },
  { ts: '2025-03-31 11:08:59', official: 'Unknown session', action: 'Login Attempt Failed', resource: 'Auth service', prev: '—', next: '—', ip: '192.168.4.21', status: 'Failed' },
];

export default function AuditLog() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Audit Trail" subtitle="Complete record of all officer actions — tamper-evident log" />

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {['Date Range', 'Official', 'Action Type', 'District', 'Case'].map(f => (
          <select key={f} className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 outline-none focus:border-blue-500">
            <option>{f}</option>
          </select>
        ))}
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Audit Entries</h3>
          <span className="text-xs text-slate-400 font-mono">{auditEntries.length} entries shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Timestamp', 'Official', 'Action', 'Resource', 'Prev. State', 'New State', 'IP / Session', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditEntries.map((e, i) => (
                <tr key={i} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${e.status === 'Failed' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 text-[11px] font-mono text-slate-500 whitespace-nowrap">{e.ts}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">{e.official}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{e.action}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 font-mono">{e.resource}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{e.prev}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{e.next}</td>
                  <td className="px-4 py-3 text-[11px] font-mono text-slate-400">{e.ip}</td>
                  <td className="px-4 py-3">
                    <Badge label={e.status} size="xs" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">All entries are cryptographically signed and immutable.</span>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded bg-blue-600 text-white text-xs font-medium">1</button>
            <button className="w-6 h-6 rounded text-slate-500 text-xs hover:bg-slate-100">2</button>
            <button className="w-6 h-6 rounded text-slate-500 text-xs hover:bg-slate-100">3</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
