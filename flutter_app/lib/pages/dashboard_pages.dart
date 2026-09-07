import "package:flutter/material.dart";

import "../data/mock_data.dart";
import "../ui/widgets.dart";

class StateDashboardPage extends StatelessWidget {
  const StateDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final topDistricts = [...districts]..sort((a, b) => (b["distress"] as num).compareTo(a["distress"] as num));
    return PageScaffold(
      title: "State Overview",
      subtitle: "Monitoring distress trends, case progress and resource requirements across Maharashtra",
      children: [
        GridView.count(
          crossAxisCount: 5,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          childAspectRatio: 1.7,
          children: const [
            MetricCard(label: "Total Beneficiaries", value: "12,482", trend: 8.4),
            MetricCard(label: "High Risk", value: "1,284", trend: -5.2),
            MetricCard(label: "Medium Risk", value: "3,761", trend: 2.1),
            MetricCard(label: "Intervention Coverage", value: "78.4%", trend: 6.8),
            MetricCard(label: "Avg. Distress Score", value: "46.8", trend: -3.4),
          ],
        ),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("State Attention Required", style: TextStyle(fontWeight: FontWeight.w700)),
                const SizedBox(height: 12),
                ...topDistricts.take(5).map(
                  (d) => ListTile(
                    dense: true,
                    contentPadding: EdgeInsets.zero,
                    title: Text(d["name"] as String, style: const TextStyle(fontWeight: FontWeight.w600)),
                    subtitle: Text("Distress ${d["distress"]} • Trend ${d["trend"]}"),
                    trailing: StatusChip(label: d["risk"] as String),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        LineChartCard(
          title: "Monthly Distress Trend",
          values: [for (final item in monthlyTrend) (item["distress"] as num).toDouble()],
        ),
      ],
    );
  }
}

class NationalDashboardPage extends StatelessWidget {
  const NationalDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final sortedStates = [...states]..sort((a, b) => (b["distress"] as num).compareTo(a["distress"] as num));
    return PageScaffold(
      title: "National Dashboard",
      subtitle: "All-state distress trends, risk tracking, and intervention coverage",
      children: [
        GridView.count(
          crossAxisCount: 3,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          childAspectRatio: 2.1,
          children: const [
            MetricCard(label: "Total Beneficiaries", value: "1,24,200", trend: 11.2),
            MetricCard(label: "Active Cases", value: "28,412", trend: 7.8),
            MetricCard(label: "Intervention Coverage", value: "71.6%", trend: 8.4),
          ],
        ),
        const SizedBox(height: 16),
        KeyValueTable(
          columns: ["State", "Distress", "Coverage", "Risk"],
          rows: [
            for (final s in sortedStates.take(8))
              [
                Text(s["name"] as String),
                Text("${s["distress"]}"),
                Text("${s["coverage"]}%"),
                StatusChip(label: s["risk"] as String),
              ],
          ],
        ),
        const SizedBox(height: 16),
        LineChartCard(
          title: "Year-over-Year National Distress Trend",
          values: [for (final row in nationalYoYTrend) (row["curr"] as num).toDouble()],
          secondaryValues: [for (final row in nationalYoYTrend) (row["prev"] as num).toDouble()],
        ),
      ],
    );
  }
}

class NationalTrendsPage extends StatelessWidget {
  const NationalTrendsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return PageScaffold(
      title: "National Trends",
      subtitle: "Year-over-year and cross-state comparative analysis",
      children: [
        LineChartCard(
          title: "Year-over-Year Distress Trend",
          values: [for (final row in nationalYoYTrend) (row["curr"] as num).toDouble()],
          secondaryValues: [for (final row in nationalYoYTrend) (row["prev"] as num).toDouble()],
        ),
        const SizedBox(height: 16),
        BarChartCard(
          title: "State Ranking by Average Distress",
          values: [for (final row in states.take(10)) (row["distress"] as num).toDouble()],
          color: const Color(0xFFF97316),
        ),
        const SizedBox(height: 16),
        BarChartCard(
          title: "Intervention Coverage by State",
          values: [for (final row in states.take(10)) (row["coverage"] as num).toDouble()],
          color: const Color(0xFF22C55E),
        ),
      ],
    );
  }
}
