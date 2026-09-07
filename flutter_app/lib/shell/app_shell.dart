import "package:flutter/material.dart";
import "package:go_router/go_router.dart";

class AppShell extends StatefulWidget {
  const AppShell({super.key, required this.child});

  final Widget child;

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  static const navItems = [
    ("/", "Dashboard", Icons.dashboard_outlined),
    ("/districts", "Districts / States", Icons.map_outlined),
    ("/cases", "Victims & Cases", Icons.groups_outlined),
    ("/alerts", "Alerts", Icons.notifications_none),
    ("/analytics", "Analytics", Icons.bar_chart_outlined),
    ("/resources", "Resource Allocation", Icons.handyman_outlined),
    ("/case-progress", "Case Progress", Icons.track_changes_outlined),
    ("/reports", "Reports", Icons.description_outlined),
    ("/policy", "Policy Insights", Icons.menu_book_outlined),
    ("/act-wise", "Act-wise Analysis", Icons.balance_outlined),
    ("/inter-ministry", "Inter-Ministry", Icons.apartment_outlined),
    ("/audit", "Audit Trail", Icons.show_chart_outlined),
    ("/settings", "Settings", Icons.settings_outlined),
    ("/budget", "Budget", Icons.account_balance_wallet_outlined),
  ];

  int selectedIndex(String path) {
    final idx = navItems.indexWhere((item) => item.$1 == path);
    return idx >= 0 ? idx : 0;
  }

  @override
  Widget build(BuildContext context) {
    final path = GoRouterState.of(context).uri.path;
    final idx = selectedIndex(path);

    return Scaffold(
      appBar: AppBar(
        titleSpacing: 12,
        title: Row(
          children: [
            const CircleAvatar(radius: 14, backgroundColor: Color(0xFF2457A8), child: Icon(Icons.psychology_alt, size: 16, color: Colors.white)),
            const SizedBox(width: 8),
            const Text("Sahyog AI", style: TextStyle(fontWeight: FontWeight.w700)),
            const SizedBox(width: 12),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(color: const Color(0xFFF2F4F7), borderRadius: BorderRadius.circular(6)),
              child: const Text("State: Maharashtra", style: TextStyle(fontSize: 12, color: Color(0xFF475467))),
            ),
          ],
        ),
        actions: const [
          Icon(Icons.search),
          SizedBox(width: 12),
          Icon(Icons.notifications_none),
          SizedBox(width: 16),
          CircleAvatar(radius: 14, backgroundColor: Color(0xFF2457A8), child: Text("RK", style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700))),
          SizedBox(width: 12),
        ],
      ),
      body: Row(
        children: [
          Container(
            width: 260,
            color: const Color(0xFF040D1E),
            child: Column(
              children: [
                const SizedBox(height: 20),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text(
                    "Ministry of Social Justice & Empowerment",
                    style: TextStyle(color: Color(0xFF667085), fontSize: 11),
                  ),
                ),
                const SizedBox(height: 16),
                Expanded(
                  child: ListView.builder(
                    itemCount: navItems.length,
                    itemBuilder: (context, i) {
                      final item = navItems[i];
                      final active = idx == i;
                      return ListTile(
                        leading: Icon(item.$3, color: active ? Colors.white : const Color(0xFF98A2B3), size: 20),
                        title: Text(
                          item.$2,
                          style: TextStyle(color: active ? Colors.white : const Color(0xFF98A2B3), fontSize: 13, fontWeight: active ? FontWeight.w600 : FontWeight.w500),
                        ),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        tileColor: active ? const Color(0xFF2457A8) : Colors.transparent,
                        onTap: () => context.go(item.$1),
                      );
                    },
                  ),
                ),
                const Divider(height: 1, color: Color(0xFF1D2939)),
                const ListTile(
                  leading: Icon(Icons.help_outline, color: Color(0xFF98A2B3)),
                  title: Text("Help & Support", style: TextStyle(color: Color(0xFF98A2B3), fontSize: 13)),
                ),
                const SizedBox(height: 12),
              ],
            ),
          ),
          Expanded(child: widget.child),
        ],
      ),
    );
  }
}
