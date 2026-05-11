// components/BookingForm.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EVENT_TYPES = ["Wedding", "Prenup", "Birthday", "Corporate", "Other"];

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = {
      name:      (form.elements.namedItem("name")      as HTMLInputElement).value,
      email:     (form.elements.namedItem("email")     as HTMLInputElement).value,
      eventType: (form.elements.namedItem("eventType") as HTMLSelectElement).value,
      eventDate: (form.elements.namedItem("eventDate") as HTMLInputElement).value,
      message:   (form.elements.namedItem("message")   as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="booking" className="bg-obsidian py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal text-[11px] tracking-mega uppercase text-gold/60">Get in Touch</div>
          <h2 className="reveal reveal-delay-1 mt-4 display text-5xl sm:text-7xl text-warm-white">
            Book a Session
          </h2>
          <div className="reveal reveal-delay-2 mt-6 gold-rule w-20 mx-auto" />
          <p className="reveal reveal-delay-3 mt-6 serif-italic text-lg text-warm-muted">
            Tell us about your vision and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="reveal in text-center py-16 border border-gold/20">
            <div className="display text-4xl text-gold mb-4">Thank You</div>
            <p className="serif-italic text-warm-muted text-lg">
              Your inquiry has been sent. We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal grid sm:grid-cols-2 gap-x-10 gap-y-8">
            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Full Name *</span>
              <input
                name="name"
                type="text"
                required
                className="field mt-2"
                placeholder="Juan dela Cruz"
              />
            </label>

            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Email Address *</span>
              <input
                name="email"
                type="email"
                required
                className="field mt-2"
                placeholder="juan@email.com"
              />
            </label>

            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Event Type *</span>
              <select name="eventType" required className="field mt-2">
                <option value="">Select type…</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Event Date *</span>
              <input
                name="eventDate"
                type="date"
                required
                className="field mt-2"
                style={{ colorScheme: "dark" }}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Message</span>
              <textarea
                name="message"
                rows={4}
                className="field mt-2 resize-none"
                placeholder="Tell us about your event, location, and any special requests…"
              />
            </label>

            {status === "error" && (
              <p className="sm:col-span-2 text-sm text-red-400">{error}</p>
            )}

            <div className="sm:col-span-2 flex justify-end pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-3.5 bg-gold text-obsidian text-[11px] tracking-widest-plus uppercase font-medium hover:bg-gold-dim transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : "Send Inquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
