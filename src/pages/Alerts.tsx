import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCheck, UserCheck, ArrowUpRight, XCircle, Eye } from 'lucide-react';
import { PageHeader, Card, Badge, DistressScore, Btn } from '../components/ui';
import { alerts } from '../data/mockData';

const tabs = ['All', 'Critical', 'High', 'Medium', 'Acknowledged'];

export default function Alerts() {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const filtered = alerts.filter(a => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Acknowledged') return a.status === 'Acknowledged';
    return a.priority === activeTab;
  });

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Alerts & Attention" subtitle="Distress spikes and cases requiring immediate officer action" />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-lg w-fit">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
            {t === 'All' && <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{alerts.length}</span>}
          </button>
        ))}
      </div>

      <Card className="!p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Case ID', 'District', 'Distress Score', 'Reason', 'Time', 'Priority', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3.5">
                  <button onClick={() => navigate(`/cases/${a.id}`)} className="text-sm font-medium text-blue-600 hover:underline font-mono">
                    #{a.id}
                  </button>
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-700">{a.district}</td>
                <td className="px-4 py-3.5"><DistressScore score={a.distress} /></td>
                <td className="px-4 py-3.5 text-xs text-slate-600 max-w-xs">{a.reason}</td>
                <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">{a.time}</td>
                <td className="px-4 py-3.5"><Badge label={a.priority} /></td>
                <td className="px-4 py-3.5"><Badge label={a.status} /></td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-1">
                    <button title="View details" onClick={() => navigate(`/cases/${a.id}`)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button title="Acknowledge" className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors">
                      <CheckCheck className="w-3.5 h-3.5" />
                    </button>
                    <button title="Assign" className="p-1.5 rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                      <UserCheck className="w-3.5 h-3.5" />
                    </button>
                    <button title="Escalate" className="p-1.5 rounded hover:bg-orange-50 text-slate-400 hover:text-orange-600 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button title="Dismiss" className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Showing {filtered.length} alerts · All actions are audited and timestamped</span>
        </div>
      </Card>
    </div>
  );
}
