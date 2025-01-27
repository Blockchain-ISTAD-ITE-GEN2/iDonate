"use client";
import Image from "next/image";
import { TabEventDetail } from "@/components/events/even-detail/tab-event-detail";
import { EventDetailBanner } from "@/components/events/even-detail/event-detail-banner";
import { useGetEventByUuidQuery } from "@/redux/services/event-service";

type PropsParams = {
  params: {
      uuid: string;
  };
};

export function EventDetail(props: PropsParams) {

  const uuid = props.params.uuid;

  console.log("UUID: ", uuid);

  const  { data: events, isLoading, isSuccess } = useGetEventByUuidQuery(uuid);

  console.log("Event Detail: ", events);

  return (
    <section className="w-full items-center flex flex-col gap-6 justify-center container mx-auto">

      {/* Image Grid */}
      <div className="w-full grid grid-cols-4 gap-6">
        <Image
          src={"https://i.pinimg.com/736x/a9/9e/ff/a99eff25eb1ba71647fcd884c15c035a.jpg"}
          width={480}
          height={480}
          alt="Main Event"
          className="col-span-2 row-span-2 w-full h-full object-cover rounded-md"
        />
        <Image
          src={"https://i.pinimg.com/736x/ac/aa/ed/acaaed95a9613d34f99bb4aad7f58c67.jpg"}
          width={240}
          height={240}
          alt="Event 1"
          className="object-cover rounded-md w-full h-full"
        />
        <Image
          src={"https://i.pinimg.com/736x/87/48/44/87484497e02470d9436655e940bd42fd.jpg"}
          width={240}
          height={240}
          alt="Event 2"
          className="object-cover rounded-md w-full h-full"
        />
        <Image
          src={"https://i.pinimg.com/736x/df/46/55/df46552c66f1991b2dd1801d6a399ead.jpg"}
          width={240}
          height={240}
          alt="Event 3"
          className="object-cover rounded-md w-full h-full"
        />
        <Image
          src={"https://i.pinimg.com/736x/44/24/42/442442d0c2d981201028f6bd775518d3.jpg"}
          width={240}
          height={240}
          alt="Event 4"
          className="object-cover rounded-md w-full h-full"
        />
      </div>

      {/* Tab and Banner */}
      <div className=" flex gap-9 w-full h-full">
        <TabEventDetail />
        <EventDetailBanner />
      </div>
    </section>
  );
}
