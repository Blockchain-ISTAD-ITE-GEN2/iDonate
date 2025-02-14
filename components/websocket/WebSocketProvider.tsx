import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface WebSocketContextType {
  totalDonors: number;
  currentRaised: number;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ eventUuid: string; children: React.ReactNode }> = ({ 
    eventUuid = "", 
    children 
}) => {
  const [totalDonors, setTotalDonors] = useState<number>(0);
  const [currentRaised, setCurrentRaised] = useState<number>(0.0);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!eventUuid) return;

    // Prevent multiple WebSocket connections
    if (stompClientRef.current) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/totalAmountByEvent/${eventUuid}`, (message) => {
        setCurrentRaised(parseFloat(message.body) || 0.0);
      });

      stompClient.subscribe(`/topic/totalDonorsByEvent/${eventUuid}`, (message) => {
        setTotalDonors(parseInt(message.body, 10) || 0);
      });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
    };
  }, [eventUuid]);

  return (
    <WebSocketContext.Provider value={{ totalDonors, currentRaised }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to access WebSocket data
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
