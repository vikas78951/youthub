import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { useResponsive } from "@/hooks/useResponsive";
import GoBackIconButton from "@/shared/ui/GoBackIconButton";
import Header from "@/shared/ui/Header";
import { useThemes } from "@/theme/use-color-scheme.web";
import { useRouter } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Pressable, View } from "react-native";
import { Button, Text } from "react-native-paper";

type Role = "employee" | "employer";
type RolePath = "create-employee-profile" | "create-employer-profile";

export function SelectRoleScreen() {
  const router = useRouter();
  const theme = useThemes();
  const { isMobile, isDesktop } = useResponsive();

  const [role, setRole] = useState<Role | null>(null);

  const ROLE_ROUTE_MAP: Record<Role, RolePath> = {
    employee: "create-employee-profile",
    employer: "create-employer-profile",
  };

  const handleContinue = () => {
    if (!role) return;
    router.replace(`/${ROLE_ROUTE_MAP[role]}`);
  };

  const CompanyIconsRow = () => {
    const theme = useThemes();

    const companies = [
      {
        name: "google",
        icon: require("@/assets/images/screens/company-icon-1.png"),
      },
      {
        name: "microsoft",
        icon: require("@/assets/images/screens/company-icon-2.png"),
      },
      {
        name: "amazon",
        icon: require("@/assets/images/screens/company-icon-3.png"),
      },
    ];

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {companies.map((company, index) => (
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
    );
  };

  const RoleCard = ({
    icon,
    title,
    description,
    value,
  }: {
    icon: string;
    title: string;
    description: string;
    value: Role;
  }) => {
    const selected = role === value;

    return (
      <Pressable onPress={() => setRole(value)}>
        <View
          style={{
            padding: 24,
            borderRadius: theme.shape.radiusLG,
            borderWidth: 1.5,
            borderColor: selected
              ? theme.colors.primary
              : theme.colors.outlineVariant,
            backgroundColor: theme.colors.surface,
            maxWidth: 300,
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
          <CompanyIconsRow />
        </View>
      </Pressable>
    );
  };

  return (
    <AuthWrapper>
      {!isDesktop && <GoBackIconButton />}
      <View
        style={{
          ...styles.form,
          maxWidth: isMobile ? 300 : "auto",
        }}
      >
        <KeyboardAvoidingView>
          <View>
            <Header
              style={{ marginBottom: 20 }}
              title="Choose your role"
              description="We’ll tailor your experience based on your selection."
            />
            <View
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 20,
              }}
            >
              <RoleCard
                icon="💼"
                title="I’m Seeking Opportunities"
                description="Discover jobs, apply instantly, and grow your career with top companies."
                value="employee"
              />

              <RoleCard
                icon="🏢"
                title="I’m Hiring"
                description="Post jobs, review applications, and hire the right talent for your organization."
                value="employer"
              />
            </View>
            <Button
              mode="contained"
              onPress={handleContinue}
              disabled={!role}
              style={{
                marginTop: 28,
                borderRadius: 12,
                height: 50,
                justifyContent: "center",
                maxWidth: 300,
              }}
              labelStyle={{ fontWeight: "600" }}
            >
              Continue
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </AuthWrapper>
  );
}

export default SelectRoleScreen;
