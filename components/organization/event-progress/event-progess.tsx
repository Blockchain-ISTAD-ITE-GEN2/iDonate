"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

type EventPercentageProps = {
  name?: number;
  description?: number;
  location?: number;
  endDate?: number;
  startDate?: number;
  timezone?: number;
  organization?: number;
  category?: number;
  images?: number;
};

export function ProgressEvent({
  name,
  description,
  location,
  endDate,
  startDate,
  timezone,
  organization,
  category,
  images,
}: EventPercentageProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate the total percentage
    const totalProgress =
      (name || 0) +
      (description || 0) +
      (location || 0) +
      (endDate || 0) +
      (startDate || 0) +
      (timezone || 0) +
      (organization || 0) +
      (category || 0) +
      (images || 0);

    // Set progress with a delay for a smooth animation
    const timer = setTimeout(() => {
      setProgress(totalProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    name,
    description,
    location,
    endDate,
    startDate,
    timezone,
    organization,
    category,
    images,
  ]);

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
