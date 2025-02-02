"use client";
import {  useEffect, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";
import { EventType } from "@/difinitions/types/event/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { useGetDraftEventsFalseQuery, useGetEventsQuery } from "@/redux/services/event-service";
import { SearchOnPagePlaceholder } from "./SearchOnPagePlaceholder";
import { Button } from "../ui/button";

export function SearchPage() {

  // const [page,setPage] = useState(4);

  const {
    data: apiEventReponse = { content: [] },
    isLoading,
    isError,
  } = useGetDraftEventsFalseQuery({});

  const eventOnSearch:EventType[] = apiEventReponse?.content || [];

  const typedEvents:EventType[] = apiEventReponse?.content || [];

  // const typedEventPage: EventType[] = eventOnSearch.slice(0,page) || [];

  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(typedEvents);


  const filtersFace = [
    {
      key: "name",
      title: "Events",
      options: Array.from(
        new Set(
          typedEvents
            ?.filter((event) => event?.name)
            .map((event) => event.name),
        ),
      ).map((name) => ({
        label: name,
        value: name,
      })),
    },
    {
      key: "totalDonors",
      title: "Donor Range",
      options: Array.from(
        new Set(
          typedEvents
            ?.filter((event) => event?.totalDonors != null)
            .map((event) => event.totalDonors),
        ),
      ).map((donor) => ({
        label: (donor ?? "")?.toString(),
        value: (donor ?? "").toString(),
      })),
    },
    {
      key: "currentRaised",
      title: "startDate Range",
      options: Array.from(
        new Set(
          typedEvents
            ?.filter((event) => event?.currentRaised != null)
            .map((event) => event.currentRaised),
        ),
      ).map((amount) => ({
        label: (amount ?? "").toString(),
        value: (amount ?? "").toString(),
      })),
    },
  ];

  // reset fitered evnet
  useEffect(() => {
    setFilteredEvents(typedEvents);
  }, [typedEvents]);

  // const hanldeShowPage = () => {
  //   setPage((prevCountPage) => prevCountPage + 4);
  // };

  return (
    <section className="flex flex-col gap-6 container mx-auto">
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <Toolbar
          events={typedEvents}
          filtersFace={filtersFace}
          searchKey={"name"}
          onFilterChange={setFilteredEvents}
          filtersDateRange={[{ key: "startDate", title: "Date Range" }]}
        />
      </div>

      {/* <SearchOnPagePlaceholder/> */}

      {isLoading ? (
        <div className="flex flex-col gap-6 container mx-auto">
          <SearchOnPagePlaceholder />
        </div>
      ) : (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <CommonEventCard key={index} event={event} />
              ))
            ) : (
              <p className="text-center mt-2  text-gray-500 col-span-full">
                No events available.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Show More Button */}
      {/* <div className="flex justify-end">
        <Button
          onClick={hanldeShowPage}
          className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent dark:bg-iDonate-dark-mode dark:text-iDonate-navy-accent dark:hover:text-iDonate-navy-secondary dark:hover:border-iDonate-navy-secondary
        "
        >
          Show more
        </Button>
      </div> */}
    </section>
  );
}
