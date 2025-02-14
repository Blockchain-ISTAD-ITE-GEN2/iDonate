import { WebSocketProvider } from "./WebSocketProvider";
import { CommonEventCard } from "../events/organization-event/CommonEventCard";
import { EventDetailBanner } from "../events/even-detail/event-detail-banner";
import { EventType } from "@/difinitions/types/event/EventType";

export function EventPage({ event }: { event: EventType }) {

    if (!event.uuid) return <p>Loading...</p>;

  return (
    <WebSocketProvider eventUuid={event.uuid}>
      <EventDetailBanner uuid={event.uuid} />
      <CommonEventCard event={event} />
    </WebSocketProvider>
  );
}
