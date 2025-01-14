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
    url: "https://yourwebsite.com/mission-vision",
    images: [
      {
        url: "https://yourwebsite.com/static/mission-vision-banner.jpg",
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
    images: ["https://yourwebsite.com/static/mission-vision-banner.jpg"],
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
    canonical: "https://yourwebsite.com/mission-vision",
    languages: {
      en: "https://yourwebsite.com/mission-vision",
      km: "https://yourwebsite.com/kh/mission-vision",
    },
  },
};

export default function page() {
  return <MissionVisionComponent />;
}
