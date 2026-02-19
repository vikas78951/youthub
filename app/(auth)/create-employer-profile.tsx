import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import {
  Button,
  Card,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { createEmployerProfileSchema } from "../../features/profile/schema";

export default function EmployerCreateProfile() {
  const theme = useTheme();

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
    console.log(data);
  };

  const showOwnCompany = hiringFor === "own_company" || hiringFor === "both";

  const showClientCompany =
    hiringFor === "client_company" || hiringFor === "both";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.primary, marginBottom: 6 }}
        >
          Your job details are saved...
        </Text>

        <Text
          variant="headlineMedium"
          style={{ fontWeight: "700", marginBottom: 24 }}
        >
          Now create your basic profile
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
                placeholder="Your First and Last Name"
                value={value}
                onChangeText={onChange}
                error={!!errors.fullName}
                style={{ marginTop: 6 }}
              />
            )}
          />

          {/* SEGMENTED TABS */}
          <Text variant="labelLarge" style={{ marginTop: 20, marginBottom: 8 }}>
            Are you hiring for? *
          </Text>

          <SegmentedButtons
            value={hiringFor}
            onValueChange={(value) => setValue("hiringFor", value)}
            buttons={[
              { value: "own_company", label: "Your company" },
              { value: "client_company", label: "Client company" },
              { value: "both", label: "Both" },
            ]}
          />

          {/* ========================== */}
          {/* OWN COMPANY SECTION */}
          {/* ========================== */}

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
                    multiline
                    placeholder="Shop/building no..."
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </>
          )}

          {/* ========================== */}
          {/* CLIENT COMPANY SECTION */}
          {/* ========================== */}

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
                    multiline
                    placeholder="Enter interview address"
                    value={value}
                    onChangeText={onChange}
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
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
