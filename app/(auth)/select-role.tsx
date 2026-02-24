import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { Company, RoleCard } from "@/features/company/RoleCard";
import { useResponsive } from "@/hooks/useResponsive";
import Header from "@/shared/ui/Header";
import { globalStyles } from "@/style/global";
import { useRouter } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button } from "react-native-paper";

type Role = "employee" | "employer";
type RolePath = "create-employee-profile" | "create-employer-profile";

export function SelectRoleScreen() {
  const router = useRouter();
  const { isMobile } = useResponsive();

  const [role, setRole] = useState<Role | null>(null);

  const ROLE_ROUTE_MAP: Record<Role, RolePath> = {
    employee: "create-employee-profile",
    employer: "create-employer-profile",
  };

  const handleContinue = () => {
    if (!role) return;
    router.push(`/${ROLE_ROUTE_MAP[role]}`);
  };

  const companies: Company[] = [
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
    <AuthWrapper>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            ...styles.form,
            maxWidth: isMobile ? 320 : "auto",
            flex: 1,
          }}
        >
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              {/* Top: heading + role cards */}
              <View>
                <Header
                  style={{ marginBottom: 30 }}
                  title="Choose your role"
                  description="We’ll tailor your experience based on your selection."
                  showBackButton
                />
                <View
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    flexWrap: isMobile ? "nowrap" : "wrap",
                    gap: 20,
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                  }}
                >
                  <RoleCard
                    icon="💼"
                    title="I’m Seeking Opportunities"
                    description="Discover jobs, apply instantly, and grow your career with top companies."
                    selected={role === "employee"}
                    onPress={() => setRole("employee")}
                    companies={companies}
                    isMobile={isMobile}
                  />

                  <RoleCard
                    icon="🏢"
                    title="I’m Hiring"
                    description="Post jobs, review applications, and hire the right talent for your organization."
                    selected={role === "employer"}
                    onPress={() => setRole("employer")}
                    companies={companies}
                    isMobile={isMobile}
                  />
                </View>
              </View>

              {/* Bottom: submit button */}
              <Button
                mode="contained"
                onPress={handleContinue}
                disabled={!role}
                style={{
                  ...globalStyles.primaryButton,
                  marginTop: 28,
                  width: "100%",
                  maxWidth: 320,
                  alignSelf: "flex-end",
                }}
                labelStyle={{ fontWeight: "600" }}
                accessibilityRole="button"
                accessibilityLabel="Continue"
                accessibilityHint="Confirm your selected role and continue"
                accessibilityState={{ disabled: !role }}
              >
                Continue
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </AuthWrapper>
  );
}

export default SelectRoleScreen;
