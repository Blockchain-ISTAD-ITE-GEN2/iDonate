// Page Detail
import HeroSectionCategoryComponent from "@/components/events/categories/HeroSectionCategoryComponent";
import CategoryDetailComponent from "@/components/events/categories/CategoryDetailComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - iDonate",
  description:
    "Browse through various organizations on iDonate, discover their missions, and get involved.",
  keywords: [
    "iDonate",
    "categories",
    "Categories",
    "Nonprofit Categories",
    "Charity Organizations",
    "Support",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Organizations - iDonate",
    description:
      "Find nonprofit organizations on iDonate and learn about their missions and how you can contribute.",
    url: "https://idonate.istad.co/organizations",
    images:"https://idonateapi.kangtido.life/media/22404496-37b3-4b2d-9209-73a38c9efc71.png",
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

export default function Page(props: { params: { uuid: string } }) {
  return (
    <section className="flex flex-col gap-9 justify-center">
      {/*Start Hero Section*/}
      <HeroSectionCategoryComponent />

      <CategoryDetailComponent />
    </section>
  );
}
