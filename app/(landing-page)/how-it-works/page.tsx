import Howitwork from "@/components/howitwork/HowItWorkComponent";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - iDonate",
  description:
    "Discover how iDonate works, from donation submission to approval and transparency.",
  keywords: [
    "iDonate",
    "How It Works",
    "how idonate work",
    "Donation Process",
    "Transparency",
    "Support",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "How It Works - iDonate",
    description:
      "Learn the steps behind the iDonate platform, ensuring transparency and credibility in every donation.",
    url: "https://idonate.istad.co/how-it-works",
    images:"https://idonateapi.kangtido.life/media/22404496-37b3-4b2d-9209-73a38c9efc71.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works - iDonate",
    description:
      "Explore the process behind iDonate, from submitting donations to the verification process.",
    images: [
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/819e4d30-4bcd-4f23-a004-744075dbecbf.png`,
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://idonate.istad.co/how-it-works",
    languages: {
      en: "https://idonate.istad.co/how-it-works",
      km: "https://idonate.istad.co/how-it-works",
    },
  },
};

export default function page() {
  return <Howitwork />;
}
