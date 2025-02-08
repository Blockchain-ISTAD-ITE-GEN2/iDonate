"use client";
import { Users, CircleDollarSign, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import {
  useGetDraftEventsFalseQuery,
  useGetEventsQuery,
} from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";

export default function LatestDonationCard() {
  const router = useRouter();
  const [typedEvents, setTypedEvents] = useState<EventType[]>([]);

  // Fetch data from RTK
  const { data: apiEventResponse = { content: [] } } =
    useGetDraftEventsFalseQuery({});

  useEffect(() => {
    // Sort and slice the events
    const sortedEvents = apiEventResponse.content
      .toSorted(
        (a: any, b: any) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
      .slice(0, 4);
    setTypedEvents(sortedEvents);
  }, [apiEventResponse]);

  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/websocket`,
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      typedEvents.forEach((event) => {
        stompClient.subscribe(
          `/topic/totalAmountByEvent/${event.uuid}`,
          (message) => {
            setTypedEvents((prevEvents) =>
              prevEvents.map((e) =>
                e.uuid === event.uuid
                  ? { ...e, currentRaised: parseFloat(message.body) || 0 }
                  : e,
              ),
            );
          },
        );

        stompClient.subscribe(
          `/topic/totalDonorsByEvent/${event.uuid}`,
          (message) => {
            setTypedEvents((prevEvents) =>
              prevEvents.map((e) =>
                e.uuid === event.uuid
                  ? { ...e, totalDonors: parseInt(message.body) || 0 }
                  : e,
              ),
            );
          },
        );
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

  return (
    <div className="w-full h-auto bg-transparent flex flex-col gap-6 lg:pb-[500px]">
      {/* The Big Card of Lastest Event  */}
      <div className="lg:relative z-10 lg:hover:z-[10] pointer-events-auto transition-transform duration-200 lg:hover:scale-95">
        {typedEvents.slice(3, 4).map((item) => (
          <Card
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/event-detail/${item?.uuid}`);
            }}
            key={item.uuid}
            className="w-full overflow-hidden cursor-pointer h-auto lg:h-[660px] p-0 m-0 border-none grid lg:grid-cols-2 item-center lg:relative"
          >
            {/* Image Section */}
            <CardHeader className="relative min-h-[660px]">
              <Image

                  src={
                    typeof item?.images?.[0] === "string"
                      ? item.images[0]
                      : "/fallback-placeholder.jpg"
                  }
                // src={
                //   Array.isArray(item?.images) && item.images[0]
                //     ? item.images[0]
                //     : "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
                // }
                fill
                alt="Community support image"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </CardHeader>

                {/* Content Section */}
                <CardContent className="p-9 z-10 bg-iDonate-navy-primary text-iDonate-white-space flex flex-grow flex-col gap-4 dark:bg-iDonate-dark-mode">
                  {/* Dates */}
                  <div className="flex justify-between text-sm">
                    <div className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <span className="text-iDonate-navy-accent dark:text-iDonate-navy-accent mr-1 text-[18px]">
                          <FaRegCalendarAlt />
                        </span>
                        <p className="text-iDonate-navy-accent dark:text-iDonate-navy-accent text-[18px]">
                          ថ្ងៃចាប់ផ្ដើម
                        </p>
                      </div>
                      <p className="text-iDonate-green-primary dark:text-iDonate-green-secondary text-[18px]">
                      {formatDate(typedEvents?.[0]?.startDate) || "12 Dec 2024"}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <span className="text-iDonate-navy-accent dark:text-iDonate-navy-accent mr-1 text-[22px]">
                          <HiCalendarDateRange />
                        </span>
                        <p className="text-iDonate-navy-accent dark:text-iDonate-navy-accent text-[18px]">
                          ថ្ងៃបញ្ចប់
                        </p>
                      </div>
                      <p className="text-iDonate-green-primary dark:text-iDonate-green-secondary text-[18px]">
                      {formatDate(typedEvents?.[0]?.endDate) || "12 Dec 2024"}
                      </p>
                    </div>
                  </div>
                  
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
                  <div className="flex items-center gap-2 p-1">
                    <span className="text-iDonate-navy-primary p-1">
                      អ្នកបរិច្ចាគ: {item?.totalDonors || "0"} នាក់
                    </span>
                  </div>

                  <div className="text-iDonate-navy-primary">
                    ​​ទឹកប្រាក់ទទួលបាន:{" "}
                    {formatAmount(item?.currentRaised) || "0"}
                  </div>
                </div>

                <Button
                  lang="kh"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/event-detail/${item?.uuid}`);
                  }}
                  className="w-full my-[36px] bg-iDonate-green-secondary hover:bg-iDonate-green-primary text-iDonate-navy-primary font-semibold z-3 pointer-events-auto"
                >
                  <Heart
                    style={{ width: "25px", height: "25px" }}
                    className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary hover:bg-iDonate-green-secondary group-hover:bg-iDonate-green-secondary dark:bg-iDonate-navy-primary dark:text-iDonate-navy-primary dark:fill-white"
                  />
                  បរិច្ចាគឡួវនេះ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* The Small 3 Event  Donations Section */}
      <div className="w-full z-30 flex flex-col gap-2  lg:absolute ">
        {typedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  z-2 lg:hover:z-[30]   items-center justify-center mx-auto lg:grid-cols-3 gap-6 p-2 lg:mt-[500px]">
            {typedEvents.slice(0, 3).map((item) => (
              <Card
                onClick={() => router.push(`/event-detail/${item?.uuid}`)}
                key={item?.uuid}
                className="h-auto lg:h-[653px] lg:w-[400px] rounded-[10px] bg-iDonate-light-gray border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02] dark:bg-iDonate-dark-mode"
              >
                <div className="h-[55%]">
                  <Image
                  src={
                    typeof item?.images?.[0] === "string"
                      ? item.images[0]
                      : "/fallback-placeholder.jpg"
                  }
                    // src={
                    //   Array.isArray(item?.images) && item.images[0]
                    //     ? item.images[0]
                    //     : "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
                    // }
                    alt={item.name}
                    width={5000}
                    height={5000}
                    className="w-full h-[100%] rounded-t-lg object-cover"
                  />
                </div>

                <CardContent className="p-4 space-y-4">
                  {/* Dates */}
                  <div className="flex justify-between text-sm">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent mr-1">
                          <FaRegCalendarAlt />
                        </span>
                        <p className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                          ថ្ងៃចាប់ផ្ដើម
                        </p>
                      </div>
                      <p className="text-iDonate-green-primary dark:text-iDonate-green-secondary">
                        {formatDate(typedEvents?.[0]?.startDate) ||
                          "12 Dec 2024"}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent mr-1">
                          <HiCalendarDateRange />
                        </span>
                        <p className="text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
                          ថ្ងៃបញ្ចប់
                        </p>
                      </div>
                      <p className="text-iDonate-green-primary dark:text-iDonate-green-secondary">
                        {formatDate(typedEvents?.[0]?.endDate) || "12 Dec 2024"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-medium-khmer  text-iDonate-navy-primary line-clamp-1 dark:text-iDonate-navy-accent">
                      {item.name}
                    </h3>
                    <p className="font-light  text-description-khmer text-iDonate-navy-secondary line-clamp-1 dark:text-iDonate-navy-accent">
                      {item.description}
                    </p>
                  </div>

                  <div className="lg:flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
                    <div className="flex items-center gap-2 font-light text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent h-12">
                      <Users className="h-4 w-4 text-iDonate-navy-primary dark:text-iDonate-navy-accent" />
                      <span className="khmer-font">
                        អ្នកបរិច្ចាគ៖{" "}
                        <span className="font-medium text-[16px]">
                          {item?.totalDonors || "0"}
                        </span>{" "}
                        នាក់
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-light text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent h-12">
                      <div className="flex items-center gap-1">
                        <CircleDollarSign size={16} />
                        <span className="khmer-font">
                          ទឹកប្រាក់ទទួលបាន៖​​{" "}
                          <span className="font-medium text-[16px]">
                            {formatAmount(item.currentRaised) || "0"}
                          </span>
                        </span>
                      </div>
                    </span>
                  </div>

                  <Button
                    lang="km"
                    onClick={() => router.push(`/event-detail/${item?.uuid}`)}
                    className="w-full bg-iDonate-green-secondary hover:bg-[#22c55e] text-[#1e2c49] font-semibold"
                  >
                    <Heart
                      style={{ width: "25px", height: "25px" }}
                      className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary hover:bg-iDonate-green-secondary group-hover:bg-iDonate-green-secondary dark:bg-iDonate-navy-primary dark:text-iDonate-navy-primary dark:fill-white"
                    />
                    បរិច្ចាគឡួវនេះ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center w-full container mx-auto flex flex-col gap-4">
            <h3
              lang="kh"
              className="text-medium-khmer font-medium text-iDonate-navy-primary khmer-font dark:text-iDonate-green-secondary"
            >
              បច្ចុប្បន្នមិនមានព្រឹត្តិការណ៍បរិច្ចាគទេ
            </h3>
            <p
              lang="kh"
              className="text-iDonate-gray khmer-font dark:text-iDonate-navy-accent"
            >
              សូមត្រឡប់មកម្តងទៀតនៅពេលក្រោយ ដើម្បីពិនិត្យមើលឱកាសបរិច្ចាគថ្មីៗ។
              អរគុណសម្រាប់ការគាំទ្ររបស់អ្នក!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
