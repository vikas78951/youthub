import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { Card } from "@/shared/ui/Card";
import { Disclaimer } from "@/shared/ui/Disclaimer";
import Header from "@/shared/ui/Header";
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
      <View style={styles.form}>
        <KeyboardAvoidingView behavior="padding">
          {/* Title */}

          <Header
            style={{
              marginBottom: 20,
            }}
            title="Login to your account."
            description="One Platform. Two Goals. Jobs & Talent."
          />

          {/* Card */}
          <Card description={"Enter your email address to continue"}>
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
              style={{
                marginTop: 24,
                borderRadius: 12,
                height: 48,
                justifyContent: "center",
              }}
              labelStyle={{ fontWeight: "600" }}
              accessibilityRole="button"
              accessibilityLabel="Continue"
              accessibilityHint="Submits your email address and moves to the OTP verification step"
            >
              Continue
            </Button>
          </Card>

          {/* Disclaimer */}
          <Disclaimer style={{ marginTop: 30 }} />
        </KeyboardAvoidingView>
      </View>
    </AuthWrapper>
  );
}
