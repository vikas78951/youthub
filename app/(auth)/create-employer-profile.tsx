import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { useResponsive } from "@/hooks/useResponsive";
import { Card } from "@/shared/ui/Card";
import Header from "@/shared/ui/Header";
import { globalStyles } from "@/style/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { createEmployerProfileSchema } from "../../features/profile/schema";

export default function EmployerCreateProfile() {
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

  const { isMobile } = useResponsive();

  return (
    <AuthWrapper>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            ...styles.form,
            justifyContent: "flex-start",
            flex: 1,
            maxWidth: isMobile ? 320 : "auto",
          }}
        >
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              {/* Top: header + form card */}
              <View>
                <Header
                  style={{
                    marginBottom: 30,
                  }}
                  title="Create your profile."
                  description="Tell us who you're hiring for"
                  showBackButton
                />
                <Card>
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
                        accessibilityLabel="Full Name"
                        accessibilityHint="Enter your first and last name"
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
                          accessibilityRole="button"
                          accessibilityLabel={item.label}
                          accessibilityState={{ selected: isActive }}
                        >
                          {item.label}
                        </Button>
                      );
                    })}
                  </View>

                  {(showOwnCompany || showClientCompany) && (
                    <>
                      <Text
                        variant="titleMedium"
                        style={{ marginTop: 24, fontWeight: "600" }}
                      >
                        {showOwnCompany && showClientCompany
                          ? "Company & Consultancy Details"
                          : showOwnCompany
                          ? "Company Details"
                          : "Consultancy Details"}
                      </Text>

                      <View
                        style={{
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        {/* Column 1 */}
                        <View
                          style={{
                            flex: 1,
                            marginRight: isMobile ? 0 : 12,
                          }}
                        >
                          {showOwnCompany && (
                            <>
                              <Text style={{ marginTop: 16 }}>
                                Company Name *
                              </Text>
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
                                    accessibilityLabel="Company Name"
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
                                    accessibilityLabel="Company City"
                                  />
                                )}
                              />
                            </>
                          )}

                          {showClientCompany && (
                            <View style={{ marginTop: 24 }}>
                              <Text>Client Name *</Text>
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
                                    accessibilityLabel="Client Name"
                                  />
                                )}
                              />
                            </View>
                          )}
                        </View>

                        {/* Column 2 */}
                        <View
                          style={{
                            flex: 1,
                            marginLeft: isMobile ? 0 : 12,
                          }}
                        >
                          {showOwnCompany && (
                            <View style={{ marginTop: 16 }}>
                              <Text>Full Address *</Text>
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
                                    accessibilityLabel="Company Address"
                                  />
                                )}
                              />
                            </View>
                          )}

                          {showClientCompany && (
                            <View style={{ marginTop: 24 }}>
                              <Text>Interview Address *</Text>
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
                                    accessibilityLabel="Interview Address"
                                  />
                                )}
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    </>
                  )}
                </Card>
              </View>

              {/* Bottom: submit button */}
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={{
                  ...globalStyles.primaryButton,
                  marginTop: 24,
                  width: "100%",
                  maxWidth: 320,
                  alignSelf: "flex-end",
                }}
                labelStyle={{ fontWeight: "600" }}
                accessibilityRole="button"
                accessibilityLabel="Go to next step"
              >
                Next
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </AuthWrapper>
  );
}
