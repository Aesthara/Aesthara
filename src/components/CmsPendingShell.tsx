/** Neutral pending shell while CMS loaders resolve — never static marketing copy. */
export default function CmsPendingShell() {
  return (
    <div
      className="min-h-screen bg-slate-50 flex items-center justify-center"
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="h-8 w-8 rounded-full border-2 border-[#005280]/30 border-t-[#005280] animate-spin" />
    </div>
  );
}
