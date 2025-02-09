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
    icon: "/public/logo.png",
    shortcut: "/public/logo.png",
    apple: "/public/logo.png",
  },
  openGraph: {
    title: {
      template: "%s - iDATA",
      default: "iDATA",
    },
    description:
      "iDonate is a blockchain-based donation platform designed to enhance transparency, accountability, and efficiency in charitable giving",
    url: "https://idata.istad.co",
    type: "website",
    locale: "kh_KH",
    images:
      "https://idonateapi.kangtido.life/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return <LayoutCompnent>{children}</LayoutCompnent>;
}
