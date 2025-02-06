"use client";
import { EventCategoryFormEdition } from "@/components/organization/event-edition/event-category-form";
import { EventInfoFormEdition } from "@/components/organization/event-edition/event-info-form";
import { useParams } from "next/navigation";

export function EventFormEdition() {


  const params = useParams();
  const eventUuid = String(params.eventUuid); // Ensures `uuid` is a string

  console.log("eventUuid", eventUuid);

  return (
    <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light p-6">
  

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventCategoryFormEdition
         
          uuid={eventUuid}
        />
      </div>

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventInfoFormEdition
          uuid={eventUuid}
        />
      </div>
    </section>
  );
}
