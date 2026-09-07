import "package:flutter/widgets.dart";
import "package:go_router/go_router.dart";

import "pages/case_pages.dart";
import "pages/dashboard_pages.dart";
import "pages/district_pages.dart";
import "pages/other_pages.dart";
import "shell/app_shell.dart";

final appRouter = GoRouter(
  initialLocation: "/",
  routes: [
    ShellRoute(
      builder: (context, state, child) => AppShell(child: child),
      routes: [
        GoRoute(path: "/", builder: (_, __) => const StateDashboardPage()),
        GoRoute(path: "/national", builder: (_, __) => const NationalDashboardPage()),
        GoRoute(path: "/national/trends", builder: (_, __) => const NationalTrendsPage()),
        GoRoute(path: "/districts", builder: (_, __) => const DistrictListPage()),
        GoRoute(
          path: "/district/:id",
          builder: (_, state) => DistrictDetailPage(districtId: state.pathParameters["id"] ?? "pune"),
        ),
        GoRoute(path: "/cases", builder: (_, __) => const CaseProgressPage()),
        GoRoute(path: "/case-progress", builder: (_, __) => const CaseProgressPage()),
        GoRoute(
          path: "/cases/:id",
          builder: (_, state) => CaseDetailPage(caseId: state.pathParameters["id"] ?? "A-2847"),
        ),
        GoRoute(path: "/alerts", builder: (_, __) => const AlertsPage()),
        GoRoute(path: "/analytics", builder: (_, __) => const AnalyticsPage()),
        GoRoute(path: "/resources", builder: (_, __) => const ResourcesPage()),
        GoRoute(path: "/reports", builder: (_, __) => const ReportsPage()),
        GoRoute(path: "/policy", builder: (_, __) => const PolicyInsightsPage()),
        GoRoute(path: "/act-wise", builder: (_, __) => const ActWisePage()),
        GoRoute(path: "/inter-ministry", builder: (_, __) => const InterMinistryPage()),
        GoRoute(path: "/audit", builder: (_, __) => const AuditLogPage()),
        GoRoute(path: "/settings", builder: (_, __) => const SettingsPage()),
        GoRoute(path: "/budget", builder: (_, __) => const BudgetPage()),
      ],
    ),
  ],
);
