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
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log(`Connected to WebSocket for event: ${event.uuid}`);

      stompClient.subscribe("/topic/totalAmountOfEvent", (message) => {
        try {
          const updatedData = JSON.parse(message.body);
          if (updatedData.uuid === event.uuid) {
            setCurrentRaised(updatedData.amount);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });

      stompClient.subscribe("/topic/totalDonorsByEachEvent", (message) => {
        try {
          const updatedData = JSON.parse(message.body);
          if (updatedData.uuid === event.uuid) {
            setTotalDonors(updatedData.totalDonors);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });

      // Request initial data
      stompClient.publish({
        destination: "/app/chat.sendTotalAmountOfEvent",
        body: JSON.stringify({ uuid: event.uuid }),
      });

      stompClient.publish({
        destination: "/app/chat.sendTotalDonorsByEachEvent",
        body: JSON.stringify({ uuid: event.uuid }),
      });
    };

    stompClient.activate();

    return () => {
      console.log(`Disconnecting WebSocket for event: ${event.uuid}`);
      stompClient.deactivate();
    };
  }, [event?.uuid]);

  return (
    <Card
      onClick={() => router.push(`/event-detail/${event?.uuid}`)}
      className="w-full rounded-[10px] bg-iDonate-light-gray border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02] dark:bg-iDonate-dark-mode"
    >
      <CardHeader className="w-full h-[180px] p-0 rounded-t-[10px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
          src={event?.images?.[0] || "/placeholder-image.jpg"}
          alt={event?.name || "Event Image"}
        />
      </CardHeader>

      <CardContent className="px-4 py-4 flex flex-col gap-4">
        <h3 lang="km" className="font-bold text-medium-khmer text-iDonate-navy-primary line-clamp-1 dark:text-iDonate-navy-accent">
          {event?.name || "Untitled Event"}
        </h3>

        <p lang="km" className="font-light text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent h-12">
          {event?.description || "No description available"}
        </p>

        {/* Start Date and End Date */}
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt className="h-5 w-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
          <p className="text-[14px]">
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </p>
        </div>

        {/* Total Donors */}
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
          <h3 className=" text-iDonate-navy-primary dark:text-iDonate-navy-accent">{totalDonors ? `អ្នកបរិច្ចាគ​ ${totalDonors} នាក់` : "មិនទាន់មានអ្នកបរិច្ចាគ"}</h3>
        </div>

        {/* Amount Raised */}
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
          <p  className=" text-iDonate-navy-primary dark:text-iDonate-navy-accent">{currentRaised ? `$${currentRaised.toLocaleString()}` : "មិនទាន់ទទួលបានថវិការ"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
