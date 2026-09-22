import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative grid min-h-[min(86vh,760px)] items-end overflow-hidden bg-ink-pure"
    >
      <Image
        src="/assets/livestream-1.jpeg"
        alt="Skyflix Media multi-camera livestream production"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.35)_100%)]" />
      <div className="shell relative flex w-full flex-col gap-[clamp(20px,3vw,34px)] pb-[clamp(48px,7vw,86px)] pt-[clamp(80px,14vw,150px)]">
        <div
          data-reveal
          className="inline-flex self-start skew-y-[-2deg] bg-red-brand px-[18px] py-[10px] text-[13px] font-bold tracking-[0.22em] text-white"
        >
          SKYFLIX MEDIA · ABUJA, NIGERIA
        </div>
        <h1
          data-reveal
          className="m-0 max-w-[15ch] text-[clamp(42px,8.4vw,112px)] font-extrabold leading-[0.92] tracking-[-0.03em]"
        >
          PERFECTION IN PROFESSION
        </h1>
        <p
          data-reveal
          className="m-0 max-w-[62ch] font-body text-[clamp(17px,2.1vw,27px)] leading-[1.45] text-[#d2d2d2] [text-wrap:pretty]"
        >
          Photography, videography, livestreaming and broadcast production for
          events, faith-based organisations and development partners across
          Nigeria.
        </p>
        <div data-reveal className="mt-[6px] flex flex-wrap gap-[14px]">
          <a href="#contact" className="btn btn-solid px-[30px] py-4 text-[17px]">
            Request a quote
          </a>
          <a href="#work" className="btn btn-ghost px-[30px] py-4 text-[17px]">
            See selected work
          </a>
        </div>
      </div>
    </section>
  );
}
