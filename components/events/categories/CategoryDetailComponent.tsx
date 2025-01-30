"use client"

import Image from "next/image";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { Button } from "@/components/ui/button";

import { EventType } from "@/difinitions/dto/EventType";
import { useGetEventsQuery } from "@/redux/services/event-service";
import { AccordionCategory } from "./AccordionCategory";
import { AllCategoriesButton } from "./AllCategoriesAccordion";

export default function CategoryDetailComponent() {

  // const typedEvents: EventType[] = events.slice(0, 4);
    const { data: eventsApiResponse = { content: [] }, isLoading: isEventsLoading } = useGetEventsQuery({});
   
    const events: EventType[] = eventsApiResponse.content || [];
    
    const typedEvents: EventType[] = events.slice(0, 4); 

  return (
    <section className=" flex flex-col md:flex-row gap-9 px-9">
      {/*section to the left */}
      <div className="md:order-first flex flex-col gap-9 flex-1 h-full">
        {/*image*/}
        <div className="relative min-h-[600px]">
          <Image
            src="https://www.childfund.org.kh/c/uploads/2020/02/LY9A3560-1.jpg"
            alt="image"
            className="rounded-lg object-cover"
            fill
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-heading-two-khmer text-iDonate-navy-primary leading-normal ">
            ជួយកុមារសម្រេចអនាគតដ៏ភ្លឺស្វាង
          </h1>

          <p className="text-iDonate-navy-primary text-description-khmer md:text-lg lg:text-xl leading-9">
            ការបរិច្ចាគរបស់អ្នកគឺមិនមែនគ្រាន់តែជាការផ្តល់អាហារ
            ឬសម្ភារៈសិក្សាប៉ុណ្ណោះទេ។ វាជាការផ្តល់ឱកាសក្នុងការរីកចម្រើន
            បង្កើតជីវិតថ្មី និងជួយកុមារជាច្រើនឆ្ពោះទៅរកភាពជោគជ័យ។
            ការបរិច្ចាគត្រឹមតែបន្តិចអាចធ្វើឱ្យមានការផ្លាស់ប្តូរធំមួយក្នុងជីវិតកុមារ។
            ពួកគេនឹងមានសង្ឃឹមថ្មីសញ្ញាសម្តែងនៃភាពស្រស់ស្រាយ និងការរីកចម្រើន។
            អ្នកអាចជាម្ចាស់នៃការផ្លាស់ប្តូរនោះ! ចូលរួមជាមួយយើងឥឡូវនេះ
            ដើម្បីជួយកុមាររបស់សហគមន៍សម្រេចក្តីសុបិន្តរបស់ពួកគេ។
            អនាគតរបស់ពួកគេប្រពៅលើការចូលរួមរបស់អ្នក។ ដោយសារ​អ្នក
            កុមារជាច្រើននឹងមានអនាគតមួយដ៏ភ្លឺស្វាង និងមានសុភមង្គល។
            ការចូលរួមរបស់អ្នកជាផ្នែកសំខាន់ក្នុងការផ្តល់អំណោយនេះ។
            កុំឲ្យពេលវេលាចំណាយទៅដោយអ្វីខុសឆ្គង!
          </p>
        </div>

        {/* Event Cards */}
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {isEventsLoading ? (
           <p>Loading events...</p>
            ) : (
           typedEvents.map((event, eventIndex) => (
            <CommonEventCard
              key={eventIndex}
              event={{
                uuid: event.uuid,
                images: event.images,
                name: event.name,
                description: event.description,
                totalDonors: event.totalDonors,
                currentRaised: event.currentRaised,
                startDate: event.startDate,
                endDate: event.endDate,
                location: event.location,
                isDraft: event.isDraft,
              }}
            />
          ))
        )}
          </div>

          <div className="flex justify-end">
            <Button className="text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-accent hover:bg-iDonate-navy-accent">
              Show more
            </Button>
          </div>
        </div>

        {/*QA*/}
        <div>
          <div className="mb-[36px]">
            <h1 className="text-iDonate-navy-primary max-w-2xl text-heading-two-khmer  tracking-tight leading-none md:text-[36px] xl:text-[36px] dark:text-white">
              អត្ថប្រយោជន៍
            </h1>
          </div>

          <div className="mb-[36px]">
            <AccordionCategory />
          </div>
        </div>
      </div>

      {/* section to the right */}
      <div className="order-first">
        <AllCategoriesButton />
      </div>
    </section>
  );
}
