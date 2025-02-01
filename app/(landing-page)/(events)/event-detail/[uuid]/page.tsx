import { Metadata } from "next";
import EventDetail from "@/components/events/even-detail/[uuid]/event-detail";

type EventDetailProps = {
  params: {
    uuid: string;
  };
};
// get Event  Detail 
async function getEventDetails(uuid: string) {

  const response = await fetch(`https://idonateapi.kangtido.life//api/v1/events/get-event-by-uuid/${uuid}`);
  
  const data = await response.json();

  return {
    name: data.name || `Event ${uuid}`,
    description: data.description || `Details about Event ${uuid}`,
  };
}
// Generate metadata dynamically
export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {

  const event = await getEventDetails(params.uuid);

  return {
    title: `${event.name} - Event Details`,
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
    openGraph: {
      title: event.name,
      description: event.description,
      url: `/get-event-by-uuid/${params.uuid}`,
      type: "website",
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
