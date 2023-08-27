import React from "react";
import { SiteHeader } from "./SiteHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SiteHeader />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="w-full max-w-2xl">{children}</div>
      </div>
    </main>
  );
}
