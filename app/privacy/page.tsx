import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
      <div className="container-page section max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2026</p>

        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">What we collect</h2>
            <p className="mt-2">
              We collect only what you give us directly: your name and email address when you submit the
              contact form, a booking inquiry, or the newsletter signup, plus any phone number, travel dates,
              or message text you choose to include. We do not use tracking cookies or third-party analytics
              on this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">How we use it</h2>
            <p className="mt-2">
              Contact and booking-inquiry information is used solely to respond to your request — to answer a
              question, confirm tour availability, or process a booking. Newsletter sign-ups are used only to
              send the emails you subscribed to; you can unsubscribe at any time via the link in every email
              or by contacting us directly at{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">How we store it</h2>
            <p className="mt-2">
              Form submissions are delivered to our team by email and are not stored in a marketing database
              or sold or shared with third parties for advertising purposes. We retain messages only as long
              as needed to handle your request and for basic business record-keeping.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Your rights</h2>
            <p className="mt-2">
              You can ask us at any time what information we hold about you, request a correction, or request
              deletion. Contact{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                {site.email}
              </a>{" "}
              and we&rsquo;ll respond within a reasonable time frame, consistent with applicable data
              protection law (including GDPR for EU/UK residents and CCPA for California residents).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Changes to this policy</h2>
            <p className="mt-2">
              If this policy changes materially, we&rsquo;ll update the date above. Continued use of the site
              after a change constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
