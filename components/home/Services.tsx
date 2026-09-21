import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/lib/data/services";
import { Reveal } from "@/components/shared/Reveal";

export function Services() {
  const services = getAllServices();

  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">What we do</p>
          <h2 className="section-title">A complete travel &amp; holiday management service</h2>
          <p className="section-lede">
            Everything between your first enquiry and your journey home — planned, booked and looked
            after by the same team.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map(({ title, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 5) * 0.06}>
              <div className="card flex h-full items-start gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          See what each service covers
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
