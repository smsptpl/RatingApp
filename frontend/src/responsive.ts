import { Platform, useWindowDimensions } from "react-native";

// Width of the persistent desktop/web sidebar.
export const SIDEBAR_WIDTH = 264;

// Breakpoint: treat the web app as "desktop" (landing page + persistent sidebar)
// once the viewport is wide enough. Narrow web windows and native (Expo Go)
// keep the mobile 2x2 grid experience.
export function useIsWideWeb(): boolean {
  const { width } = useWindowDimensions();
  return Platform.OS === "web" && width >= 900;
}
