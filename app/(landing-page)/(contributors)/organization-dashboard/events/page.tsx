"use client";

import { OrganizationEventCard } from "@/components/organization/card/event-organization-card";
import events from "@/data/organizaation-event-data.json";
import { OrganizationEventType } from "@/difinitions/dto/Organization-event";
import { useState, useMemo } from "react";

export default function Contributor() {
  const typedEvents: OrganizationEventType[] = events;

  // State for storing filter values
  const [filtersApplied, setFiltersApplied] = useState<Record<string, any>>({});

  // Handle filter change
  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFiltersApplied(newFilters);  // Directly update state without the deep comparison
  };


  // Memoize filters for performance optimization
  const filters = useMemo(() => [
    {
      key: "title",
      title: "Events",
      options: Array.from(
        new Set(typedEvents.map((event) => event.title)) // Extract unique event titles
      ).map((event) => ({
        label: event,
        value: event,
      })),
    },
    {
      key: "total_raised",
      title: "Amount Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_raised)) // Extract unique total_raised values
      ).map((total_raised) => ({
        label: total_raised.toString(),
        value: total_raised.toString(),
      })),
    },
  ], [typedEvents]); // Recompute filters only when events change

  // Filter events based on applied filters
  const filteredEvents = useMemo(() => {
    return typedEvents.filter((event) => {
      if (filtersApplied.title && event.title !== filtersApplied.title) {
        return false;
      }

      if (filtersApplied.total_raised) {
        const amount = Number(filtersApplied.total_raised);
        if (event.total_raised !== amount) {
          return false;
        }
      }

      return true;
    });
  }, [filtersApplied, typedEvents]);


  return (
    <section lang="km" className="flex flex-col p-9 gap-6">
      <OrganizationEventCard
        events={filteredEvents} // Pass the filtered events
        searchKey="title"
        filters={filters}
        dateField="order_date"
        onFilterChange={handleFilterChange} // Allow updates to filters
      />
    </section>
  );
}
