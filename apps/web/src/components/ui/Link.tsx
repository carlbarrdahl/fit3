import { createComponent } from ".";
import NextLink from "next/link";

import { tv } from "tailwind-variants";

const link = tv({
  base: "text-sky-600 hover:text-sky-800",
  variants: {
    color: {},
  },
});

export const Link = createComponent(NextLink, link);
