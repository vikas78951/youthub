import { useRouter } from "expo-router";
import React from "react";
import { IconButton } from "react-native-paper";

const GoBackIconButton = () => {
  const router = useRouter();

  return (
    <IconButton
      icon="arrow-left"
      size={20}
      onPress={() => router.back()}
      style={{ padding: 0 }}
      mode="outlined"
    />
  );
};

export default GoBackIconButton;
