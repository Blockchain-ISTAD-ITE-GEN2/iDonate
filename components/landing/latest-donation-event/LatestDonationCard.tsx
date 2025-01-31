"use client";
import { Users, CircleDollarSign, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import FamilyImage from "@/public/landing/LateDonation.jpg";
import { useGetEventsQuery } from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";

export default function LatestDonationCard() {
  // fetch data from RTK
  // Get the latest event
  const {
    data: apiEventReponse = { content: [] },
    isLoading,
    isError,
  } = useGetEventsQuery({});

  // const typedEvents: EventType[] = apiEventReponse?.content || [];
  // Query the lastest  evnet

  const typedEvents: EventType[] =
    apiEventReponse?.content
      ?.toSorted(
        (a: any, b: any) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
      ?.slice(0, 4) || [];

  console.log("========> Get Latest Event: ", typedEvents);

  return (
    <div className="w-full h-auto bg-transparent flex flex-col gap-6  lg:pb-[500px]">
      {typedEvents.slice(3, 4).map((item, key) => (
        <Card
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

              {/* Part 2 Description */}
              <p
                lang="km"
                className="flex-1 mb-[36px] text-description-khmer md:text-medium-khmer leading-relaxed"
              >
                {item.description}
              </p>

              {/* Part 3 */}
              <div
                lang="km"
                className="p-4 bg-iDonate-navy-accent rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2 p-1">
                  <span className=" text-iDonate-navy-primary p-1">
                    អ្នកបរិច្ចាគ: {item?.totalDonors || "0"} ពាន់នាក់
                  </span>
                </div>

                <div className="text-iDonate-navy-primary">
                  ​​ទឹកប្រាក់ទទួលបាន: ${item?.currentRaised || "0"}
                </div>
              </div>

              <Button className="w-full my-[36px] bg-iDonate-green-secondary hover:bg-iDonate-green-primary text-iDonate-navy-primary font-semibold">
                <Heart
                  style={{ width: "25px", height: "25px" }}
                  className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary hover:bg-iDonate-green-secondary group-hover:bg-iDonate-green-secondary dark:bg-iDonate-green-secondary  dark:text-iDonate-navy-primary dark:fill-iDonate-navy-primary"
                />
                Donate Now
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {/* Current Donations Section */}

      <div className="w-full flex flex-col gap-2 z-2 Lg:z-1 lg:absolute">
        {typedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center mx-auto lg:grid-cols-3 gap-6 p-2 lg:mt-[500px]">
            {typedEvents.slice(0, 3).map((item, key) => (
              <Card
                key={item.uuid}
                className="h-auto lg:h-[653px] lg:w-[400px] rounded-[10px] bg-iDonate-light-gray border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02] dark:bg-iDonate-dark-mode  "
              >
                <div className="h-[55%] ">
                  <Image
                    src={
                      Array.isArray(item?.images) && item.images[0]
                        ? item.images[0]
                        : "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg"
                    }
                    alt={item.name}
                    width={5000}
                    height={5000}
                    className="w-full h-[100%] rounded-t-lg object-cover"
                  />
                </div>

                <div className="p-4 space-y-4 ">
                  <div>
                    <h3 className="font-bold text-medium-khmer text-iDonate-navy-primary line-clamp-2 dark:text-iDonate-navy-accent ">
                      {item.name}
                    </h3>
                    <p className="font-light text-description-khmer text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col  sm:flex-row items-center justify-between text-sm gap-4">
                    <div className="flex items-center gap-2 font-light text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent h-12 ">
                      <Users className="h-4 w-4 text-iDonate-navy-primary" />
                      <span className="khmer-font">
                        អ្នកបរិច្ចាគ៖ {item?.totalDonors || "0"} ពាន់នាក់
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-light text-iDonate-navy-secondary line-clamp-2 dark:text-iDonate-navy-accent h-12 ">
                      <CircleDollarSign size={16} />
                      <span className="khmer-font">
                        ទឹកប្រាក់ទទួលបាន៖​​ ${item.currentRaised || " 0 "}
                      </span>
                    </span>
                  </div>

                  <Button className="w-full bg-iDonate-green-secondary hover:bg-[#22c55e] text-[#1e2c49] font-semibold">
                    <Heart
                      style={{ width: "25px", height: "25px" }}
                      className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary hover:bg-iDonate-green-secondary group-hover:bg-iDonate-green-secondary dark:bg-iDonate-green-secondary  dark:text-iDonate-navy-primary dark:fill-iDonate-navy-primary"
                    />
                    Donate Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center w-full container mx-auto flex flex-col gap-4">
            <h3
              lang="km"
              className="text-medium-khmer font-medium  text-iDonate-navy-primary khmer-font dark:text-iDonate-green-secondary"
            >
              បច្ចុប្បន្នមិនមានព្រឹត្តិការណ៍បរិច្ចាគទេ
            </h3>
            <p
              lang="km"
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
