"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
      <div className="font-mono text-cyan-400 animate-pulse text-sm tracking-widest">
        [SYSTEM] 404_NOT_FOUND. REDIRECTING TO ROOT...
      </div>
    </div>
  );
}
