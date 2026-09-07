import { PageHeader, Card, AIBadge, Btn } from '../components/ui';
import { Brain, FileText, BarChart2, ChevronRight } from 'lucide-react';

const insights = [
  {
    title: 'Increase counselor capacity in Maharashtra',
    body: 'Maharashtra has experienced a sustained increase in high-risk cases while counselor availability remains below estimated requirement.',
    evidence: ['+12% high-risk cases (last 90 days)', '68% counselor coverage vs 80% target', '4 districts above critical threshold'],
    impact: 'Potential 18% reduction in response time; 200+ additional beneficiaries served monthly',
    confidence: 87,
    state: 'Maharashtra',
  },
  {
    title: 'Accelerate trial timelines in Uttar Pradesh',
    body: 'Average trial duration has exceeded 210 days in 6 districts. Judicial resource allocation may need review in coordination with MHA.',
    evidence: ['Trial stage average: 212 days (target: 90)', '421 cases delayed beyond threshold', 'Distress spikes correlated with trial delays'],
    impact: 'Faster conviction rates; reduced victim uncertainty and secondary trauma',
    confidence: 79,
    state: 'Uttar Pradesh',
  },
  {
    title: 'Expand digital check-in coverage in Bihar',
    body: 'Bihar shows the highest rate of missed check-ins (34%). Low digital access and low counselor coverage are compounding the monitoring gap.',
    evidence: ['34% missed check-in rate', 'Only 54% intervention coverage', 'Highest distress score nationally at 76'],
    impact: 'Estimated 20–25% improvement in early distress detection',
    confidence: 81,
    state: 'Bihar',
  },
];

export default function PolicyInsights() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader
        title="Policy Insights"
        subtitle="AI-assisted strategic recommendations for national-level policy decision-making"
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
        <Brain className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          All insights below are <strong>AI-assisted recommendations based on available data</strong>. Each requires review by a senior official before any policy or resource action is taken. These are inputs to human decision-making, not automated decisions.
        </p>
      </div>

      <div className="space-y-5">
        {insights.map((ins, i) => (
          <Card key={i} className="border-l-4 border-l-blue-600">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">{ins.title}</h3>
                <span className="inline-flex items-center text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">{ins.state}</span>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-2xl font-bold font-mono text-blue-600">{ins.confidence}%</div>
                <div className="text-[10px] text-slate-400">confidence</div>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">{ins.body}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">Evidence</div>
                <ul className="space-y-1">
                  {ins.evidence.map((e, j) => (
                    <li key={j} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-blue-400 flex-shrink-0 mt-0.5">·</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider mb-2">Projected Impact</div>
                <p className="text-xs text-emerald-800 leading-relaxed">{ins.impact}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <AIBadge confidence={ins.confidence} />
              <div className="flex gap-2">
                <Btn size="xs" variant="secondary"><BarChart2 className="w-3 h-3" /> Compare States</Btn>
                <Btn size="xs" variant="secondary"><FileText className="w-3 h-3" /> Generate Briefing</Btn>
                <Btn size="xs" variant="primary"><ChevronRight className="w-3 h-3" /> Review Evidence</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
