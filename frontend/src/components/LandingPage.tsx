import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Buildings, Cloud, Coins, Cpu, DeviceMobile, Drop, Flask, Globe } from "phosphor-react-native";
import type { IconProps } from "phosphor-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCopperDashboard, useDashboard, useDkaDashboard } from "@/src/api";
import { fonts, makeStyles, radius, spacing, useTheme } from "@/src/theme";

type ModuleRoute = "/kht" | "/copper" | "/dka";

const SERVICES: { icon: React.ComponentType<IconProps>; title: string; desc: string; color: string }[] = [
  { icon: Cloud, title: "SaaS", desc: "Platform langganan cloud multi-tenant yang skalabel & aman.", color: "#00D2D3" },
  { icon: Cpu, title: "IoT", desc: "Integrasi perangkat & sensor real-time end-to-end.", color: "#F59E0B" },
  { icon: Globe, title: "Web App", desc: "Aplikasi web modern, cepat, dan fully responsive.", color: "#3B82F6" },
  { icon: DeviceMobile, title: "Mobile App", desc: "Aplikasi mobile iOS & Android cross-platform.", color: "#8B5CF6" },
];

export function LandingPage({ onBack }: { onBack?: () => void }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const kht = useDashboard();
  const copper = useCopperDashboard();
  const dka = useDkaDashboard();

  const modules: { icon: React.ComponentType<IconProps>; title: string; sub: string; route: ModuleRoute; color: string; stat: string }[] = [
    { icon: Flask, title: "K-HTT Analyst", sub: "Komatsu Hot Tube Tester", route: "/kht", color: "#00D2D3", stat: `${kht.data?.total ?? 0} sampel · ${kht.data?.passed ?? 0} clear` },
    { icon: Coins, title: "Copper Strip ASTM D130", sub: "Copper Strip Corrosion", route: "/copper", color: "#F59E0B", stat: `${copper.data?.total ?? 0} sampel · ${copper.data?.passed ?? 0} clear` },
    { icon: Drop, title: "Rating DKA", sub: "Batch 4 sampel + OCR", route: "/dka", color: "#3B82F6", stat: `${dka.data?.total_batches ?? 0} batch · ${dka.data?.total_samples ?? 0} sampel` },
  ];

  return (
    <View style={styles.screen}>
      {onBack ? (
        <View style={[styles.mobileHeader, { paddingTop: insets.top + spacing.md }]}>
          <Pressable testID="portofolio-back" onPress={onBack} style={styles.backBtn} hitSlop={12}>
            <ArrowLeft size={22} color={colors.onSurface} weight="bold" />
          </Pressable>
          <Text style={styles.mobileHeaderTitle}>Portofolio</Text>
          <View style={{ width: 40 }} />
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: onBack ? spacing.lg : insets.top + spacing.xxl, paddingBottom: insets.bottom + spacing.xxxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {/* Brand */}
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Buildings size={26} color={colors.onBrand} weight="fill" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.brand}>Elastech Production</Text>
              <Text style={styles.brandSub}>Digital Solutions Studio</Text>
            </View>
          </View>

          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>SOLUSI DIGITAL TERDEPAN</Text>
            <Text style={styles.heroTitle}>Wujudkan Produk Digital Kelas Dunia</Text>
            <Text style={styles.heroDesc}>
              Elastech Production membangun solusi SaaS, IoT, Web App, dan Mobile App yang andal, aman, dan
              berskala untuk mempercepat transformasi digital bisnis Anda.
            </Text>
            <View style={styles.chips}>
              {["SaaS", "IoT", "Web App", "Mobile App"].map((c) => (
                <View key={c} style={styles.chip}>
                  <Text style={styles.chipText}>{c}</Text>
                </View>
              ))}
            </View>
            <Pressable testID="hero-cta" style={styles.cta} onPress={() => router.push("/kht")}>
              <Text style={styles.ctaText}>MULAI ANALISA</Text>
              <ArrowRight size={16} color={colors.onBrandPrimary} weight="bold" />
            </Pressable>
          </View>

          {/* Services */}
          <Text style={styles.sectionTitle}>LAYANAN KAMI</Text>
          <View style={styles.grid}>
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <View key={s.title} style={styles.serviceCard}>
                  <View style={[styles.serviceIcon, { backgroundColor: s.color + "22", borderColor: s.color }]}>
                    <Icon size={24} color={s.color} weight="fill" />
                  </View>
                  <Text style={styles.serviceTitle}>{s.title}</Text>
                  <Text style={styles.serviceDesc}>{s.desc}</Text>
                </View>
              );
            })}
          </View>

          {/* Modules */}
          <Text style={styles.sectionTitle}>MODUL ANALISA AI VISION</Text>
          <View style={styles.grid}>
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Pressable
                  key={m.route}
                  testID={`landing-module-${m.route}`}
                  onPress={() => router.push(m.route)}
                  style={({ pressed }: { pressed: boolean }) => [
                    styles.moduleCard,
                    { borderColor: m.color },
                    pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                  ]}
                >
                  <View style={styles.moduleTop}>
                    <View style={[styles.moduleIcon, { backgroundColor: m.color + "22" }]}>
                      <Icon size={24} color={m.color} weight="fill" />
                    </View>
                    <View style={[styles.openBtn, { backgroundColor: m.color }]}>
                      <ArrowRight size={15} color={colors.surface} weight="bold" />
                    </View>
                  </View>
                  <Text style={[styles.moduleTitle, { color: m.color }]} numberOfLines={2}>
                    {m.title}
                  </Text>
                  <Text style={styles.moduleSub} numberOfLines={1}>
                    {m.sub}
                  </Text>
                  <Text style={styles.moduleStat} numberOfLines={1}>
                    {m.stat}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.footer}>© 2026 Elastech Production · AI Vision powered by Gemini</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  screen: { flex: 1, backgroundColor: c.surface },
  mobileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  backBtn: { width: 40, height: 40, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: c.surfaceSecondary },
  mobileHeaderTitle: { flex: 1, textAlign: "center", fontFamily: fonts.display, fontSize: 20, color: c.onSurface, letterSpacing: 0.5 },
  content: { padding: spacing.lg },
  inner: { width: "100%", maxWidth: 1040, alignSelf: "center", gap: spacing.lg },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  logoMark: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: c.brandPrimary, alignItems: "center", justifyContent: "center" },
  brand: { fontFamily: fonts.display, fontSize: 26, color: c.onSurface, letterSpacing: 0.5 },
  brandSub: { fontFamily: fonts.mono, fontSize: 11, color: c.brandPrimary, letterSpacing: 2, marginTop: 1 },

  hero: {
    backgroundColor: c.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: c.border,
    padding: spacing.xl,
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  eyebrow: { fontFamily: fonts.mono, fontSize: 11, color: c.brandPrimary, letterSpacing: 2.5 },
  heroTitle: { fontFamily: fonts.display, fontSize: 34, color: c.onSurface, letterSpacing: 0.5, lineHeight: 38 },
  heroDesc: { fontFamily: fonts.mono, fontSize: 12.5, color: c.onSurfaceSecondary, lineHeight: 20, maxWidth: 640 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.xs },
  chip: { backgroundColor: c.brandTertiary, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6, borderWidth: 1, borderColor: c.brandPrimary },
  chipText: { fontFamily: fonts.monoBold, fontSize: 11, color: c.brandPrimary, letterSpacing: 0.5 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    backgroundColor: c.brandPrimary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.sm,
  },
  ctaText: { fontFamily: fonts.monoBold, fontSize: 12, color: c.onBrandPrimary, letterSpacing: 1 },

  sectionTitle: { fontFamily: fonts.mono, fontSize: 11, color: c.muted, letterSpacing: 2, marginTop: spacing.lg },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },

  serviceCard: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 180,
    backgroundColor: c.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: c.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  serviceIcon: { width: 46, height: 46, borderRadius: radius.md, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  serviceTitle: { fontFamily: fonts.display, fontSize: 20, color: c.onSurface, letterSpacing: 0.5 },
  serviceDesc: { fontFamily: fonts.mono, fontSize: 11, color: c.onSurfaceTertiary, lineHeight: 17 },

  moduleCard: {
    flexBasis: "31%",
    flexGrow: 1,
    minWidth: 200,
    minHeight: 150,
    backgroundColor: c.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    padding: spacing.lg,
    gap: spacing.xs,
    justifyContent: "space-between",
  },
  moduleTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  moduleIcon: { width: 46, height: 46, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  moduleTitle: { fontFamily: fonts.display, fontSize: 18, letterSpacing: 0.5, marginTop: spacing.sm },
  moduleSub: { fontFamily: fonts.mono, fontSize: 10.5, color: c.onSurfaceTertiary },
  moduleStat: { fontFamily: fonts.monoMedium, fontSize: 10, color: c.muted, marginTop: spacing.xs },
  openBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: radius.md },

  footer: { fontFamily: fonts.mono, fontSize: 10, color: c.muted, textAlign: "center", marginTop: spacing.xl },
}));
