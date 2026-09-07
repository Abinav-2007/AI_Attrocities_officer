import { X, AlertTriangle, Brain, Wrench, FileText, Bell } from 'lucide-react';

const notifs = [
  { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', title: 'Critical Alert — Case A-2847', desc: 'Distress score reached 84 (+22 in 7 days)', time: '2 min ago', unread: true },
  { icon: Brain, color: 'text-blue-500', bg: 'bg-blue-50', title: 'AI Insight: Nagpur', desc: 'Sustained high-risk trend detected over 30 days', time: '14 min ago', unread: true },
  { icon: Wrench, color: 'text-amber-500', bg: 'bg-amber-50', title: 'Resource Shortage — Nashik', desc: 'Counselor gap at 10; AI recommendation pending review', time: '1 hr ago', unread: true },
  { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-50', title: 'Report Generated', desc: 'Maharashtra State Report — March 2025 ready', time: '3 hr ago', unread: false },
  { icon: Bell, color: 'text-slate-500', bg: 'bg-slate-50', title: 'Case A-3102 Updated', desc: 'Investigation stage advanced', time: '6 hr ago', unread: false },
];

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <span className="text-sm font-semibold text-slate-800">Notifications</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifs.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${n.unread ? 'bg-blue-50/30' : ''}`}>
            <div className={`w-7 h-7 rounded-full ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <n.icon className={`w-3.5 h-3.5 ${n.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-slate-800 leading-tight">{n.title}</p>
                {n.unread && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{n.desc}</p>
              <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 text-center">
        <button className="text-xs text-blue-600 hover:underline font-medium">View all notifications</button>
      </div>
    </div>
  );
}
