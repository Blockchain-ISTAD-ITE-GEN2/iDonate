import CategoryOnPageComponent from "@/components/events/categories/CategoryOnPageComponent";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - iDonate",
  description:
    "Browse all categories on iDonate to discover causes and organizations that align with your values.",
  keywords: [
    "iDonate",
    "Categories",
    "Donation Categories",
    "Charity Causes",
    "Nonprofit Organizations",
  ],
  openGraph: {
    title: "Categories - iDonate",
    description:
      "Explore categories on iDonate and find organizations and causes that matter to you.",
    url: "https://yourwebsite.com/categories",
    images: [
      {
        url: "https://yourwebsite.com/static/categories-banner.jpg",
        width: 1200,
        height: 630,
        alt: "iDonate Categories Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Categories - iDonate",
    description:
      "Find the causes and organizations that matter to you in the iDonate categories.",
    images: ["https://yourwebsite.com/static/categories-banner.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yourwebsite.com/categories",
    languages: {
      en: "https://yourwebsite.com/categories",
      km: "https://yourwebsite.com/kh/categories",
    },
  },
};

export default function Events() {
  return (
    <>
      <CategoryOnPageComponent />
    </>
  );
}
