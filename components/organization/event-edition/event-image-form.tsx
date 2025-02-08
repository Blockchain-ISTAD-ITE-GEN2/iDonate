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
import { FileUploader } from "@/components/fileupload/file-uploader";
import { UploadedFilesCard } from "@/components/fileupload/uploaded-files-card";
import {
  useEditEventsMutation,
  useGetEventByUuidQuery,
} from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";
import { useToast } from "@/hooks/use-toast";
import { UploadedFile } from "@/difinitions/types/fileupload";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FileCard } from "@/components/fileupload/file-card";
import Image from "next/image";

const placeholderImage =
  "https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg";

export function EventImagesFormEdition({ uuid }: { uuid: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const { data: event } = useGetEventByUuidQuery(uuid);
  const [updateEvent, { isLoading }] = useEditEventsMutation();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgresses, setUploadProgresses] = useState<
    Record<string, number>
  >({});

  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {},
  );
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
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
      });
    }
  }, [typedEvent?.uuid, form]);

  const { reset, control, formState } = form;

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  async function onSubmit(values: z.infer<typeof eventSchemaEdition>) {
    if (!typedEvent || !typedEvent?.uuid) return;

    try {
      // Prepare updated event object with selected category UUID
      const updatedEvent = {
        name: values.name,
        description: values.description,
        location: values.location,
        startDate: values.startDate,
        endDate: values.endDate,
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

  console.log("Uploaded Files:", typedEvent?.images);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* View Mode */}
        {!isEditing && (
          <Card className="flex flex-col rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Event Images
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
              {/* media */}

              <div className="flex flex-1 flex-col space-y-3">
                {typedEvent?.images?.length ? (
                  <ScrollArea className="h-fit w-full px-3">
                    <div className="w-full grid grid-cols-4 gap-6">
                      {typedEvent.images.map((file, index) => {
                        if (typeof file === "string") {
                          return (
                            <Image
                              key={index}
                              src={
                                imageErrors[index]
                                  ? placeholderImage
                                  : file || placeholderImage
                              }
                              width={index === 0 ? 480 : 240}
                              height={index === 0 ? 480 : 240}
                              alt={`Event ${index}`}
                              className={`${"object-cover rounded-md w-full h-full"}`}
                              onError={() => handleImageError(index)}
                            />
                          );
                        } else {
                          return (
                            <FileCard
                              key={index}
                              file={file}
                              onRemove={() => {}}
                            />
                          );
                        }
                      })}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-gray-500">No images available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
            <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
              <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
                Event Images
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
