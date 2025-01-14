import OrganizationOnPageComponent from "@/components/events/organization-event/OrganizationOnPageComponent";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizations - iDonate",
  description:
    "Browse through various organizations on iDonate, discover their missions, and get involved.",
  keywords: [
    "iDonate",
    "Organizations",
    "Nonprofit Organizations",
    "Charity Organizations",
    "Support",
  ],
  openGraph: {
    title: "Organizations - iDonate",
    description:
      "Find nonprofit organizations on iDonate and learn about their missions and how you can contribute.",
    url: "https://yourwebsite.com/organizations",
    images: [
      {
        url: "https://yourwebsite.com/static/organizations-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Organizations Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organizations - iDonate",
    description:
      "Explore nonprofit organizations on iDonate and get involved with the causes you care about.",
    images: ["https://yourwebsite.com/static/organizations-banner.jpg"],
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
    canonical: "https://yourwebsite.com/organizations",
    languages: {
      en: "https://yourwebsite.com/organizations",
      km: "https://yourwebsite.com/kh/organizations",
    },
  },
};

export default function Events() {
  return (
    <>
      <OrganizationOnPageComponent />
    </>
  );
}
