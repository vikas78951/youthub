import type { MD3Theme } from "react-native-paper";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { semanticDark, semanticLight } from "./semantic";
import { typography } from "./typography";

const primaryMain = "#002b4e";

export const LightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    ...semanticLight,
    primary: primaryMain,
    onPrimary: "#FFFFFF",
    primaryContainer: "#D6E4F0",
    onPrimaryContainer: "#001B33",

    secondary: "#4F6F8F",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E3EDF5",
    onSecondaryContainer: "#1E2F40",

    tertiary: "#6C757D",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#E9ECEF",
    onTertiaryContainer: "#2B2F33",

    background: "#F4F6F8",
    onBackground: "#1A1C1E",

    surface: "#FFFFFF",
    onSurface: "#1A1C1E",

    surfaceVariant: "#E6E8EB",
    onSurfaceVariant: "#5F6368",

    outline: "#D0D5DD",
    outlineVariant: "#E4E7EC",

    error: "#B3261E",
    onError: "#FFFFFF",
    errorContainer: "#F9DEDC",
    onErrorContainer: "#410E0B",

    inverseSurface: "#1A1C1E",
    inverseOnSurface: "#F4F6F8",
    inversePrimary: "#9EC5E5",

    shadow: "#000000",
    scrim: "#000000",

    elevation: {
      level0: "transparent",
      level1: "#F8FAFC",
      level2: "#F1F5F9",
      level3: "#E9EEF4",
      level4: "#E2E8F0",
      level5: "#CBD5E1",
    },

    surfaceDisabled: "rgba(26,28,30,0.12)",
    onSurfaceDisabled: "rgba(26,28,30,0.38)",
    backdrop: "rgba(0,0,0,0.4)",
  },
  fonts: typography,
};

export const DarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 12,
  colors: {
    ...MD3DarkTheme.colors,
    ...semanticDark,
    primary: "#4D8FCB",
    onPrimary: "#001E36",
    primaryContainer: "#003A66",
    onPrimaryContainer: "#D6E4F0",

    secondary: "#8CA9C4",
    onSecondary: "#0E2436",
    secondaryContainer: "#1F3447",
    onSecondaryContainer: "#DCE8F2",

    tertiary: "#A0A4A8",
    onTertiary: "#1F2327",
    tertiaryContainer: "#30363C",
    onTertiaryContainer: "#E9ECEF",

    background: "#0F141A",
    onBackground: "#E6EDF3",

    surface: "#141A21",
    onSurface: "#E6EDF3",

    surfaceVariant: "#1E252D",
    onSurfaceVariant: "#A9B1BA",

    outline: "#3A424C",
    outlineVariant: "#2A313A",

    error: "#F2B8B5",
    onError: "#601410",
    errorContainer: "#8C1D18",
    onErrorContainer: "#F9DEDC",

    inverseSurface: "#E6EDF3",
    inverseOnSurface: "#141A21",
    inversePrimary: primaryMain,

    shadow: "#000000",
    scrim: "#000000",

    elevation: {
      level0: "transparent",
      level1: "#161C23",
      level2: "#1B222A",
      level3: "#202833",
      level4: "#242D38",
      level5: "#2B3542",
    },

    surfaceDisabled: "rgba(230,237,243,0.12)",
    onSurfaceDisabled: "rgba(230,237,243,0.38)",
    backdrop: "rgba(0,0,0,0.5)",
  },
  fonts: typography,
};
