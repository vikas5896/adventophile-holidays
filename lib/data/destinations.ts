import type { Destination, DestinationScope } from "@/lib/types";
import { withVersion } from "@/lib/image-version";

// Destinations with real photography imported via scripts/import-photos.mjs — everything else
// still falls back to the illustrated SVG placeholder from scripts/generate-placeholders.mjs.
const PHOTOGRAPHED_DESTINATIONS = new Set([
  "rajasthan",
  "kashmir",
  "himachal-pradesh",
  "uttarakhand",
  "goa",
  "sikkim",
  "meghalaya",
  "kerala",
  "gujarat",
  "dubai",
  "maldives",
  "vietnam",
  "malaysia",
  "sri-lanka",
  "europe",
  "andaman-nicobar",
  "arunachal-pradesh",
  "australia",
  "bali",
  "japan",
  "mauritius",
  "nepal",
  "new-zealand",
  "singapore",
  "south-africa",
  "thailand",
  "usa",
  "kenya",
  "tomorrowland",
]);

function cover(slug: string, label: string) {
  const hasPhoto = PHOTOGRAPHED_DESTINATIONS.has(slug);
  const src = `/images/destinations/${slug}.${hasPhoto ? "jpg" : "svg"}`;
  return {
    src: hasPhoto ? withVersion(src) : src,
    alt: hasPhoto ? `${label}` : `${label} — placeholder destination photo`,
  };
}

export const destinations: Destination[] = [
  // ——— India (domestic) ———
  {
    slug: "rajasthan",
    name: "Rajasthan",
    scope: "domestic",
    country: "India",
    blurb:
      "Our home state, and the one we know street by street — desert forts, blue-washed old cities, palace hotels and camel country, all within a day's drive of each other.",
    image: cover("rajasthan", "Rajasthan"),
    highlights: [
      "Mehrangarh Fort and the Blue City lanes of Jodhpur",
      "Amber Fort, Hawa Mahal and the bazaars of Jaipur",
      "Lake Pichola and the City Palace at Udaipur",
      "Golden sandstone havelis and Sam dunes at Jaisalmer",
      "Overnight desert camps with folk music and Rajasthani thali",
    ],
    bestTime: "October – March",
    featured: true,
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    scope: "domestic",
    country: "India",
    blurb:
      "Houseboats on the Dal, meadows above Pahalgam and the gondola at Gulmarg. Green from April, deep snow from December — two completely different holidays in one valley.",
    image: cover("kashmir", "Kashmir"),
    highlights: [
      "Shikara ride and houseboat night on Dal Lake",
      "Gulmarg Gondola, one of the highest cable cars in the world",
      "Betaab and Aru valleys around Pahalgam",
      "Mughal gardens — Nishat, Shalimar and Chashme Shahi",
      "Sonmarg and the drive towards Zoji La",
    ],
    bestTime: "April – October, and December – February for snow",
    featured: true,
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    scope: "domestic",
    country: "India",
    blurb:
      "The classic Indian hill holiday — colonial-era Shimla, the pine valleys around Manali, and snow at Solang and Rohtang when the pass is open.",
    image: cover("himachal-pradesh", "Himachal Pradesh"),
    highlights: [
      "The Ridge and Mall Road in Shimla",
      "Solang Valley for snow and adventure activities",
      "Hadimba Temple and Old Manali",
      "Rohtang Pass, subject to permits and snow clearance",
      "Kullu valley river rafting and riverside camps",
    ],
    bestTime: "March – June, and December – January for snow",
    featured: true,
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    scope: "domestic",
    country: "India",
    blurb:
      "Lake towns, ridge-top viewpoints and the Ganga at Rishikesh — the gentlest of the Himalayan states to travel with family, and the base for Char Dham pilgrimages.",
    image: cover("uttarakhand", "Uttarakhand"),
    highlights: [
      "Boating on Naini Lake and the Snow View ropeway",
      "Kempty Falls and Gun Hill at Mussoorie",
      "Ganga aarti at Triveni Ghat, Rishikesh",
      "White-water rafting on the Shivpuri stretch",
      "Jim Corbett National Park safaris",
    ],
    bestTime: "March – June and September – November",
    featured: false,
  },
  {
    slug: "goa",
    name: "Goa",
    scope: "domestic",
    country: "India",
    blurb:
      "North Goa for the beach shacks and markets, South Goa for the quiet sand. Our most-booked short break, and an easy first holiday for couples and families alike.",
    image: cover("goa", "Goa"),
    highlights: [
      "Baga, Calangute and Anjuna in the north",
      "Palolem and Colva for quieter southern sand",
      "Old Goa churches and the Latin Quarter of Fontainhas",
      "Dudhsagar Falls day trip",
      "Mandovi river cruise at sunset",
    ],
    bestTime: "November – February",
    featured: true,
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    scope: "domestic",
    country: "India",
    blurb:
      "Kanchenjunga on the skyline, monasteries on every ridge and high alpine lakes a couple of hours from Gangtok. Small state, very big views.",
    image: cover("sikkim", "Sikkim"),
    highlights: [
      "Tsomgo Lake and Baba Mandir on the Nathu La road",
      "Rumtek and Pemayangtse monasteries",
      "Sunrise over Kanchenjunga from Pelling",
      "Yumthang Valley and the Lachung road north",
      "MG Marg, Gangtok's traffic-free promenade",
    ],
    bestTime: "March – May and October – December",
    featured: false,
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    scope: "domestic",
    country: "India",
    blurb:
      "Living root bridges, waterfalls on every bend, and river water so clear the boats look like they are floating on air. The Northeast at its most photogenic.",
    image: cover("meghalaya", "Meghalaya"),
    highlights: [
      "Double-decker living root bridge at Nongriat",
      "Nohkalikai and Seven Sisters waterfalls",
      "Crystal-clear Umngot river at Dawki",
      "Mawlynnong, billed as Asia's cleanest village",
      "Mawsmai and Arwah limestone caves",
    ],
    bestTime: "October – April",
    featured: true,
  },
  {
    slug: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    scope: "domestic",
    country: "India",
    blurb:
      "India's far northeastern frontier — high passes, the enormous Tawang monastery and valleys that see very few visitors. Needs an Inner Line Permit, which we arrange.",
    image: cover("arunachal-pradesh", "Arunachal Pradesh"),
    highlights: [
      "Tawang Monastery, the largest in India",
      "Sela Pass at 13,700 ft and Paradise Lake",
      "Jaswant Garh war memorial",
      "Dirang valley and its hot springs",
      "Inner Line Permit and paperwork handled for you",
    ],
    bestTime: "March – June and September – November",
    featured: false,
  },
  {
    slug: "andaman-nicobar",
    name: "Andaman & Nicobar",
    scope: "domestic",
    country: "India",
    blurb:
      "White sand, warm water and some of the best snorkelling and diving in the country — a genuine island holiday without leaving India or needing a visa.",
    image: cover("andaman-nicobar", "Andaman and Nicobar Islands"),
    highlights: [
      "Radhanagar Beach on Havelock Island",
      "Snorkelling and scuba at Elephant Beach",
      "Natural coral bridge at Neil Island",
      "Cellular Jail light-and-sound show, Port Blair",
      "Glass-bottom boat at North Bay",
    ],
    bestTime: "October – May",
    featured: true,
  },
  {
    slug: "kerala",
    name: "Kerala",
    scope: "domestic",
    country: "India",
    blurb:
      "Tea hills at Munnar, a night on a backwater houseboat at Alleppey, and the beaches near Kovalam — the most relaxed week in India.",
    image: cover("kerala", "Kerala"),
    highlights: [
      "Tea estates and Eravikulam park at Munnar",
      "Overnight houseboat through the Alleppey backwaters",
      "Periyar wildlife sanctuary boat safari",
      "Kathakali and Kalaripayattu performances at Kochi",
      "Kovalam and Varkala beaches",
    ],
    bestTime: "September – March",
    featured: true,
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    scope: "domestic",
    country: "India",
    blurb:
      "The white salt desert of Kutch, the last wild Asiatic lions at Gir, and the temple coast at Somnath and Dwarka — an easy and rewarding neighbour to Rajasthan.",
    image: cover("gujarat", "Gujarat"),
    highlights: [
      "White Rann of Kutch, spectacular on a full-moon night",
      "Asiatic lion safari at Gir National Park",
      "Somnath and Dwarka temples",
      "Statue of Unity at Kevadia",
      "Kutchi handicraft villages around Bhuj",
    ],
    bestTime: "November – February",
    featured: false,
  },

  // ——— International ———
  {
    slug: "dubai",
    name: "Dubai",
    scope: "international",
    country: "United Arab Emirates",
    blurb:
      "The easiest first trip abroad for Indian travellers — a short flight, no jet lag, and a skyline, a desert and a beach all in the same week.",
    image: cover("dubai", "Dubai"),
    highlights: [
      "Burj Khalifa observation deck at level 124",
      "Evening desert safari with dune bashing and a BBQ camp",
      "Dubai Mall, the fountain show and the Gold Souk",
      "Dhow cruise dinner on Dubai Creek or Marina",
      "Day trip to Abu Dhabi and the Sheikh Zayed Grand Mosque",
    ],
    bestTime: "November – March",
    featured: true,
  },
  {
    slug: "maldives",
    name: "Maldives",
    scope: "international",
    country: "Maldives",
    blurb:
      "Overwater villas, house reefs and very little to do, on purpose. A short direct flight from several Indian cities.",
    image: cover("maldives", "Maldives"),
    highlights: [
      "Overwater or beach villa on a private resort island",
      "Snorkelling straight off the house reef",
      "Sunset dolphin cruise",
      "Sandbank picnic and candlelit beach dinner",
      "Seaplane or speedboat resort transfers arranged end to end",
    ],
    bestTime: "November – April",
    featured: true,
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    scope: "international",
    country: "Vietnam",
    blurb:
      "Halong Bay limestone karsts, lantern-lit Hoi An and the street food of Hanoi and Saigon — outstanding value, and increasingly our best-selling Southeast Asia trip.",
    image: cover("vietnam", "Vietnam"),
    highlights: [
      "Overnight cruise among the karsts of Halong Bay",
      "Hanoi Old Quarter and its street-food lanes",
      "Lantern-lit old town at Hoi An",
      "Cu Chi tunnels outside Ho Chi Minh City",
      "Mekong Delta boat trip",
    ],
    bestTime: "October – April",
    featured: true,
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    scope: "international",
    country: "Malaysia",
    blurb:
      "Kuala Lumpur's towers, the hill resorts and theme parks at Genting, and island time at Langkawi — a family favourite, with Indian food easy to find everywhere.",
    image: cover("malaysia", "Malaysia"),
    highlights: [
      "Petronas Twin Towers and the KL Tower skydeck",
      "Batu Caves and its 272 coloured steps",
      "Genting Highlands cable car and theme park",
      "Langkawi Sky Bridge and island-hopping",
      "Putrajaya and the Blue Mosque at Shah Alam",
    ],
    bestTime: "December – April",
    featured: false,
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    scope: "international",
    country: "Sri Lanka",
    blurb:
      "A short hop from South India, with tea country, elephants, ancient cities and southern beaches packed into an island you can cross in a day.",
    image: cover("sri-lanka", "Sri Lanka"),
    highlights: [
      "Temple of the Tooth at Kandy",
      "Tea plantations and the hill train to Nuwara Eliya",
      "Elephant and leopard safari at Yala or Udawalawe",
      "Sigiriya rock fortress",
      "Beach and water sports at Bentota",
    ],
    bestTime: "December – April",
    featured: false,
  },
  {
    slug: "europe",
    name: "Europe",
    scope: "international",
    country: "France, Switzerland & Italy",
    blurb:
      "The trip most families save up for — Paris, the Swiss Alps and Rome on one itinerary, with Schengen visa documentation, rail passes and transfers handled by us.",
    image: cover("europe", "Europe"),
    highlights: [
      "Eiffel Tower, Seine cruise and the Louvre in Paris",
      "Jungfraujoch, the Top of Europe, and Mount Titlis",
      "Lake Lucerne and the Swiss Travel Pass rail legs",
      "Colosseum, Vatican Museums and the Trevi Fountain",
      "Schengen visa documentation support throughout",
    ],
    bestTime: "April – September",
    featured: true,
  },
  {
    slug: "australia",
    name: "Australia",
    scope: "international",
    country: "Australia",
    blurb:
      "Sydney's harbour, the red heart of the Outback and the Great Barrier Reef — a single trip that covers city, desert and reef in a way few countries can.",
    image: cover("australia", "Australia"),
    highlights: [
      "Sydney Opera House and a Harbour Bridge climb",
      "Great Barrier Reef snorkelling or diving off Cairns",
      "Red Centre sunrise over Uluru",
      "Kangaroos and wildlife in the wild, not just a zoo",
      "Melbourne laneways and the Great Ocean Road",
    ],
    bestTime: "September – November and March – May",
    featured: false,
  },
  {
    slug: "bali",
    name: "Bali",
    scope: "international",
    country: "Indonesia",
    blurb:
      "Rice terraces at Ubud, cliff temples at sunset, and a beach for every mood — Bali is Southeast Asia's easiest island holiday, and consistently one of our best-value trips.",
    image: cover("bali", "Bali"),
    highlights: [
      "Tegallalang rice terraces and Ubud's art villages",
      "Uluwatu and Tanah Lot cliff temples at sunset",
      "Nusa Penida's Diamond Beach and Kelingking cliffs",
      "Private pool villas at a fraction of European prices",
      "Seminyak and Canggu for beach clubs and surf",
    ],
    bestTime: "April – October",
    featured: false,
  },
  {
    slug: "japan",
    name: "Japan",
    scope: "international",
    country: "Japan",
    blurb:
      "Neon Tokyo, temple-quiet Kyoto, and a bullet train in between — Japan rewards a well-planned itinerary more than almost anywhere else we book.",
    image: cover("japan", "Japan"),
    highlights: [
      "Shibuya Crossing and the Tokyo Tower skyline",
      "Kyoto's temples, bamboo groves and geisha district",
      "Shinkansen bullet train between cities",
      "Mount Fuji views from Hakone or the Fuji Five Lakes",
      "Cherry blossoms in spring, maple colours in autumn",
    ],
    bestTime: "March – May and October – November",
    featured: false,
  },
  {
    slug: "mauritius",
    name: "Mauritius",
    scope: "international",
    country: "Mauritius",
    blurb:
      "Lagoon-calm beaches, Port Louis markets and some of the Indian Ocean's best resorts — an easy direct-flight island escape without the long haul of the Caribbean.",
    image: cover("mauritius", "Mauritius"),
    highlights: [
      "Le Morne Brabant beach and UNESCO landscape",
      "Port Louis waterfront and Central Market",
      "Catamaran trips to Ile aux Cerfs",
      "Chamarel's seven-coloured earth and rum distillery",
      "Resort-based stays with full-board dining",
    ],
    bestTime: "May – December",
    featured: false,
  },
  {
    slug: "nepal",
    name: "Nepal",
    scope: "international",
    country: "Nepal",
    blurb:
      "Kathmandu's stupas, Pokhara's lake and the Annapurna skyline — the most accessible Himalayan trip we run, for trekkers and non-trekkers alike.",
    image: cover("nepal", "Nepal"),
    highlights: [
      "Boudhanath Stupa and Kathmandu's Durbar Square",
      "Pokhara lakeside and Sarangkot sunrise over the Annapurnas",
      "Short treks to Poon Hill for the fitter traveller",
      "Chitwan National Park jungle safari",
      "Everest scenic mountain flight from Kathmandu",
    ],
    bestTime: "March – May and September – November",
    featured: false,
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    scope: "international",
    country: "New Zealand",
    blurb:
      "Auckland's harbour, volcanic crossings and geothermal Rotorua — New Zealand packs glaciers, fjords and Maori culture into a trip most families only do once, and remember forever.",
    image: cover("new-zealand", "New Zealand"),
    highlights: [
      "Auckland waterfront and Sky Tower",
      "Tongariro Alpine Crossing, the country's best day hike",
      "Rotorua's geysers, mud pools and Maori cultural evenings",
      "Milford Sound cruise through the fjords",
      "Queenstown for adventure activities and wine country",
    ],
    bestTime: "November – March",
    featured: false,
  },
  {
    slug: "singapore",
    name: "Singapore",
    scope: "international",
    country: "Singapore",
    blurb:
      "Gardens by the Bay after dark, hawker centres by day, and a city clean and efficient enough to relax a first-time traveller abroad — our easiest introduction to Southeast Asia.",
    image: cover("singapore", "Singapore"),
    highlights: [
      "Gardens by the Bay's Supertree light show",
      "Marina Bay Sands and the Merlion waterfront",
      "Hawker centre food trails at Maxwell and Lau Pa Sat",
      "Sentosa Island beaches and Universal Studios",
      "Orchard Road shopping and the Singapore Zoo",
    ],
    bestTime: "Year-round (February – April driest)",
    featured: false,
  },
  {
    slug: "south-africa",
    name: "South Africa",
    scope: "international",
    country: "South Africa",
    blurb:
      "Table Mountain over Cape Town, the Winelands inland, and a Big Five safari a short flight away — South Africa is the most complete single-country trip we book.",
    image: cover("south-africa", "South Africa"),
    highlights: [
      "Table Mountain cable car and the V&A Waterfront",
      "Cape Winelands day trips to Stellenbosch and Franschhoek",
      "Kruger or private Big Five game reserve safari",
      "Cape Point and the penguins at Boulders Beach",
      "Robben Island and Cape Town's history tours",
    ],
    bestTime: "May – September for safari, November – March for Cape Town",
    featured: false,
  },
  {
    slug: "thailand",
    name: "Thailand",
    scope: "international",
    country: "Thailand",
    blurb:
      "Golden temples in Bangkok, island time in the south, and food worth the trip on its own — Thailand remains our best-value Southeast Asia package, in any season.",
    image: cover("thailand", "Thailand"),
    highlights: [
      "Wat Arun and the Grand Palace in Bangkok",
      "Floating markets and a river longtail boat ride",
      "Phi Phi Islands or Krabi beach time",
      "Chiang Mai temples and elephant sanctuaries",
      "Street food tours through Bangkok's night markets",
    ],
    bestTime: "November – February",
    featured: false,
  },
  {
    slug: "usa",
    name: "USA",
    scope: "international",
    country: "United States",
    blurb:
      "New York's skyline, national parks out west, and a road trip scale that needs real planning — our most-asked-about long-haul trip, built around whichever coast you actually want.",
    image: cover("usa", "USA"),
    highlights: [
      "Statue of Liberty and a Manhattan skyline cruise",
      "Golden Gate Bridge and San Francisco's cable cars",
      "Grand Canyon and the slot canyons of Arizona",
      "Las Vegas and the national parks loop",
      "Multi-city itineraries with internal flights handled for you",
    ],
    bestTime: "April – June and September – October",
    featured: false,
  },
  {
    slug: "kenya",
    name: "Kenya",
    scope: "international",
    country: "Kenya",
    blurb:
      "The Maasai Mara's Great Migration, Amboseli's elephants under Kilimanjaro, and a safari culture that invented the word — Kenya is where most of our clients take their first trip to Africa.",
    image: cover("kenya", "Kenya"),
    highlights: [
      "Maasai Mara game drives and the Great Migration (July – October)",
      "Amboseli National Park with Kilimanjaro views",
      "Maasai village visits and cultural ceremonies",
      "Hot-air balloon safari at sunrise",
      "Lake Nakuru's flamingos and rhino sanctuary",
    ],
    bestTime: "July – October and January – February",
    featured: false,
  },
  {
    slug: "tomorrowland",
    name: "Tomorrowland",
    scope: "international",
    country: "Belgium",
    blurb:
      "The world's biggest electronic music festival, in Boom, Belgium — we handle the festival pass, accommodation and flights so you can focus on the stages.",
    image: cover("tomorrowland", "Tomorrowland"),
    highlights: [
      "Mainstage sets from the world's top DJs",
      "DreamVille camping or nearby hotel packages",
      "Multi-day festival passes handled end to end",
      "Flights and Brussels airport transfers arranged",
      "Add-on stops in Amsterdam, Paris or Brussels",
    ],
    bestTime: "Late July (festival dates, usually two weekends)",
    featured: false,
  },
];

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestinationsByScope(scope: DestinationScope): Destination[] {
  return destinations.filter((d) => d.scope === scope);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return destinations.map((d) => d.slug);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured);
}

/** Display name for a destination slug, falling back to the slug itself. */
export function getDestinationName(slug: string): string {
  return getDestinationBySlug(slug)?.name ?? slug;
}
