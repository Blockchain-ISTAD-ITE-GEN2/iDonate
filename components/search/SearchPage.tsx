// "use client";
// import { useEffect, useState } from "react";
// import { Toolbar } from "@/components/filter/toolbar";
// import { EventType } from "@/difinitions/dto/EventType";
// import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
// import events from "@/data/events-data.json";

// export function SearchPage() {
//   const typedEvents: EventType[] = events;
//   const [filteredEvents, setFilteredEvents] =
//     useState<EventType[]>(typedEvents);

//   const filtersFace = [
//     {
//       key: "title",
//       title: "Events",
//       options: Array.from(new Set(typedEvents.map((event) => event.title))).map(
//         (event) => ({
//           label: event,
//           value: event,
//         }),
//       ),
//     },
//     {
//       key: "total_donor",
//       title: "Donor Range",
//       options: Array.from(
//         new Set(typedEvents.map((event) => event.total_donor)),
//       ).map((donor) => ({
//         label: donor.toString(),
//         value: donor.toString(),
//       })),
//     },

//     {
//       key: "total_amount",
//       title: "ចំនួនថវិការបរិច្ចាគ Range",
//       options: Array.from(
//         new Set(typedEvents.map((event) => event.total_amount)),
//       ).map((amount) => ({
//         label: amount.toString(),
//         value: amount.toString(),
//       })),
//     },
//   ];

//   useEffect(() => {
//     setFilteredEvents(typedEvents); // Reset filtered events whenever `events` prop changes
//   }, [typedEvents]);

//   return (
//     <section className="flex flex-col gap-6 px-4 2xl:container 2xl:mx-auto">
//       <Toolbar
//         events={typedEvents}
//         filtersFace={filtersFace}
//         searchKey={"title"}
//         onFilterChange={setFilteredEvents}
//       />

//       <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5">
//         {filteredEvents.map((event, index) => (
//           <CommonEventCard key={index} event={event} />
//         ))}
//       </div>
//     </section>
//   );
// }
