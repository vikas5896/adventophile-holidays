import { BadgeIndianRupee, Globe2, Headphones, MapPin } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const points = [
  {
    icon: MapPin,
    title: "Based in Jodhpur",
    description:
      "Rajasthan is our home ground, not a destination we resell — own vehicles, own drivers, own guides.",
  },
  {
    icon: Globe2,
    title: "Domestic & International",
    description:
      "Eleven Indian destinations and six international ones, all handled by the same team from one office.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Built to Your Budget",
    description:
      "Every package is a starting point. Tell us the number and we will shape the itinerary around it.",
  },
  {
    icon: Headphones,
    title: "Assistance While You Travel",
    description:
      "Flights, permits, visa paperwork and a number that answers if something changes mid-trip.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section bg-muted">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">Why travel with us</p>
          <h2 className="section-title">A travel company, not a booking website</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
