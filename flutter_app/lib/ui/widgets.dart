import "package:fl_chart/fl_chart.dart";
import "package:flutter/material.dart";

Color statusColor(String label) {
  switch (label) {
    case "Critical":
    case "Delayed":
    case "Attention Required":
      return const Color(0xFFEF4444);
    case "High":
      return const Color(0xFFF97316);
    case "Medium":
    case "Pending":
      return const Color(0xFFF59E0B);
    case "Low":
    case "On Track":
    case "Completed":
    case "Connected":
      return const Color(0xFF22C55E);
    case "Assigned":
      return const Color(0xFF7C3AED);
    default:
      return const Color(0xFF2457A8);
  }
}

class PageScaffold extends StatelessWidget {
  const PageScaffold({
    super.key,
    required this.title,
    required this.subtitle,
    required this.children,
  });

  final String title;
  final String subtitle;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(24),
      children: [
        Text(title, style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700)),
        const SizedBox(height: 4),
        Text(subtitle, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: const Color(0xFF667085))),
        const SizedBox(height: 16),
        ...children,
      ],
    );
  }
}

class MetricCard extends StatelessWidget {
  const MetricCard({super.key, required this.label, required this.value, required this.trend});

  final String label;
  final String value;
  final num trend;

  @override
  Widget build(BuildContext context) {
    final positive = trend > 0;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(color: Color(0xFF667085), fontSize: 12)),
            const SizedBox(height: 8),
            Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
            const SizedBox(height: 8),
            Text(
              "${positive ? "+" : ""}$trend% vs previous period",
              style: TextStyle(
                fontSize: 12,
                color: positive ? const Color(0xFF22C55E) : const Color(0xFFEF4444),
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class StatusChip extends StatelessWidget {
  const StatusChip({super.key, required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    final color = statusColor(label);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.35)),
      ),
      child: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: color)),
    );
  }
}

class KeyValueTable extends StatelessWidget {
  const KeyValueTable({super.key, required this.columns, required this.rows});

  final List<String> columns;
  final List<List<Widget>> rows;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          columns: columns.map((c) => DataColumn(label: Text(c, style: const TextStyle(fontWeight: FontWeight.w700)))).toList(),
          rows: rows.map((row) => DataRow(cells: row.map((cell) => DataCell(cell)).toList())).toList(),
        ),
      ),
    );
  }
}

class LineChartCard extends StatelessWidget {
  const LineChartCard({
    super.key,
    required this.title,
    required this.values,
    this.secondaryValues,
    this.primaryColor = const Color(0xFF2457A8),
  });

  final String title;
  final List<double> values;
  final List<double>? secondaryValues;
  final Color primaryColor;

  @override
  Widget build(BuildContext context) {
    final maxX = values.length - 1;
    final maxY = ([...values, ...?secondaryValues]).reduce((a, b) => a > b ? a : b) + 5;
    final minY = ([...values, ...?secondaryValues]).reduce((a, b) => a < b ? a : b) - 5;

    List<FlSpot> toSpots(List<double> source) => [
          for (var i = 0; i < source.length; i++) FlSpot(i.toDouble(), source[i]),
        ];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
            const SizedBox(height: 16),
            SizedBox(
              height: 220,
              child: LineChart(
                LineChartData(
                  minX: 0,
                  maxX: maxX.toDouble(),
                  minY: minY,
                  maxY: maxY,
                  gridData: const FlGridData(show: true, drawVerticalLine: false),
                  titlesData: const FlTitlesData(
                    rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                    topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  ),
                  borderData: FlBorderData(show: false),
                  lineBarsData: [
                    LineChartBarData(
                      spots: toSpots(values),
                      color: primaryColor,
                      barWidth: 3,
                      isCurved: true,
                      dotData: const FlDotData(show: false),
                    ),
                    if (secondaryValues != null)
                      LineChartBarData(
                        spots: toSpots(secondaryValues!),
                        color: const Color(0xFF98A2B3),
                        barWidth: 2,
                        isCurved: true,
                        dotData: const FlDotData(show: false),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class BarChartCard extends StatelessWidget {
  const BarChartCard({super.key, required this.title, required this.values, this.color = const Color(0xFF2457A8)});

  final String title;
  final List<double> values;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final maxY = values.reduce((a, b) => a > b ? a : b) * 1.3;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
            const SizedBox(height: 16),
            SizedBox(
              height: 220,
              child: BarChart(
                BarChartData(
                  maxY: maxY,
                  gridData: const FlGridData(show: true, drawVerticalLine: false),
                  borderData: FlBorderData(show: false),
                  titlesData: const FlTitlesData(
                    rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                    topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  ),
                  barGroups: [
                    for (var i = 0; i < values.length; i++)
                      BarChartGroupData(x: i, barRods: [BarChartRodData(toY: values[i], color: color, width: 14)]),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
