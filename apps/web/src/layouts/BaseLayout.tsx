import site from "config/site";
import Head from "next/head";
import { PropsWithChildren, useEffect } from "react";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  useMobileHeightFix();

  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="application-name" content={site.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={site.title} />
        <meta name="description" content={site.description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-center bg-black font-mono text-sm md:py-16">
        <div
          className="app container relative mx-auto flex h-screen max-w-md flex-col overflow-hidden bg-zinc-900 text-zinc-300 md:rounded-xl md:shadow-2xl"
          style={{ maxHeight: 851, height: `calc(var(--vh, 1vh) * 100)` }}
        >
          {children}
        </div>
      </main>
    </>
  );
};

function useMobileHeightFix() {
  useEffect(() => {
    function setHeight() {
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);
}
