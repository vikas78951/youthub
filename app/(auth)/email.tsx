import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
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
              marginBottom: 40,
            }}
            title="Login to your account."
            description="One Platform. Two Goals. Jobs & Talent."
          />

          {/* Card */}
          <View
            style={{
              padding: 16,
              borderRadius: theme.shape.radiusLG,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ marginBottom: 12, opacity: 0.7 }}
            >
              Enter your email address to continue
            </Text>

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
            >
              Continue
            </Button>
          </View>

          {/* Disclaimer */}
          <Text
            variant="bodySmall"
            style={{
              textAlign: "center",
              marginTop: 30,
              opacity: 0.6,
            }}
          >
            I agree to{" "}
            <Text
              style={{ color: theme.colors.primary, fontWeight: "500" }}
              onPress={() => {}}
            >
              Terms of Use
            </Text>{" "}
            &{" "}
            <Text
              style={{ color: theme.colors.primary, fontWeight: "500" }}
              onPress={() => {}}
            >
              Privacy Policy
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </View>
    </AuthWrapper>
  );
}
