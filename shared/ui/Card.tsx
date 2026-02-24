import { globalStyles } from "@/style/global";
import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  children?: React.ReactNode;
  style?: Record<string, unknown>;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

interface SelectProps extends Props {
  selected: boolean;
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
        ...globalStyles.card,
        ...(style as object),
      }}
    >
      {title && (
        <Text
          variant="headlineSmall"
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

export const SlectionCard: React.FC<SelectProps> = ({
  children,
  style,
  title,
  description,
  selected,
}) => {
  const theme = useThemes();
  const dynamicStyle: ViewStyle = {
    borderColor: selected ? theme.colors.primary : theme.colors.outlineVariant,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
  };

  return (
    <View style={[globalStyles.selectionCard, dynamicStyle, style]}>
      {title && (
        <Text
          variant="headlineSmall"
          style={{
            marginBottom: 4,
            opacity: 0.8,
            color: theme.colors.onSurface,
            borderColor: selected
              ? theme.colors.primary
              : theme.colors.outlineVariant,
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
