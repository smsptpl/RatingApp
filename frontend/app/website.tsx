import { useRouter } from "expo-router";
import { ArrowLeft, Globe } from "phosphor-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fonts, makeStyles, radius, spacing, useTheme } from "@/src/theme";

export default function WebsitePortfolio() {
  const styles = useStyles();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Pressable testID="website-back" onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <ArrowLeft size={22} color={colors.onSurface} weight="bold" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Website Portofolio
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xxxl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.empty}>
          <View style={styles.iconWrap}>
            <Globe size={48} color="#8B5CF6" weight="fill" />
          </View>
          <Text style={styles.title}>Website Portofolio</Text>
          <Text style={styles.sub}>
            Halaman ini masih kosong. Konten portofolio akan ditambahkan nanti.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  screen: { flex: 1, backgroundColor: c.surface },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    backgroundColor: c.surface,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.surfaceSecondary,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: fonts.display,
    fontSize: 20,
    letterSpacing: 0.5,
    color: c.onSurface,
  },
  headerSpacer: { width: 40 },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    width: "100%",
    maxWidth: 480,
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.xxxl,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#241B3A",
    borderWidth: 1.5,
    borderColor: "#8B5CF6",
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    letterSpacing: 0.5,
    color: c.onSurface,
    textAlign: "center",
  },
  sub: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: c.muted,
    textAlign: "center",
    lineHeight: 19,
    maxWidth: 320,
  },
}));
