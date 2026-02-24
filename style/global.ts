import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  card: {
    boxShadow: "none",
  },
  selectionCard: {
    padding: 16,
    borderWidth: 1,
    boxShadow: "none",
  },

  primaryButton: {
    borderRadius: 12,
    justifyContent: "center",
    height: 48,
    padding: 4,
  },

  secondaryButton: {
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    padding: 4,
  },
});
