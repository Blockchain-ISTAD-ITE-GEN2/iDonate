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
  openGraph: {
    title: "How It Works - iDonate",
    description:
      "Learn the steps behind the iDonate platform, ensuring transparency and credibility in every donation.",
    url: "https://idonate.istad.co/how-it-works",
    images: [
      {
        url: "https://idonateapi.kangtido.life/media/50712731-758e-43bb-8d85-37483a95048b.png",
        width: 1200,
        height: 630,
        alt: "How It Works - iDonate",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works - iDonate",
    description:
      "Explore the process behind iDonate, from submitting donations to the verification process.",
    images: ["https://idonateapi.kangtido.life/media/50712731-758e-43bb-8d85-37483a95048b.png"],
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
