import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Button, Card, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { otpSchema } from "../../features/auth/schema";

const CELL_COUNT = 4;

export default function OTPScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(30);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    setFormValue("otp", value);
  }, [value]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = () => {
    router.replace("/(employee)");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Top Header */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
      >
        <IconButton icon="arrow-left" size={20} onPress={() => router.back()} />
      </View>

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "center",
        }}
      >
        {/* Header */}
        <Text
          variant="headlineLarge"
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontWeight: "700",
          }}
        >
          Verify your number
        </Text>

        {/* Card */}
        <Card
          style={{
            padding: 24,
            borderRadius: 20,
            elevation: 4,
          }}
        >
          <Text variant="bodyMedium" style={{ marginBottom: 20, opacity: 0.7 }}>
            Enter the 4-digit code sent to your phone
          </Text>

          {/* OTP FIELD */}
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            rootStyle={{
              justifyContent: "space-between",
            }}
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 14,
                  borderWidth: 1.5,
                  borderColor: isFocused
                    ? theme.colors.primary
                    : theme.colors.outline,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.colors.surface,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "600",
                  }}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          {errors.otp && (
            <Text
              style={{
                color: theme.colors.error,
                fontSize: 12,
                marginTop: 8,
              }}
            >
              {errors.otp.message}
            </Text>
          )}

          <Text
            style={{
              marginTop: 16,
              opacity: 0.6,
              textAlign: "center",
            }}
          >
            Resend OTP in 00:{timer.toString().padStart(2, "0")}
          </Text>

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={value.length !== 4}
            style={{
              marginTop: 24,
              borderRadius: 12,
              height: 48,
              justifyContent: "center",
            }}
            labelStyle={{ fontWeight: "600" }}
          >
            Verify
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
          I agree to
          <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
            Terms of Use
          </Text>
          <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
