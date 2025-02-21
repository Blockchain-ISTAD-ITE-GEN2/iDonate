// "use client";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import SessionWrapper from "@/components/session/SessionWrapper";
import CheckConnection from "@/components/checkConnection/CheckConnection";
import StoreProvider from "./StoreProvider";
import { ThemeProviders } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/google/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    template: "%s - iDonate",
    default: "iDonate",
  },
  description: "iDonate ",
  keywords: [
    "IDONATE",
    "iDonate",
    "idonate istad",
    "idonate.istad",
    "idonate.istad.co",
    "donation",
    "donation cambodia",
    "charity",
    "Charity",
  ],
  icons: {
    icon: "/logo.png", // Path to your favicon file
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: {
      template: "%s - iDonate",
      default: "iDonate",
    },
    description:
      "iDonate is a blockchain-based donation platform designed to enhance transparency, accountability, and efficiency in charitable giving",
    url: "https://idonate.istad.co",
    type: "website",
    locale: "kh_KH",
    images:"https://idonateapi.kangtido.life/media/22404496-37b3-4b2d-9209-73a38c9efc71.png"
  },
};

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
        <GoogleAnalytics />
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
