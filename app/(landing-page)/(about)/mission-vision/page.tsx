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
    images:"https://idonateapi.kangtido.life/media/22404496-37b3-4b2d-9209-73a38c9efc71.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission & Vision - iDonate",
    description:
      "Explore iDonate’s mission and vision, ensuring trust and impactful giving.",
    images: [
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png`,
    ],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
