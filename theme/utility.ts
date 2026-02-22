import { Platform } from "react-native";

export const createShadow = (elevation: number) => {
  if (Platform.OS === "android") {
    return { elevation };
  }

  return {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: elevation * 1.5,
  };
};
