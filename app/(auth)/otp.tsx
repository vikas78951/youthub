import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { Card } from "@/shared/ui/Card";
import { Disclaimer } from "@/shared/ui/Disclaimer";
import GoBackIconButton from "@/shared/ui/GoBackIconButton";
import Header from "@/shared/ui/Header";
import { useThemes } from "@/theme/use-color-scheme.web";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Button, Text } from "react-native-paper";
import { otpSchema } from "../../features/auth/schema";

const CELL_COUNT = 4;

export default function OTPScreen() {
  const router = useRouter();
  const theme = useThemes();
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
    router.push("/select-role");
  };

  return (
    <AuthWrapper>
      <GoBackIconButton />

      <View style={styles.form}>
        <KeyboardAvoidingView>
          {/* Main Content */}
          <Header
            style={{
              marginBottom: 40,
            }}
            title="Login to your account."
            description="Verify you account"
          />
          {/* Card */}
          <Card description="Enter the 4-digit code sent to your phone">
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
              accessible
              accessibilityLabel="One-time password input"
              accessibilityHint="Enter the 4-digit code you received"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  onLayout={getCellOnLayoutHandler(index)}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: theme.roundness,
                    borderWidth: 1.5,
                    borderColor: isFocused
                      ? theme.colors.primary
                      : theme.colors.outline,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.colors.surface,
                  }}
                  accessible
                  accessibilityLabel={`Digit ${index + 1} of ${CELL_COUNT}`}
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
              accessibilityLabel={`Resend OTP in ${timer} seconds`}
            >
              Resend OTP in 00:{timer.toString().padStart(2, "0")}
            </Text>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={value.length !== 4}
              style={{
                marginTop: 24,
                borderRadius: theme.roundness,
                height: 48,
                justifyContent: "center",
              }}
              labelStyle={{ fontWeight: "600" }}
              accessibilityRole="button"
              accessibilityLabel="Verify"
              accessibilityHint="Submits the one-time password and continues to role selection"
              accessibilityState={{ disabled: value.length !== 4 }}
            >
              Verify
            </Button>
          </Card>

          {/* Disclaimer */}
          <Disclaimer style={{ marginTop: 30 }} />
        </KeyboardAvoidingView>
      </View>
    </AuthWrapper>
  );
}
