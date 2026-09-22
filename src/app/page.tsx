import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Coverage from "@/components/sections/Coverage";
import HowWeWork from "@/components/sections/HowWeWork";
import Gear from "@/components/sections/Gear";
import Team from "@/components/sections/Team";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import AcademyBand from "@/components/sections/AcademyBand";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <Work />
        <Coverage />
        <HowWeWork />
        <Gear />
        <Team />
        <Clients />
        <Testimonials />
        <AcademyBand />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
