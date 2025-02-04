"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { CircleDollarSign, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
import { EventType } from "@/difinitions/types/event/EventType";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// Function to format the date
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
  
  // State for real-time updates
  const [totalDonors, setTotalDonors] = useState<number>(event.totalDonors ?? 0);
  const [currentRaised, setCurrentRaised] = useState<number>(event.currentRaised ?? 0); 

  useEffect(() => {
    if (!event?.uuid) return;
  
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });
  
    stompClient.onConnect = () => {
      console.log(`Connected to WebSocket for event: ${event.uuid}`);
  
      stompClient.subscribe(`/topic/totalAmountOfEvent`, (message) => {
        const updatedData = JSON.parse(message.body);
        if (updatedData.uuid === event.uuid) {
          setCurrentRaised(updatedData.amount);
        }
      });
  
      stompClient.subscribe(`/topic/totalDonorsByEachEvent`, (message) => {
        const updatedData = JSON.parse(message.body);
        if (updatedData.uuid === event.uuid) {
          setTotalDonors(updatedData.totalDonors);
        }
      });
  
      stompClient.publish({
        destination: "/app/chat.sendTotalAmountOfEvent",
        body: JSON.stringify({ uuid: event.uuid }),
      });
  
      stompClient.publish({
        destination: "/app/chat.sendTotalDonorsByEachEvent",
        body: JSON.stringify({ uuid: event.uuid }),
      });
    };
  
    stompClient.onWebSocketError = (error) => {
      console.error("WebSocket Error:", error);
    };
  
    stompClient.activate();
  
    return () => {
      console.log(`Disconnecting WebSocket for event: ${event.uuid}`);
      stompClient.deactivate();
    };
  }, [event?.uuid]); // ✅ Cleanup runs when event.uuid changes
  

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

        {/* Title and Description */}
        <div className="flex flex-col flex-1">
          <h3
            lang="km"
            className="font-bold text-medium-khmer text-iDonate-navy-primary line-clamp-1 dark:text-iDonate-navy-accent"
          >
            {event?.name || "Untitled Event"}
          </h3>
          <p
            lang="km"
            className="font-light text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent h-12"
          >
            {event?.description || "No description available"}
          </p>
        </div>

        {/* Donor and Amount Information */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
            <h3 className="text-description-khmer text-iDonate-navy-primary line-clamp-1 dark:text-iDonate-navy-accent">
            {totalDonors
            ? `${totalDonors} នាក់បរិច្ចាគ`
            : "No donors yet"}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
            <p className="text-medium-khmer text-iDonate-green-primary line-clamp-1 dark:text-iDonate-green-secondary">
              {currentRaised
                ? `$ ${currentRaised}`
                : "No amount collected"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
