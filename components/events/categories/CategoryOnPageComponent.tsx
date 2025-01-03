"use client";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import categories from "@/data/category.json";
import CategoryCardComponent from "./CategoryCardComponent";
import { EventType } from "@/difinitions/dto/EventType";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import events from "@/data/events-data.json";

export default function CategoryOnPageComponent() {
  const typedCategory: CategoryType[] = categories;
  const typedEvents: EventType[] = events.slice(0, 4);

  return (
    <section className="flex flex-col gap-9 ">
      {/* Hero Section Start */}
      <OrganizationDetailHeroSection />

      {/* Start Card Categories */}
      <div className="w-full px-6 md:px-12 lg:px-24 space-y-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <CategoryCardComponent categories={typedCategory} />
        </div>
      </div>

      {/* List Card Events */}
      {typedCategory.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className="flex flex-col gap-6 container mx-auto"
        >
          {/* Event Cards */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10 flex flex-col gap-6">
            <h2
              lang="km"
              className="text-title-khmer text-iDonate-navy-primary md:flex md:items-center md:justify-center lg:flex lg:items-center lg:justify-start"
            >
              {category.title}
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {typedEvents.map((event, eventIndex) => (
                <CommonEventCard
                  key={eventIndex}
                  event={{
                    image: event.image,
                    title: event.title,
                    description: event.description,
                    total_donor: event.total_donor,
                    total_amount: event.total_amount,
                  }}
                />
              ))}
            </div>

            <div className="flex justify-end">
              <Button className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent">
                Show more
              </Button>
            </div>
          </section>
        </section>
      ))}
    </section>
  );
}
