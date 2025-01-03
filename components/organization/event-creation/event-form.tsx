"use client";
import { EventInfoFormCreation } from "@/components/organization/event-creation/event-form-creation";
import { useState } from "react";
import { ProgressEvent } from "@/components/organization/event-progress/event-progess";

export function EventFormCreation() {
  const [titlePercentage, setTitlePercentage] = useState(0);
  const [descriptionPercentage, setDescriptionPercentage] = useState(0);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [startDatePercentage, setStartDatePercentage] = useState(0);
  const [endDatePercentage, setEndDatePercentage] = useState(0);
  const [contactPercentage, setContactPercentage] = useState(0);
  const [categoryPercentage, setCategoryPercentage] = useState(0);
  return (
    <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light p-6">
      <ProgressEvent
        category={categoryPercentage}
        contact={contactPercentage}
        description={descriptionPercentage}
        endDate={endDatePercentage}
        image={imagePercentage}
        startDate={startDatePercentage}
        title={titlePercentage}
      />

      <div className="w-full flex flex-col gap-6  border-b-2 border-iDonate-navy-accent">
        <EventInfoFormCreation
          onTitlePercentageUpdate={setTitlePercentage}
          onDescriptionPercentageUpdate={setDescriptionPercentage}
          onImagePercentageUpdate={setImagePercentage}
          onOrderDatePercentageUpdate={setStartDatePercentage}
          onEndDatePercentageUpdate={setEndDatePercentage}
          onContactPercentageUpdate={setContactPercentage}
          onCategoryPercentageUpdate={setCategoryPercentage}
        />
      </div>
    </section>
  );
}
