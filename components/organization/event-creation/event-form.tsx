"use client";
import { EventInfoFormCreation } from "@/components/organization/event-creation/event-form-creation";
import { useState } from "react";
import { ProgressEvent } from "@/components/organization/event-progress/event-progess";

export function EventFormCreation() {
  const [namePercentage, setTitlePercentage] = useState(0);
  const [descriptionPercentage, setDescriptionPercentage] = useState(0);
  const [locationPercentage, setLocationPercentage] = useState(0);
  const [startDatePercentage, setStartDatePercentage] = useState(0);
  const [endDatePercentage, setEndDatePercentage] = useState(0);
  const [categoryPercentage, setCategoryPercentage] = useState(0);
  const [imagesPercentage, setImagesPercentage] = useState(0);

  // const [locationPercentage, setLocationPercentage] = useState(0);

  return (
    <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light p-6">
      <ProgressEvent
        name={namePercentage}
        description={descriptionPercentage}
        location={locationPercentage}
        endDate={endDatePercentage}
        startDate={startDatePercentage}
        // timezone={timezonePercentage}
        organization={imagesPercentage}
        category={categoryPercentage}
        // images={imagesPercentage}
      />

      <div className="w-full flex flex-col gap-6   border-iDonate-navy-accent">
        <EventInfoFormCreation
          onNamePercentageUpdate={setTitlePercentage}
          onDescriptionPercentageUpdate={setDescriptionPercentage}
          onLocationPercentageUpdate={setLocationPercentage}
          onStartDatePercentageUpdate={setStartDatePercentage}
          onEndDatePercentageUpdate={setEndDatePercentage}
          onImagesPercentageUpdate={setImagesPercentage}
          // onTimezonePercentageUpdate={setImagesPercentage}

          // onOrganizationPercentageUpdate={setOrganizationPercentage}
        />
      </div>
    </section>
  );
}
