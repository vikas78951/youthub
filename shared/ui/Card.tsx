import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { View } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: Record<string, unknown>;
}

export const Card: React.FC<Props> = ({ children, style }) => {
  const theme = useThemes();

  return (
    <View
      style={{
        padding: 16,
        borderRadius: theme.shape.radiusLG,
        borderWidth: 1,
        borderColor: theme.colors.outlineVariant,
        boxShadow: "none",
        ...(style as object),
      }}
    >
      {children}
    </View>
  );
};
