import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { Text } from "react-native-paper";

interface Props {
  style?: Record<string, unknown>;
}

export const Disclaimer: React.FC<Props> = ({ style }) => {
  const theme = useThemes();

  return (
    <Text
      variant="bodySmall"
      style={{
        textAlign: "center",
        marginTop: (style?.marginTop as number) ?? 10,
        opacity: 0.6,
        ...(style as object),
      }}
    >
      I agree to
      <Text
        style={{
          color: theme.colors.primary,
          fontWeight: "500",
          marginRight: 4,
        }}
      >
        Terms of Use
      </Text>
      &
      <Text
        style={{
          color: theme.colors.primary,
          fontWeight: "500",
          marginLeft: 4,
        }}
      >
        Privacy Policy
      </Text>
    </Text>
  );
};
