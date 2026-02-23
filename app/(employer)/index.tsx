import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import GoBackIconButton from "@/shared/ui/GoBackIconButton";

export function EmployerHomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <GoBackIconButton />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button mode="contained">Post a job</Button>
      </View>
    </View>
  );
}

export default EmployerHomeScreen;
