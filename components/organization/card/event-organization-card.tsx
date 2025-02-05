import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventType } from "@/difinitions/types/event/EventType";
import { useToast } from "@/hooks/use-toast";
import { useDeleteEventsMutation } from "@/redux/services/event-service";
import { Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export function OrganizationEventCard({ event }: { event: EventType }) {
  const placeholderImage =
    "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg";
  const params = useParams();
  const orgUuid = String(params.uuid); // Ensures `uuid` is a string
  const [deleteEvent] = useDeleteEventsMutation();
  const { toast } = useToast();
  const router = useRouter();

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

  return (
    <Card
      onClick={() => {
        router.push(
          `/organization-dashboard/${orgUuid}/event-edition/${event?.uuid}`,
        );
      }}
      className="w-full h-[440px] bg-iDonate-white-space rounded-lg shadow-[1px_1px_1px_3px_rgba(0,0,0,0.03)] cursor-pointer transition-transform hover:scale-[1.01] border p-7 flex flex-col gap-6 border-iDonate-navy-accent dark:bg-iDonate-dark-mode"
    >
      <CardContent
        lang="en"
        className="p-0 pb-4 font-inter flex flex-row items-center justify-between border-b-[2px] border-dashed border-b-iDonate-navy-primary dark:border-b-iDonate-navy-accent"
      >
        {/* AlertConfirmDialog wrapping the Delete Button */}
        <AlertComfirmDialog
          trigger={
            <Button
              type="button"
              className="text-xl font-normal bg-transparent hover:bg-iDonate-navy-accent text-iDonate-error rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Trash2
                className="fill-iDonate-error w-9 h-9"
                style={{ width: "20px", height: "20px" }}
              />
              Delete Event
            </Button>
          }
          title="Are you sure you want to delete this event?"
          description="This action cannot be undone. Do you want to proceed?"
          actionText="Yes, Delete"
          cancelText="No, Keep Event"
          onAction={handleDeleteEvent} // Call handleDeleteEvent on confirmation
          // Handle cancel logic
        />

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
          {event?.images[0] ? (
            <Image
              src={event?.images[0] || placeholderImage}
              alt={event?.name || "Event Image"}
              width={400}
              height={300}
              className="w-full h-full object-cover"
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
              {event?.name || "Untitled Event"}
            </CardTitle>

            <CardDescription className="text-xl leading-loose text-iDonate-navy-secondary p-0 overflow-hidden dark:text-iDonate-navy-accent">
              {event?.description || "No description available"}
            </CardDescription>
          </CardContent>

          <CardContent lang="en" className="p-0 flex gap-9 items-end flex-grow">
            <div className="flex flex-col gap-2">
              <CardTitle
                lang="km"
                className="text-lg font-inter font-normal text-iDonate-green-primary p-0 dark:text-iDonate-green-secondary"
              >
                ថ្ងៃចាប់ផ្តើម
              </CardTitle>
              <CardDescription className=" text-md font-inter text-iDonate-navy-primary p-1 rounded-lg dark:text-iDonate-navy-accent">
                {event?.startDate
                  ? new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(event.startDate))
                  : ""}
              </CardDescription>
            </div>

            <div className="flex flex-col gap-2">
              <CardTitle
                lang="km"
                className="text-lg font-inter font-normal text-iDonate-green-primary p-0 dark:text-iDonate-green-secondary"
              >
                ថ្ងៃបញ្ចប់
              </CardTitle>
              <CardDescription className=" text-md font-inter text-iDonate-navy-primary p-1 rounded-lg dark:text-iDonate-navy-accent">
                {event?.endDate
                  ? new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(event.endDate))
                  : ""}
              </CardDescription>
            </div>

            <div className="flex flex-col gap-2">
              <CardTitle
                lang="km"
                className="text-lg font-inter font-normal text-iDonate-green-primary p-0 dark:text-iDonate-green-secondary"
              >
                ចំនួនទឹកប្រាក់
              </CardTitle>
              <CardDescription className=" text-xl font-medium font-inter text-iDonate-navy-primary p-1 rounded-lg dark:text-iDonate-navy-accent">
              {event?.currentRaised ? `$ ${event.currentRaised}` : "មិនទាន់មានការបរិច្ចាគ"}
              </CardDescription>
            </div>

            <div className="flex flex-col gap-2">
              <CardTitle
                lang="km"
                className="text-lg font-inter font-normal text-iDonate-green-primary p-0 dark:text-iDonate-green-secondary"
              >
                ចំនួនអ្នកបរិច្ចាគ
              </CardTitle>
              <CardDescription className=" text-lg font-inter text-iDonate-navy-primary p-1 rounded-lg dark:text-iDonate-navy-accent">
                {event?.totalDonors || "មិនទាន់មានអ្នកបរិច្ចាគ"}
              </CardDescription>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
