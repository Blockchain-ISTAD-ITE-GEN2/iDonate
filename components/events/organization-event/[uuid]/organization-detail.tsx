"use client";
import { useEffect, useState } from "react";
import { Toolbar } from "@/components/filter/toolbar";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { Button } from "@/components/ui/button";
import {
  useGetEventByOrganizationQuery,
  useGetEventsQuery,
} from "@/redux/services/event-service";
import { useParams } from "next/navigation";
import { SearchOnPagePlaceholder } from "@/components/search/SearchOnPagePlaceholder";
import { EventType } from "@/difinitions/types/event/EventType";

type OrganizationDetailProps = {
  uuid: string;
};

export function OrganizationDetail({ uuid }: OrganizationDetailProps) {
  // handle pagination

  // Get all Event with specify Orgination
  const {
    data: eventByOrganization = { content: [] },
    isLoading: isLoadingOrg,
    isError,
  } = useGetEventByOrganizationQuery(uuid ?? "", { skip: !uuid });

  const typedEvents: EventType[] = eventByOrganization.content || [];

  // consoel logo data get from RTK
  console.log(
    "============> Here is the Organization Event Data ",
    typedEvents,
  );

  const [filteredEvents, setFilteredEvents] =
    useState<EventType[]>(typedEvents);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // useffet wanna trigger someting
  useEffect(() => {
    setFilteredEvents(typedEvents);
  }, [typedEvents]);

  // handle pagination
  const handleShowMore = () => {
    setVisibleCount((pre) => pre + 4);
  };

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
      key: "total_donor",
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
      key: "total_amount",
      title: "Amount Range",
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

      <div className="flex flex-col gap-6 container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        {isLoadingOrg ? (
          <div>
            <SearchOnPagePlaceholder />
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredEvents
              ?.slice(0, visibleCount)
              .map((event, index) => (
                <CommonEventCard key={index} event={event} />
              ))}
          </div>
        )}
        <div className="flex justify-end">
          <Button
            onClick={handleShowMore}
            className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent"
          >
            Show more
          </Button>
        </div>
      </div>
    </section>
  );
}
