import { tv } from "tailwind-variants";

import * as RadixAvatar from "@radix-ui/react-avatar";
import { createComponent } from "components";
import { Image } from "./Image";

const avatar = tv({
  base: "rounded relative overflow-hidden",
  variants: {
    color: {
      gray: "bg-gray-300",
    },
    size: {
      sm: "w-16 h-16",
      md: "w-32 h-32",
      lg: "w-48 h-48",
    },
  },

  defaultVariants: {
    size: "md",
    color: "gray",
  },
});

const Wrapper = createComponent(RadixAvatar.Root, avatar);

export const Avatar = ({ src = "", alt = "", ...props }) => (
  <Wrapper {...props}>
    <Image
      as={RadixAvatar.Image}
      className="object-cover object-center"
      src={src}
      alt={alt}
    />
    <RadixAvatar.Fallback className="block h-full w-full" />
  </Wrapper>
);
