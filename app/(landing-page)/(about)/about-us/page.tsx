import AboutUsComponent from "@/components/about-us/AboutUsComponen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - iDonate",
  description:
    "Learn more about the team and mentors behind iDonate, ensuring transparency and credibility in donation requests.",
  keywords: ["iDonate", "About Us", "Team", "Mentors", "Donation Platform"],
  openGraph: {
    title: "About Us - iDonate",
    description:
      "Meet the passionate team and mentors who ensure transparency and credibility on iDonate.",
    url: "https://yourwebsite.com/about",
    images: [
      {
        url: "https://yourwebsite.com/static/team-photo.jpg",
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
    images: ["https://yourwebsite.com/static/team-photo.jpg"],
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
    canonical: "https://yourwebsite.com/about",
    languages: {
      en: "https://yourwebsite.com/about",
      km: "https://yourwebsite.com/kh/about",
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
