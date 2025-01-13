import { TabsDonorProfile } from "@/components/donor/donor-tab/donor-tabs-profile";

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Donor Dashboard - iDonate',
    description: 'Access your personalized donor dashboard on iDonate to manage donations, track your impact, and discover verified causes.',
    keywords: ['iDonate', 'Donor Dashboard', 'Manage Donations', 'Track Impact', 'Donation Platform'],
    openGraph: {
        title: 'Donor Dashboard - iDonate',
        description: 'Manage your donations, track your impact, and explore verified causes on your iDonate donor dashboard.',
        url: 'https://yourwebsite.com/donor-dashboard',
        images: [
            {
                url: 'https://yourwebsite.com/static/donor-dashboard-banner.jpg',
                width: 1200,
                height: 630,
                alt: 'Donor Dashboard Preview',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Donor Dashboard - iDonate',
        description: 'View your donations, track your impact, and explore causes on your iDonate donor dashboard.',
        images: ['https://yourwebsite.com/static/donor-dashboard-banner.jpg'],
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    robots: {
        index: false, // Prevent search engines from indexing the dashboard page
        follow: false,
    },
    alternates: {
        canonical: 'https://yourwebsite.com/donor-dashboard',
        languages: {
            en: 'https://yourwebsite.com/donor-dashboard',
            km: 'https://yourwebsite.com/kh/donor-dashboard',
        },
    },
};


export default function ContributorDonor() {
  return (
    <section className="flex flex-col p-9">
      <TabsDonorProfile />
      {/* <DonorProfileComponent /> */}
    </section>
  );
}
