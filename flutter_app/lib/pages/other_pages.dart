import "package:flutter/material.dart";
import "package:go_router/go_router.dart";

import "../data/mock_data.dart";
import "../ui/widgets.dart";

class AlertsPage extends StatelessWidget {
  const AlertsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "Alerts & Attention",
      subtitle: "Distress spikes and cases requiring immediate officer action",
      children: [
        KeyValueTable(
          columns: const ["Case", "District", "Distress", "Priority", "Status", "Time"],
          rows: [
            for (final a in alerts)
              [
                TextButton(onPressed: () => context.go("/cases/${a["id"]}"), child: Text(a["id"] as String)),
                Text(a["district"] as String),
                Text("${a["distress"]}"),
                StatusChip(label: a["priority"] as String),
                StatusChip(label: a["status"] as String),
                Text(a["time"] as String),
              ],
          ],
        ),
      ],
    );
  }
}

class AnalyticsPage extends StatelessWidget {
  const AnalyticsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "State Analytics",
      subtitle: "Comprehensive data analysis for Maharashtra — March 2025",
      children: [
        LineChartCard(title: "Monthly Distress Trend", values: [for (final item in monthlyTrend) (item["distress"] as num).toDouble()]),
        const SizedBox(height: 16),
        BarChartCard(title: "Risk Distribution Breakdown", values: [4821, 3761, 2616, 1284]),
        const SizedBox(height: 16),
        BarChartCard(
          title: "Intervention Success by Top Districts",
          values: [for (final d in districts.take(5)) (d["successRate"] as num).toDouble()],
          color: const Color(0xFF22C55E),
        ),
      ],
    );
  }
}

class ResourcesPage extends StatelessWidget {
  const ResourcesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "Resource Allocation",
      subtitle: "Counselor, legal, and medical support distribution across Maharashtra",
      children: [
        KeyValueTable(
          columns: const ["District", "Required", "Available", "Gap", "Status"],
          rows: [
            for (final row in resourceData)
              [
                Text(row["district"] as String),
                Text("${row["required"]}"),
                Text("${row["available"]}"),
                Text("${row["gap"]}"),
                StatusChip(label: (row["gap"] as int) > 10 ? "Attention Required" : "On Track"),
              ],
          ],
        ),
      ],
    );
  }
}

class ReportsPage extends StatelessWidget {
  const ReportsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final reportCards = const [
      ("Maharashtra State Report", "March 2025", "Generated 2 hours ago"),
      ("District Risk Briefing", "Nagpur Focus", "Generated 6 hours ago"),
      ("National Trend Review", "FY 2024-25", "Generated 1 day ago"),
    ];

    return PageScaffold(
      title: "Reports & Briefings",
      subtitle: "Government report library — generate, preview and download",
      children: [
        Wrap(
          runSpacing: 12,
          spacing: 12,
          children: reportCards
              .map(
                (r) => SizedBox(
                  width: 320,
                  child: Card(
                    child: ListTile(
                      leading: const Icon(Icons.description_outlined, color: Color(0xFF2457A8)),
                      title: Text(r.$1),
                      subtitle: Text("${r.$2}\n${r.$3}"),
                      isThreeLine: true,
                      trailing: const Icon(Icons.download_outlined),
                    ),
                  ),
                ),
              )
              .toList(),
        ),
      ],
    );
  }
}

class PolicyInsightsPage extends StatelessWidget {
  const PolicyInsightsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final recommendations = const [
      "Increase counselor deployment by 20% in critical districts.",
      "Create fast-track legal support cells in Nagpur and Bihar high-risk clusters.",
      "Tie intervention funding to district distress reduction outcomes.",
      "Expand victim assistance helplines in low coverage regions.",
    ];

    return PageScaffold(
      title: "Policy Insights",
      subtitle: "AI-assisted strategic recommendations for national-level policy decision-making",
      children: [
        ...recommendations.map(
          (r) => Card(
            child: ListTile(
              leading: const Icon(Icons.psychology_alt_outlined, color: Color(0xFF2457A8)),
              title: Text(r),
              subtitle: const Text("Human review required • Confidence: 85-93%"),
            ),
          ),
        ),
      ],
    );
  }
}

class ActWisePage extends StatelessWidget {
  const ActWisePage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "Act-wise Analysis",
      subtitle: "Case distribution and outcomes by SC/ST Act and IPC provisions",
      children: [
        KeyValueTable(
          columns: const ["Act / Section", "Cases", "Distress", "High Risk %", "Coverage", "Trend"],
          rows: [
            for (final row in actWiseData)
              [
                Text(row["act"] as String),
                Text("${row["cases"]}"),
                Text("${row["distress"]}"),
                Text("${row["highRiskPct"]}%"),
                Text("${row["coverage"]}%"),
                Text(row["trend"] as String),
              ],
          ],
        ),
      ],
    );
  }
}

class InterMinistryPage extends StatelessWidget {
  const InterMinistryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final systems = const [
      ("Home Affairs", "Connected", "Last sync: 2 min ago"),
      ("Law & Justice", "Connected", "Last sync: 5 min ago"),
      ("Health", "Syncing", "Last sync: 1 min ago"),
      ("Education", "Attention Required", "Last sync: 1 day ago"),
    ];

    return PageScaffold(
      title: "Inter-Ministry Coordination",
      subtitle: "Data synchronization status across government ministries",
      children: [
        KeyValueTable(
          columns: const ["Ministry", "Status", "Sync Info"],
          rows: [
            for (final row in systems)
              [
                Text(row.$1),
                StatusChip(label: row.$2),
                Text(row.$3),
              ],
          ],
        ),
      ],
    );
  }
}

class AuditLogPage extends StatelessWidget {
  const AuditLogPage({super.key});

  @override
  Widget build(BuildContext context) {
    final logs = const [
      ("02:14 PM", "Officer RK", "Acknowledged alert A-2847", "Success"),
      ("01:43 PM", "Officer RK", "Assigned counselor for case A-3102", "Success"),
      ("12:08 PM", "System", "Generated state report", "Success"),
      ("10:56 AM", "Officer AN", "Dismissed duplicate alert A-2901", "Success"),
    ];

    return PageScaffold(
      title: "Audit Trail",
      subtitle: "Complete record of all officer actions — tamper-evident log",
      children: [
        KeyValueTable(
          columns: const ["Time", "Actor", "Action", "Result"],
          rows: [
            for (final row in logs)
              [
                Text(row.$1),
                Text(row.$2),
                Text(row.$3),
                StatusChip(label: row.$4),
              ],
          ],
        ),
      ],
    );
  }
}

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "Settings",
      subtitle: "Account, security, accessibility and dashboard preferences",
      children: [
        Card(
          child: SwitchListTile(
            value: true,
            onChanged: (_) {},
            title: const Text("Enable critical alert push notifications"),
            subtitle: const Text("Immediate notification for distress score spikes and delayed legal actions."),
          ),
        ),
        Card(
          child: SwitchListTile(
            value: true,
            onChanged: (_) {},
            title: const Text("Use high-contrast accessibility mode"),
            subtitle: const Text("Improves readability in dense dashboard tables and charts."),
          ),
        ),
        Card(
          child: ListTile(
            title: const Text("Data privacy mode"),
            subtitle: const Text("Masked identifiers enabled for all case-level views."),
            trailing: StatusChip(label: "Enabled"),
          ),
        ),
      ],
    );
  }
}

class BudgetPage extends StatelessWidget {
  const BudgetPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "Budget & Resource Utilization",
      subtitle: "National allocation and expenditure — FY 2024-25",
      children: [
        KeyValueTable(
          columns: const ["State", "Allocated (₹ Cr)", "Utilized (₹ Cr)", "Utilization", "Beneficiaries"],
          rows: [
            for (final row in statesBudget)
              [
                Text(row["state"] as String),
                Text("${row["allocated"]}"),
                Text("${row["utilized"]}"),
                Text("${((row["utilized"] as num) / (row["allocated"] as num) * 100).toStringAsFixed(1)}%"),
                Text("${row["beneficiaries"]}"),
              ],
          ],
        ),
      ],
    );
  }
}
