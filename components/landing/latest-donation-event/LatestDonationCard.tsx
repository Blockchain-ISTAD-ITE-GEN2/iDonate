"use client";
import { Users, CircleDollarSign, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useGetEventsQuery } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LatestDonationCard() {
  const router = useRouter();
  const [typedEvents, setTypedEvents] = useState<EventType[]>([]);

  // Fetch data from RTK
  const { data: apiEventResponse = { content: [] } } = useGetEventsQuery({});

  useEffect(() => {
    // Sort and slice the events
    const sortedEvents = apiEventResponse.content
      .toSorted(
        (a: any, b: any) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      )
      .slice(0, 4);
    setTypedEvents(sortedEvents);
  }, [apiEventResponse]);

  // Format amount for display
  const formatAmount = (amount: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full h-auto bg-transparent flex flex-col gap-6 lg:pb-[500px]">
      {typedEvents.slice(3, 4).map((item) => (
        <Card
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/event-detail/${item?.uuid}`);
          }}
          key={item.uuid}
          className="w-full h-auto lg:h-[660px] z-2 p-0 m-0 border-none grid lg:grid-cols-2 item-center lg:z-0 lg:relative"
        >
          {/* Image Section */}
          <div className="relative min-h-[660px]">
            <Image
              src={
                Array.isArray(item?.images) && item.images[0]
                  ? item.images[0]
                  : "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
              }
              fill
              alt="Community support image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-9 bg-iDonate-navy-primary text-iDonate-white-space flex flex-grow flex-col gap-4 dark:bg-iDonate-dark-mode">
            <div>
              <h2
                lang="km"
                className="text-title-khmer md:text-heading-one-khmer font-semibold leading-relaxed"
              >
                {item.name}
              </h2>

              {/* Description */}
              <p
                lang="km"
                className="flex-1 mb-[36px] text-description-khmer md:text-medium-khmer leading-relaxed"
              >
                {item.description}
              </p>

              {/* Donation Info */}
              <div
                lang="km"
                className="p-4 bg-iDonate-navy-accent rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2 p-1 ">
                  <span className="text-iDonate-navy-primary p-1 text-[16px]">
                    អ្នកបរិច្ចាគ: {item?.totalDonors || "0"} នាក់
                  </span>
                </div>

                <div className="text-iDonate-navy-primary text-[16px]">
                  ​​ទឹកប្រាក់ទទួលបាន: ${formatAmount(item?.currentRaised) || "0"}
                </div>
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/event-detail/${item?.uuid}`);
                }}
                className="w-full p-2 text-[12px] my-[36px] bg-iDonate-green-secondary hover:bg-iDonate-green-primary text-iDonate-navy-primary font-semibold"
              >
                <Heart
                  style={{ width: "25px", height: "25px" }}
                  className="bg-iDonate-navy-primary rounded-full p-1 fill-white"
                />
                បរិច្ចាគឥឡូវនេះ
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
