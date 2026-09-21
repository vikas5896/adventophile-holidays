import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { PopularTours } from "@/components/home/PopularTours";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { DealCountdown } from "@/components/home/DealCountdown";
import { TestimonialSlider } from "@/components/home/TestimonialSlider";
import { LatestBlog } from "@/components/home/LatestBlog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Customized Domestic & International Holiday Packages",
  description:
    "Adventophile Holidays is a Jodhpur-based travel & holiday management company — customized tour packages across Rajasthan, Kashmir, Kerala, the Northeast and the Andamans, plus Dubai, the Maldives, Vietnam, Malaysia, Sri Lanka and Europe.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <PopularDestinations />
      <PopularTours />
      <WhyChooseUs />
      <SpecialOffers />
      <DealCountdown />
      <TestimonialSlider />
      <LatestBlog />
    </>
  );
}
