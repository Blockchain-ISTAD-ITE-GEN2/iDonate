"use client";
import { Toolbar } from "@/components/filter/toolbar";
import { OrganizationEventType } from "@/difinitions/dto/Organization-event";
import { use, useEffect, useState } from "react";
import { OrganizationEventCard } from "@/components/organization/card/event-organization-card";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useGetEventByOrganizationQuery, } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/dto/EventType";

export function OrganizationEventPage() {
  const router = useRouter();
  const params = useParams();
  const orgUuid = String(params.uuid); // Ensures `uuid` is a string

  const {data: events} = useGetEventByOrganizationQuery(orgUuid);
  const typedEvents: EventType[] = events?.content || [];

  const filtersFace = [
    {
      key: "name",
      title: "Events",
      options: Array.from(new Set(typedEvents.map((event) => event.name)))
        .filter((event): event is string => event !== undefined)
        .map((event) => ({
          label: event,
          value: event,
        })),
    },
    {
      key: "currentRaised",
      title: "Amount Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.currentRaised)),
      )
        .filter((amount): amount is number => amount !== undefined)
        .map((amount) => ({
          label: amount.toString(),
          value: amount.toString(),
        })),
    },
    {
      key: "isDraft",
      title: "Draft Event",
      options: Array.from(
        new Set(typedEvents.map((event) => event.isDraft)),
      )
        .filter((amount): amount is boolean => amount !== undefined)
        .map((amount) => ({
          label: amount.toString(),
          value: amount.toString(),
        })),
    },
  ];

  const filtersDateRange = [
    {
      key: "startDate", // Assuming we are filtering by the event's order_date
      title: "Date Range",
    },
  ];

  const [filteredEvents, setFilteredEvents] =
    useState<EventType[]>(typedEvents);

  useEffect(() => {
    setFilteredEvents(typedEvents); // Reset filtered events whenever `events` prop changes
  }, [typedEvents]);

  return (
    <>
      <div className="flex justify-between items-center">
        <Toolbar
          events={typedEvents}
          filtersFace={filtersFace}
          searchKey={"name"}
          onFilterChange={setFilteredEvents}
          filtersDateRange={filtersDateRange}
        />

        <Button
          variant="outline"
          onClick={() => {
            router.push(`/organization-dashboard/${orgUuid}/event-creation`);
          }}
        >
          New Event
        </Button>
      </div>

      {filteredEvents.map((event, index) => (
        <OrganizationEventCard key={index} event={event} />
      ))}
    </>
  );
}
