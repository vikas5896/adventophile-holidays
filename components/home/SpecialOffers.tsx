import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const offers = [
  {
    title: "Book 90 Days Ahead",
    description: "Lock in early-bird pricing and save up to 10% on any domestic package for the coming season.",
    href: "/tours?scope=domestic",
    cta: "Browse domestic packages",
  },
  {
    title: "Group & Family Rates",
    description: "Groups of 8 or more get a dedicated coordinator and a discounted per-person rate.",
    href: "/contact",
    cta: "Plan a group trip",
  },
];

export function SpecialOffers() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">Special offers</p>
          <h2 className="section-title">Ways to save on your next holiday</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 0.1}>
              <div className="card flex h-full flex-col p-6">
                <h3 className="font-semibold text-foreground">{offer.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{offer.description}</p>
                <Link href={offer.href} className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                  {offer.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
