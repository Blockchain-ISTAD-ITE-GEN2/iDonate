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
    url: "https://idonate.istad.co/organizations",
    images: [
      {
        url: "https://idonateapi.kangtido.life/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png",
        width: 1200,
        height: 630,
        alt: "Organizations Banner",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://idonate.istad.co/organizations",
    languages: {
      en: "https://idonate.istad.co/organizations",
      km: "https://idonate.istad.co/organizations",
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
