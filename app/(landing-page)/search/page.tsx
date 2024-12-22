import { CommonEventCard } from "@/components/events/organization-event/CommonEventCad";
import { EventType } from "@/difinitions/dto/EventType";
import events from "@/data/events-data.json";

export default function Events() {
  const typedEvents: EventType[] = events;

  const filtersFace = [
    {
      key: "title",
      title: "Events",
      options: Array.from(
          new Set(typedEvents.map((event) => event.title))
      ).map((event) => ({
        label: event,
        value: event,
      })),
    },
    {
      key: "total_donor",
      title: "Donor Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_donor))
      ).map((donor) => ({
        label: donor.toString(),
        value: donor.toString(),
      })),
    },

    {
      key: "total_amount",
      title: "Amount Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_amount))
      ).map((amount) => ({
        label: amount.toString(),
        value: amount.toString(),
      })),
    },
  ];

    return (
      <section className="py-9">
          <CommonEventCard searchKey="title" filtersFace={filtersFace} events={typedEvents} />
      </section>
    );
  }