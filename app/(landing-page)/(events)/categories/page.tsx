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
  icons: {
    icon: "/public/logo.png",
    shortcut: "/public/logo.png",
    apple: "/public/logo.png",
  },
  openGraph: {
    title: "Categories - iDonate",
    description:
      "Explore categories on iDonate and find organizations and causes that matter to you.",
    url: "https://yourwebsite.com/categories",
    images:"https://idonateapi.kangtido.life/media/22404496-37b3-4b2d-9209-73a38c9efc71.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Categories - iDonate",
    description:
      "Find the causes and organizations that matter to you in the iDonate categories.",
    images: [
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png`,
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
