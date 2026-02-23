import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  children?: React.ReactNode;
  style?: Record<string, unknown>;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export const Card: React.FC<Props> = ({
  children,
  style,
  title,
  description,
}) => {
  const theme = useThemes();

  return (
    <View
      style={{
        padding: 16,
        borderRadius: theme.shape.radiusLG,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.outlineVariant,
        boxShadow: "none",
        ...(style as object),
      }}
    >
      {title && (
        <Text
          variant="headlineMedium"
          style={{
            marginBottom: 4,
            opacity: 0.8,
            color: theme.colors.onSurface,
          }}
        >
          {title}
        </Text>
      )}

      {description && (
        <Text variant="bodyMedium" style={{ marginBottom: 20, opacity: 0.7 }}>
          {description}
        </Text>
      )}

      {children}
    </View>
  );
};
