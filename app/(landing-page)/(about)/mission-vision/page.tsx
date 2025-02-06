import MissionVisionComponent from "@/components/mission-vision/MissionVisionComponent";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Mission & Vision - iDonate",
  description:
    "Discover the mission and vision that drive iDonate to create a trustworthy and impactful donation platform.",
  keywords: [
    "iDonate",
    "Mission",
    "Vision",
    "Donation Platform",
    "Transparency",
    "Impact",
  ],
  openGraph: {
    title: "Our Mission & Vision - iDonate",
    description:
      "Learn about iDonate’s mission to ensure transparency and our vision for creating a world of impactful donations.",
    url: "https://idonate.istad.co/mission-vision",
    images: [
      {
        url: "https://idonateapi.kangtido.life/media/0b967dfd-0897-4197-b631-c24affbd812b.png",
        width: 1200,
        height: 630,
        alt: "iDonate Mission and Vision Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission & Vision - iDonate",
    description:
      "Explore iDonate’s mission and vision, ensuring trust and impactful giving.",
    images: [
      "https://idonateapi.kangtido.life/media/819e4d30-4bcd-4f23-a004-744075dbecbf.png",
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
    canonical: "https://idonate.istad.co/mission-vision",
    languages: {
      en: "https://idonate.istad.co/mission-vision",
      km: "https://idonate.istad.co/mission-vision",
    },
  },
};

export default function page() {
  return <MissionVisionComponent />;
}
