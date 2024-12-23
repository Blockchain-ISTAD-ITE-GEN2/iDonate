"use client";
import { Toolbar } from "@/components/filter/toolbar";
import { OrganizationEventType } from "@/difinitions/dto/Organization-event";
import { useEffect, useState } from "react";
import { OrganizationEventCard } from "./event-organization-card";
import events from "@/data/organizaation-event-data.json";

export function OrganizationEventPage() {
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

    const [filteredEvents, setFilteredEvents] = useState<OrganizationEventType[]>(typedEvents);

    useEffect(() => {
        setFilteredEvents(typedEvents); // Reset filtered events whenever `events` prop changes
      }, [typedEvents]);
      

  return (
    <>
      <Toolbar
        events={typedEvents}
        filtersFace={filtersFace}
        searchKey={"title"}
        onFilterChange={setFilteredEvents}
        filtersDateRange={filtersDateRange}
      />
      {filteredEvents.map((event, index) => (
        <OrganizationEventCard key={index} event={event} />
      ))}
    </>
  );
}
