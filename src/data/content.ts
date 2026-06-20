import type { Industry, Partner, Project, Testimonial } from "@/types";

export const INDUSTRIES: Industry[] = [
  { id: "banks", name: "Banks", icon: "landmark", description: "SBP-compliant security & surveillance." },
  { id: "hospitals", name: "Hospitals", icon: "cross", description: "Fire safety & access control." },
  { id: "schools", name: "Schools", icon: "school", description: "Child-safe monitoring solutions." },
  { id: "universities", name: "Universities", icon: "graduation-cap", description: "Campus-wide security systems." },
  { id: "offices", name: "Offices", icon: "building-2", description: "Smart access & CCTV." },
  { id: "factories", name: "Factories", icon: "factory", description: "Industrial fire protection." },
  { id: "warehouses", name: "Warehouses", icon: "warehouse", description: "Perimeter & inventory security." },
  { id: "malls", name: "Shopping Malls", icon: "shopping-bag", description: "Crowd & fire safety management." },
  { id: "government", name: "Government Buildings", icon: "building", description: "High-security infrastructure." },
];

export const WHY_CHOOSE_US = [
  {
    title: "Certified Expertise",
    description:
      "Licensed fire safety and security engineers with industry certifications.",
    icon: "badge-check",
  },
  {
    title: "24/7 Emergency Support",
    description: "Round-the-clock monitoring and rapid emergency response.",
    icon: "headset",
  },
  {
    title: "Premium Equipment",
    description:
      "Authorized partner for leading global security & fire brands.",
    icon: "package-check",
  },
  {
    title: "End-to-End Solutions",
    description:
      "From survey and supply to installation, training and maintenance.",
    icon: "workflow",
  },
  {
    title: "Compliance Guaranteed",
    description:
      "Solutions meeting SBP, EN54 and international safety standards.",
    icon: "shield-check",
  },
  {
    title: "Trusted by Enterprises",
    description: "500+ installations across banks, industries and government.",
    icon: "building-2",
  },
];

export const CERTIFICATIONS = [
  "ISO 9001:2015 Quality Management",
  "Civil Defence Approved Contractor",
  "SBP Bank Security Compliance",
  "EN54 Fire Alarm Certified",
  "OEM Authorized Partner",
];

export const CORE_VALUES = [
  { title: "Safety First", description: "Every solution prioritizes the protection of human life.", icon: "heart-pulse" },
  { title: "Integrity", description: "Transparent pricing and honest recommendations, always.", icon: "scale" },
  { title: "Excellence", description: "Premium equipment installed to international standards.", icon: "award" },
  { title: "Reliability", description: "Systems that work when it matters most.", icon: "shield-check" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Imran Baloch",
    company: "National Bank — Quetta Region",
    role: "Regional Security Manager",
    quote:
      "BSS delivered a fully SBP-compliant security upgrade across 12 branches on schedule. Their monitoring response is exceptional.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Dr. Saima Khan",
    company: "Bolan Medical Complex",
    role: "Administration Head",
    quote:
      "The fire alarm and detection system they installed gives us complete peace of mind. Professional team, excellent maintenance.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Tariq Mehmood",
    company: "Gadani Industrial Estate",
    role: "Plant Manager",
    quote:
      "Their industrial fire protection and CCTV coverage is top-tier. Highly recommend BSS for any large facility.",
    rating: 4,
  },
  {
    id: "t4",
    name: "Ayesha Noor",
    company: "Quetta Grand Mall",
    role: "Operations Director",
    quote:
      "Turnstiles, surveillance and fire safety — all integrated seamlessly. The audit they provided was incredibly detailed.",
    rating: 5,
  },
];

export const PARTNERS: Partner[] = [
  { id: "p1", name: "Hikvision", logo: "Hikvision" },
  { id: "p2", name: "Dahua", logo: "Dahua" },
  { id: "p3", name: "Honeywell", logo: "Honeywell" },
  { id: "p4", name: "Bosch", logo: "Bosch" },
  { id: "p5", name: "ZKTeco", logo: "ZKTeco" },
  { id: "p6", name: "Notifier", logo: "Notifier" },
];

export const PROJECTS: Project[] = [
  {
    id: "pr1",
    title: "Multi-Branch Bank Security Rollout",
    client: "National Bank",
    category: "Bank Security",
    image: "",
    year: 2025,
    summary:
      "Integrated CCTV, access control and panic alarm system across 12 branches with central monitoring.",
  },
  {
    id: "pr2",
    title: "Hospital Fire Detection System",
    client: "Bolan Medical Complex",
    category: "Fire Safety",
    image: "",
    year: 2024,
    summary:
      "EN54 addressable fire alarm with 400+ detectors and BMS integration across 6 floors.",
  },
  {
    id: "pr3",
    title: "Industrial Surveillance Network",
    client: "Gadani Industrial Estate",
    category: "CCTV",
    image: "",
    year: 2024,
    summary:
      "120-camera IP surveillance network with PTZ perimeter coverage and 30-day storage.",
  },
  {
    id: "pr4",
    title: "Shopping Mall Access & Safety",
    client: "Quetta Grand Mall",
    category: "Integrated",
    image: "",
    year: 2023,
    summary:
      "Turnstile access control, crowd surveillance and complete fire safety compliance.",
  },
];

export const FAQS = [
  {
    q: "Do you provide free site surveys?",
    a: "Yes. We offer complimentary on-site surveys for all security and fire safety projects to recommend the most suitable solution.",
  },
  {
    q: "Are your fire extinguishers certified?",
    a: "All our extinguishers meet BS EN 3 / Pakistan Standards and come with refill and compliance certification.",
  },
  {
    q: "Do you offer annual maintenance contracts?",
    a: "Yes, we provide flexible AMC packages with scheduled preventive maintenance, priority response and discounted parts.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept Stripe (cards), JazzCash, EasyPaisa, bank transfer and cash on delivery.",
  },
  {
    q: "Do you serve areas outside Quetta?",
    a: "Yes, we serve clients across Balochistan and can deploy teams for projects nationwide.",
  },
];
