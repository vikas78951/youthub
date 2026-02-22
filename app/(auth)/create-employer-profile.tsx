import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import GoBackIconButton from "@/shared/ui/GoBackIconButton";
import Header from "@/shared/ui/Header";
import { useThemes } from "@/theme/use-color-scheme.web";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { createEmployerProfileSchema } from "../../features/profile/schema";

export default function EmployerCreateProfile() {
  const theme = useThemes();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEmployerProfileSchema),
    defaultValues: {
      hiringFor: "own_company",
    },
  });

  const hiringFor = watch("hiringFor");

  const onSubmit = (data: any) => {
    router.push("/(employee)");
    console.log(data);
  };
  type HiringForType = "own_company" | "client_company" | "both";
  const hiringOptions: { label: string; value: HiringForType }[] = [
    { label: "Your own company", value: "own_company" },
    { label: "Your client's company", value: "client_company" },
    { label: "Both", value: "both" },
  ];

  const showOwnCompany = hiringFor === "own_company" || hiringFor === "both";
  const showClientCompany =
    hiringFor === "client_company" || hiringFor === "both";

  return (
    <AuthWrapper>
      <GoBackIconButton />

      <View style={{ ...styles.form, justifyContent: "flex-start" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <Header
              style={{
                marginBottom: 20,
                flex: 1,
              }}
              title="Create basic profile."
            />
            <View
              style={{
                padding: 24,
                borderRadius: theme.shape.radiusLG,
                borderWidth: 1,
                borderColor: theme.colors.outlineVariant,
              }}
            >
              {/* FULL NAME */}
              <Text variant="labelLarge">Full Name *</Text>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Your First and Last Name"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.fullName}
                    style={{ marginTop: 6, height: 48 }}
                  />
                )}
              />

              {/* SEGMENTED TABS */}
              <Text
                variant="labelLarge"
                style={{ marginTop: 20, marginBottom: 8 }}
              >
                Are you hiring for? *
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {hiringOptions.map((item) => {
                  const isActive = hiringFor === item.value;

                  return (
                    <Button
                      key={item.value}
                      mode={isActive ? "contained" : "outlined"}
                      onPress={() => setValue("hiringFor", item.value)}
                      style={{ borderRadius: 999 }}
                      labelStyle={{ fontSize: 13 }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </View>

              {showOwnCompany && (
                <>
                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 24, fontWeight: "600" }}
                  >
                    Company Details
                  </Text>

                  <Text style={{ marginTop: 16 }}>Company Name *</Text>
                  <Controller
                    control={control}
                    name="companyName"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        mode="outlined"
                        placeholder="Name of your company"
                        value={value}
                        onChangeText={onChange}
                        style={{ marginTop: 6, height: 48 }}
                      />
                    )}
                  />

                  <Text style={{ marginTop: 16 }}>City *</Text>
                  <Controller
                    control={control}
                    name="companyCity"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        mode="outlined"
                        placeholder="Delhi, Mumbai..."
                        value={value}
                        onChangeText={onChange}
                        style={{ marginTop: 6, height: 48 }}
                      />
                    )}
                  />

                  <Text style={{ marginTop: 16 }}>Full Address *</Text>
                  <Controller
                    control={control}
                    name="companyAddress"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        mode="outlined"
                        placeholder="Shop/building no..."
                        value={value}
                        onChangeText={onChange}
                        style={{ marginTop: 6, height: 48 }}
                      />
                    )}
                  />
                </>
              )}

              {showClientCompany && (
                <>
                  <Text
                    variant="titleMedium"
                    style={{ marginTop: 24, fontWeight: "600" }}
                  >
                    Consultancy Details
                  </Text>

                  <Text style={{ marginTop: 16 }}>Client Name *</Text>
                  <Controller
                    control={control}
                    name="clientName"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        mode="outlined"
                        placeholder="Name of client"
                        value={value}
                        onChangeText={onChange}
                        style={{ marginTop: 6, height: 48 }}
                      />
                    )}
                  />

                  <Text style={{ marginTop: 16 }}>Interview Address *</Text>
                  <Controller
                    control={control}
                    name="interviewAddress"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        mode="outlined"
                        placeholder="Enter interview address"
                        value={value}
                        onChangeText={onChange}
                        style={{ marginTop: 6, height: 48 }}
                      />
                    )}
                  />
                </>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={{ marginTop: 30 }}
              >
                Next
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </AuthWrapper>
  );
}
