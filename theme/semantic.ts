import "react-native-paper";
import { createShadow } from "./utility";

export const semanticLight = {
  success: "#1E8E3E",
  onSuccess: "#FFFFFF",
  successContainer: "#D1FADF",

  warning: "#F59E0B",
  onWarning: "#FFFFFF",
  warningContainer: "#FEF3C7",

  info: "#2563EB",
  onInfo: "#FFFFFF",
  infoContainer: "#DBEAFE",

  error: "#B3261E",
  onError: "#FFFFFF",
  errorContainer: "#F9DEDC",
};

export const semanticDark = {
  success: "#4ADE80",
  onSuccess: "#052E16",
  successContainer: "#14532D",

  warning: "#FBBF24",
  onWarning: "#3B2F00",
  warningContainer: "#78350F",

  info: "#60A5FA",
  onInfo: "#0B1F3A",
  infoContainer: "#1E3A8A",

  error: "#F2B8B5",
  onError: "#601410",
  errorContainer: "#8C1D18",
};

declare module "react-native-paper" {
  interface MD3Colors {
    success: string;
    onSuccess: string;
    successContainer: string;

    warning: string;
    onWarning: string;
    warningContainer: string;

    info: string;
    onInfo: string;
    infoContainer: string;

    error: string;
    onError: string;
    errorContainer: string;
  }
}

export const shape = {
  radiusXS: 6,
  radiusSM: 10,
  radiusMD: 14,
  radiusLG: 20,
  radiusXL: 28,
};
export const shadow = {
  level0: createShadow(0),
  level1: createShadow(2),
  level2: createShadow(4),
  level3: createShadow(8),
  level4: createShadow(16),
};
