import { useRouter } from "expo-router";
import { ArrowRight, Coins, Drop, Flask, Globe, ShieldCheck } from "phosphor-react-native";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCopperDashboard, useDashboard, useDkaDashboard } from "@/src/api";
import { fonts, makeStyles, radius, spacing, useTheme } from "@/src/theme";

export default function Home() {
  const styles = useStyles();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const kht = useDashboard();
  const copper = useCopperDashboard();
  const dka = useDkaDashboard();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <ShieldCheck size={24} color={colors.onBrand} weight="fill" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.brand}>LAB AI VISION</Text>
              <Text style={styles.brandSub}>Fuel & Lubricant Analysis Suite</Text>
            </View>
          </View>

          <Text style={styles.pick}>PORTOFOLIO · PILIH MENU</Text>

          <View style={styles.grid}>
            {/* K-HTT ANALYST */}
            <ModuleCard
              testID="module-kht"
              accent={colors.brandPrimary}
              onAccent={colors.onBrandPrimary}
              tile={colors.brandTertiary}
              icon={<Flask size={28} color={colors.brandPrimary} weight="fill" />}
              title="K-HTT ANALYST"
              subtitle="Komatsu Hot Tube Tester"
              stat={`${kht.data?.total ?? 0} sampel · ${kht.data?.passed ?? 0} clear`}
              onPress={() => router.push("/kht")}
            />

            {/* Copper Strip ASTM D130 */}
            <ModuleCard
              testID="module-copper"
              accent={colors.brandSecondary}
              onAccent={colors.onBrandSecondary}
              tile="#3A2A10"
              icon={<Coins size={28} color={colors.brandSecondary} weight="fill" />}
              title="Copper Strip"
              subtitle="ASTM D130 / IP 154"
              stat={`${copper.data?.total ?? 0} sampel · ${copper.data?.passed ?? 0} clear`}
              onPress={() => router.push("/copper")}
            />

            {/* Rating DKA */}
            <ModuleCard
              testID="module-dka"
              accent={colors.info}
              onAccent={colors.onInfo}
              tile="#122A4A"
              icon={<Drop size={28} color={colors.info} weight="fill" />}
              title="Rating DKA"
              subtitle="Batch 4 sampel · OCR + AI"
              stat={`${dka.data?.total_batches ?? 0} batch · ${dka.data?.total_samples ?? 0} sampel`}
              onPress={() => router.push("/dka")}
            />

            {/* Website Portofolio */}
            <ModuleCard
              testID="module-website"
              accent="#8B5CF6"
              onAccent="#FFFFFF"
              tile="#241B3A"
              icon={<Globe size={28} color="#8B5CF6" weight="fill" />}
              title="Website"
              subtitle="Portofolio & profil saya"
              stat="Segera hadir"
              onPress={() => router.push("/website")}
            />
          </View>

          <Text style={styles.footer}>AI Vision powered by Gemini · © 2026</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function ModuleCard({
  testID,
  accent,
  onAccent,
  tile,
  icon,
  title,
  subtitle,
  stat,
  onPress,
}: {
  testID: string;
  accent: string;
  onAccent: string;
  tile: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  stat: string;
  onPress: () => void;
}) {
  const styles = useStyles();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.card,
        { borderColor: accent },
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={[styles.cardIcon, { backgroundColor: tile }]}>{icon}</View>
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: accent }]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.cardBottom}>
        <Text style={styles.cardStat} numberOfLines={1}>
          {stat}
        </Text>
        <View style={[styles.openBtn, { backgroundColor: accent }]}>
          <ArrowRight size={15} color={onAccent} weight="bold" />
        </View>
      </View>
    </Pressable>
  );
}

const useStyles = makeStyles((c) => ({
  screen: { flex: 1, backgroundColor: c.surface },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  inner: { width: "100%", maxWidth: 760, alignSelf: "center", gap: spacing.lg },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.sm },
  logoMark: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: c.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { fontFamily: fonts.display, fontSize: 26, color: c.onSurface, letterSpacing: 1 },
  brandSub: { fontFamily: fonts.mono, fontSize: 11, color: c.brandPrimary, marginTop: 1 },
  pick: { fontFamily: fonts.mono, fontSize: 11, color: c.muted, letterSpacing: 1.5, marginTop: spacing.sm },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  card: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 150,
    minHeight: 180,
    backgroundColor: c.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    padding: spacing.lg,
    gap: spacing.md,
    justifyContent: "space-between",
  },
  cardIcon: { width: 52, height: 52, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  cardBody: { gap: 3, flex: 1 },
  cardTitle: { fontFamily: fonts.display, fontSize: 19, letterSpacing: 0.5 },
  cardSubtitle: { fontFamily: fonts.mono, fontSize: 10.5, color: c.onSurfaceTertiary, lineHeight: 15 },
  cardBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardStat: { fontFamily: fonts.monoMedium, fontSize: 10, color: c.muted, flex: 1, marginRight: spacing.sm },
  openBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  },
  footer: { fontFamily: fonts.mono, fontSize: 10, color: c.muted, textAlign: "center", marginTop: spacing.lg },
}));
