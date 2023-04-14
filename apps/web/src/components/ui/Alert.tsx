import { createComponent } from ".";
import { tv } from "tailwind-variants";

const alert = tv({
  base: "flex flex-col justify-center rounded-lg border-2 py-4 px-2 gap-4",
  variants: {
    border: {
      default: "",
      dashed: "border-dashed ",
    },
    variant: {
      default: "border-zinc-700 ",
      warning: "border-yellow-300 ",
      success: "border-green-200 bg-green-50 text-green-900 ",
    },
  },
  defaultVariants: {
    border: "default",
    variant: "default",
  },
});

export const Alert = createComponent("div", alert);
