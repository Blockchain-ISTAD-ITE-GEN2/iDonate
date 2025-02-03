import { TabsDonorProfile } from "@/components/donor/donor-tab/donor-tabs-profile";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donor Dashboard - iDonate",
  description:
    "Access your personalized donor dashboard on iDonate to manage donations, track your impact, and discover verified causes.",
  keywords: [
    "iDonate",
    "Donor Dashboard",
    "Manage Donations",
    "Track Impact",
    "Donation Platform",
  ],
  openGraph: {
    title: "Donor Dashboard - iDonate",
    description:
      "Manage your donations, track your impact, and explore verified causes on your iDonate donor dashboard.",
    url: "https://idonate.istad.co/donor-dashboard",
    images: [
      {
        url: "https://idonateapi.kangtido.life/media/819e4d30-4bcd-4f23-a004-744075dbecbf.png",
        width: 1200,
        height: 630,
        alt: "Donor Dashboard Preview",
      },
    ],
    type: "website",
  },
  robots: {
    index: false, // Prevent search engines from indexing the dashboard page
    follow: false,
  },
  alternates: {
    canonical: "https://idonate.istad.co/donor-dashboard",
    languages: {
      en: "https://idonate.istad.co/donor-dashboard",
      km: "https://idonate.istad.co/donor-dashboard",
    },
  },
};

export default function ContributorDonor({
  params,
}: {
  params: { uuid: string };
}) {
  return (
    <section className="flex flex-col p-4 sm:p-6 lg:p-9 ">
      <TabsDonorProfile />
      {/* <DonorProfileComponent /> */}
    </section>
  );
}
