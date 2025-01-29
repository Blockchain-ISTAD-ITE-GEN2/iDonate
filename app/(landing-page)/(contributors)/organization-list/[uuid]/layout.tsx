"use client";

import { ReactNode, Suspense } from "react";
import Loader from "@/app/loading";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full">
    
      {/* Main Content with Suspense for loading */}
      <Suspense fallback={<Loader />}>
        <main className="w-full flex-grow overflow-y-auto">{children}</main>
      </Suspense>
    </div>
  );
}
