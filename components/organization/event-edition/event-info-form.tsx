"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

type EventInfoFormProps = {
  onTitlePercentageUpdate: (fullnamePercentage: number) => void;
  onDescriptionPercentageUpdate: (emailPercentage: number) => void;
  onOrderDatePercentageUpdate: (contactPercentage: number) => void;
  onEndDatePercentageUpdate: (addressPercentage: number) => void;
  onContactPercentageUpdate: (bioPercentage: number) => void;
  onImagePercentageUpdate: (imagePercentage: number) => void;
};

export function EventInfoFormEdition({
  onTitlePercentageUpdate,
  onDescriptionPercentageUpdate,
  onOrderDatePercentageUpdate,
  onEndDatePercentageUpdate,
  onContactPercentageUpdate,
  onImagePercentageUpdate,
}: EventInfoFormProps) {
  // 1. State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  // 2. Define your
  const form = useForm<z.infer<typeof eventInfoSchema>>({
    resolver: zodResolver(eventInfoSchema),
    defaultValues: {
      title: "",
      contact: "",
      description: "",
      // orderDate: "",
      endDate: "",
      image: [],
      startDate: "",
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;

  const title = watch("title");
  const description = watch("description");
  const orderDate = watch("startDate");
  const endDate = watch("endDate");
  const contact = watch("contact");
  const image = watch("image");

  const isFormFilled = {
    title: !!title.trim(),
    description: !!description.trim(),
    orderDate: !!orderDate,
    endDate: !!endDate,
    contact: !!contact.trim(),
    image: image.length > 0,
  };

  // Percentage calculation
  useEffect(() => {
    // Calculate percentage for each field
    const calculateCompletionPercentage = () => {
      const titlePercentage = title.trim() ? 20 : 0;
      const descriptionPercentage = description.trim() ? 10 : 0;
      const orderDatePercentage = orderDate ? 10 : 0;
      const endDatePercentage = endDate ? 10 : 0;
      const contactPercentage = contact.trim() ? 10 : 0;
      const imagePercentage = image.length ? 20 : 0;

      // Call individual percentage update functions for each field
      onTitlePercentageUpdate(titlePercentage);
      onDescriptionPercentageUpdate(descriptionPercentage);
      onOrderDatePercentageUpdate(orderDatePercentage);
      onEndDatePercentageUpdate(endDatePercentage);
      onContactPercentageUpdate(contactPercentage);
      onImagePercentageUpdate(imagePercentage);
    };

    calculateCompletionPercentage();
  }, [
    title,
    description,
    orderDate,
    endDate,
    contact,
    image,
    onTitlePercentageUpdate,
    onDescriptionPercentageUpdate,
    onOrderDatePercentageUpdate,
    onEndDatePercentageUpdate,
    onContactPercentageUpdate,
    onImagePercentageUpdate,
  ]);

  // Track if the form is filled and prevent user from leaving the page
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Check if any field is filled before showing the warning
      if (
        isFormFilled.title ||
        isFormFilled.description ||
        isFormFilled.orderDate ||
        isFormFilled.endDate ||
        isFormFilled.contact ||
        isFormFilled.image
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
  function onSubmit(values: z.infer<typeof eventInfoSchema>) {
    console.log(values);
    // Switch back to view mode after submitting
    setIsEditing(false);
  }

  async function simulateFileUpload(files: File[]) {
    setIsUploading(true);

    // Simulating file upload progress
    const newUploadedFiles: UploadedFile[] = [];

    for (const file of files) {
      const fileKey = file.name;
      const uploadProgress = { loaded: 0, total: file.size };

      // Simulate upload progress
      const interval = setInterval(() => {
        uploadProgress.loaded += file.size * 0.1;
        const progressPercent = Math.min(
          Math.round((uploadProgress.loaded / uploadProgress.total) * 100),
          100,
        );

        setProgresses((prev) => ({
          ...prev,
          [fileKey]: progressPercent,
        }));

        if (progressPercent === 100) clearInterval(interval);
      }, 500);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

      // Map each file to match the UploadedFile interface
      const uploadedFile: UploadedFile = {
        key: file.name,
        url: URL.createObjectURL(file),
        appUrl: "https://your-app-url.com/files/" + file.name,
        fileHash: "dummy-hash-" + file.name,
        customId: null,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file: { ...file, preview: URL.createObjectURL(file) },
      };

      newUploadedFiles.push(uploadedFile);
    }

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    setIsUploading(false);
  }

  function handleCancel() {
    reset(); // Reset the form
    setIsEditing(false); // Switch back to view mode
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
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

              {/* <div className="relative flex-1">
                <Image
                    fill
                    src="https://i.pinimg.com/236x/a9/9e/ff/a99eff25eb1ba71647fcd884c15c035a.jpg"
                    alt={"Media" } 
                    className="object-cover rounded-lg"
                />
              </div> */}

              {/* Basic */}
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col space-y-3">
                  <CardDescription className="text-lg text-iDonate-gray">
                    Event Title
                  </CardDescription>
                  <CardDescription className="text-xl text-iDonate-navy-primary">
                    ការរត់ចរិតសាធារណៈ 2024
                  </CardDescription>
                </div>

                <div className="flex flex-col space-y-3">
                  <CardDescription className="text-lg text-iDonate-gray">
                    Event Description
                  </CardDescription>
                  <CardDescription className="text-xl text-iDonate-navy-primary">
                    ព្រឹត្តិការណ៍ការរត់ចរិតសាធារណៈ 2024
                    ត្រូវបានរៀបចំឡើងដើម្បីប្រមូលប្រាក់សម្រាប់ការអភិវឌ្ឍសហគមន៍ក្នុងតំបន់។
                    ព្រឹត្តិការណ៍នេះមិនត្រឹមតែជាការរត់សម្រាប់សុខភាពផ្ទាល់ខ្លួនទេ
                    ប៉ុន្តែវាក៏ជាការផ្តល់ឱកាសដល់សហគមន៍ក្នុងការចូលរួមក្នុងការផលិតប្រាក់ដើម្បីគាំទ្រប្រព័ន្ធសេវាសាធារណៈ។
                    ដោយការចូលរួមរបស់អ្នកដែលមានចិត្ដស្មោះឯកសារ
                    និងការប្រើប្រាស់ព្រឹត្តិការណ៍នេះ ដោយកំណត់ការចូលរួមជាសាធារណៈ
                    សេវាកម្មពាណិជ្ជកម្មក្នុងតំបន់បានកែលម្អ
                    និងប៉ះពាល់ដល់ការរីកចម្រើននៃសហគមន៍សម្រាប់អនាគត។
                  </CardDescription>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      Order Date
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary">
                      26 September 2024
                    </CardDescription>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      End Date
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary">
                      26 September 2025
                    </CardDescription>
                  </div>

                  <div className="flex flex-col flex-1 space-y-3">
                    <CardDescription className="text-lg text-iDonate-gray">
                      Contact
                    </CardDescription>
                    <CardDescription className="text-xl text-iDonate-navy-primary">
                      +855 12345678
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
                {/* Cancel Button */}
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-iDonate-white-space border-2 hover:bg-iDonate-light-gray border-iDonate-navy-accent text-iDonate-navy-primary"
                >
                  Submit
                </Button>
              </div>
            </CardHeader>

            <div className="w-full flex gap-6">
              <CardContent className="flex relative flex-1 p-0 m-0">
                <FormField
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-sm text-iDonate-navy-secondary">
                        Event Images
                      </FormLabel>
                      <FormControl>
                        <FileUploader
                          className=" border-iDonate-gray"
                          value={field.value}
                          onValueChange={field.onChange}
                          onUpload={simulateFileUpload}
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
                  name="title"
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
                      <FormDescription className="text-iDonate-gray text-sm">
                        This is tile of your event.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full h-full">
                      <FormControl className="w-full h-full">
                        <Textarea
                          className="h-auto overflow-auto scrollbar-hide"
                          placeholder="Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-iDonate-gray text-sm">
                        This is your event's description.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex gap-9 p-0 m-0">
                  <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex-1 flex flex-col">
                        <FormLabel className="text-sm text-iDonate-navy-secondary">
                          Order Date
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className="w-full">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
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
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />

                        <FormDescription className="text-iDonate-gray text-sm">
                          This is your event's order date.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex-1 flex flex-col">
                        <FormLabel className="text-sm text-iDonate-navy-secondary">
                          End Date
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className="w-full">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
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
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />

                        <FormDescription className="text-iDonate-gray text-sm">
                          This is your event's end date.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm text-iDonate-navy-secondary">
                          Contact
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+855 12345678"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="text-iDonate-gray text-sm">
                          This is your organization's contact number.
                        </FormDescription>
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
