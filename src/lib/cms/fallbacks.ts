/**
 * Static fallbacks when CMS is unavailable — mirrors current hardcoded site content.
 */

export const fallbackGlobal = {
  logoLight: "/assets/Aesthara white.png",
  logoDark: "/assets/Aesthara color.png",
  logoAlt: "Aesthara",
  navHomeLabel: "Home",
  navServicesLabel: "Services",
  navPortfolioLabel: "Portfolio",
  navAboutLabel: "About",
  navContactLabel: "Contact",
  navCtaLabel: "Book a Consultation",
  footerHeading: "Ready to make your brand stand out?",
  footerSubheading:
    "Let's turn your vision into <strong class=\"text-[#FFC32E]\">striking visuals.</strong>",
  linkedinLabel: "LinkedIn",
  linkedinUrl: "https://www.linkedin.com/company/aesthara-cs/",
  instagramLabel: "Instagram",
  instagramUrl: "https://www.instagram.com/aesthara_creative_solutions/",
  email: "kawaljeet@aesthara.in",
  phone: "+91 98195 50115",
  location: "Mumbai | India",
  copyrightName: "Aesthara",
  privacyLinkLabel: "Privacy Policy",
};

export const fallbackContactForm = {
  formHeading: "Get in Touch",
  placeholderName: "Name",
  placeholderEmail: "Email",
  placeholderPhone: "Phone Number",
  placeholderCompany: "Company",
  placeholderMessage: "Tell us about your project...",
  submitLabel: "Send Message",
  submittingLabel: "Sending...",
  successHeading: "Thank you!",
  successMessage: "We'll be in touch soon.",
  successResetLabel: "Send another message",
  validationError: "Please fill in all fields.",
};

export const fallbackMarquee = [
  { text: "Graphic Design", color: "#DF9F57" },
  { text: "Brand Identity", color: "#FFC32E" },
  { text: "PPT Design", color: "#53BA7C" },
  { text: "Social Media", color: "#005280" },
  { text: "Logo Design", color: "#DF9F57" },
  { text: "Print Design", color: "#FFC32E" },
  { text: "Pitch Decks", color: "#53BA7C" },
  { text: "Visual Identity", color: "#005280" },
];

export const fallbackSteps = [
  {
    num: "01",
    title: "Discover",
    sub: "Listen First",
    desc: "Understanding the audience, and purpose. We listen before we design.",
    iconKey: "Target",
  },
  {
    num: "02",
    title: "Envision",
    sub: "Shape Strategy",
    desc: "Shaping strategy, structure ideas, and creative approach.",
    iconKey: "Lightbulb",
  },
  {
    num: "03",
    title: "Deliver",
    sub: "Impactful Design",
    desc: "Designing refined, impactful, ready-to-use outcomes.",
    iconKey: "Rocket",
  },
  {
    num: "04",
    title: "Evolve",
    sub: "Ongoing Growth",
    desc: "Ongoing design partnerships, support, and feedback.",
    iconKey: "TrendingUp",
  },
];

export const fallbackTestimonials = [
  {
    name: "Jigesh Shah",
    role: "Founder - RYVR Immersive",
    quote:
      "Kawal has consistently demonstrated the ability to work quickly and efficiently. He comes with an impressive ability to grasp requirements at once. His delivery reflects careful attention to detail and a strong focus on producing excellent output. His proactiveness makes him a reliable partner for time-sensitive projects as well as those requiring high-quality design execution.",
  },
  {
    name: "Ravi S Busi",
    role: "Head of Marketing - Exponentia.ai",
    quote:
      "He is a dedicated and highly professional designer who combines clarity, creativity, and business understanding. He simplifies ideas without losing impact, protects brand guidelines, and consistently delivers exceptional work with impressive turnaround times. I fully endorse his creative and reliable expertise.",
  },
  {
    name: "Vivek Nirmal",
    role: "CEO – KisanKonnect",
    quote:
      "I would like to appreciate the quality of work you have done for the deck. Thanks for the same.",
  },
  {
    name: "Anandita Tandon",
    role: "Astrologist & Tarot Reader – Soul Tribee",
    quote:
      "Hello, I had started my insta page for my tarot journey and I wanted a very meaningful logo which should compliment the name of my page. Kawaljeet being my client offered to give it a try. And I must say he did a fabulous job. The logo is still there on my page. I haven't thought of changing it. Thank you, Kawaljeet.",
  },
  {
    name: "Sindhu Girish",
    role: "Manager – HR",
    quote:
      "Your work for QuickTalent was a great document, and we still use some of its slides for the corporate presentation. The deck was very creative.",
  },
];

export const fallbackProjects = [
  {
    id: 1,
    title: "Raasa Healthy Foods",
    img: "/assets/Raasa healthy foods.png",
    category: "Branding" as const,
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Logo design for a healthy food startup specializing in fresh salads and nutritious drinks.",
    showOnHome: true,
  },
  {
    id: 2,
    title: "Ambaa's Farm Fresh",
    img: "/assets/Amba Farm Fresh.png",
    category: "Branding" as const,
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Brand identity development and social media creatives and for an organic dairy brand offering ghee and unsalted butter.",
    showOnHome: false,
  },
  {
    id: 3,
    title: "Voice Of Healthy Meals (VOHM)",
    img: "/assets/VOHM.png",
    category: "Branding" as const,
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Logo design and brand guidelines for a healthy snacks' startup focused on nutritious food options.",
    showOnHome: false,
  },
  {
    id: 4,
    title: "Corporate Presentation",
    img: "/assets/PPT Sample 1.png",
    category: "Presentations" as const,
    badge: "Presentations",
    badgeColor: "bg-[#005280]",
    desc: "Designed a professional corporate presentation for an Agentic AI platform and cloud automation startup.",
    showOnHome: true,
  },
  {
    id: 5,
    title: "Pitch Deck Design",
    img: "/assets/PPT Sample 2.png",
    category: "Presentations" as const,
    badge: "Presentations",
    badgeColor: "bg-[#005280]",
    desc: "Created an investor-ready pitch deck for a Direct-to-Consumer (D2C) brand and business storytelling.",
    showOnHome: false,
  },
  {
    id: 6,
    title: "Marketing assets",
    img: "/assets/Graphic Design Services.png",
    category: "Graphic Design" as const,
    badge: "Graphic Design",
    badgeColor: "bg-[#53BA7C]",
    desc: "Digital Assets for IT & Technology Industry",
    showOnHome: true,
  },
  {
    id: 7,
    title: "Wall Branding",
    img: "/assets/Wall branding.png",
    category: "Branding" as const,
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Custom wallpaper branding designed for a vibrant kids' room.",
    showOnHome: false,
  },
];

export const fallbackClientLogos = [
  { file: "Kisankonnect.jpg", alt: "Kisankonnect" },
  { file: "RYVR.jpg", alt: "RYVR" },
  { file: "HelloTax JPG.jpg", alt: "HelloTax" },
  { file: "QT Logo.jpg", alt: "QT Logo" },
  { file: "Circolife.jpg", alt: "Circolife" },
  { file: "Exponentia.jpg", alt: "Exponentia" },
];

export const fallbackPrivacySections = [
  {
    heading: "1. Information We Collect",
    body: "<p>We may collect personal information such as your name, email address, phone number, company name, and project details when you fill out a contact form or communicate with us.</p><p>We may also automatically collect certain technical information such as your IP address, browser type, device information, and website usage data through cookies and analytics tools.</p>",
  },
  {
    heading: "2. How We Use Your Information",
    body: "<p>We use your information to:</p><ul><li>Respond to inquiries and provide our services</li><li>Improve our website and user experience</li><li>Analyze website traffic and performance</li><li>Send updates or marketing communications (where applicable)</li></ul>",
  },
  {
    heading: "3. Cookies & Analytics",
    body: "<p>Our website may use cookies and third-party analytics tools (such as Google Analytics) to understand visitor behavior and improve site performance. You can manage or disable cookies through your browser settings.</p>",
  },
  {
    heading: "4. Sharing of Information",
    body: "<p>We do not sell your personal information. We may share your information only with trusted third-party service providers who help us operate our website, manage inquiries, or deliver services.</p>",
  },
  {
    heading: "5. Data Security",
    body: "<p>We take reasonable steps to protect your personal information. However, no online transmission or storage method is completely secure.</p>",
  },
  {
    heading: "7. Third-Party Links",
    body: "<p>Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.</p>",
  },
  {
    heading: "8. Changes to This Policy",
    body: "<p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>",
  },
  {
    heading: "9. Children's Privacy",
    body: "<p>Our services are not intended for individuals under 18. We do not knowingly collect personal information from children. If we learn that such information has been provided, we will take steps to delete it.</p>",
  },
  {
    heading: "10. Contact Us",
    body: "<p>If you have any questions about this Privacy Policy, please contact us:</p><p>Aesthara<br/>Email: <a href=\"mailto:kawaljeet@aesthara.in\">kawaljeet@aesthara.in</a><br/>Contact: +91 98195 50115</p>",
  },
];

export const fallbackSeo = {
  home: {
    title: "Aesthara — Design & Creative Studio",
    description: "Transforming Ideas into Impactful Visual Stories",
  },
  portfolio: {
    title: "Portfolio — Aesthara",
    description:
      "A showcase of our design expertise across branding, graphic design, and presentations.",
  },
  "privacy-policy": {
    title: "Privacy Policy — Aesthara",
    description: "Aesthara privacy policy and data practices.",
  },
};
