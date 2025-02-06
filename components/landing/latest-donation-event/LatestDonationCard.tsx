"use client";
import { Users, CircleDollarSign, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useGetEventsQuery } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function LatestDonationCard() {
  const router = useRouter();
  const [typedEvents, setTypedEvents] = useState<EventType[]>([]);
  const { data: apiEventResponse = { content: [] } } = useGetEventsQuery({});

  useEffect(() => {
    const sortedEvents = apiEventResponse.content
      .toSorted((a: any, b: any) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      )
      .slice(0, 4);
    setTypedEvents(sortedEvents);
  }, [apiEventResponse]);

  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      typedEvents.forEach((event) => {
        stompClient.subscribe(`/topic/totalAmountByEvent/${event.uuid}`, (message) => {
          setTypedEvents((prevEvents) =>
            prevEvents.map((e) =>
              e.uuid === event.uuid ? { ...e, currentRaised: parseFloat(message.body) || 0 } : e
            )
          );
        });

        stompClient.subscribe(`/topic/totalDonorsByEvent/${event.uuid}`, (message) => {
          setTypedEvents((prevEvents) =>
            prevEvents.map((e) =>
              e.uuid === event.uuid ? { ...e, totalDonors: parseInt(message.body) || 0 } : e
            )
          );
        });
      });
    };

    stompClient.activate();
    return () => {
      stompClient.deactivate();
    };
  }, [typedEvents]);

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
          <div className="relative min-h-[660px]">
            <Image
              src={Array.isArray(item?.images) && item.images[0] ? item.images[0] : "/fallback-placeholder.jpg"}
              fill
              alt="Community support image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-9 bg-iDonate-navy-primary text-iDonate-white-space flex flex-grow flex-col gap-4 dark:bg-iDonate-dark-mode">
            <div>
              <h2 lang="km" className="text-title-khmer md:text-heading-one-khmer font-semibold leading-relaxed">
                {item.name}
              </h2>
              <p lang="km" className="flex-1 mb-[36px] text-description-khmer md:text-medium-khmer leading-relaxed">
                {item.description}
              </p>
              <div lang="km" className="p-4 bg-iDonate-navy-accent rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 p-1">
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
                <Heart style={{ width: "25px", height: "25px" }} className="bg-iDonate-navy-primary rounded-full p-1 fill-white" />
                បរិច្ចាគឥឡូវនេះ
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
