import { useRouter } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";

type Role = "employee" | "employer";

export function SelectRoleScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  const handleContinue = () => {
    if (role === "employee") {
      router.push("/(employee)");
    } else if (role === "employer") {
      router.push("/(employer)");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 8 }}>
        Choose your role
      </Text>
      <Text variant="bodyMedium" style={{ marginBottom: 24 }}>
        We&apos;ll tailor your experience based on your role.
      </Text>

      <RadioButton.Group
        value={role ?? ""}
        onValueChange={(value) => setRole(value as Role)}
      >
        <RadioButton.Item
          label="Employee"
          value="employee"
          mode="android"
          style={{ marginBottom: 8 }}
        />
        <RadioButton.Item label="Employer" value="employer" mode="android" />
      </RadioButton.Group>

      <Button
        mode="contained"
        style={{ marginTop: 24 }}
        disabled={!role}
        onPress={handleContinue}
      >
        Continue
      </Button>
    </View>
  );
}

export default SelectRoleScreen;
