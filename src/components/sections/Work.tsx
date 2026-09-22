import CoverImage from "@/components/CoverImage";
import { col } from "@/lib/style";

const gridSizes = "(max-width: 900px) 100vw, 45vw";

export default function Work() {
  return (
    <section id="work" className="bg-white text-ink">
      <div className="shell flex flex-col gap-[clamp(14px,2vw,24px)] pb-0 pt-[clamp(56px,8vw,120px)]">
        <div className="eyebrow">
          <span className="eyebrow-text">PORTFOLIO</span>
        </div>
        <h2 data-reveal className="h-display">
          SELECTED WORK
        </h2>
        <p data-reveal className="lede max-w-[70ch] text-[#3a3a3a]">
          Weddings and celebrations. Broadcast and livestream. Documentary and
          field storytelling.
        </p>
      </div>

      <div className="shell flex flex-col gap-[clamp(40px,6vw,88px)] pb-[clamp(56px,8vw,120px)] pt-[clamp(36px,5vw,64px)]">
        {/* Case 01 — wedding */}
        <article
          data-reveal
          className="autofit items-center gap-[clamp(24px,4vw,56px)]"
          style={col("330px")}
        >
          <div className="flex flex-col gap-[18px]">
            <span className="kicker text-red-brand">CASE 01 · WEDDING</span>
            <h3 className="m-0 text-[clamp(28px,3.6vw,48px)] font-extrabold leading-none tracking-[-0.02em]">
              BERRY &amp; CHARRY
            </h3>
            <p className="m-0 font-body text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-[#2b2b2b] [text-wrap:pretty]">
              Skyflix Media captured the beautiful moments of Berry &amp;
              Charry&rsquo;s wedding celebration through creative portraits,
              candid moments and professional event photography, preserving the
              emotions and memories of their special day.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Wedding Photography",
                "Portraiture",
                "Event Documentation",
                "Post-Production",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-ink px-[14px] py-2 font-body text-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[1.2fr_1fr] gap-2 [grid-auto-rows:minmax(110px,1fr)]">
            <CoverImage
              src="/assets/berry-1.jpg"
              alt="The bride celebrating with her friends"
              className="row-span-2"
              sizes={gridSizes}
            />
            <CoverImage
              src="/assets/berry-3.jpg"
              alt="Bridal portrait with bouquet"
              sizes={gridSizes}
            />
            <CoverImage
              src="/assets/berry-2.jpg"
              alt="Exchanging vows at the altar"
              sizes={gridSizes}
            />
          </div>
        </article>

        {/* Case 02 — broadcast (images lead on wide screens) */}
        <article
          data-reveal
          className="autofit items-center gap-[clamp(24px,4vw,56px)]"
          style={col("330px")}
        >
          <div className="order-2 grid grid-cols-2 gap-2 [grid-auto-rows:minmax(110px,1fr)]">
            <CoverImage
              src="/assets/church-livestream-1.jpeg"
              alt="Multi-camera church livestream"
              ratio="16/9"
              className="col-span-2"
              sizes={gridSizes}
            />
            <CoverImage
              src="/assets/livestream-1.jpeg"
              alt="Livestream production desk"
              ratio="4/3"
              sizes={gridSizes}
            />
            <CoverImage
              src="/assets/sound-1.jpeg"
              alt="Sound system set-up"
              ratio="4/3"
              sizes={gridSizes}
            />
          </div>
          <div className="order-1 flex flex-col gap-[18px]">
            <span className="kicker text-red-brand">CASE 02 · BROADCAST</span>
            <h3 className="m-0 text-[clamp(28px,3.6vw,48px)] font-extrabold leading-none tracking-[-0.02em]">
              BROADCAST &amp; LIVESTREAMING
            </h3>
            <p className="m-0 font-body text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-[#2b2b2b] [text-wrap:pretty]">
              We take events beyond the room—delivering reliable, professional
              livestream and broadcast solutions for faith-based organisations,
              conferences and large-scale gatherings. From local events to
              programmes reaching audiences across the Middle Belt and beyond,
              Skyflix helps organisations connect with wider audiences in real
              time.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Livestreaming",
                "Multi-Camera Production",
                "Event Recording",
                "Broadcast Support",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-red-brand px-[14px] py-2 font-body text-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Case 03 — documentary */}
        <article
          data-reveal
          className="autofit items-center gap-[clamp(24px,4vw,56px)]"
          style={col("330px")}
        >
          <div className="flex flex-col gap-[18px]">
            <span className="kicker text-red-brand">CASE 03 · DOCUMENTARY</span>
            <h3 className="m-0 text-[clamp(28px,3.6vw,48px)] font-extrabold leading-none tracking-[-0.02em]">
              DOCUMENTARY &amp; VIDEOGRAPHY
            </h3>
            <p className="m-0 font-display text-[clamp(17px,1.9vw,22px)] font-semibold italic text-red-brand">
              Stories that inform. Stories that create understanding.
            </p>
            <p className="m-0 font-body text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-[#2b2b2b] [text-wrap:pretty]">
              Skyflix documents development, humanitarian and community stories
              across Nigeria, combining beneficiary testimonials, field
              documentation and visual storytelling with a strong commitment to
              consent, dignity and ethical representation.
            </p>
            <p className="m-0 font-body text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-[#2b2b2b] [text-wrap:pretty]">
              Our field experience spans Borno, Yobe, Bauchi, Kaduna, Abuja,
              Nasarawa and Kogi, documenting the realities, needs and
              experiences of communities and beneficiaries.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 [grid-auto-rows:minmax(110px,1fr)]">
            <CoverImage
              src="/assets/humanitarian-3.jpeg"
              alt="Children at a water point, field documentation"
              ratio="16/9"
              className="col-span-2"
              sizes={gridSizes}
            />
            <CoverImage
              src="/assets/humanitarian-1.jpeg"
              alt="Beneficiary interview in the field"
              ratio="4/3"
              sizes={gridSizes}
            />
            <CoverImage
              src="/assets/humanitarian-2.jpeg"
              alt="Community documentation"
              ratio="4/3"
              sizes={gridSizes}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
