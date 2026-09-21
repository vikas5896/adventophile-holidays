import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Adventophile Holidays is a travel & holiday management company based in Shastri Nagar, Jodhpur — customized domestic and international packages, planned and operated by one team.",
  path: "/about",
});

// PLACEHOLDER — illustrative team entries written to show the layout, not real staff.
// Replace the names, roles, bios and photos with the real team before launch.
const team = [
  {
    name: "Vikram Rathore",
    role: "Founder & Tour Operations",
    bio: "Grew up in Jodhpur and has been running desert and fort itineraries across Rajasthan for over a decade. Handles the domestic programme and the driver and guide network.",
    photo: "/images/team/vikram.svg",
  },
  {
    name: "Meera Suthar",
    role: "International Holidays & Documentation",
    bio: "Looks after the overseas programme — Dubai, the Maldives, Southeast Asia and Europe — along with visa documentation, insurance and airline bookings.",
    photo: "/images/team/meera.svg",
  },
];

const values = [
  {
    title: "Customized, not off the shelf",
    description:
      "Every package on this site is a starting point. We change the hotels, the pace and the route to fit your dates and your budget.",
  },
  {
    title: "One team, start to finish",
    description:
      "The person who quotes your trip is the person who books it and the person you call if a flight moves. Nothing is handed to a subcontracted call centre.",
  },
  {
    title: "Local where it matters",
    description:
      "In Rajasthan we use our own vehicles, drivers and guides. Everywhere else we work with operators we have travelled with ourselves.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      <div className="container-page section">
        <p className="section-eyebrow">About Adventophile Holidays</p>
        <h1 className="section-title">A travel &amp; holiday management company from Jodhpur</h1>
        <p className="section-lede">
          Adventophile Holidays plans and operates customized holidays for families, couples, friend
          groups and companies — eleven destinations across India and six international ones. We are
          based in Shastri Nagar, Jodhpur, and we handle the whole trip: the itinerary, the hotels, the
          vehicles, the sightseeing, the permits and paperwork, and the phone call when something changes
          while you are travelling.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="card p-6">
              <h2 className="font-semibold text-foreground">{value.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="card flex gap-4 p-6">
                <Image
                  src={member.photo}
                  alt={`Photo of ${member.name}`}
                  width={96}
                  height={96}
                  className="h-24 w-24 shrink-0 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-brand-600">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-semibold text-foreground">Where to find us</h2>
            <address className="mt-2 text-sm not-italic text-muted-foreground">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}, {site.address.region} – {site.address.postalCode}, {site.address.country}
            </address>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-foreground">Talk to us</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-brand-700">
                {site.phone}
              </a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-brand-700">
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <div className="card mt-16 flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Have a trip in mind we don&rsquo;t list yet?
          </h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            The destinations on this site are the ones we run most often, not a limit. Tell us where you
            want to go and we will build the itinerary around it.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
