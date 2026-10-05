import { withVersion } from "@/lib/image-version";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";

// Resolved server-side (withVersion reads file mtimes via node:fs, which can't reach the
// browser bundle) and handed to the client slideshow as plain src/alt pairs.
const slides = [
  { src: withVersion("/images/destinations/rajasthan.jpg"), alt: "Hawa Mahal, Jaipur" },
  { src: withVersion("/images/tours/jodhpur-osian-desert-safari/1.jpg"), alt: "Jodhpur's Blue City" },
  { src: withVersion("/images/destinations/kerala.jpg"), alt: "Kerala backwaters" },
  { src: withVersion("/images/destinations/dubai.jpg"), alt: "Dubai skyline" },
  { src: withVersion("/images/destinations/maldives.jpg"), alt: "Maldives overwater villas" },
];

export function Hero() {
  return <HeroSlideshow slides={slides} />;
}
