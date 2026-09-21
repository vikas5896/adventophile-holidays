import Image from "next/image";
import { SearchWidget } from "@/components/home/SearchWidget";
import { Reveal } from "@/components/shared/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-28">
      <Image
        src="/images/site/hero.jpg"
        alt="A collage of Adventophile Holidays destinations — Jaipur's Amber Fort, a Kashmir houseboat, Halong Bay, and the Dubai and Paris skylines"
        fill
        priority
        className="object-cover opacity-50"
      />
      <div className="container-page relative text-center">
        <Reveal>
          <p className="section-eyebrow text-brand-100">Travel &amp; holiday management, from Jodhpur</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Customized domestic &amp; international holidays
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-50">
            Rajasthan, Kashmir, Kerala, the Northeast and the Andamans — plus Dubai, the Maldives,
            Vietnam, Malaysia, Sri Lanka and Europe. Planned around your dates, your budget and your
            pace.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <SearchWidget />
        </Reveal>
      </div>
    </section>
  );
}
