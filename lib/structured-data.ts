import type { BlogPostMeta, Tour } from "@/lib/types";
import { site, streetAddress } from "@/lib/site";
import { getAllDestinations } from "@/lib/data/destinations";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: site.url,
    logo: new URL("/images/site/logo.jpg", site.url).toString(),
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: Array.from(new Set(getAllDestinations().map((d) => d.country))).map((name) => ({
      "@type": "Place",
      name,
    })),
    sameAs: Object.values(site.social),
  };
}

export function touristTripSchema(tour: Tour) {
  const url = new URL(`/tours/${tour.slug}`, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.overview,
    url,
    image: tour.images.map((img) => new URL(img.src, site.url).toString()),
    touristType: tour.tags,
    itinerary: tour.itinerary.map((day) => ({
      "@type": "Place",
      name: `Day ${day.day}: ${day.title}`,
      description: day.description,
    })),
    offers: {
      "@type": "Offer",
      price: tour.price.amount,
      priceCurrency: tour.price.currency,
      availability: "https://schema.org/InStock",
      url,
    },
    aggregateRating: tour.rating.count
      ? {
          "@type": "AggregateRating",
          ratingValue: tour.rating.value,
          reviewCount: tour.rating.count,
        }
      : undefined,
  };
}

export function blogPostingSchema(post: BlogPostMeta) {
  const url = new URL(`/blog/${post.slug}`, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: new URL(post.coverImage, site.url).toString(),
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
  };
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: new URL(item.href, site.url).toString(),
    })),
  };
}
