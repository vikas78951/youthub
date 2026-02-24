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
import { createEmployeeProfileSchema } from "../../features/profile/schema";

export default function EmployeeCreateProfile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEmployeeProfileSchema),
    defaultValues: {
      experience: "0",
    },
  });
  const { isMobile } = useResponsive();

  const onSubmit = (data: any) => {
    router.push("/(employee)");
    console.log(data);
  };

  return (
    <AuthWrapper>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            ...styles.form,
            justifyContent: "space-between",
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
                  description="Add you basic details"
                  showBackButton
                />
                <Card>
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
                      {/* FULL NAME */}
                      <View style={{ marginBottom: 16 }}>
                        <Text variant="labelLarge">Full Name *</Text>
                        <Controller
                          control={control}
                          name="fullName"
                          render={({ field: { onChange, value } }) => (
                            <TextInput
                              mode="outlined"
                              placeholder="Your full name"
                              value={value}
                              onChangeText={onChange}
                              error={!!errors.fullName}
                              style={{ marginTop: 6, height: 48 }}
                              accessibilityLabel="Full Name"
                              accessibilityHint="Enter your full name"
                            />
                          )}
                        />
                      </View>

                      {/* CITY */}
                      <View style={{ marginBottom: 16 }}>
                        <Text>City *</Text>
                        <Controller
                          control={control}
                          name="city"
                          render={({ field: { onChange, value } }) => (
                            <TextInput
                              mode="outlined"
                              placeholder="Delhi, Mumbai..."
                              value={value}
                              onChangeText={onChange}
                              error={!!errors.city}
                              style={{ marginTop: 6, height: 48 }}
                              accessibilityLabel="City"
                            />
                          )}
                        />
                      </View>

                      {/* JOB TITLE */}
                      <View style={{ marginBottom: 16 }}>
                        <Text>Job Title *</Text>
                        <Controller
                          control={control}
                          name="jobTitle"
                          render={({ field: { onChange, value } }) => (
                            <TextInput
                              mode="outlined"
                              placeholder="Software Developer"
                              value={value}
                              onChangeText={onChange}
                              error={!!errors.jobTitle}
                              style={{ marginTop: 6, height: 48 }}
                              accessibilityLabel="Job Title"
                            />
                          )}
                        />
                      </View>
                    </View>

                    {/* Column 2 */}
                    <View
                      style={{
                        flex: 1,
                        marginLeft: isMobile ? 0 : 12,
                      }}
                    >
                      {/* EXPERIENCE */}
                      <View style={{ marginBottom: 16 }}>
                        <Text>Years of Experience *</Text>
                        <Controller
                          control={control}
                          name="experience"
                          render={({ field: { onChange, value } }) => (
                            <TextInput
                              mode="outlined"
                              keyboardType="numeric"
                              placeholder="2"
                              value={value ?? ""}
                              onChangeText={onChange}
                              error={!!errors.experience}
                              style={{ marginTop: 6, height: 48 }}
                              accessibilityLabel="Years of Experience"
                            />
                          )}
                        />
                      </View>

                      {/* SKILLS */}
                      <View style={{ marginBottom: 16 }}>
                        <Text>Skills *</Text>
                        <Controller
                          control={control}
                          name="skills"
                          render={({ field: { onChange, value } }) => (
                            <TextInput
                              mode="outlined"
                              placeholder="React, Node, SQL"
                              value={value}
                              onChangeText={onChange}
                              error={!!errors.skills}
                              style={{ marginTop: 6, height: 48 }}
                              accessibilityLabel="Skills"
                            />
                          )}
                        />
                      </View>

                      {/* EXPECTED SALARY */}
                      <View style={{ marginBottom: 16 }}>
                        <Text>Expected Salary (Optional)</Text>
                        <Controller
                          control={control}
                          name="expectedSalary"
                          render={({ field: { onChange, value } }) => (
                            <TextInput
                              mode="outlined"
                              keyboardType="numeric"
                              placeholder="500000"
                              value={value ? String(value) : ""}
                              onChangeText={(text) =>
                                onChange(text ? Number(text) : undefined)
                              }
                              style={{ marginTop: 6, height: 48 }}
                              accessibilityLabel="Expected Salary"
                            />
                          )}
                        />
                      </View>
                    </View>
                  </View>
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
                accessibilityLabel="Save and continue"
              >
                Save & Continue
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </AuthWrapper>
  );
}
