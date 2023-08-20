import Image from "next/image";
import Link from "next/link";

import logoIcon from "~/src/assets/Logo.svg";
import { paths } from "~/src/lib/constant";

export function Logo() {
  return (
    <div>
      <Link
        href={paths.signin.path}
        className="inline-flex items-center gap-1 text-2xl font-bold"
      >
        <Image src={logoIcon} alt="Logo What I Read Today" />
        WIRT
      </Link>
    </div>
  );
}
