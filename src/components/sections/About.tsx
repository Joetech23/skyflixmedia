import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import { col } from "@/lib/style";

export default function About() {
  return (
    <section id="about" className="bg-white text-ink">
      <div
        className="shell section-y autofit items-center gap-[clamp(32px,5vw,72px)]"
        style={col("340px")}
      >
        <div
          data-reveal
          className="flex flex-col gap-[clamp(18px,2.4vw,28px)]"
        >
          <div className="eyebrow">
            <span className="eyebrow-text">WHO WE ARE</span>
          </div>
          <h2 className="m-0 text-[clamp(30px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.02em]">
            We make the moment outlive the event.
          </h2>
          <p className="lede text-[#2b2b2b] !leading-[1.55]">
            Skyflix Media is a multimedia production company working across
            photography, videography, livestreaming and broadcast support. We
            cover weddings and private celebrations, church programmes and
            conferences, and we document development and humanitarian work in
            the field.
          </p>
          <p className="lede text-[#2b2b2b] !leading-[1.55]">
            Every project is handled end to end — planning, production and post
            — with a standard we hold to on every shoot.
          </p>
          <Link
            href="/academy"
            className="self-start border-b-[3px] border-red-brand pb-1 font-body text-[17px] font-semibold text-ink transition-colors hover:text-red-brand"
          >
            Meet the Creative Academy →
          </Link>
        </div>
        <div
          data-reveal
          className="grid grid-cols-2 gap-2 [grid-auto-rows:minmax(120px,1fr)]"
        >
          <CoverImage
            src="/assets/wedding.jpeg"
            alt="Wedding coverage by Skyflix Media"
            ratio="16/9"
            className="col-span-2"
            sizes="(max-width: 900px) 100vw, 45vw"
          />
          <CoverImage
            src="/assets/humanitarian-1.jpeg"
            alt="Field documentation"
            ratio="4/3"
            sizes="(max-width: 900px) 50vw, 22vw"
          />
          <CoverImage
            src="/assets/church-livestream-1.jpeg"
            alt="Church livestream production"
            ratio="4/3"
            sizes="(max-width: 900px) 50vw, 22vw"
          />
        </div>
      </div>
    </section>
  );
}
