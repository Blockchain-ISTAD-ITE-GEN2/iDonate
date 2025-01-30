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
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import categories from "@/data/category.json";
import { useGetCategoriesQuery } from "@/redux/services/category-service";

type EventInfoFormProps = {
  onTitlePercentageUpdate: (fullnamePercentage: number) => void;
  onDescriptionPercentageUpdate: (emailPercentage: number) => void;
  onOrderDatePercentageUpdate: (contactPercentage: number) => void;
  onEndDatePercentageUpdate: (addressPercentage: number) => void;
  onContactPercentageUpdate: (bioPercentage: number) => void;
  onImagePercentageUpdate: (imagePercentage: number) => void;
  onCategoryPercentageUpdate: (categoryPercentage: number) => void;
};

export function EventInfoFormCreation({
  onTitlePercentageUpdate,
  onDescriptionPercentageUpdate,
  onOrderDatePercentageUpdate,
  onEndDatePercentageUpdate,
  onContactPercentageUpdate,
  onImagePercentageUpdate,
  onCategoryPercentageUpdate,
}: EventInfoFormProps) {
  const categories = useGetCategoriesQuery({});

  const typeCategories: CategoryType[] = categories?.currentData || [];
  // 1. State to toggle between view and edit mode
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [progresses, setProgresses] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  // 2. Define your
  const form = useForm<z.infer<typeof eventInfoSchema>>({
    resolver: zodResolver(eventInfoSchema),
    defaultValues: {
      name: "",
      description: "",
      // orderDate: "",
      endDate: "",
      images: [],
      startDate: "",
      category: "",
    },
  });

  const { watch, handleSubmit, reset, control, formState } = form;

  const title = watch("name");
  const description = watch("description");
  const orderDate = watch("startDate");
  const endDate = watch("endDate");
  const image = watch("images");
  const category = watch("category");

  const isFormFilled = {
    title: !!title.trim(),
    description: !!description.trim(),
    orderDate: !!orderDate,
    endDate: !!endDate,
    image: image.length > 0,
    category: !!category.trim(),
  };

  // Percentage calculation
  useEffect(() => {
    // Calculate percentage for each field
    const calculateCompletionPercentage = () => {
      const titlePercentage = title.trim() ? 20 : 0;
      const descriptionPercentage = description.trim() ? 10 : 0;
      const orderDatePercentage = orderDate ? 10 : 0;
      const endDatePercentage = endDate ? 10 : 0;
      const imagePercentage = image.length ? 20 : 0;
      const categoryPercentage = category.trim() ? 20 : 0;

      // Call individual percentage update functions for each field
      onTitlePercentageUpdate(titlePercentage);
      onDescriptionPercentageUpdate(descriptionPercentage);
      onOrderDatePercentageUpdate(orderDatePercentage);
      onEndDatePercentageUpdate(endDatePercentage);
      onImagePercentageUpdate(imagePercentage);
      onCategoryPercentageUpdate(categoryPercentage);
    };

    calculateCompletionPercentage();
  }, [
    title,
    description,
    orderDate,
    endDate,
    image,
    category,
    onTitlePercentageUpdate,
    onDescriptionPercentageUpdate,
    onOrderDatePercentageUpdate,
    onEndDatePercentageUpdate,
    onContactPercentageUpdate,
    onImagePercentageUpdate,
    onCategoryPercentageUpdate,
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
        isFormFilled.image ||
        isFormFilled.category
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
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="flex flex-col bg-iDonate-light-gray rounded-lg border-2 border-iDonate-navy-accent gap-6 p-9">
          <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
            <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
              Event Category
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

          <div className="flex items-center gap-9">
            {typeCategories.map((item, index) => (
              <CardContent
                key={index}
                className="border-2 flex flex-col items-center justify-center border-iDonate-navy-accent w-[200px] h-[200px] gap-4 p-0 m-0 rounded-lg"
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
                  {/* Assuming 'item.name' holds the category name */}
                </CardDescription>
              </CardContent>
            ))}
          </div>

          <CardHeader className="flex flex-row items-center justify-between p-0 m-0">
            <CardTitle className="text-2xl font-medium text-iDonate-navy-secondary">
              Basic Information
            </CardTitle>
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
                              date > new Date() || date < new Date("1900-01-01")
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
                              date > new Date() || date < new Date("1900-01-01")
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

              </div>
            </CardContent>

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
          </div>
        </Card>
      </form>
    </Form>
  );
}
