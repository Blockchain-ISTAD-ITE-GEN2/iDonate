"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Toolbar } from "@/components/filter/toolbar";
import { OrganizationEventCard } from "@/components/organization/card/event-organization-card";
import { Button } from "@/components/ui/button";
import { useGetEventByOrganizationQuery } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";

export function OrganizationEventPage() {
  const router = useRouter();
  const params = useParams();
  const orgUuid = String(params.uuid);

  // Fetch initial events from API
  const { data: events, isLoading } = useGetEventByOrganizationQuery(orgUuid);
  const typedEvents: EventType[] = events?.content || [];

  // State for filtered events
  const [filteredEvents, setFilteredEvents] =
    useState<EventType[]>(typedEvents);

  // 🔥 WebSocket Setup with STOMP
  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`,
    );

    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");

      // Subscribe to donation updates
      stompClient.subscribe("/topic/donation-updates", (message) => {
        const update = JSON.parse(message.body);
        console.log("Received Donation Update:", update);

        setFilteredEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.uuid === update.eventUuid
              ? { ...event, currentRaised: update.totalAmount }
              : event,
          ),
        );
      });
    };

    stompClient.onWebSocketClose = () => {
      console.warn("WebSocket connection closed. Reconnecting...");
      setTimeout(() => stompClient.activate(), 5000);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  // Update filtered events when API data changes
  useEffect(() => {
    setFilteredEvents(typedEvents);
  }, [typedEvents]);

  return (
    <>
      <div className="flex justify-between items-start">
        <Toolbar
          events={typedEvents}
          filtersFace={[
            {
              key: "name",
              title: "Events",
              options: typedEvents.map((event) => ({
                label: event.name,
                value: event.name,
              })),
            },
            {
              key: "currentRaised",
              title: "ចំនួនថវិការបរិច្ចាគ Range",
              options: typedEvents.map((event: any) => ({
                label: event.currentRaised.toString(),
                value: event.currentRaised.toString(),
              })),
            },
            {
              key: "isDraft",
              title: "Draft Event",
              options: typedEvents.map((event) => ({
                label: event.isDraft.toString(),
                value: event.isDraft.toString(),
              })),
            },
          ]}
          searchKey="name"
          onFilterChange={setFilteredEvents}
          filtersDateRange={[{ key: "startDate", title: "Date Range" }]}
        />

        <Button
          variant="outline"
          onClick={() =>
            router.push(`/organization-dashboard/${orgUuid}/event-creation`)
          }
        >
          New Event
        </Button>
      </div>

      {filteredEvents.map((event) => (
        <OrganizationEventCard key={event.uuid} event={event} />
      ))}
    </>
  );
}
