"use client";
import Image from "next/image";
import { TabEventDetail } from "@/components/events/even-detail/tab-event-detail";
import { EventDetailBanner } from "@/components/events/even-detail/event-detail-banner";
import { useGetEventByUuidQuery } from "@/redux/services/event-service";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { EventType } from "@/difinitions/dto/EventType";

type PropsParams = {
  params: {
      uuid: string;
  };
};

export function EventDetail(props: PropsParams) {

  const uuid = props.params.uuid;


  const  { data: events } = useGetEventByUuidQuery(uuid);


  const typedEvent: EventType = events || {};



  return (
    <section className="w-full items-center flex flex-col gap-6 justify-center container mx-auto">

      {/* Image Grid */}
      {/* Image Grid */}
        <div className="w-full grid grid-cols-4 gap-6">
          {typedEvent?.images?.map((image, index) => (
            <Image
              key={index}
              src={image} // Assuming `image.url` contains the image URL
              width={index === 0 ? 480 : 240}
              height={index === 0 ? 480 : 240}
              alt={`Event ${index}`}
              className={`${
                index === 0
                  ? "col-span-2 row-span-2 w-full h-full object-cover rounded-md"
                  : "object-cover rounded-md w-full h-full"
              }`}
            />
          ))?.slice(0,5)}
        </div>



      {/* Tab and Banner */}
      <div className=" flex gap-9 w-full h-full">
        <TabEventDetail />
        <EventDetailBanner />
      </div>
    </section>
  );
}
