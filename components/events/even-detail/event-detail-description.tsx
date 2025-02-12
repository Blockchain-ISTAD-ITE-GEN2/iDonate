import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventType } from "@/difinitions/types/event/EventType";
import { useGetEventByUuidQuery } from "@/redux/services/event-service";
import { useParams } from "next/navigation";

export function EvenDetailDescription() {

  const uuid = useParams();
  // Fetch event details using the useGetEventByUuidQuery hook
  const { data: events } = useGetEventByUuidQuery(uuid?.uuid);
  const typedEvents: EventType = events;

  return (
    <div className="h-full">
      <Card className="w-full h-full border-2 border-iDonate-navy-accent">
        <div>
          <CardHeader>
            <CardTitle className="text-iDonate-navy-primary font-semibold text-2xl dark:text-iDonate-navy-accent">
             {typedEvents?.name }
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-iDonate-navy-primary text-lg leading-9 dark:text-iDonate-navy-accent">
              {typedEvents?.description}
            </CardDescription>
          </CardContent>
        </div>

      </Card>
    </div>
  );
}
