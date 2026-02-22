import type { AppTheme } from "@/theme/type";
import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
import { useTheme } from "react-native-paper";

export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return "light";
}

export const useThemes = () => useTheme<AppTheme>();
