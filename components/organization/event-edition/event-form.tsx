"use client";
import { EventCategoryFormEdition } from "@/components/organization/event-edition/event-category-form";
import { useState } from "react";
import { EventInfoFormEdition } from "@/components/organization/event-edition/event-info-form";
import { ProgressEvent } from "@/components/organization/event-progress/event-progess";
import { useParams } from "next/navigation";

export function EventFormEdition() {
  const [titlePercentage, setTitlePercentage] = useState(0);
  const [descriptionPercentage, setDescriptionPercentage] = useState(0);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [startDatePercentage, setStartDatePercentage] = useState(0);
  const [endDatePercentage, setEndDatePercentage] = useState(0);
  const [categoryPercentage, setCategoryPercentage] = useState(0);
  const [organizationPercentage, setOrganizationPercentage] = useState(0);
  // const [locationPercentage, setLocationPercentage] = useState(0);
  // const [isVisiblePercentage, setIsVisiblePercentage] = useState(0);

  const params = useParams();
  const eventUuid = String(params.eventUuid); // Ensures `uuid` is a string

  console.log("eventUuid", eventUuid);

  return (
    <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light p-6">
      <ProgressEvent
        category={categoryPercentage}
        description={descriptionPercentage}
        endDate={endDatePercentage}
        images={imagePercentage}
        startDate={startDatePercentage}
        name={titlePercentage}
        organization={organizationPercentage}
        // location={locationPercentage}
        // isVisible={isVisiblePercentage}
      />

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventCategoryFormEdition
          onPercentageUpdate={setCategoryPercentage}
          uuid={eventUuid}
        />
      </div>

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventInfoFormEdition
          onTitlePercentageUpdate={setTitlePercentage}
          onDescriptionPercentageUpdate={setDescriptionPercentage}
          onImagePercentageUpdate={setImagePercentage}
          onOrderDatePercentageUpdate={setStartDatePercentage}
          onEndDatePercentageUpdate={setEndDatePercentage}
          onOrganizationPercentageUpdate={setOrganizationPercentage}
          // onLocationPercentageUpdate={setLocationPercentage}
          // onVisiblePercentageUpdate={setIsVisiblePercentage
          uuid={eventUuid}
        />
      </div>
    </section>
  );
}
