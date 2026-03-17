import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronRight,
  FileText,
  Layers,
  Lightbulb,
  PenTool,
  Presentation,
  Quote,
  Rocket,
  Send,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

function useCountUp(target: number, duration = 1800, triggered = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, triggered]);
  return count;
}

function StatCard({
  icon,
  value,
  suffix = "+",
  label,
  delay = 0,
  triggered,
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
  triggered: boolean;
}) {
  const count = useCountUp(value, 1800, triggered);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!triggered) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [triggered, delay]);

  return (
    <div
      className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-all"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.9)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="w-10 h-10 text-[#FFC32E] mx-auto mb-4">{icon}</div>
      <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-white text-sm leading-relaxed">{label}</div>
    </div>
  );
}

const marqueeItems = [
  { text: "Graphic Design", color: "#DF9F57" },
  { text: "Brand Identity", color: "#FFC32E" },
  { text: "PPT Design", color: "#53BA7C" },
  { text: "Social Media", color: "#005280" },
  { text: "Logo Design", color: "#DF9F57" },
  { text: "Print Design", color: "#FFC32E" },
  { text: "Pitch Decks", color: "#53BA7C" },
  { text: "Visual Identity", color: "#005280" },
];

const steps = [
  {
    num: "01",
    title: "Discover",
    sub: "Listen First",
    desc: "Understanding the audience, and purpose. We listen before we design.",
    icon: <Target className="w-7 h-7 text-white" />,
  },
  {
    num: "02",
    title: "Envision",
    sub: "Shape Strategy",
    desc: "Shaping strategy, structure ideas, and creative approach.",
    icon: <Lightbulb className="w-7 h-7 text-white" />,
  },
  {
    num: "03",
    title: "Deliver",
    sub: "Impactful Design",
    desc: "Designing refined, impactful, ready-to-use outcomes.",
    icon: <Rocket className="w-7 h-7 text-white" />,
  },
  {
    num: "04",
    title: "Evolve",
    sub: "Ongoing Growth",
    desc: "Ongoing design partnerships, support, and feedback.",
    icon: <TrendingUp className="w-7 h-7 text-white" />,
  },
];

const testimonials = [
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

const portfolioPreviews = [
  {
    title: "Raasa Healthy Foods",
    img: "/assets/Raasa healthy foods.png",
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Logo design for a healthy food startup specializing in fresh salads and nutritious drinks.",
  },
  {
    title: "Corporate Presentation",
    img: "/assets/PPT Sample 1.png",
    badge: "Presentations",
    badgeColor: "bg-[#005280]",
    desc: "Designed a professional corporate presentation for an Agentic AI platform and cloud automation startup.",
  },
  {
    title: "Marketing assets",
    img: "/assets/Graphic Design Services.png",
    badge: "Graphic Design",
    badgeColor: "bg-[#53BA7C]",
    desc: "Digital Assets for IT & Technology Industry",
  },
];

const floatingDots = [
  { left: "8%", top: "15%", color: "rgba(255,195,46,0.8)", delay: "0s" },
  { left: "16%", top: "35%", color: "rgba(223,159,87,0.8)", delay: "0.8s" },
  { left: "24%", top: "55%", color: "rgba(255,255,255,0.5)", delay: "1.6s" },
  { left: "32%", top: "75%", color: "rgba(255,195,46,0.8)", delay: "0.4s" },
  { left: "40%", top: "15%", color: "rgba(223,159,87,0.8)", delay: "1.2s" },
  { left: "48%", top: "35%", color: "rgba(255,255,255,0.5)", delay: "2s" },
  { left: "56%", top: "55%", color: "rgba(255,195,46,0.8)", delay: "0.6s" },
  { left: "64%", top: "75%", color: "rgba(223,159,87,0.8)", delay: "1.4s" },
  { left: "72%", top: "15%", color: "rgba(255,255,255,0.5)", delay: "2.2s" },
  { left: "80%", top: "35%", color: "rgba(255,195,46,0.8)", delay: "1s" },
  { left: "88%", top: "55%", color: "rgba(223,159,87,0.8)", delay: "1.8s" },
  { left: "96%", top: "75%", color: "rgba(255,255,255,0.5)", delay: "2.6s" },
];

const sectionSubtitleClassName = "text-lg text-gray-600 italic";

export default function HomePage() {
  const [heroLeftVisible, setHeroLeftVisible] = useState(false);
  const [heroRightVisible, setHeroRightVisible] = useState(false);
  const statsRef = useRef<HTMLElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  const aboutSection = useScrollReveal(0.15);
  const servicesSection = useScrollReveal(0.1);
  const processSection = useScrollReveal(0.1);
  const testimonialsSection = useScrollReveal(0.1);
  const portfolioSection = useScrollReveal(0.1);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroLeftVisible(true), 300);
    const t2 = setTimeout(() => setHeroRightVisible(true), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden bg-[#005280]"
      >
        {/* Background decorations */}
        <div
          className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full pointer-events-none animate-hero-drift"
          style={{
            animationDelay: "0s",
            background:
              "radial-gradient(circle, rgba(9,65,133,0.6) 0%, rgba(0,82,128,0.3) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] top-1/3 -right-16 rounded-full pointer-events-none animate-hero-drift"
          style={{
            animationDelay: "1.8s",
            background:
              "radial-gradient(circle, rgba(223,159,87,0.4) 0%, rgba(255,195,46,0.2) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] bottom-0 left-1/3 rounded-full pointer-events-none animate-hero-drift"
          style={{
            animationDelay: "3.2s",
            background:
              "radial-gradient(circle, rgba(83,186,124,0.3) 0%, transparent 60%)",
          }}
        />
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="heroGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
        {/* Floating dots */}
        {floatingDots.map((dot) => (
          <div
            key={`${dot.left}-${dot.top}`}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none animate-hero-dot"
            style={{
              left: dot.left,
              top: dot.top,
              backgroundColor: dot.color,
              animationDelay: dot.delay,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Left text */}
          <div
            className="overflow-visible"
            style={{
              opacity: heroLeftVisible ? 1 : 0,
              transform: heroLeftVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white mb-8">
              <span className="block leading-[1.2] pb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#DF9F57] via-[#FFC32E] to-[#DF9F57] mb-2">
                Elevating Brands
              </span>
              <span className="block mb-4">Through Visual</span>
              <span className="block">Excellence</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
              Transforming Ideas into Impactful Visual Stories
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              data-ocid="hero.primary_button"
              className="group relative overflow-hidden bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-7 py-3.5 rounded-full font-semibold text-base shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
            >
              Book a Creative Consultation
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right images */}
          <div
            className="relative h-[450px] sm:h-[500px] lg:h-[580px] flex items-center justify-center"
            style={{
              opacity: heroRightVisible ? 1 : 0,
              transform: heroRightVisible
                ? "translateX(0)"
                : "translateX(50px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <div
              className="relative z-20 w-[80%] max-w-md animate-hero-float"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src="/assets/Hero image 1.jpeg"
                  alt="Aesthara design work"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -inset-2 rounded-3xl border border-[#DF9F57]/30 pointer-events-none" />
            </div>
            <div
              className="absolute bottom-8 right-0 z-30 w-[55%] max-w-[260px] animate-hero-float"
              style={{ animationDelay: "1.6s" }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#FFC32E]/30">
                <img
                  src="/assets/Hero image 2 (small).png"
                  alt="Design detail"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div
              className="absolute top-0 left-0 w-28 h-28 rounded-full bg-[#094185]/40 blur-2xl pointer-events-none animate-hero-drift"
              style={{ animationDelay: "0.9s" }}
            />
            <div
              className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-[#DF9F57]/30 blur-2xl pointer-events-none animate-hero-drift"
              style={{ animationDelay: "2.4s" }}
            />
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="w-full h-16 md:h-20"
          >
            <path
              d="M0 80L1440 80L1440 40C1200 0 840 60 720 60C600 60 240 0 0 40L0 80Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="relative bg-[#094185] py-4 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static marquee
              <span key={i} className="inline-flex items-center gap-3 px-8">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-semibold text-white/40 tracking-widest uppercase">
                  {item.text}
                </span>
              </span>
            ),
          )}
        </div>
      </div>

      {/* About / Why Aesthara */}
      <section
        id="about"
        className="py-24 bg-slate-50 relative overflow-hidden"
        ref={aboutSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DF9F57]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#005280]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div
              style={{
                opacity: aboutSection.isVisible ? 1 : 0,
                transform: aboutSection.isVisible
                  ? "translateX(0)"
                  : "translateX(-40px)",
                transition: "all 0.7s ease-out",
              }}
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img
                  src="/assets/homepage 2.png"
                  alt="Why Aesthara"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#DF9F57]/20 blur-2xl pointer-events-none" />
            </div>
            {/* Text */}
            <div
              style={{
                opacity: aboutSection.isVisible ? 1 : 0,
                transform: aboutSection.isVisible
                  ? "translateX(0)"
                  : "translateX(40px)",
                transition: "all 0.7s ease-out 0.15s",
              }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-[#094185] mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005280] to-[#DF9F57]">
                  Why Aesthara
                </span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>Aesthara™</strong> is an independent design and
                  creative studio founded by{" "}
                  <a
                    href="https://www.linkedin.com/in/kawaljeet-sk/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#005280] hover:text-[#094185] underline font-medium"
                  >
                    Kawaljeet Singh
                  </a>
                  , focused on building thoughtful, strategy-led brands and
                  specializing in visual communication offerings such as graphic
                  design, high-impact presentation design, and corporate
                  branding.
                </p>
                <p>
                  Blending clarity with aesthetics, Aesthara collaborates with
                  agencies, startups, and enterprises of all scales to build
                  brands that are not only visually distinctive — but
                  strategically aligned for long-term growth.
                </p>
                <p>
                  Every project is personally led and executed with precision,
                  intention, and creative depth.
                </p>
                <p>
                  The approach is rooted in strategic thinking, refined
                  execution, and a commitment to creating lasting brand impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="py-28 bg-white relative overflow-hidden"
        ref={servicesSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DF9F57]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
            style={{
              opacity: servicesSection.isVisible ? 1 : 0,
              transform: servicesSection.isVisible
                ? "translateY(0)"
                : "translateY(40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-[#094185] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005280] to-[#DF9F57]">
                Our Design Services
              </span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-3 text-gray-600">
              <p>
                In today&apos;s fast-paced digital world, great design
                isn&apos;t <strong className="text-[#094185]">optional</strong>{" "}
                — it&apos;s{" "}
                <strong className="text-[#DF9F57]">essential</strong>.
              </p>
              <p>
                From developing compelling proposals and high-impact pitch decks
                to crafting comprehensive marketing collateral, we help
                businesses communicate with clarity and confidence.
              </p>
              <p>
                Our experience spans multiple sectors, including financial
                services, global BPM, D2C brand, business consulting, IT, and
                AI-driven technology firms. We also excel in building cohesive
                brand identities, with a strong focus on healthy food and
                wellness startups.
              </p>
            </div>
          </div>

          <div className="space-y-24">
            {/* Presentation Design */}
            <div
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
              style={{
                opacity: servicesSection.isVisible ? 1 : 0,
                transform: servicesSection.isVisible
                  ? "translateY(0)"
                  : "translateY(40px)",
                transition: "all 0.7s ease-out 0.1s",
              }}
            >
              <div className="flex-1 order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold leading-[1.6] pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#005280] to-[#DF9F57] mb-6">
                  Presentation Design
                </h3>
                <p className="text-gray-600 mb-2">
                  How important is your next presentation to you?
                </p>
                <p className="text-gray-600 mb-4">
                  It would change everything if you could just visually
                  communicate better.
                </p>
                <p className="text-gray-600 mb-4">
                  Creating effective, dynamic presentations that transform your
                  brand, help you win more business and engage with your
                  audience.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "Custom templates & layouts",
                    "Corporate and sales presentations",
                    "Investor and pitch decks",
                    "Infographics",
                    "Animated short videos",
                  ].map((b) => (
                    <span
                      key={b}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-[#094185] font-medium"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#005280] font-medium italic">
                  Tailored to suit your brand&apos;s visual identity.
                </p>
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/assets/PPT Design Services.png"
                    alt="Presentation Design"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#094185]/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Graphic & Visual Design */}
            <div
              className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center"
              style={{
                opacity: servicesSection.isVisible ? 1 : 0,
                transform: servicesSection.isVisible
                  ? "translateY(0)"
                  : "translateY(40px)",
                transition: "all 0.7s ease-out 0.2s",
              }}
            >
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold leading-[1.6] pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#005280] to-[#DF9F57] mb-6">
                  Graphic &amp; Visual Design
                </h3>
                <p className="text-gray-600 mb-2">
                  A comprehensive range of creative solutions
                </p>
                <p className="text-gray-600 mb-4">
                  Comprises the creative process of communicating ideas
                  visually.
                </p>
                <p className="text-gray-600 mb-4">
                  These services ensure clear messaging, strengthen brand
                  presence, and enhance customer engagement.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Marketing Assets",
                    "Flyers and Brochures",
                    "Whitepapers",
                    "Case Studies",
                    "Standees",
                    "Poster and Blog/Article Banners",
                  ].map((b) => (
                    <span
                      key={b}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-[#094185] font-medium"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/assets/Graphic Design Services home.png"
                    alt="Graphic Design"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#094185]/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Branding */}
            <div
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
              style={{
                opacity: servicesSection.isVisible ? 1 : 0,
                transform: servicesSection.isVisible
                  ? "translateY(0)"
                  : "translateY(40px)",
                transition: "all 0.7s ease-out 0.3s",
              }}
            >
              <div className="flex-1 order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold leading-[1.6] pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#005280] to-[#DF9F57] mb-6">
                  Branding
                </h3>
                <p className="text-gray-600 mb-2">
                  Brand identity that stands out
                </p>
                <p className="text-gray-600 mb-4">
                  Branding services cover a wide range of elements that help
                  businesses establish a strong and consistent identity.
                </p>
                <p className="text-gray-600 mb-4">
                  We cover majorly here, Visual &amp; Marketing Assets, Logo
                  Design, Branding Style guidelines, Color Palettes, Typography
                  etc.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Brand's Identity",
                    "Logos Design and Color Palettes",
                    "Typography",
                    "Imagery",
                    "Style Guidelines",
                    "Social Media Post & Ads",
                  ].map((b) => (
                    <span
                      key={b}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-[#094185] font-medium"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/assets/Branding.png"
                    alt="Branding"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#094185]/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-24 bg-gradient-to-br from-[#005280] via-[#094185] to-[#005280] relative overflow-hidden"
        ref={statsRef as React.RefObject<HTMLElement>}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#DF9F57]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFC32E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
              icon={<FileText className="w-10 h-10" />}
              value={2000}
              label="Slides Prepared"
              delay={0}
              triggered={statsTriggered}
            />
            <StatCard
              icon={<Presentation className="w-10 h-10" />}
              value={105}
              label="Presentations Designed"
              delay={100}
              triggered={statsTriggered}
            />
            <StatCard
              icon={<Users className="w-10 h-10" />}
              value={7}
              label="Clients Served"
              delay={200}
              triggered={statsTriggered}
            />
            <StatCard
              icon={<Star className="w-10 h-10" />}
              value={100}
              suffix="%"
              label="Service Excellence"
              delay={300}
              triggered={statsTriggered}
            />
            <StatCard
              icon={<PenTool className="w-10 h-10" />}
              value={60}
              label="Marketing Assets &amp; Branding Projects"
              delay={400}
              triggered={statsTriggered}
            />
          </div>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <PenTool className="w-4 h-4 text-[#FFC32E]" />
              <span className="text-white/80 text-sm">
                * Branding covers — logo design, brand style guidelines, social
                media posts and campaign ads
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand logos */}
      {/* Moved below testimonials */}
      {/* Process */}
      <section
        id="process"
        className="py-24 bg-slate-50 relative overflow-hidden"
        ref={processSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16"
            style={{
              opacity: processSection.isVisible ? 1 : 0,
              transform: processSection.isVisible
                ? "translateY(0)"
                : "translateY(40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <div className="inline-flex items-center gap-2 text-[#DF9F57] font-semibold mb-4 text-sm tracking-wide">
              OUR PROCESS
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#094185] mb-4">
              A Four-Step Journey
            </h2>
            <p className={sectionSubtitleClassName}>From insight to impact.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="relative group"
                style={{
                  opacity: processSection.isVisible ? 1 : 0,
                  transform: processSection.isVisible
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition: `all 0.6s ease-out ${idx * 0.1}s`,
                }}
              >
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#DF9F57]/30 to-transparent z-0 -translate-y-1/2" />
                )}
                <div className="relative h-full bg-white rounded-2xl p-6 border-2 border-[#005280]/20 hover:border-[#005280]/40 transition-all duration-300 hover:shadow-xl shadow-lg text-center flex flex-col">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#DF9F57] to-[#FFC32E] rounded-full flex items-center justify-center text-[#094185] text-sm font-bold shadow-md">
                    {step.num}
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#005280] to-[#094185] rounded-xl flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#094185] mb-0.5">
                    {step.title}
                  </h3>
                  <p className="text-[#DF9F57] text-sm font-medium mb-2">
                    {step.sub}
                  </p>
                  <p className="text-gray-600 text-sm flex-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-24 bg-white relative overflow-hidden"
        ref={testimonialsSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#005280]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#DF9F57]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12"
            style={{
              opacity: testimonialsSection.isVisible ? 1 : 0,
              transform: testimonialsSection.isVisible
                ? "translateY(0)"
                : "translateY(40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <div className="inline-flex items-center gap-2 text-[#DF9F57] font-semibold mb-4 text-sm tracking-wide">
              TESTIMONIALS
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#094185] mb-4">
              Trusted by Our Clients
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className="bg-slate-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
                style={{
                  opacity: testimonialsSection.isVisible ? 1 : 0,
                  transform: testimonialsSection.isVisible
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition: `all 0.6s ease-out ${idx * 0.1}s`,
                }}
              >
                <Quote className="w-8 h-8 text-[#DF9F57]/30 mb-3" />
                <p className="text-gray-600 mb-6 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold text-[#094185] text-base">{t.name}</p>
                  <p className="text-sm text-[#DF9F57] font-medium mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand logos */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#094185] mb-3">
              Clients Served
            </h2>
            <p className={sectionSubtitleClassName}>
              Trusted by Leading Companies
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              "Kisankonnect.jpg",
              "RYVR.jpg",
              "HelloTax JPG.jpg",
              "QT Logo.jpg",
              "Circolife.jpg",
              "Exponentia.jpg",
            ].map((file) => (
              <div key={file} className="flex items-center justify-center w-32 h-16">
                <img
                  src={`/assets/Client logos/${file}`}
                  alt={file.replace(/\.(png|jpe?g)$/i, "")}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section
        id="portfolio"
        className="py-24 bg-white relative overflow-hidden"
        ref={portfolioSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#005280]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#DF9F57]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12"
            style={{
              opacity: portfolioSection.isVisible ? 1 : 0,
              transform: portfolioSection.isVisible
                ? "translateY(0)"
                : "translateY(40px)",
              transition: "all 0.7s ease-out",
            }}
          >
            <div className="inline-flex items-center gap-2 text-[#DF9F57] font-semibold mb-4 text-sm tracking-widest uppercase">
              <Layers className="w-4 h-4" />
              Our Portfolio
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#094185] mb-6">
              Work That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DF9F57] to-[#FFC32E]">
                Inspires
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {portfolioPreviews.map((item, idx) => (
              <div
                key={item.title}
                data-ocid={`portfolio.item.${idx + 1}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
                style={{
                  opacity: portfolioSection.isVisible ? 1 : 0,
                  transform: portfolioSection.isVisible
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition: `all 0.6s ease-out ${idx * 0.1}s`,
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#094185]/0 group-hover:bg-[#094185]/20 transition-all duration-300" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`${item.badgeColor} px-3 py-1.5 rounded-full text-xs font-semibold text-white`}
                    >
                      {item.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-bold text-[#094185] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/portfolio"
              data-ocid="portfolio.primary_button"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-[#DF9F57]/25 hover:shadow-xl hover:shadow-[#DF9F57]/30 transition-all"
            >
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const _Send = Send;
