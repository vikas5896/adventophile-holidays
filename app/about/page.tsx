import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { withVersion } from "@/lib/image-version";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Adventophile Holidays is a founder-led travel & holiday management company based in Shastri Nagar, Jodhpur — customized domestic and international packages, planned and operated by one team.",
  path: "/about",
});

const team = [
  {
    name: "Rahul Singh Rajpurohit",
    role: "Founder & CEO",
    bio: "Built Adventophile around a customer-first philosophy — understanding the traveller before designing the journey. What began as a personal vision has grown into a travel brand serving travellers across India, with experiences spanning both domestic and international destinations.",
    photo: withVersion("/images/team/rahul-singh-rajpurohit.jpg"),
  },
  {
    name: "Rahul Pawar",
    role: "Co-Founder",
    bio: "Co-founder of Adventophile Holidays, working alongside Rahul to plan and operate journeys across India and abroad.",
    photo: withVersion("/images/team/rahul-pawar.jpg"),
  },
];

const values = [
  {
    title: "Personalised planning",
    description:
      "Every traveller is different, so every itinerary starts with understanding you — your preferences, expectations and style — before we design the journey.",
  },
  {
    title: "Honest, detail-first recommendations",
    description:
      "No upselling, no guesswork. Just honest recommendations and attention to the details that make a trip go smoothly.",
  },
  {
    title: "Support before, during and after",
    description:
      "Our relationship does not end when the booking is confirmed. We are there before, during and around your journey — not just the parts we arranged.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      <div className="container-page section">
        <p className="section-eyebrow">About Adventophile Holidays</p>
        <h1 className="section-title">Travel Beyond Ordinary.</h1>
        <p className="section-lede">
          Travel is more than simply reaching a destination. It is the anticipation before departure, the
          experiences along the way, the people you meet, and the memories you carry home. Founded in
          Jodhpur, Rajasthan, Adventophile was built on a simple belief: travel should feel personal, not
          packaged. From family holidays to international escapes, corporate
          travel and tailor-made journeys, we create thoughtfully planned experiences designed around each
          traveller&rsquo;s unique preferences, expectations and style.
        </p>

        <div className="mt-14 card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Adventophile began with a young entrepreneur&rsquo;s passion for travel and a vision to create
            something better than conventional, one-size-fits-all travel packages. Rahul Singh Rajpurohit,
            Founder &amp; CEO, built Adventophile around a customer-first philosophy — understanding the
            traveller before designing the journey.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            What began as a personal vision has grown into a travel brand serving travellers across India,
            with experiences spanning both domestic and international destinations. Today, our approach
            remains simple:
          </p>
          <p className="mt-4 border-l-2 border-brand-600 pl-4 text-base font-semibold text-foreground">
            Earn the traveller&rsquo;s trust first. The booking comes second.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="card p-6">
              <h2 className="font-semibold text-foreground">{value.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 card bg-brand-900 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Our Promise</h2>
          <p className="mt-3 text-sm text-brand-50">
            Your destination is our responsibility, and your experience is our priority. We want every
            traveller to feel heard before they book, confident while they travel, supported when they
            need us, and happy when they return.
          </p>
          <p className="mt-3 text-sm text-brand-50">
            For us, success is not simply another booking. It is when a traveller returns with
            unforgettable stories, chooses Adventophile for their next journey, and confidently recommends
            us to someone they care about.
          </p>
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
          <p className="text-sm font-semibold text-brand-700">
            Your next adventure starts with a conversation.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
