export const districts = [
  { id: 'pune', name: 'Pune', risk: 'High', distress: 62, beneficiaries: 1842, highRisk: 184, coverage: 81, trend: -2.1, successRate: 74, activeCases: 312 },
  { id: 'nagpur', name: 'Nagpur', risk: 'Critical', distress: 78, beneficiaries: 1521, highRisk: 312, coverage: 61, trend: +8.4, successRate: 58, activeCases: 287 },
  { id: 'nashik', name: 'Nashik', risk: 'High', distress: 67, beneficiaries: 1203, highRisk: 198, coverage: 69, trend: +4.2, successRate: 67, activeCases: 198 },
  { id: 'aurangabad', name: 'Aurangabad', risk: 'Medium', distress: 51, beneficiaries: 987, highRisk: 112, coverage: 77, trend: -1.3, successRate: 79, activeCases: 143 },
  { id: 'thane', name: 'Thane', risk: 'Medium', distress: 49, beneficiaries: 1102, highRisk: 98, coverage: 82, trend: -3.1, successRate: 82, activeCases: 167 },
  { id: 'solapur', name: 'Solapur', risk: 'Low', distress: 38, beneficiaries: 743, highRisk: 64, coverage: 88, trend: -5.2, successRate: 87, activeCases: 89 },
  { id: 'kolhapur', name: 'Kolhapur', risk: 'Low', distress: 34, beneficiaries: 621, highRisk: 48, coverage: 91, trend: -6.1, successRate: 89, activeCases: 72 },
  { id: 'amravati', name: 'Amravati', risk: 'Medium', distress: 54, beneficiaries: 812, highRisk: 134, coverage: 71, trend: +2.8, successRate: 71, activeCases: 124 },
  { id: 'jalgaon', name: 'Jalgaon', risk: 'Medium', distress: 48, beneficiaries: 678, highRisk: 87, coverage: 76, trend: -0.8, successRate: 76, activeCases: 98 },
  { id: 'nanded', name: 'Nanded', risk: 'High', distress: 63, beneficiaries: 534, highRisk: 91, coverage: 65, trend: +5.4, successRate: 63, activeCases: 112 },
];

export const states = [
  { id: 'maharashtra', name: 'Maharashtra', risk: 'High', distress: 62, beneficiaries: 12482, highRiskPct: 10.3, coverage: 78, trend: -2.1 },
  { id: 'uttarpradesh', name: 'Uttar Pradesh', risk: 'Critical', distress: 74, beneficiaries: 18421, highRiskPct: 16.2, coverage: 61, trend: +5.2 },
  { id: 'rajasthan', name: 'Rajasthan', risk: 'High', distress: 65, beneficiaries: 9812, highRiskPct: 12.8, coverage: 68, trend: +1.4 },
  { id: 'madhyapradesh', name: 'Madhya Pradesh', risk: 'High', distress: 68, beneficiaries: 11043, highRiskPct: 14.1, coverage: 64, trend: +3.7 },
  { id: 'bihar', name: 'Bihar', risk: 'Critical', distress: 76, beneficiaries: 14821, highRiskPct: 18.4, coverage: 54, trend: +7.1 },
  { id: 'gujarat', name: 'Gujarat', risk: 'Medium', distress: 51, beneficiaries: 7234, highRiskPct: 8.2, coverage: 81, trend: -1.8 },
  { id: 'punjab', name: 'Punjab', risk: 'Low', distress: 41, beneficiaries: 4821, highRiskPct: 5.1, coverage: 88, trend: -4.2 },
  { id: 'haryana', name: 'Haryana', risk: 'Medium', distress: 54, beneficiaries: 6342, highRiskPct: 9.3, coverage: 76, trend: -0.6 },
  { id: 'odisha', name: 'Odisha', risk: 'High', distress: 64, beneficiaries: 8712, highRiskPct: 13.6, coverage: 66, trend: +2.9 },
  { id: 'jharkhand', name: 'Jharkhand', risk: 'Critical', distress: 71, beneficiaries: 7891, highRiskPct: 15.8, coverage: 58, trend: +6.3 },
  { id: 'tamilnadu', name: 'Tamil Nadu', risk: 'Low', distress: 39, beneficiaries: 5234, highRiskPct: 4.8, coverage: 91, trend: -5.1 },
  { id: 'karnataka', name: 'Karnataka', risk: 'Medium', distress: 48, beneficiaries: 6891, highRiskPct: 7.4, coverage: 83, trend: -2.3 },
];

export const monthlyTrend = [
  { month: 'Apr', distress: 52, highRisk: 1480, interventions: 820 },
  { month: 'May', distress: 54, highRisk: 1521, interventions: 890 },
  { month: 'Jun', distress: 51, highRisk: 1398, interventions: 940 },
  { month: 'Jul', distress: 53, highRisk: 1456, interventions: 980 },
  { month: 'Aug', distress: 50, highRisk: 1389, interventions: 1020 },
  { month: 'Sep', distress: 48, highRisk: 1312, interventions: 1080 },
  { month: 'Oct', distress: 49, highRisk: 1342, interventions: 1120 },
  { month: 'Nov', distress: 47, highRisk: 1298, interventions: 1180 },
  { month: 'Dec', distress: 48, highRisk: 1321, interventions: 1210 },
  { month: 'Jan', distress: 47, highRisk: 1289, interventions: 1240 },
  { month: 'Feb', distress: 46, highRisk: 1274, interventions: 1290 },
  { month: 'Mar', distress: 46.8, highRisk: 1284, interventions: 1340 },
];

export const caseTypeData = [
  { name: 'Physical Assault', value: 38, color: '#2457a8' },
  { name: 'Threat / Intimidation', value: 24, color: '#f59e0b' },
  { name: 'Arson', value: 12, color: '#ef4444' },
  { name: 'Rape', value: 14, color: '#7c3aed' },
  { name: 'Murder Attempt', value: 7, color: '#dc2626' },
  { name: 'Other', value: 5, color: '#6b7280' },
];

export const riskDistribution = [
  { name: 'Low', value: 4821, color: '#22c55e' },
  { name: 'Medium', value: 3761, color: '#f59e0b' },
  { name: 'High', value: 2616, color: '#f97316' },
  { name: 'Critical', value: 1284, color: '#ef4444' },
];

export const interventionOutcomes = [
  { district: 'Pune', before: 68, after: 42 },
  { district: 'Nagpur', before: 82, after: 61 },
  { district: 'Nashik', before: 71, after: 48 },
  { district: 'Aurangabad', before: 58, after: 39 },
  { district: 'Thane', before: 54, after: 36 },
];

export const districtTrendComparison = [
  { month: 'Oct', Pune: 68, Nagpur: 82, Nashik: 71, Aurangabad: 58, Thane: 54 },
  { month: 'Nov', Pune: 65, Nagpur: 80, Nashik: 69, Aurangabad: 56, Thane: 52 },
  { month: 'Dec', Pune: 64, Nagpur: 79, Nashik: 68, Aurangabad: 54, Thane: 51 },
  { month: 'Jan', Pune: 63, Nagpur: 78, Nashik: 67, Aurangabad: 52, Thane: 50 },
  { month: 'Feb', Pune: 63, Nagpur: 78, Nashik: 67, Aurangabad: 51, Thane: 49 },
  { month: 'Mar', Pune: 62, Nagpur: 78, Nashik: 67, Aurangabad: 51, Thane: 49 },
];

export const casesPipeline = [
  { stage: 'FIR Filed', count: 2841, avg_days: 1, delayed: 0 },
  { stage: 'Investigation', count: 1923, avg_days: 48, delayed: 312 },
  { stage: 'Chargesheet', count: 1421, avg_days: 92, delayed: 198 },
  { stage: 'Trial', count: 987, avg_days: 210, delayed: 421 },
  { stage: 'Judgment', count: 412, avg_days: 312, delayed: 87 },
  { stage: 'Conviction', count: 289, avg_days: 0, delayed: 0 },
];

export const cases = [
  { id: 'A-2847', district: 'Nagpur', type: 'Physical Assault', stage: 'Trial', daysInStage: 184, status: 'Delayed', lastUpdate: '2 hours ago', distress: 84 },
  { id: 'A-3102', district: 'Pune', type: 'Threat / Intimidation', stage: 'Investigation', daysInStage: 67, status: 'On Track', lastUpdate: '4 hours ago', distress: 71 },
  { id: 'A-2691', district: 'Nashik', type: 'Arson', stage: 'Chargesheet', daysInStage: 112, status: 'Delayed', lastUpdate: '1 day ago', distress: 58 },
  { id: 'A-3284', district: 'Aurangabad', type: 'Physical Assault', stage: 'Trial', daysInStage: 98, status: 'On Track', lastUpdate: '6 hours ago', distress: 45 },
  { id: 'A-2934', district: 'Thane', type: 'Threat / Intimidation', stage: 'Investigation', daysInStage: 34, status: 'On Track', lastUpdate: '3 hours ago', distress: 39 },
  { id: 'A-3341', district: 'Nagpur', type: 'Physical Assault', stage: 'FIR Filed', daysInStage: 2, status: 'Pending', lastUpdate: '1 hour ago', distress: 67 },
  { id: 'A-2788', district: 'Kolhapur', type: 'Rape', stage: 'Judgment', daysInStage: 28, status: 'On Track', lastUpdate: '2 days ago', distress: 82 },
  { id: 'A-3019', district: 'Solapur', type: 'Arson', stage: 'Conviction', daysInStage: 0, status: 'Completed', lastUpdate: '1 week ago', distress: 31 },
];

export const alerts = [
  { id: 'A-2847', district: 'Nagpur', distress: 84, reason: 'Score increased by 22 points in 7 days', time: '2 hours ago', priority: 'Critical', status: 'New' },
  { id: 'A-3102', district: 'Pune', distress: 71, reason: 'Reported recent threat, reduced check-in frequency', time: '4 hours ago', priority: 'High', status: 'New' },
  { id: 'A-2901', district: 'Nashik', distress: 68, reason: 'Missed 3 consecutive check-ins', time: '6 hours ago', priority: 'High', status: 'Acknowledged' },
  { id: 'A-3284', district: 'Aurangabad', distress: 61, reason: 'Sustained increase over 14 days', time: '12 hours ago', priority: 'High', status: 'Assigned' },
  { id: 'A-2934', district: 'Thane', distress: 58, reason: 'Counselor unavailable for 8 days', time: '1 day ago', priority: 'Medium', status: 'New' },
  { id: 'A-3411', district: 'Amravati', distress: 55, reason: 'Trial delay exceeds 180 days', time: '1 day ago', priority: 'Medium', status: 'Acknowledged' },
  { id: 'A-2788', district: 'Kolhapur', distress: 52, reason: 'Resource gap: no legal support available', time: '2 days ago', priority: 'Medium', status: 'New' },
];

export const statesBudget = [
  { state: 'Uttar Pradesh', allocated: 48, utilized: 41, beneficiaries: 18421 },
  { state: 'Maharashtra', allocated: 32, utilized: 27, beneficiaries: 12482 },
  { state: 'Madhya Pradesh', allocated: 28, utilized: 19, beneficiaries: 11043 },
  { state: 'Bihar', allocated: 38, utilized: 24, beneficiaries: 14821 },
  { state: 'Rajasthan', allocated: 24, utilized: 21, beneficiaries: 9812 },
  { state: 'Odisha', allocated: 22, utilized: 18, beneficiaries: 8712 },
  { state: 'Jharkhand', allocated: 20, utilized: 14, beneficiaries: 7891 },
  { state: 'Gujarat', allocated: 18, utilized: 17, beneficiaries: 7234 },
  { state: 'Karnataka', allocated: 16, utilized: 15, beneficiaries: 6891 },
  { state: 'Haryana', allocated: 14, utilized: 10, beneficiaries: 6342 },
];

export const resourceData = [
  { district: 'Nagpur', required: 54, available: 31, gap: 23 },
  { district: 'Pune', required: 42, available: 31, gap: 11 },
  { district: 'Nashik', required: 38, available: 28, gap: 10 },
  { district: 'Aurangabad', required: 31, available: 26, gap: 5 },
  { district: 'Thane', required: 36, available: 32, gap: 4 },
  { district: 'Amravati', required: 28, available: 21, gap: 7 },
  { district: 'Solapur', required: 22, available: 20, gap: 2 },
  { district: 'Kolhapur', required: 19, available: 18, gap: 1 },
];

export const actWiseData = [
  { act: 'SC/ST Act Sec 3(1)(r)', cases: 412, distress: 68, highRiskPct: 18.2, coverage: 71, trend: '+4.1%' },
  { act: 'SC/ST Act Sec 3(1)(s)', cases: 298, distress: 72, highRiskPct: 21.4, coverage: 65, trend: '+6.2%' },
  { act: 'SC/ST Act Sec 3(2)(va)', cases: 187, distress: 81, highRiskPct: 28.9, coverage: 58, trend: '+8.4%' },
  { act: 'SC/ST Act Sec 3(1)(w)', cases: 156, distress: 64, highRiskPct: 14.1, coverage: 74, trend: '-1.2%' },
  { act: 'IPC Sec 302', cases: 89, distress: 76, highRiskPct: 24.7, coverage: 62, trend: '+2.8%' },
  { act: 'IPC Sec 376', cases: 124, distress: 84, highRiskPct: 31.5, coverage: 54, trend: '+5.6%' },
  { act: 'IPC Sec 436 (Arson)', cases: 78, distress: 69, highRiskPct: 17.9, coverage: 68, trend: '-0.8%' },
];

export const nationalYoYTrend = [
  { month: 'Apr 24', prev: 58, curr: 54 },
  { month: 'Jun 24', prev: 61, curr: 56 },
  { month: 'Aug 24', prev: 59, curr: 53 },
  { month: 'Oct 24', prev: 57, curr: 51 },
  { month: 'Dec 24', prev: 56, curr: 50 },
  { month: 'Feb 25', prev: 55, curr: 49 },
  { month: 'Mar 25', prev: 54, curr: 48 },
];

export const puncheDistressTrend = [
  { day: 'Mar 1', score: 61 },
  { day: 'Mar 5', score: 64 },
  { day: 'Mar 8', score: 67 },
  { day: 'Mar 11', score: 72 },
  { day: 'Mar 14', score: 76 },
  { day: 'Mar 17', score: 80 },
  { day: 'Mar 20', score: 82 },
  { day: 'Mar 23', score: 84 },
];
