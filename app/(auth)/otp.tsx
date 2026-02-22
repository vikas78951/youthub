import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { useResponsive } from "@/hooks/useResponsive";
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
  const { isDesktop } = useResponsive();

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
    router.replace("/select-role");
  };

  return (
    <AuthWrapper>
      {!isDesktop && <GoBackIconButton />}
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
          <View
            style={{
              padding: 24,
              borderRadius: theme.shape.radiusLG,
              borderWidth: 1,
              borderColor: theme.colors.outlineVariant,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ marginBottom: 20, opacity: 0.7 }}
            >
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
                borderRadius: theme.roundness,
                height: 48,
                justifyContent: "center",
              }}
              labelStyle={{ fontWeight: "600" }}
            >
              Verify
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
            I agree to
            <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
              Terms of Use
            </Text>
            <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
              Privacy Policy
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </View>
    </AuthWrapper>
  );
}
