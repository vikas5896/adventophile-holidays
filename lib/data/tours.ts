import type { Tour } from "@/lib/types";
import type { DestinationScope } from "@/lib/types";
import { getDestinationBySlug } from "@/lib/data/destinations";
import { withVersion } from "@/lib/image-version";

// Tours with real photography imported via scripts/import-photos.mjs (see the matching
// destination-photo count there) — everything else falls back to the illustrated SVG
// placeholder from scripts/generate-placeholders.mjs.
const PHOTO_GALLERY_COUNTS: Record<string, number> = {
  "jodhpur-osian-desert-safari": 3,
  "royal-rajasthan-jaipur-jodhpur-udaipur": 4,
  "jaisalmer-golden-city-desert-camp": 3,
  "kashmir-srinagar-gulmarg-pahalgam": 4,
  "himachal-shimla-manali-solang": 4,
  "uttarakhand-nainital-mussoorie-rishikesh": 4,
  "goa-beach-break": 4,
  "sikkim-gangtok-pelling-lachung": 4,
  "meghalaya-shillong-cherrapunji-dawki": 4,
  "kerala-munnar-alleppey-kovalam": 4,
  "gujarat-rann-somnath-gir": 4,
  "dubai-city-desert-abu-dhabi": 4,
  "maldives-overwater-escape": 4,
  "vietnam-hanoi-halong-danang-saigon": 4,
  "malaysia-kl-genting-langkawi": 4,
  "sri-lanka-colombo-kandy-bentota": 4,
  "europe-paris-switzerland-rome": 4,
  "andaman-port-blair-havelock-neil": 2,
  "arunachal-tawang-bomdila": 3,
};

function gallery(slug: string, label: string) {
  const photoCount = PHOTO_GALLERY_COUNTS[slug];
  if (photoCount) {
    return Array.from({ length: photoCount }, (_, i) => ({
      src: withVersion(`/images/tours/${slug}/${i + 1}.jpg`),
      alt: i === 0 ? label : `${label} — photo ${i + 1}`,
    }));
  }
  return [1, 2, 3].map((n) => ({
    src: `/images/tours/${slug}/${n}.svg`,
    alt: `${label} — placeholder photo ${n}`,
  }));
}

export const tours: Tour[] = [
  // ——————————————————————————— India (domestic) ———————————————————————————
  {
    slug: "jodhpur-osian-desert-safari",
    title: "3 Days Blue City: Jodhpur & Osian Desert Safari",
    location: { city: "Jodhpur", country: "India", destination: "rajasthan" },
    images: gallery("jodhpur-osian-desert-safari", "Jodhpur Blue City and Osian desert"),
    price: { amount: 11900, currency: "INR", unit: "per person" },
    duration: { days: 3, nights: 2 },
    groupSize: { min: 2, max: 14 },
    minAge: 8,
    tags: ["Heritage", "Desert", "Short Break"],
    rating: { value: 4.7, count: 86 },
    excerpt:
      "Wander the indigo lanes beneath Mehrangarh Fort, then trade the city for dunes on an overnight camel safari near Osian.",
    overview:
      "This is the trip we run out of our own front door. Jodhpur's old city glows blue at the foot of Mehrangarh Fort, one of India's largest and best-preserved forts, and we pair a guided walk through the fort and the blue-washed lanes below it with a half-day drive out to Osian, a small desert town ringed by ancient Hindu and Jain temples. From there you head into the Thar Desert by camel for a sunset ride and an overnight stay at a desert camp under a genuinely dark sky, before returning to Jodhpur for a final morning at the spice and textile markets.",
    highlights: [
      "Guided tour of Mehrangarh Fort with a local historian",
      "Walk through the Blue City's old town and clock tower market",
      "Camel safari into the Thar Desert at sunset",
      "Overnight desert camp with a home-cooked Rajasthani dinner",
      "Visit to Osian's 8th-century temple complex",
    ],
    included: [
      "2 nights accommodation (1 city hotel, 1 desert camp)",
      "All transport by private air-conditioned vehicle",
      "English and Hindi speaking local guide",
      "Camel safari and desert camp dinner/breakfast",
      "Mehrangarh Fort entry fee",
    ],
    excluded: ["Flights and train tickets", "Lunches", "Personal expenses and tips", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrive Jodhpur, Blue City walk", description: "Settle into your hotel, then set out on foot through the Blue City's narrow lanes to the clock tower market, ending with sunset views of Mehrangarh Fort from a rooftop café." },
      { day: 2, title: "Mehrangarh Fort & drive to Osian", description: "Morning tour of Mehrangarh Fort's museum and ramparts, then a scenic 2.5-hour drive to Osian, stopping at the temple complex before transferring into the dunes by jeep and camel." },
      { day: 3, title: "Desert sunrise & departure", description: "Watch sunrise over the dunes, breakfast at camp, then return to Jodhpur by late morning with time for last-minute shopping before your onward journey." },
    ],
    featured: true,
  },
  {
    slug: "royal-rajasthan-jaipur-jodhpur-udaipur",
    title: "8 Days Royal Rajasthan: Jaipur, Jodhpur & Udaipur",
    location: { country: "India", destination: "rajasthan" },
    images: gallery("royal-rajasthan-jaipur-jodhpur-udaipur", "Rajasthan forts and palaces"),
    price: { amount: 34900, currency: "INR", unit: "per person" },
    duration: { days: 8, nights: 7 },
    groupSize: { min: 2, max: 16 },
    minAge: 5,
    tags: ["Heritage", "Culture", "Family"],
    rating: { value: 4.8, count: 214 },
    excerpt:
      "The three great Rajput cities in one loop — pink Jaipur, blue Jodhpur and white Udaipur — with a night in the dunes in between.",
    overview:
      "Rajasthan's headline cities sit within a comfortable day's drive of each other, and this eight-day loop links all three without a single rushed morning. You start in Jaipur among the bazaars and the Amber Fort, cross to Jodhpur for Mehrangarh and the Blue City, detour into the desert for a night under canvas, then finish beside the lakes at Udaipur. Travel is by private air-conditioned vehicle throughout, with the same driver for the whole trip, and we build in free afternoons rather than filling every hour.",
    highlights: [
      "Amber Fort, Hawa Mahal and the City Palace at Jaipur",
      "Mehrangarh Fort and Jaswant Thada in Jodhpur",
      "A night at a desert camp with folk music and dinner",
      "Boat ride on Lake Pichola beneath the City Palace",
      "Block-printing and blue-pottery workshop visits",
    ],
    included: [
      "7 nights in heritage and 3-star hotels",
      "Daily breakfast and all dinners",
      "Private air-conditioned vehicle with driver for 8 days",
      "Local guides at Jaipur, Jodhpur and Udaipur",
      "Monument entry fees listed in the itinerary",
    ],
    excluded: ["Flights and train tickets", "Lunches", "Camera fees at monuments", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Jaipur", description: "Airport or station pickup, hotel check-in and an evening walk through Johari Bazaar for a first taste of the old city." },
      { day: 2, title: "Jaipur sightseeing", description: "Amber Fort in the cool of the morning, then Jal Mahal, the City Palace, Jantar Mantar and a photo stop at Hawa Mahal." },
      { day: 3, title: "Jaipur to Jodhpur", description: "Drive west across the Aravallis, stopping at the Bishnoi villages before checking in at Jodhpur in the late afternoon." },
      { day: 4, title: "Jodhpur & the Blue City", description: "Mehrangarh Fort with a local guide, Jaswant Thada, and a guided walk through the blue lanes to the clock tower market." },
      { day: 5, title: "Osian desert camp", description: "Drive to Osian, visit the temple complex, then a sunset camel ride into the dunes and an overnight desert camp with dinner and folk music." },
      { day: 6, title: "Desert to Udaipur", description: "Sunrise over the dunes, then the long and scenic drive south to Udaipur, arriving in time for a lakeside dinner." },
      { day: 7, title: "Udaipur sightseeing", description: "City Palace and its museum, Jagdish Temple, Saheliyon ki Bari, and a sunset boat ride on Lake Pichola." },
      { day: 8, title: "Departure", description: "A slow breakfast and free morning for shopping in the old city before your transfer to Udaipur airport or station." },
    ],
    featured: true,
  },
  {
    slug: "jaisalmer-golden-city-desert-camp",
    title: "4 Days Jaisalmer: Golden City & Sam Sand Dunes",
    location: { city: "Jaisalmer", country: "India", destination: "rajasthan" },
    images: gallery("jaisalmer-golden-city-desert-camp", "Jaisalmer fort and Sam sand dunes"),
    price: { amount: 15900, currency: "INR", unit: "per person" },
    duration: { days: 4, nights: 3 },
    groupSize: { min: 2, max: 14 },
    minAge: 6,
    tags: ["Desert", "Heritage", "Short Break"],
    rating: { value: 4.6, count: 118 },
    excerpt:
      "A living fort made of golden sandstone, merchant havelis carved like lace, and two nights of desert on the Pakistan border side of the Thar.",
    overview:
      "Jaisalmer Fort is one of the very few forts anywhere still lived in — several thousand people have homes inside the walls, which makes wandering it feel nothing like a museum. Around it sit the carved havelis built by nineteenth-century trading families, and an hour west the Thar opens into the Sam dunes. This short break gives you two full days in the city and its surroundings plus a night at a desert camp, and works well tacked on to any Jodhpur trip.",
    highlights: [
      "Jaisalmer Fort, still inhabited after 850 years",
      "Patwon ki Haveli and Salim Singh ki Haveli",
      "Sunset camel ride on the Sam sand dunes",
      "Desert camp with Kalbeliya dance and dinner",
      "Gadisar Lake and the abandoned village of Kuldhara",
    ],
    included: [
      "3 nights accommodation (2 hotel, 1 desert camp)",
      "Daily breakfast and 2 dinners",
      "Private air-conditioned vehicle with driver",
      "Camel ride and jeep dune transfer",
      "Local guide for fort and haveli sightseeing",
    ],
    excluded: ["Flights and train tickets", "Lunches", "Monument entry fees", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Jaisalmer", description: "Pickup and check-in, then an evening at Gadisar Lake and the sunset point below the fort walls." },
      { day: 2, title: "Fort & havelis", description: "A full guided morning inside the living fort and its Jain temples, followed by the Patwon and Salim Singh havelis and an afternoon in the bazaar." },
      { day: 3, title: "Kuldhara & Sam dunes", description: "Drive out to the abandoned village of Kuldhara, then on to Sam for a camel ride at sunset, dinner and a night at a desert camp." },
      { day: 4, title: "Departure", description: "Breakfast at camp and the drive back into Jaisalmer for your onward train, flight or road transfer to Jodhpur." },
    ],
    featured: false,
  },
  {
    slug: "kashmir-srinagar-gulmarg-pahalgam",
    title: "6 Days Kashmir: Srinagar, Gulmarg & Pahalgam",
    location: { city: "Srinagar", country: "India", destination: "kashmir" },
    images: gallery("kashmir-srinagar-gulmarg-pahalgam", "Kashmir valley, Dal Lake and Gulmarg"),
    price: { amount: 28500, currency: "INR", unit: "per person" },
    duration: { days: 6, nights: 5 },
    groupSize: { min: 2, max: 16 },
    minAge: 4,
    tags: ["Hill Station", "Family"],
    rating: { value: 4.9, count: 267 },
    excerpt:
      "A houseboat night on the Dal, the Gulmarg gondola, and the meadows and pine valleys above Pahalgam.",
    overview:
      "Kashmir is the holiday almost every Indian family has on a list somewhere, and six days is enough to do the valley properly rather than at a sprint. You get two nights in Srinagar — one of them on a traditional houseboat — a full day at Gulmarg with the gondola up towards Apharwat, and two nights at Pahalgam for the Betaab and Aru valleys. We run it year-round: the same route is green meadows in summer and deep snow from late December.",
    highlights: [
      "Night on a traditional cedar houseboat on Dal Lake",
      "Shikara ride through the floating gardens at dawn",
      "Gulmarg Gondola, phase one and phase two",
      "Betaab Valley and Aru Valley above Pahalgam",
      "Mughal gardens — Nishat, Shalimar and Chashme Shahi",
    ],
    included: [
      "5 nights accommodation including 1 houseboat night",
      "Daily breakfast and dinner",
      "Private vehicle with driver for all transfers and sightseeing",
      "One-hour shikara ride on Dal Lake",
      "All applicable toll, parking and driver charges",
    ],
    excluded: [
      "Flights to and from Srinagar",
      "Gondola tickets at Gulmarg",
      "Union taxi charges at Gulmarg, Pahalgam and Sonmarg",
      "Pony rides, sledges and personal expenses",
    ],
    itinerary: [
      { day: 1, title: "Arrive Srinagar", description: "Airport pickup, check in to your houseboat on Dal Lake, then a late-afternoon shikara ride through the floating gardens." },
      { day: 2, title: "Srinagar & Mughal gardens", description: "Nishat Bagh, Shalimar Bagh and Chashme Shahi in the morning, the Shankaracharya temple viewpoint, and an afternoon in the handicraft markets." },
      { day: 3, title: "Day trip to Gulmarg", description: "Drive up to Gulmarg through pine forest, ride the gondola towards Apharwat, and return to Srinagar in the evening." },
      { day: 4, title: "Srinagar to Pahalgam", description: "Drive via the saffron fields at Pampore and the cricket-bat workshops of Bijbehara, arriving at Pahalgam for a riverside afternoon." },
      { day: 5, title: "Pahalgam valleys", description: "Local taxi into Betaab Valley, Chandanwari and Aru Valley, with plenty of time to sit by the Lidder river." },
      { day: 6, title: "Departure", description: "Drive back to Srinagar, with a final stop at a Kashmiri carpet and shawl showroom before your flight home." },
    ],
    featured: true,
  },
  {
    slug: "himachal-shimla-manali-solang",
    title: "7 Days Himachal: Shimla, Manali & Solang Valley",
    location: { country: "India", destination: "himachal-pradesh" },
    images: gallery("himachal-shimla-manali-solang", "Shimla ridge and Manali valley"),
    price: { amount: 26900, currency: "INR", unit: "per person" },
    duration: { days: 7, nights: 6 },
    groupSize: { min: 2, max: 16 },
    minAge: 4,
    tags: ["Hill Station", "Family", "Adventure"],
    rating: { value: 4.6, count: 192 },
    excerpt:
      "The classic hill circuit — colonial Shimla, the Kullu valley, and snow and paragliding at Solang.",
    overview:
      "Himachal is the hill holiday most Indian families take first, and for good reason: it is easy to reach, cool all summer, and full of things children actually enjoy. This week gives you two nights in Shimla for the Ridge and the toy-train country around it, then three at Manali with a full day up at Solang Valley for snow points, ropeway and adventure activities. Rohtang Pass can be added when the road is open and permits allow — we handle the permit application.",
    highlights: [
      "The Ridge, Mall Road and Christ Church at Shimla",
      "Kufri and the Himalayan Nature Park",
      "Solang Valley ropeway, snow points and paragliding",
      "Hadimba Temple and Old Manali's cafés",
      "River rafting on the Beas at Kullu",
    ],
    included: [
      "6 nights in 3-star hotels",
      "Daily breakfast and dinner",
      "Private air-conditioned vehicle from Chandigarh or Delhi",
      "All toll, parking and driver allowances",
      "Assistance with Rohtang Pass permits where applicable",
    ],
    excluded: [
      "Flights and train tickets",
      "Rohtang Pass permit fee and local union taxi at Solang",
      "Adventure activity charges (paragliding, rafting, skiing)",
      "Lunches and personal expenses",
    ],
    itinerary: [
      { day: 1, title: "Arrive Shimla", description: "Pickup from Chandigarh or Delhi and the drive up to Shimla, ending with an evening stroll on the Mall." },
      { day: 2, title: "Shimla & Kufri", description: "Half day at Kufri for the nature park and viewpoints, then Christ Church, the Ridge and Jakhoo Temple back in town." },
      { day: 3, title: "Shimla to Manali", description: "A long, spectacular drive along the Sutlej and Beas rivers, with stops at Sundernagar Lake and the Pandoh dam." },
      { day: 4, title: "Solang Valley", description: "Full day at Solang for the ropeway, snow point and optional paragliding, zorbing and skiing depending on season." },
      { day: 5, title: "Manali local", description: "Hadimba Temple, Manu Temple, the Vashisht hot springs and an afternoon in Old Manali and the Mall." },
      { day: 6, title: "Kullu & Naggar", description: "Drive down the valley for river rafting at Kullu, a shawl-weaving unit visit and Naggar Castle." },
      { day: 7, title: "Departure", description: "Drive back to Chandigarh or Delhi for your onward flight or train." },
    ],
    featured: false,
  },
  {
    slug: "uttarakhand-nainital-mussoorie-rishikesh",
    title: "7 Days Uttarakhand: Nainital, Mussoorie & Rishikesh",
    location: { country: "India", destination: "uttarakhand" },
    images: gallery("uttarakhand-nainital-mussoorie-rishikesh", "Nainital lake and Rishikesh riverside"),
    price: { amount: 24500, currency: "INR", unit: "per person" },
    duration: { days: 7, nights: 6 },
    groupSize: { min: 2, max: 16 },
    minAge: 5,
    tags: ["Hill Station", "Family", "Nature"],
    rating: { value: 4.5, count: 134 },
    excerpt:
      "Two lake and ridge towns, a Corbett safari morning, and the Ganga aarti at Rishikesh to finish.",
    overview:
      "Uttarakhand packs a remarkable amount into a short drive from Delhi: boating on Naini Lake, tiger country at Corbett, the ridge walks above Mussoorie, and the river at Rishikesh where the Ganga leaves the mountains. This week strings them together at a gentle pace, which makes it one of our better options for travelling with young children or with grandparents along.",
    highlights: [
      "Boating on Naini Lake and the Snow View ropeway",
      "Jeep safari in Jim Corbett National Park",
      "Kempty Falls, Gun Hill and Camel's Back Road at Mussoorie",
      "Ganga aarti at Triveni Ghat, Rishikesh",
      "Laxman Jhula, Ram Jhula and optional river rafting",
    ],
    included: [
      "6 nights in 3-star hotels and resorts",
      "Daily breakfast and dinner",
      "Private air-conditioned vehicle from Delhi",
      "One shared jeep safari at Corbett with permit",
      "All toll, parking and driver allowances",
    ],
    excluded: ["Flights and train tickets", "Rafting and adventure activity charges", "Ropeway and boating tickets", "Lunches and personal expenses"],
    itinerary: [
      { day: 1, title: "Delhi to Nainital", description: "Early start from Delhi, arriving at Nainital by late afternoon for a boat ride on the lake and an evening on the Mall." },
      { day: 2, title: "Nainital lakes", description: "The lake district circuit — Sattal, Bhimtal and Naukuchiatal — plus the Snow View ropeway and Naina Devi temple." },
      { day: 3, title: "Nainital to Corbett", description: "Drive to Ramnagar, check in to a riverside resort and take an evening nature walk along the buffer zone." },
      { day: 4, title: "Corbett safari & on to Mussoorie", description: "Morning jeep safari in the park, then the drive west to Mussoorie, arriving for dinner." },
      { day: 5, title: "Mussoorie", description: "Kempty Falls, Gun Hill by ropeway, Company Garden and a walk along Camel's Back Road at sunset." },
      { day: 6, title: "Mussoorie to Rishikesh", description: "Drive down to Rishikesh via Dehradun, visit Laxman Jhula and Ram Jhula, and attend the evening Ganga aarti." },
      { day: 7, title: "Departure", description: "Optional morning rafting on the Shivpuri stretch, then transfer to Dehradun airport or Haridwar station." },
    ],
    featured: false,
  },
  {
    slug: "goa-beach-break",
    title: "5 Days Goa: North Beaches & Old Goa",
    location: { country: "India", destination: "goa" },
    images: gallery("goa-beach-break", "Goa beaches and Portuguese quarter"),
    price: { amount: 18900, currency: "INR", unit: "per person" },
    duration: { days: 5, nights: 4 },
    groupSize: { min: 2, max: 20 },
    minAge: 0,
    tags: ["Beach", "Short Break"],
    rating: { value: 4.6, count: 301 },
    excerpt:
      "Four nights on the north Goa coast, with the old Portuguese quarter, a sunset river cruise and a day trip to Dudhsagar Falls.",
    overview:
      "Goa works well as a first holiday or a family break, which is why it is the package we sell most of. This one bases you in the north — Baga and Calangute for the shacks, markets and water sports — and adds the things people regret missing: the churches and Latin Quarter of Old Goa and Panjim, a Mandovi river cruise at sunset, and a full day out at Dudhsagar Falls. Ask us to shift the base south to Palolem or Colva if you would rather have quiet sand.",
    highlights: [
      "Baga, Calangute and Anjuna beaches",
      "Water sports package — jet ski, banana boat and parasailing",
      "Basilica of Bom Jesus and Se Cathedral at Old Goa",
      "Fontainhas, Panjim's Latin Quarter, on foot",
      "Sunset cruise on the Mandovi river",
    ],
    included: [
      "4 nights in a 3-star or 4-star beach-side hotel",
      "Daily breakfast",
      "Airport and railway transfers",
      "North Goa and Old Goa sightseeing by private vehicle",
      "Sunset Mandovi river cruise ticket",
    ],
    excluded: ["Flights and train tickets", "Water sports and Dudhsagar jeep charges", "Lunches and dinners", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Goa", description: "Airport or station pickup, check in near Baga, and an evening at the beach shacks for sunset." },
      { day: 2, title: "North Goa", description: "Calangute, Baga and Anjuna beaches with an optional water sports package, then Aguada Fort and the Saturday night market if your dates align." },
      { day: 3, title: "Old Goa & Panjim", description: "The Basilica of Bom Jesus and Se Cathedral, a walk through Fontainhas, and a sunset cruise on the Mandovi." },
      { day: 4, title: "Dudhsagar Falls", description: "Full-day excursion to Dudhsagar by jeep through the Bhagwan Mahaveer sanctuary, with a spice plantation lunch stop." },
      { day: 5, title: "Departure", description: "A last morning on the sand before your transfer to Dabolim or Mopa airport." },
    ],
    featured: true,
  },
  {
    slug: "sikkim-gangtok-pelling-lachung",
    title: "7 Days Sikkim: Gangtok, Pelling & Lachung",
    location: { city: "Gangtok", country: "India", destination: "sikkim" },
    images: gallery("sikkim-gangtok-pelling-lachung", "Sikkim monasteries and Kanchenjunga"),
    price: { amount: 29900, currency: "INR", unit: "per person" },
    duration: { days: 7, nights: 6 },
    groupSize: { min: 2, max: 14 },
    minAge: 8,
    tags: ["Hill Station", "Nature", "Culture"],
    rating: { value: 4.7, count: 96 },
    excerpt:
      "Alpine lakes on the Nathu La road, monasteries above the clouds, and sunrise on Kanchenjunga from two different valleys.",
    overview:
      "Sikkim gives you Himalayan scale without Himalayan effort — the roads do the climbing. This week runs Gangtok for Tsomgo Lake and Rumtek, north to Lachung for the Yumthang valley, then west to Pelling for the closest views of Kanchenjunga and the old monastery at Pemayangtse. Permits for the north and for the Nathu La road are arranged for you; carry photo ID and passport-size photographs.",
    highlights: [
      "Tsomgo Lake and Baba Mandir on the Nathu La road",
      "Rumtek Monastery, seat of the Karmapa",
      "Yumthang Valley and the Zero Point road from Lachung",
      "Sunrise over Kanchenjunga from Pelling",
      "Pemayangtse Monastery and the Rabdentse ruins",
    ],
    included: [
      "6 nights in hotels and a Lachung guesthouse",
      "Daily breakfast and dinner",
      "Shared or private vehicle as per sector, with driver",
      "North Sikkim and Tsomgo Lake permits",
      "All toll, parking and driver allowances",
    ],
    excluded: ["Flights to Bagdogra or train to NJP", "Zero Point extra charges", "Lunches", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Bagdogra to Gangtok", description: "Pickup at Bagdogra or NJP and the four-hour drive up the Teesta valley to Gangtok, with an evening on MG Marg." },
      { day: 2, title: "Tsomgo Lake & Baba Mandir", description: "Day excursion on the Nathu La road to the frozen-in-winter Tsomgo Lake and Baba Harbhajan Singh Mandir." },
      { day: 3, title: "Gangtok to Lachung", description: "Drive north through waterfall country to Lachung, at 8,600 ft, arriving in the late afternoon." },
      { day: 4, title: "Yumthang Valley & back to Gangtok", description: "Early run up to the Yumthang Valley of Flowers and the hot springs, then the long drive back to Gangtok." },
      { day: 5, title: "Gangtok to Pelling", description: "Cross west via Rumtek Monastery and the Namchi Char Dham complex, arriving at Pelling for sunset." },
      { day: 6, title: "Pelling sightseeing", description: "Sunrise on Kanchenjunga, then Pemayangtse Monastery, the Rabdentse ruins, Khecheopalri Lake and the Sky Walk." },
      { day: 7, title: "Departure", description: "Drive down to Bagdogra or NJP for your onward flight or train." },
    ],
    featured: false,
  },
  {
    slug: "meghalaya-shillong-cherrapunji-dawki",
    title: "6 Days Meghalaya: Shillong, Cherrapunji & Dawki",
    location: { city: "Shillong", country: "India", destination: "meghalaya" },
    images: gallery("meghalaya-shillong-cherrapunji-dawki", "Meghalaya root bridges and Umngot river"),
    price: { amount: 27500, currency: "INR", unit: "per person" },
    duration: { days: 6, nights: 5 },
    groupSize: { min: 2, max: 14 },
    minAge: 10,
    tags: ["Nature", "Adventure", "Culture"],
    rating: { value: 4.8, count: 88 },
    excerpt:
      "Living root bridges, the waterfall belt around Cherrapunji, and the glass-clear Umngot river at Dawki.",
    overview:
      "Meghalaya is the trip people come back from with the best photographs. The double-decker living root bridge at Nongriat is a real descent — around 3,000 steps down and the same back up — and we build a full day around it. The rest of the week is gentler: the waterfall belt at Cherrapunji, the limestone caves, the boats that appear to float on air at Dawki, and Mawlynnong, which made its name as Asia's cleanest village.",
    highlights: [
      "Double-decker living root bridge trek at Nongriat",
      "Nohkalikai, Seven Sisters and Elephant falls",
      "Boating on the transparent Umngot river at Dawki",
      "Mawlynnong village and its single-decker root bridge",
      "Mawsmai and Arwah limestone caves",
    ],
    included: [
      "5 nights in hotels and homestays",
      "Daily breakfast and dinner",
      "Private vehicle with driver from Guwahati",
      "Local guide for the Nongriat trek",
      "All permits, toll and parking charges",
    ],
    excluded: ["Flights to Guwahati", "Dawki boat charges", "Lunches", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Guwahati to Shillong", description: "Pickup at Guwahati airport and the drive up to Shillong via Umiam Lake, arriving for an evening on Police Bazaar." },
      { day: 2, title: "Shillong to Cherrapunji", description: "Elephant Falls and Shillong Peak, then the drive to Cherrapunji for Nohkalikai Falls and the Mawsmai caves." },
      { day: 3, title: "Nongriat root bridge trek", description: "A full day trek from Tyrna down to the double-decker living root bridge and the rainbow falls, returning to Cherrapunji by evening." },
      { day: 4, title: "Dawki & Mawlynnong", description: "Drive to the Bangladesh border at Dawki for a boat ride on the Umngot, then Mawlynnong village and its root bridge." },
      { day: 5, title: "Mawphlang & Shillong", description: "The sacred forest at Mawphlang with a Khasi guide, then back to Shillong for the Don Bosco museum and last shopping." },
      { day: 6, title: "Departure", description: "Drive down to Guwahati, with an optional stop at the Kamakhya temple, for your onward flight." },
    ],
    featured: true,
  },
  {
    slug: "arunachal-tawang-bomdila",
    title: "8 Days Arunachal: Tawang, Sela Pass & Bomdila",
    location: { city: "Tawang", country: "India", destination: "arunachal-pradesh" },
    images: gallery("arunachal-tawang-bomdila", "Tawang monastery and Sela Pass"),
    price: { amount: 36500, currency: "INR", unit: "per person" },
    duration: { days: 8, nights: 7 },
    groupSize: { min: 2, max: 12 },
    minAge: 12,
    tags: ["Adventure", "Culture", "Nature"],
    rating: { value: 4.7, count: 41 },
    excerpt:
      "India's far northeastern frontier — the largest monastery in the country, a 13,700 ft pass, and valleys almost nobody visits.",
    overview:
      "This is the most remote trip we run, and the one regular travellers ask for once they have done the rest of the Northeast. The road to Tawang climbs over Sela Pass at 13,700 ft, past Paradise Lake and the Jaswant Garh memorial, and finishes at a monastery complex founded in the 1680s that is still the largest in India. Distances are long and the roads are mountain roads, so we keep the group small and the driving days sensible. Inner Line Permits are arranged for you — send scanned ID at least two weeks ahead.",
    highlights: [
      "Tawang Monastery, the largest in India",
      "Sela Pass at 13,700 ft and Paradise Lake",
      "Jaswant Garh war memorial and the 1962 battlefield road",
      "Dirang valley, its hot springs and apple orchards",
      "Nuranang Falls and the Tawang war memorial",
    ],
    included: [
      "7 nights in hotels and guesthouses",
      "Daily breakfast and dinner",
      "Private 4x4 vehicle with mountain-experienced driver",
      "Inner Line Permit processing",
      "All toll, parking and driver allowances",
    ],
    excluded: ["Flights to Guwahati", "Lunches", "Personal expenses and tips", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Guwahati to Bhalukpong", description: "Pickup at Guwahati and the drive east to Bhalukpong on the Assam–Arunachal border, where permits are checked." },
      { day: 2, title: "Bhalukpong to Dirang", description: "Climb through Bomdila to the Dirang valley, stopping at the Bomdila monastery and viewpoint." },
      { day: 3, title: "Dirang to Tawang", description: "The big day — over Sela Pass and Paradise Lake, past Jaswant Garh and Nuranang Falls, into Tawang by evening." },
      { day: 4, title: "Tawang monastery", description: "A full day at the monastery complex and museum, the Tawang war memorial, and the craft centre." },
      { day: 5, title: "Bum La & the high lakes", description: "Permit-dependent excursion towards Bum La pass, Sangetsar (Madhuri) Lake and the P.T. Tso lake." },
      { day: 6, title: "Tawang to Dirang", description: "Retrace the pass road with time for photographs you were too cold to take on the way up, overnighting at Dirang." },
      { day: 7, title: "Dirang to Nameri or Tezpur", description: "Descend to the plains, with a stop at the Dirang hot springs and the yak research centre." },
      { day: 8, title: "Departure", description: "Drive to Guwahati airport for your onward flight." },
    ],
    featured: false,
  },
  {
    slug: "andaman-port-blair-havelock-neil",
    title: "6 Days Andaman: Port Blair, Havelock & Neil Island",
    location: { city: "Port Blair", country: "India", destination: "andaman-nicobar" },
    images: gallery("andaman-port-blair-havelock-neil", "Andaman beaches and coral reefs"),
    price: { amount: 32900, currency: "INR", unit: "per person" },
    duration: { days: 6, nights: 5 },
    groupSize: { min: 2, max: 16 },
    minAge: 4,
    tags: ["Beach", "Island"],
    rating: { value: 4.8, count: 176 },
    excerpt:
      "Radhanagar Beach, coral at Elephant Beach, and the natural rock bridge at Neil — an island week with no visa required.",
    overview:
      "The Andamans give Indian travellers a genuine tropical island holiday without a passport, and the water at Havelock is as clear as anywhere in Southeast Asia. This itinerary keeps the ferry days short: two nights at Havelock for Radhanagar and the snorkelling at Elephant Beach, one at Neil for the coral bridge and Bharatpur, and two in Port Blair bracketing the trip for the Cellular Jail and North Bay. Scuba for first-timers can be added at Havelock.",
    highlights: [
      "Radhanagar Beach, regularly rated Asia's best",
      "Snorkelling and optional scuba at Elephant Beach",
      "Natural coral bridge and Laxmanpur Beach at Neil",
      "Cellular Jail light-and-sound show",
      "Glass-bottom boat over the reefs at North Bay",
    ],
    included: [
      "5 nights in beach resorts and hotels",
      "Daily breakfast",
      "Private and shared ferry tickets between the islands",
      "All island transfers and sightseeing",
      "Cellular Jail light-and-sound show tickets",
    ],
    excluded: ["Flights to Port Blair", "Scuba diving and water sports charges", "Lunches and dinners", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Port Blair", description: "Airport pickup and check-in, Corbyn's Cove beach in the afternoon, and the Cellular Jail light-and-sound show after dark." },
      { day: 2, title: "Port Blair to Havelock", description: "Morning ferry to Havelock, check in, then sunset at Radhanagar Beach." },
      { day: 3, title: "Elephant Beach", description: "Boat out to Elephant Beach for snorkelling and optional water sports, with the afternoon free on the sand." },
      { day: 4, title: "Havelock to Neil", description: "Ferry to Neil Island, then Bharatpur Beach, Laxmanpur Beach and the natural coral bridge at low tide." },
      { day: 5, title: "Neil to Port Blair", description: "Return ferry, then Ross Island and the North Bay glass-bottom boat, ending at the Samudrika naval museum." },
      { day: 6, title: "Departure", description: "Free morning for Aberdeen Bazaar before your transfer to Port Blair airport." },
    ],
    featured: true,
  },
  {
    slug: "kerala-munnar-alleppey-kovalam",
    title: "7 Days Kerala: Munnar, Alleppey Houseboat & Kovalam",
    location: { country: "India", destination: "kerala" },
    images: gallery("kerala-munnar-alleppey-kovalam", "Kerala tea hills and backwaters"),
    price: { amount: 31500, currency: "INR", unit: "per person" },
    duration: { days: 7, nights: 6 },
    groupSize: { min: 2, max: 16 },
    minAge: 0,
    tags: ["Nature", "Beach"],
    rating: { value: 4.9, count: 248 },
    excerpt:
      "Tea hills, a night on a private houseboat through the backwaters, and beach time at Kovalam to finish.",
    overview:
      "Kerala is the most relaxed week in India. You start in the tea estates at Munnar, cross to Thekkady for the Periyar sanctuary, then spend a night on a private houseboat drifting through the Alleppey backwaters — rice fields on both banks, meals cooked on board. The last two nights are on the coast at Kovalam. Everything is by private vehicle, with the same driver throughout.",
    highlights: [
      "Tea estates, Mattupetty dam and Eravikulam park at Munnar",
      "Boat safari on Periyar lake at Thekkady",
      "Overnight private houseboat through the Alleppey backwaters",
      "Kathakali and Kalaripayattu performance",
      "Lighthouse Beach and an Ayurvedic massage at Kovalam",
    ],
    included: [
      "5 nights in hotels and resorts plus 1 night on a private houseboat",
      "Daily breakfast, and all meals on the houseboat",
      "Private air-conditioned vehicle with driver for 7 days",
      "Periyar lake boat safari tickets",
      "Kathakali performance tickets",
    ],
    excluded: ["Flights and train tickets", "Lunches and dinners outside the houseboat", "Ayurvedic treatments", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Kochi", description: "Airport pickup, a walk around Fort Kochi and the Chinese fishing nets, and an evening Kathakali performance." },
      { day: 2, title: "Kochi to Munnar", description: "Drive up into the hills past Cheeyappara waterfalls and spice gardens, arriving at Munnar in the afternoon." },
      { day: 3, title: "Munnar sightseeing", description: "Eravikulam National Park, Mattupetty dam, Echo Point, the tea museum and a plantation walk." },
      { day: 4, title: "Munnar to Thekkady", description: "Cross to Thekkady for a boat safari on Periyar lake and a spice plantation tour." },
      { day: 5, title: "Alleppey houseboat", description: "Drive to Alleppey and board your private houseboat at noon for a slow afternoon through the backwaters; dinner and overnight on board." },
      { day: 6, title: "Alleppey to Kovalam", description: "Disembark after breakfast and drive south to Kovalam, with the afternoon free on Lighthouse Beach." },
      { day: 7, title: "Departure", description: "A last morning by the sea before your transfer to Trivandrum airport." },
    ],
    featured: true,
  },
  {
    slug: "gujarat-rann-somnath-gir",
    title: "8 Days Gujarat: Rann of Kutch, Somnath & Gir",
    location: { country: "India", destination: "gujarat" },
    images: gallery("gujarat-rann-somnath-gir", "White Rann of Kutch and Gir lions"),
    price: { amount: 33900, currency: "INR", unit: "per person" },
    duration: { days: 8, nights: 7 },
    groupSize: { min: 2, max: 16 },
    minAge: 6,
    tags: ["Wildlife", "Heritage", "Culture"],
    rating: { value: 4.6, count: 72 },
    excerpt:
      "The white salt desert at Kutch, the last wild Asiatic lions at Gir, and the temple coast at Somnath and Dwarka.",
    overview:
      "Gujarat sits right next door to us and is still badly under-travelled. This loop takes in the three things that make it worth a week: the White Rann of Kutch, a salt desert that turns silver under a full moon; Gir, the only place on earth with wild Asiatic lions; and the temple towns of Somnath and Dwarka on the Saurashtra coast. We time the Kutch leg to a full moon wherever your dates allow, and the handicraft villages around Bhuj are worth a day on their own.",
    highlights: [
      "White Rann of Kutch, best on a full-moon night",
      "Asiatic lion jeep safari at Gir National Park",
      "Somnath, one of the twelve Jyotirlingas",
      "Dwarkadhish Temple and Bet Dwarka",
      "Kutchi embroidery and Rogan art villages around Bhuj",
    ],
    included: [
      "7 nights in hotels and a Kutch tent resort",
      "Daily breakfast and dinner",
      "Private air-conditioned vehicle with driver for 8 days",
      "One shared jeep safari at Gir with permit",
      "Rann of Kutch permit and entry",
    ],
    excluded: ["Flights and train tickets", "Additional safari permits", "Lunches", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Ahmedabad", description: "Pickup and check-in, then the Sabarmati Ashram and an evening food walk through Manek Chowk." },
      { day: 2, title: "Ahmedabad to Bhuj", description: "Drive west to Bhuj, stopping at the Modhera sun temple and Patan's Rani ki Vav stepwell if time allows." },
      { day: 3, title: "White Rann of Kutch", description: "Handicraft villages at Hodka and Nirona in the day, then out to the White Rann for sunset and moonrise over the salt." },
      { day: 4, title: "Bhuj to Dwarka", description: "The long coastal drive south to Dwarka, arriving for the evening aarti at the Dwarkadhish temple." },
      { day: 5, title: "Dwarka & Bet Dwarka", description: "Boat across to Bet Dwarka, then Nageshwar Jyotirlinga and Rukmini temple before driving on to Somnath." },
      { day: 6, title: "Somnath to Gir", description: "Morning at the Somnath temple and its light-and-sound show, then a short drive to Sasan Gir." },
      { day: 7, title: "Gir lion safari", description: "Early jeep safari in Gir National Park, with the afternoon free at the resort or at the Devalia interpretation zone." },
      { day: 8, title: "Departure", description: "Drive to Rajkot or Ahmedabad for your onward flight or train." },
    ],
    featured: false,
  },

  // ——————————————————————————— International ———————————————————————————
  {
    slug: "dubai-city-desert-abu-dhabi",
    title: "5 Days Dubai: City, Desert Safari & Abu Dhabi",
    location: { city: "Dubai", country: "United Arab Emirates", destination: "dubai" },
    images: gallery("dubai-city-desert-abu-dhabi", "Dubai skyline and desert safari"),
    price: { amount: 58900, currency: "INR", unit: "per person" },
    duration: { days: 5, nights: 4 },
    groupSize: { min: 2, max: 20 },
    minAge: 3,
    tags: ["City Break", "Family", "Desert"],
    rating: { value: 4.7, count: 322 },
    excerpt:
      "Burj Khalifa, an evening in the dunes, a dhow cruise dinner and a full day across to Abu Dhabi.",
    overview:
      "For most of our clients Dubai is the first trip abroad, and it is an easy one — a short flight, no jet lag, no language barrier and a visa we process for you. Four nights covers the city comfortably: the Burj Khalifa and the Dubai Mall fountain, the old souks across the creek, an evening desert safari with dune bashing and a BBQ camp, a dhow cruise, and a day trip to Abu Dhabi for the Sheikh Zayed Grand Mosque. Add Miracle Garden, the Global Village or a theme park day on request.",
    highlights: [
      "Burj Khalifa observation deck, levels 124 and 125",
      "Evening desert safari with dune bashing, camel ride and BBQ dinner",
      "Dhow cruise dinner with a tanoura show",
      "Sheikh Zayed Grand Mosque at Abu Dhabi",
      "Dubai Marina, Palm Jumeirah and the Gold Souk",
    ],
    included: [
      "4 nights in a 3-star or 4-star Dubai hotel",
      "Daily breakfast",
      "UAE tourist visa processing",
      "Airport transfers, city tour, desert safari, dhow cruise and Abu Dhabi day trip",
      "Burj Khalifa level 124/125 tickets",
    ],
    excluded: ["International flights", "Travel insurance", "Lunches and dinners not listed", "Tourism Dirham city tax payable at the hotel"],
    itinerary: [
      { day: 1, title: "Arrive Dubai", description: "Airport pickup and hotel check-in, with the evening free at the Dubai Mall and the fountain show." },
      { day: 2, title: "Dubai city tour & dhow cruise", description: "Jumeirah Mosque, the Dubai Frame, the Gold and Spice Souks by abra, and Burj Khalifa in the afternoon, followed by a dhow cruise dinner." },
      { day: 3, title: "Desert safari", description: "Morning free for Palm Jumeirah and the Marina, then an afternoon 4x4 desert safari with dune bashing, camel rides, henna and a BBQ dinner under the stars." },
      { day: 4, title: "Abu Dhabi day trip", description: "Full day across to Abu Dhabi for the Sheikh Zayed Grand Mosque, the Corniche and a Ferrari World or Louvre Abu Dhabi stop." },
      { day: 5, title: "Departure", description: "Last-minute shopping before your airport transfer and flight home." },
    ],
    featured: true,
  },
  {
    slug: "maldives-overwater-escape",
    title: "5 Days Maldives: Overwater Escape",
    location: { country: "Maldives", destination: "maldives" },
    images: gallery("maldives-overwater-escape", "Maldives overwater villas and reef"),
    price: { amount: 89500, currency: "INR", unit: "per person" },
    duration: { days: 5, nights: 4 },
    groupSize: { min: 2, max: 8 },
    minAge: 0,
    tags: ["Beach", "Island"],
    rating: { value: 4.9, count: 158 },
    excerpt:
      "Four nights on a private resort island, with a house reef off your deck and a sandbank dinner in the middle.",
    overview:
      "The Maldives is the overwater-villa escape our clients ask for by name, and the logistics are simpler than people expect: a four-hour flight, visa on arrival, and a speedboat or seaplane from Malé straight to your resort island. This package covers four nights in a beach or overwater villa on half board, all resort transfers, a sunset dolphin cruise and a private sandbank picnic. Tell us your budget and we will match the resort to it — the range between islands here is enormous.",
    highlights: [
      "Beach or overwater villa on a private resort island",
      "Snorkelling on the house reef straight from your deck",
      "Sunset dolphin cruise",
      "Private sandbank picnic and a candlelit beach dinner",
      "Seaplane or speedboat transfers arranged end to end",
    ],
    included: [
      "4 nights in a beach or overwater villa",
      "Half board — daily breakfast and dinner",
      "Return speedboat or seaplane resort transfers",
      "Sunset dolphin cruise and one sandbank picnic",
      "Green tax and service charges",
    ],
    excluded: ["International flights", "Lunches and alcoholic drinks", "Scuba diving and excursions not listed", "Travel insurance"],
    itinerary: [
      { day: 1, title: "Arrive Malé & resort transfer", description: "Met at Velana International Airport and transferred by speedboat or seaplane to your resort island; afternoon free in the villa." },
      { day: 2, title: "House reef & sandbank", description: "Snorkelling on the house reef in the morning, then a private sandbank picnic in the afternoon." },
      { day: 3, title: "Dolphin cruise", description: "A free day for the spa, the pool or the water-sports centre, ending with a sunset dolphin cruise." },
      { day: 4, title: "Island day", description: "Optional excursions — a local island visit, a fishing trip or a dive — and a candlelit dinner on the beach." },
      { day: 5, title: "Departure", description: "Transfer back to Malé for your flight home." },
    ],
    featured: true,
  },
  {
    slug: "vietnam-hanoi-halong-danang-saigon",
    title: "8 Days Vietnam: Hanoi, Halong Bay, Da Nang & Saigon",
    location: { country: "Vietnam", destination: "vietnam" },
    images: gallery("vietnam-hanoi-halong-danang-saigon", "Halong Bay karsts and Hoi An lanterns"),
    price: { amount: 74900, currency: "INR", unit: "per person" },
    duration: { days: 8, nights: 7 },
    groupSize: { min: 2, max: 16 },
    minAge: 6,
    tags: ["Culture", "Beach", "Family"],
    rating: { value: 4.8, count: 141 },
    excerpt:
      "North to south in a week — the Old Quarter, an overnight cruise in Halong Bay, lantern-lit Hoi An and the Mekong Delta.",
    overview:
      "Vietnam has quietly become our best-selling Southeast Asia trip, and the reason is value: the food, the scenery and the hotels all cost a fraction of what the equivalent would elsewhere. This itinerary runs the length of the country — two nights in Hanoi and the Old Quarter, an overnight cruise among the limestone karsts of Halong Bay, the beaches at Da Nang with a day in Hoi An, and Ho Chi Minh City for the Cu Chi tunnels and the Mekong Delta. Domestic flights between the three regions are included.",
    highlights: [
      "Overnight cruise among the karsts of Halong Bay",
      "Hanoi Old Quarter street-food walk and the water puppet show",
      "Lantern-lit old town and tailor shops of Hoi An",
      "Golden Bridge at Ba Na Hills",
      "Cu Chi tunnels and a Mekong Delta boat trip",
    ],
    included: [
      "7 nights — 5 in hotels, 1 on a Halong Bay cruise, 1 in Saigon",
      "Daily breakfast, plus all meals on the cruise",
      "Two internal flights (Hanoi–Da Nang, Da Nang–Ho Chi Minh City)",
      "Vietnam e-visa processing",
      "All airport transfers, sightseeing and entrance fees listed",
    ],
    excluded: ["International flights", "Lunches and dinners not listed", "Ba Na Hills cable car ticket", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Hanoi", description: "Airport pickup and check-in, then an evening street-food walk through the Old Quarter and around Hoan Kiem Lake." },
      { day: 2, title: "Hanoi city", description: "Ho Chi Minh Mausoleum, the One Pillar Pagoda, the Temple of Literature and the Train Street, ending with a water puppet show." },
      { day: 3, title: "Halong Bay cruise", description: "Drive to Halong and board an overnight cruise — kayaking, a cave visit, sunset on the top deck and dinner on board." },
      { day: 4, title: "Halong to Da Nang", description: "Brunch on board, return to Hanoi and fly to Da Nang for a beachfront evening." },
      { day: 5, title: "Ba Na Hills & Hoi An", description: "Cable car up to Ba Na Hills and the Golden Bridge, then on to Hoi An for the lantern-lit old town after dark." },
      { day: 6, title: "Da Nang to Ho Chi Minh City", description: "Morning at Marble Mountain and My Khe beach, then the flight south to Saigon." },
      { day: 7, title: "Cu Chi & the Mekong", description: "Cu Chi tunnels in the morning, then a Mekong Delta boat trip with a village lunch." },
      { day: 8, title: "Departure", description: "The Reunification Palace, the War Remnants Museum and Ben Thanh Market before your airport transfer." },
    ],
    featured: true,
  },
  {
    slug: "malaysia-kl-genting-langkawi",
    title: "6 Days Malaysia: Kuala Lumpur, Genting & Langkawi",
    location: { city: "Kuala Lumpur", country: "Malaysia", destination: "malaysia" },
    images: gallery("malaysia-kl-genting-langkawi", "Kuala Lumpur towers and Langkawi coast"),
    price: { amount: 62500, currency: "INR", unit: "per person" },
    duration: { days: 6, nights: 5 },
    groupSize: { min: 2, max: 20 },
    minAge: 3,
    tags: ["Family", "City Break", "Island"],
    rating: { value: 4.6, count: 127 },
    excerpt:
      "Twin Towers and Batu Caves, a hill day at Genting, and two nights of island time at Langkawi.",
    overview:
      "Malaysia is the easiest family trip in Southeast Asia — English is widely spoken, Indian food is everywhere, and the distances are short. Three nights in Kuala Lumpur cover the Twin Towers, Batu Caves and a day up at Genting Highlands for the cable car and theme park, then a short flight takes you to Langkawi for the Sky Bridge, island-hopping and the beach at Pantai Cenang. Singapore can be added as a two-night extension.",
    highlights: [
      "Petronas Twin Towers skybridge and the KL Tower deck",
      "Batu Caves and its 272 coloured steps",
      "Awana SkyWay cable car and Genting Highlands",
      "Langkawi Sky Bridge and the Panorama cable car",
      "Island-hopping boat trip to Dayang Bunting and Beras Basah",
    ],
    included: [
      "5 nights in 3-star or 4-star hotels",
      "Daily breakfast",
      "Internal flight Kuala Lumpur to Langkawi",
      "All airport transfers and sightseeing by coach or private vehicle",
      "Genting cable car, Sky Bridge and island-hopping tickets",
    ],
    excluded: ["International flights", "Malaysia visa fee", "Lunches and dinners", "Theme park entry and personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive Kuala Lumpur", description: "Airport pickup and check-in, with the evening free at the KLCC park fountain show." },
      { day: 2, title: "KL city tour", description: "Batu Caves, the National Mosque, Merdeka Square, the King's Palace and a photo stop at the Twin Towers, plus the KL Tower deck." },
      { day: 3, title: "Genting Highlands", description: "Day trip up to Genting by Awana SkyWay cable car, with the theme park, Chin Swee temple and the hill resort strip." },
      { day: 4, title: "Fly to Langkawi", description: "Morning flight to Langkawi, then the Panorama cable car and Sky Bridge, and sunset at Pantai Cenang." },
      { day: 5, title: "Island hopping", description: "Boat trip to the Lake of the Pregnant Maiden, the eagle-feeding point and Beras Basah island, with the afternoon free on the beach." },
      { day: 6, title: "Departure", description: "Duty-free shopping in Kuah town before your airport transfer and flight home." },
    ],
    featured: false,
  },
  {
    slug: "sri-lanka-colombo-kandy-bentota",
    title: "7 Days Sri Lanka: Colombo, Kandy, Nuwara Eliya & Bentota",
    location: { city: "Colombo", country: "Sri Lanka", destination: "sri-lanka" },
    images: gallery("sri-lanka-colombo-kandy-bentota", "Sri Lanka tea country and coast"),
    price: { amount: 68900, currency: "INR", unit: "per person" },
    duration: { days: 7, nights: 6 },
    groupSize: { min: 2, max: 16 },
    minAge: 4,
    tags: ["Culture", "Wildlife", "Beach"],
    rating: { value: 4.7, count: 103 },
    excerpt:
      "Tea country by train, elephants at Udawalawe, the Temple of the Tooth, and three days on the southern coast.",
    overview:
      "Sri Lanka is a short hop from South India and fits an extraordinary variety into one small island — you can be in tea country in the morning and on a beach by evening. This week runs Colombo to Kandy for the Temple of the Tooth, up into the hills at Nuwara Eliya with the famous hill train leg, down to Udawalawe for an elephant safari, and finishes at Bentota on the coast. Visa (ETA) processing is included.",
    highlights: [
      "Temple of the Sacred Tooth Relic at Kandy",
      "Hill train from Nanu Oya through the tea estates",
      "Elephant safari at Udawalawe National Park",
      "Pinnawala elephant orphanage and a tea factory visit",
      "Madu river boat safari and the beach at Bentota",
    ],
    included: [
      "6 nights in 3-star and 4-star hotels",
      "Daily breakfast and dinner",
      "Private air-conditioned vehicle with English-speaking chauffeur-guide",
      "Sri Lanka ETA visa processing",
      "One hill train leg and one Udawalawe jeep safari",
    ],
    excluded: ["International flights", "Lunches", "Entrance fees not listed", "Personal expenses and tips"],
    itinerary: [
      { day: 1, title: "Arrive Colombo", description: "Airport pickup, a city orientation drive past Galle Face Green and the Gangaramaya temple, and check-in." },
      { day: 2, title: "Colombo to Kandy", description: "Drive via the Pinnawala elephant orphanage and a spice garden at Matale, arriving for the evening puja at the Temple of the Tooth." },
      { day: 3, title: "Kandy to Nuwara Eliya", description: "The Royal Botanical Gardens at Peradeniya, then up into the hills with a tea factory stop and the hill train leg from Nanu Oya." },
      { day: 4, title: "Nuwara Eliya to Udawalawe", description: "Gregory Lake and the colonial town in the morning, then the descent south to Udawalawe." },
      { day: 5, title: "Safari & on to Bentota", description: "Early jeep safari at Udawalawe for wild elephants, then drive to Bentota on the southwest coast." },
      { day: 6, title: "Bentota & Galle", description: "Madu river boat safari and a turtle hatchery in the morning, then the Dutch fort at Galle in the afternoon." },
      { day: 7, title: "Departure", description: "A last morning on the beach before your transfer to Colombo airport." },
    ],
    featured: false,
  },
  {
    slug: "europe-paris-switzerland-rome",
    title: "10 Days Europe: Paris, Switzerland & Rome",
    location: { country: "France, Switzerland & Italy", destination: "europe" },
    images: gallery("europe-paris-switzerland-rome", "Paris, Swiss Alps and Rome"),
    price: { amount: 245000, currency: "INR", unit: "per person" },
    duration: { days: 10, nights: 9 },
    groupSize: { min: 2, max: 24 },
    minAge: 5,
    tags: ["Heritage", "Family", "Group"],
    rating: { value: 4.8, count: 89 },
    excerpt:
      "The trip families save up for — the Eiffel Tower, Jungfraujoch and the Colosseum on one itinerary, with visa support throughout.",
    overview:
      "This is the classic first Europe itinerary, and we run it the way it should be run: three nights in Paris, three in the Swiss Alps at Interlaken or Lucerne, and three in Italy, with fast rail between the countries rather than a coach grinding down the motorway. Schengen visa documentation is the part most people dread, so we handle the appointment, the cover letter, the itinerary proof and the insurance. Indian meals are arranged at dinner in all three countries.",
    highlights: [
      "Eiffel Tower, a Seine cruise and the Louvre in Paris",
      "Disneyland Paris day, optional",
      "Jungfraujoch — the Top of Europe — and Mount Titlis",
      "Lake Lucerne cruise and the Chapel Bridge",
      "Colosseum, Vatican Museums and the Trevi Fountain in Rome",
    ],
    included: [
      "9 nights in 3-star and 4-star hotels",
      "Daily breakfast and Indian dinners",
      "Eurail passes and all intercity rail between Paris, Switzerland and Rome",
      "Schengen visa documentation support and appointment assistance",
      "Jungfraujoch and Mount Titlis excursion tickets",
    ],
    excluded: [
      "International flights",
      "Schengen visa fee and travel insurance premium",
      "Lunches and optional excursions such as Disneyland Paris",
      "City taxes payable at hotels",
    ],
    itinerary: [
      { day: 1, title: "Arrive Paris", description: "Airport pickup and check-in, with an evening illumination tour and a Seine river cruise." },
      { day: 2, title: "Paris city", description: "Eiffel Tower second level, the Louvre, the Arc de Triomphe and the Champs-Élysées." },
      { day: 3, title: "Paris free day", description: "A free day for Disneyland Paris, Versailles or Montmartre — we book whichever you choose." },
      { day: 4, title: "Paris to Switzerland", description: "High-speed rail to Switzerland, checking in at Interlaken or Lucerne in the afternoon." },
      { day: 5, title: "Jungfraujoch", description: "The cogwheel train up to Jungfraujoch, the Top of Europe, for the Ice Palace, the Sphinx deck and the Aletsch glacier." },
      { day: 6, title: "Mount Titlis & Lucerne", description: "Rotair cable car to Mount Titlis and the cliff walk, then the Chapel Bridge and Lion Monument at Lucerne." },
      { day: 7, title: "Switzerland to Italy", description: "Scenic rail south through the Alps to Italy, arriving in Rome by evening." },
      { day: 8, title: "Rome", description: "Colosseum, Roman Forum, Palatine Hill, the Trevi Fountain and the Spanish Steps." },
      { day: 9, title: "Vatican City", description: "Vatican Museums, the Sistine Chapel and St Peter's Basilica, with a free afternoon for shopping." },
      { day: 10, title: "Departure", description: "Transfer to Rome Fiumicino for your flight home." },
    ],
    featured: false,
  },
];

export function getAllTours(): Tour[] {
  return tours;
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((t) => t.featured);
}

export function getAllTourSlugs(): string[] {
  return tours.map((t) => t.slug);
}

export function getToursByDestination(destinationSlug: string): Tour[] {
  return tours.filter((t) => t.location.destination === destinationSlug);
}

/** A tour's scope is derived from its destination, so it is never stored twice. */
export function getTourScope(tour: Tour): DestinationScope | undefined {
  return getDestinationBySlug(tour.location.destination)?.scope;
}

export function getToursByScope(scope: DestinationScope): Tour[] {
  return tours.filter((t) => getTourScope(t) === scope);
}

export function getAllTags(): string[] {
  return Array.from(new Set(tours.flatMap((t) => t.tags))).sort();
}
