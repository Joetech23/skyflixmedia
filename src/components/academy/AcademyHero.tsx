import Image from "next/image";

export default function AcademyHero() {
  return (
    <section className="relative grid min-h-[min(80vh,700px)] items-end overflow-hidden bg-ink-pure">
      <Image
        src="/assets/livestream-2.jpeg"
        alt="Skyflix Media crew at work"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.3)_100%)]" />
      <div className="shell relative flex w-full flex-col gap-[clamp(18px,3vw,32px)] pb-[clamp(48px,7vw,86px)] pt-[clamp(72px,12vw,140px)]">
        <div
          data-reveal
          className="inline-flex self-start skew-y-[-2deg] bg-red-brand px-[18px] py-[10px] text-[13px] font-bold tracking-[0.22em] text-white"
        >
          FIRST EDITION · APPLICATIONS OPEN
        </div>
        <h1
          className="m-0 max-w-[18ch] text-[clamp(38px,7.4vw,98px)] font-extrabold leading-[0.93] tracking-[-0.03em]"
        >
          SKYFLIX MEDIA CREATIVE ACADEMY
        </h1>
        <p
          data-reveal
          className="m-0 max-w-[60ch] font-body text-[clamp(17px,2.1vw,27px)] leading-[1.45] text-[#d2d2d2] [text-wrap:pretty]"
        >
          Practical training in photography, videography, editing and livestream
          production — taught inside a working production house in Abuja.
        </p>
        <div data-reveal className="mt-[6px] flex flex-wrap gap-[14px]">
          <a href="#apply" className="btn btn-solid px-[30px] py-4 text-[17px]">
            Apply now
          </a>
          <a
            href="#curriculum"
            className="btn btn-ghost px-[30px] py-4 text-[17px]"
          >
            See the curriculum
          </a>
        </div>
      </div>
    </section>
  );
}
