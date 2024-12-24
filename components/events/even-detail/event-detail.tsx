"use client";
import Image from "next/image";
import event from "@/public/images/image (8).png";
import { TabEventDetail } from "@/components/events/even-detail/tab-event-detail";
import { EventDetailBanner } from "./event-detail-banner";

export function EventDetail() {
  return (
    <section className="w-full items-center flex flex-col gap-6 justify-center container mx-auto">
      <div className="w-full flex justify-between gap-6">
        <div className="relative flex-1 h-[500px]">
          <Image
            src={event}
            fill
            alt=""
            // className=""
          />
        </div>

        <div className="relative flex-1 flex flex-wrap h-[500px] gap-4 justify-end">
          <Image src={event} width={240} height={240} alt="'" />

          <Image src={event} width={240} height={240} alt="'" />

          <Image src={event} width={240} height={240} alt="'" />

          <Image src={event} width={240} height={240} alt="'" />

          <Image src={event} width={240} height={240} alt="'" />

          <Image src={event} width={240} height={240} alt="'" />
        </div>
      </div>

      <div className="w-full flex gap-9">
        <TabEventDetail />
        <EventDetailBanner />
      </div>
    </section>
  );
}
