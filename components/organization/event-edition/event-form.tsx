'use client'
import { EventCategoryFormEdition } from "@/components/organization/event-edition/event-category-form";
import { useState } from "react";
import { EventInfoForm } from "./event-info-form";

export function EventFormEdition() {
  const [categoryPercentage, setCategoryPercentage] = useState(0);
  return (
    <section className="w-full flex flex-col gap-6 rounded-lg border-2 border-iDonate-navy-accent shadow-light p-6">

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventCategoryFormEdition onPercentageUpdate={setCategoryPercentage} />
      </div>

      <div className="w-full flex flex-col gap-6 border-iDonate-navy-accent">
        <EventInfoForm />
      </div>
    </section>
  );
}
