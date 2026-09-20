import { useRouter } from "expo-router";
import React from "react";

import { LandingPage } from "@/src/components/LandingPage";

// Mobile "Portofolio" screen — renders the same Elastech Production landing
// page as the web home, with a back button to return to the grid menu.
export default function PortofolioScreen() {
  const router = useRouter();
  return <LandingPage onBack={() => (router.canGoBack() ? router.back() : router.push("/"))} />;
}
