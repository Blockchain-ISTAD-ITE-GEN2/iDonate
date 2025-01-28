"use client";

import { useParams } from "next/navigation"; // ✅ Correct way to get params in Next.js 13+
import Image from "next/image";
import { TabEventDetail } from "@/components/events/even-detail/tab-event-detail";
import { EventDetailBanner } from "@/components/events/even-detail/event-detail-banner";
import { useGetEventsQuery } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/dto/EventType";

export default function EventDetail() {
  const params = useParams(); // ✅ Get dynamic params
  const uuid = params.uuid as string; // ✅ Extract uuid

  // Ensure uuid is defined before making the query
  const { data: events } = useGetEventsQuery(uuid, { skip: !uuid });
  const typedEvent: EventType = events || {};

  return (
    <section className="w-full items-center flex flex-col gap-6 justify-center container mx-auto">
      {/* Image Grid */}
      <div className="w-full grid grid-cols-4 gap-6">
        {typedEvent?.images?.slice(0, 5).map((image, index) => (
          <Image
            key={index}
            src={image}
            width={index === 0 ? 480 : 240}
            height={index === 0 ? 480 : 240}
            alt={`Event ${index}`}
            className={`${
              index === 0
                ? "col-span-2 row-span-2 w-full h-full object-cover rounded-md"
                : "object-cover rounded-md w-full h-full"
            }`}
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
