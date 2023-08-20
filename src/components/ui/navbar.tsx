import { Logo } from "~/src/components/ui/logo";
import { paths } from "~/src/lib/constant";
import { cn } from "~/src/utils/cn";
export function Navbar() {
  return (
    <div className="container-custom">
      <div className="flex flex-row items-center justify-between w-full">
        <Logo />
        <div className="hidden lg:flex">Navigaviton Menu</div>
        {/* TODO : convert to or use from component button */}
        <a
          href={paths.signin.path}
          className={cn(
            "text-white bg-vprimary-500 rounded",
            "px-4 py-2 text-sm lg:text-base lg:px-6",
            "hover:bg-opacity-90 focus:bg-opacity-80",
            // "focus:active:scale-[0.98] hover:scale-[1.02]", // animation -> NOTE: optional, maybe we dont need this
            // "transition-all duration-100 ease-in-out", // animation -> NOTE: optional, maybe we dont need this
          )}
        >
          {paths.signin.label}
        </a>
        {/* END TODO */}
      </div>
    </div>
  );
}
