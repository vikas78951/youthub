import { useRouter } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Button, IconButton } from "react-native-paper";

const GoBackIconButton = () => {
  const router = useRouter();

  if (Platform.OS !== "ios" && Platform.OS !== "android") {
    return (
      <Button
        icon="arrow-left"
        onPress={() => router.back()}
        style={{
          padding: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        mode="text"
      >
        Go back
      </Button>
    );
  }

  return (
    <IconButton
      icon="arrow-left"
      size={20}
      onPress={() => router.back()}
      mode="outlined"
    />
  );
};

export default GoBackIconButton;
