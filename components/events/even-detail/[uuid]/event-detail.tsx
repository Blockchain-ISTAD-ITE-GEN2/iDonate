"use client";

import { useParams } from "next/navigation"; // ✅ Correct way to get params in Next.js 13+
import Image from "next/image";
import { useState } from "react";
import { TabEventDetail } from "@/components/events/even-detail/tab-event-detail";
import { EventDetailBanner } from "@/components/events/even-detail/event-detail-banner";
import { useGetEventByUuidQuery } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";

const placeholderImage =
  "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg";

export default function EventDetail() {
  const params = useParams();
  const uuid = params.uuid as string;

  // Ensure uuid is defined before making the query
  const { data: events } = useGetEventByUuidQuery(uuid, { skip: !uuid });
  const typedEvent: EventType = events || {};

  // State to track broken images
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {},
  );

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Ensure at least 5 images, replacing missing ones with the placeholder
  const eventImages = Array.isArray(typedEvent?.images)
    ? typedEvent.images
    : [];
  const filledImages = [
    ...eventImages,
    ...Array(Math.max(0, 5 - eventImages.length)).fill(placeholderImage),
  ].slice(0, 5);

  return (
    <section className="w-full items-center flex flex-col gap-6 justify-center container mx-auto">
      {/* Image Grid */}
      <div className="w-full grid grid-cols-4 gap-6">
        {filledImages.map((image, index) => (
          <Image
            key={index}
            src={
              imageErrors[index] ? placeholderImage : image || placeholderImage
            }
            width={index === 0 ? 480 : 240}
            height={index === 0 ? 480 : 240}
            alt={`Event ${index}`}
            className={`${
              index === 0
                ? "col-span-2 row-span-2 w-full h-full object-cover rounded-md"
                : "object-cover rounded-md w-full h-full"
            }`}
            onError={() => handleImageError(index)}
          />
        ))}
      </div>

      {/* Tab and Banner */}
      <div className="flex gap-9 w-full h-full">
        <TabEventDetail />
        {uuid && <EventDetailBanner uuid={uuid} />}
      </div>
    </section>
  );
}
