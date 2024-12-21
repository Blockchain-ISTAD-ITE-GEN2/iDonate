"use client";
import { OrganizationEventCard } from "@/components/organization/card/event-organization-card";
import events from "@/data/organizaation-event-data.json";
import { OrganizationEventType } from "@/difinitions/dto/Organization-event";

export default function Contributor() {
  const typedEvents: OrganizationEventType[] = events;

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
      key: "total_raised",
      title: "Amount Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_raised))
      ).map((amount) => ({
        label: amount.toString(),
        value: amount.toString(),
      })),
    },
  ];

  const filtersDateRange = [
    {
      key: "order_date", // Assuming we are filtering by the event's order_date
      title: "Date Range",
    },
  ];

  return (
    <section lang="km" className="flex flex-col p-9 gap-6">
      <OrganizationEventCard
        events={typedEvents}
        searchKey="title"
        filtersFace={filtersFace}
        filtersDateRange={filtersDateRange}
      />
    </section>
  );
}
