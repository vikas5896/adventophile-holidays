import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms that govern use of the ${site.name} website and tour booking inquiries.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />
      <div className="container-page section max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2026</p>

        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Booking inquiries, not instant purchases</h2>
            <p className="mt-2">
              Submitting the &ldquo;Book This Tour&rdquo; form sends a booking <em>inquiry</em>, not a
              confirmed booking or a payment. A trip coordinator will contact you to confirm availability,
              pricing, and payment before any booking is final. Prices shown on the site are per-person
              estimates and are confirmed at the time of booking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Site content</h2>
            <p className="mt-2">
              Tour itineraries, durations, and inclusions are accurate to the best of our knowledge at time of
              publication but may change due to local conditions, permits, or weather — particularly for
              high-altitude and remote itineraries. Any material change will be communicated before you
              finalize a booking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Assumption of risk</h2>
            <p className="mt-2">
              Many of our tours involve inherent physical risk — high altitude, open water, remote terrain.
              By booking, you acknowledge these risks and confirm you meet any fitness, age, or health
              guidelines listed on the relevant tour page. Travel insurance covering adventure activities is
              strongly recommended and, for high-altitude treks, required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Cancellations</h2>
            <p className="mt-2">
              Cancellation terms vary by tour and are provided in writing at the time of booking confirmation,
              not before. As a general rule, longer lead times before departure allow for more flexible
              cancellation terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Intellectual property</h2>
            <p className="mt-2">
              All text, itineraries, and design on this site belong to {site.name} unless otherwise noted.
              Please don&rsquo;t republish our itineraries elsewhere without asking first.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
