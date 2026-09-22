import SiteNav from "@/components/SiteNav";

export default function AcademyHeader() {
  return (
    <SiteNav
      homeHref="/"
      badge="CREATIVE ACADEMY"
      links={[
        { href: "#programme", label: "Programme" },
        { href: "#curriculum", label: "Curriculum" },
        { href: "#eligibility", label: "Eligibility" },
        { href: "#facilitators", label: "Facilitators" },
        { href: "/", label: "Main site", tone: "muted" },
      ]}
      cta={{ href: "#apply", label: "Apply now" }}
    />
  );
}
