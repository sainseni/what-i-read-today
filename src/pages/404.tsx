import Link from "next/link";

import { ErrorPage } from "~/src/components/ui/error-page";

export default function ErrorPage404() {
  return (
    <ErrorPage message="Page Not Found">
      <p className="text-vprimary-400">
        Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on
        the homepage
      </p>
      <Link href="/" passHref legacyBehavior>
        <a className="px-3 py-2 text-white rounded w-28 bg-vprimary-500">
          Go back
        </a>
      </Link>
    </ErrorPage>
  );
}
