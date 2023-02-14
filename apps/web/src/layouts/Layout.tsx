import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIsFetching } from "@tanstack/react-query";
import { Wallet, Zap } from "lucide-react";

import { Button } from "components/Button";
import { BaseLayout } from "./BaseLayout";
import site from "config/site";

const Logo = () => {
  const isFetching = useIsFetching();
  return (
    <Link
      href={"/"}
      className="flex items-center pl-1 text-xs font-bold tracking-widest hover:text-white"
    >
      <div className="relative -top-0.5 mr-2">
        <Zap
          className={clsx("h-4 w-4  transition-colors", {
            ["animate-ping text-yellow-300"]: isFetching,
          })}
        />
      </div>
      {site.title}
    </Link>
  );
};

export const Layout = ({
  children,
  fab,
}: { fab?: ReactNode } & PropsWithChildren) => {
  return (
    <BaseLayout>
      <header className="flex items-center justify-between p-1">
        <Logo />
        <div className="flex items-center gap-1 text-xs">
          <NavLink label="Train" href={`/`} />
          <NavLink label="Leaderboard" href={`/leaderboard`} />
          <NavLink label="?" href={`/about`} />
          <Link href={`/wallet`} className="">
            <Button color="dark" className="rounded-full py-2 px-2">
              <Wallet className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>
      <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-orange-400  to-pink-500 " />
      <div className="p-4">{children}</div>
    </BaseLayout>
  );
};

const NavLink = ({ href = "", label = "" }) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link
      className={clsx(
        "rounded p-3 underline-offset-2  hover:text-white hover:underline",
        {
          ["underline"]: isActive,
        }
      )}
      href={href}
    >
      {label}
    </Link>
  );
};
