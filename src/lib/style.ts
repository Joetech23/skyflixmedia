import type { CSSProperties } from "react";

/** Minimum column width for `.autofit` grids, as a CSS custom property. */
export const col = (min: string): CSSProperties =>
  ({ "--col": min }) as CSSProperties;
