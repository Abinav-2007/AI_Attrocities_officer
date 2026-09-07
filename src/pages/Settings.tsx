import { useState } from 'react';
import { PageHeader, Card, Btn } from '../components/ui';
import { User, Shield, Globe, Bell, LayoutDashboard, Accessibility, Database, FileText, Lock } from 'lucide-react';

const sections = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'security', icon: Shield, label: 'Security' },
  { id: 'language', icon: Globe, label: 'Language' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Preferences' },
  { id: 'accessibility', icon: Accessibility, label: 'Accessibility' },
  { id: 'data', icon: Database, label: 'Data Access' },
  { id: 'audit', icon: FileText, label: 'Audit Logs' },
];

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(v => !v)}
      className={`w-9 h-5 rounded-full transition-colors flex items-center ${on ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <span className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ml-0.5 ${on ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  );
}

export default function Settings() {
  const [active, setActive] = useState('profile');
  const [lang, setLang] = useState('EN');
  const [fontSize, setFontSize] = useState('medium');

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <PageHeader title="Settings" subtitle="Account, security, accessibility and dashboard preferences" />
      <div className="flex gap-6">
        {/* Sidebar nav */}
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-0.5">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  active === s.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <s.icon className="w-4 h-4 flex-shrink-0" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {active === 'profile' && (
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[['Full Name', 'Rajiv Kumar'], ['Designation', 'State Director, Maharashtra'], ['Ministry', 'MoSJE'], ['Officer ID', 'OFC-MH-2847']].map(([l, v]) => (
                  <div key={l}>
                    <label className="text-xs text-slate-500 mb-1 block">{l}</label>
                    <input defaultValue={v} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </div>
                ))}
              </div>
              <Btn variant="primary" size="sm">Save Changes</Btn>
            </Card>
          )}

          {active === 'security' && (
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Two-Factor Authentication</div>
                    <div className="text-xs text-slate-400">Require OTP for sensitive actions</div>
                  </div>
                  <Toggle defaultOn />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Session Timeout</div>
                    <div className="text-xs text-slate-400">Auto-logout after inactivity</div>
                  </div>
                  <select className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none">
                    {['15 minutes', '30 minutes', '1 hour'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <Btn size="sm" variant="secondary"><Lock className="w-3.5 h-3.5" /> Change Password</Btn>
              </div>
            </Card>
          )}

          {active === 'language' && (
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Language Preference</h3>
              <div className="flex gap-3">
                {['EN', 'HI'].map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-6 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${lang === l ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                  >
                    {l === 'EN' ? '🇬🇧 English' : '🇮🇳 हिंदी'}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {active === 'accessibility' && (
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Accessibility</h3>
              <div className="space-y-4">
                {[
                  ['High Contrast Mode', 'Increases color contrast for all UI elements', false],
                  ['Reduced Motion', 'Minimizes transitions and animations', false],
                ].map(([l, d, def]) => (
                  <div key={l as string} className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div>
                      <div className="text-sm font-medium text-slate-700">{l as string}</div>
                      <div className="text-xs text-slate-400">{d as string}</div>
                    </div>
                    <Toggle defaultOn={def as boolean} />
                  </div>
                ))}
                <div className="py-3">
                  <div className="text-sm font-medium text-slate-700 mb-2">Font Size</div>
                  <div className="flex gap-2">
                    {['small', 'medium', 'large'].map(f => (
                      <button key={f} onClick={() => setFontSize(f)}
                        className={`px-4 py-2 rounded-lg text-xs border transition-colors ${fontSize === f ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 text-slate-600'}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {!['profile', 'security', 'language', 'accessibility'].includes(active) && (
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">{sections.find(s => s.id === active)?.label}</h3>
              <p className="text-sm text-slate-400">Settings for this section are managed by your system administrator.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
