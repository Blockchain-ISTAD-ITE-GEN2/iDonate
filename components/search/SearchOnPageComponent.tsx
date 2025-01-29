"use client";

import { useEffect, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";
import { EventType } from "@/difinitions/dto/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { useGetEventsQuery } from "@/redux/services/event-service";

export function SearchPage() {
  const { data: events } = useGetEventsQuery({});
  const typedEvents: EventType[] = events?.content || [];

  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(typedEvents);

  const filtersFace = [
    {
      key: "name",
      title: "Events",
      options: Array.from(new Set(typedEvents.map((event) => event.name))).map(
        (name) => ({
          label: name,
          value: name,
        })
      ),
    },
    {
      key: "total_donor",
      title: "Donor Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_donor))
      )
        .filter((donor) => donor != null) // Filter null values
        .map((donor) => ({
          label: donor.toString(),
          value: donor.toString(),
        })),
    },
    {
      key: "total_amount",
      title: "Amount Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_amount))
      )
        .filter((amount) => amount != null) // Filter null values
        .map((amount) => ({
          label: amount.toString(),
          value: amount.toString(),
        })),
    },
  ];

  useEffect(() => {
    setFilteredEvents(typedEvents); 
  }, [typedEvents]);


  return (
    <section className="flex flex-col gap-6 container mx-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <Toolbar
          events={typedEvents}
          filtersFace={filtersFace}
          searchKey="name"
          onFilterChange={setFilteredEvents}
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredEvents.map((event) => (
            <CommonEventCard key={event.uuid} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}