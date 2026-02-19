import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { phoneSchema } from "../../features/auth/schema";

export default function PhoneScreen() {
  const router = useRouter();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = () => {
    router.push("/(auth)/otp");
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
        justifyContent: "center",
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Title */}
      <Text
        variant="headlineLarge"
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontWeight: "700",
          letterSpacing: 0.3,
        }}
      >
        Ready to build your team with YouthHub
      </Text>

      {/* Card */}
      <Card
        style={{
          padding: 24,
          borderRadius: 20,
          elevation: 4,
        }}
      >
        <Text variant="bodyMedium" style={{ marginBottom: 12, opacity: 0.7 }}>
          Enter your number to continue
        </Text>

        <Controller
          control={control}
          name="phone"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Mobile Number"
              mode="outlined"
              keyboardType="number-pad"
              value={value}
              onChangeText={onChange}
              error={!!errors.phone}
              outlineStyle={{ borderRadius: 12 }}
              left={<TextInput.Affix text="+91" />}
            />
          )}
        />

        {errors.phone && (
          <Text
            style={{
              color: theme.colors.error,
              marginTop: 6,
              fontSize: 12,
            }}
          >
            {errors.phone.message}
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
          Get Started
        </Button>
      </Card>

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
  );
}
