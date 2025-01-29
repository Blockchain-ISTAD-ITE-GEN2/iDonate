"use client";
import { useCallback, useEffect, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";
import { EventType } from "@/difinitions/dto/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import events from "@/data/events-data.json";
import { useGetEventsQuery } from "@/redux/services/event-service";
import { Button } from "react-day-picker";
import { SearchOnPagePlaceholder } from "./SearchOnPagePlaceholder";

export function SearchPage() {

  // const [visibleCount,setVisibleCount] = useState(12);

  const {
    data:apiEventReponse = {content:[]},
    isLoading,
    isError
    } = useGetEventsQuery({});
  
    // isDraft == true mean that event is panding or upcomming event 
    const typedEvents:EventType[] = apiEventReponse?.content?.filter(
      (event:any) => event?.isDraft
    ) || [];

    // const typedEvents: EventType[] = apiEventReponse?.content || [];

  
     // logs the data after fetch
     console.log("====> On Page Event Data RTK: ",typedEvents)


    //  const transformedEvents = typedEvents.map(({ images, ...event }) => ({
    //   ...event,
    //   category: event.category?.name || "",
    // }));


    const [filteredEvents, setFilteredEvents] = useState<EventType[]>(typedEvents);


    const filtersFace = [
      {
          key: "name",
          title: "Events",
          options: Array.from(
              new Set(typedEvents?.filter(event => event?.name).map(event => event.name))
          ).map(name => ({
              label: name,
              value: name,
          })),
      },
      {
          key: "total_donor",
          title: "Donor Range",
          options: Array.from(
              new Set(typedEvents?.filter(event => event?.total_donor != null).map(event => event.total_donor))
          ).map(donor => ({
              label: donor.toString(),
              value: donor.toString(),
          })),
      },
      {
          key: "total_amount",
          title: "Amount Range",
          options: Array.from(
              new Set(typedEvents?.filter(event => event?.total_amount != null).map(event => event.total_amount))
          ).map(amount => ({
              label: amount.toString(),
              value: amount.toString(),
          })),
      },
    ];
  
    
  // reset fitered evnet
  useEffect(() => {
    setFilteredEvents(typedEvents);
  },[typedEvents])



    // if (isLoading) {
    //   return (
    //     <div className="flex flex-col gap-6 container mx-auto">
    //           <SearchOnPagePlaceholder/>
    //     </div>
    //   );
    //   } 

  return (
    <section className="flex flex-col gap-6 container mx-auto">
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <Toolbar
          events={typedEvents}
          filtersFace={filtersFace}
          searchKey={"name"}
          onFilterChange={setFilteredEvents}
        />
      </div>

  
        {/* <SearchOnPagePlaceholder/> */}

      {isLoading ? (
        <div className="flex flex-col gap-6 container mx-auto">
           <SearchOnPagePlaceholder/>
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
    </section>
  );
}
