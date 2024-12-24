"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, School } from "lucide-react";
import RuralStudent1 from "@/public/upcomming-event/ruralstudent.png";
import RuralStudent2 from "@/public/upcomming-event/ruralstudent_2.png";
import PoorFamily from "@/public/upcomming-event/poorfamily.png";

interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  category: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "ផ្តល់កុមារផ្ទះដល់ Williams Family",
    description:
      "កុមារទាំងនេះត្រូវការជំនួយការពារសេរីភាពនិងសិទ្ធិរបស់កុមារ និងជួយធ្វើឱ្យពួកគេរស់នៅក្នុងសង្គម។",
    date: "25, May 2025",
    category: "Kid Education",
    image: PoorFamily.src,
  },
  {
    id: 2,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent1.src,
  },
  {
    id: 3,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent2.src,
  },
  {
    id: 4,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent1.src,
  },
  {
    id: 5,
    title: "រូបថតពាក់ព័ន្ធ vim",
    date: "25, May 2025",
    category: "Kid Education",
    image: RuralStudent2.src,
  },
];

export default function UpcomingEvents() {
  return (
    <section
      className="w-full lg:w-full mx-auto md:px-4 px-4  lg:px-[100px] py-12 space-y-8"
      lang="km"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Featured Event */}
        <Card className="overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={events[0].image}
              alt={events[0].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-6 space-y-4">
            <CardTitle className="text-xl font-semibold khmer-font text-iDonate-navy-primary">
              {events[0].title}
            </CardTitle>
            <p className="khmer-font text-iDonate-navy-secondary">
              {events[0].description}
            </p>
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                <CalendarDays className="h-4 w-4 flex-shrink-0" />
                <span>{events[0].date}</span>
              </div>
              <div className="flex items-center gap-2 text-iDonate-navy-primary">
                <School className="h-4 w-4 flex-shrink-0" />
                <span>{events[0].category}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid of Smaller Events */}
        <div className="grid sm:grid-cols-2 gap-4">
          {events.slice(1).map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-sm font-medium khmer-font text-iDonate-navy-secondary">
                  {event.title}
                </CardTitle>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                    <CalendarDays className="h-3 w-3 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-iDonate-navy-secondary">
                    <School className="h-3 w-3 flex-shrink-0" />
                    <span>{event.category}</span>
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
