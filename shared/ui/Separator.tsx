import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface SeparatorProps {
  label?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ label = "OR" }) => {
  const theme = useThemes();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.outlineVariant,
        }}
      />
      <Text
        style={{
          marginHorizontal: 12,
          color: theme.colors.onSurfaceVariant,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.colors.outlineVariant,
        }}
      />
    </View>
  );
};

