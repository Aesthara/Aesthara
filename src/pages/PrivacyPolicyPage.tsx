import { getRouteApi } from "@tanstack/react-router";
import CmsRichText from "../components/CmsRichText";
import { usePageSeo } from "../hooks/usePageSeo";
import { mapPageSeo, mapPrivacyPolicy } from "../lib/cms/mappers";

const privacyRouteApi = getRouteApi("/privacy-policy");

export default function PrivacyPolicyPage() {
  // Settled loader data — dynamic first; static only when page is truly null.
  const { page: cmsPage } = privacyRouteApi.useLoaderData();
  const seo = mapPageSeo("privacy-policy", cmsPage);
  usePageSeo(seo.title, seo.description);
  const policy = mapPrivacyPolicy(cmsPage);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#005280] via-[#094185] to-[#005280] py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full bg-[#DF9F57]/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-[#FFC32E]/20 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {policy.title}
          </h1>
          <p className="mt-4 text-sm text-white/80">
            {policy.effectiveDate} | {policy.lastUpdated}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white shadow-xl rounded-3xl border border-slate-200 p-10">
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <section>
              <CmsRichText html={policy.intro} />
            </section>

            {policy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-[#005280] mb-3">
                  {section.heading}
                </h2>
                <CmsRichText
                  html={section.body}
                  className="[&_a]:text-[#005280] [&_ul]:list-disc [&_ul]:list-inside [&_ul]:pl-4 [&_ul]:mt-2 [&_ul]:space-y-1"
                />
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
