import {
  BedDouble,
  Briefcase,
  Bus,
  Camera,
  Globe2,
  Heart,
  Headphones,
  Map,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Customized Tour Packages",
    description:
      "Every itinerary is built around your dates, budget and pace — not pulled off a shelf.",
    icon: Map,
  },
  {
    title: "Domestic & International Holidays",
    description:
      "Eleven Indian states and six international destinations, planned by the same team end to end.",
    icon: Globe2,
  },
  {
    title: "Hotel Bookings",
    description:
      "Budget guesthouses to heritage palaces and resorts, booked at negotiated operator rates.",
    icon: BedDouble,
  },
  {
    title: "Transportation & Private Vehicle Services",
    description:
      "Air-conditioned cars, tempo travellers and coaches with experienced drivers, plus airport and station transfers.",
    icon: Bus,
  },
  {
    title: "Sightseeing & Activities",
    description:
      "Guided sightseeing, entry tickets, desert safaris, houseboats, cruises and adventure add-ons.",
    icon: Camera,
  },
  {
    title: "Family & Couple Holidays",
    description:
      "Paced for children and grandparents, or built around two people and a long lunch. Your call.",
    icon: Users,
  },
  {
    title: "Group Tours",
    description:
      "Departures for extended families, friend circles, schools and pilgrimage groups of any size.",
    icon: UsersRound,
  },
  {
    title: "Honeymoon Packages",
    description:
      "Kerala, the Maldives, Kashmir and Europe — with room upgrades, private dinners and quiet corners arranged.",
    icon: Heart,
  },
  {
    title: "Corporate & MICE Travel",
    description:
      "Offsites, conferences, incentive trips and dealer tours, with billing and documentation to match.",
    icon: Briefcase,
  },
  {
    title: "Complete Travel Assistance",
    description:
      "Flights, permits, visa documentation, insurance guidance and a number that answers while you are travelling.",
    icon: Headphones,
  },
];

export function getAllServices(): Service[] {
  return services;
}
