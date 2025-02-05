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

  // Ensure category UUID exists
  const uuid = category?.uuid;
  if (!uuid) {
    console.error("Category UUID is missing");
    return null; // Prevent rendering if UUID is missing
  }

  // Fetch events for the category
  const {
    data: eventsApiResponse = { content: [] },
    isLoading: isEventsLoading,
  } = useGetEventByCategoryQuery({ uuid });

  const events: EventType[] = eventsApiResponse.content || [];
  const typedEvents: EventType[] = events.slice(0, Math.min(page, events.length));

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
        ) : typedEvents.length > 0 ? (
          typedEvents.map((event) => (
            <CommonEventCard key={event.uuid} event={event} />
          ))
        ) : (
          <p className="text-center text-gray-500">No events found.</p>
        )}
      </div>

      {/* Show More Button */}
      {typedEvents.length < events.length && (
        <div className="flex justify-end">
          <Button
            onClick={() => setPage((prev) => prev + 4)}
            className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:text-iDonate-navy-accent dark:hover:text-iDonate-navy-secondary dark:hover:border-iDonate-navy-secondary"
          >
            Show more
          </Button>
        </div>
      )}
    </section>
  );
}
