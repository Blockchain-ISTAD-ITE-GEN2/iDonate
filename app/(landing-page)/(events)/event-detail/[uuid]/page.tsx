import { Metadata } from "next";
import EventDetail from "@/components/events/even-detail/[uuid]/event-detail";

type EventDetailProps = {
  params: { uuid: string };
};

async function getEventDetails(uuid: string) {
  const response = await fetch(
    `https://idonateapi.kangtido.life/api/v1/events/get-event-by-uuid/${uuid}`
  );

  const data = await response.json();

  return {
    name: data.name || `Event ${uuid}`,
    description: data.description || `Details about Event ${uuid}`,
    image: data.images?.[0] || "https://idonateapi.kangtido.life/media/8b894c24-57a5-42ff-8293-313e50b7aa32.png",
  };
}

export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {
  const event = await getEventDetails(params.uuid);

  return {
    title: `${event.name} - iDonate`,
    description: event.description,
    keywords: [
      "IDONATE",
      "event detail",
      "idonate",
      "idonate istad",
      "idonate.istad.co",
      "donation",
      "idonate cambodia",
      "charity",
      "Charity",
    ],
    icons: {
      icon: "/public/logo.png",
      shortcut: "/public/logo.png",
      apple: "/public/logo.png",
    },
    openGraph: {
      title: event.name,
      description: event.description,
      url: `https://idonate.istad.co/event-detail/${params.uuid}`, // ✅ Full URL
      type: "website",
      images: [
        {
          url: event?.image, // ✅ Ensure an image is always included
          width: 1200,
          height: 630,
          alt: event.name,
        },
      ],
    },
  };
}

export default function EvenDetailPage({ params }: EventDetailProps) {
  return (
    <section className="flex flex-col p-9">
      <EventDetail />
    </section>
  );
}
