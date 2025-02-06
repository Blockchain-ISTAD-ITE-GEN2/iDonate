"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { CircleDollarSign, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaRegCalendarAlt } from "react-icons/fa";
import { EventType } from "@/difinitions/types/event/EventType";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// Function to format dates
function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function CommonEventCard({ event }: { event: EventType }) {
  const router = useRouter();
  const [totalDonors, setTotalDonors] = useState(event.totalDonors ?? 0);
  const [currentRaised, setCurrentRaised] = useState(event.currentRaised ?? 0);

  useEffect(() => {
    if (!event?.uuid) return;
  
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      // Subscribe to event-specific updates
      stompClient.subscribe(`/topic/totalAmountByEvent/${event.uuid}`, (message) => {
        setCurrentRaised(parseFloat(message.body) || 0);
      });

      stompClient.subscribe(`/topic/totalDonorsByEvent/${event.uuid}`, (message) => {
        setTotalDonors(parseInt(message.body, 10) || 0);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [event?.uuid]);

  return (
    <Card
      onClick={() => router.push(`/event-detail/${event?.uuid}`)}
      className="w-full rounded-[10px]  border-0 cursor-pointer shadow-md hover:scale-[1.02]  dark:bg-iDonate-bg-dark-mode"
    >
      <CardHeader className="w-full h-[180px] p-0 overflow-hidden rounded-t-[10px]">
        <Image
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
          src={event?.images?.[0] || "/fallback-placeholder.jpg"}
          alt={event?.name || "Event Image"}
        />
      </CardHeader>

      <CardContent className="px-4 py-6 flex flex-col gap-4 h-[250px]">
        <h3 lang="km" className="font-bold text-medium-khmer text-iDonate-navy-primary truncate dark:text-iDonate-navy-accent">
          {event?.name || "Untitled Event"}
        </h3>

        <p lang="km" className="font-light text-iDonate-navy-secondary truncate dark:text-iDonate-navy-accent">
          {event?.description || "No description available"}
        </p>

        <div className="flex items-center gap-2">
          <FaRegCalendarAlt className="h-5 w-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
          <p className="text-[14px] text-iDonate-navy-primary dark:text-iDonate-navy-accent">
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
          <h3 className="text-iDonate-navy-primary dark:text-iDonate-navy-accent">
            {totalDonors > 0 ? `អ្នកបរិច្ចាគ ${totalDonors} នាក់` : "No donors yet"}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <CircleDollarSign className="h-5 w-5 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
          <p className="text-iDonate-green-primary font-medium text-[17px] dark:text-iDonate-navy-accent">
            {currentRaised > 0 ? `${currentRaised.toFixed(2).toLocaleString()} USD` : "No funds raised yet"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
