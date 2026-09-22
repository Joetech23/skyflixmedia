import Image from "next/image";
import Link from "next/link";
import { col } from "@/lib/style";

export default function AcademyBand() {
  return (
    <section className="relative overflow-hidden bg-ink-pure">
      <Image
        src="/assets/livestream-2.jpeg"
        alt="Skyflix crew on location"
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.55)_100%)]" />
      <div
        className="shell section-y-sm autofit relative items-center gap-[clamp(28px,4vw,56px)]"
        style={col("300px")}
      >
        <div className="flex flex-col gap-5">
          <span className="kicker self-start skew-y-[-2deg] bg-red-brand px-[18px] py-[10px] text-white">
            SKYFLIX MEDIA CREATIVE ACADEMY
          </span>
          <h2 className="m-0 text-[clamp(32px,4.8vw,64px)] font-extrabold leading-[0.98] tracking-[-0.02em]">
            Learn the craft from a working production house.
          </h2>
          <p className="lede max-w-[56ch] text-[#d2d2d2]">
            Programmes, curriculum, eligibility, facilitators and applications —
            all on the Academy page.
          </p>
        </div>
        <div className="flex flex-wrap justify-start gap-[14px]">
          <Link
            href="/academy"
            className="btn btn-solid px-[34px] py-[18px] text-[18px]"
          >
            Visit the Academy
          </Link>
          <Link
            href="/academy#apply"
            className="btn btn-ghost px-[34px] py-[18px] text-[18px]"
          >
            Apply now
          </Link>
        </div>
      </div>
    </section>
  );
}
