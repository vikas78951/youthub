import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Enter valid 10 digit number")
    .max(10, "Enter valid 10 digit number")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be 4 digits")
    .max(4, "OTP must be 4 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});
