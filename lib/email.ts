import { Resend } from "resend";
import { site } from "@/lib/site";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendLeadEmailInput {
  subject: string;
  replyTo: string;
  html: string;
  text: string;
}

/**
 * Sends a lead-capture email via Resend. If RESEND_API_KEY is not configured
 * (e.g. local dev before the client sets up their account), logs the email
 * instead of throwing, so the contact/booking forms remain testable end-to-end.
 */
export async function sendLeadEmail({ subject, replyTo, html, text }: SendLeadEmailInput) {
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set — logging email instead of sending.\n",
      { to, subject, text }
    );
    return { id: "dev-mode-not-sent" };
  }

  const from = process.env.CONTACT_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
