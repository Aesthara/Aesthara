import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronRight,
  Layers,
  PenTool,
  Quote,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CmsRichText from "../components/CmsRichText";
import { useCmsPage } from "../hooks/useCmsPage";
import { usePageSeo } from "../hooks/usePageSeo";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { processIcon, statIcon } from "../lib/cms/icons";
import {
  mapClients,
  mapHomeAbout,
  mapHomeHero,
  mapMarquee,
  mapPageSeo,
  mapPortfolioPreview,
  mapProcess,
  mapServiceBlocks,
  mapServicesHeader,
  mapStats,
  mapTestimonials,
} from "../lib/cms/mappers";

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
  const { data: cmsPage } = useCmsPage("home");
  const seo = mapPageSeo("home", cmsPage ?? null);
  usePageSeo(seo.title, seo.description);

  const hero = mapHomeHero(cmsPage ?? null);
  const marqueeItems = mapMarquee(cmsPage ?? null);
  const about = mapHomeAbout(cmsPage ?? null);
  const servicesHeader = mapServicesHeader(cmsPage ?? null);
  const serviceBlocks = mapServiceBlocks(cmsPage ?? null);
  const stats = mapStats(cmsPage ?? null);
  const process = mapProcess(cmsPage ?? null);
  const testimonials = mapTestimonials(cmsPage ?? null);
  const clients = mapClients(cmsPage ?? null);
  const portfolioPreview = mapPortfolioPreview(cmsPage ?? null);

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
                {hero.headlineLine1}
              </span>
              <span className="block mb-4">{hero.headlineLine2}</span>
              <span className="block">{hero.headlineLine3}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
              {hero.subheadline}
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              data-ocid="hero.primary_button"
              className="group relative overflow-hidden bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-7 py-3.5 rounded-full font-semibold text-base shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2"
            >
              {hero.ctaLabel}
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
                  src={hero.imagePrimary}
                  alt={hero.imagePrimaryAlt}
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
                  src={hero.imageSecondary}
                  alt={hero.imageSecondaryAlt}
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
                  src={about.image}
                  alt={about.imageAlt}
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
                  {about.heading}
                </span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <CmsRichText html={about.paragraph1} className="[&_a]:text-[#005280] [&_a]:hover:text-[#094185] [&_a]:underline [&_a]:font-medium" />
                <p>{about.paragraph2}</p>
                <p>{about.paragraph3}</p>
                <p>{about.paragraph4}</p>
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
                {servicesHeader.heading}
              </span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-3 text-gray-600">
              <CmsRichText
                html={servicesHeader.intro1}
                className="[&_strong:first-of-type]:text-[#094185] [&_strong:last-of-type]:text-[#DF9F57]"
              />
              <p>{servicesHeader.intro2}</p>
              <p>{servicesHeader.intro3}</p>
            </div>
          </div>

          <div className="space-y-24">
            {serviceBlocks.map((block, idx) => {
              const isReverse = block.layout === "image-left";
              const rowClass = isReverse
                ? "flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center"
                : "flex flex-col lg:flex-row gap-8 lg:gap-12 items-center";
              const textOrder = isReverse ? "flex-1" : "flex-1 order-2 lg:order-1";
              const imgOrder = isReverse ? "flex-1" : "flex-1 order-1 lg:order-2";
              return (
                <div
                  key={block.title}
                  className={rowClass}
                  style={{
                    opacity: servicesSection.isVisible ? 1 : 0,
                    transform: servicesSection.isVisible
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transition: `all 0.7s ease-out ${0.1 + idx * 0.1}s`,
                  }}
                >
                  <div className={textOrder}>
                    <h3 className="text-2xl sm:text-3xl font-bold leading-[1.6] pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#005280] to-[#DF9F57] mb-6">
                      {block.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{block.paragraph1}</p>
                    <p className="text-gray-600 mb-4">{block.paragraph2}</p>
                    <p className="text-gray-600 mb-4">{block.paragraph3}</p>
                    <div className={`flex flex-wrap gap-2${block.footnote ? " mb-4" : ""}`}>
                      {block.tags.map((b) => (
                        <span
                          key={b}
                          className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-[#094185] font-medium"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    {block.footnote ? (
                      <p className="text-sm text-[#005280] font-medium italic">
                        {block.footnote}
                      </p>
                    ) : null}
                  </div>
                  <div className={imgOrder}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={block.image}
                        alt={block.imageAlt}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#094185]/20 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              );
            })}
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
            {stats.items.map((stat, idx) => (
              <StatCard
                key={stat.label}
                icon={statIcon(stat.iconKey)}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={idx * 100}
                triggered={statsTriggered}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <PenTool className="w-4 h-4 text-[#FFC32E]" />
              <span className="text-white/80 text-sm">{stats.footnote}</span>
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
              {process.eyebrow}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#094185] mb-4">
              {process.heading}
            </h2>
            <p className={sectionSubtitleClassName}>{process.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.steps.map((step, idx) => (
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
                {idx < process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#DF9F57]/30 to-transparent z-0 -translate-y-1/2" />
                )}
                <div className="relative h-full bg-white rounded-2xl p-6 border-2 border-[#005280]/20 hover:border-[#005280]/40 transition-all duration-300 hover:shadow-xl shadow-lg text-center flex flex-col">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#DF9F57] to-[#FFC32E] rounded-full flex items-center justify-center text-[#094185] text-sm font-bold shadow-md">
                    {step.num}
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#005280] to-[#094185] rounded-xl flex items-center justify-center shadow-md">
                    {processIcon(step.iconKey)}
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
              {testimonials.eyebrow}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#094185] mb-4">
              {testimonials.heading}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.items.map((t, idx) => (
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
              {clients.heading}
            </h2>
            <p className={sectionSubtitleClassName}>{clients.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {clients.logos.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center w-32 h-16">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain grayscale"
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
              {portfolioPreview.eyebrow}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#094185] mb-6">
              {portfolioPreview.heading}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DF9F57] to-[#FFC32E]">
                {portfolioPreview.headingHighlight}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {portfolioPreview.items.map((item, idx) => (
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
              to={portfolioPreview.ctaHref}
              data-ocid="portfolio.primary_button"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-[#DF9F57]/25 hover:shadow-xl hover:shadow-[#DF9F57]/30 transition-all"
            >
              {portfolioPreview.ctaLabel}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
