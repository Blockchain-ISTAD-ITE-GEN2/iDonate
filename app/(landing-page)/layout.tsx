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
      "https://idonateapi.kangtido.life/media/819e4d30-4bcd-4f23-a004-744075dbecbf.png",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return <LayoutCompnent>{children}</LayoutCompnent>;
}
