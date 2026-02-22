import { useResponsive } from "@/hooks/useResponsive";
import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
interface Props {
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
}
const Header = ({ title, description, style }: Props) => {
  const theme = useThemes();
  const { isMobile } = useResponsive();
  return (
    <View style={style}>
      <Text variant={isMobile ? "displaySmall" : "displayLarge"}>{title}</Text>
      <Text
        variant={isMobile ? "bodyMedium" : "bodyLarge"}
        style={{ marginTop: 8, color: theme.colors.secondary }}
      >
        {description}
      </Text>
    </View>
  );
};

export default Header;
