"use client";

import { useRouter } from "next/navigation";
import type { MouseEventHandler } from "react";
import { useCallback, useEffect, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/src/components/ui/dialog";
interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export function ModalIntercept({ title, children }: ModalProps) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    // <div
    //   ref={overlay}
    //   className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
    //   onClick={onClick}
    // >
    //   <div
    //     ref={wrapper}
    //     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
    //   >
    //     {children}
    //   </div>
    // </div>
    <div ref={overlay} onClick={onClick}>
      <div ref={wrapper}>
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{children}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
