import Howitwork from "@/components/howitwork/HowItWorkComponent";
import React from "react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works - iDonate',
  description: 'Discover how iDonate works, from donation submission to approval and transparency.',
  keywords: ['iDonate', 'How It Works', 'Donation Process', 'Transparency', 'Support'],
  openGraph: {
    title: 'How It Works - iDonate',
    description: 'Learn the steps behind the iDonate platform, ensuring transparency and credibility in every donation.',
    url: 'https://yourwebsite.com/how-it-works',
    images: [
      {
        url: 'https://yourwebsite.com/static/how-it-works-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'How It Works - iDonate',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works - iDonate',
    description: 'Explore the process behind iDonate, from submitting donations to the verification process.',
    images: ['https://yourwebsite.com/static/how-it-works-banner.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://yourwebsite.com/how-it-works',
    languages: {
      en: 'https://yourwebsite.com/how-it-works',
      km: 'https://yourwebsite.com/kh/how-it-works',
    },
  },
};

export default function page() {
  return <Howitwork />;
}
