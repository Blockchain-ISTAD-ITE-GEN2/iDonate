"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

type EventPercentageProps = {
  image: number;
  category: number;
  title: number;
  description: number;
  endDate: number;
  startDate: number;
  contact: number;
};

export function ProgressEvent({
  image,
  category,
  title,
  description,
  endDate,
  startDate,
  contact,
}: EventPercentageProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate the total percentage
    const totalProgress =
      image + category + title + description + endDate + startDate + contact;

    // Set progress with a delay for a smooth animation
    const timer = setTimeout(() => {
      setProgress(totalProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, [image, category, title, description, endDate, startDate, contact]);

  return (
    <section className="flex flex-col gap-4 border-b-2 border-iDonate-navy-primary border-dashed py-6">
      <Progress value={progress} />

      <div className="flex gap-6 items-center justify-end">
        <p className="text-iDonate-navy-primary text-description-eng font-medium">
          Completed :
        </p>
        <span className="text-iDonate-green-primary text-description-eng font-medium">
          {progress} %
        </span>
      </div>
    </section>
  );
}
