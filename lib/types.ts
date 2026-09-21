export type DestinationScope = "domestic" | "international";

export interface DestinationImage {
  src: string;
  alt: string;
}

export interface Destination {
  slug: string;
  name: string;
  /** "domestic" = within India; "international" = everywhere else. */
  scope: DestinationScope;
  country: string;
  blurb: string;
  image: DestinationImage;
  highlights: string[];
  bestTime: string;
  featured: boolean;
}

export interface TourLocation {
  city?: string;
  country: string;
  /** Slug of the Destination this package belongs to (see lib/data/destinations.ts). */
  destination: string;
}

export interface TourPrice {
  amount: number;
  currency: string;
  unit: string;
}

export interface TourDuration {
  days: number;
  nights: number;
}

export interface TourGroupSize {
  min: number;
  max: number;
}

export interface TourRating {
  value: number;
  count: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourImage {
  src: string;
  alt: string;
}

export interface Tour {
  slug: string;
  title: string;
  location: TourLocation;
  images: TourImage[];
  price: TourPrice;
  duration: TourDuration;
  groupSize: TourGroupSize;
  minAge: number;
  tags: string[];
  rating: TourRating;
  excerpt: string;
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  featured: boolean;
}

export type BlogCategory =
  | "Company Insight"
  | "Creative"
  | "Lifestyle"
  | "Tips & Tricks";

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}
