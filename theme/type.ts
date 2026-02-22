import type { MD3Theme } from "react-native-paper";

export type AppTheme = MD3Theme & {
  shape: {
    radiusXS: number;
    radiusSM: number;
    radiusMD: number;
    radiusLG: number;
    radiusXL: number;
  };
  shadow: {
    level0: object;
    level1: object;
    level2: object;
    level3: object;
    level4: object;
  };
};
