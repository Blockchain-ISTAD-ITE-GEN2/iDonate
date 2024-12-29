"use client";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import { ThemeProvider } from "next-themes";
import OrganizationSidebarComponent from "@/components/organization/sidebar/OrganizationSidebarComponent";
import SessionWrapper from "@/components/SessionWrapper";
import FooterComponent from "@/components/footer/FooterComopent";
import { ThemeProviders } from "./providers";
import { usePathname } from "next/navigation";
import { Inter, Suwannaphum } from 'next/font/google'

const inter = Inter({
  weight: ["100", '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: "--font-inter",
})
const suwannaphum = Suwannaphum({
  weight: [ "300", "400", "700", "900"],
  subsets: ['khmer'],
  variable: "--font-suwannaphum",
})

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const showSidebar = pathname.startsWith("/organization-dashboard/");

  return (
    <html
      lang="en"
      className={`min-h-screen w-full overflow-auto scrollbar-hide ${suwannaphum.variable} ${inter.variable}`}
    >
      <body className="flex flex-col h-full bg-background text-foreground">
        <SessionWrapper>
          <ThemeProviders>
            <div className="flex flex-col h-full w-full">
              <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <NavbarComponent />
              </header>

              {showSidebar ? (
                <div className="w-full h-full flex flex-grow">
                  {/* Sidebar */}
                  <aside className="flex-shrink-0 hidden md:block flex-grow">
                    <OrganizationSidebarComponent />
                    {/*   {children} */}
                  </aside>

                  {/* Main Content */}
                  <main className="w-full flex-grow overflow-auto scrollbar-hide">
                    {children}
                  </main>
                </div>
              ) : (
                <div className="w-full flex-grow overflow-y-auto">
                  <main>{children}</main>
                </div>
              )}

              {!showSidebar && (
                <footer className="bg-iDonate-white-space">
                  <FooterComponent />
                </footer>
              )}
            </div>
          </ThemeProviders>
        </SessionWrapper>
      </body>
    </html>
  );
}
