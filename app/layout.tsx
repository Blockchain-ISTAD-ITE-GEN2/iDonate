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
  openGraph: {
      title: {
          template: "%s - iDATA",
          default: "iDATA",
      },
      description: "iDonate is a blockchain-based donation platform designed to enhance transparency, accountability, and efficiency in charitable giving",
      url: "https://idata.istad.co",
      type: "website",
      locale: "kh_KH",
      images: [
        {
            url: "https://idonateapi.kangtido.life/media/287b8ea2-c365-42e0-8683-57f57f2d5e78.png",
            width: 1200,  
            height: 630,
            alt: "iDonate Banner"
        }
    ],
    }
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
