import "~/src/styles/globals.css";
import "@fontsource-variable/inter";

import { Providers } from "~/src/app/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <>{children}</>
        </Providers>
      </body>
    </html>
  );
}
