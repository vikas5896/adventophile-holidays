// Dev utility: generates local SVG placeholder images for tours, blog posts, and team.
// PLACEHOLDER — run once at content-authoring time. Replace public/images/** with
// licensed/owned photography before a real launch; this script's output is not for
// production use as final imagery.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "images");

// SVG is XML — labels containing a bare "&" (e.g. "Andaman & Nicobar") produce invalid markup
// that browsers refuse to render as an image (silent broken-image icon), so escape before use.
function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svg({ w, h, from, to, angle, label, sublabel, icon }) {
  label = escapeXml(label);
  sublabel = sublabel ? escapeXml(sublabel) : sublabel;
  const gradId = "g" + Math.random().toString(36).slice(2, 8);
  const iconPaths = {
    // Generic shapes — still used by blog covers and the site hero/OG image.
    mountain: `<path d="M0 ${h} L${w * 0.22} ${h * 0.45} L${w * 0.36} ${h * 0.65} L${w * 0.55} ${h * 0.3} L${w * 0.72} ${h * 0.6} L${w * 0.85} ${h * 0.42} L${w} ${h} Z" fill="rgba(255,255,255,0.16)"/>`,
    wave: `<path d="M0 ${h * 0.7} Q ${w * 0.25} ${h * 0.55} ${w * 0.5} ${h * 0.7} T ${w} ${h * 0.7} V ${h} H0 Z" fill="rgba(255,255,255,0.16)"/>`,
    sun: `<circle cx="${w * 0.78}" cy="${h * 0.28}" r="${Math.min(w, h) * 0.14}" fill="rgba(255,255,255,0.22)"/>`,
    palm: `<path d="M${w * 0.15} ${h} V ${h * 0.4} M${w * 0.15} ${h * 0.4} Q ${w * 0.05} ${h * 0.25} ${w * 0.02} ${h * 0.15} M${w * 0.15} ${h * 0.4} Q ${w * 0.25} ${h * 0.22} ${w * 0.3} ${h * 0.1} M${w * 0.15} ${h * 0.4} Q ${w * 0.1} ${h * 0.2} ${w * 0.18} ${h * 0.05}" stroke="rgba(255,255,255,0.2)" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    trek: `<path d="M0 ${h} L${w * 0.18} ${h * 0.55} L${w * 0.3} ${h * 0.7} L${w * 0.48} ${h * 0.2} L${w * 0.62} ${h * 0.5} L${w * 0.8} ${h * 0.35} L${w} ${h} Z" fill="rgba(255,255,255,0.16)"/><circle cx="${w * 0.48}" cy="${h * 0.12}" r="10" fill="rgba(255,255,255,0.3)"/>`,
    city: `<g fill="rgba(255,255,255,0.16)"><rect x="${w * 0.1}" y="${h * 0.5}" width="${w * 0.08}" height="${h * 0.5}"/><rect x="${w * 0.22}" y="${h * 0.35}" width="${w * 0.1}" height="${h * 0.65}"/><rect x="${w * 0.36}" y="${h * 0.55}" width="${w * 0.07}" height="${h * 0.45}"/><rect x="${w * 0.47}" y="${h * 0.3}" width="${w * 0.09}" height="${h * 0.7}"/><rect x="${w * 0.6}" y="${h * 0.45}" width="${w * 0.08}" height="${h * 0.55}"/></g>`,
    river: `<path d="M0 ${h * 0.55} Q ${w * 0.3} ${h * 0.4} ${w * 0.5} ${h * 0.6} T ${w} ${h * 0.5} V ${h} H0 Z" fill="rgba(255,255,255,0.14)"/>`,

    // Landmark-themed shapes — one per destination/package, so each card reads as a specific
    // place rather than an interchangeable gradient. Still clearly illustrative placeholders,
    // not photography.
    fort: `<g fill="rgba(255,255,255,0.18)">
      <path d="M${w * 0.08} ${h} L${w * 0.08} ${h * 0.55} L${w * 0.16} ${h * 0.55} L${w * 0.16} ${h * 0.5} L${w * 0.2} ${h * 0.5} L${w * 0.2} ${h * 0.55} L${w * 0.28} ${h * 0.55} L${w * 0.28} ${h * 0.42} L${w * 0.34} ${h * 0.42} L${w * 0.34} ${h * 0.55} L${w * 0.42} ${h * 0.55} L${w * 0.42} ${h * 0.5} L${w * 0.46} ${h * 0.5} L${w * 0.46} ${h * 0.55} L${w * 0.55} ${h * 0.55} L${w * 0.55} ${h} Z"/>
      <rect x="${w * 0.11}" y="${h * 0.62}" width="${w * 0.05}" height="${h * 0.14}" rx="2" fill="rgba(12,20,20,0.25)"/>
      <path d="M${w * 0.34} ${h * 0.42} L${w * 0.34} ${h * 0.3}" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
      <path d="M${w * 0.34} ${h * 0.3} L${w * 0.4} ${h * 0.33} L${w * 0.34} ${h * 0.36} Z" fill="rgba(234,179,8,0.55)"/>
    </g>`,
    houseboat: `<g>
      <path d="M0 ${h * 0.72} Q ${w * 0.5} ${h * 0.66} ${w} ${h * 0.72} V ${h} H0 Z" fill="rgba(255,255,255,0.14)"/>
      <path d="M${w * 0.3} ${h * 0.72} Q ${w * 0.32} ${h * 0.55} ${w * 0.42} ${h * 0.5} L${w * 0.68} ${h * 0.5} Q ${w * 0.76} ${h * 0.55} ${w * 0.76} ${h * 0.62} L${w * 0.76} ${h * 0.72} Z" fill="rgba(255,255,255,0.22)"/>
      <rect x="${w * 0.46}" y="${h * 0.38}" width="${w * 0.18}" height="${h * 0.12}" rx="4" fill="rgba(255,255,255,0.28)"/>
      <path d="M${w * 0.28} ${h * 0.72} Q ${w * 0.52} ${h * 0.62} ${w * 0.78} ${h * 0.72}" stroke="rgba(255,255,255,0.3)" stroke-width="4" fill="none"/>
    </g>`,
    monastery: `<g>
      <path d="M${w * 0.3} ${h} L${w * 0.3} ${h * 0.6} L${w * 0.7} ${h * 0.6} L${w * 0.7} ${h} Z" fill="rgba(255,255,255,0.16)"/>
      <path d="M${w * 0.26} ${h * 0.6} L${w * 0.5} ${h * 0.42} L${w * 0.74} ${h * 0.6} Z" fill="rgba(255,255,255,0.24)"/>
      <path d="M${w * 0.36} ${h * 0.42} L${w * 0.5} ${h * 0.3} L${w * 0.64} ${h * 0.42} Z" fill="rgba(255,255,255,0.24)"/>
      <path d="M${w * 0.5} ${h * 0.3} L${w * 0.5} ${h * 0.18}" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
      <path d="M${w * 0.5} ${h * 0.2} Q ${w * 0.62} ${h * 0.16} ${w * 0.74} ${h * 0.22}" stroke="rgba(234,179,8,0.5)" stroke-width="3" fill="none" stroke-dasharray="2 10" stroke-linecap="round"/>
    </g>`,
    rootbridge: `<g>
      <path d="M0 ${h * 0.75} Q ${w * 0.5} ${h * 0.42} ${w} ${h * 0.75}" stroke="rgba(255,255,255,0.26)" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M0 ${h * 0.75} Q ${w * 0.5} ${h * 0.5} ${w} ${h * 0.75}" stroke="rgba(255,255,255,0.16)" stroke-width="26" fill="none" stroke-linecap="round"/>
      <path d="M${w * 0.15} ${h} V ${h * 0.7} M${w * 0.85} ${h} V ${h * 0.7}" stroke="rgba(255,255,255,0.16)" stroke-width="10"/>
    </g>`,
    lakeview: `<g>
      <path d="M0 ${h * 0.62} L${w * 0.2} ${h * 0.4} L${w * 0.4} ${h * 0.55} L${w * 0.6} ${h * 0.32} L${w * 0.8} ${h * 0.5} L${w} ${h * 0.4} V ${h * 0.62} Z" fill="rgba(255,255,255,0.16)"/>
      <path d="M0 ${h * 0.66} H${w}" stroke="rgba(255,255,255,0.22)" stroke-width="3"/>
      <path d="M${w * 0.1} ${h * 0.75} H${w * 0.3} M${w * 0.42} ${h * 0.82} H${w * 0.66} M${w * 0.15} ${h * 0.9} H${w * 0.5}" stroke="rgba(255,255,255,0.14)" stroke-width="3" stroke-linecap="round"/>
    </g>`,
    teaterrace: `<g fill="rgba(255,255,255,0.16)">
      <path d="M0 ${h} V${h * 0.82} L${w} ${h * 0.7} V${h} Z"/>
      <path d="M0 ${h * 0.82} V${h * 0.66} L${w} ${h * 0.52} V${h * 0.7} Z" fill-opacity="0.8"/>
      <path d="M0 ${h * 0.66} V${h * 0.5} L${w} ${h * 0.34} V${h * 0.52} Z" fill-opacity="0.6"/>
      <path d="M${w * 0.6} ${h * 0.34} L${w * 0.72} ${h * 0.14} L${w * 0.86} ${h * 0.34} Z" fill-opacity="0.7"/>
    </g>`,
    backwaters: `<g>
      <path d="M0 ${h * 0.68} Q ${w * 0.3} ${h * 0.6} ${w * 0.55} ${h * 0.68} T ${w} ${h * 0.64} V${h} H0 Z" fill="rgba(255,255,255,0.14)"/>
      <path d="M${w * 0.4} ${h * 0.68} Q ${w * 0.42} ${h * 0.58} ${w * 0.5} ${h * 0.55} L${w * 0.68} ${h * 0.55} Q${w * 0.74} ${h * 0.6} ${w * 0.74} ${h * 0.66} L${w * 0.74} ${h * 0.7} Z" fill="rgba(255,255,255,0.24)"/>
      <path d="M${w * 0.08} ${h * 0.6} V${h * 0.35} M${w * 0.08} ${h * 0.35} Q${w * 0.0} ${h * 0.22} ${-w * 0.02} ${h * 0.12} M${w * 0.08} ${h * 0.35} Q${w * 0.16} ${h * 0.2} ${w * 0.2} ${h * 0.08}" stroke="rgba(255,255,255,0.2)" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>`,
    saltdesert: `<g stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none">
      <path d="M0 ${h * 0.7} H${w}"/>
      <path d="M${w * 0.1} ${h * 0.72} L${w * 0.22} ${h * 0.85} L${w * 0.36} ${h * 0.74} L${w * 0.5} ${h * 0.9} L${w * 0.64} ${h * 0.76} L${w * 0.78} ${h * 0.92} L${w * 0.9} ${h * 0.75}"/>
      <path d="M${w * 0.02} ${h * 0.82} L${w * 0.14} ${h * 0.95} M${w * 0.3} ${h * 0.78} L${w * 0.42} ${h * 0.98} M${w * 0.58} ${h * 0.82} L${w * 0.7} ${h * 0.99}"/>
      <circle cx="${w * 0.78}" cy="${h * 0.25}" r="${Math.min(w, h) * 0.1}" fill="rgba(255,255,255,0.2)" stroke="none"/>
    </g>`,
    skyline: `<g fill="rgba(255,255,255,0.16)">
      <rect x="${w * 0.12}" y="${h * 0.55}" width="${w * 0.09}" height="${h * 0.45}"/>
      <rect x="${w * 0.24}" y="${h * 0.4}" width="${w * 0.1}" height="${h * 0.6}"/>
      <path d="M${w * 0.4} ${h} V${h * 0.2} L${w * 0.44} ${h * 0.1} L${w * 0.48} ${h * 0.2} V${h} Z"/>
      <rect x="${w * 0.56}" y="${h * 0.45}" width="${w * 0.09}" height="${h * 0.55}"/>
      <rect x="${w * 0.68}" y="${h * 0.6}" width="${w * 0.08}" height="${h * 0.4}"/>
    </g>`,
    overwater: `<g>
      <path d="M0 ${h * 0.72} H${w}" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
      <path d="M${w * 0.2} ${h * 0.72} V${h * 0.95} M${w * 0.46} ${h * 0.72} V${h * 0.95} M${w * 0.72} ${h * 0.72} V${h * 0.95}" stroke="rgba(255,255,255,0.22)" stroke-width="5"/>
      <path d="M${w * 0.12} ${h * 0.72} H${w * 0.3} L${w * 0.26} ${h * 0.58} L${w * 0.16} ${h * 0.58} Z" fill="rgba(255,255,255,0.24)"/>
      <path d="M${w * 0.38} ${h * 0.72} H${w * 0.56} L${w * 0.52} ${h * 0.55} L${w * 0.42} ${h * 0.55} Z" fill="rgba(255,255,255,0.26)"/>
      <path d="M${w * 0.64} ${h * 0.72} H${w * 0.82} L${w * 0.78} ${h * 0.58} L${w * 0.68} ${h * 0.58} Z" fill="rgba(255,255,255,0.24)"/>
      <path d="M0 ${h * 0.78} Q${w * 0.5} ${h * 0.74} ${w} ${h * 0.78}" stroke="rgba(255,255,255,0.14)" stroke-width="3" fill="none"/>
    </g>`,
    karst: `<g fill="rgba(255,255,255,0.18)">
      <path d="M0 ${h * 0.75} Q${w * 0.04} ${h * 0.5} ${w * 0.1} ${h * 0.75} Z"/>
      <path d="M${w * 0.14} ${h * 0.75} Q${w * 0.22} ${h * 0.35} ${w * 0.32} ${h * 0.75} Z"/>
      <path d="M${w * 0.38} ${h * 0.75} Q${w * 0.44} ${h * 0.55} ${w * 0.5} ${h * 0.75} Z" fill-opacity="0.7"/>
      <path d="M${w * 0.56} ${h * 0.75} Q${w * 0.66} ${h * 0.3} ${w * 0.78} ${h * 0.75} Z"/>
      <path d="M${w * 0.82} ${h * 0.75} Q${w * 0.88} ${h * 0.5} ${w * 0.96} ${h * 0.75} Z" fill-opacity="0.7"/>
      <path d="M0 ${h * 0.78} H${w}" stroke="rgba(255,255,255,0.14)" stroke-width="3"/>
    </g>`,
    twintowers: `<g fill="rgba(255,255,255,0.18)">
      <path d="M${w * 0.32} ${h} V${h * 0.32} L${w * 0.36} ${h * 0.2} L${w * 0.4} ${h * 0.32} V${h} Z"/>
      <path d="M${w * 0.56} ${h} V${h * 0.32} L${w * 0.6} ${h * 0.2} L${w * 0.64} ${h * 0.32} V${h} Z"/>
      <rect x="${w * 0.4}" y="${h * 0.48}" width="${w * 0.16}" height="${h * 0.05}" fill-opacity="0.6"/>
    </g>`,
    rockfortress: `<g fill="rgba(255,255,255,0.18)">
      <path d="M${w * 0.15} ${h} L${w * 0.3} ${h * 0.35} Q${w * 0.5} ${h * 0.22} ${w * 0.7} ${h * 0.35} L${w * 0.85} ${h} Z"/>
      <rect x="${w * 0.44}" y="${h * 0.28}" width="${w * 0.06}" height="${h * 0.08}" fill-opacity="0.6"/>
      <path d="M${w * 0.35} ${h * 0.6} L${w * 0.65} ${h * 0.6}" stroke="rgba(255,255,255,0.24)" stroke-width="3" stroke-dasharray="4 5"/>
    </g>`,
    eiffel: `<g stroke="rgba(255,255,255,0.26)" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M${w * 0.5} ${h * 0.15} L${w * 0.32} ${h} M${w * 0.5} ${h * 0.15} L${w * 0.68} ${h}"/>
      <path d="M${w * 0.4} ${h * 0.55} L${w * 0.6} ${h * 0.55}"/>
      <path d="M${w * 0.36} ${h * 0.78} L${w * 0.64} ${h * 0.78}"/>
      <path d="M${w * 0.44} ${h * 0.32} L${w * 0.56} ${h * 0.32}"/>
    </g>`,
    lattice: `<g fill="rgba(255,255,255,0.22)">
      <rect x="${w * 0.22}" y="${h * 0.14}" width="${w * 0.56}" height="${h * 0.78}" fill="rgba(255,255,255,0.08)"/>
      ${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => `<circle cx="${w * (0.28 + c * 0.086)}" cy="${h * (0.24 + r * 0.18)}" r="${w * 0.022}"/>`).join("")).join("")}
    </g>`,
    island: `<g>
      <ellipse cx="${w * 0.5}" cy="${h * 0.72}" rx="${w * 0.42}" ry="${h * 0.06}" fill="rgba(255,255,255,0.12)"/>
      <path d="M${w * 0.42} ${h * 0.72} Q${w * 0.46} ${h * 0.5} ${w * 0.5} ${h * 0.72} Z" fill="rgba(255,255,255,0.22)"/>
      <path d="M${w * 0.46} ${h * 0.58} V${h * 0.4} M${w * 0.46} ${h * 0.4} Q${w * 0.38} ${h * 0.3} ${w * 0.34} ${h * 0.24} M${w * 0.46} ${h * 0.4} Q${w * 0.54} ${h * 0.28} ${w * 0.58} ${h * 0.18}" stroke="rgba(255,255,255,0.2)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M0 ${h * 0.78} Q${w * 0.25} ${h * 0.74} ${w * 0.5} ${h * 0.78} T${w} ${h * 0.78}" stroke="rgba(255,255,255,0.16)" stroke-width="3" fill="none"/>
    </g>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="${angle}">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})"/>
  ${iconPaths[icon] || ""}
  <text x="24" y="${h - 44}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(h * 0.055)}" font-weight="700" fill="rgba(255,255,255,0.95)">${label}</text>
  ${sublabel ? `<text x="24" y="${h - 18}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(h * 0.03)}" fill="rgba(255,255,255,0.75)">${sublabel}</text>` : ""}
  <text x="${w - 14}" y="${h - 14}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(h * 0.026)}" letter-spacing="1" fill="rgba(255,255,255,0.55)">PLACEHOLDER IMAGE</text>
</svg>`;
}

const tourImages = [
  // India — domestic
  { slug: "jodhpur-osian-desert-safari", label: "Jodhpur, Rajasthan", from: "#c2410c", to: "#7c2d12", icon: "fort" },
  { slug: "royal-rajasthan-jaipur-jodhpur-udaipur", label: "Royal Rajasthan", from: "#be185d", to: "#831843", icon: "lattice" },
  { slug: "jaisalmer-golden-city-desert-camp", label: "Jaisalmer, Rajasthan", from: "#d97706", to: "#92400e", icon: "fort" },
  { slug: "kashmir-srinagar-gulmarg-pahalgam", label: "Kashmir", from: "#0e7490", to: "#155e75", icon: "houseboat" },
  { slug: "himachal-shimla-manali-solang", label: "Himachal Pradesh", from: "#475569", to: "#1e293b", icon: "teaterrace" },
  { slug: "uttarakhand-nainital-mussoorie-rishikesh", label: "Uttarakhand", from: "#0f766e", to: "#134e4a", icon: "lakeview" },
  { slug: "goa-beach-break", label: "Goa", from: "#0891b2", to: "#164e63", icon: "palm" },
  { slug: "sikkim-gangtok-pelling-lachung", label: "Sikkim", from: "#4338ca", to: "#312e81", icon: "monastery" },
  { slug: "meghalaya-shillong-cherrapunji-dawki", label: "Meghalaya", from: "#15803d", to: "#14532d", icon: "rootbridge" },
  { slug: "arunachal-tawang-bomdila", label: "Arunachal Pradesh", from: "#334155", to: "#0f172a", icon: "monastery" },
  { slug: "andaman-port-blair-havelock-neil", label: "Andaman Islands", from: "#0284c7", to: "#075985", icon: "island" },
  { slug: "kerala-munnar-alleppey-kovalam", label: "Kerala", from: "#16a34a", to: "#14532d", icon: "backwaters" },
  { slug: "gujarat-rann-somnath-gir", label: "Gujarat", from: "#a16207", to: "#713f12", icon: "saltdesert" },
  // International
  { slug: "dubai-city-desert-abu-dhabi", label: "Dubai, UAE", from: "#b45309", to: "#78350f", icon: "skyline" },
  { slug: "maldives-overwater-escape", label: "Maldives", from: "#06b6d4", to: "#0e7490", icon: "overwater" },
  { slug: "vietnam-hanoi-halong-danang-saigon", label: "Vietnam", from: "#059669", to: "#064e3b", icon: "karst" },
  { slug: "malaysia-kl-genting-langkawi", label: "Malaysia", from: "#7c3aed", to: "#4c1d95", icon: "twintowers" },
  { slug: "sri-lanka-colombo-kandy-bentota", label: "Sri Lanka", from: "#65a30d", to: "#365314", icon: "rockfortress" },
  { slug: "europe-paris-switzerland-rome", label: "Paris, Switzerland & Rome", from: "#1d4ed8", to: "#1e3a8a", icon: "eiffel" },
];

// One cover image per destination, keyed by the slugs in lib/data/destinations.ts.
const destinationImages = [
  { slug: "rajasthan", label: "Rajasthan", from: "#c2410c", to: "#7c2d12", icon: "fort" },
  { slug: "kashmir", label: "Kashmir", from: "#0e7490", to: "#155e75", icon: "houseboat" },
  { slug: "himachal-pradesh", label: "Himachal Pradesh", from: "#475569", to: "#1e293b", icon: "teaterrace" },
  { slug: "uttarakhand", label: "Uttarakhand", from: "#0f766e", to: "#134e4a", icon: "lakeview" },
  { slug: "goa", label: "Goa", from: "#0891b2", to: "#164e63", icon: "palm" },
  { slug: "sikkim", label: "Sikkim", from: "#4338ca", to: "#312e81", icon: "monastery" },
  { slug: "meghalaya", label: "Meghalaya", from: "#15803d", to: "#14532d", icon: "rootbridge" },
  { slug: "arunachal-pradesh", label: "Arunachal Pradesh", from: "#334155", to: "#0f172a", icon: "monastery" },
  { slug: "andaman-nicobar", label: "Andaman & Nicobar", from: "#0284c7", to: "#075985", icon: "island" },
  { slug: "kerala", label: "Kerala", from: "#16a34a", to: "#14532d", icon: "backwaters" },
  { slug: "gujarat", label: "Gujarat", from: "#a16207", to: "#713f12", icon: "saltdesert" },
  { slug: "dubai", label: "Dubai", from: "#b45309", to: "#78350f", icon: "skyline" },
  { slug: "maldives", label: "Maldives", from: "#06b6d4", to: "#0e7490", icon: "overwater" },
  { slug: "vietnam", label: "Vietnam", from: "#059669", to: "#064e3b", icon: "karst" },
  { slug: "malaysia", label: "Malaysia", from: "#7c3aed", to: "#4c1d95", icon: "twintowers" },
  { slug: "sri-lanka", label: "Sri Lanka", from: "#65a30d", to: "#365314", icon: "rockfortress" },
  { slug: "europe", label: "Europe", from: "#1d4ed8", to: "#1e3a8a", icon: "eiffel" },
];

const galleryVariants = [
  { from: null, to: null, angle: "100% 100%" },
  { from: null, to: null, angle: "0% 100%" },
  { from: null, to: null, angle: "100% 0%" },
];

mkdirSync(path.join(root, "tours"), { recursive: true });
for (const d of tourImages) {
  const dir = path.join(root, "tours", d.slug);
  mkdirSync(dir, { recursive: true });
  galleryVariants.forEach((v, i) => {
    const file = path.join(dir, `${i + 1}.svg`);
    writeFileSync(
      file,
      svg({
        w: 1200,
        h: 800,
        from: d.from,
        to: d.to,
        angle: v.angle,
        label: d.label,
        sublabel: i === 0 ? undefined : `View ${i + 1}`,
        icon: d.icon,
      })
    );
  });
}

mkdirSync(path.join(root, "destinations"), { recursive: true });
for (const d of destinationImages) {
  writeFileSync(
    path.join(root, "destinations", `${d.slug}.svg`),
    svg({ w: 1200, h: 800, from: d.from, to: d.to, angle: "100% 100%", label: d.label, icon: d.icon })
  );
}

const blogPosts = [
  { slug: "pack-wisely-before-traveling", label: "Packing Tips", from: "#0f766e", to: "#134e4a", icon: "city" },
  { slug: "the-surfing-man-will-blow-your-mind", label: "Surf Culture", from: "#0284c7", to: "#0c4a6e", icon: "wave" },
  { slug: "why-slow-travel-changes-how-you-see-the-world", label: "Slow Travel", from: "#65a30d", to: "#365314", icon: "trek" },
  { slug: "signs-you-should-book-that-trek", label: "Trekking", from: "#475569", to: "#1e293b", icon: "trek" },
  { slug: "a-rethoric-question-worth-asking-before-you-book", label: "Trip Planning", from: "#9333ea", to: "#581c87", icon: "city" },
  { slug: "change-your-place-and-get-the-fresh-air", label: "Fresh Air", from: "#16a34a", to: "#14532d", icon: "mountain" },
  { slug: "introducing-this-amazing-city", label: "City Guides", from: "#dc2626", to: "#7f1d1d", icon: "city" },
  { slug: "how-to-travel-with-a-paper-map", label: "Old-School Travel", from: "#b45309", to: "#78350f", icon: "mountain" },
  { slug: "budget-adventure-travel-on-any-income", label: "Budget Travel", from: "#0891b2", to: "#164e63", icon: "wave" },
];

mkdirSync(path.join(root, "blog"), { recursive: true });
for (const p of blogPosts) {
  const file = path.join(root, "blog", `${p.slug}.svg`);
  writeFileSync(
    file,
    svg({ w: 1200, h: 675, from: p.from, to: p.to, angle: "100% 100%", label: p.label, icon: p.icon })
  );
}

mkdirSync(path.join(root, "team"), { recursive: true });
const team = [
  { slug: "vikram", label: "Vikram Rathore", from: "#334155", to: "#0f172a" },
  { slug: "meera", label: "Meera Suthar", from: "#7c2d12", to: "#431407" },
];
for (const t of team) {
  writeFileSync(
    path.join(root, "team", `${t.slug}.svg`),
    svg({ w: 400, h: 400, from: t.from, to: t.to, angle: "100% 100%", label: t.label, icon: "sun" })
  );
}

mkdirSync(path.join(root, "site"), { recursive: true });
writeFileSync(
  path.join(root, "site", "hero.svg"),
  svg({ w: 1920, h: 1080, from: "#0c4a6e", to: "#082f49", angle: "100% 100%", label: "Adventophile Holidays", sublabel: "Customized domestic & international holidays", icon: "mountain" })
);
writeFileSync(
  path.join(root, "site", "og-default.svg"),
  svg({ w: 1200, h: 630, from: "#0c4a6e", to: "#082f49", angle: "100% 100%", label: "Adventophile Holidays", sublabel: "Travel & Holiday Management Company", icon: "mountain" })
);

console.log(
  `Generated ${tourImages.length * 3} tour images, ${destinationImages.length} destination covers, ` +
    `${blogPosts.length} blog covers, ${team.length} team photos, and 2 site images.`
);
