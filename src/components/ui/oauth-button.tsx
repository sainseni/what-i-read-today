import { cva } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";

import { cn } from "~/src/utils/cn";

type OAuthButtonProps = {
  provider: Provider;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Provider = "github" | "google";

type Icon = {
  icon: IconType;
  name: string;
};

type ProviderIcon = {
  [key in Provider]: Icon;
};

const providerIcons: ProviderIcon = {
  github: {
    icon: IoLogoGithub,
    name: "Github",
  },
  google: {
    icon: FcGoogle,
    name: "Google",
  },
};

const oauthButtonVariants = cva(
  [
    "inline-flex items-center gap-1",
    "px-4 lg:px-12 py-2 min-w-max",
    "shadow-md border border-opacity-30 rounded",
    "hover:bg-opacity-90 focus:bg-opacity-80",
    // "focus:active:scale-[0.98] hover:scale-[1.02]", // animation -> NOTE: optional, maybe we dont need this
    // "transition-all duration-100 ease-in-out", // animation -> NOTE: optional, maybe we dont need this
  ],
  {
    variants: {
      provider: {
        github: ["text-vprimary-50", "bg-vprimary-500"],
        google: ["text-vprimary-400", "bg-white"],
      },
    },
    defaultVariants: {
      provider: "google",
    },
  },
);

export function OAuthButton({
  provider,
  children,
  className,
}: OAuthButtonProps) {
  const Icon = providerIcons[provider].icon;
  return (
    <a href={`/login/${provider}`}>
      <button
        className={cn(
          oauthButtonVariants({
            provider,
            className,
          }),
        )}
      >
        <Icon size="1.2em" className="mr-2 w-7 h-7" />
        {children}
      </button>
    </a>
  );
}
