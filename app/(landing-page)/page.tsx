import CategoryCardComponent from "@/components/events/categories/CategoryCardComponent";
import HeroSectionComponent from "@/components/herosection/HeroSectionComponent";
import TotalOrganizationComponent from "@/components/landing/TotalOrganizationComponent";
import LatestDonationCard from "@/components/landing/latest-donation-event/LatestDonationCard";
import TestimonialCarousel from "@/components/testimonials/TestimonailCardComponent";
import BannerLandingCard from "@/components/landing/banner/BannerLandingCard";
import UpcomingEvents from "@/components/landing/upcoming-event/UpComingEventComponent";
import { BarAndLineChartLanding } from "@/components/landing/transaction/bar-and-line-chart-landing";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "iDonate - Empowering Transparent Donations",
  description:
    "iDonate is a trusted platform connecting donors with verified organizations to ensure transparency and credibility in donations.",
  keywords: [
    "iDonate",
    "idonate",
    "idonate istad",
    "Donation Platform",
    "Transparent Donations",
    "Charity",
    "Nonprofit",
  ],
  openGraph: {
    title: "iDonate - Empowering Transparent Donations",
    description:
      "Join iDonate to make impactful and transparent donations. Explore verified organizations and trusted causes.",
    url: "https://idonate.istad.co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/819e4d30-4bcd-4f23-a004-744075dbecbf.png`,
        width: 1200,
        height: 630,
        alt: "iDonate Home Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iDonate - Empowering Transparent Donations",
    description:
      "Make donations you can trust with iDonate. Explore verified organizations and causes.",
    images: [
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png`,
    ],
  },
  icons: {
    icon: "/public/logo.png",
    shortcut: "/public/logo.png",
    apple: "/public/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://idonate.istad.co",
    languages: {
      en: "https://idonate.istad.co",
      km: "https://idonate.istad.co",
    },
  },
};

export default function Homepage() {
  return (
    <section className="flex flex-col items-center gap-9">
      {/* Here section */}
      <HeroSectionComponent />
      {/* category */}
      <section className="w-full px-6 md:px-12 lg:px-24 space-y-6 text-center">
        {/* Section Header */}
        <div className="space-y-2">
          <h2
            lang="km"
            className="p-2 text-xl font-medium text-iDonate-green-primary dark:text-iDonate-green-secondary "
          >
            តើអ្វីខ្លះដែលយើងត្រូវធ្វើ?
          </h2>
          <h3
            lang="km"
            className="p-3 text-2xl font-medium text-iDonate-navy-primary dark:text-iDonate-navy-accent"
          >
            ការបរិច្ចាគរបស់អ្នក ជាសេចក្តីអំណរបស់អ្នកដទៃ !
          </h3>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-9">
          <CategoryCardComponent />
        </div>
      </section>

      {/* Total Organization */}
      <TotalOrganizationComponent />

      {/* Bar and Line Chart */}
      <section className="w-full">
        <BarAndLineChartLanding />
      </section>

      {/* Latest Donation */}
      <section className="w-full">
        <div className="space-y-2">
          {/*Test Github actions 3 */}
          <h3
            lang="km"
            className="mb-5 p-2 text-2xl text-iDonate-navy-primary text-center dark:text-iDonate-navy-accent"
          >
            កម្មវិធីបរិច្ចាគចុងក្រោយបំផុត
          </h3>
          <LatestDonationCard />
        </div>
      </section>

      {/* Testimonail */}
      <section className="w-full">
        <TestimonialCarousel />
      </section>

      {/* Banner Landing Card */}
      <section className="w-full">
        <BannerLandingCard />
      </section>

      {/* upcoming events */}
      <section className="w-full flex flex-col items-center">
        <UpcomingEvents />
      </section>
    </section>
  );
}
