// import Head from "next/head";
import Image from "next/image";

import notFoundSvg from "~/public/svg/not-found.svg";

interface ErrorPageProps {
  svg?: typeof notFoundSvg;
  message?: string;
  children: React.ReactNode;
}

export const ErrorPage = ({
  svg = notFoundSvg,
  message = "Page Not Found",
  children,
}: ErrorPageProps) => {
  return (
    <>
      {/* <Head>
        <title>{message}</title>
      </Head> */}
      <main className="flex items-center justify-center w-screen min-h-screen bg-white">
        <div className="flex flex-col items-center max-w-lg gap-4 text-center">
          <Image src={svg} alt="Not found" priority />
          <h1 className="text-5xl font-bold">{message}</h1>
          {children}
        </div>
      </main>
    </>
  );
};
