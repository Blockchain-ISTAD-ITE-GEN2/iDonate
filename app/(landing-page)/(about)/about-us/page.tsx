import AboutUsComponent from "@/components/about-us/AboutUsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - iDonate",
  description:
    "Learn more about the team and mentors behind iDonate, ensuring transparency and credibility in donation requests.",
  keywords: ["iDonate", "About Us", "Team", "Mentors", "Donation Platform"],
  openGraph: {
    title: "About Us - iDonate",
    description:
      "Meet the passionate  team and mentors who ensure transparency and credibility on iDonate.",
    url: "https://idonate.istad.co/about-us",
    images: [
      {
        url: "https://idonateapi.kangtido.life/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png",
        width: 1200,
        height: 630,
        alt: "iDonate Team Photo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - iDonate",
    description:
      "Discover the team and mentors behind iDonate, ensuring trust and credibility in donations.",
    images: [
      "https://idonateapi.kangtido.life/media/0b967dfd-0897-4197-b631-c24affbd812b.png",
    ],
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
    canonical: "https://idonate.istad.co/about-us",
    languages: {
      en: "https://idonate.istad.co/about-us",
      km: "https://idonate.istad.co/about-us",
    },
  },
};
export default function page() {
  return (
    <section className="flex flex-col">
      <AboutUsComponent />
    </section>
  );
}
