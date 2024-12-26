"use client";
import { EventCategoryFormEdition } from "@/components/organization/event-edition/event-category-form";
import { useState } from "react";
import { EventInfoForm } from "@/components/organization/event-edition/event-info-form";
import { ProgressEvent } from "@/components/organization/event-edition/event-progess";

export function EventFormEdition() {
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

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventCategoryFormEdition onPercentageUpdate={setCategoryPercentage} />
      </div>

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventInfoForm
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
