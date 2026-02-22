import { useResponsive } from "@/hooks/useResponsive";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../style";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDesktop } = useResponsive();

  return (
    <SafeAreaView style={styles.container}>
      {isDesktop && (
        <View style={styles.hero}>
          <Image
            source={require("@/assets/images/screens/hero.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      <View
        style={{ ...styles.formContainer, width: isDesktop ? "auto" : "100%" }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
