import { createComponent } from ".";

import { tv } from "tailwind-variants";

const heading = tv({
  base: "mb-2 uppercase tracking-wider text-zinc-600",
  variants: {
    size: {
      md: "text-md",
    },
  },
});

export const H3 = createComponent("h3", heading);
