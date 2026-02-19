import { useRouter } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

type Role = "employee" | "employer";
type RolePath = "create-employee-profile" | "create-employer-profile";

export function SelectRoleScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [role, setRole] = useState<Role | null>(null);
  const ROLE_ROUTE_MAP: Record<Role, RolePath> = {
    employee: "create-employee-profile",
    employer: "create-employer-profile",
  };

  const handleContinue = () => {
    if (!role) return;

    // Later you can persist this in store / async storage
    router.replace(`/${ROLE_ROUTE_MAP[role]}`);
  };

  const RoleCard = ({
    title,
    description,
    value,
  }: {
    title: string;
    description: string;
    value: Role;
  }) => {
    const selected = role === value;

    return (
      <Pressable onPress={() => setRole(value)}>
        <Card
          mode="outlined"
          style={{
            marginBottom: 16,
            borderRadius: 20,
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? theme.colors.primary : theme.colors.outline,
            backgroundColor: selected
              ? theme.colors.primaryContainer
              : theme.colors.surface,
          }}
        >
          <Card.Content>
            <Text variant="titleMedium" style={{ fontWeight: "600" }}>
              {title}
            </Text>
            <Text variant="bodyMedium" style={{ marginTop: 4, opacity: 0.7 }}>
              {description}
            </Text>
          </Card.Content>
        </Card>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        variant="headlineMedium"
        style={{ fontWeight: "700", marginBottom: 8 }}
      >
        Choose your role
      </Text>

      <Text variant="bodyMedium" style={{ marginBottom: 32, opacity: 0.7 }}>
        We’ll tailor your experience based on your role.
      </Text>

      <RoleCard
        title="Employee"
        description="Find jobs, apply, and track applications."
        value="employee"
      />

      <RoleCard
        title="Employer"
        description="Post jobs and manage candidates."
        value="employer"
      />

      <Button
        mode="contained"
        style={{ marginTop: 24, borderRadius: 12 }}
        disabled={!role}
        onPress={handleContinue}
      >
        Continue
      </Button>
    </View>
  );
}

export default SelectRoleScreen;
