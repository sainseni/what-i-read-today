
// import Head from "next/head";

// import { Navbar } from "~/src/components/ui/navbar";

type DefaultLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function DefaultLayout({  children }: DefaultLayoutProps) {
  return (
    <>
      {/* <Head>
        <title>{title}</title>
      </Head> */}
      <div className="flex flex-col h-screen">
        {/* TODO
        <Navbar />
        END TODO */}
        <div className="flex flex-col flex-1 gap-6">
          {/* Content */}
          {children}
        </div>
      </div>
    </>
  );
}
