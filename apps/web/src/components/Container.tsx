import { tv } from "tailwind-variants";
import { createComponent } from "components";

const container = tv({
  base: "px-4 container mx-auto max-w-screen-lg",
});

export const Container = createComponent("section", container);
