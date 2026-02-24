import { APP_CONFIG } from "@/constants/constants";
import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { useResponsive } from "@/hooks/useResponsive";
import { Card } from "@/shared/ui/Card";
import { Disclaimer } from "@/shared/ui/Disclaimer";
import Header from "@/shared/ui/Header";
import { globalStyles } from "@/style/global";
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

export default function OTPScreen() {
  const router = useRouter();
  const theme = useThemes();
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(APP_CONFIG.otp.timerSeconds);
  const { isDesktop } = useResponsive();

  const ref = useBlurOnFulfill({ value, cellCount: APP_CONFIG.otp.cellCount });
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
  }, [setFormValue, value]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = () => {
    router.push("/select-role");
  };

  const handleResendOtp = () => {
    // Reset OTP value and restart timer; hook your API call here.
    setValue("");
    setTimer(APP_CONFIG.otp.timerSeconds);
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
            {/* Header */}
            <Header
              style={{
                marginBottom: 30,
              }}
              title="Verify you email"
              description="Enter the 4-digit code sent to your email"
              showBackButton
            />

            {/* Card */}
            <Card>
              {/* OTP FIELD */}
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={APP_CONFIG.otp.cellCount}
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
                    accessibilityLabel={`Digit ${
                      index + 1
                    } of ${APP_CONFIG.otp.cellCount}`}
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

              {timer > 0 ? (
                <Text
                  style={{
                    marginTop: 16,
                    opacity: 0.6,
                  }}
                  accessibilityLabel={`You can resend the code in ${timer} seconds`}
                >
                  Resend OTP in 00:{timer.toString().padStart(2, "0")}
                </Text>
              ) : (
                <Button
                  mode="text"
                  onPress={handleResendOtp}
                  style={{ marginTop: 16 }}
                  accessibilityRole="button"
                  accessibilityLabel="Resend one-time password"
                  accessibilityHint="Sends a new verification code to your phone"
                >
                  Resend OTP
                </Button>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                disabled={value.length !== 4}
                style={{ ...globalStyles.primaryButton, marginTop: 24 }}
                labelStyle={{ fontWeight: "600" }}
                accessibilityRole="button"
                accessibilityLabel="Verify"
                accessibilityHint="Submits the one-time password and continues to role selection"
                accessibilityState={{ disabled: value.length !== 4 }}
              >
                Verify
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
