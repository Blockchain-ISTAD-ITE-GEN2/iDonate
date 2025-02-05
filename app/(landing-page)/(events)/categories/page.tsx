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
        url: "https://idonateapi.kangtido.life/media/819e4d30-4bcd-4f23-a004-744075dbecbf.png",
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
    images: [
      "https://idonateapi.kangtido.life/media/819e4d30-4bcd-4f23-a004-744075dbecbf.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://idonate.istad.co/categories",
    languages: {
      en: "https://idonate.istad.co/categories",
      km: "https://idonate.istad.co/categories",
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
