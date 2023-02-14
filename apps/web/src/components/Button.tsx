import { createComponent } from "components";
import { tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center tracking-wide text-gray-50 rounded active:opacity-90 transition-colors",
  variants: {
    color: {
      default: "bg-zinc-900 hover:bg-zinc-800 text-zinc-50",
      dark: "bg-zinc-900 text-zinc-50 hover:bg-zinc-800",
      primary: "bg-sky-500 text-sky-50 hover:bg-sky-400",
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export const Button = createComponent("button", button);
