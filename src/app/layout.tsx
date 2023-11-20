import "~/src/styles/globals.css";
import "@fontsource-variable/inter";

import { Providers } from "~/src/app/providers";
import { Toaster } from "~/src/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
