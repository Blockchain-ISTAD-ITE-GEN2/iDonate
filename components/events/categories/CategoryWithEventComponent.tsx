"use client";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { Button } from "@/components/ui/button";
import { EventType } from "@/difinitions/dto/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { useGetCategoriesQuery } from "@/redux/services/category-service";
import { useGetEventByCategoryQuery } from "@/redux/services/event-service";
import { useState } from "react";
import { CategoryPlaceholder } from "./CategoryPlaceholder";



export default function CategoryWithEventComponent({ category }: { category: CategoryType }) {
  
  // Handle to controll pagniattion 
  const [page,setPage] = useState(4);

  // Fetch all categories uuid 
  const {uuid} = category;


  const { data: eventsApiResponse = { content: [] }, isLoading: isEventsLoading } = useGetEventByCategoryQuery({ uuid:uuid });

  const events: EventType[] = eventsApiResponse.content || [];
  
  // show only page 
  const typedEvents: EventType[] = events.slice(0, page); 

  const hanldeShowPage = () => {
    setPage((prevCountPage) => prevCountPage + 4 );
  }
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
          <>
            <CategoryPlaceholder/>
          </>
        ) : (
          typedEvents.map((event, eventIndex) => (
            <CommonEventCard
              key={eventIndex}
              event={typedEvents[eventIndex]}
            />
          ))
        )}
      </div>

      {/* Show More Button */}
      <div className="flex justify-end">
        <Button
        onClick={hanldeShowPage}
        className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:text-iDonate-navy-accent dark:hover:text-iDonate-navy-secondary dark:hover:border-iDonate-navy-secondary
        ">
          Show more
        </Button>
      </div>
    </section>
  );
}
