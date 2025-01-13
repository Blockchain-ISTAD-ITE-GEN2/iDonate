import { EventDetail } from "@/components/events/even-detail/event-detail";

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Event Detail - iDonate',
    description: 'Learn more about the iDonate event, its purpose, and how you can get involved to make a difference.',
    keywords: ['iDonate', 'Event Detail', 'Fundraising Event', 'Charity Event', 'Get Involved'],
    openGraph: {
        title: 'Event Detail - iDonate',
        description: 'Discover all the details about the iDonate event. Join us and contribute to the cause.',
        url: 'https://yourwebsite.com/events/event-detail',
        images: [
            {
                url: 'https://yourwebsite.com/static/event-detail-banner.jpg',
                width: 1200,
                height: 630,
                alt: 'Event Detail Banner',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Event Detail - iDonate',
        description: 'Get all the details on the iDonate event, including how to participate and donate.',
        images: ['https://yourwebsite.com/static/event-detail-banner.jpg'],
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
        canonical: 'https://yourwebsite.com/events/event-detail',
        languages: {
            en: 'https://yourwebsite.com/events/event-detail',
            km: 'https://yourwebsite.com/kh/events/event-detail',
        },
    },
};

export default function EvenDetailPage() {
  return (
    <section className="flex flex-col p-9">
      <EventDetail />
    </section>
  );
}
