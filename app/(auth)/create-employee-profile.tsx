import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { createEmployeeProfileSchema } from "../../features/profile/schema";

export default function EmployeeCreateProfile() {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEmployeeProfileSchema),
    defaultValues: {
      experience: 0,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text
          variant="headlineMedium"
          style={{ fontWeight: "700", marginBottom: 24 }}
        >
          Create Your Profile
        </Text>

        <Card style={{ padding: 20, borderRadius: 20 }}>
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
                style={{ marginTop: 6 }}
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
                value={String(value)}
                onChangeText={(text) => onChange(Number(text))}
                error={!!errors.experience}
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
                multiline
                placeholder="React, Node, SQL"
                value={value}
                onChangeText={onChange}
                error={!!errors.skills}
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
              />
            )}
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={{ marginTop: 30 }}
          >
            Save & Continue
          </Button>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
