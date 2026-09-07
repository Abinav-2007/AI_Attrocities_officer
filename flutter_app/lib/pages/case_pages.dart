import "package:flutter/material.dart";

import "../data/mock_data.dart";
import "../ui/widgets.dart";

class CaseProgressPage extends StatelessWidget {
  const CaseProgressPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "Case Progress",
      subtitle: "Statewide legal case monitoring — Maharashtra",
      children: [
        KeyValueTable(
          columns: const ["Stage", "Count", "Avg Days", "Delayed"],
          rows: [
            for (final row in casesPipeline)
              [
                Text(row["stage"] as String),
                Text("${row["count"]}"),
                Text("${row["avgDays"]}"),
                Text("${row["delayed"]}"),
              ],
          ],
        ),
        const SizedBox(height: 16),
        BarChartCard(
          title: "Case Progression Trend",
          values: [for (final row in casesPipeline) (row["count"] as num).toDouble()],
          color: const Color(0xFF2457A8),
        ),
      ],
    );
  }
}

class CaseDetailPage extends StatelessWidget {
  const CaseDetailPage({super.key, required this.caseId});

  final String caseId;

  @override
  Widget build(BuildContext context) {
    final item = cases.firstWhere(
      (c) => c["id"] == caseId,
      orElse: () => cases.first,
    );

    return PageScaffold(
      title: "Case Detail • ${item["id"]}",
      subtitle: "Privacy-protected case view — all identifiers masked",
      children: [
        GridView.count(
          crossAxisCount: 4,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          childAspectRatio: 1.8,
          children: [
            MetricCard(label: "District", value: item["district"].toString(), trend: 0),
            MetricCard(label: "Distress", value: item["distress"].toString(), trend: 6.1),
            MetricCard(label: "Days in Stage", value: item["daysInStage"].toString(), trend: 4.5),
            MetricCard(label: "Current Stage", value: item["stage"].toString(), trend: 0),
          ],
        ),
        const SizedBox(height: 16),
        LineChartCard(title: "Distress Score Timeline", values: puneDistressTrend),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text("Recommended Interventions", style: TextStyle(fontWeight: FontWeight.w700)),
                SizedBox(height: 10),
                ListTile(
                  dense: true,
                  contentPadding: EdgeInsets.zero,
                  leading: Icon(Icons.psychology_alt_outlined, color: Color(0xFF2457A8)),
                  title: Text("Increase counselor check-in frequency to 2/week"),
                  subtitle: Text("AI confidence: 91% • Requires officer approval"),
                ),
                ListTile(
                  dense: true,
                  contentPadding: EdgeInsets.zero,
                  leading: Icon(Icons.gavel_outlined, color: Color(0xFFF97316)),
                  title: Text("Escalate legal support due to prolonged trial stage"),
                  subtitle: Text("AI confidence: 88% • Requires officer approval"),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
