"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { eventInfoSchema } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import Image from "next/image";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import { useGetCategoriesQuery } from "@/redux/services/category-service";
import {
  useEditEventsMutation,
  useGetEventByUuidQuery,
} from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";
import { useToast } from "@/hooks/use-toast";

export function EventCategoryFormEdition({ uuid }: { uuid: string }) {
  const { data: categoriesData } = useGetCategoriesQuery({});
  const typeCategories: CategoryType[] = categoriesData || [];
  const [isEditing, setIsEditing] = useState(false);
  const { data: event } = useGetEventByUuidQuery(uuid);
  const typedEvent: EventType = event || {};

  const [updateEventCategory, { isLoading }] = useEditEventsMutation();
  const { toast } = useToast();

  const eventCategory: CategoryType = typedEvent?.category || {
    Key: "",
    name: "",
    media: "",
    description: "",
    benefits: "",
  };

  const form = useForm<z.infer<typeof eventInfoSchema>>({
    resolver: zodResolver(eventInfoSchema),
    defaultValues: {
      category: eventCategory.Key || "",
    },
  });

  const { watch, handleSubmit, reset, setValue, formState } = form;
  const categoryValue = watch("category");

  const isFormFilled = !!categoryValue.trim();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormFilled) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormFilled]);

  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState<string>(
    eventCategory?.Key || "",
  );

  // Handle category selection
  const handleCategorySelection = (categoryUuid: string) => {
    setSelectedCategoryUuid(categoryUuid);
  };

  const onSubmit = async () => {
    if (!typedEvent || !selectedCategoryUuid) return;

    try {
      // Prepare updated event object with selected category UUID
      const updatedEvent = {
        ...typedEvent, // Spread existing event data
        category: selectedCategoryUuid, // Update only category with its UUID
      };

      // Send PUT request with full event data
      await updateEventCategory({
        uuid,
        updatedData: updatedEvent,
      }).unwrap();

      toast({
        title: "Category Updated",
        description: "The event category has been updated successfully.",
        variant: "default",
      });

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update the event category.",
        variant: "destructive",
      });
    }
  };

  function handleCancel() {
    reset();
    setIsEditing(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isEditing ? (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-2 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Event Category
              </CardTitle>

              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>

            <CardContent className="border-2 flex flex-col items-center justify-center border-iDonate-navy-accent w-[200px] h-[200px] gap-4 p-0 m-0 rounded-lg">
              <div className="w-[100px] h-[100px] bg-iDonate-navy-accent rounded-full border flex items-center justify-center">
                {eventCategory?.media && (
                  <Image
                    width={60}
                    height={60}
                    src={eventCategory?.media}
                    alt={eventCategory?.name || "Media"}
                  />
                )}
              </div>

              <CardDescription className="text-iDonate-navy-secondary text-xl">
                {eventCategory?.name}
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-2 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Event Category
              </CardTitle>

              <div className="flex gap-3">
                {formState.isDirty ? (
                  <AlertComfirmDialog
                    trigger={
                      <Button
                        type="button"
                        className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                      >
                        Cancel
                      </Button>
                    }
                    title="Are you sure you want to cancel?"
                    description="All unsaved changes will be lost. Do you want to proceed?"
                    actionText="Yes, Cancel"
                    cancelText="No, Stay"
                    onAction={handleCancel}
                  />
                ) : (
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="bg-iDonate-white-space border-2 hover:bg-red-50 border-iDonate-error text-iDonate-error"
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardHeader>

            <div className="flex items-center gap-9">
              {typeCategories.map((item, index) => (
                <CardContent
                  key={index}
                  onClick={() => handleCategorySelection(item.uuid || "")} // Select category UUID
                  className={`border-2 flex flex-col items-center justify-center border-iDonate-navy-accent hover:bg-iDonate-white-space w-[200px] h-[200px] gap-4 p-0 m-0 rounded-lg cursor-pointer ${
                    selectedCategoryUuid === item.uuid
                      ? "bg-iDonate-navy-accent text-white"
                      : ""
                  }`}
                >
                  <div className="w-[100px] h-[100px] bg-iDonate-navy-accent rounded-full border flex items-center justify-center">
                    <Image
                      width={60}
                      height={60}
                      src={
                        item.media ||
                        "https://charius-next.netlify.app/_next/static/media/3.0714cc33.svg"
                      }
                      alt="Media"
                    />
                  </div>

                  <CardDescription className="text-iDonate-navy-secondary text-xl">
                    {item.name || ""}
                  </CardDescription>
                </CardContent>
              ))}
            </div>
          </Card>
        )}
      </form>
    </Form>
  );
}
