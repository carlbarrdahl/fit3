import { tv } from "tailwind-variants";

import { createComponent } from ".";

const image = tv({
  base: "block w-full h-full",
});

export const Image = createComponent("img", image);
