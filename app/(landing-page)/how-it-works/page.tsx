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
    icon: "/public/logo.png",
    shortcut: "/public/logo.png",
    apple: "/public/logo.png",
  },
  openGraph: {
    title: "How It Works - iDonate",
    description:
      "Learn the steps behind the iDonate platform, ensuring transparency and credibility in every donation.",
    url: "https://idonate.istad.co/how-it-works",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png`,
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
