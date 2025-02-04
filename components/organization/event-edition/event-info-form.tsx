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
import { eventInfoSchema } from "@/components/schema/schema";
import { AlertComfirmDialog } from "@/components/Alert/Alert-Dialog";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { UploadedFile } from "@/difinitions/types/fileupload";
import { FileUploader } from "@/components/fileupload/file-uploader";
import { UploadedFilesCard } from "@/components/fileupload/uploaded-files-card";
import {
  useEditEventsMutation,
  useGetEventByUuidQuery,
} from "@/redux/services/event-service";
import { EventType } from "@/difinitions/types/event/EventType";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/auth/DayPicker";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type EventInfoFormProps = {
  onTitlePercentageUpdate: (fullnamePercentage: number) => void;
  onDescriptionPercentageUpdate: (descriptionPercentage: number) => void;
  onOrderDatePercentageUpdate: (startDatePercentage: number) => void;
  onEndDatePercentageUpdate: (endDatePercentage: number) => void;
  onImagePercentageUpdate: (imagePercentage: number) => void;
  onOrganizationPercentageUpdate: (organizationPercentage: number) => void;
  uuid: string;
};

export function EventInfoFormEdition({
  onTitlePercentageUpdate,
  onDescriptionPercentageUpdate,
  onOrderDatePercentageUpdate,
  onEndDatePercentageUpdate,
  onImagePercentageUpdate,
  onOrganizationPercentageUpdate,
  uuid,
}: EventInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  // const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  const { data: event } = useGetEventByUuidQuery(uuid);
  const [updateEvent, { isLoading }] = useEditEventsMutation();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgresses, setUploadProgresses] = useState<
    Record<string, number>
  >({});
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const typedEvent: EventType = event || {};

  // 2. Define your
  const form = useForm<z.infer<typeof eventInfoSchema>>({
    resolver: zodResolver(eventInfoSchema),
    defaultValues: {
      name: typedEvent?.name,
      description: typedEvent?.description,
      startDate: typedEvent?.startDate,
      endDate: typedEvent?.endDate,
      images: typedEvent?.images,
      category: typedEvent?.category?.uuid,
      isDraft: typedEvent?.isDraft,
      isVisible: typedEvent?.isVisible,
      organization: typedEvent?.organization?.uuid,
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;

  const name = watch("name");
  const description = watch("description");
  // const location = watch("location");
  const orderDate = watch("startDate");
  const endDate = watch("endDate");
  const images = watch("images");
  const isDraft = watch("isDraft");
  const isVisible = watch("isVisible");
  const organization = watch("organization");

  const isFormFilled = {
    name: !!name,
    description: !!description,
    location: !!location,
    orderDate: !!orderDate,
    endDate: !!endDate,
    images: !!images,
    isDraft: !!isDraft,
    isVisible: !!isVisible,
    organization: !!organization,
  };

  // Percentage calculation
  useEffect(() => {
    // Calculate percentage for each field
    const calculateCompletionPercentage = () => {
      const titlePercentage = name ? 20 : 0;
      const descriptionPercentage = description ? 10 : 0;
      const orderDatePercentage = orderDate ? 10 : 0;
      const endDatePercentage = endDate ? 10 : 0;
      const imagePercentage = images?.length ? 20 : 0;
      const organizationPercentage = organization ? 10 : 0;

      // Call individual percentage update functions for each field
      onTitlePercentageUpdate(titlePercentage);
      onDescriptionPercentageUpdate(descriptionPercentage);
      onOrderDatePercentageUpdate(orderDatePercentage);
      onEndDatePercentageUpdate(endDatePercentage);
      onImagePercentageUpdate(imagePercentage);
      onOrganizationPercentageUpdate(organizationPercentage);
    };

    calculateCompletionPercentage();
  }, [
    name,
    description,
    orderDate,
    endDate,
    images,
    organization,
    onTitlePercentageUpdate,
    onDescriptionPercentageUpdate,
    onOrderDatePercentageUpdate,
    onEndDatePercentageUpdate,
    onOrganizationPercentageUpdate,
    onImagePercentageUpdate,
  ]);

  // Track if the form is filled and prevent user from leaving the page
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Check if any field is filled before showing the warning
      if (
        isFormFilled.name ||
        isFormFilled.description ||
        isFormFilled.orderDate ||
        isFormFilled.endDate ||
        isFormFilled.images ||
        isFormFilled.isDraft ||
        isFormFilled.isVisible ||
        isFormFilled.organization
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

  // 3. Define a submit handler.
  const onSubmit = async () => {
    if (!typedEvent || !typedEvent?.uuid) return;

    try {
      // Prepare updated event object with selected category UUID
      const updatedEvent = {
        ...typedEvent,
        ...form.getValues(), // Ensures updated form values are included
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
  };

  const handleFilesUpload = async (files: File[]): Promise<void> => {
    // Simulate a file upload process
    const simulateUpload = (file: File) =>
      new Promise((resolve, reject) => {
        const progressInterval = setInterval(() => {
          setUploadProgresses((prev) => {
            const newProgress = Math.min((prev[file.name] || 0) + 10, 100);
            return { ...prev, [file.name]: newProgress };
          });

          if (uploadProgresses[file.name] >= 100) {
            clearInterval(progressInterval);
            resolve(file);
          }
        }, 200);
      });

    await Promise.all(files.map(simulateUpload));
    // toast.success(`${files.length} file(s) uploaded successfully!`);
  };

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
              {/* media */}

              <div className="flex flex-1 flex-col space-y-3">
                <CardDescription className="text-lg text-iDonate-gray">
                  Event Images
                </CardDescription>
                <UploadedFilesCard uploadedFiles={uploadedFiles} />
              </div>

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
              <CardContent className="flex relative flex-1 p-0 m-0">
                <FormField
                  control={control}
                  name="images"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Event Images
                      </FormLabel>
                      <FormControl>
                        <FileUploader
                          className="border-iDonate-gray"
                          value={field.value}
                          onValueChange={field.onChange}
                          onUpload={handleFilesUpload}
                          maxFileCount={4}
                          maxSize={4 * 1024 * 1024}
                          progresses={progresses}
                          disabled={isUploading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
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
                <FormField
                  control={control}
                  name="isDraft"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Draft
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value ? "true" : "false"}
                          onValueChange={(val) =>
                            field.onChange(val === "true")
                          }
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="draft-true" />
                            <Label htmlFor="draft-true">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="draft-false" />
                            <Label htmlFor="draft-false">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="isVisible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Visibility
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value ? "true" : "false"}
                          onValueChange={(val) =>
                            field.onChange(val === "true")
                          }
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="visible-true" />
                            <Label htmlFor="visible-true">Visible</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="visible-false" />
                            <Label htmlFor="visible-false">Hidden</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Organization
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter organization name"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </CardContent>
            </div>
          </Card>
        )}
      </form>
    </Form>
  );
}
