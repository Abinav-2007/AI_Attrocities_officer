import "package:flutter/material.dart";

import "router.dart";
import "ui/app_theme.dart";

void main() {
  runApp(const SahyogApp());
}

class SahyogApp extends StatelessWidget {
  const SahyogApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: "Sahyog AI Officer",
      debugShowCheckedModeBanner: false,
      theme: buildSahyogTheme(),
      routerConfig: appRouter,
    );
  }
}
