import { ReactNode, useState } from 'react';
import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Risk badge
const riskColors: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 border border-red-200',
  High: 'bg-orange-100 text-orange-700 border border-orange-200',
  Medium: 'bg-amber-100 text-amber-700 border border-amber-200',
  Low: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  New: 'bg-blue-100 text-blue-700 border border-blue-200',
  Acknowledged: 'bg-slate-100 text-slate-600 border border-slate-200',
  Assigned: 'bg-purple-100 text-purple-700 border border-purple-200',
  Dismissed: 'bg-slate-100 text-slate-500 border border-slate-200',
  'On Track': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Delayed: 'bg-red-100 text-red-700 border border-red-200',
  Pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  Completed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Connected: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Syncing: 'bg-blue-100 text-blue-700 border border-blue-200',
  'Attention Required': 'bg-red-100 text-red-700 border border-red-200',
};

export function Badge({ label, size = 'sm' }: { label: string; size?: 'xs' | 'sm' }) {
  const cls = riskColors[label] ?? 'bg-slate-100 text-slate-600 border border-slate-200';
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'} ${cls}`}>
      {label}
    </span>
  );
}

// Trend indicator
export function Trend({ value, suffix = '%', invert = false, size }: { value: number; suffix?: string; invert?: boolean; size?: 'xs' }) {
  const positive = invert ? value < 0 : value > 0;
  const negative = invert ? value > 0 : value < 0;
  if (value === 0) return <span className="flex items-center gap-1 text-xs text-slate-500"><Minus className="w-3 h-3" /> 0{suffix}</span>;
  return (
    <span className={`flex items-center gap-0.5 text-xs font-medium ${positive ? 'text-emerald-600' : negative ? 'text-red-500' : 'text-slate-500'}`}>
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {value > 0 ? '+' : ''}{value}{suffix}
    </span>
  );
}

// Sparkline (simple inline bars)
export function Sparkline({ data, color = '#2457a8' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return (
    <div className="flex items-end gap-px h-8">
      {data.map((v, i) => (
        <div
          key={i}
          style={{ height: `${((v - min) / range) * 100}%`, minHeight: 2, backgroundColor: color, opacity: i === data.length - 1 ? 1 : 0.5 }}
          className="w-1.5 rounded-sm flex-shrink-0"
        />
      ))}
    </div>
  );
}

// KPI Card
export function KpiCard({
  icon, title, value, unit, trend, trendLabel, sparkData, color = '#2457a8', tooltip, invert = false
}: {
  icon: ReactNode; title: string; value: string | number; unit?: string; trend?: number;
  trendLabel?: string; sparkData?: number[]; color?: string; tooltip?: string; invert?: boolean;
}) {
  const [tip, setTip] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3 relative group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            <span style={{ color }}>{icon}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium leading-tight">{title}</span>
        </div>
        {tooltip && (
          <div className="relative">
            <button onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)} className="text-slate-300 hover:text-slate-500 transition-colors">
              <Info className="w-3.5 h-3.5" />
            </button>
            {tip && (
              <div className="absolute right-0 top-5 bg-slate-800 text-white text-xs rounded-lg px-3 py-2 w-52 z-50 shadow-lg">
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 leading-none tabular-nums">
          {value}{unit && <span className="text-base font-medium text-slate-500 ml-0.5">{unit}</span>}
        </div>
        {trend !== undefined && (
          <div className="mt-1 flex items-center gap-1.5">
            <Trend value={trend} invert={invert} />
            <span className="text-[10px] text-slate-400">{trendLabel ?? 'vs last month'}</span>
          </div>
        )}
      </div>
      {sparkData && <Sparkline data={sparkData} color={color} />}
    </div>
  );
}

// Section header
export function SectionHeader({ title, action, subtitle }: { title: string; action?: ReactNode; subtitle?: string }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// Card wrapper
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 ${className}`}>
      {children}
    </div>
  );
}

// AI Insight badge
export function AIBadge({ confidence }: { confidence: number }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
        AI-assisted insight
      </span>
      <span className="text-[10px] text-slate-500">Confidence: {confidence}%</span>
      <span className="inline-flex items-center text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
        Human review required
      </span>
    </div>
  );
}

// Distress score pill
export function DistressScore({ score }: { score: number }) {
  const color = score >= 75 ? '#ef4444' : score >= 60 ? '#f97316' : score >= 45 ? '#f59e0b' : '#22c55e';
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold tabular-nums" style={{ color }}>
      {score}
    </span>
  );
}

// Empty state
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
        <Minus className="w-5 h-5" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

// Page header
export function PageHeader({ title, subtitle, actions, meta }: {
  title: string; subtitle?: string; actions?: ReactNode; meta?: string;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        {meta && <p className="text-xs text-slate-400 mt-1 font-mono">{meta}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0 mt-1">{actions}</div>}
    </div>
  );
}

// Button
export function Btn({ children, variant = 'primary', size = 'sm', onClick, className = '' }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'xs';
  onClick?: () => void; className?: string;
}) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-lg transition-colors cursor-pointer border';
  const sizes = { sm: 'px-3 py-1.5 text-xs', xs: 'px-2 py-1 text-[11px]' };
  const variants = {
    primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
    secondary: 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100',
    danger: 'bg-white text-red-600 border-red-200 hover:bg-red-50',
  };
  return <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>{children}</button>;
}
