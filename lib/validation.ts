import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(4000),
  type: z.enum(["contact", "newsletter"]).default("contact"),
  // Honeypot field: real users never fill this in; bots often do. Left unrestricted
  // in the schema so a filled-in value doesn't surface a validation error to the
  // bot — it's handled silently by the route handler instead.
  company: z.string().optional().default(""),
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  tourSlug: z.string().trim().min(1),
  tourTitle: z.string().trim().min(1),
  startDate: z.string().trim().max(40).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(30).default(1),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  // Honeypot field — see contactSchema for rationale.
  company: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
