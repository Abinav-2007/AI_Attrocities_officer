import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router';
import {
  LayoutDashboard, MapPin, Users, Bell, BarChart2, Wrench,
  FileText, BookOpen, Settings, HelpCircle, LogOut, ChevronDown,
  Search, Globe, RefreshCw, Activity, Scale, TrendingUp, Building2, X, Menu
} from 'lucide-react';
import { SearchModal } from './SearchModal';
import { NotificationPanel } from './NotificationPanel';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  { icon: MapPin, label: 'Districts / States', to: '/districts' },
  { icon: Users, label: 'Victims & Cases', to: '/cases' },
  { icon: Bell, label: 'Alerts', to: '/alerts' },
  { icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { icon: Wrench, label: 'Resource Allocation', to: '/resources' },
  { icon: Activity, label: 'Case Progress', to: '/case-progress' },
  { icon: FileText, label: 'Reports', to: '/reports' },
  { icon: BookOpen, label: 'Policy Insights', to: '/policy' },
  { icon: Scale, label: 'Act-wise Analysis', to: '/act-wise' },
  { icon: Building2, label: 'Inter-Ministry', to: '/inter-ministry' },
  { icon: TrendingUp, label: 'Audit Trail', to: '/audit' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

const jurisdictions = [
  { label: 'National', sublabel: 'India — National Overview', path: '/national' },
  { label: 'State: Maharashtra', sublabel: 'State Dashboard', path: '/' },
  { label: 'District: Pune', sublabel: 'District Detail', path: '/district/pune' },
];

export function Shell() {
  const navigate = useNavigate();
  const [showJurisdiction, setShowJurisdiction] = useState(false);
  const [currentJurisdiction, setCurrentJurisdiction] = useState(jurisdictions[1]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-full flex bg-[#f2f4f7]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-0 overflow-hidden'} transition-all duration-200 flex-shrink-0 bg-[#040d1e] flex flex-col h-full`}>
        {/* Logo */}
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Sahyog AI</div>
              <div className="text-blue-300 text-[10px] leading-tight font-medium">OFFICER INTERFACE</div>
            </div>
          </div>
          <div className="text-slate-500 text-[10px] mt-2 leading-tight">Ministry of Social Justice & Empowerment</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 text-sm w-full mb-1 transition-colors">
            <HelpCircle className="w-4 h-4" />
            Help & Support
          </button>
          <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">RK</div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">Rajiv Kumar</div>
              <div className="text-slate-500 text-[10px]">State Director</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-slate-600" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0 z-20">
          <button onClick={() => setSidebarOpen(v => !v)} className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors">
            <Menu className="w-4 h-4" />
          </button>

          {/* Jurisdiction switcher */}
          <div className="relative">
            <button
              onClick={() => setShowJurisdiction(v => !v)}
              className="flex items-center gap-2 text-sm bg-slate-100 hover:bg-slate-200 transition-colors rounded-md px-3 py-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="font-medium text-slate-700">{currentJurisdiction.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
            {showJurisdiction && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-52 py-1">
                {jurisdictions.map(j => (
                  <button
                    key={j.label}
                    onClick={() => { setCurrentJurisdiction(j); setShowJurisdiction(false); navigate(j.path); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-slate-800">{j.label}</div>
                    <div className="text-xs text-slate-500">{j.sublabel}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-slate-400 text-xs hidden sm:block">›</div>
          <div className="text-slate-600 text-xs hidden sm:block">{currentJurisdiction.sublabel}</div>

          <div className="flex-1" />

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors rounded-md px-3 py-1.5 text-slate-500 text-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:block text-xs">Search cases, districts…</span>
            <span className="hidden md:block text-[10px] bg-slate-300 text-slate-600 px-1.5 py-0.5 rounded font-mono">Ctrl K</span>
          </button>

          {/* Date range */}
          <button className="hidden lg:flex items-center gap-1.5 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors rounded-md px-3 py-1.5">
            <span className="text-xs">1 Mar 2025 – 31 Mar 2025</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Language */}
          <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 transition-colors px-2 py-1.5">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:block">EN</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(v => !v)}
              className="relative p-1.5 text-slate-500 hover:text-slate-800 transition-colors rounded-md hover:bg-slate-100"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
          </div>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer">RK</div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
