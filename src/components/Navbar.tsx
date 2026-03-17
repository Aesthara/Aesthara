import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const location = useRouterState({ select: (s) => s.location });

  const pathname = location.pathname.replace(/\/+$/g, "") || "/";
  const isHome = pathname === "/";
  const variant = isHome ? "transparent" : "light";

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (variant !== "transparent") return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      router.navigate({ to: "/" });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isTransparent = variant === "transparent";

  const navBg = isTransparent
    ? scrolled
      ? "bg-[#005280]/90 backdrop-blur-md shadow-md"
      : "bg-transparent"
    : "bg-[#005280]/95 backdrop-blur-md shadow-sm";

  const linkClass = isTransparent
    ? "px-4 py-2 text-sm font-medium transition-colors rounded-lg text-white/70 hover:text-white hover:bg-white/5"
    : "px-4 py-2 text-sm font-medium transition-colors rounded-lg text-white/80 hover:text-white hover:bg-white/10";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      style={{
        transform: mounted ? "translateY(0)" : "translateY(-100px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              src={
                isTransparent
                  ? "/assets/Aesthara white.png"
                  : "/assets/Aesthara color.png"
              }
              alt="Aesthara"
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" data-ocid="nav.home_link" className={linkClass}>
              Home
            </Link>
            <button
              type="button"
              onClick={() => scrollTo("services")}
              data-ocid="nav.services_link"
              className={`${linkClass} cursor-pointer bg-transparent border-none`}
            >
              Services
            </button>
            <Link
              to="/portfolio"
              data-ocid="nav.portfolio_link"
              className={linkClass}
            >
              Portfolio
            </Link>
            <button
              type="button"
              onClick={() => scrollTo("about")}
              data-ocid="nav.about_link"
              className={`${linkClass} cursor-pointer bg-transparent border-none`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              data-ocid="nav.contact_link"
              className={`${linkClass} cursor-pointer bg-transparent border-none`}
            >
              Contact
            </button>
          </div>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              data-ocid="nav.primary_button"
              className="group relative overflow-hidden bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center gap-1.5"
            >
              Book a Consultation
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <button
            type="button"
            className={`md:hidden p-2 rounded-lg ${isTransparent ? "text-white" : "text-[#094185]"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden bg-[#005280]/95 border-t border-white/10 backdrop-blur-md"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={linkClass}
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => scrollTo("services")}
              className={`${linkClass} text-left cursor-pointer bg-transparent border-none`}
            >
              Services
            </button>
            <Link
              to="/portfolio"
              onClick={() => setMobileOpen(false)}
              className={linkClass}
            >
              Portfolio
            </Link>
            <button
              type="button"
              onClick={() => scrollTo("about")}
              className={`${linkClass} text-left cursor-pointer bg-transparent border-none`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className={`${linkClass} text-left cursor-pointer bg-transparent border-none`}
            >
              Contact
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="group bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] font-semibold text-sm px-5 py-2.5 rounded-full w-fit inline-flex items-center gap-1.5"
              >
                Book a Consultation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
