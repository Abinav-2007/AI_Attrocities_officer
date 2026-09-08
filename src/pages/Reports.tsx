import { useState } from 'react';
import { PageHeader, Card, Btn } from '../components/ui';
import { FileText, Download, Eye, RefreshCw, X, Printer } from 'lucide-react';

const reports = [
  { 
    id: 'parliamentary',
    title: 'Parliamentary Briefing', 
    desc: 'Q4 FY 2024–25 strategic overview for Ministry', 
    lastGen: 'Today, 08:30 AM', 
    format: 'PDF', 
    size: '2.4 MB' 
  },
  { 
    id: 'mental-wellbeing',
    title: 'National Mental Wellbeing Report', 
    desc: 'Comprehensive state-wise wellbeing analysis', 
    lastGen: 'Yesterday, 06:00 PM', 
    format: 'PDF', 
    size: '5.8 MB' 
  },
  { 
    id: 'state-performance',
    title: 'State Performance Report — Maharashtra', 
    desc: 'District-level KPIs and intervention outcomes', 
    lastGen: '31 Mar 2025, 11:45 PM', 
    format: 'XLSX', 
    size: '1.2 MB' 
  },
  { 
    id: 'resource-allocation',
    title: 'Resource Allocation Report', 
    desc: 'Counselor and resource gap analysis nationwide', 
    lastGen: '30 Mar 2025', 
    format: 'PDF', 
    size: '3.1 MB' 
  },
  { 
    id: 'intervention-outcomes',
    title: 'Intervention Outcomes Report', 
    desc: 'Before/after distress analysis and success rates', 
    lastGen: '28 Mar 2025', 
    format: 'PDF', 
    size: '4.0 MB' 
  },
];

function ParliamentaryBriefingModal({ onClose }: { onClose: () => void }) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Create a print-friendly version that will trigger browser's save as PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = document.getElementById('report-content');
    if (!content) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Parliamentary Briefing - Sahyog AI</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; line-height: 1.6; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
            .meta { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
            h1 { font-size: 24px; font-weight: bold; margin: 10px 0; }
            h2 { font-size: 18px; font-weight: bold; margin: 25px 0 15px 0; color: #1e293b; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }
            th, td { padding: 10px; text-align: left; border: 1px solid #e2e8f0; }
            th { background: #f8fafc; font-weight: 600; }
            p { margin: 10px 0; color: #334155; }
            ol { margin: 10px 0 10px 20px; }
            li { margin: 5px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; font-style: italic; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">Government of India — CONFIDENTIAL</div>
            <h2 className="text-lg font-bold text-slate-900">Parliamentary Briefing Note</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button onClick={handleDownloadPDF} className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors ml-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div id="report-content" className="px-8 py-6 text-sm text-slate-700 leading-relaxed space-y-5">
          <div className="grid grid-cols-3 gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <div><span className="font-semibold">Prepared by:</span> Sahyog AI — Ministry of Social Justice & Empowerment</div>
            <div><span className="font-semibold">Date:</span> 1 April 2025</div>
            <div><span className="font-semibold">Classification:</span> Official Use Only</div>
          </div>
          
          <h3 className="font-bold text-slate-900 text-base">1. Executive Summary</h3>
          <p>The Sahyog AI platform monitors the mental wellbeing of <strong>1,24,200 registered survivors</strong> of atrocities across <strong>18 states</strong>. The national average distress score has declined by <strong>4.8 percentage points</strong> compared to the same period in FY 2023–24, indicating improved intervention coverage. However, <strong>four states — Bihar, Uttar Pradesh, Jharkhand, and Madhya Pradesh</strong> — continue to record distress scores above the critical threshold of 70 points.</p>
          
          <h3 className="font-bold text-slate-900 text-base">2. Key Indicators</h3>
          <table>
            <thead>
              <tr className="bg-slate-50">
                <th>Indicator</th>
                <th>FY 2023–24</th>
                <th>FY 2024–25</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Avg. National Distress Score</td>
                <td>58.6 points</td>
                <td>54.2 points</td>
                <td className="text-emerald-600 font-semibold">↓ 4.4 pts</td>
              </tr>
              <tr>
                <td>Total Beneficiaries</td>
                <td>1,09,200 people</td>
                <td>1,24,200 people</td>
                <td className="text-blue-600 font-semibold">↑ 13.7%</td>
              </tr>
              <tr>
                <td>Intervention Coverage</td>
                <td>63.2%</td>
                <td>71.6%</td>
                <td className="text-emerald-600 font-semibold">↑ 8.4%</td>
              </tr>
              <tr>
                <td>High-Risk Cases</td>
                <td>19,420 cases</td>
                <td>18,240 cases</td>
                <td className="text-emerald-600 font-semibold">↓ 6.1%</td>
              </tr>
            </tbody>
          </table>
          
          <h3 className="font-bold text-slate-900 text-base">3. States Requiring Policy Attention</h3>
          <p>Bihar, Uttar Pradesh, and Jharkhand require legislative and resource-level intervention. The Sahyog AI platform identifies counselor shortfalls (averaging 340 FTE positions vacant) and trial delays (exceeding 180 days in 6 high-distress districts) as primary drivers of elevated distress scores in these states.</p>
          
          <h3 className="font-bold text-slate-900 text-base">4. Budget Utilization Analysis</h3>
          <p>As of 31 March 2025, the aggregate budget utilization across priority states stands at 68.2% (₹186 Crores out of ₹273 Crores allocated). Underspending is concentrated in Bihar (63% utilized), Jharkhand (70%), and Madhya Pradesh (68%). This indicates capacity constraints rather than fund unavailability.</p>
          
          <h3 className="font-bold text-slate-900 text-base">5. Recommended Actions</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-2">
            <li>Approve additional counselor deployment of <strong>340 FTE positions</strong> across 4 priority states (Bihar, UP, Jharkhand, MP).</li>
            <li>Direct MHA to review trial delays exceeding <strong>180 days</strong> in 6 high-distress districts.</li>
            <li>Expand digital check-in infrastructure in Bihar to achieve <strong>85% coverage</strong> by Q2 FY 2025–26.</li>
            <li>Allocate additional ₹42 Crores for emergency counseling services in critical districts.</li>
            <li>Mandate quarterly state-level review meetings chaired by Chief Secretaries for underperforming states.</li>
          </ol>
          
          <h3 className="font-bold text-slate-900 text-base">6. Timeline and Next Steps</h3>
          <p><strong>Immediate (0-30 days):</strong> Approval of counselor deployment; emergency fund release.</p>
          <p><strong>Short-term (1-3 months):</strong> MHA coordination on trial delays; infrastructure scaling in Bihar.</p>
          <p><strong>Medium-term (3-6 months):</strong> Full deployment of counselors; quarterly review mechanism operational.</p>
          
          <div className="border-t border-slate-200 pt-4 text-xs text-slate-400 italic">
            This briefing is generated by the Sahyog AI platform using anonymized, AI-assisted analysis. All findings require verification by the nodal Ministry official before formal submission to Parliament.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reports() {
  const [showBriefing, setShowBriefing] = useState(false);
  const [currentReport, setCurrentReport] = useState<string | null>(null);

  const openPreview = (reportId: string) => {
    setCurrentReport(reportId);
    if (reportId === 'parliamentary') {
      setShowBriefing(true);
    }
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader 
        title="Reports & Briefings" 
        subtitle="Professional reports with preview and PDF download" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map(r => (
          <Card key={r.id} className="flex flex-col">
            <div className="flex items-start gap-3 mb-4 flex-1">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-0.5">{r.title}</h3>
                <p className="text-xs text-slate-500 leading-tight">{r.desc}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">{r.format}</span>
                  <span className="text-[10px] text-slate-400">{r.size}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Last generated: {r.lastGen}</div>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <Btn size="xs" variant="secondary" onClick={() => openPreview(r.id)}>
                <Eye className="w-3 h-3" /> Preview
              </Btn>
              <Btn size="xs" variant="ghost"><RefreshCw className="w-3 h-3" /> Regenerate</Btn>
            </div>
          </Card>
        ))}
      </div>
      {showBriefing && <ParliamentaryBriefingModal onClose={() => { setShowBriefing(false); setCurrentReport(null); }} />}
    </div>
  );
}
