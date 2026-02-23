import { Card } from "@/shared/ui/Card";
import { useThemes } from "@/theme/use-color-scheme.web";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "react-native-paper";

export interface Company {
  name: string;
  icon: any;
}

interface RoleCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  companies: Company[];
  isMobile?: boolean;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  icon,
  title,
  description,
  selected,
  onPress,
  companies,
  isMobile,
}) => {
  const theme = useThemes();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={`Select the ${title} role`}
      accessibilityState={{ selected }}
    >
      <Card
        style={{
          flex: 1,
          borderColor: selected
            ? theme.colors.primary
            : theme.colors.outlineVariant,
          maxWidth: isMobile ? "100%" : 340,
          minWidth: isMobile ? "100%" : 280,
          height: "100%",
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.roundness,
              backgroundColor: theme.colors.surfaceVariant,
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
            }}
          >
            <Text style={{ fontSize: 18 }}>{icon}</Text>
          </View>

          <Text variant="titleLarge" style={{ fontWeight: "700", flex: 1 }}>
            {title}
          </Text>
        </View>

        {/* Description */}
        <Text
          variant="bodyMedium"
          style={{
            marginTop: 12,
            opacity: 0.7,
            lineHeight: 20,
          }}
        >
          {description}
        </Text>

        {/* Companies row (dummy data for now) */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {companies.map((company) => (
            <View
              key={company.name}
              style={{
                padding: 2,
                borderRadius: theme.roundness,
                borderWidth: 1,
                borderColor: theme.colors.outlineVariant,
              }}
            >
              <Image
                source={company.icon}
                style={{
                  width: 80,
                  height: 30,
                  resizeMode: "contain",
                }}
              />
            </View>
          ))}
        </View>
      </Card>
    </Pressable>
  );
};
