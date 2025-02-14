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
  description:
    "iDonate is a blockchain-powered donation platform that ensures transparency, security, and accountability in charitable giving. Support causes with confidence through our decentralized and tamper-proof donation system. Join iDonate Cambodia today and make a real impact with secure, verifiable donations",
  keywords: [
    "IDONATE",
    "iDonate",
    "iDonate istad",
    "idonate istad",
    "idonate",
    "iDonate Cambodia",
    "idonate Cambodia",
    "charity Cambodia",
    "Charity Cambodia",
    "blockchain donation",
    "crypto charity",
    "transparent donation platform",
    "secure donations",
    "Cambodia donation platform",
    "donate with cryptocurrency",
    "decentralized charity",
    "tamper-proof donations",
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
    images:
      "https://idonateapi.kangtido.life/media/22404496-37b3-4b2d-9209-73a38c9efc71.png",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return <LayoutCompnent>{children}</LayoutCompnent>;
}
