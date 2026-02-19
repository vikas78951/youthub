import { z } from "zod";
import { otpSchema, phoneSchema } from "./schema";

export type PhoneSchema = z.infer<typeof phoneSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
