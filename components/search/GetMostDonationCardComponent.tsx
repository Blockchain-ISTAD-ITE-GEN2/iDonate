import Image from "next/image";
import { CircleDollarSign, Users } from "lucide-react";
import { EventType } from "@/difinitions/types/event/EventType";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function GetMostDonationCardComponent({
  events,
}: {
  events: EventType[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-[16px]">
      {events.slice(0, 5).map((item, index) => (
        <Card
          key={index}
          className={`rounded-[10px] bg-iDonate-light-gray p-0 border-0 box-border ${
            index === 0
              ? "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 w-[636px] h-[816px]"
              : "w-[636px] h-[816px] md:w-[636px] md:h-[816px] lg:w-full lg:h-[400px]"
          }`}
        >
          <CardHeader
            className={`w-full p-0 rounded-t-[10px] box-border ${
              index === 0 ? "h-[520px]" : "h-[520px] md:h-[520px] lg:h-[141px]"
            }`}
          >
            {item.images && (
              <Image
                className={`rounded-t-[10px] object-cover ${
                  index === 0
                    ? "w-full h-[520px]"
                    : "h-[520px] md:h-[520px] lg:h-[170px] w-full"
                }`}
                src={item.images[0]}
                alt={item.name || "Media"}
                width={index === 0 ? 636 : 280}
                height={index === 0 ? 470 : 170} // 459
              />
            )}
          </CardHeader>

          <CardContent
            className={`px-4 flex flex-col justify-between gap-6 box-border ${
              index === 0 ? "h-[280px]" : "h-[280px] md:h-[280px] lg:h-[220px]"
            }`}
          >
            <div className={index === 0 ? "mt-[30px]" : "mt-[30px]"}>
              {item.name && (
                <h3
                  className={`font-extrabold text-medium-khmer text-left ${
                    index === 0
                      ? "line-clamp-2 text-iDonate-navy-primary"
                      : "line-clamp-1 text-iDonate-navy-primary"
                  }`}
                >
                  {item.name}
                </h3>
              )}
              {item.description && (
                <p
                  className={`font-thin text-iDonate-navy-secondary text-name-card text-start ${
                    index === 0 ? "line-clamp-3" : "line-clamp-2"
                  }`}
                >
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 mt-auto">
              <div className="flex items-center gap-4">
                <Users className="fill-iDonate-navy-primary h-6 w-6" />
                {item.totalDonors && (
                  <h3 className="text-description-khmer line-clamp-1 text-center text-iDonate-navy-primary">
                    {item.totalDonors} នាក់បរិច្ចាគ
                  </h3>
                )}
              </div>

              <div className="flex items-center gap-4">
                <CircleDollarSign className="fill-iDonate-navy-primary text-iDonate-white-space h-6 w-6" />
                {item.currentRaised && (
                  <p className="text-medium-khmer line-clamp-2 text-center text-iDonate-navy-primary">
                    {item.currentRaised}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
