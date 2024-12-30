"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { CircleDollarSign, Users } from "lucide-react";
import { EventType } from "@/difinitions/dto/EventType";
import { useRouter } from "next/navigation";

export function CommonEventCard({ event }: { event: EventType }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/event-detail`)}
      className="w-full rounded-[10px] bg-iDonate-light-gray border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02]"
    >
      {/* Header with Image */}
      <CardHeader className="w-full h-[180px] p-0 rounded-t-[10px] overflow-hidden">
        {event?.image ? (
          <Image
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            src={
              event?.image ||
              "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
            }
            alt={event?.title || "Media"}
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
            <p className="text-iDonate-gray">Order date</p>
            <p className="text-iDonate-navy-secondary">
              {event?.date || "12 Dec 2024"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-iDonate-gray">End date</p>
            <p className="text-iDonate-navy-secondary">
              {event?.date || "12 Dec 2025"}
            </p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col flex-1">
          <h3
            lang="km"
            className="font-bold text-medium-khmer text-iDonate-navy-primary line-clamp-1"
          >
            {event?.title || "Untitled Event"}
          </h3>
          <p
            lang="km"
            className="font-light text-iDonate-navy-secondary line-clamp-2"
          >
            {event?.description || "No description available"}
          </p>
        </div>

        {/* Donor and Amount Information */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-iDonate-navy-primary" />
            <h3 className="text-description-khmer text-iDonate-navy-primary line-clamp-1">
              {event?.total_donor
                ? `${event?.total_donor} នាក់បរិច្ចាគ`
                : "No donors yet"}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-iDonate-navy-primary" />
            <p className="text-medium-khmer text-iDonate-navy-primary line-clamp-1">
              {event?.total_amount
                ? `$ ${event?.total_amount}`
                : "No amount collected"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
