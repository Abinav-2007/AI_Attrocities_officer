import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, UserCheck, AlertTriangle, XCircle, Brain } from 'lucide-react';
import { PageHeader, Card, SectionHeader, Badge, Btn, AIBadge, DistressScoreBar } from '../components/ui';
import { puncheDistressTrend } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';

const shapFactors = [
  { label: 'Threat-related keywords', value: 15, color: '#ef4444' },
  { label: 'Reported fear', value: 12, color: '#f97316' },
  { label: 'Negative mood indicators', value: 10, color: '#f59e0b' },
  { label: 'Reduced response frequency', value: 7, color: '#f59e0b' },
  { label: 'Recent missed check-ins', value: 5, color: '#94a3b8' },
];

const interventionRecs = [
  { type: 'Counseling Follow-up', why: 'Score has risen 22 pts; immediate counselor contact needed', priority: 'Critical', dept: 'Social Welfare', status: 'Pending' },
  { type: 'Legal Aid', why: 'Trial stage approaching; beneficiary needs legal representation', priority: 'High', dept: 'Legal Services Authority', status: 'Approved' },
  { type: 'Witness Protection', why: 'Threat-related keywords in recent check-ins', priority: 'High', dept: 'Home Affairs', status: 'Pending' },
  { type: 'Medical Support', why: 'Self-reported health deterioration in last 2 check-ins', priority: 'Medium', dept: 'Health & Family Welfare', status: 'Pending' },
];

const interventionHistory = [
  { date: '10 Mar 2025', action: 'Counseling session assigned', officer: 'Adv. K. Sharma', dept: 'Social Welfare', outcome: 'Completed' },
  { date: '15 Mar 2025', action: 'Legal aid approved', officer: 'Adv. P. Mehta', dept: 'LSA', outcome: 'In Progress' },
  { date: '20 Mar 2025', action: 'Score alert acknowledged', officer: 'Dir. R. Kumar', dept: 'State HQ', outcome: 'Acknowledged' },
];

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseId = id ?? 'A-2847';

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <PageHeader
        title={`Case #${caseId}`}
        subtitle="Privacy-protected case view — all identifiers masked"
        actions={<Badge label="Critical" />}
      />

      {/* Case metadata */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Masked Name', value: 'S-2847-F' },
          { label: 'Age', value: '34 years' },
          { label: 'District', value: 'Nagpur' },
          { label: 'Case Type', value: 'Physical Assault' },
          { label: 'Legal Stage', value: 'Trial' },
          { label: 'Days in Trial', value: '184 days', highlight: true },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="text-[10px] text-slate-600 font-medium mb-1">{m.label}</div>
            <div className={`text-sm font-semibold ${m.highlight ? 'text-orange-600' : 'text-slate-900'}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Distress Score Bar - High Visibility */}
      <Card className="mb-6">
        <DistressScoreBar score={84} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Distress Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <SectionHeader title="Distress Score Timeline" subtitle="23-day trend" action={
              <div className="flex gap-1">
                <Btn variant="ghost" size="xs">7d</Btn>
                <Btn variant="ghost" size="xs">30d</Btn>
                <Btn variant="ghost" size="xs">90d</Btn>
              </div>
            } />
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={puncheDistressTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[55, 90]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} label={{ value: 'Score (points)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#94a3b8' } }} />
                <Tooltip 
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }}
                  formatter={(value: number) => [`${value} points`, 'Distress Score']}
                />
                <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Critical (75)', position: 'right', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'High (60)', position: 'right', fill: '#f59e0b', fontSize: 10 }} />
                <Line type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Explainable AI */}
        <div>
          <Card className="h-full border-blue-100 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">Why this score?</span>
            </div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-100">
              <span className="text-sm font-medium text-slate-700">Current Distress</span>
              <span className="text-3xl font-bold text-red-600 font-mono">84 pts</span>
            </div>
            <div className="space-y-3 mb-4">
              {shapFactors.map(f => (
                <div key={f.label} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-800 font-semibold mb-1">{f.label}</div>
                    <div className="bg-blue-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(f.value / 15) * 100}%`, backgroundColor: f.color }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 flex-shrink-0">+{f.value} pts</span>
                </div>
              ))}
            </div>
            <div className="border-t border-blue-100 pt-3 space-y-2">
              <p className="text-xs text-slate-800 leading-relaxed italic">
                "Score increased primarily due to reported threat, increased fear-related language and reduced engagement over the last week."
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
                  AI-generated
                </span>
                <span className="text-[11px] bg-slate-700 text-white px-2 py-0.5 rounded-full font-medium">
                  91% confidence
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Not a medical diagnosis. Risk indicator for officer decision-making.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Intervention Recommendations */}
      <Card className="mb-6">
        <SectionHeader title="Recommended Interventions" subtitle="AI-assisted — each requires officer review and approval" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interventionRecs.map(r => (
            <div key={r.type} className="border border-slate-200 rounded-xl p-4 hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-semibold text-slate-800">{r.type}</span>
                <Badge label={r.priority} size="xs" />
              </div>
              <p className="text-xs text-slate-700 mb-2 leading-relaxed">{r.why}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-600 mb-3">
                <span className="font-medium">{r.dept}</span>
                <span>·</span>
                <Badge label={r.status} size="xs" />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <Btn size="xs" variant="primary"><CheckCircle className="w-3 h-3" /> Approve</Btn>
                <Btn size="xs" variant="secondary"><UserCheck className="w-3 h-3" /> Assign</Btn>
                <Btn size="xs" variant="ghost">Modify</Btn>
                <Btn size="xs" variant="danger"><XCircle className="w-3 h-3" /> Reject</Btn>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <AIBadge confidence={91} />
        </div>
      </Card>

      {/* Intervention History */}
      <Card>
        <SectionHeader title="Intervention History" subtitle="Auditable action timeline" />
        <div className="space-y-1">
          {interventionHistory.map((h, i) => (
            <div key={i} className="flex items-start gap-4 py-3 border-b border-slate-50 last:border-0">
              <div className="w-24 flex-shrink-0 text-[11px] text-slate-600 font-mono pt-0.5">{h.date}</div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">{h.action}</div>
                <div className="text-xs text-slate-700">{h.officer} · {h.dept}</div>
              </div>
              <Badge label={h.outcome} size="xs" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
