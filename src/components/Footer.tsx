import { CheckCircle, Instagram, Linkedin, Loader2, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import CmsRichText from "./CmsRichText";
import { useCmsPage } from "../hooks/useCmsPage";
import { submitCmsContact } from "../lib/cms/client";
import { mapContactForm, mapGlobal, resolveLogoSrc } from "../lib/cms/mappers";

export default function Footer() {
  const { data: cmsPage, isPending } = useCmsPage("home");
  const global = useMemo(
    () => (isPending ? null : mapGlobal(cmsPage ?? null)),
    [cmsPage, isPending],
  );
  const formCopy = useMemo(
    () => (isPending ? null : mapContactForm(cmsPage ?? null)),
    [cmsPage, isPending],
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  if (isPending || !global || !formCopy) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      message: form.message.trim(),
    };

    if (Object.values(trimmedForm).some((value) => value.length === 0)) {
      setError(formCopy.validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      await submitCmsContact({
        name: trimmedForm.name,
        email: trimmedForm.email,
        phone: trimmedForm.phone,
        subject: trimmedForm.company,
        message: trimmedForm.message,
      });
      setSuccess(true);
      resetForm();
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "The form could not be submitted. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const year = new Date().getFullYear();
  const footerLogo = resolveLogoSrc(global.logoLight);

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#094185]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="footerGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1="5%" y1="10%" x2="20%" y2="30%" stroke="rgba(255,195,46,0.15)" strokeWidth="1" />
          <line x1="20%" y1="30%" x2="35%" y2="15%" stroke="rgba(255,195,46,0.15)" strokeWidth="1" />
          <line x1="35%" y1="15%" x2="50%" y2="40%" stroke="rgba(255,195,46,0.15)" strokeWidth="1" />
          <line x1="50%" y1="40%" x2="65%" y2="20%" stroke="rgba(255,195,46,0.15)" strokeWidth="1" />
          <line x1="65%" y1="20%" x2="80%" y2="45%" stroke="rgba(255,195,46,0.15)" strokeWidth="1" />
          <line x1="80%" y1="45%" x2="95%" y2="25%" stroke="rgba(255,195,46,0.15)" strokeWidth="1" />
          <circle cx="5%" cy="10%" r="3" fill="rgba(255,195,46,0.4)" />
          <circle cx="35%" cy="15%" r="3" fill="rgba(255,195,46,0.4)" />
          <circle cx="65%" cy="20%" r="3" fill="rgba(255,195,46,0.4)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-[#094185] via-[#005280]/90 to-[#094185]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {global.footerHeading}
              </h3>
              <CmsRichText
                html={global.footerSubheading}
                className="text-lg text-white/80"
              />
            </div>
            <div className="space-y-6">
              <img
                src={footerLogo}
                alt={global.logoAlt}
                className="h-12 md:h-14 w-auto object-contain"
              />
              <div className="flex items-center gap-6">
                <a
                  href={global.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>{global.linkedinLabel}</span>
                </a>
                <a
                  href={global.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>{global.instagramLabel}</span>
                </a>
              </div>
              <div className="space-y-2 text-sm">
                <a
                  href={`mailto:${global.email}`}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {global.email}
                </a>
                <a
                  href={`tel:${global.phone.replace(/\s/g, "")}`}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {global.phone}
                </a>
              </div>
              <p className="text-white/60 text-sm">{global.location}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8">
              {success ? (
                <div
                  data-ocid="contact.success_state"
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <CheckCircle className="w-14 h-14 text-[#FFC32E] mb-4" />
                  <h3 className="text-white text-2xl font-bold">
                    {formCopy.successHeading}
                  </h3>
                  <p className="text-white/70 mt-2">{formCopy.successMessage}</p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-[#FFC32E] underline text-sm"
                  >
                    {formCopy.successResetLabel}
                  </button>
                </div>
              ) : (
                <>
                  <h4 className="text-xl font-bold text-white mb-6">
                    {formCopy.formHeading}
                  </h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder={formCopy.placeholderName}
                        data-ocid="contact.input"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder={formCopy.placeholderEmail}
                        data-ocid="contact.input"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder={formCopy.placeholderPhone}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        required
                        placeholder={formCopy.placeholderCompany}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                    </div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder={formCopy.placeholderMessage}
                      data-ocid="contact.textarea"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50 resize-none"
                    />
                    {error && (
                      <p
                        data-ocid="contact.error_state"
                        className="text-red-400 text-sm"
                      >
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      data-ocid="contact.submit_button"
                      className="w-full bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {loading ? formCopy.submittingLabel : formCopy.submitLabel}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {global.copyrightName} © {year}
          </p>
          <Link
            to="/privacy-policy"
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            {global.privacyLinkLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
