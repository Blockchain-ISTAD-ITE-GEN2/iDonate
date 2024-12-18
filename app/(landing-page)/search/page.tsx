import { CommonEventCard } from "@/components/events/CommonEventCad";
import { EventType } from "@/difinitions/dto/EventType";
import events from "@/data/events-data.json";

export default function Events() {
  const typedEvent: EventType[] = events;

    return (
      <section className="flex flex-col">
        <section lang="km"  className="w-full grid grid-cols-6 gap-9 mx-auto justify-items-center">
          <CommonEventCard events={typedEvent} />
        </section>
      </section>
    );
  }