"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { CircleDollarSign, Users } from "lucide-react";
import { EventType } from "@/difinitions/dto/EventType";
import { useRouter } from "next/navigation";


export function CommonEventCard({event, key}: { event: EventType, key?: number }) {

  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/event-detail`)}
      className="w-[280px] min-h-[400px] rounded-[10px] bg-iDonate-light-gray p-0 m-0 border-0 cursor-pointer"
    >
      {/* Header with Image */}
      <CardHeader
        
        className="w-full h-[180px] p-0 m-0 rounded-t-[10px]"
      >
        {event?.image ? (
          <Image
            className="rounded-t-[10px]"
            width={1000}
            height={1000}
            src={event?.image || "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"}
            alt={event?.title || "Media"}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </CardHeader>

      {/* Content */}
      <CardContent  className="px-4 flex flex-col min-h-[220px] gap-4 py-4">

        {/* date */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-iDonate-gray text-xs ">Order date</p>
            <p className="text-iDonate-navy-secondary text-sm">
              {event?.date || "12 Dec 2024"}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-iDonate-gray text-xs ">End date</p>
            <p className="text-iDonate-navy-secondary text-sm">
              {event?.date || "12 Dec 2025"}
            </p>
          </div>
        </div>

        {/* Title and description */}
        <div className=" flex flex-col flex-1">
          <h3
            lang="km"
            className="font-bold text-medium-khmer line-clamp-1 text-left text-iDonate-navy-primary"
          >
            {event?.title || "Untitled Event"}
          </h3>
          <p
            lang="km"
            className="font-thin text-iDonate-navy-secondary text-title-card line-clamp-2 text-start"
          >
            {event?.description || "No description available"}
          </p>
        </div>

        {/* Donor and Amount Information */}
        <div  className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <Users className="fill-iDonate-navy-primary h-6 w-6" />
            <h3 className="text-description-khmer line-clamp-1 text-center text-iDonate-navy-primary">
              {event?.total_donor
                ? `${event?.total_donor} នាក់បរិច្ចាគ`
                : "No donors yet"}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <CircleDollarSign className="fill-iDonate-navy-primary text-iDonate-white-space h-6 w-6" />
            <p className="text-medium-khmer line-clamp-2 text-center text-iDonate-navy-primary">
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
