import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export function EmployerHomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Button mode="contained">Post a job</Button>
    </View>
  );
}

export default EmployerHomeScreen;
