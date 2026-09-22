import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "16/9". Omit inside grids that size rows. */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** 0–1, painted as a dimming overlay on top of the image. */
  opacity?: number;
};

/** Image that fills its box with object-fit: cover, matching the design's grids. */
export default function CoverImage({
  src,
  alt,
  ratio,
  className = "",
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority = false,
  opacity,
}: Props) {
  return (
    <div
      className={`relative block h-full w-full overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", opacity }}
      />
    </div>
  );
}
