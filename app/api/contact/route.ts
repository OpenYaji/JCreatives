// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const { name, email, eventType, eventDate, message } = await req.json();

  if (!name || !email || !eventType || !eventDate) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "J Creatives Inquiry <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Booking Inquiry — ${eventType} · ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #333;">
          <h2 style="border-bottom: 2px solid #c9a96e; padding-bottom: 8px; color: #c9a96e;">
            New Booking Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px 0; font-weight: 600; width: 120px;">Name</td><td>${esc(name)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td><a href="mailto:${encodeURIComponent(email)}">${esc(email)}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Event Type</td><td>${esc(eventType)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Event Date</td><td>${esc(eventDate)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Message</td><td>${esc(message || "—")}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
