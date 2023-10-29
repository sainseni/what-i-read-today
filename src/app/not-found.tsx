import Link from "next/link";

import { ErrorPage } from "~/src/components/ui/error-page";

export default function NotFound() {
  return (
    <ErrorPage message="Page Not Found">
      <p className="text-vprimary-400">
        Sorry, we can&apos;t find that page.
        <br />
        You&apos;ll find lots to explore on the homepage
      </p>
      <Link
        href="/"
        className="px-3 py-2 text-white rounded w-28 bg-vprimary-500"
      >
        Go back
      </Link>
    </ErrorPage>
  );
}
