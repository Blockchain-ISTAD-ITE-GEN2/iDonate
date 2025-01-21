"use client";

import localFont from "next/font/local";
import "../globals.css";
import { ReactNode, Suspense } from "react";;
import StoreProvider from "../StoreProvider";
import SessionWrapper from "../SessionProvider";
import NavbarComponent from "@/components/navbar/NavbarComponent";

const inter = localFont({
  src: "/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});

const suwannaphum = localFont({
  src: "./fonts/Suwannaphum-Regular.ttf",
  display: "swap",
   preload: true,
  variable: "--font-suwannaphum",
});

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
             className={`min-h-screen w-full overflow-auto scrollbar-hide ${suwannaphum.variable} ${inter.variable}`}
        >
        <body className="flex flex-col h-full bg-background text-foreground">
        <StoreProvider>
          <SessionWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex flex-col flex-1 w-full">
                  <NavbarComponent/>
                <main className="flex-1 w-full">{children}</main>
               
              </div>
            </Suspense>
          </SessionWrapper>
        
        </StoreProvider>
        </body>
        </html>
    );
}