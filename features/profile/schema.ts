import { z } from "zod";

export const createProfileSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  hiringFor: z.enum(["own", "client", "both"]),
  companyName: z.string().min(2, "Company name is required"),
  city: z.string().min(2, "City is required"),
  companyLocality: z.string().min(2, "Locality is required"),
  companyAddress: z.string().min(5, "Address is required"),
  interviewAddressDifferent: z.boolean().optional(),
});
