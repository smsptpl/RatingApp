import { usePathname, useRouter } from "expo-router";
import { Buildings, Coins, Drop, Flask, House } from "phosphor-react-native";
import type { IconProps } from "phosphor-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { SIDEBAR_WIDTH } from "@/src/responsive";
import { fonts, makeStyles, radius, spacing, useTheme } from "@/src/theme";

type NavRoute = "/" | "/kht" | "/copper" | "/dka";

type NavItem = {
  label: string;
  route: NavRoute;
  icon: React.ComponentType<IconProps>;
  match: (path: string) => boolean;
};

const ITEMS: NavItem[] = [
  { label: "Beranda", route: "/", icon: House, match: (p) => p === "/" || p === "" },
  { label: "K-HTT Analyst", route: "/kht", icon: Flask, match: (p) => p.startsWith("/kht") },
  { label: "Copper Strip ASTM D130", route: "/copper", icon: Coins, match: (p) => p.startsWith("/copper") },
  { label: "Rating DKA", route: "/dka", icon: Drop, match: (p) => p.startsWith("/dka") },
];

export function Sidebar() {
  const styles = useStyles();
  const { colors } = useTheme();
  const router = useRouter();
  const pathname = usePathname() || "/";

  return (
    <View style={styles.sidebar}>
      <Pressable testID="sidebar-brand" style={styles.brand} onPress={() => router.push("/")}>
        <View style={styles.logo}>
          <Buildings size={22} color={colors.onBrand} weight="fill" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.brandName}>Elastech</Text>
          <Text style={styles.brandName2}>Production</Text>
        </View>
      </Pressable>

      <Text style={styles.section}>NAVIGASI</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {ITEMS.map((it) => {
          const active = it.match(pathname);
          const Icon = it.icon;
          return (
            <Pressable
              key={it.route}
              testID={`sidebar-item-${it.route}`}
              onPress={() => router.push(it.route)}
              style={({ pressed }: { pressed: boolean }) => [
                styles.item,
                active && styles.itemActive,
                pressed && { opacity: 0.85 },
              ]}
            >
              {active && <View style={styles.activeBar} />}
              <Icon size={20} color={active ? colors.brandPrimary : colors.onSurfaceTertiary} weight={active ? "fill" : "regular"} />
              <Text style={[styles.itemText, active && styles.itemTextActive]} numberOfLines={2}>
                {it.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.footer}>© 2026 Elastech Production</Text>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  sidebar: {
    width: SIDEBAR_WIDTH,
    height: "100%",
    backgroundColor: c.surfaceSecondary,
    borderRightWidth: 1,
    borderRightColor: c.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.sm, paddingBottom: spacing.lg },
  logo: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: c.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: { fontFamily: fonts.display, fontSize: 20, color: c.onSurface, letterSpacing: 0.5, lineHeight: 22 },
  brandName2: { fontFamily: fonts.mono, fontSize: 11, color: c.brandPrimary, letterSpacing: 2, marginTop: 1 },
  section: { fontFamily: fonts.mono, fontSize: 10, color: c.muted, letterSpacing: 1.5, paddingHorizontal: spacing.sm, marginBottom: spacing.sm },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  itemActive: { backgroundColor: c.brandTertiary },
  activeBar: { position: "absolute", left: 0, top: 8, bottom: 8, width: 3, borderRadius: 2, backgroundColor: c.brandPrimary },
  itemText: { flex: 1, fontFamily: fonts.monoMedium, fontSize: 12.5, color: c.onSurfaceTertiary, lineHeight: 17 },
  itemTextActive: { color: c.onSurface },
  footer: { fontFamily: fonts.mono, fontSize: 9, color: c.muted, textAlign: "center", marginTop: spacing.md },
}));
