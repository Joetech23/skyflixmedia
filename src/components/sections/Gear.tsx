import { col } from "@/lib/style";

const kit = [
  {
    label: "CAMERA",
    items: [
      "Full-frame mirrorless bodies",
      "Prime and zoom lens set",
      "Gimbals and sliders",
    ],
  },
  {
    label: "BROADCAST",
    items: [
      "Multi-camera switcher",
      "Encoders and bonded uplink",
      "Programme monitors",
    ],
  },
  {
    label: "AUDIO",
    items: [
      "Digital mixing console",
      "Wireless lavaliers and handhelds",
      "Line array and monitors",
    ],
  },
  {
    label: "LIGHT & POWER",
    items: [
      "LED panels and modifiers",
      "Generators and UPS backup",
      "LED screens and projection",
    ],
  },
];

export default function Gear() {
  return (
    <section id="gear" className="border-t border-ink-line bg-ink-deep">
      <div
        className="shell section-y-sm autofit gap-[clamp(30px,4vw,60px)]"
        style={col("300px")}
      >
        <div data-reveal className="flex flex-col gap-4">
          <div className="eyebrow">
            <span className="eyebrow-text">GEAR &amp; EQUIPMENT</span>
          </div>
          <h2 className="m-0 text-[clamp(28px,3.8vw,48px)] font-extrabold leading-[1.02] tracking-[-0.02em]">
            Kit that shows up ready.
          </h2>
          <p className="m-0 max-w-[48ch] font-body text-[17px] leading-[1.55] text-mute-400">
            Confirm the exact bodies, lenses, switchers and audio units you own
            so this list matches your inventory.
          </p>
        </div>
        <div
          data-reveal
          className="autofit gap-px bg-ink-edge"
          style={col("200px")}
        >
          {kit.map((group) => (
            <div key={group.label} className="bg-ink-panel p-6">
              <div className="font-mono text-xs tracking-[0.14em] text-red-brand">
                {group.label}
              </div>
              <ul className="m-0 mt-3 list-disc pl-[18px] font-body text-base leading-[1.7] text-mute-200">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
