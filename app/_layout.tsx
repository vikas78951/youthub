import { useColorScheme } from "@/hooks/use-color-scheme";
import { LightTheme } from "@/theme/theme";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={LightTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
