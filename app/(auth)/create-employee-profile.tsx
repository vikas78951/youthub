import AuthWrapper from "@/features/auth/components/AuthWrapper";
import { styles } from "@/features/auth/style";
import { Card } from "@/shared/ui/Card";
import GoBackIconButton from "@/shared/ui/GoBackIconButton";
import Header from "@/shared/ui/Header";
import { useThemes } from "@/theme/use-color-scheme.web";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { createEmployeeProfileSchema } from "../../features/profile/schema";

export default function EmployeeCreateProfile() {
  const theme = useThemes();

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

  const onSubmit = (data: any) => {
    router.push("/(employee)");
    console.log(data);
  };

  return (
    <AuthWrapper>
      <GoBackIconButton />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            ...styles.form,
            justifyContent: "flex-start",
            marginTop: 20,
          }}
        >
          <KeyboardAvoidingView>
            {/* Main Content */}
            <Header
              style={{
                marginBottom: 20,
              }}
              title="Create your profile."
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

              {/* CITY */}
              <Text style={{ marginTop: 16 }}>City *</Text>
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

              {/* JOB TITLE */}
              <Text style={{ marginTop: 16 }}>Job Title *</Text>
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

              {/* EXPERIENCE */}
              <Text style={{ marginTop: 16 }}>Years of Experience *</Text>
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

              {/* SKILLS */}
              <Text style={{ marginTop: 16 }}>Skills *</Text>
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

              {/* EXPECTED SALARY */}
              <Text style={{ marginTop: 16 }}>Expected Salary (Optional)</Text>
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
                accessibilityLabel="Save and continue"
              >
                Save & Continue
              </Button>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </AuthWrapper>
  );
}
