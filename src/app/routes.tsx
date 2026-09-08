import { createBrowserRouter } from 'react-router';
import { Shell } from '../components/Shell';
import StateDashboard from '../pages/StateDashboard';
import NationalDashboard from '../pages/NationalDashboard';
import DistrictDetail from '../pages/DistrictDetail';
import CaseDetail from '../pages/CaseDetail';
import Alerts from '../pages/Alerts';
import Analytics from '../pages/Analytics';
import Resources from '../pages/Resources';
import CaseProgress from '../pages/CaseProgress';
import Reports from '../pages/Reports';
import ActWise from '../pages/ActWise';
import AuditLog from '../pages/AuditLog';
import Settings from '../pages/Settings';
import NationalTrends from '../pages/NationalTrends';
import Budget from '../pages/Budget';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Shell,
    children: [
      { index: true, Component: StateDashboard },
      { path: 'national', Component: NationalDashboard },
      { path: 'national/trends', Component: NationalTrends },
      { path: 'district/:id', Component: DistrictDetail },
      { path: 'cases', Component: CaseProgress },
      { path: 'cases/:id', Component: CaseDetail },
      { path: 'alerts', Component: Alerts },
      { path: 'analytics', Component: Analytics },
      { path: 'resources', Component: Resources },
      { path: 'case-progress', Component: CaseProgress },
      { path: 'reports', Component: Reports },
      { path: 'act-wise', Component: ActWise },
      { path: 'audit', Component: AuditLog },
      { path: 'settings', Component: Settings },
      { path: 'budget', Component: Budget },
    ],
  },
]);
