"use client";
import { useEffect, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";
import { EventType } from "@/difinitions/dto/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { Button } from "@/components/ui/button";
import { useGetEventsQuery } from "@/redux/services/event-service";

export function OrganizationDetail() {

  // use static for testing

  // const typedEvents: EventType[] = events.slice(0, 4);
  const { data: eventsApiResponse = { content: [] }, isLoading: isEventsLoading } = useGetEventsQuery({});
     
  const events: EventType[] = eventsApiResponse.content || [];
      
  // const typedEvents: EventType[] = events.slice(0, 4); 

  const typedEvents: EventType[] = events.slice(0, 8);


  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(typedEvents);

  const filtersFace = [
    {
      key: "title",
      title: "Events",
      options: Array.from(new Set(typedEvents.map((event) => event.name))).map(
        (event) => ({
          label: event,
          value: event,
        }),
      ),
    },
    {
      key: "total_donor",
      title: "Donor Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_donor)),
      ).map((donor) => ({
        label: donor.toString(),
        value: donor.toString(),
      })),
    },
    {
      key: "total_amount",
      title: "Amount Range",
      options: Array.from(
        new Set(typedEvents.map((event) => event.total_amount)),
      ).map((amount) => ({
        label: amount.toString(),
        value: amount.toString(), 
      })),
    },
  ];

  useEffect(() => {
    setFilteredEvents(typedEvents); // Reset filtered events whenever `events` prop changes
  }, [typedEvents]);

  return (
    <section className="flex flex-col gap-6 container mx-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <Toolbar
          events={typedEvents}
          filtersFace={filtersFace}
          searchKey={"title"}
          onFilterChange={setFilteredEvents}
        />
      </div>

      <div className="flex flex-col gap-6 container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredEvents.map((event, index) => (
            <CommonEventCard key={index} event={event} />
          ))}
        </div>

        <div className="flex justify-end">
          <Button className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent">
            Show more
          </Button>
        </div>
      </div>
    </section>
  );
}
