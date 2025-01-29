"use client";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { Button } from "@/components/ui/button";
import { EventType } from "@/difinitions/dto/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { useGetCategoriesQuery } from "@/redux/services/category-service";
import { useGetEventByCategoryQuery } from "@/redux/services/event-service";



export default function CategoryWithEventComponent({ category }: { category: CategoryType }) {

  // Fetch all categories

  const {uuid} = category;


  const { data: eventsApiResponse = { content: [] }, isLoading: isEventsLoading } = useGetEventByCategoryQuery({ uuid:uuid });
 
  const events: EventType[] = eventsApiResponse.content || [];
  
  const typedEvents: EventType[] = events.slice(0, 4); 


  // show evnet with cate .........
  console.log("==========> Event data with Category: ",events)

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
          <p>Loading events...</p>
        ) : (
          typedEvents.map((event, eventIndex) => (
            <CommonEventCard
              key={eventIndex}
              event={{
                images: event.images,
                uuid: event.uuid,
                name: event.name,
                description: event.description,
                total_donor: event.total_donor,
                total_amount: event.total_amount,
                startDate: event.startDate,
                endDate: event.endDate,
              }}
            />
          ))
        )}
      </div>

      {/* Show More Button */}
      <div className="flex justify-end">
        <Button className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:text-iDonate-navy-accent dark:hover:text-iDonate-navy-secondary dark:hover:border-iDonate-navy-secondary">
          Show more
        </Button>
      </div>
    </section>
  );
}
