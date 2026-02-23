import * as React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import GoBackIconButton from "@/shared/ui/GoBackIconButton";

export function EmployeeHomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <GoBackIconButton />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text variant="headlineMedium" style={{ marginBottom: 8 }}>
          Employee home
        </Text>
        <Text variant="bodyMedium" style={{ marginBottom: 24 }}>
          This is the employee home screen. Build employee-specific flows here.
        </Text>

        <Button mode="contained">Start exploring jobs</Button>
      </View>
    </View>
  );
}

export default EmployeeHomeScreen;
