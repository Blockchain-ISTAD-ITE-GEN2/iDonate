import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventType } from "@/difinitions/types/event/EventType";
import { useToast } from "@/hooks/use-toast";
import {
  useComfirmEventMutation,
  useDeleteEventsMutation,
  useHideEventMutation,
} from "@/redux/services/event-service";
import {
  CalendarCheck,
  CircleDollarSign,
  EyeOff,
  Share2,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type EventCardProps = {
  event: EventType;
};

export function OrganizationEventCard({ event }: EventCardProps) {
  const params = useParams();
  const [totalDonors, setTotalDonors] = useState(event.totalDonors ?? 0);
  const [currentRaised, setCurrentRaised] = useState(event.currentRaised ?? 0);
  const orgUuid = String(params.uuid); // Ensures `uuid` is a string
  const [deleteEvent] = useDeleteEventsMutation();
  const [comfirmEvent] = useComfirmEventMutation();
  const [hideEvent] = useHideEventMutation();
  const { toast } = useToast();
  const router = useRouter();

  console.log("Event UUID:", event?.uuid);

  const handleDeleteEvent = async () => {
    try {
      // Call the delete event mutation
      await deleteEvent(event?.uuid).unwrap();
      toast({
        title: "Event Deleted",
        description: `The event "${event.name}" has been successfully deleted.`,
        variant: "default", // You can choose the type as "success", "error", etc.
      });
    } catch (error) {
      toast({
        title: "Error Deleting Event",
        description: "Something went wrong while trying to delete the event.",
        variant: "destructive",
      });
    }
  };

  const handleConfirmEvent = async () => {
    try {
      // Call the delete event mutation
      await comfirmEvent(event?.uuid).unwrap();
      toast({
        title: "Event Confirmed",
        description: `The event "${event.name}" has been successfully confirmed.`,
        variant: "default", // You can choose the type as "success", "error", etc.
      });
    } catch (error) {
      toast({
        title: "Error Confirming Event",
        description: "Something went wrong while trying to confirm the event.",
        variant: "destructive",
      });
    }
  };

  const handleHideEvent = async () => {
    try {
      // Call the delete event mutation
      await hideEvent(event?.uuid).unwrap();
      toast({
        title: "Event has been hidden",
        description: `The event "${event.name}" has been successfully hid.`,
        variant: "default", // You can choose the type as "success", "error", etc.
      });
    } catch (error) {
      toast({
        title: "Error hiding Event",
        description: "Something went wrong while trying to hide the event.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      onClick={() => {
        router.push(
          `/organization-dashboard/${orgUuid}/event-edition/${event?.uuid}`,
        );
      }}
      className="w-full rounded-[10px]  border-0 cursor-pointer shadow-md transition-transform hover:scale-[1.02]  dark:bg-iDonate-bg-dark-mode"
    >
      <CardContent className="w-full relative h-[180px] p-0 overflow-hidden rounded-t-[10px]">
        {event?.images ? (
          <Image
            className="w-full h-full object-cover"
            fill
            src={
              typeof event?.images?.[0] === "string"
                ? event.images[0]
                : "/fallback-placeholder.jpg"
            }
            alt={event?.name || "Event Image"}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </CardContent>

      <CardContent className="px-4 py-4 flex flex-col gap-4">
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
              {formatDate(event?.startDate) || "12 Dec 2024"}
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
              {totalDonors ? `${totalDonors} នាក់បរិច្ចាគ` : "No donors yet"}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <CircleDollarSign className="h-5 w-5 text-iDonate-green-primary dark:text-iDonate-green-secondary" />
            <p className="text-iDonate-green-primary font-medium text-[18px] dark:text-iDonate-green-secondary">
              {currentRaised > 0
                ? `${currentRaised.toFixed(2).toLocaleString()} USD`
                : "No funds raised yet"}
            </p>
          </div>
        </div>
      </CardContent>

      <CardContent
        lang="en"
        className="p-0 px-4 pb-4 font-inter flex flex-col items-center justify-between gap-4 dark:border-b-iDonate-navy-accent"
      >
        {/* AlertConfirmDialog wrapping the Delete Button */}

        <div className="w-full flex justify-between gap-2">
          {event?.isDraft ? (
            <AlertComfirmDialog
              trigger={
                <Button
                  type="button"
                  className="text-xl flex-1 font-normal bg-transparent bg-iDonate-light-gray hover:bg-iDonate-navy-accent text-iDonate-navy-primary rounded-lg dark:text-iDonate-navy-accent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CalendarCheck className="w-5 h-5" />
                  Confirm
                </Button>
              }
              title="Are you sure you want to confirm this event?"
              description="Once confirmed, this event will be published."
              actionText="Yes, Confirm"
              cancelText="No, Keep as Draft"
              onAction={handleConfirmEvent}
            />
          ) : (
            <AlertComfirmDialog
              trigger={
                <Button
                  type="button"
                  className="text-xl flex-1 font-normal bg-transparent bg-iDonate-light-gray hover:bg-iDonate-navy-accent text-iDonate-navy-primary rounded-lg dark:text-iDonate-navy-accent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EyeOff className="w-5 h-5" />
                  Hide
                </Button>
              }
              title="Are you sure you want to hide this event?"
              description="Once hid, this event will be disappeared."
              actionText="Yes, Confirm"
              cancelText="No, Keep as visible"
              onAction={handleHideEvent}
            />
          )}

          <AlertComfirmDialog
            trigger={
              <Button
                type="button"
                className="text-xl flex-1 font-normal bg-transparent bg-iDonate-light-gray hover:bg-iDonate-light-red text-iDonate-error rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </Button>
            }
            title="Are you sure you want to delete this event?"
            description="This action cannot be undone. Do you want to proceed?"
            actionText="Yes, Delete"
            cancelText="No, Keep Event"
            onAction={handleDeleteEvent}
          />
        </div>

        <Button className="text-xl font-normal w-full bg-transparent bg-iDonate-green-accent hover:bg-iDonate-green-secondary text-iDonate-navy-primary rounded-lg dark:text-iDonate-navy-accent ">
          <Share2
            className="fill-iDonate-navy-primary"
            style={{ width: "25px", height: "25px" }}
          />
          Share Event
        </Button>
      </CardContent>
    </Card>
  );
}
