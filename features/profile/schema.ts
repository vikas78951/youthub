import { z } from "zod";

export const createEmployerProfileSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),

    hiringFor: z.enum(["own_company", "client_company", "both"]),

    // Own company fields
    companyName: z.string().optional(),
    companyCity: z.string().optional(),
    companyAddress: z.string().optional(),

    // Client company fields
    clientName: z.string().optional(),
    interviewAddress: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isOwn = data.hiringFor === "own_company" || data.hiringFor === "both";

    const isClient =
      data.hiringFor === "client_company" || data.hiringFor === "both";

    if (isOwn) {
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name is required",
          path: ["companyName"],
        });
      }

      if (!data.companyCity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is required",
          path: ["companyCity"],
        });
      }

      if (!data.companyAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company address is required",
          path: ["companyAddress"],
        });
      }
    }

    if (isClient) {
      if (!data.clientName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Client name is required",
          path: ["clientName"],
        });
      }

      if (!data.interviewAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Interview address is required",
          path: ["interviewAddress"],
        });
      }
    }
  });

export const createEmployeeProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),

  city: z.string().min(2, "City is required"),

  jobTitle: z.string().min(2, "Job title is required"),

  experience: z
    .string()
    .min(1, "Experience is required")
    .regex(/^\d+$/, "Only numbers allowed")
    .transform((val) => Number(val)),

  skills: z.string().min(2, "At least one skill is required"),

  expectedSalary: z.number().optional(),
});

export type CreateEmployeeProfileForm = z.infer<
  typeof createEmployeeProfileSchema
>;

export type CreateEmployerProfileForm = z.infer<
  typeof createEmployerProfileSchema
>;
