import { useResponsive } from "@/hooks/useResponsive";
import GoBackIconButton from "@/shared/ui/GoBackIconButton";
import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  showBackButton?: boolean;
}

const Header = ({
  title,
  description,
  style,
  showBackButton = false,
}: Props) => {
  const theme = useThemes();
  const { isMobile } = useResponsive();

  return (
    <View style={style}>
      {showBackButton && (
        <View style={{ marginBottom: 4 }}>
          <GoBackIconButton />
        </View>
      )}

      <Text variant={isMobile ? "displayMedium" : "displayLarge"}>{title}</Text>
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
