import { SearchPage } from "@/components/search/SearchOnPageComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - iDonate",
  description:
    "Search for donation requests, organizations, and events on iDonate.",
  keywords: [
    "iDonate",
    "Search",
    "Donation Requests",
    "Organizations",
    "Events",
  ],
  icons: {
    icon: "/logo.png", // Path to your favicon file
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Search - iDonate",
    description:
      "Find donation requests, organizations, and events on iDonate.",
    url: "https://idonate.istad.co/search",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png`,
        width: 1200,
        height: 630,
        alt: "Search - iDonate",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search - iDonate",
    description:
      "Discover donation opportunities, organizations, and events on iDonate.",
    images: [
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png`,
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://idonate.istad.co/search",
    languages: {
      en: "https://idonate.istad.co/search",
      km: "https://idonate.istad.co/search",
    },
  },
};

export default function Events() {
  return (
    <section className="flex flex-col py-9 gap-9 justify-center">
      <div className="w-full mx-auto px-10 md:mx-0 flex flex-col items-center justify-center gap-2">
        <h2
          lang="km"
          className="text-iDonate-navy-primary text-heading-one-khmer dark:text-iDonate-green-primary"
        >
          ស្វែងរក កម្មវិធីបរិច្ចាគដែលអ្នកពេញចិត្ត
        </h2>
        <h4
          lang="km"
          className="text-iDonate-navy-primary text-medium-khmer dark:text-white "
        >
          {" "}
          ស្វែងរកកម្មវិធី រៃអង្គាសដោយ ឈ្មោះនៃអង្គភាព​ ប្រភេទ និង
          កាលបរិច្ឆេទនៃកម្មវិធី
        </h4>
      </div>

      <SearchPage />
    </section>
  );
}
