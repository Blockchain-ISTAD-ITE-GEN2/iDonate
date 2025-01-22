"use client";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import SessionWrapper from "@/components/session/SessionWrapper";
import CheckConnection from "@/components/checkConnection/CheckConnection";
import StoreProvider from "./StoreProvider";
import { ThemeProviders } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = localFont({
  src: "/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["serif"],
});

const suwannaphum = localFont({
  src: "/fonts/Suwannaphum-Regular.ttf",
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
          {/* <CheckConnection> */}
            <SessionWrapper>
              <ThemeProviders>
                {children}
                <Toaster />
              </ThemeProviders>
            </SessionWrapper>
          {/* </CheckConnection> */}
        </StoreProvider>
      </body>
    </html>
  );
}
