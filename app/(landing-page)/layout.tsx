import "../globals.css";
import { ReactNode } from "react";
import LayoutCompnent from "@/components/loading-page/LayoutComponent";
import { Metadata } from "next";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: "%s - iDonate",
    default: "iDonate",
  },
  description: "iDonate ",
  keywords: [
    "IDONATE",
    "iDonate",
    "idonate",
    "idonate istad",
    "idonate.istad.co",
    "donation",
    "idonate cambodia",
    "charity",
    "Charity",
  ],
  icons: {
    icon: "/logo.png",
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

export default function RootLayout({ children }: RootLayoutProps) {
  return <LayoutCompnent>{children}</LayoutCompnent>;
}
