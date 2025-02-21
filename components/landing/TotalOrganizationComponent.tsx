"use client";

import React, { useState, useEffect } from "react";
//import React, { useState, useEffect } from "react";
import { frame, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Gift, Users, HandHeartIcon } from "lucide-react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// Data for the organization statistics
const initialOrganizationData = [
  { amount: 0, desc: "ចំនួនសរុប", title: "អង្គការភាព", icon: Building2 },
  { amount: 0, desc: "ចំនួនសរុប", title: "កម្មវិធីបរិច្ចាគ", icon: Gift },
  { amount: 0, desc: "ចំនួនសរុប", title: "អ្នកស្ម័គ្រចិត្ត", icon: Users },
  {
    amount: 0,
    desc: "ចំនួនថវិការ",
    title: "ដែលបានបរិច្ចាគ",
    icon: HandHeartIcon,
  },
];

const CounterAnimation = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      if (!isNaN(target)) {
        let start = 0;
        const end = target;
        const duration = 500;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start > end) {
            clearInterval(timer);
            setCount(end);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }
  }, [inView, target]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
        count,
      )}
    </span>
  );
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  }).format(amount);
};

// Organization Stat Card Component
const StatCard = ({
  item,
  index,
}: {
  item: (typeof initialOrganizationData)[0];
  index: number;
}) => {
  return (
    <motion.div
      key={index}
      className="w-full flex justify-center items-center text-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex flex-col items-center bg-white rounded-lg shadow-light p-4 sm:p-6 transition-all duration-300 w-full opacity-90 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        {/* Icon */}
        <span className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4">
          <item.icon
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 sm:mb-4 text-iDonate-green-primary dark:text-iDonate-green-secondary"
            style={{ strokeWidth: 2 }}
          />
        </span>

        {/* Counter */}
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-iDonate-green-primary dark:text-iDonate-green-secondary">
          {/* {formatAmount(item.amount)} */}
          <CounterAnimation target={item.amount} />
        </span>

        {/* Description */}
        <div className="mt-1 sm:mt-2 dark:text-white text-iDonate-navy-primary text-xs sm:text-sm">
          <span>{item.desc}</span>
        </div>

        {/* Title */}
        <div className="mt-1 text-iDonate-navy-primary font-medium text-sm sm:text-base dark:text-iDonate-navy-accent">
          <span>{item.title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
export default function TotalOrganizationComponent() {
  const [organizationData, setOrganizationData] = useState(
    initialOrganizationData,
  );

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`,
    );
    // const socket = new SockJS("http://localhost:9999/websocket")

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onWebSocketClose = () => {
      console.warn("WebSocket connection closed. Attempting to reconnect...");
      setTimeout(() => stompClient.activate(), 5000);
    };

    stompClient.onConnect = (frame) => {

      stompClient.subscribe("/topic/totalDonors", (message) => {
        const totalDonors = JSON.parse(message.body);
        setOrganizationData((prevData) =>
          prevData.map((item, i) =>
            i === 2 ? { ...item, amount: totalDonors } : item,
          ),
        );
      });

      stompClient.subscribe("/topic/totalOrganizations", (message) => {
        const totalOrganizations = JSON.parse(message.body);
        setOrganizationData((prevData) =>
          prevData.map((item, i) =>
            i === 0 ? { ...item, amount: totalOrganizations } : item,
          ),
        );
      });

      stompClient.subscribe("/topic/totalEvents", (message) => {
        const totalEvents = JSON.parse(message.body);
        setOrganizationData((prevData) =>
          prevData.map((item, i) =>
            i === 1 ? { ...item, amount: totalEvents } : item,
          ),
        );
      });

      stompClient.subscribe("/topic/totalDonationAmount", (message) => {
        let totalDonationAmount = JSON.parse(message.body);

        // Ensure it's a valid number and format it properly
        if (typeof totalDonationAmount === "string") {
          totalDonationAmount = parseFloat(totalDonationAmount);
        }


        setOrganizationData((prevData) =>
          prevData.map((item, i) =>
            i === 3 ? { ...item, amount: totalDonationAmount } : item,
          ),
        );
      });
    };

    stompClient.activate();

    // Cleanup on unmount
    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <motion.div
      lang="km"
      className="overflow-hidden h-auto py-9 bg-iDonate-light-gray w-full mx-auto md:py-20 px-4 md:px-8 lg:px-[100px] dark:bg-iDonate-dark-mode"
    >
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center dark:text-white text-iDonate-navy-primary mb-8 sm:mb-12 leading-tight">
        យើងរួមគ្នា កសាងសហគមន៍ដ៏រឹងមាំមួយ
      </h2>

      {/* Grid Layout for Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-center">
        {organizationData.map((item, index) => (
          <StatCard key={index} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
