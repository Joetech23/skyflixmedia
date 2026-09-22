import { col } from "@/lib/style";

const stats = [
  { value: "7", label: "states of field experience" },
  { value: "4", label: "production disciplines" },
  { value: "50+", label: "creatives to be trained through the Academy" },
  { value: "1", label: "standard, on every job" },
];

export default function StatsBar() {
  return (
    <div className="bg-red-brand">
      <div
        className="shell autofit gap-[clamp(20px,3vw,40px)] py-[clamp(28px,4vw,44px)]"
        style={col("170px")}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-[clamp(34px,4.4vw,54px)] font-extrabold leading-none">
              {stat.value}
            </div>
            <div className="mt-1 font-body text-base leading-[1.3] text-red-softer">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
