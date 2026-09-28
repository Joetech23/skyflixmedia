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
import ApplyDialog from "@/components/academy/ApplyDialog";

export const metadata: Metadata = {
  title: "Photography & Visual Storytelling Bootcamp — Skyflix Media Creative Academy",
  description:
    "Apply for the Photography & Visual Storytelling Bootcamp — a three-day practical programme for young creatives aged 16–30. 13–15 October 2026, Maiduguri, Borno State.",
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
      <ApplyDialog />
    </>
  );
}
