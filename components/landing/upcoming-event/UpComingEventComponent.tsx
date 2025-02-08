"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, School } from "lucide-react";
import {
  useGetDraftEventsTrueQuery,
  useGetEventsQuery,
} from "@/redux/services/event-service";
import UpcommingEventPlaceholderComponent from "./UpcommingEventPlaceholderComponent";
import { EventType } from "@/difinitions/types/event/EventType";

interface Event {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  category: {
    name: string;
  };
  images: string[];
}

export default function UpcomingEvents() {
  const {
    data: upCommingApiReponse = { content: [] },
    isLoading,
    isError,
  } = useGetDraftEventsTrueQuery({});

  // Filter to get events with `isDraft: true`
  const events: EventType[] = upCommingApiReponse?.content || [];

  console.log("====> UP Comming Data RTK: ", events);

  if (isLoading) {
    return <UpcommingEventPlaceholderComponent />;
  }
  if (isError) {
    return <h1>Failed to load upcoming event data. Please try again.</h1>;
  }

  // Format date function
  function formatDate(dateString: string | undefined): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <section className="w-full lg:w-full mx-auto md:px-4 px-4 lg:px-[100px] pb-9 space-y-4">
      <h2
        lang="km"
        className="text-medium-khmer text-center text-iDonate-green-primary dark:text-iDonate-green-secondary"
      >
        តោះ ចាប់ផ្ដើមជួយពួកគាត់ទាំងអស់គ្នា!
      </h2>
      <h3
        lang="km"
        className="text-heading-two-khmer text-center text-iDonate-navy-primary leading-tight dark:text-[#DCE3F0]"
      >
        កម្មវិធីបរិច្ចាគ ដែលនិងកើតឡើងឆាប់នេះ!
      </h3>

      <div className="grid lg:grid-cols-2 gap-6 bg-transparent">
        {/* Featured Big Event Card */}
        {events && (
          <Card className="overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer flex flex-col">
            <div className="flex-1 aspect-video relative">
              <Image
              src={
                typeof events[0]?.images?.[0] === "string"
                  ? events[0]?.images[0]
                  : "/fallback-placeholder.jpg"
              }
                // src={
                //   Array.isArray(events[0]?.images) && events[0].images[0]
                //     ? events[0].images[0]
                //     : "https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
                // }
                alt={events[0]?.name || "event_image"}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <CardContent
              lang="km"
              className="flex-grow p-6 flex flex-col justify-between"
            >
              <div>
                <CardTitle className="text-title-khmer mb-2 font-semibold text-iDonate-navy-primary dark:text-iDonate-navy-accent">
                  {events[0]?.name || ""}
                </CardTitle>

                <p className="line-clamp-4 sm:line-clamp-none text-description-khmer text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                  {events[0]?.description || ""}
                </p>
              </div>

              <div className="flex flex-wrap justify-between gap-4 pt-4">
                <div className="flex items-center justify-center gap-2 text-iDonate-navy-secondary dark:text-iDonate-green-secondary">
                  <CalendarDays className="h-4 w-4 flex-shrink-0" />
                  <span>{formatDate(events[0]?.startDate) || "N/A"}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-iDonate-navy-primary dark:text-iDonate-green-secondary">
                  <School className="h-4 w-4 flex-shrink-0" />
                  <span>{events[0]?.category?.name || ""}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grid of Smaller Events */}

        <div className="grid sm:grid-cols-2 gap-4">
          {events.slice(1, 5).map((event: any) => (
            <Card
              key={event.id}
              className="flex flex-col overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer dark:text-iDonate-navy-accentbg-iDonate-dark-mode"
            >
              <div className="aspect-video relative">
                <Image
                  src={
                    Array.isArray(event?.images) && event.images[0]
                      ? event.images[0]
                      : "https://t4.ftcdn.net/jpg/06/71/92/37/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
                  }
                  alt={event.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              <CardContent className="flex flex-col flex-grow p-4 space-y-2 ">
                <CardTitle className="text-title-khmer line-clamp-1 font-semibold text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                  {event.name || ""}
                </CardTitle>

                <p className="flex-1 text-description-khmer text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent">
                  {event?.description || ""}
                </p>

                <div className="flex flex-wrap justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary dark:text-iDonate-green-secondary">
                    <CalendarDays className="h-3 w-3 flex-shrink-0" />
                    <span>{formatDate(event.startDate) || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-iDonate-navy-secondary dark:text-iDonate-green-secondary">
                    <School className="h-3 w-3 flex-shrink-0" />
                    <span>{event.category?.name || ""}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
