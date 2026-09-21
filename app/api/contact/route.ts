import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendLeadEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const { name, email, message, type, company } = parsed.data;

  // Honeypot: a real visitor never fills this hidden field in.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const subject = type === "newsletter" ? "New newsletter subscriber" : `New contact message from ${name}`;

  try {
    await sendLeadEmail({
      subject,
      replyTo: email,
      text: `Type: ${type}\nName: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Type:</strong> ${type}</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });
  } catch (error) {
    console.error("[api/contact] failed to send email", error);
    return NextResponse.json({ error: "Could not send your message right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
