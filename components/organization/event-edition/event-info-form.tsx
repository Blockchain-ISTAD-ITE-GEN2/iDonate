"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CalendarIcon, SquarePen, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { eventSchemaEdition } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import {
  useEditEventsMutation,
  useGetEventByUuidQuery,
} from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";
import { useToast } from "@/hooks/use-toast";

export function EventInfoFormEdition({ uuid }: { uuid: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const { data: event } = useGetEventByUuidQuery(uuid);
  const [updateEvent, { isLoading }] = useEditEventsMutation();
  const { toast } = useToast();

  const typedEvent: EventType = event || {};

  // 2. Define your
  const form = useForm<z.infer<typeof eventSchemaEdition>>({
    resolver: zodResolver(eventSchemaEdition),
    defaultValues: {
      name: typedEvent?.name,
      description: typedEvent?.description,
      location: typedEvent?.location,
      startDate: typedEvent?.startDate,
      endDate: typedEvent?.endDate,
      images: typedEvent?.images,
    },
  });

  // Update form values when organization data is fetched
  useEffect(() => {
    if (typedEvent?.uuid) {
      form.reset({
        name: typedEvent.name || "",
        description: typedEvent.description || "",
        location: typedEvent.location || "",
        startDate: typedEvent.startDate || "",
        endDate: typedEvent.endDate || "",
        images: typedEvent.images || [],
      });
    }
  }, [typedEvent?.uuid, form]);

  const { watch, reset, control, formState } = form;

  const name = watch("name");
  const description = watch("description");
  const location = watch("location");
  const orderDate = watch("startDate");
  const endDate = watch("endDate");
  const images = watch("images");

  const isFormFilled = {
    name: !!name,
    description: !!description,
    location: !!location,
    orderDate: !!orderDate,
    endDate: !!endDate,
    images: !!images,
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Check if any field is filled before showing the warning
      if (
        isFormFilled.name ||
        isFormFilled.description ||
        isFormFilled.orderDate ||
        isFormFilled.endDate ||
        isFormFilled.images
      ) {
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

  async function onSubmit(values: z.infer<typeof eventSchemaEdition>) {
    if (!typedEvent || !typedEvent?.uuid) return;

    try {
      const updatedEvent = {
        name: values.name,
        description: values.description,
        location: values.location,
        startDate: values.startDate,
        endDate: values.endDate,
        images: values.images,
      };

      // Send PUT request with full event data
      await updateEvent({
        uuid: typedEvent.uuid,
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
  }

  function handleCancel() {
    reset(); // Reset the form
    setIsEditing(false); // Switch back to view mode
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* View Mode */}
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Basic Information
              </CardTitle>

              <Button
                onClick={() => setIsEditing(true)}
                className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
              >
                <SquarePen />
                Edit
              </Button>
            </CardHeader>

            <CardContent className="flex gap-6 p-0 m-0">
              {/* Basic */}
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col space-y-3">
                  <CardDescription className="text-lg text-iDonate-gray">
                    Event Title
                  </CardDescription>
                  <CardDescription className="text-xl text-iDonate-navy-primary">
                    {typedEvent?.name}
                  </CardDescription>
                </div>

                <div className="flex flex-col space-y-3">
                  <CardDescription className="text-lg text-iDonate-gray">
                    Event Description
                  </CardDescription>
                  <CardDescription className="text-xl text-iDona text-iDonate-navy-primary">
                    {typedEvent?.description}
                  </CardDescription>
                </div>

                <div className="flex flex-col space-y-3">
                  <CardDescription className="text-lg text-iDonate-gray">
                    Event Location
                  </CardDescription>
                  <CardDescription className="text-xl text-iDona text-iDonate-navy-primary">
                    {typedEvent?.location || "No location specified"}
                  </CardDescription>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      Start Date
                    </CardDescription>

                    <CardDescription className="text-xl text-iDonate-navy-primary">
                      {typedEvent?.startDate
                        ? new Intl.DateTimeFormat("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(typedEvent.startDate))
                        : ""}
                    </CardDescription>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      End Date
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary">
                      {typedEvent?.endDate
                        ? new Intl.DateTimeFormat("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(typedEvent?.endDate))
                        : ""}
                    </CardDescription>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      Organization
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary line-clamp-1">
                      {typedEvent?.organization?.name}
                    </CardDescription>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      Category
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary line-clamp-1">
                      {typedEvent?.category?.name}
                    </CardDescription>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      Total Raised
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary line-clamp-1">
                      {typedEvent?.currentRaised}
                    </CardDescription>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      Total Donors
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary line-clamp-1">
                      {typedEvent?.totalDonors}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Basic Information
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
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardHeader>
            <div className="w-full flex gap-6">
              <CardContent className="flex-1 flex flex-col gap-6 p-0 m-0">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Event Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cambodia charity event"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full h-full">
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Event Description
                      </FormLabel>
                      <FormControl className="w-full h-full">
                        <Textarea
                          className="h-auto overflow-auto scrollbar-hide"
                          placeholder="Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event location"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-6">
                  <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col">
                        <FormLabel className="text-sm text-iDonate-navy-secondary">
                          Order Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date?.toISOString())
                              }
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col">
                        <FormLabel className="text-sm text-iDonate-navy-secondary">
                          End Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date?.toISOString())
                              }
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </div>
          </Card>
        )}
      </form>
    </Form>
  );
}
