import Image from "next/image";
import { Users, CircleDollarSign } from "lucide-react";
import { EventType } from "@/difinitions/types/event/EventType";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CardEvent({ events }: { events: EventType[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((item, index) => (
        <Card
          key={index}
          className="w-full h-auto rounded-lg shadow-md bg-white overflow-hidden"
        >
          {/* Image Section */}
          <CardHeader className="w-full h-[180px] p-0">
            {item.images && (
              <Image
                className="object-cover w-full h-full"
                width={280}
                height={180}
                src={
                  typeof item?.images?.[0] === "string"
                    ? item.images[0]
                    : "/fallback-placeholder.jpg"
                }
                // src={item.images[0]}
                alt={item.name || "Event"}
              />
            )}
          </CardHeader>

          {/* Content Section */}
          <CardContent className="p-4 flex flex-col gap-2">
            {/* Title */}
            {item.name && (
              <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                {item.name}
              </h3>
            )}

            {/* Description */}
            {item.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            )}

            {/* Stats Section */}
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm">{item.totalDonors} នាក់បរិច្ចាគ</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CircleDollarSign className="h-5 w-5 text-blue-600" />
                <span className="text-sm">{item.currentRaised}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
