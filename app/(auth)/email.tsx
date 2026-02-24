import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { useResponsive } from "@/hooks/useResponsive";
import { Card } from "@/shared/ui/Card";
import { Disclaimer } from "@/shared/ui/Disclaimer";
import Header from "@/shared/ui/Header";
import { Separator } from "@/shared/ui/Separator";
import { globalStyles } from "@/style/global";
import { useThemes } from "@/theme/use-color-scheme.web";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { emailSchema } from "../../features/auth/schema";
export default function EmailScreen() {
  const router = useRouter();
  const theme = useThemes();
  const { isDesktop } = useResponsive();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = () => {
    router.push("/(auth)/otp");
  };

  return (
    <AuthWrapper>
      <View style={[styles.form, { flex: 1 }]}>
        {/* Top: heading + form */}
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: isDesktop ? "center" : "flex-start",
            }}
          >
            {/* Title */}
            <Header
              style={{
                marginBottom: 30,
              }}
              title="Add your email"
              description="One Platform. Two Goals. Jobs & Talent."
            />

            {/* Card */}
            <Card>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Email Address"
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.email}
                    outlineStyle={{ borderRadius: 12 }}
                    left={<TextInput.Icon icon="email-outline" />}
                    returnKeyType="done"
                    blurOnSubmit
                    onSubmitEditing={handleSubmit(onSubmit)}
                    accessibilityLabel="Email address"
                    accessibilityHint="Enter your email address, then press the Continue button or the Enter key to submit"
                  />
                )}
              />

              {errors.email && (
                <Text
                  style={{
                    color: theme.colors.error,
                    marginTop: 6,
                    fontSize: 12,
                  }}
                >
                  {errors.email.message}
                </Text>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={{ ...globalStyles.primaryButton, marginTop: 24 }}
                labelStyle={{ fontWeight: "600" }}
                accessibilityRole="button"
                accessibilityLabel="Continue"
                accessibilityHint="Submits your email address and moves to the OTP verification step"
                compact={true}
              >
                Continue
              </Button>

              <Separator />

              <Button
                mode="outlined"
                icon="google"
                onPress={() => {}}
                style={{ ...globalStyles.primaryButton }}
                labelStyle={{ fontWeight: "600" }}
                accessibilityRole="button"
                accessibilityLabel="Continue with Google"
                accessibilityHint="Continue using your Google account"
                compact={true}
              >
                Continue with Google
              </Button>
            </Card>
          </View>
        </KeyboardAvoidingView>

        {/* Bottom: disclaimer */}
        <Disclaimer style={{ marginTop: 30 }} />
      </View>
    </AuthWrapper>
  );
}
