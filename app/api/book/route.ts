import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { sendLeadEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const { name, email, phone, tourSlug, tourTitle, startDate, guests, message, company } = parsed.data;

  // Honeypot: a real visitor never fills this hidden field in.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendLeadEmail({
      subject: `Booking inquiry: ${tourTitle}`,
      replyTo: email,
      text: [
        `Tour: ${tourTitle} (${tourSlug})`,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        startDate ? `Preferred start date: ${startDate}` : null,
        `Guests: ${guests}`,
        message ? `\nMessage:\n${message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <p><strong>Tour:</strong> ${tourTitle} (${tourSlug})</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${startDate ? `<p><strong>Preferred start date:</strong> ${startDate}</p>` : ""}
        <p><strong>Guests:</strong> ${guests}</p>
        ${message ? `<p>${message.replace(/\n/g, "<br/>")}</p>` : ""}
      `,
    });
  } catch (error) {
    console.error("[api/book] failed to send email", error);
    return NextResponse.json({ error: "Could not send your request right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
