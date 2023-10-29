import { headers } from "next/headers";

export const getUrlState = () => {
  const headerList = headers();

  const searchParams = headerList.get("x-request-search");
  const pathname = headerList.get("x-request-pathname");
  const domain = headerList.get("x-request-domain");
  const url = headerList.get("x-request-url");

  return { searchParams, pathname, domain, url };
};
