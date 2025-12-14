"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt) return null;

  return (
    <Button onClick={() => deferredPrompt.prompt()} className="cursor-pointer px-4" variant="ghost" >
      Install Web
    </Button>
  );
}
