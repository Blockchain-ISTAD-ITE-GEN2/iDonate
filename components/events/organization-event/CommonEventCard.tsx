"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { CircleDollarSign, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
import { useGetEventByUuidQuery } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/dto/EventType";

function formatDate(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function CommonEventCard({ event }: { event: EventType }) {
  const router = useRouter();
  
  // Fetch event details using RTK Query
  const { data: updatedEvent, isLoading } = useGetEventByUuidQuery(event?.uuid, {
    pollingInterval: 5000, // Auto-refresh every 5 seconds
  });

  // Use fetched data if available, otherwise fallback to initial event props
  const totalDonors = updatedEvent?.totalDonors ?? event?.total_donor ?? 0;
  const totalAmount = updatedEvent?.totalAmount ?? event?.total_amount ?? 0;

  return (
    <Card
      onClick={() => router.push(`/event-detail/${event?.uuid}`)}
      className="w-full rounded-[10px] bg-iDonate-light-gray border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02] dark:bg-iDonate-dark-mode"
    >
      {/* Header with Image */}
      <CardHeader className="w-full h-[180px] p-0 rounded-t-[10px] overflow-hidden">
        {event?.images ? (
          <Image
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            src={
              event?.images[0] ||
              "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
            }
            alt={event?.name || "Media"}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 py-4 flex flex-col gap-4">
        {/* Dates */}
        <div className="flex justify-between text-sm">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent mr-1">
                <FaRegCalendarAlt />
              </span>
              <p className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                Start date
              </p>
            </div>

            <p className="text-iDonate-green-primary dark:text-iDonate-green-secondary">
              {formatDate(event?.startDate) || "12 Dec 2024"}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent mr-1">
                <HiCalendarDateRange />
              </span>
              <p className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                End date
              </p>
            </div>

            <p className="text-iDonate-green-primary dark:text-iDonate-green-secondary">
              {formatDate(event?.endDate) || "12 Dec 2025"}
            </p>
          </div>
        </div>

        {/* Donor and Amount Information */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
            <h3 className="text-description-khmer text-iDonate-navy-primary line-clamp-1 dark:text-iDonate-navy-accent">
              {isLoading ? "Loading..." : totalDonors ? `${totalDonors} នាក់បរិច្ចាគ` : "No donors yet"}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
            <p className="text-medium-khmer text-iDonate-green-primary line-clamp-1 dark:text-iDonate-green-secondary">
              {isLoading ? "Loading..." : totalAmount ? `$ ${totalAmount}` : "No amount collected"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
