"use client";

import "../globals.css";
import { ReactNode, Suspense } from "react";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import OrganizationSidebarComponent from "@/components/organization/sidebar/OrganizationSidebarComponent";
import FooterComponent from "@/components/footer/FooterComopent";
import { usePathname } from "next/navigation";
import Loader from "../loading";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: {
//       template: "%s - iDonate",
//       default: "iDonate",
//   },
//   description: "iDonate ",
//   keywords: [
//       "IDONATE",
//       "iDonate",
//       "idonate",
//       "idonate.istad",
//       "idonate.istad.co",
//       "donation",
//       "donation cambodia",
//       "charity",
//       "Charity",
//   ],
//   openGraph: {
//       title: {
//           template: "%s - iDATA",
//           default: "iDATA",
//       },
//       description: "iDATA dashboard for managing user data.",
//       url: "https://idata.istad.co",
//       type: "website",
//       locale: "kh_KH",
//       images: "https://idonateapi.kangtido.life/media/a1108ea2-b140-4a4c-b07d-21aa141853f5.png",
//   }
// };

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const showSidebar = pathname.startsWith("/organization-dashboard/");

  return (
    <div className="flex flex-col h-full w-full">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
