import "package:flutter/material.dart";
import "package:go_router/go_router.dart";

import "../data/mock_data.dart";
import "../ui/widgets.dart";

class DistrictListPage extends StatelessWidget {
  const DistrictListPage({super.key});

  @override
  Widget build(BuildContext context) {
    final sorted = [...districts]..sort((a, b) => (b["distress"] as num).compareTo(a["distress"] as num));
    return PageScaffold(
      title: "District Performance",
      subtitle: "Sortable comparison of all districts in Maharashtra",
      children: [
        KeyValueTable(
          columns: const ["District", "Risk", "Distress", "Beneficiaries", "Coverage", "Active Cases"],
          rows: [
            for (final d in sorted)
              [
                TextButton(onPressed: () => context.go("/district/${d["id"]}"), child: Text(d["name"] as String)),
                StatusChip(label: d["risk"] as String),
                Text("${d["distress"]}"),
                Text((d["beneficiaries"] as int).toString()),
                Text("${d["coverage"]}%"),
                Text((d["activeCases"] as int).toString()),
              ],
          ],
        ),
      ],
    );
  }
}

class DistrictDetailPage extends StatelessWidget {
  const DistrictDetailPage({super.key, required this.districtId});

  final String districtId;

  @override
  Widget build(BuildContext context) {
    final district = districts.firstWhere(
      (d) => d["id"] == districtId,
      orElse: () => districts.first,
    );
    return PageScaffold(
      title: "District Detail • ${(district["name"] as String)}",
      subtitle: "State of Maharashtra",
      children: [
        GridView.count(
          crossAxisCount: 5,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          childAspectRatio: 1.7,
          children: [
            MetricCard(label: "Total Beneficiaries", value: "${district["beneficiaries"]}", trend: 4.2),
            MetricCard(label: "High-Risk Cases", value: "${district["highRisk"]}", trend: -8.1),
            MetricCard(label: "Avg. Distress", value: "${district["distress"]}", trend: -2.4),
            MetricCard(label: "Intervention Coverage", value: "${district["coverage"]}%", trend: 3.1),
            MetricCard(label: "Success Rate", value: "${district["successRate"]}%", trend: 1.8),
          ],
        ),
        const SizedBox(height: 16),
        LineChartCard(title: "Distress Trend", values: puneDistressTrend),
        const SizedBox(height: 16),
        KeyValueTable(
          columns: const ["Case ID", "District", "Type", "Stage", "Status", "Distress"],
          rows: [
            for (final c in cases.where((c) => (c["district"] as String).toLowerCase() == district["name"].toString().toLowerCase()).take(5))
              [
                TextButton(onPressed: () => context.go("/cases/${c["id"]}"), child: Text(c["id"] as String)),
                Text(c["district"] as String),
                Text(c["type"] as String),
                Text(c["stage"] as String),
                StatusChip(label: c["status"] as String),
                Text("${c["distress"]}"),
              ],
          ],
        ),
      ],
    );
  }
}
