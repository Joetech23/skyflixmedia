import type { Metadata } from "next";
import AcademyHeader from "@/components/academy/AcademyHeader";
import AcademyFooter from "@/components/academy/AcademyFooter";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyAbout from "@/components/academy/AcademyAbout";
import Programme from "@/components/academy/Programme";
import Curriculum from "@/components/academy/Curriculum";
import Eligibility from "@/components/academy/Eligibility";
import Facilitators from "@/components/academy/Facilitators";
import Partners from "@/components/academy/Partners";
import AcademyFaq from "@/components/academy/AcademyFaq";
import Apply from "@/components/academy/Apply";

export const metadata: Metadata = {
  title: "Skyflix Media Creative Academy — Applications open",
  description:
    "Practical training in photography, videography, editing and livestream production, taught inside a working production house in Abuja.",
};

export default function AcademyPage() {
  return (
    <>
      <AcademyHeader />
      <main>
        <AcademyHero />
        <AcademyAbout />
        <Programme />
        <Curriculum />
        <Eligibility />
        <Facilitators />
        <Partners />
        <AcademyFaq />
        <Apply />
      </main>
      <AcademyFooter />
    </>
  );
}
