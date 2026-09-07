import "package:flutter/material.dart";

ThemeData buildSahyogTheme() {
  const navy = Color(0xFF040D1E);
  const blue = Color(0xFF2457A8);

  final base = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: blue,
      brightness: Brightness.light,
      primary: blue,
      surface: Colors.white,
    ),
    scaffoldBackgroundColor: const Color(0xFFF2F4F7),
  );

  return base.copyWith(
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: Color(0xFF1D2939),
      elevation: 0,
      surfaceTintColor: Colors.transparent,
    ),
    cardTheme: CardThemeData(
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: Color(0xFFE4E7EC)),
      ),
      surfaceTintColor: Colors.transparent,
    ),
    navigationRailTheme: const NavigationRailThemeData(
      backgroundColor: navy,
      selectedIconTheme: IconThemeData(color: Colors.white),
      selectedLabelTextStyle: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
      unselectedIconTheme: IconThemeData(color: Color(0xFF98A2B3)),
      unselectedLabelTextStyle: TextStyle(color: Color(0xFF98A2B3)),
    ),
  );
}
