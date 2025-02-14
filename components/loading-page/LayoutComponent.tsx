"use client";

import { ReactNode, Suspense } from "react";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import OrganizationSidebarComponent from "@/components/organization/sidebar/OrganizationSidebarComponent";
import FooterComponent from "@/components/footer/FooterComopent";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";
import NavbarBanner from "../landing/banner/navbar-banner";

type RootLayoutProps = {
  children: ReactNode;
};

export default function LayoutCompnent({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const showSidebar = pathname.startsWith("/organization-dashboard/");

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavbarBanner/>
        <NavbarComponent />
      </header>

      <Suspense fallback={<Loader />}>
        {showSidebar ? (
          <div className="w-full h-full flex flex-grow">
            <aside className="flex-shrink-0 hidden md:block flex-grow">
              <OrganizationSidebarComponent />
            </aside>
            <main className="w-full flex-grow overflow-auto scrollbar-hide">
              {children}
            </main>
          </div>
        ) : (
          <div className="w-full flex-grow overflow-y-auto">
            <main>{children}</main>
          </div>
        )}
      </Suspense>

      {!showSidebar && (
        <footer className="bg-iDonate-white-space">
          <FooterComponent />
        </footer>
      )}
    </div>
  );
}
