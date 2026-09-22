import SiteNav from "@/components/SiteNav";

export default function SiteHeader() {
  return (
    <SiteNav
      homeHref="#top"
      links={[
        { href: "#work", label: "Work" },
        { href: "#services", label: "Services" },
        { href: "/academy", label: "Academy", tone: "accent" },
        { href: "#about", label: "About" },
        { href: "#team", label: "Team" },
      ]}
      cta={{ href: "#contact", label: "Get a quote" }}
    />
  );
}
