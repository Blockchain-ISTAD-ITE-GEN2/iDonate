import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrganizationEventType } from "@/difinitions/dto/Organization-event";
import { Share2, Trash2 } from "lucide-react";
import Image from "next/image";

export function OrganizationEventCard({
  event,
}: {
  event: OrganizationEventType;
}) {
  return (
    <>
      <Card className="w-full h-[440px] bg-iDonate-white-space rounded-lg shadow-[1px_1px_1px_3px_rgba(0,0,0,0.03)] border p-7 flex flex-col gap-6 border-iDonate-navy-accent dark:bg-iDonate-dark-mode">
        <CardContent
          lang="en"
          className="p-0 pb-4 font-inter flex flex-row items-center justify-between border-b-[2px] border-dashed border-b-iDonate-navy-primary dark:border-b-iDonate-navy-accent"
        >
          <Button className="text-xl font-normal bg-transparent hover:bg-iDonate-navy-accent text-iDonate-error rounded-lg">
            <Trash2
              className="fill-iDonate-error w-9 h-9"
              style={{ width: "25px", height: "25px" }}
            />
            Delete Event
          </Button>

          <Button className="text-xl font-normal bg-transparent hover:bg-iDonate-navy-accent text-iDonate-navy-primary rounded-lg dark:text-iDonate-navy-accent ">
            <Share2
              className="fill-iDonate-navy-primary"
              style={{ width: "25px", height: "25px" }}
            />
            Share Event
          </Button>
        </CardContent>

        <div className="flex gap-6">
          <CardContent className="p-0 w-[300px] h-[300px] rounded-lg">
            {event?.image ? (
              <Image
                width={300}
                height={300}
                src={event?.image}
                alt={event?.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}
          </CardContent>

          <div className="flex flex-col flex-1 justify-between h-full min-h-0">
            <CardContent className="p-0 flex flex-col gap-4 flex-grow">
              <CardTitle className="text-3xl font-medium text-iDonate-navy-secondary p-0 dark:text-iDonate-navy-accent ">
                {event?.title || "Untitled Event"}
              </CardTitle>

              <CardDescription className="text-xl leading-loose text-iDonate-navy-secondary p-0 overflow-hidden dark:text-iDonate-navy-accent">
                {event?.description || "No description available"}
              </CardDescription>
            </CardContent>

            <CardContent
              lang="en"
              className="p-0 flex gap-9 items-end flex-grow"
            >
              <div className="flex flex-col gap-2">
                <CardTitle className="text-lg font-inter font-normal text-iDonate-green-primary p-0 dark:text-iDonate-green-secondary">
                  Order Date
                </CardTitle>
                <CardDescription className="text-xl font-inter text-iDonate-navy-primary p-0 dark:text-iDonate-navy-accent">
                  {event?.order_date || "12 September 2024"}
                </CardDescription>
              </div>

              <div className="flex flex-col gap-2">
                <CardTitle className="text-lg font-inter font-normal text-iDonate-green-primary p-0 dark:text-iDonate-green-secondary">
                  End Date
                </CardTitle>
                <CardDescription className="text-xl font-inter text-iDonate-navy-primary p-0 dark:text-iDonate-navy-accent">
                  {event?.end_date || "12 September 2025"}
                </CardDescription>
              </div>

              <div className="flex flex-col gap-2">
                <CardTitle className="text-lg font-inter font-normal text-iDonate-green-primary p-0 dark:text-iDonate-green-secondary">
                  Raised
                </CardTitle>
                <CardDescription className="text-xl font-inter text-iDonate-navy-primary p-0 dark:text-iDonate-navy-accent">
                  ${event?.total_raised || "No amount collected"}
                </CardDescription>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}
