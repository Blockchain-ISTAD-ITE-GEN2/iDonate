"use client";

import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { Button } from "@/components/ui/button";
import { EventType } from "@/difinitions/types/event/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { useGetEventByCategoryQuery } from "@/redux/services/event-service";
import { useState } from "react";
import { CategoryPlaceholder } from "./CategoryPlaceholder";

export default function CategoryWithEventComponent({
  category,
}: {
  category: CategoryType;
}) {
  // Pagination state
  const [page, setPage] = useState(4);

  // Fetch events for the category
  const {
    data: eventsApiResponse = { content: [] },
    isLoading: isEventsLoading,
    error,
  } = useGetEventByCategoryQuery({ uuid: category?.uuid || "" });

  const events: EventType[] = eventsApiResponse.content || [];
  // const typedEvents: EventType[] = events.slice(0, Math.min(page, events.length));
  const typedEvents = events.slice(0, page);

  console.log("All Events:", events.length);
  console.log("Typed Events (Displayed):", typedEvents.length);

  // Ensure category UUID exists
  if (!category?.uuid) {
    console.error("Category UUID is missing");
    return null; 
  }

  console.log("Fetched events:", events); // Debugging

  return (
    <section className="flex flex-col gap-6 container mx-auto">
      {/* Event Category Title */}
      <h2
        lang="km"
        className="text-title-khmer text-iDonate-navy-primary md:flex md:items-center md:justify-center lg:flex lg:items-center lg:justify-start dark:text-iDonate-navy-accent"
      >
        {category.name}
      </h2>

      {/* Events */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isEventsLoading ? (
          <CategoryPlaceholder />
        ) : events.length > 0 ? ( // Use `events.length` instead of `typedEvents.length`
          typedEvents.map((event) => (
            <CommonEventCard key={event.uuid} event={event} />
          ))
        ) : (
          <p className="text-center text-gray-500">No events found.</p>
        )}
      </div>

      {/* Show More Button */}
      {typedEvents.map((event) =>
        event?.uuid ? (
          <CommonEventCard key={event.uuid} event={event} />
        ) : (
          <p key={event.uuid}>Invalid event data</p>
        )
      )}
    </section>
  );
}


