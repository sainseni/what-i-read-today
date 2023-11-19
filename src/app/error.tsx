"use client";

import { ErrorPage } from "~/src/components/ui/error-page";

export const metadata = {
  title: "Internal Server Error",
};

export default function Error() {
  return (
    <ErrorPage message="Internal Server Error">
      <p className="text-vprimary-400">
        Sorry, we had some trouble loading the page you requested.
      </p>
    </ErrorPage>
  );
}
