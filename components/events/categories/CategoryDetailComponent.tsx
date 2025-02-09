"use client";

import Image from "next/image";
import { AccordionCategory } from "./AccordionCategory";
import { AllCategoriesButton } from "./AllCategoriesAccordion";
import { useParams } from "next/navigation";
import { useGetCategoryByUuidQuery } from "@/redux/services/category-service";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { useGetDraftEventsFalseQuery, useGetEventByCategoryQuery, useGetEventByUuidQuery } from "@/redux/services/event-service";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { Button } from "@/components/ui/button";
import { EventType } from "@/difinitions/types/event/EventType";
import { useState } from "react";
import CategoryPlaceholerDetailComponent from "./CategoryPlaceholderDetail";

export default function CategoryDetailComponent() {
  // Get UUID from URL
  const params = useParams();
  const uuid = params.uuid as string;
  const [page,setPage] = useState(3)

  // Fetch category by UUID
  const {
    data: category = null,
    isLoading: isLoadingByUuid
  } = useGetCategoryByUuidQuery(uuid, { skip: !uuid });

  const {
    data: eventsApiResponse = { content: [] },
    isLoading: isEventsLoading,
  } = useGetEventByCategoryQuery(uuid, { skip: !uuid });

  const events: EventType[] = eventsApiResponse?.content ?? [];

  const typedEvents: EventType[] = events.slice(0, page) || [];

  const handleShowMore = () => {
    setPage((pre) => pre + 3 )
  }

const allEventImages: string[] = events.flatMap(event => 
  (event.images ?? []).filter((image): image is string => typeof image === 'string')
);

// Select a random image from event images
const randomImage = allEventImages.length > 0
  ? allEventImages[Math.floor(Math.random() * allEventImages.length)]
  : "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg";

  if (isLoadingByUuid && isEventsLoading){
    return (
      <CategoryPlaceholerDetailComponent />
    )
  }

  return (
    <section className="flex flex-col md:flex-row gap-9 px-9">
      {/* Left Section */}
      <div className="md:order-first flex flex-col gap-9 flex-1 h-full">
        {/* Image & Category Info */}
        {category && (
        <div className="relative min-h-[600px] flex flex-col gap-6">
          {/* Image Section */}
          <div className="relative min-h-[600px]">
           <Image
              src={randomImage}
              alt={category?.name || "Category Image"}
              className="rounded-lg object-cover"
              fill
            />
          </div>

          {/* Name and Description Section */}
          <div className="flex flex-col gap-6">
            <h1 className="text-heading-two-khmer text-iDonate-navy-primary leading-normal dark:text-iDonate-navy-accent">
              {category?.name}
            </h1>

            <p className="text-iDonate-navy-primary text-description-khmer md:text-lg lg:text-xl leading-9 dark:text-iDonate-navy-accent">
             {category?.description}
            </p>
          </div>
        </div>
      )}

      {/* Event Cards  Start */}
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {typedEvents.map((event, eventIndex) => (
                <CommonEventCard
                  key={event.uuid}
                  event={event}
                />
              ))}
          </div>

          <div className="flex justify-end">
            <Button
            onClick={handleShowMore}
            className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent">
              Show more
            </Button>
          </div>
        </div>
        {/* Event Cards  End */}

        {/* Benefits Section */}
        <div>
          <div className="mb-[36px]">
            <h1 className="text-iDonate-navy-primary dark:text-iDonate-navy-accent max-w-2xl text-heading-two-khmer tracking-tight leading-none md:text-[36px] xl:text-[36px]">
              អត្ថប្រយោជន៍
            </h1>
          </div>
          <div className="mb-[36px]">
            {category && <AccordionCategory uuid={category.uuid} />}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="order-first">
        <AllCategoriesButton />
      </div>
    </section>
  );
}
